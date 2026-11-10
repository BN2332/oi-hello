/* eslint-disable */

// @ts-nocheck

// Generated route manifest. Keep server endpoints registered here.

import { Route as rootRouteImport } from './routes/__root'
import { Route as IndexRouteImport } from './routes/index'
import { Route as ApiAuthLoginRouteImport } from './routes/api.auth.login'
import { Route as ApiAuthRegisterRouteImport } from './routes/api.auth.register'
import { Route as ApiAuthMeRouteImport } from './routes/api.auth.me'
import { Route as ApiAuthLogoutRouteImport } from './routes/api.auth.logout'
import { Route as ApiHealthRouteImport } from './routes/api.health'

const IndexRoute = IndexRouteImport.update({ id: '/', path: '/', getParentRoute: () => rootRouteImport } as any)
const ApiAuthLoginRoute = ApiAuthLoginRouteImport.update({ id: '/api/auth/login', path: '/api/auth/login', getParentRoute: () => rootRouteImport } as any)
const ApiAuthRegisterRoute = ApiAuthRegisterRouteImport.update({ id: '/api/auth/register', path: '/api/auth/register', getParentRoute: () => rootRouteImport } as any)
const ApiAuthMeRoute = ApiAuthMeRouteImport.update({ id: '/api/auth/me', path: '/api/auth/me', getParentRoute: () => rootRouteImport } as any)
const ApiAuthLogoutRoute = ApiAuthLogoutRouteImport.update({ id: '/api/auth/logout', path: '/api/auth/logout', getParentRoute: () => rootRouteImport } as any)
const ApiHealthRoute = ApiHealthRouteImport.update({ id: '/api/health', path: '/api/health', getParentRoute: () => rootRouteImport } as any)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/api/auth/login': typeof ApiAuthLoginRoute
  '/api/auth/register': typeof ApiAuthRegisterRoute
  '/api/auth/me': typeof ApiAuthMeRoute
  '/api/auth/logout': typeof ApiAuthLogoutRoute
  '/api/health': typeof ApiHealthRoute
}
export interface FileRoutesByTo extends FileRoutesByFullPath {}
export interface FileRoutesById {
  __root__: typeof rootRouteImport
  '/': typeof IndexRoute
  '/api/auth/login': typeof ApiAuthLoginRoute
  '/api/auth/register': typeof ApiAuthRegisterRoute
  '/api/auth/me': typeof ApiAuthMeRoute
  '/api/auth/logout': typeof ApiAuthLogoutRoute
  '/api/health': typeof ApiHealthRoute
}
export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/api/auth/login' | '/api/auth/register' | '/api/auth/me' | '/api/auth/logout' | '/api/health'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/api/auth/login' | '/api/auth/register' | '/api/auth/me' | '/api/auth/logout' | '/api/health'
  id: '__root__' | '/' | '/api/auth/login' | '/api/auth/register' | '/api/auth/me' | '/api/auth/logout' | '/api/health'
  fileRoutesById: FileRoutesById
}
export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  ApiAuthLoginRoute: typeof ApiAuthLoginRoute
  ApiAuthRegisterRoute: typeof ApiAuthRegisterRoute
  ApiAuthMeRoute: typeof ApiAuthMeRoute
  ApiAuthLogoutRoute: typeof ApiAuthLogoutRoute
  ApiHealthRoute: typeof ApiHealthRoute
}

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': { id: '/'; path: '/'; fullPath: '/'; preLoaderRoute: typeof IndexRouteImport; parentRoute: typeof rootRouteImport }
    '/api/auth/login': { id: '/api/auth/login'; path: '/api/auth/login'; fullPath: '/api/auth/login'; preLoaderRoute: typeof ApiAuthLoginRouteImport; parentRoute: typeof rootRouteImport }
    '/api/auth/register': { id: '/api/auth/register'; path: '/api/auth/register'; fullPath: '/api/auth/register'; preLoaderRoute: typeof ApiAuthRegisterRouteImport; parentRoute: typeof rootRouteImport }
    '/api/auth/me': { id: '/api/auth/me'; path: '/api/auth/me'; fullPath: '/api/auth/me'; preLoaderRoute: typeof ApiAuthMeRouteImport; parentRoute: typeof rootRouteImport }
    '/api/auth/logout': { id: '/api/auth/logout'; path: '/api/auth/logout'; fullPath: '/api/auth/logout'; preLoaderRoute: typeof ApiAuthLogoutRouteImport; parentRoute: typeof rootRouteImport }
    '/api/health': { id: '/api/health'; path: '/api/health'; fullPath: '/api/health'; preLoaderRoute: typeof ApiHealthRouteImport; parentRoute: typeof rootRouteImport }
  }
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute,
  ApiAuthLoginRoute,
  ApiAuthRegisterRoute,
  ApiAuthMeRoute,
  ApiAuthLogoutRoute,
  ApiHealthRoute,
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
