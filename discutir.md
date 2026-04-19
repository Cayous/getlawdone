---
name: caso:discutir
description: "Fase 2 de 5 — análise jurídica do caso. Identifica teses adotadas, teses descartadas, estratégia argumentativa e briefing para a pesquisa. Depende de /caso:novo."
---

# /caso:discutir — Fase 2 de 5 (Discussão jurídica)

Você está na **fase 2 de 5**. O objetivo é transformar os fatos do dossiê em teses jurídicas candidatas e uma estratégia. Ao final, gravará `.caso/fases/2-discussao/DISCUSSAO.md`.

## LEIA PRIMEIRO (obrigatório, não pular)

Use o Read tool AGORA, nesta ordem, antes de qualquer outra coisa — inclusive antes de falar com o usuário:

1. `.caso/CASO.md`
2. `.caso/fases/1-caso/DOSSIE.md`
3. Todos os arquivos em `.caso/resumos/*.md` (use Glob se precisar listar)
4. `.caso/ESTADO.md`
5. `~/.claude/commands/caso/templates/DISCUSSAO.md`
6. `~/.claude/commands/caso/references/gestao-contexto.md`
7. `~/.claude/commands/caso/references/tipos_pecas.md` (para saber as exigências estruturais do tipo de peça escolhido)
8. `~/.claude/commands/caso/references/pesquisa-jurisprudencia.md` (seção 7 — sondagem curta para validar viabilidade das teses)

**Se `.caso/fases/1-caso/DOSSIE.md` não existir**, pare imediatamente e diga: "Dossiê não encontrado em `.caso/fases/1-caso/DOSSIE.md`. Rode `/caso:novo` antes."

**Se houver documento grande em `.caso/documentos/` sem `RESUMO-*.md` correspondente**, pare e diga qual e peça para o usuário rodar `/caso:resumir-doc <arquivo>` antes.

**Não improvise a partir de memória:** o histórico pode ter sido limpo e o que parece lembrança pode ser alucinação.

## O que fazer nesta fase

### 1. Identificar teses candidatas

A partir dos fatos e do tipo de peça, levante 3–6 teses jurídicas plausíveis. Para cada uma:
- Enuncie em uma frase.
- Aponte o fundamento legal preliminar (artigos, leis, súmulas — sem ainda pesquisar jurisprudência).
- Conecte à prova nos fatos do dossiê.

### 2. Sondagem de precedentes (curta)

Para cada tese candidata, faça **1 a 2 buscas** via WebSearch para confirmar que ela tem lastro jurisprudencial mínimo. Siga a **seção 7** (`Sondagem`) do `pesquisa-jurisprudencia.md` — esta é uma sondagem, não pesquisa profunda:

- Busca rápida por **tema repetitivo STJ, súmula aplicável, ou julgado recente favorável/contrário**.
- Registre na tese apenas uma nota do tipo: *"há REsp X favorável, ano Y — ementa integral fica para /caso:pesquisar"* ou *"Súmula N do STJ contraria esta tese — descartar"*.
- **Não busque ementa integral, não monte blocos citáveis, não extraia doutrina.** Isso é fase 3.
- **Não cole output bruto de WebSearch** — sintetize em uma linha por busca.

### 3. Filtrar: teses adotadas vs. descartadas

Para cada tese candidata, decida:
- **Adotada:** argumento sólido, fatos do dossiê dão suporte, jurisprudência ao menos sinaliza convergência.
- **Descartada:** risco alto (jurisprudência contrária dominante), fragilidade probatória, efeito colateral negativo (ex: revelaria fato ruim para o cliente), ou redundância com outra tese.

Registre o motivo de cada descarte — isso protege o caso em auditorias futuras.

### 4. Ordem argumentativa

Decida em que sequência as teses aparecem na peça. Regra geral:
- Preliminares (tempestividade, cabimento) primeiro.
- Mérito do mais forte para o mais fraco.
- Subsidiárias ao fim, antes dos pedidos.

### 5. Briefing para a fase de pesquisa

Liste objetivamente o que `/caso:pesquisar` precisa trazer: ementas integrais de quais precedentes específicos, que doutrina, que legislação, se há fatos externos a pesquisar (Reclame Aqui, Procon, notícias).

## ENCERRAMENTO (obrigatório)

1. **Escreva `.caso/fases/2-discussao/DISCUSSAO.md`** preenchendo o template com: teses adotadas (cada uma com enunciado, fundamento, conexão, precedentes a buscar, contra-argumento esperado), teses descartadas com motivo, ordem argumentativa, briefing de pesquisa, estratégia em uma frase.

2. **Atualize `.caso/ESTADO.md`** com `fase_concluida: 2`, `proxima_fase: 3`, timestamp.

3. **Atualize apenas o `status` no frontmatter de `.caso/CASO.md`** para `fase-2-discutida`. Não altere o corpo.

4. **Diga ao usuário**, literalmente:

> Fase **2 — discussão jurídica** concluída. Artefato em `.caso/fases/2-discussao/DISCUSSAO.md`.
>
> Para preservar contexto para a pesquisa:
> 1. Rode `/clear`
> 2. Depois `/caso:pesquisar` para continuar
>
> Você não perde nada — `/caso:pesquisar` relerá apenas `DISCUSSAO.md`.

## O que NÃO fazer aqui

- Não faça pesquisa profunda com ementas integrais — é fase 3.
- Não redija trechos da peça — é fase 5.
- Não altere `DOSSIE.md` (se há erro factual, registre em `ESTADO.md`).
- Não leia PDFs originais grandes — use os `RESUMO-*.md`.
