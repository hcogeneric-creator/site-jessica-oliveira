# Site da Jessica Oliveira · Nutricionista

Site estático (HTML + CSS + JS puro, sem build). Hospedado grátis no **GitHub Pages**.
Publicar = `git add -A && git commit -m "..." && git push`. O site atualiza sozinho em ~1 minuto.

Origem: design feito no Claude Design (projeto `5bc2915b-a156-4220-a05a-2cd19c25ae91`), convertido em site real em 19/10/2026.

## Onde mudar cada coisa

| Quero mudar... | Arquivo |
|---|---|
| Telefone/WhatsApp, e-mail, Instagram, CRN, cidade | `assets/site.js` (objeto `SITE` no topo) |
| Preços das consultas | `assets/site.js` → `servicos` |
| Dias e horários de atendimento do calendário | `assets/site.js` → `diasAtendimento`, `horarios` |
| Qualquer texto do site (PT e EN) | `assets/i18n.js` — o texto em `data-i18n="chave"` vem daqui. Mude nas duas línguas |
| Menu e rodapé | gerados por `assets/site.js` (não estão no HTML das páginas) |
| Cores e fontes | `assets/styles.css` → `:root` |
| Foto da Jessica | `assets/jessica.jpeg` (quadrada ou retrato, ~800px, < 300 KB) |
| Depoimentos | início: `tm.*` em `i18n.js`; agendar: array `testimonials` em `agendamento.html` |
| Produtos recomendados | `produtos.html` — cada `.product-card`. Botão só aparece quando `href` não é `#` |

## Páginas
- `index.html` início · `sobre.html` · `blog.html` lista de artigos · `artigo-creatina.html`
- `agendamento.html` — 3 passos; no fim abre o WhatsApp da Jessica com o pedido preenchido (nada é guardado no site)
- `produtos.html` recomendações (afiliado Amazon) · `privacidade.html` LGPD · `404.html`

## Publicar um artigo novo
1. Copie `artigo-creatina.html` para `artigo-<tema>.html`, troque título, `<meta description>`, chip de categoria e o texto dentro de `<div class="prose">`. Textos do cabeçalho podem ser escritos direto no HTML (sem `data-i18n`).
2. Em `blog.html` (e no início, se for destaque), troque o `<div class="card soon" ...>` correspondente por `<a href="artigo-<tema>.html" class="card tilt" ...>` e remova o `<span class="soon-tag">`.
3. Adicione a URL em `sitemap.xml` (quando existir).

## Regras
- Toda página tem `<body data-page="...">`, `<div id="site-nav">`, `<div id="site-footer">` e carrega `site.js` → `i18n.js` → `app.js` nessa ordem.
- Linhas de grid de 2 colunas usam a classe `split` (vira 1 coluna no celular). Não criar grid com colunas fixas inline sem `split`.
- Testar no celular (largura 375px) antes de publicar.
- Ela é nutricionista: textos de saúde devem ser revisados por ela. Nada de prometer resultado. Depoimentos e "antes/depois" seguem o Código de Ética do CFN — confirmar com ela antes de publicar.

## Pendências (A CONFIRMAR) — buscar "A CONFIRMAR" no código
- [ ] Número do CRN (Paraná é CRN-8) → `site.js` (e-mail, WhatsApp e Instagram já reais)
- [x] Foto: original `jessica.jpeg` (sobre), recortes `jessica-quadrada.jpg` (início) e `jessica-rosto.jpg` (menu/avatares)
- [ ] Números do topo (+450 pacientes, 7 anos, 96%) → `i18n.js` `hero.stat.*`
- [ ] Depoimentos reais e autorizados (ou remover)
- [ ] Preços e formas de pagamento
- [ ] Links de afiliado Amazon nos produtos
- [ ] Revisar texto do artigo de creatina
- [ ] Lançamento: remover `<meta name="robots" content="noindex">` de todas as páginas, criar `sitemap.xml`/`robots.txt`, cadastrar no Google Search Console e no Google Meu Negócio
