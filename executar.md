---
name: caso:executar
description: "Fase 5 de 5 — redige a peça final em .docx delegando à skill peticao-juridica. Segue o PLANO.md mecanicamente, insere precedentes da PESQUISA.md. Depende de /caso:planejar."
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
6. `~/.claude/commands/peticao-juridica/SKILL.md` — esta é a skill que você vai invocar para montar o `.docx`

**Se `.caso/fases/4-plano/PLANO.md` não existir**, pare e diga: "Plano não encontrado. Rode `/caso:planejar` antes."

**Não leia `DOSSIE.md` nem `DISCUSSAO.md` nem `RESUMO-*.md`.** Tudo que você precisa para redigir está no `PLANO.md` + `PESQUISA.md`.

## O que fazer nesta fase

### 1. Delegar a geração do .docx à skill `peticao-juridica`

A skill `peticao-juridica` já sabe gerar o `.docx` com tipografia Century Gothic, espaçamento 1.5, margens assimétricas, numeração `01.`, citações com recuo 1500 DXA, imagens etc. Você **não vai reimplementar isso aqui**.

Invoque a skill `peticao-juridica` fornecendo-lhe:
- **Tipo de peça** (do `CASO.md`).
- **Partes qualificadas** (do `CASO.md` + `PLANO.md`).
- **Tribunal e processo.**
- **Estrutura de seções** conforme o `PLANO.md` (cada seção com seu texto redigido a partir da frase-tese + precedentes indicados).
- **Precedentes a inserir:** os blocos literais da `PESQUISA.md`, mantendo ementas integrais, negritos, referências completas.
- **Imagens:** caminhos em `.caso/documentos/` conforme o `PLANO.md`.
- **Output path:** `.caso/fases/5-execucao/peticao.docx`.

Siga os Passos 1–6 do `peticao-juridica/SKILL.md`. Para imagens, respeite o Passo 1b. Para a validação, rode `scripts/validate.sh` do `peticao-juridica`.

### 2. Redigir cada seção a partir do plano

O `PLANO.md` tem frase-tese + tópicos + precedentes por seção. Você transforma isso em parágrafos numerados (01., 02., ...) conforme o estilo do `peticao-juridica`. Regras:

- Negrito inline em expressões enfáticas (não na seção toda).
- Citações em bloco com a função `citacao()` / `citacaoRuns()` do template JS.
- Ementa integral, nunca parcial. Se a `PESQUISA.md` registrou "Ementa parcial. Consultar íntegra em [URL]", preserve essa nota em rodapé.
- Não invente precedente, número de processo, data de julgamento ou nome de relator. Se faltar, use exatamente o que está em `PESQUISA.md`.

### 3. Registrar desvios

Se durante a redação você precisou ajustar algo (reformular pedido para paralelismo sintático, completar ementa com busca complementar, etc.), anote em `EXECUCAO.md`. Seja explícito — é melhor documentar o desvio do que escondê-lo.

### 4. Validar

Rode a validação do `peticao-juridica`. Os checks mínimos:
- Endereçamento contém "EXCELENT"
- Fundamentação contém "art." ou "CPC"
- Seção de pedidos contém "requer" / "pede"
- Fecho contém "nestes termos" / "pede deferimento"
- OAB presente
- Data em formato extenso
- Nenhum "Ementa parcial" residual sem nota explicativa

## ENCERRAMENTO (obrigatório)

1. **Gere `.caso/fases/5-execucao/peticao.docx`** via skill `peticao-juridica`.

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
