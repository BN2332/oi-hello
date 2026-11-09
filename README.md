# L. Ribeiro Imóveis

Website institucional e catálogo demonstrativo da **L. Ribeiro Imóveis**, imobiliária localizada em Monte Sião – MG.

## Funcionalidades

- Página inicial com apresentação da imobiliária.
- Catálogo demonstrativo de imóveis para compra e locação.
- Filtros por finalidade, tipo, localização, faixa de preço e quartos.
- Página/modal de detalhes com galeria de imagens.
- Atalhos de contato pelo WhatsApp com mensagens contextualizadas.
- Formulário de interesse que encaminha a conversa para o WhatsApp.
- Endereço e acesso ao mapa.
- Layout responsivo para desktop, tablet e celular.

## Dados de contato

- **Endereço:** R. do Tanque, 70 - Lj A - Centro, Monte Sião - MG, 37580-000
- **WhatsApp:** (35) 99144-1538
- **Site atual:** http://www.lribeiroimoveis.imb.br/

## Executar localmente

Requisitos: Bun instalado.

```bash
bun install
bun run dev
```

Para gerar a versão de produção:

```bash
bun run build
```

## Importante sobre o catálogo

Os imóveis, valores, características e fotografias do catálogo atual são **conteúdo fictício e ilustrativo**, incluído apenas para demonstrar o funcionamento e o visual do site. Eles não representam ofertas reais da imobiliária. Substitua esses dados pelos anúncios autorizados antes de publicar o site como catálogo comercial.

## Estrutura principal

- `src/routes/index.tsx`: página e funcionalidades do site.
- `src/styles.css`: identidade visual, componentes e responsividade.
- `public/`: arquivos públicos do projeto.
