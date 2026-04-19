---
name: caso:novo
description: "Fase 1 de 5 — abre um novo caso jurídico no diretório atual, coleta dados do processo, indexa documentos e grava o dossiê. Ponto de partida do fluxo /caso:* para elaboração de peças."
---

# /caso:novo — Fase 1 de 5 (Abertura do caso)

Você está iniciando o fluxo de elaboração de uma peça jurídica. Esta é a **fase 1 de 5**. Ao final, gravará `.caso/CASO.md`, `.caso/fases/1-caso/DOSSIE.md` e `.caso/ESTADO.md`.

## LEIA PRIMEIRO (obrigatório)

Use o Read tool AGORA, nesta ordem, antes de fazer qualquer outra coisa:

1. `~/.claude/commands/caso/references/estrutura-caso.md` — layout do `.caso/`
2. `~/.claude/commands/caso/references/gestao-contexto.md` — regras de handoff
3. `~/.claude/commands/caso/references/leitura-documentos.md` — como tratar PDFs grandes
4. `~/.claude/commands/caso/templates/CASO.md` — template a preencher
5. `~/.claude/commands/caso/templates/DOSSIE.md` — template a preencher
6. `~/.claude/commands/caso/templates/ESTADO.md` — template a preencher

Depois verifique o workspace:

```bash
ls -la ./.caso/ 2>/dev/null
ls -la ./documentos/ 2>/dev/null
ls -la ./.caso/documentos/ 2>/dev/null
```

Se `.caso/` já existir com fases preenchidas, **pare** e avise: "Este diretório já tem um caso em andamento. Rode `/caso:estado` para ver onde está, ou mova/apague `.caso/` antes de rodar `/caso:novo`."

## O que fazer nesta fase

### 1. Preparar o workspace

Crie a estrutura base:

```bash
mkdir -p .caso/documentos .caso/resumos .caso/fases/1-caso .caso/fases/2-discussao .caso/fases/3-pesquisa .caso/fases/4-plano .caso/fases/5-execucao
```

Se já houver uma pasta `documentos/` no cwd (fora de `.caso/`), pergunte ao usuário se quer mover os arquivos para `.caso/documentos/` ou se deixa onde está. O padrão é `.caso/documentos/`.

### 2. Coletar informações do caso (conversacional)

Pergunte ao usuário, em uma única mensagem (lista numerada), nesta ordem:

1. Nome do cliente e polo (autor/requerente/agravante ou réu/requerido/agravado).
2. Nome da parte contrária.
3. Tipo de peça pretendida (consulte `~/.claude/commands/peticao-juridica/references/tipos_pecas.md` para sugerir opções pertinentes).
4. Tribunal/juízo e número do processo (CNJ) — ou "sem processo" se é petição inicial.
5. Prazo para protocolo (data limite), ou "sem prazo fixo".
6. Objetivo em uma frase — o que se pede.

Aceite respostas parciais. Se faltar algo crítico (tipo de peça, partes), pergunte novamente; dados secundários podem ficar como `<verificar>`.

### 3. Indexar documentos

Liste os arquivos em `.caso/documentos/` (e em `./documentos/` se existir). Para cada um, decida:

- **Pequeno (< 30 páginas, < 5 MB, ou .docx curto):** ler direto. Use Read com `pages: "1-30"` se PDF, ou Read integral se .docx, e extraia: partes, datas, fatos principais.
- **Grande:** **não leia agora.** Anote na lista como "pendente de `/caso:resumir-doc`". Ao fim desta fase, recomende ao usuário rodar `/caso:resumir-doc <arquivo>` para cada documento grande antes de prosseguir à fase 2.

Se o usuário mencionar documentos que ainda não estão no diretório, peça que ele os coloque em `.caso/documentos/` antes de continuar.

### 4. Montar a linha do tempo dos fatos

A partir dos documentos lidos, construa uma linha do tempo cronológica. Cada fato deve apontar a fonte (arquivo + página). Se houver conflito entre documentos, registre ambos e marque como "a esclarecer".

## ENCERRAMENTO (obrigatório)

1. **Escreva `.caso/CASO.md`** preenchendo o template. Campos críticos: partes, tipo de peça, tribunal, prazo, resumo em uma frase, objetivo, lista de documentos com link para seus resumos.

2. **Escreva `.caso/fases/1-caso/DOSSIE.md`** preenchendo o template. Inclua qualificação completa das partes, linha do tempo dos fatos, tabela de documentos-fonte, pontos a esclarecer, tipo de peça pretendida.

3. **Escreva `.caso/ESTADO.md`** preenchendo o template com `fase_concluida: 1` e `proxima_fase: 2`.

4. **Diga ao usuário**, literalmente:

> Fase **1 — abertura do caso** concluída. Artefatos em `.caso/CASO.md` e `.caso/fases/1-caso/DOSSIE.md`.
>
> **<Se houver documentos grandes pendentes de resumo:>**
> Antes de seguir, rode **para cada documento grande**:
> - `/caso:resumir-doc <arquivo>`
>
> Depois, para preservar contexto:
> 1. Rode `/clear`
> 2. Depois `/caso:discutir` para continuar
>
> Você não perde nada — `/caso:discutir` relerá o `DOSSIE.md` e os resumos automaticamente.

## O que NÃO fazer aqui

- Não faça análise jurídica (teses, fundamentação). Isso é `/caso:discutir`.
- Não busque jurisprudência. Isso é `/caso:pesquisar`.
- Não redija trechos da peça. Isso é `/caso:executar`.
- Não leia PDFs grandes integralmente. Delegue a `/caso:resumir-doc`.
