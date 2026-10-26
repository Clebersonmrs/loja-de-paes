# Relatório do projeto — Pães e Sabores

## 1. Resumo executivo

O projeto é uma landing page estática para uma padaria, construída com HTML, CSS e JavaScript puro. A página apresenta a marca, produtos em destaque, filtros por categoria, busca de produtos, busca de unidades, seção institucional e contato via WhatsApp.

O visual está bem encaminhado: há identidade de cores consistente, hierarquia visual clara, layout responsivo básico e uma estrutura de navegação simples. O código também é pequeno e fácil de entender.

O principal limite atual é funcional: os botões de adicionar produtos não implementam carrinho nem pedido, o mapa é apenas ilustrativo e os dados comerciais estão fixos no JavaScript. Além disso, existem inconsistências de marca/dados e dependências de imagens externas que podem prejudicar confiabilidade, desempenho e produção.

**Avaliação geral:** boa base visual para um MVP de apresentação, ainda não pronta para operar como cardápio/pedido real sem uma etapa adicional de produto e integração.

## 2. Escopo e tecnologia identificada

- **Frontend:** HTML5, CSS3 e JavaScript sem framework.
- **Arquivos principais:** `index.html`, `styles.css` e `script.js`.
- **Dados:** arrays estáticos de produtos e lojas no `script.js`.
- **Imagens:** parte local em `img/` e parte carregada de URLs externas.
- **Fonte:** Inter via Google Fonts.
- **Backend, build e testes:** não foram identificados manifestos de dependência, pipeline de build, backend ou testes automatizados.
- **Controle de versão:** o comando `git` não está disponível neste ambiente, portanto não foi possível avaliar histórico ou estado do repositório.

## 3. O que está funcionando bem

### Interface e experiência visual

- Paleta de cores coerente com o segmento de panificação.
- Boa separação entre hero, catálogo, história, localização e rodapé.
- Uso de `clamp`, grid e media queries para adaptação a telas menores.
- CTAs principais direcionam o usuário para produtos e localização.
- Campos de busca possuem `label` associado corretamente.
- A listagem de produtos e lojas é atualizada sem recarregar a página.
- Estados vazios existem para buscas sem resultado.

### Estrutura técnica

- HTML com `lang="pt-BR"`, viewport e meta description.
- Uso de elementos semânticos como `header`, `nav`, `main`, `section` e `footer`.
- Botões possuem `type="button"` e alguns controles possuem `aria-label`.
- Links externos do WhatsApp usam `noopener noreferrer`.
- O JavaScript tem uma separação razoável entre renderização de produtos e lojas.

## 4. Pontos de atenção encontrados

### Alta prioridade

1. **Ação de compra não implementada**

   Os botões `+` aparecem no hero e nos cards, mas não possuem listeners nem alteram estado. O texto “Peça agora” e “Adicionar ao carrinho” cria uma expectativa que o sistema não atende. Atualmente, o usuário não consegue montar um pedido.

   Referências: `index.html` nas áreas dos botões do hero e catálogo; `script.js` na renderização dos cards.

2. **Informações comerciais inconsistentes**

   O nome exibido é “Pães e Sabores do Irmão Antonio”, o `aria-label` do cabeçalho menciona “Padaria Delícia” e as unidades também usam “Padaria Delícia”. Isso pode confundir o cliente e prejudicar a identidade da marca.

   Referências: `index.html` no link da marca e `script.js` no array `stores`.

3. **Dados possivelmente fictícios ou não verificáveis**

   As estatísticas “12k+ clientes”, “4.9/5” e “18 lojas em SP” não têm fonte ou evidência na aplicação. Se não forem dados reais, podem comprometer credibilidade e comunicação comercial.

4. **Mapa não representa localização real**

   O mapa é uma ilustração com pontos A–D e não oferece endereço clicável, rota, mapa interativo ou geolocalização. Para um usuário que quer visitar a loja, a funcionalidade é insuficiente.

### Média prioridade

5. **Dependência de imagens externas**

   Produtos e imagens institucionais usam URLs de Unsplash, sites de terceiros e um domínio de imagem externo. Isso cria risco de imagem indisponível, alteração de conteúdo, bloqueio de hotlink, maior tempo de carregamento e dependência de terceiros.

6. **Imagens não usam `<img>` nos cards**

   As imagens dos produtos e da seção “Sobre” são aplicadas como `background-image`. Isso dificulta acessibilidade, carregamento otimizado, `alt`, `loading="lazy"` e otimização automática de dimensões.

7. **Dados e apresentação estão acoplados**

   Produtos, preços, descrições, lojas e contatos ficam hardcoded no JavaScript e HTML. Qualquer alteração comercial exige editar o código, aumentando o risco de erro e dificultando manutenção.

8. **Sem validação de negócio**

   Não há estoque, variação de tamanho, unidade de venda, disponibilidade por loja, taxa de entrega, horário atual, quantidade ou confirmação de pedido.

9. **Filtros não comunicam estado completo ao leitor de tela**

   A classe `active` altera o visual, mas os botões não atualizam `aria-pressed`. Também seria útil anunciar a quantidade de resultados após filtros e buscas.

10. **Foco e estados interativos incompletos**

    Existem estilos `:focus-visible` para alguns links e botões, mas os botões de categoria e de adicionar não têm estados de foco/hover tão claros quanto os CTAs principais.

### Baixa prioridade / qualidade do código

11. **CSS contém declarações inválidas ou ruído**

    Há `background-color:;` no `.brand-mark`, o texto solto `rb` após `.about-points` e regras de estilo com formatação inconsistente no bloco do WhatsApp. O navegador ignora parte disso, mas o ruído reduz a confiabilidade e dificulta manutenção.

12. **Nomes e textos precisam de revisão editorial**

    Há pequenas inconsistências de nomenclatura e conteúdo, como “Acre e doce” na descrição da torta de limão, que provavelmente deveria ser “Ácida e doce”. Também vale padronizar “panetone”, “pães” e nomes de unidades.

13. **Ausência de documentação operacional**

    Não há README com instruções para executar, publicar, atualizar produtos ou trocar o número do WhatsApp.

## 5. Sugestões de melhorias priorizadas

### Fase 1 — Correções rápidas e confiabilidade

1. Padronizar o nome da marca em todo o HTML, JavaScript, acessibilidade, título e contatos.
2. Remover declarações inválidas do CSS e corrigir textos editoriais.
3. Confirmar os endereços, horários, telefone, e-mail e estatísticas antes da publicação.
4. Baixar ou hospedar localmente as imagens usadas no site e definir dimensões adequadas.
5. Transformar os endereços em links para Google Maps ou OpenStreetMap com rota.
6. Adicionar `aria-pressed` aos filtros e melhorar os estilos `:focus-visible`.
7. Criar um `README.md` com execução local, publicação e processo de atualização.

### Fase 2 — MVP de pedidos

1. Criar um estado de carrinho com produto, quantidade e subtotal.
2. Mostrar contador e painel/modal de carrinho.
3. Permitir remover itens, alterar quantidade e limpar o carrinho.
4. Gerar pedido por WhatsApp com resumo, quantidades e total.
5. Validar campos necessários, como nome, unidade, retirada/entrega e observações.
6. Substituir “Peça agora” por uma ação que realmente abre o fluxo de pedido.

Uma solução simples e adequada ao estágio atual é manter o frontend sem framework e gerar uma mensagem de WhatsApp. Não é necessário começar por um backend completo se o objetivo inicial for receber pedidos manualmente.

### Fase 3 — Conteúdo administrável e crescimento

1. Mover produtos e lojas para JSON versionado ou CMS.
2. Adicionar disponibilidade por unidade, estoque e horários especiais.
3. Usar imagens responsivas (`srcset`, `sizes`, WebP/AVIF) e carregamento lazy.
4. Adicionar analytics com eventos para busca, filtro, clique no WhatsApp e conversão.
5. Criar dados estruturados `LocalBusiness`/`Bakery` para SEO local.
6. Adicionar página ou seção de avaliações reais, políticas de entrega e perguntas frequentes.
7. Evoluir para backend somente quando houver necessidade de pagamento, estoque centralizado, login ou acompanhamento de pedidos.

## 6. Roteiro técnico recomendado

### Curto prazo

- Corrigir marca, conteúdo e CSS inválido.
- Validar todos os links e imagens.
- Implementar carrinho local e geração de pedido no WhatsApp.
- Trocar mapa ilustrativo por links de rota.
- Testar em celular, tablet e desktop.

### Médio prazo

- Separar os dados de catálogo em arquivo próprio.
- Adicionar testes básicos para filtro, busca e carrinho.
- Configurar lint/formatador e uma validação automática simples.
- Otimizar imagens e medir desempenho com Lighthouse.

### Longo prazo

- Adotar CMS ou painel de administração.
- Integrar estoque, pedidos e pagamentos se o volume justificar.
- Criar observabilidade mínima: analytics, logs de falhas e monitoramento de disponibilidade.

## 7. Critérios de aceite sugeridos

Antes de publicar uma versão comercial, a página deveria atender pelo menos aos seguintes critérios:

- Todos os nomes, telefones, endereços e horários foram confirmados.
- Todas as imagens carregam sem depender de domínios externos não controlados.
- O usuário consegue adicionar, revisar e remover produtos.
- O pedido gerado contém unidade, itens, quantidades e observações.
- Todos os filtros e buscas funcionam via teclado e leitor de tela.
- Não existem erros no console do navegador.
- A página é utilizável em largura de 320 px sem cortes ou sobreposição.
- O caminho principal até o contato/pedido pode ser concluído em poucos cliques.

## 8. Conclusão

O projeto tem uma boa fundação visual e uma implementação simples, adequada para uma primeira presença online. A prioridade não deve ser trocar a tecnologia, e sim transformar a apresentação em uma experiência comercial consistente: corrigir os dados, remover dependências frágeis, tornar o contato acionável e implementar o fluxo mínimo de pedido.

Com as melhorias da Fase 1 e o carrinho via WhatsApp da Fase 2, o site já poderá funcionar como um MVP útil para divulgação e recebimento de pedidos. Um backend ou CMS deve ser considerado depois, baseado no volume real de produtos, lojas e pedidos.
