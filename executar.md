---
name: caso:executar
description: "Fase 5 de 5 — redige a peça final em .docx usando o template local peticao_base.js. Segue o PLANO.md mecanicamente, insere precedentes da PESQUISA.md, valida com scripts/validate.sh. Depende de /caso:planejar."
---

# /caso:executar — Fase 5 de 5 (Execução da peça)

Você está na **fase 5 de 5** — a última. Vai gerar o `.docx` final seguindo o plano. Ao fim, terá `.caso/fases/5-execucao/peticao.docx` e `.caso/fases/5-execucao/EXECUCAO.md`.

## LEIA PRIMEIRO (obrigatório, não pular)

Use o Read tool AGORA, nesta ordem:

1. `.caso/fases/4-plano/PLANO.md` — storyboard da peça
2. `.caso/fases/3-pesquisa/PESQUISA.md` — blocos prontos para colagem
3. `.caso/CASO.md` — partes, tipo de peça, metadados
4. `.caso/ESTADO.md`
5. `~/.claude/commands/caso/templates/EXECUCAO.md`
6. `~/.claude/commands/caso/references/geracao-docx.md` — regras tipográficas + uso do template JS
7. `~/.claude/commands/caso/templates/peticao_base.js` — template JS com funções auxiliares (`p`, `pRuns`, `pSemNum`, `titulo`, `citacao`, `pedido`, `imagem`, ...)

**Se `.caso/fases/4-plano/PLANO.md` não existir**, pare e diga: "Plano não encontrado. Rode `/caso:planejar` antes."

**Não leia `DOSSIE.md` nem `DISCUSSAO.md` nem `RESUMO-*.md`.** Tudo que você precisa para redigir está no `PLANO.md` + `PESQUISA.md`.

## O que fazer nesta fase

### 1. Montar o arquivo JS da peça

1. **Copie** `~/.claude/commands/caso/templates/peticao_base.js` para `.caso/fases/5-execucao/peticao.js`.
2. **Ajuste** `dados.outputPath` no topo do arquivo para `.caso/fases/5-execucao/peticao.docx` (caminho absoluto ou relativo ao ponto de execução).
3. **Ajuste** `imgDir` se imagens estiverem em pasta diferente de `imagens_original` (ex: `.caso/documentos/imagens/`).
4. **Substitua** o bloco `children: [...]` do `new Document({ sections: [...] })` pelo conteúdo real da peça, usando as funções auxiliares do próprio template. Regras detalhadas em `references/geracao-docx.md`, seções 2–4.

### 2. Redigir cada seção a partir do plano

O `PLANO.md` tem frase-tese + tópicos + precedentes por seção. Você transforma isso em parágrafos numerados (01., 02., ...) usando as funções do template:

- Corpo do texto: `p("...")` ou `pRuns([...])` com negrito inline.
- Títulos de seção (I – DOS FATOS, II – DO DIREITO, ...): `titulo("...")` — bold, sem numeração.
- Endereçamento, qualificação, fecho, assinatura: `pSemNum(...)` / `pSemNumRuns([...])`.
- Citações de jurisprudência: `citacao("...")` / `citacaoRuns([...])` — 11pt, recuo 1500 DXA, sem itálico.
- Pedidos com letras: `pedido("a", "...")`, `pedido("b", "...")`, ...
- Sub-pedidos: `subPedido("b.1", "...")`.
- Imagens: `imagem(filename, widthPx, heightPx, descricao)` — quando `PLANO.md` indica.
- Separação visual: `pVazio()` (porque `spacing.after: 0`).

**Regras invioláveis** (ver `references/geracao-docx.md`, seção 1):
- Ementa integral, nunca parcial. Se a `PESQUISA.md` registrou "Ementa parcial. Consultar íntegra em [URL]", preserve essa nota após a citação como parágrafo próprio.
- Não invente precedente, número de processo, data de julgamento ou nome de relator — use exatamente o que está em `PESQUISA.md`.
- Endereçamento é justificado + bold, nunca centralizado.
- Itálico apenas em termos latinos (*rebus sic stantibus*, *in verbis*).
- Títulos de seção NUNCA são numerados — são `titulo()`, não `HeadingLevel`.

### 3. Gerar o .docx

```bash
cd .caso/fases/5-execucao
NODE_PATH=$(npm root -g) node peticao.js
```

Requer `docx` (docx-js) instalado globalmente. Se o Node reclamar de módulo ausente, instale:

```bash
sudo npm install -g docx
```

### 4. Registrar desvios

Se durante a redação você precisou ajustar algo (reformular pedido para paralelismo sintático, completar ementa com busca complementar, subir fonte de imagem, etc.), anote em `EXECUCAO.md`. Seja explícito — é melhor documentar o desvio do que escondê-lo.

### 5. Validar

```bash
bash ~/.claude/commands/caso/scripts/validate.sh .caso/fases/5-execucao/peticao.docx
```

Checks mínimos:
- Estrutura do `.docx` íntegra (zip válido + document.xml parseável)
- Endereçamento contém "EXCELENT"
- Fundamentação contém "art." ou "CPC"
- Seção de pedidos contém "requer" / "pede"
- Fecho contém "nestes termos" / "pede deferimento"
- OAB presente
- Data em formato extenso (`DD de <mês> de YYYY`)

Se o `validate.sh` retornar exit != 0, corrija o `peticao.js`, regenere o `.docx` e rode novamente. Não entregue peça com validação estrutural falhando.

## ENCERRAMENTO (obrigatório)

1. **Gere `.caso/fases/5-execucao/peticao.docx`** executando `peticao.js`.

2. **Escreva `.caso/fases/5-execucao/EXECUCAO.md`** preenchendo o template: resultado da validação, desvios em relação ao plano, imagens inseridas, pendências humanas (valores a conferir, jurisprudência recente a rechecar, etc.).

3. **Atualize `.caso/ESTADO.md`** com `fase_concluida: 5`, `proxima_fase: concluido`, timestamp.

4. **Atualize o `status` no frontmatter de `.caso/CASO.md`** para `fase-5-executada`.

5. **Diga ao usuário**, literalmente:

> Fase **5 — execução** concluída. Peça final em `.caso/fases/5-execucao/peticao.docx`.
>
> Antes de protocolar:
> - Abra o `.docx` e revise visualmente (tipografia, imagens, quebras).
> - Leia `EXECUCAO.md` — há `<N>` pendências humanas registradas (se houver).
>
> Se precisar iterar sobre o texto, duas opções:
> - Ajustes pontuais: edite o `.docx` diretamente.
> - Mudanças de fundo: atualize o `PLANO.md` e rode `/caso:executar` de novo (sobrescreve o `.docx`).

## O que NÃO fazer aqui

- Não abrir nova pesquisa de jurisprudência. Se detectar lacuna crítica, pare e recomende voltar à fase 3.
- Não alterar `PLANO.md`, `PESQUISA.md`, `DISCUSSAO.md` ou `DOSSIE.md`.
- Não inventar dados que não estejam nos artefatos das fases anteriores.
