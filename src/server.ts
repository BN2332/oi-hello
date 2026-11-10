import handler, { createServerEntry } from "@tanstack/react-start/server-entry";

// TanStack Start's server entry receives (Request, request options).
// Keep the framework's request context intact so file-based API handlers,
// server functions, SSR, cookies, and middleware are executed by the runtime.
export default createServerEntry({
  fetch(request, opts) {
    return handler.fetch(request, opts);
  },
});
