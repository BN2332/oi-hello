# GRECIA PAY

Website independente para apresentação da experiência de checkout GRECIA PAY.

## Sobre
Interface premium em preto e verde, responsiva para desktop e dispositivos móveis. O projeto é independente de qualquer outra loja ou aplicação.

## Recursos da interface
- Landing page institucional da GRECIA PAY.
- Apresentação de recursos, fluxo de pagamento e planos ilustrativos.
- Demonstração interativa de checkout e revisão de pedido.
- FAQ, contato e navegação responsiva.
- Avisos claros de ambiente demonstrativo e processamento por gateway externo.

## Importante
Esta versão contém a interface demonstrativa. Não processa pagamentos reais, não cria contas reais e não armazena transações. Para produção, configure um gateway de pagamento externo, backend seguro, autenticação, banco de dados, webhooks assinados, controles administrativos e páginas legais. O nome do gateway responsável deve ser exibido no checkout.

## Desenvolvimento
```bash
npm install
npm run dev
npm run build
```


## Autenticação GRECIA PAY

O projeto inclui endpoints de cadastro, login, consulta de sessão e logout usando Supabase Auth. As senhas são gerenciadas pelo Supabase Auth; o site não armazena senhas em texto puro.

### Configuração obrigatória antes de usar o login

1. Crie ou conecte um projeto Supabase para a GRECIA PAY.
2. No painel do projeto, copie a Project URL e a chave publicável (anon/public).
3. Cadastre estas variáveis no ambiente de servidor/Secrets do deploy:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
4. Habilite Email/Password em Authentication → Providers e configure a confirmação de e-mail conforme a política da operação.
5. Faça novo deploy após salvar os Secrets.

**Não coloque chaves privadas ou `service_role` no navegador nem no GitHub.** O backend usa cookies `HttpOnly`, `Secure` e `SameSite=Lax` para manter a sessão.

### Endpoints

- `POST /api/auth/register` — cria uma conta.
- `POST /api/auth/login` — autentica e inicia a sessão.
- `GET /api/auth/me` — consulta a sessão e renova o token quando necessário.
- `POST /api/auth/logout` — encerra a sessão.

Sem as duas variáveis de ambiente, a API responde `503 LOGIN_NAO_CONFIGURADO`; isso evita simular um login que não está conectado a um provedor real.
