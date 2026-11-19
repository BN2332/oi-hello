# Clown Gate

Plataforma de pagamentos com identidade visual Dark Carnival, focada inicialmente em cobranças PIX.

## Stack
- React 19 + TypeScript
- TanStack Start / Router
- Vite
- Asaas API (Sandbox por padrão)
- Supabase Postgres via REST para persistência

## Começar localmente
Requisitos: Bun (ou Node.js compatível).

```bash
bun install
bun run dev
```

## Configuração do backend
1. Copie `.env.clown-gate.example` para o ambiente local (não commite segredos).
2. Crie um projeto Supabase e execute a migration em `supabase/migrations/`.
3. Configure uma chave de API do Asaas Sandbox.
4. Preencha as variáveis privadas no ambiente do servidor.
5. Consulte `docs/CLOWN_GATE_IMPLEMENTATION.md` para instruções, API e webhook.

## Rotas
- `GET /api/health` — readiness sem dados secretos.
- `POST /api/payments/pix` — cria cobrança PIX (API privada).
- `GET /api/payments/{id}` — consulta cobrança (API privada).
- `POST /api/webhooks/asaas` — recebe e persiste eventos autenticados.

## Situação e limites
A interface pública inclui uma prévia de dashboard marcada como demonstrativa. A API inicial cria cobranças na conta Asaas configurada. Ainda não há autenticação de usuários, contas individuais de vendedores, saldo de sellers, split, saques, liquidação para terceiros, nem painel administrativo de produção.

Para funcionar como plataforma de pagamentos para múltiplos vendedores, é necessário validar e contratar o modelo adequado com o provedor. O Asaas exige alinhamento prévio e implantação formal para BaaS; criar subcontas por API não habilita esse modelo automaticamente.

**Não use em produção antes de homologação, configuração dos segredos, validação jurídica/regulatória e revisão de segurança.** O Sandbox deve ser usado durante o desenvolvimento.
