# Navalha 27 — site demonstrativo de barbearia

Projeto de apresentação criado para a Bryan Digital Studio. A marca, endereço, contatos, profissionais, preços e horários são fictícios e servem exclusivamente para demonstrar a experiência ao potencial cliente.

## O que está incluído

- Página premium responsiva com identidade visual carvão, off-white e dourado envelhecido.
- Catálogo de serviços com duração e preço demonstrativos.
- Cartões de barbeiros fictícios.
- Fluxo de agendamento em cinco etapas.
- Cálculo de duração e valor, seleção de profissional, data e horário.
- Bloqueio de conflitos entre reservas armazenadas neste navegador.
- Tela de sucesso com código, resumo e link para WhatsApp demonstrativo.
- Painel local do proprietário em `#admin`, com PIN demonstrativo `2026`, lista por dia, concluir/cancelar e exportação CSV.
- Avisos explícitos de que o conteúdo e os agendamentos são simulados.

## Rodar localmente

Requisitos: Node.js 20 ou superior.

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

Para gerar o build:
```bash
npm run build
npm run start
```

## Personalização

Edite o objeto `CONFIG` no início de `src/routes/index.tsx`. Substitua nome, slogan, cidade, endereço, WhatsApp, Instagram, horários, serviços, preços, barbeiros e regras de agenda pelos dados reais do estabelecimento.

Altere também o texto dos avisos de demonstração somente quando a aplicação estiver conectada a um backend real e os dados tiverem sido validados com o proprietário.

## Limitações da demonstração

Os agendamentos são guardados em `localStorage`, portanto existem apenas no navegador e dispositivo em que foram criados. Não há bloqueio compartilhado entre clientes, autenticação real do painel, envio de notificações, confirmação real por WhatsApp, integração de pagamento ou banco de dados. O PIN `2026` é público e não deve ser usado em produção.

Antes de utilizar comercialmente, implemente uma API com persistência compartilhada, autenticação segura para administração, validação no servidor, proteção contra reservas simultâneas e substitua todos os dados fictícios pelos dados oficiais.
