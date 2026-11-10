# GRECIA PAY

Aplicação independente da GRECIA PAY, com painel de cliente e carteira demonstrativa. Não possui integração com a GRECIA MM2.

## Recursos
- Painel de cliente responsivo para desktop e celular.
- Cadastro, login, consulta de sessão e logout via Supabase Auth.
- Visão de saldo demonstrativo zerado.
- Áreas de movimentações e perfil.
- Estados visuais de conta, segurança e instituição parceira.
- Depósitos e saques permanentemente desativados nesta versão.
- Nenhuma cobrança, transferência, custódia ou movimentação de dinheiro é realizada.

## Limites financeiros e regulatórios

Esta versão é exclusivamente demonstrativa. O saldo de R$ 0,00 não representa fundos reais. Não há geração de PIX, cobrança, recebimento de depósitos, manutenção de saldo sacável, transferência ou saque. Não solicite que clientes enviem dinheiro para a GRECIA PAY.

A habilitação futura de funcionalidades financeiras depende de análise jurídica e regulatória, contratação de instituição financeira ou instituição de pagamento parceira, diligência/KYC, contratos, controles antifraude e integração técnica aprovada. O projeto não se apresenta como banco, instituição de pagamento ou custodiante de recursos.

## Configurar autenticação

1. Crie um projeto Supabase.
2. Copie a Project URL e a chave publicável (anon/public).
3. Cadastre no ambiente de servidor/Secrets do deploy:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
4. Habilite Email/Password em Authentication → Providers.
5. Faça novo deploy após salvar os Secrets.

Não coloque chaves privadas ou `service_role` no navegador nem no GitHub. O backend usa cookies `HttpOnly`, `Secure` e `SameSite=Lax`.

### Endpoints
- `POST /api/auth/register` — cria uma conta de acesso.
- `POST /api/auth/login` — autentica e inicia a sessão.
- `GET /api/auth/me` — consulta a sessão e renova o token quando necessário.
- `POST /api/auth/logout` — encerra a sessão.

Sem as variáveis de ambiente, a API responde `503 LOGIN_NAO_CONFIGURADO`; o sistema não simula um login conectado.

## Desenvolvimento
```bash
npm install
npm run dev
npm run build
```
