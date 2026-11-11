import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, Link, createRootRouteWithContext, useRouter, HeadContent, Scripts, type ErrorComponentProps } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white"><div className="text-center"><h1 className="text-6xl">404</h1><p className="mt-3">Página não encontrada.</p><Link className="underline mt-5 inline-block" to="/">Voltar ao início</Link></div></div>;
}
function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => { reportLovableError(error, { boundary: "tanstack_root_error_component" }); }, [error]);
  return <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white"><div className="text-center"><h1 className="text-2xl">Não foi possível carregar a página</h1><p className="my-3 text-neutral-400">Tente novamente.</p><button className="border px-4 py-2" onClick={() => { router.invalidate(); reset(); }}>Recarregar</button></div></div>;
}
export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({ meta: [{ charSet: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1" }, { title: "ClownShop | Loja Digital" }, { name: "description", content: "ClownShop: loja de produtos digitais, Roblox, Steam keys, gift cards e muito mais." }, { name: "theme-color", content: "#f12b36" }], links: [{ rel: "stylesheet", href: appCss }, { rel: "preconnect", href: "https://fonts.googleapis.com" }, { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" }] }),
  shellComponent: RootShell, component: RootComponent, notFoundComponent: NotFoundComponent, errorComponent: ErrorComponent,
});
function RootShell({ children }: { children: ReactNode }) { return <html lang="pt-BR"><head><HeadContent /></head><body>{children}<Scripts /></body></html>; }
function RootComponent() { const { queryClient } = Route.useRouteContext(); return <QueryClientProvider client={queryClient}><Outlet /></QueryClientProvider>; }
