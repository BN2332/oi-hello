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
  return <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24, color: "#fff1f2", background: "radial-gradient(ellipse at 50% 35%, #551321 0%, #160b10 48%, #080709 100%)", fontFamily: "sans-serif" }}><div style={{ textAlign: "center", maxWidth: 440 }}><img src="/clown-gate.svg" alt="Clown Gate" style={{ width: 112, height: 112, objectFit: "contain", margin: "0 auto 24px", borderRadius: 24 }} /><h1 style={{ fontSize: 26, margin: "0 0 12px" }}>A Gate encontrou um problema</h1><p style={{ color: "#c8aeb5", lineHeight: 1.7, marginBottom: 24 }}>Não foi possível carregar esta tela agora. Tente recarregar a plataforma.</p><button style={{ background: "#d51e3d", color: "white", border: 0, padding: "13px 22px", borderRadius: 6, cursor: "pointer", fontWeight: 700 }} onClick={() => { router.invalidate(); reset(); }}>Tentar novamente</button></div></div>;
}
export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({ meta: [{ charSet: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1" }, { title: "Clown Gate | Plataforma de Pagamentos PIX" }, { name: "description", content: "Clown Gate: plataforma de pagamentos PIX, gestão de cobranças e infraestrutura para negócios." }, { name: "theme-color", content: "#c81932" }], links: [{ rel: "stylesheet", href: appCss }, { rel: "preconnect", href: "https://fonts.googleapis.com" }, { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" }] }),
  shellComponent: RootShell, component: RootComponent, notFoundComponent: NotFoundComponent, errorComponent: ErrorComponent,
});
function RootShell({ children }: { children: ReactNode }) { return <html lang="pt-BR"><head><HeadContent /></head><body>{children}<Scripts /></body></html>; }
function RootComponent() { const { queryClient } = Route.useRouteContext(); return <QueryClientProvider client={queryClient}><Outlet /></QueryClientProvider>; }
