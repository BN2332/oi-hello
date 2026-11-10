import "./lib/error-capture";
import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = { fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response };
let serverEntryPromise: Promise<ServerEntry> | undefined;
async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) serverEntryPromise = import("@tanstack/react-start/server-entry").then(m => (m.default ?? m) as ServerEntry);
  return serverEntryPromise;
}
function jsonError(status: number, code: string, message: string) {
  return Response.json({ code, message }, { status, headers: { "cache-control": "no-store" } });
}
async function normalizeApiResponse(request: Request, response: Response): Promise<Response> {
  const url = new URL(request.url);
  if (!url.pathname.startsWith("/api")) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.toLowerCase().includes("application/json")) return response;
  const preview = (await response.clone().text().catch(() => "")).replace(/\s+/g, " ").slice(0, 160);
  console.error("API returned non-JSON", request.method, url.pathname, response.status, preview);
  const status = response.status === 404 ? 404 : response.status >= 400 ? response.status : 502;
  return jsonError(status, status === 404 ? "API_ROUTE_NOT_FOUND" : "API_NON_JSON_RESPONSE",
    status === 404 ? `Rota de API não encontrada: ${url.pathname}` : "A rota da API retornou uma resposta incompatível. Consulte os logs do servidor.");
}
export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/api") && request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: { "access-control-allow-methods": "GET,POST,OPTIONS", "access-control-allow-headers": "content-type,authorization", "access-control-max-age": "600" } });
    }
    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeApiResponse(request, response);
    } catch (error) {
      console.error(error);
      if (url.pathname.startsWith("/api")) return jsonError(500, "INTERNAL_SERVER_ERROR", "Erro interno na API. Consulte os logs do servidor.");
      return new Response(renderErrorPage(), { status: 500, headers: { "content-type": "text/html; charset=utf-8" } });
    }
  },
};
