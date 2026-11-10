const API_BASE = (import.meta.env.VITE_API_BASE || "").replace(/\/$/, "");

export class ApiError extends Error {
  status: number;
  path: string;
  code?: string;
  constructor(message: string, status: number, path: string, code?: string) {
    super(message); this.name = "ApiError"; this.status = status; this.path = path; this.code = code;
  }
}

export async function api<T = any>(path: string, options: RequestInit & { timeoutMs?: number } = {}): Promise<T> {
  if (typeof window !== "undefined" && window.location.protocol === "file:") {
    throw new ApiError("Abra pelo endereço do servidor (ex.: http://localhost:3000).", 0, path);
  }
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), options.timeoutMs ?? 15000);
  const headers = new Headers(options.headers);
  const hasBody = options.body !== undefined && options.body !== null;
  if (hasBody && !headers.has("content-type")) headers.set("Content-Type", "application/json");
  let body = options.body;
  if (hasBody && typeof body !== "string" && !(body instanceof FormData) && !(body instanceof URLSearchParams) && !(body instanceof Blob)) body = JSON.stringify(body);
  const url = API_BASE ? API_BASE + (path.startsWith("/") ? path : "/" + path) : path;
  try {
    const response = await fetch(url, { ...options, body, headers, credentials: options.credentials ?? "same-origin", signal: controller.signal });
    const contentType = response.headers.get("content-type") || "";
    const raw = await response.text();
    if (!contentType.toLowerCase().includes("application/json")) {
      const preview = raw.replace(/\s+/g, " ").slice(0, 180);
      throw new ApiError(`O servidor respondeu com conteúdo não JSON (HTTP ${response.status}) em ${path}. Resposta: ${preview || "(vazia)"}`, response.status, path);
    }
    let data: any;
    try { data = raw ? JSON.parse(raw) : {}; }
    catch { throw new ApiError(`Resposta JSON inválida (HTTP ${response.status}) em ${path}.`, response.status, path); }
    if (!response.ok) throw new ApiError(data.message || data.error || data.code || `Falha HTTP ${response.status}`, response.status, path, data.code || data.error);
    return data as T;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    if (error instanceof DOMException && error.name === "AbortError") throw new ApiError("A solicitação expirou após 15 segundos. Tente novamente.", 408, path);
    throw new ApiError("Não foi possível conectar ao servidor. Verifique sua conexão e se o backend está ativo.", 0, path);
  } finally { window.clearTimeout(timeout); }
}
