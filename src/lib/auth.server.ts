const COOKIE_ACCESS = "gp_access";
const COOKIE_REFRESH = "gp_refresh";
const isProduction = true;

export function authConfig() {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("AUTH_NOT_CONFIGURED");
  return { url, key };
}

export function json(data: unknown, status = 200, headers = new Headers()) {
  headers.set("content-type", "application/json; charset=utf-8");
  headers.set("cache-control", "no-store");
  return new Response(JSON.stringify(data), { status, headers });
}

export function cookieValue(request: Request, name: string) {
  const raw = request.headers.get("cookie") ?? "";
  const part = raw.split(";").map(v => v.trim()).find(v => v.startsWith(name + "="));
  return part ? decodeURIComponent(part.slice(name.length + 1)) : null;
}

function cookie(name: string, value: string, maxAge: number) {
  return `${name}=${encodeURIComponent(value)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`;
}

export function sessionCookies(access: string, refresh: string, expiresIn = 3600) {
  const headers = new Headers();
  headers.append("set-cookie", cookie(COOKIE_ACCESS, access, Math.max(60, expiresIn)));
  headers.append("set-cookie", cookie(COOKIE_REFRESH, refresh, 60 * 60 * 24 * 30));
  return headers;
}

export function clearSessionCookies() {
  const headers = new Headers();
  headers.append("set-cookie", cookie(COOKIE_ACCESS, "", 0));
  headers.append("set-cookie", cookie(COOKIE_REFRESH, "", 0));
  return headers;
}

export function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try { return new URL(origin).host === new URL(request.url).host; } catch { return false; }
}

export async function supabaseRequest(path: string, init: RequestInit = {}) {
  const { url, key } = authConfig();
  const headers = new Headers(init.headers);
  headers.set("apikey", key);
  headers.set("content-type", "application/json");
  return fetch(url + path, { ...init, headers });
}

export function configurationError() {
  return json({ error: "LOGIN_NAO_CONFIGURADO", message: "Configure SUPABASE_URL e SUPABASE_ANON_KEY nos Secrets do projeto para ativar o login." }, 503);
}
