import { createFileRoute } from "@tanstack/react-router";
import { authConfig, clearSessionCookies, configurationError, cookieValue, json, sessionCookies, supabaseRequest } from "../../lib/auth.server";

export const Route = createFileRoute("/api/auth/me")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try { authConfig(); } catch { return configurationError(); }
        const access = cookieValue(request, "gp_access");
        const refresh = cookieValue(request, "gp_refresh");
        if (!access && !refresh) return json({ authenticated: false }, 200);
        if (access) {
          const userResponse = await supabaseRequest("/auth/v1/user", { headers: { authorization: "Bearer " + access } });
          if (userResponse.ok) {
            const user = await userResponse.json() as any;
            return json({ authenticated: true, user: { id: user.id, email: user.email } });
          }
        }
        if (!refresh) return json({ authenticated: false }, 200, clearSessionCookies());
        const refreshed = await supabaseRequest("/auth/v1/token?grant_type=refresh_token", { method: "POST", body: JSON.stringify({ refresh_token: refresh }) });
        const tokens = await refreshed.json().catch(() => ({})) as any;
        if (!refreshed.ok || !tokens.access_token || !tokens.refresh_token) return json({ authenticated: false }, 200, clearSessionCookies());
        const headers = sessionCookies(tokens.access_token, tokens.refresh_token, Number(tokens.expires_in) || 3600);
        return json({ authenticated: true, user: { id: tokens.user?.id, email: tokens.user?.email } }, 200, headers);
      }
    }
  }
});
