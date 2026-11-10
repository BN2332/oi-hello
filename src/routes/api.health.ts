import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/health")({
  server: {
    handlers: {
      GET: async () => Response.json({ ok: true, version: "1.0.0", time: new Date().toISOString() }, { headers: { "cache-control": "no-store" } })
    }
  }
});
