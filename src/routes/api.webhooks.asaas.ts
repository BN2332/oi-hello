import { createFileRoute } from "@tanstack/react-router";
import { apiErrorResponse, receiveAsaasWebhook } from "../lib/clown-gate.server";

export const Route = createFileRoute("/api/webhooks/asaas")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const result = await receiveAsaasWebhook(request);
          // Asaas requires exactly HTTP 200 to acknowledge webhook delivery.
          return Response.json(result, { status: 200, headers: { "cache-control": "no-store" } });
        } catch (error) {
          return apiErrorResponse(error);
        }
      },
    },
  },
});
