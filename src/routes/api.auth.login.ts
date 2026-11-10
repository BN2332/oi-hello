import { createFileRoute } from "@tanstack/react-router";
import { authConfig, configurationError, isSameOrigin, json, sessionCookies, supabaseRequest } from "../lib/auth.server";

export const Route = createFileRoute("/api/auth/login")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!isSameOrigin(request)) return json({ error: "ORIGIN_INVALIDA" }, 403);
        try { authConfig(); } catch { return configurationError(); }
        let body: { email?: string; password?: string };
        try { body = await request.json(); } catch { return json({ error: "DADOS_INVALIDOS" }, 400); }
        const email = String(body.email ?? "").trim().toLowerCase();
        const password = String(body.password ?? "");
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || password.length < 8 || password.length > 128) {
          return json({ error: "CREDENCIAIS_INVALIDAS", message: "Informe um e-mail válido e uma senha com pelo menos 8 caracteres." }, 400);
        }
        const response = await supabaseRequest("/auth/v1/token?grant_type=password", { method: "POST", body: JSON.stringify({ email, password }) });
        const result = await response.json().catch(() => ({})) as any;
        if (!response.ok) return json({ error: "LOGIN_RECUSADO", message: "E-mail ou senha incorretos." }, 401);
        if (!result.access_token || !result.refresh_token) return json({ error: "SESSAO_INVALIDA" }, 502);
        const headers = sessionCookies(result.access_token, result.refresh_token, Number(result.expires_in) || 3600);
        return json({ ok: true, user: { id: result.user?.id, email: result.user?.email } }, 200, headers);
      }
    }
  }
});
