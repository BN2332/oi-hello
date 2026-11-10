import { createFileRoute } from "@tanstack/react-router";
import { clearSessionCookies, isSameOrigin, json, cookieValue, supabaseRequest } from "../../lib/auth.server";

export const Route = createFileRoute("/api/auth/logout")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!isSameOrigin(request)) return json({ error: "ORIGIN_INVALIDA" }, 403);
        const access = cookieValue(request, "gp_access");
        if (access) await supabaseRequest("/auth/v1/logout", { method: "POST", headers: { authorization: "Bearer " + access } }).catch(() => undefined);
        return json({ ok: true }, 200, clearSessionCookies());
      }
    }
  }
});
