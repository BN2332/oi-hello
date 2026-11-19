import { createFileRoute } from "@tanstack/react-router";
import { apiErrorResponse, createPixCharge } from "../lib/clown-gate.server";

export const Route = createFileRoute("/api/payments/pix")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const result = await createPixCharge(request);
          return Response.json({ data: result }, { status: 201, headers: { "cache-control": "no-store" } });
        } catch (error) {
          return apiErrorResponse(error);
        }
      },
    },
  },
});
