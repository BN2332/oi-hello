import { createFileRoute } from "@tanstack/react-router";
import { authConfig, configurationError, isSameOrigin, json, sessionCookies, supabaseRequest } from "../../lib/auth.server";

export const Route = createFileRoute("/api/auth/register")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!isSameOrigin(request)) return json({ error: "ORIGIN_INVALIDA" }, 403);
        try { authConfig(); } catch { return configurationError(); }
        let body: { email?: string; password?: string; name?: string };
        try { body = await request.json(); } catch { return json({ error: "DADOS_INVALIDOS" }, 400); }
        const email = String(body.email ?? "").trim().toLowerCase();
        const password = String(body.password ?? "");
        const name = String(body.name ?? "").trim().slice(0, 80);
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || password.length < 10 || password.length > 128) {
          return json({ error: "DADOS_INVALIDOS", message: "Use um e-mail válido e uma senha com pelo menos 10 caracteres." }, 400);
        }
        const response = await supabaseRequest("/auth/v1/signup", { method: "POST", body: JSON.stringify({ email, password, data: { full_name: name } }) });
        const result = await response.json().catch(() => ({})) as any;
        if (!response.ok) return json({ error: "CADASTRO_RECUSADO", message: result.msg || result.message || "Não foi possível criar a conta. Verifique os dados e tente novamente." }, response.status);
        if (result.access_token && result.refresh_token) {
          const headers = sessionCookies(result.access_token, result.refresh_token, Number(result.expires_in) || 3600);
          return json({ ok: true, needsEmailConfirmation: false, user: { id: result.user?.id, email: result.user?.email } }, 201, headers);
        }
        return json({ ok: true, needsEmailConfirmation: true, message: "Conta criada. Confirme seu e-mail para entrar." }, 201);
      }
    }
  }
});
