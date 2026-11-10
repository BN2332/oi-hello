# GRECIA PAY

Aplicação independente da GRECIA PAY. Esta versão oferece painel demonstrativo e autenticação de acesso via Supabase Auth. Não está conectada a uma instituição financeira e não recebe, guarda ou transfere dinheiro.

## Auditoria e causa raiz

1. O frontend chamava `/api/auth/*` diretamente com `fetch` e executava `response.json()` sem validar o tipo de conteúdo.
2. O manifesto de rotas gerado continha somente a rota `/` (e as rotas de autenticação foram acrescentadas manualmente depois); isso fazia as URLs da API caírem no tratamento de rota/fallback e receberem HTML.
3. O wrapper de servidor também podia converter erros de API em páginas HTML. Agora as rotas são registradas, existe `/api/health` e respostas não JSON em `/api/*` são convertidas em erro JSON.

## Auditoria das chamadas e rotas

Todas as chamadas da interface de autenticação estão centralizadas em `src/lib/api.ts`:
- `GET /api/auth/me` — consultar sessão.
- `POST /api/auth/login` — entrar.
- `POST /api/auth/register` — criar conta.
- `POST /api/auth/logout` — sair.

Rotas do servidor:
- `GET /api/health`
- `GET /api/auth/me`
- `POST /api/auth/login`
- `POST /api/auth/register`
- `POST /api/auth/logout`

O frontend usa caminhos relativos por padrão (mesma origem, sem divergência de porta/domínio). Para API hospedada em outra origem, defina `VITE_API_BASE` e configure `SITE_URL` no ambiente do servidor. Não foi encontrado Express neste repositório: o backend existente é TanStack Start com runtime Nitro/Cloudflare. Portanto, não se deve adicionar um segundo servidor Express nem copiar a ordem de middlewares Express; o tratamento equivalente é aplicado no entry server do TanStack Start.

## Cliente HTTP

`src/lib/api.ts` fornece um único helper `api(path, options)` para as chamadas do frontend. Ele serializa objetos JSON, define Content-Type, verifica o content-type antes de interpretar, informa status/rota/prévia quando recebe HTML, trata erros HTTP, queda de rede e timeout de 15 segundos. O modal exibe a mensagem amigável em vez de `Unexpected token`.

Se a página for aberta por `file://`, o helper informa: "Abra pelo endereço do servidor (ex.: http://localhost:3000)".

## Rodar localmente

Requisitos: Node.js 20 ou superior.

```bash
npm install
cp .env.example .env
npm run dev
```

Abra **http://localhost:3000**. Não abra o arquivo HTML diretamente pelo explorador.

Build e preview local:
```bash
npm run build
npm run start
```

O script `start` executa o preview do build na porta 3000. O projeto usa TanStack Start/Nitro com preset padrão Cloudflare da configuração Lovable; o artefato final de produção deve ser publicado no runtime compatível indicado pelo provedor. Não é um servidor Express/Node tradicional.

## Verificar a API

Com o servidor em execução, abra:
`http://localhost:3000/api/health`

Resposta esperada:
```json
{ "ok": true, "version": "1.0.0", "time": "2026-01-01T00:00:00.000Z" }
```

Teste automatizado sem dependências adicionais:
```bash
npm run test:api
```

Para testar outro endereço:
```bash
API_URL=https://seu-dominio.example npm run test:api
```

O teste verifica health, sessão, login, cadastro e logout, incluindo status HTTP e Content-Type.

## Variáveis de ambiente

Copie `.env.example` e configure:
- `VITE_API_BASE`: vazio para mesma origem; URL absoluta somente se a API estiver em outro domínio.
- `SUPABASE_URL`: URL do projeto Supabase.
- `SUPABASE_ANON_KEY`: chave publicável/anon do Supabase.
- `SITE_URL`: origem exata do frontend quando front e API forem separados.

Configure segredos no ambiente de deploy, nunca no GitHub ou no navegador. Não use a chave `service_role` no frontend.

## Hospedagem e deploy

GitHub Pages e hospedagem estática pura não executam rotas de servidor. Não publique apenas os arquivos estáticos esperando que `/api/*` funcione. Use o deploy de aplicação full-stack do Lovable/TanStack Start no runtime compatível, ou hospede o backend em serviço que execute o runtime Node/Worker e configure `VITE_API_BASE` para a URL HTTPS da API. Em Vercel/Netlify, configure funções serverless e rewrites explicitamente; não use fallback SPA para interceptar `/api/*`.

O dev server e o preview estão fixados na porta 3000. Como a API é same-origin por padrão, não é necessário proxy separado. Se optar por front e back em portas diferentes, defina `VITE_API_BASE` para o backend e `SITE_URL` para a origem do site; CORS permite somente essa origem e trata OPTIONS.

## Tabela de erros comuns

| Sintoma | Causa provável | Solução |
|---|---|---|
| HTML / `Unexpected token '<'` | API inexistente, build antigo ou fallback SPA | Publique o build full-stack atualizado e confira `/api/health` |
| HTTP 404 em `/api/*` | Rota não registrada no servidor | Verifique arquivos de rota e manifesto gerado |
| HTTP 503 `LOGIN_NAO_CONFIGURADO` | Secrets Supabase ausentes | Configure `SUPABASE_URL` e `SUPABASE_ANON_KEY` |
| Erro de CORS | `SITE_URL` não corresponde à origem do navegador | Configure a origem exata, incluindo protocolo e porta |
| Timeout após 15 s | Backend indisponível ou provedor lento | Verifique deploy e logs do servidor |
| Falha ao abrir pelo arquivo local | Site aberto com `file://` | Use `http://localhost:3000` |
| API funciona local, mas não publicada | Hospedagem estática sem runtime server | Use deploy full-stack ou backend serverless/Worker |

## Limites financeiros

Depósitos e saques permanecem desativados. O saldo demonstrativo não representa fundos reais. A aplicação não é banco, instituição de pagamento nem custodiante de recursos.
