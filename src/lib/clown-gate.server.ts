import { createHmac, timingSafeEqual } from "node:crypto";

export class ClownGateError extends Error {
  status: number;
  code: string;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

type JsonObject = Record<string, unknown>;

function hashCustomerDocument(document: string) {
  const secret = process.env["CUSTOMER_HASH_SECRET"];
  if (!secret || secret.length < 32) {
    throw new ClownGateError(503, "HASH_SECRET_NOT_CONFIGURED", "A chave de proteção dos dados cadastrais não foi configurada.");
  }
  return createHmac("sha256", secret).update(document).digest("hex");
}

function constantTimeEqual(received: string, expected: string) {
  const left = Buffer.from(received);
  const right = Buffer.from(expected);
  return left.length === right.length && timingSafeEqual(left, right);
}

export function requireApiAccess(request: Request) {
  const expected = process.env["CLOWNGATE_API_SECRET"];
  if (!expected) {
    throw new ClownGateError(503, "API_NOT_CONFIGURED", "A API privada ainda não foi configurada.");
  }

  const authorization = request.headers.get("authorization") ?? "";
  const received = authorization.match(/^Bearer\s+(.+)$/i)?.[1] ?? "";
  if (!received || !constantTimeEqual(received, expected)) {
    throw new ClownGateError(401, "UNAUTHORIZED", "Credencial inválida.");
  }
}

function databaseConfig() {
  const url = process.env["SUPABASE_URL"]?.replace(/\/$/, "");
  const key = process.env["SUPABASE_SERVICE_ROLE_KEY"];
  if (!url || !key) {
    throw new ClownGateError(503, "DATABASE_NOT_CONFIGURED", "O banco de dados ainda não foi configurado.");
  }
  return { url, key };
}

async function databaseRequest<T = unknown>(path: string, init: RequestInit = {}): Promise<T> {
  const { url, key } = databaseConfig();
  const response = await fetch(`${url}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: key,
      authorization: `Bearer ${key}`,
      "content-type": "application/json",
      ...init.headers,
    },
    cache: "no-store",
  });
  const body = await response.text();
  if (!response.ok) {
    if (response.status === 409) {
      throw new ClownGateError(409, "DUPLICATE", "Registro duplicado.");
    }
    throw new ClownGateError(503, "DATABASE_ERROR", "Não foi possível persistir a operação com segurança.");
  }
  if (!body) return undefined as T;
  try {
    return JSON.parse(body) as T;
  } catch {
    return body as T;
  }
}

function asaasBaseUrl() {
  return process.env["ASAAS_ENV"] === "production"
    ? "https://api.asaas.com/v3"
    : "https://api-sandbox.asaas.com/v3";
}

async function asaasRequest<T = JsonObject>(path: string, init: RequestInit = {}): Promise<T> {
  const apiKey = process.env["ASAAS_API_KEY"];
  if (!apiKey) {
    throw new ClownGateError(503, "PAYMENT_PROVIDER_NOT_CONFIGURED", "A integração PIX ainda não foi configurada.");
  }
  const response = await fetch(`${asaasBaseUrl()}${path}`, {
    ...init,
    headers: {
      access_token: apiKey,
      accept: "application/json",
      "content-type": "application/json",
      "user-agent": "ClownGate/1.0",
      ...init.headers,
    },
    cache: "no-store",
  });
  const body = await response.text();
  let parsed: JsonObject = {};
  try {
    parsed = body ? JSON.parse(body) as JsonObject : {};
  } catch {
    parsed = {};
  }
  if (!response.ok) {
    throw new ClownGateError(502, "PAYMENT_PROVIDER_ERROR", "O provedor não conseguiu concluir a operação. Consulte os registros antes de tentar novamente.");
  }
  return parsed as T;
}

function brazilToday() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function validDocument(value: unknown): value is string {
  if (typeof value !== "string") return false;
  const digits = value.replace(/\D/g, "");
  return digits.length === 11 || digits.length === 14;
}

export function apiErrorResponse(error: unknown) {
  if (error instanceof ClownGateError) {
    return Response.json({ error: { code: error.code, message: error.message } }, {
      status: error.status,
      headers: { "cache-control": "no-store" },
    });
  }
  return Response.json({ error: { code: "INTERNAL_ERROR", message: "Não foi possível concluir a solicitação." } }, {
    status: 500,
    headers: { "cache-control": "no-store" },
  });
}

async function getOrCreateAsaasCustomer(input: {
  name: string;
  cpfCnpj: string;
  email?: string;
  phone?: string;
}) {
  const document = input.cpfCnpj.replace(/\D/g, "");
  const documentHash = hashCustomerDocument(document);
  const existing = await databaseRequest<Array<{ asaas_customer_id: string }>>(
    `cg_customers?cpf_cnpj_hash=eq.${documentHash}&select=asaas_customer_id&limit=1`,
  );
  if (existing[0]?.asaas_customer_id) {
    return { id: existing[0].asaas_customer_id, documentHash };
  }

  const customer = await asaasRequest<{ id?: string }>("/customers", {
    method: "POST",
    body: JSON.stringify({
      name: input.name.trim(),
      cpfCnpj: document,
      email: input.email?.trim() || undefined,
      mobilePhone: input.phone?.replace(/\D/g, "") || undefined,
      notificationDisabled: true,
      externalReference: `cg-${documentHash.slice(0, 24)}`,
    }),
  });
  if (!customer.id) throw new ClownGateError(502, "INVALID_PROVIDER_RESPONSE", "Resposta inesperada do provedor.");

  try {
    await databaseRequest("cg_customers", {
      method: "POST",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify({
        cpf_cnpj_hash: documentHash,
        asaas_customer_id: customer.id,
      }),
    });
  } catch (error) {
    if (!(error instanceof ClownGateError) || error.code !== "DUPLICATE") throw error;
    const raced = await databaseRequest<Array<{ asaas_customer_id: string }>>(
      `cg_customers?cpf_cnpj_hash=eq.${documentHash}&select=asaas_customer_id&limit=1`,
    );
    if (raced[0]?.asaas_customer_id) return { id: raced[0].asaas_customer_id, documentHash };
    throw error;
  }
  return { id: customer.id, documentHash };
}

async function getPixQrCode(paymentId: string) {
  return asaasRequest<{
    encodedImage?: string;
    payload?: string;
    expirationDate?: string;
  }>(`/payments/${encodeURIComponent(paymentId)}/pixQrCode`, { method: "GET" });
}

export async function createPixCharge(request: Request) {
  requireApiAccess(request);
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 16_384) throw new ClownGateError(413, "PAYLOAD_TOO_LARGE", "Payload excede o limite permitido.");
  let body: JsonObject;
  try {
    body = await request.json() as JsonObject;
  } catch {
    throw new ClownGateError(400, "INVALID_JSON", "Envie um corpo JSON válido.");
  }

  const idempotencyKey = request.headers.get("idempotency-key") ?? "";
  if (!/^[A-Za-z0-9._:-]{8,80}$/.test(idempotencyKey)) {
    throw new ClownGateError(400, "IDEMPOTENCY_KEY_REQUIRED", "Envie Idempotency-Key com 8 a 80 caracteres válidos.");
  }

  const name = typeof body["customerName"] === "string" ? body["customerName"].trim() : "";
  const cpfCnpj = typeof body["customerCpfCnpj"] === "string" ? body["customerCpfCnpj"] : "";
  const email = typeof body["customerEmail"] === "string" ? body["customerEmail"] : undefined;
  const phone = typeof body["customerPhone"] === "string" ? body["customerPhone"] : undefined;
  const amountCents = body["amountCents"];
  const description = typeof body["description"] === "string" ? body["description"].trim().slice(0, 100) : "Pagamento Clown Gate";

  const configuredMaxAmount = Number(process.env["MAX_PIX_AMOUNT_CENTS"] ?? 1000000);
  const maxAmountCents = Number.isSafeInteger(configuredMaxAmount) && configuredMaxAmount >= 100 ? configuredMaxAmount : 1000000;
  if (name.length < 2 || name.length > 120 || !validDocument(cpfCnpj)) {
    throw new ClownGateError(400, "INVALID_CUSTOMER", "Informe nome e CPF/CNPJ válido do pagador.");
  }
  if (typeof amountCents !== "number" || !Number.isSafeInteger(amountCents) || amountCents < 100 || amountCents > maxAmountCents) {
    throw new ClownGateError(400, "INVALID_AMOUNT", `O valor deve estar entre R$ 1,00 e R$ ${(maxAmountCents / 100).toFixed(2).replace(".", ",")}.`);
  }
  if (email && (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
    throw new ClownGateError(400, "INVALID_EMAIL", "E-mail inválido.");
  }
  if (description.length < 2) throw new ClownGateError(400, "INVALID_DESCRIPTION", "Informe uma descrição válida.");

  const documentHash = hashCustomerDocument(cpfCnpj.replace(/\\D/g, ""));
  const previous = await databaseRequest<Array<{
    id: string;
    asaas_payment_id: string | null;
    status: string;
    amount_cents: number;
    customer_hash: string;
    description: string;
  }>>(
    `cg_payments?idempotency_key=eq.${encodeURIComponent(idempotencyKey)}&select=id,asaas_payment_id,status,amount_cents,customer_hash,description&limit=1`,
  );
  if (previous[0]) {
    const item = previous[0];
    if (item.amount_cents !== amountCents || item.customer_hash !== documentHash || item.description !== description) {
      throw new ClownGateError(409, "IDEMPOTENCY_KEY_REUSED", "Esta chave de idempotência já foi usada com dados diferentes.");
    }
    if (item.asaas_payment_id) {
      const qr = await getPixQrCode(item.asaas_payment_id);
      return {
        id: item.id,
        providerPaymentId: item.asaas_payment_id,
        status: item.status,
        amountCents: item.amount_cents,
        pix: qr,
        reused: true,
      };
    }
    throw new ClownGateError(409, "IDEMPOTENCY_IN_PROGRESS", "Esta chave já está em processamento. Consulte o status antes de reenviar.");
  }

  const customer = await getOrCreateAsaasCustomer({ name, cpfCnpj, ...(email ? { email } : {}), ...(phone ? { phone } : {}) });
  const externalReference = `clowngate-${idempotencyKey}`;
  let localPaymentId = "";
  try {
    const inserted = await databaseRequest<Array<{ id: string }>>("cg_payments", {
      method: "POST",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify({
        idempotency_key: idempotencyKey,
        external_reference: externalReference,
        amount_cents: amountCents,
        description,
        customer_hash: customer.documentHash,
        status: "CREATING",
      }),
    });
    localPaymentId = inserted[0]?.id ?? "";
  } catch (error) {
    if (error instanceof ClownGateError && error.code === "DUPLICATE") {
      throw new ClownGateError(409, "IDEMPOTENCY_IN_PROGRESS", "Esta chave já está em processamento. Consulte o status antes de reenviar.");
    }
    throw error;
  }
  if (!localPaymentId) throw new ClownGateError(503, "DATABASE_ERROR", "Não foi possível reservar a operação.");

  try {
    const created = await asaasRequest<{ id?: string; status?: string }>("/payments", {
      method: "POST",
      body: JSON.stringify({
        customer: customer.id,
        billingType: "PIX",
        value: amountCents / 100,
        dueDate: brazilToday(),
        description,
        externalReference,
      }),
    });
    if (!created.id) throw new ClownGateError(502, "INVALID_PROVIDER_RESPONSE", "Resposta inesperada do provedor.");

    await databaseRequest(`cg_payments?id=eq.${encodeURIComponent(localPaymentId)}`, {
      method: "PATCH",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify({
        asaas_payment_id: created.id,
        status: created.status ?? "PENDING",
        updated_at: new Date().toISOString(),
      }),
    });
    const pix = await getPixQrCode(created.id);
    if (!pix.payload || !pix.encodedImage) {
      throw new ClownGateError(502, "PIX_QR_UNAVAILABLE", "A cobrança foi criada, mas o QR Code ainda não está disponível. Consulte o status antes de tentar novamente.");
    }
    return {
      id: localPaymentId,
      providerPaymentId: created.id,
      status: created.status ?? "PENDING",
      amountCents,
      pix,
      reused: false,
    };
  } catch (error) {
    {
      await databaseRequest(`cg_payments?id=eq.${encodeURIComponent(localPaymentId)}`, {
        method: "PATCH",
        headers: { Prefer: "return=minimal" },
        body: JSON.stringify({ status: "REVIEW_REQUIRED", updated_at: new Date().toISOString() }),
      }).catch(() => undefined);
    }
    throw error;
  }
}

export async function getPayment(paymentId: string, request: Request) {
  requireApiAccess(request);
  if (!/^[A-Za-z0-9_-]{4,80}$/.test(paymentId)) {
    throw new ClownGateError(400, "INVALID_PAYMENT_ID", "Identificador de pagamento inválido.");
  }
  const rows = await databaseRequest<Array<{
    id: string;
    external_reference: string;
    asaas_payment_id: string | null;
    amount_cents: number;
    description: string;
    status: string;
    last_event: string | null;
    created_at: string;
    updated_at: string | null;
  }>>(
    `cg_payments?id=eq.${encodeURIComponent(paymentId)}&select=id,external_reference,asaas_payment_id,amount_cents,description,status,last_event,created_at,updated_at&limit=1`,
  );
  if (!rows[0]) throw new ClownGateError(404, "PAYMENT_NOT_FOUND", "Pagamento não encontrado.");
  return rows[0];
}

export async function receiveAsaasWebhook(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 131_072) throw new ClownGateError(413, "PAYLOAD_TOO_LARGE", "Webhook excede o limite permitido.");
  const expected = process.env["ASAAS_WEBHOOK_TOKEN"];
  if (!expected) throw new ClownGateError(503, "WEBHOOK_NOT_CONFIGURED", "Webhook ainda não configurado.");
  const received = request.headers.get("asaas-access-token") ?? "";
  if (!received || !constantTimeEqual(received, expected)) {
    throw new ClownGateError(401, "INVALID_WEBHOOK_TOKEN", "Token de webhook inválido.");
  }

  let body: JsonObject;
  try {
    body = await request.json() as JsonObject;
  } catch {
    throw new ClownGateError(400, "INVALID_JSON", "Payload JSON inválido.");
  }
  const eventId = typeof body["id"] === "string" ? body["id"] : "";
  const eventType = typeof body["event"] === "string" ? body["event"] : "";
  const payment = body["payment"] && typeof body["payment"] === "object" ? body["payment"] as JsonObject : {};
  const providerPaymentId = typeof payment["id"] === "string" ? payment["id"] : "";
  const providerStatus = typeof payment["status"] === "string" ? payment["status"] : eventType;

  if (!eventId || eventId.length > 120 || !eventType || eventType.length > 120) {
    throw new ClownGateError(400, "INVALID_WEBHOOK", "Evento sem identificador ou tipo válido.");
  }

  const safePayload = {
    id: eventId,
    event: eventType,
    dateCreated: typeof body["dateCreated"] === "string" ? body["dateCreated"] : null,
    payment: {
      id: providerPaymentId || null,
      status: typeof payment["status"] === "string" ? payment["status"] : null,
      value: typeof payment["value"] === "number" ? payment["value"] : null,
      netValue: typeof payment["netValue"] === "number" ? payment["netValue"] : null,
      externalReference: typeof payment["externalReference"] === "string" ? payment["externalReference"] : null,
      dateCreated: typeof payment["dateCreated"] === "string" ? payment["dateCreated"] : null,
    },
  };

  try {
    await databaseRequest("cg_webhook_events", {
      method: "POST",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify({
        event_id: eventId,
        event_type: eventType,
        asaas_payment_id: providerPaymentId || null,
        payload: safePayload,
      }),
    });
  } catch (error) {
    if (error instanceof ClownGateError && error.code === "DUPLICATE") {
      return { received: true, duplicate: true };
    }
    throw error;
  }

  if (providerPaymentId) {
    await databaseRequest(`cg_payments?asaas_payment_id=eq.${encodeURIComponent(providerPaymentId)}`, {
      method: "PATCH",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify({
        status: providerStatus,
        last_event: eventType,
        updated_at: new Date().toISOString(),
      }),
    });
  }
  return { received: true, duplicate: false };
}
