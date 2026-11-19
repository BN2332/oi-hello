import { createFileRoute } from "@tanstack/react-router";
import { apiErrorResponse, getPayment } from "../lib/clown-gate.server";

export const Route = createFileRoute("/api/payments/$paymentId")({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        try {
          const result = await getPayment(params.paymentId, request);
          return Response.json({ data: result }, { headers: { "cache-control": "no-store" } });
        } catch (error) {
          return apiErrorResponse(error);
        }
      },
    },
  },
});
