import "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = { fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response };
type RuntimeEnv = { SITE_URL?: string };
let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) serverEntryPromise = import("@tanstack/react-start/server-entry").then(m => (m.default ?? m) as ServerEntry);
  return serverEntryPromise;
}
function jsonError(status: number, code: string, message: string) {
  return Response.json({ code, message }, { status, headers: { "cache-control": "no-store" } });
}
function allowedSiteOrigin(env: unknown, fallback: string): string {
  const configured = (env as RuntimeEnv | undefined)?.SITE_URL;
  if (!configured) return fallback;
  try { return new URL(configured).origin; }
  catch { console.error("SITE_URL must be a valid absolute URL"); return fallback; }
}
async function normalizeApiResponse(request: Request, response: Response): Promise<Response> {
  const url = new URL(request.url);
  if (!url.pathname.startsWith("/api")) return response;
  const type = response.headers.get("content-type") ?? "";
  if (type.toLowerCase().includes("application/json")) return response;
  const preview = (await response.clone().text().catch(() => "")).replace(/\s+/g, " ").slice(0, 160);
  console.error("API returned non-JSON", request.method, url.pathname, response.status, preview);
  const status = response.status === 404 ? 404 : response.status >= 400 ? response.status : 502;
  return jsonError(status, status === 404 ? "API_ROUTE_NOT_FOUND" : "API_NON_JSON_RESPONSE",
    status === 404 ? `Rota de API não encontrada: ${url.pathname}` : "A rota da API retornou uma resposta incompatível. Consulte os logs do servidor.");
}
export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    const url = new URL(request.url);
    const isApi = url.pathname.startsWith("/api");
    const origin = request.headers.get("origin");
    const allowedOrigin = allowedSiteOrigin(env, url.origin);
    if (isApi && origin && origin !== allowedOrigin) return jsonError(403, "CORS_ORIGIN_DENIED", "Origem não autorizada.");
    if (isApi && request.method === "OPTIONS") {
      const headers = new Headers({
        "access-control-allow-methods": "GET,POST,OPTIONS",
        "access-control-allow-headers": "content-type,authorization",
        "access-control-max-age": "600",
        "vary": "Origin",
      });
      if (origin && origin === allowedOrigin) {
        headers.set("access-control-allow-origin", origin);
        headers.set("access-control-allow-credentials", "true");
      }
      return new Response(null, { status: 204, headers });
    }
    try {
      const handler = await getServerEntry();
      let response = await handler.fetch(request, env, ctx);
      response = await normalizeApiResponse(request, response);
      if (isApi && origin && origin === allowedOrigin) {
        const headers = new Headers(response.headers);
        headers.set("access-control-allow-origin", origin);
        headers.set("access-control-allow-credentials", "true");
        headers.append("vary", "Origin");
        response = new Response(response.body, { status: response.status, statusText: response.statusText, headers });
      }
      return response;
    } catch (error) {
      console.error(error);
      if (isApi) return jsonError(500, "INTERNAL_SERVER_ERROR", "Erro interno na API. Consulte os logs do servidor.");
      return new Response(renderErrorPage(), { status: 500, headers: { "content-type": "text/html; charset=utf-8" } });
    }
  },
};
