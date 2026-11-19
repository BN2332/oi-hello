/* eslint-disable */

// @ts-nocheck

// Generated route manifest. Keep server endpoints registered here.

import { Route as rootRouteImport } from './routes/__root'
import { Route as IndexRouteImport } from './routes/index'
import { Route as ApiHealthRouteImport } from './routes/api.health'
import { Route as ApiPaymentsPixRouteImport } from './routes/api.payments.pix'
import { Route as ApiPaymentsPaymentIdRouteImport } from './routes/api.payments.$paymentId'
import { Route as ApiWebhooksAsaasRouteImport } from './routes/api.webhooks.asaas'

const IndexRoute = IndexRouteImport.update({ id: '/', path: '/', getParentRoute: () => rootRouteImport } as any)
const ApiHealthRoute = ApiHealthRouteImport.update({ id: '/api/health', path: '/api/health', getParentRoute: () => rootRouteImport } as any)
const ApiPaymentsPixRoute = ApiPaymentsPixRouteImport.update({ id: '/api/payments/pix', path: '/api/payments/pix', getParentRoute: () => rootRouteImport } as any)
const ApiPaymentsPaymentIdRoute = ApiPaymentsPaymentIdRouteImport.update({ id: '/api/payments/$paymentId', path: '/api/payments/$paymentId', getParentRoute: () => rootRouteImport } as any)
const ApiWebhooksAsaasRoute = ApiWebhooksAsaasRouteImport.update({ id: '/api/webhooks/asaas', path: '/api/webhooks/asaas', getParentRoute: () => rootRouteImport } as any)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/api/health': typeof ApiHealthRoute
  '/api/payments/pix': typeof ApiPaymentsPixRoute
  '/api/payments/$paymentId': typeof ApiPaymentsPaymentIdRoute
  '/api/webhooks/asaas': typeof ApiWebhooksAsaasRoute
}
export interface FileRoutesByTo extends FileRoutesByFullPath {}
export interface FileRoutesById {
  __root__: typeof rootRouteImport
  '/': typeof IndexRoute
  '/api/health': typeof ApiHealthRoute
  '/api/payments/pix': typeof ApiPaymentsPixRoute
  '/api/payments/$paymentId': typeof ApiPaymentsPaymentIdRoute
  '/api/webhooks/asaas': typeof ApiWebhooksAsaasRoute
}
export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fileRoutesByTo: FileRoutesByTo
  fileRoutesById: FileRoutesById
}
export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  ApiHealthRoute: typeof ApiHealthRoute
  ApiPaymentsPixRoute: typeof ApiPaymentsPixRoute
  ApiPaymentsPaymentIdRoute: typeof ApiPaymentsPaymentIdRoute
  ApiWebhooksAsaasRoute: typeof ApiWebhooksAsaasRoute
}

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': { id: '/'; path: '/'; fullPath: '/'; preLoaderRoute: typeof IndexRouteImport; parentRoute: typeof rootRouteImport }
    '/api/health': { id: '/api/health'; path: '/api/health'; fullPath: '/api/health'; preLoaderRoute: typeof ApiHealthRouteImport; parentRoute: typeof rootRouteImport }
    '/api/payments/pix': { id: '/api/payments/pix'; path: '/api/payments/pix'; fullPath: '/api/payments/pix'; preLoaderRoute: typeof ApiPaymentsPixRouteImport; parentRoute: typeof rootRouteImport }
    '/api/payments/$paymentId': { id: '/api/payments/$paymentId'; path: '/api/payments/$paymentId'; fullPath: '/api/payments/$paymentId'; preLoaderRoute: typeof ApiPaymentsPaymentIdRouteImport; parentRoute: typeof rootRouteImport }
    '/api/webhooks/asaas': { id: '/api/webhooks/asaas'; path: '/api/webhooks/asaas'; fullPath: '/api/webhooks/asaas'; preLoaderRoute: typeof ApiWebhooksAsaasRouteImport; parentRoute: typeof rootRouteImport }
  }
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute,
  ApiHealthRoute,
  ApiPaymentsPixRoute,
  ApiPaymentsPaymentIdRoute,
  ApiWebhooksAsaasRoute,
}
export const routeTree = rootRouteImport._addFileChildren(rootRouteChildren)._addFileTypes<FileRouteTypes>()

import type { getRouter } from './router.tsx'
import type { startInstance } from './start.ts'
declare module '@tanstack/react-start' {
  interface Register {
    ssr: true
    router: Awaited<ReturnType<typeof getRouter>>
    config: Awaited<ReturnType<typeof startInstance.getOptions>>
  }
}
