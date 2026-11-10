import { createStart, createCsrfMiddleware } from "@tanstack/react-start";

// Protect server-function requests from cross-site invocation.
// TanStack Start's built-in error boundary serializes uncaught server errors
// as HTTP responses; do not replace API errors with the site's HTML error page.
const csrfMiddleware = createCsrfMiddleware({
  filter: (ctx) => ctx.handlerType === "serverFn",
});

export const startInstance = createStart(() => ({
  requestMiddleware: [csrfMiddleware],
}));
