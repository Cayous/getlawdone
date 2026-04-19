---
name: pesquisa-jurisprudencia
description: Protocolo de pesquisa de jurisprudência brasileira (STJ, STF, TRFs, TJs, súmulas, doutrina). Fontes oficiais, estratégia de queries, fases de busca, formato de retorno e regras de qualidade. Usado pelas fases /caso:discutir (sondagem) e /caso:pesquisar (pesquisa profunda).
---

# Pesquisa de jurisprudência — protocolo

Este arquivo é o manual de pesquisa do fluxo `/caso:*`. `/caso:discutir` faz **sondagem rápida** (identificar se a tese tem lastro) e `/caso:pesquisar` faz **pesquisa profunda** (ementas integrais, doutrina, legislação, fatos externos). Ambas seguem as regras aqui.

## 1. Fontes oficiais (prioridade máxima)

| Tribunal | URL de pesquisa |
|----------|-----------------|
| STJ | https://jurisprudencia.stj.jus.br/docs/pesquisa |
| STF | https://jurisprudencia.stf.jus.br/pages/search |
| TST | https://jurisprudencia.tst.jus.br/ |
| TRF1 | https://jurisprudencia.trf1.jus.br/ |
| TRF2 | http://www10.trf2.jus.br/consultas/ |
| TRF3 | https://web.trf3.jus.br/base/juridica |
| TRF4 | https://jurisprudencia.trf4.jus.br/ |
| TRF5 | https://www5.trf5.jus.br/jurisprudencia/ |
| Legislação | https://www.planalto.gov.br/ccivil_03/ |
| Súmulas STJ | https://www.stj.jus.br/docs_internet/sumulas.pdf |
| Súmulas STF | https://portal.stf.jus.br/jurisprudencia/sumariosumulas.asp |

## 2. Fontes secundárias confiáveis

| Fonte | URL | Uso |
|-------|-----|-----|
| Jusbrasil | https://www.jusbrasil.com.br/jurisprudencia/ | Pesquisa geral, ementas e tribunais estaduais |
| LexML | https://www.lexml.gov.br/ | Legislação e normas |
| Consultor Jurídico (ConJur) | https://www.conjur.com.br/ | Notícias e análises recentes |
| Migalhas | https://migalhas.uol.com.br/ | Informativos jurídicos |
| Reclame Aqui | https://www.reclameaqui.com.br/ | Para fatos externos (prática reiterada, conduta abusiva) |

## 3. Estratégia de queries

Para cada questão jurídica, monte queries variadas:

1. `[tribunal] [tema] jurisprudência [ano recente]`
2. `[artigo de lei] [tema] julgados`
3. `súmula [tema] STJ STF`
4. `[tema] [consequência pretendida] precedentes`
5. `[tema] recurso repetitivo STJ tese jurídica`
6. `[tema] repercussão geral STF`

Prefira sempre os últimos 5 anos para captar jurisprudência atualizada. Acima disso só se houver consolidação antiga ainda vigente.

## 4. Protocolo de busca por fases

### Fase A — Leitura do briefing

Antes de qualquer busca, extraia do `DISCUSSAO.md` (ou da tese candidata em `/caso:discutir`):
- Ramo do direito (civil, consumidor, trabalhista, família, tributário, processual, etc.)
- Fatos principais
- Questões jurídicas formuladas (o que se quer provar)
- Legislação já identificada
- Tipo de peça e tribunal de destino

### Fase B — Execução (mínimo 8 buscas para pesquisa profunda, 3–4 para sondagem)

Cobertura esperada:

1. **Buscas 1–2:** Tese principal no STJ — priorize **recurso repetitivo** (art. 1.036 CPC) ou **tema repetitivo**.
2. **Busca 3:** Tema no STF, especialmente se houver **repercussão geral**.
3. **Busca 4:** **Súmulas** aplicáveis (STJ, STF, e TST se trabalhista).
4. **Busca 5:** Jurisprudência recente (últimos 2 anos) no tribunal de 2ª instância relevante para a peça (TJ local ou TRF).
5. **Busca 6:** Tribunal especializado — TST (trabalhista), TRF (federal), STM (militar), TSE (eleitoral) — conforme o caso.
6. **Busca 7:** Doutrina e artigos jurídicos sobre o tema (Conjur, Migalhas, obras clássicas do ramo).
7. **Busca 8:** **Informativo de jurisprudência** do STJ/STF sobre o tema (publicações oficiais periódicas).

### Fase C — Verificação dos julgados

Para cada julgado promissor:

1. **Abra o link oficial com WebFetch** e confirme: número correto, ementa, relator, data de julgamento, data de publicação, resultado (unanimidade/maioria, procedência).
2. **Classifique:**
   - ✅ **VERIFICADO** — acessou a fonte primária e leu a ementa integral.
   - ⚠️ **NÃO VERIFICADO** — apenas localizou em fonte secundária, sem conferência primária.
3. **Apenas cite julgados VERIFICADOS** no artefato da fase (`DISCUSSAO.md` ou `PESQUISA.md`). Não verificados só entram como "indicação para verificação humana".

### Fase D — Ementa integral

A regra de ouro: **ementa integral, nunca parcial.** A fase 5 (`/caso:executar`) vai colar a ementa na peça — precisa estar completa e com negritos nos trechos centrais.

Se a ementa integral **não for obtível** (fonte secundária sem texto completo, acesso pago):
- Registre o trecho disponível.
- Adicione nota: `"Ementa parcial. Consultar íntegra em [URL ou fonte]"`.
- Marque o item como "ementa a completar" nos Gaps da `PESQUISA.md`.

### Fase E — Legislação

Verifique **no Planalto** a **redação atual** dos artigos citados (pode ter sofrido alteração). Identifique:
- Lei principal aplicável.
- Alterações recentes (MPs, emendas).
- Regulamentações (decretos, resoluções).

Nunca cite texto legal de memória — confirme no Planalto.

### Fase F — Temas repetitivos / vinculantes

Procure especificamente:
- **Recurso Especial Repetitivo** no STJ (art. 1.036 CPC).
- **Repercussão Geral** no STF.
- **IRDR** (Incidente de Resolução de Demandas Repetitivas) no tribunal local.
- **IAC** (Incidente de Assunção de Competência).

Teses vinculantes são **ouro** — priorize-as. Referencie o número do tema e a tese fixada.

## 5. Fatos externos (quando aplicável)

Quando a tese inclui alegação de **prática reiterada**, **conduta abusiva da ré**, **fraude recorrente**, **vício sistêmico de produto/serviço**, pesquise fontes públicas:

- **Reclame Aqui** — reclamações específicas contra a parte ré com os mesmos termos do caso.
- **Procon / consumidor.gov.br** — dados públicos.
- **Notícias** — reportagens sobre a conduta da empresa.

Regras:
- **Nunca invente reclamações ou URLs.** Use apenas dados obtidos via WebSearch/WebFetch.
- **Mínimo 3 exemplos concretos** quando disponíveis (data, valor, descrição curta).
- **URL completa** como fonte em cada exemplo.
- Se não encontrar 3 exemplos, omita a seção e use redação genérica.

## 6. Formato de retorno (para `PESQUISA.md`)

Os achados da pesquisa profunda devem ser gravados em `PESQUISA.md` com esta estrutura (adaptando o template):

```markdown
### TESES JURÍDICAS CONSOLIDADAS

**Tese 1 — [enunciado]**
- Fonte: [STJ Tema X / STF RE Y / Súmula N]
- Status: VINCULANTE / PERSUASIVO
- Link: [URL]

### JURISPRUDÊNCIA — TRIBUNAIS SUPERIORES

#### STJ

**[1] [Tipo de recurso] [número] — [órgão julgador]**

> EMENTA. [TEMA PRINCIPAL, em caixa alta]. **[trecho relevante em bold]**. [continuação do texto integral da ementa...]

- Relator: [nome]
- Data julgamento: DD/MM/AAAA
- Data publicação: DD/MM/AAAA
- Resultado: [unanimidade/maioria, procedente/improcedente]
- Relevância: [como se aplica ao caso]
- Link: [URL verificada]
- Status: ✅ VERIFICADO

#### STF
[mesma estrutura]

### SÚMULAS APLICÁVEIS

| Nº | Tribunal | Texto | Link | Aplicação |
|----|----------|-------|------|-----------|

### TEMAS REPETITIVOS / REPERCUSSÃO GERAL

| Nº | Tribunal | Tese | Status | Link |
|----|----------|------|--------|------|

### LEGISLAÇÃO VERIFICADA

| Diploma | Artigo | Redação atual | Link (Planalto) |
|---------|--------|---------------|-----------------|

### DOUTRINA

[Autor, obra, edição, página, posicionamento]

### TENDÊNCIA JURISPRUDENCIAL

[FAVORÁVEL / DESFAVORÁVEL / DIVIDIDA / EM FORMAÇÃO — breve justificativa]

### ALERTAS E RISCOS

- [Jurisprudência contrária relevante que DEVE ser mencionada ou antecipada]
- [Tese defensiva comum da parte contrária]

### GAPS IDENTIFICADOS

- [O que não foi possível encontrar ou verificar]
- [Itens que a fase 4 deve tratar com fundamentação mais leve ou pedido de verificação humana]

### FONTES CONSULTADAS

[Lista de URLs acessadas com WebFetch, organizadas por tribunal]
```

## 7. Sondagem (fase `/caso:discutir`) — versão reduzida

Na sondagem, a meta é **apenas confirmar se a tese tem chão** — não produzir ementas integrais. Basta:

- 1 a 2 buscas por tese candidata.
- Identificar se há tema repetitivo, súmula ou julgado recente favorável/contrário.
- Registrar no `DISCUSSAO.md` como nota: `"há julgado favorável no STJ (REsp X, ano Y) — ementa integral fica para /caso:pesquisar"`.
- Descartar tese se a sondagem revela jurisprudência dominante contrária — o motivo vai em "Teses descartadas".

A pesquisa profunda (ementas, doutrina, referências completas) é sempre na fase 3.

## 8. Regras de qualidade (invioláveis)

1. **Nunca fabrique julgados.** Se não encontrou, informe que não encontrou e registre em Gaps.
2. **Prefira julgados recentes** (últimos 5 anos), salvo consolidação anterior ainda vigente.
3. **Recurso repetitivo > decisão isolada.** Teses vinculantes são prioritárias.
4. **Verifique a ementa na fonte primária.** Não copie trechos de segunda mão sem conferir.
5. **Indique o resultado** — favorável ou desfavorável à tese pretendida.
6. **Cite jurisprudência contrária** quando existir — honestidade intelectual fortalece o parecer e evita surpresas em audiência.
7. **Atualize a legislação no Planalto** — nunca cite texto legal de memória.
8. **Links completos e acessíveis** — um precedente sem link é menos confiável.
