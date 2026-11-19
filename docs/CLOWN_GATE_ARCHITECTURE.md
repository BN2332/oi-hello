# Clown Gate

Plataforma de pagamentos PIX em desenvolvimento.

## Estado atual

Esta branch entrega a primeira camada visual da Clown Gate: landing page responsiva, apresentação de módulos, prévia de dashboard claramente identificada como demonstrativa e documentação inicial da arquitetura.

**Ainda não processa pagamentos reais.** Não existe provedor conectado, backend financeiro, autenticação de vendedores, ledger de produção, saques ou webhooks operacionais nesta etapa.

## Direção do produto

- Método inicial: PIX.
- Cadastro: público, sujeito a análise e aprovação antes de processar pagamentos.
- Provedor: a decidir.
- Integração: camada Payment Provider Adapter para evitar acoplamento a um fornecedor.
- Identidade: Dark Carnival Fintech, preto, vermelho e off-white.

## Arquitetura planejada

A implementação de produção deverá separar:
- Aplicação web e área do vendedor.
- API de pagamentos.
- Administração e RBAC.
- PostgreSQL e migrations.
- Núcleo financeiro com ledger imutável em centavos.
- Adaptadores de provedores.
- Webhooks validados, idempotentes e auditáveis.

## Requisitos para produção

1. Escolher o provedor e validar documentação oficial.
2. Criar backend e banco de dados.
3. Implementar autenticação, KYC/controles de conta e isolamento multi-tenant.
4. Implementar cobranças PIX no ambiente sandbox do provedor.
5. Validar assinatura de webhooks e idempotência.
6. Implementar ledger, conciliação e saques apenas com integração autorizada.
7. Executar testes de segurança, homologação e checklist operacional.

Não inserir credenciais no repositório. Use secrets do ambiente de deploy. Nunca usar dados demonstrativos como saldo ou pagamento real.
