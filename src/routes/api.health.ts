import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/health")({
  server: {
    handlers: {
      GET: async () => Response.json({
        ok: true,
        service: "Clown Gate",
        version: "1.1.0",
        environment: process.env.ASAAS_ENV === "production" ? "production" : "sandbox",
        capabilities: {
          pixProviderConfigured: Boolean(process.env.ASAAS_API_KEY),
          databaseConfigured: Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY),
          webhookConfigured: Boolean(process.env.ASAAS_WEBHOOK_TOKEN),
          apiAccessConfigured: Boolean(process.env.CLOWNGATE_API_SECRET),
        },
        time: new Date().toISOString(),
      }, { headers: { "cache-control": "no-store" } }),
    },
  },
});
