---
name: caso:pesquisar
description: "Fase 3 de 5 — pesquisa jurídica aprofundada: ementas integrais de precedentes, doutrina, legislação aplicável, fatos externos. Produz PESQUISA.md com blocos prontos para colagem. Depende de /caso:discutir."
---

# /caso:pesquisar — Fase 3 de 5 (Pesquisa jurídica)

Você está na **fase 3 de 5**. Vai transformar o briefing de pesquisa da fase 2 em um arquivo com blocos citáveis prontos para a peça. Ao final, gravará `.caso/fases/3-pesquisa/PESQUISA.md`.

## LEIA PRIMEIRO (obrigatório, não pular)

Use o Read tool AGORA, nesta ordem, antes de qualquer outra coisa:

1. `.caso/fases/2-discussao/DISCUSSAO.md` — seu briefing principal
2. `.caso/CASO.md` — só para ter tipo de peça e partes em mente
3. `.caso/ESTADO.md`
4. `~/.claude/commands/caso/templates/PESQUISA.md`
5. `~/.claude/commands/caso/references/gestao-contexto.md`
6. `~/.claude/commands/caso/references/pesquisa-jurisprudencia.md` — protocolo detalhado (fontes, fases, formato de retorno, regras de qualidade)

**Se `.caso/fases/2-discussao/DISCUSSAO.md` não existir**, pare e diga: "Discussão não encontrada. Rode `/caso:discutir` antes."

**Não leia `DOSSIE.md` nem `RESUMO-*.md` nesta fase.** Os fatos já foram sintetizados na `DISCUSSAO.md`. Você só volta a eles se a `DISCUSSAO.md` for explicitamente insuficiente para guiar a pesquisa.

## O que fazer nesta fase

### 1. Executar o protocolo de pesquisa

Siga o protocolo definido em `~/.claude/commands/caso/references/pesquisa-jurisprudencia.md` (seções 1–6):

- **Fontes prioritárias:** STJ, STF, TST, TRFs, Planalto (tabela com URLs na seção 1).
- **Queries:** variações da seção 3.
- **Mínimo de 8 buscas** cobrindo STJ (repetitivo), STF (repercussão geral), súmulas, tribunal de 2ª instância, doutrina, informativos (seção 4, Fase B).
- **Verificação obrigatória:** abra o link oficial com WebFetch antes de citar qualquer julgado. Só entra no `PESQUISA.md` o que foi VERIFICADO (seção 4, Fase C).
- **Se o contexto ficar pesado** durante a pesquisa (muitas SERPs abertas), use o Agent tool com `subagent_type=general-purpose` para delegar um lote de buscas e receber só o achado sintetizado — isso mantém o contexto principal enxuto. Não é obrigatório, mas é útil quando há 4+ teses para cobrir.

### 2. Para cada tese adotada na `DISCUSSAO.md`: montar precedentes

Para cada tese T1, T2, ...:
- Buscar 2–4 precedentes relevantes (prefira tribunais superiores e tribunal de destino da peça).
- Para cada precedente: **obter a ementa integral** (nunca parcial — regra firme em `references/pesquisa-jurisprudencia.md`, seção 4).
- Se a ementa integral não for encontrável, registrar o link público e a observação "Ementa parcial. Consultar íntegra em [URL]".
- Formatar em blockquote, com negritos em markdown nos trechos-chave (dispositivo invocado, conclusão, expressões centrais como "ampla e irrestrita recorribilidade").
- Referência completa no formato: `(Tribunal – Tipo: Nº, Relator: Nome, Data de julgamento: DD/MM/AAAA, Órgão, Data de publicação: DD/MM/AAAA)`.

### 3. Doutrina

Para cada tese que se beneficia, trazer 1–2 citações doutrinárias literais, em blockquote, com referência completa (autor, obra, edição, página). Se a obra não for acessível, registre o nome da tese defendida pelo autor com referência ao tratado.

### 4. Legislação aplicável

Liste artigos, leis, súmulas pertinentes. Para dispositivos curtos, transcreva. Para longos, referencie e sumarize.

### 5. Fatos externos (quando aplicável)

Se a `DISCUSSAO.md` indicar necessidade (casos de conduta reiterada, fraude, prática abusiva), pesquisar em Reclame Aqui, notícias, Procon — **apenas via WebSearch, nunca inventar**. Registrar com URL e data de consulta. Mínimo 3 exemplos quando disponíveis.

### 6. Registrar gaps

Se você tentou encontrar algo e não encontrou, registre em "Gaps identificados" na `PESQUISA.md`. Isso avisa a fase 4 que aquela tese terá fundamentação mais leve.

## ENCERRAMENTO (obrigatório)

1. **Escreva `.caso/fases/3-pesquisa/PESQUISA.md`** preenchendo o template, com todos os blocos já formatados para colagem na peça final (blockquotes, negritos em markdown, referências completas).

2. **Atualize `.caso/ESTADO.md`** com `fase_concluida: 3`, `proxima_fase: 4`, timestamp.

3. **Atualize o `status` no frontmatter de `.caso/CASO.md`** para `fase-3-pesquisada`.

4. **Diga ao usuário**, literalmente:

> Fase **3 — pesquisa** concluída. Artefato em `.caso/fases/3-pesquisa/PESQUISA.md` com ementas integrais prontas para colagem.
>
> Para preservar contexto para o plano:
> 1. Rode `/clear`
> 2. Depois `/caso:planejar` para continuar
>
> Você não perde nada — `/caso:planejar` relerá `DISCUSSAO.md` + `PESQUISA.md`.

## O que NÃO fazer aqui

- Não reabrir a discussão de teses. Se uma tese se mostrou insustentável, registre em Gaps; a fase 4 decide o que fazer.
- Não redigir trechos da peça.
- Não puxar PDFs grandes dos documentos de volta ao contexto.
- Não colar output bruto de ferramentas de pesquisa sem síntese.
