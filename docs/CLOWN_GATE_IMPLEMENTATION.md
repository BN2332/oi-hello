# Clown Gate — implementação e operação

## Estado desta entrega

Esta branch contém a identidade visual, API server-side inicial para cobranças PIX via Asaas, persistência mínima no Supabase e recepção idempotente de webhooks. A integração opera em Sandbox por padrão.

**Não é uma instituição de pagamento e não mantém dinheiro de clientes.** O modelo implementado nesta etapa é de cobrança na conta Asaas vinculada à chave configurada no servidor. Não existe saldo de vendedor, saque, split, subconta, liquidação para terceiros, onboarding KYC de sellers ou painel autenticado de produção.

Para operar como plataforma com contas independentes de vendedores, será necessário alinhar o modelo com o Asaas. O produto BaaS exige implantação e aprovação prévia pelo Asaas. Não basta criar subcontas por API.

## Provedor selecionado

**Asaas** foi escolhido como primeiro adaptador por oferecer API de cobranças PIX, QR Code dinâmico, webhooks e opções de subcontas/split. O código usa a API padrão de cobrança em uma conta Asaas; não ativa BaaS automaticamente.

- Sandbox: https://api-sandbox.asaas.com/v3
- Produção: https://api.asaas.com/v3
- Autenticação API: header `access_token`.
- PIX: criar cobrança com `billingType: "PIX"`, depois consultar `/v3/payments/{id}/pixQrCode`.
- Webhook: validar o header `asaas-access-token` com o `authToken` configurado no Asaas.

Referências oficiais:
- https://docs.asaas.com/docs/visao-geral
- https://docs.asaas.com/docs/cobrancas-via-pix
- https://docs.asaas.com/docs/receba-eventos-do-asaas-no-seu-endpoint-de-webhook
- https://docs.asaas.com/docs/sobre-baas
- https://docs.asaas.com/docs/criacao-de-subcontas

## Configuração

1. Crie um projeto Supabase.
2. Abra o SQL Editor e execute `supabase/migrations/202611190001_clown_gate_core.sql`.
3. Crie/acesse uma conta Asaas e habilite o Sandbox.
4. Copie a chave de API Sandbox.
5. Configure as variáveis no ambiente do servidor:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `CLOWNGATE_API_SECRET`
   - `ASAAS_API_KEY`
   - `ASAAS_WEBHOOK_TOKEN`
   - `ASAAS_ENV=sandbox`
6. Configure um Webhook no Asaas apontando para `https://SEU-DOMINIO/api/webhooks/asaas`. Use exatamente o mesmo `ASAAS_WEBHOOK_TOKEN) como Auth Token no Asaas. O token deve ter 32–255 caracteres e não pode ser a API Key.
7. Faça deploy e confirme `GET /api/health`. O endpoint mostra somente indicadores booleanos de configuração, nunca valores secretos.

Nunca coloque `SUPABASE_SERVICE_ROLE_KEY`, `ASAAS_API_KEY`, `ASAAS_WEBHOOK_TOKEN` ou `CLOWNGATE_API_SECRET` no frontend, em commits, em issues ou em logs.

## API privada

Todas as rotas abaixo exigem `Authorization: Bearer CLOWNGATE_API_SECRET`, exceto o webhook.

### Criar cobrança PIX

`POST /api/payments/pix`

Headers:
- `Authorization: Bearer <segredo>`
- `Idempotency-Key: <chave única de 8 a 80 caracteres>`
- `Content-Type: application/json`

Body:
```json
{
  "customerName": "Cliente de teste",
  "customerCpfCnpj": "12345678909",
  "customerEmail": "cliente@example.com",
  "customerPhone": "11999999999",
  "amountCents": 4990,
  "description": "Pedido de teste"
}
```

O valor é informado em centavos inteiros. O limite padrão é R$ 10.000,00 e pode ser ajustado por `MAX_PIX_AMOUNT_CENTS`. A resposta inclui o ID interno, ID Asaas, status e QR Code/copia e cola. Reutilizar a mesma chave de idempotência retorna a cobrança já criada em vez de criar outra.

### Consultar cobrança

`GET /api/payments/{id}`

O ID é o identificador interno retornado pela criação. A rota exige a mesma autenticação privada.

### Webhook

`POST /api/webhooks/asaas`

O Asaas deve enviar `asaas-access-token`. O endpoint valida o token, persiste o evento antes de confirmar e usa o ID do evento para ignorar reentregas. Somente após a persistência responde HTTP 200. Eventos de pagamento atualizam o status local; confirmação não deve ser confundida com liquidação final sem considerar o status recebido do provedor.

### Health

`GET /api/health`

Retorna o estado de configuração sem expor segredos.

## Segurança e limites conhecidos

- A chave privada da API Clown Gate é compartilhada e adequada apenas a integração server-to-server nesta etapa; ainda não há autenticação de usuários, RBAC, chaves individuais por vendedor ou painel operacional real.
- O serviço não executa saques, split, transferências ou custódia de valores.
- O cadastro do pagador é enviado ao Asaas; o banco local armazena somente o hash SHA-256 do documento e o ID do cliente Asaas, não o CPF/CNPJ em texto puro.
- O primeiro deploy deve permanecer em Sandbox.
- A ativação em Produção exige homologação, análise de risco, validação jurídica/regulatória do modelo de negócio e aprovação do provedor.
- Antes de abrir a API a terceiros, implementar autenticação individual, rate limiting distribuído, limites por conta, proteção contra abuso, observabilidade, reconciliação e gestão de incidentes.
- A tela pública de dashboard ainda é uma prévia demonstrativa e não deve ser apresentada como painel autenticado ou saldo real.
