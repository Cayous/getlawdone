---
name: caso:resumir-doc
description: "Resume um documento grande de .caso/documentos/ em um RESUMO-<slug>.md reutilizável pelas fases seguintes. Lê em faixas de páginas para evitar estouro de contexto. Recebe como argumento o nome do arquivo."
---

# /caso:resumir-doc — Resumir documento grande

Use este comando para transformar um PDF (ou `.docx`) grande em um `RESUMO-<slug>.md` que as fases 1–5 conseguem consumir sem puxar o original para o contexto.

O argumento é o nome do arquivo em `.caso/documentos/`. Exemplo: `/caso:resumir-doc inicial.pdf`.

## LEIA PRIMEIRO (obrigatório)

Use o Read tool AGORA nos arquivos:

1. `~/.claude/commands/caso/references/leitura-documentos.md` — padrão de resumo
2. `~/.claude/commands/caso/templates/RESUMO-DOC.md` — template a usar

Se não existir `.caso/documentos/`, pare e diga: "Workspace `.caso/` não encontrado. Rode `/caso:novo` primeiro (ou mude para a pasta do caso)."

Se o arquivo passado como argumento não existir em `.caso/documentos/`, pare e peça ao usuário que confirme o nome (ou coloque o arquivo na pasta correta).

## O que fazer

### 1. Calcular slug e caminho do resumo

- **Slug:** nome do arquivo sem extensão, lowercase, espaços viram `-`. Ex: `Inicial - Alimentos.pdf` → `inicial-alimentos`.
- **Caminho do resumo:** `.caso/resumos/RESUMO-<slug>.md`.

Se `RESUMO-<slug>.md` já existir, **leia-o primeiro**. Verifique o campo `paginas_cobertas` no frontmatter:
- Se cobre o documento inteiro, avise o usuário e pergunte se quer refazer (sobrescrever) ou manter.
- Se cobertura é parcial, **continue de onde parou** (modo incremental).

### 2. Descobrir o total de páginas

Para PDF, inspecione com `pdfinfo` (se disponível) ou abra com Read em uma página pequena para ler metadata:

```bash
pdfinfo ".caso/documentos/<arquivo>" 2>/dev/null | grep Pages
```

Se `pdfinfo` não estiver disponível, faça Read com `pages: "1"` — a ferramenta reporta o total.

Para `.docx`, não há paginação pré-determinada; leia integralmente se < 30 páginas estimadas, ou quebre pela estrutura de seções.

### 3. Ler em faixas de 20 páginas

Para cada faixa `[N, N+19]` até cobrir o documento:

1. Use Read com `file_path: ".caso/documentos/<arquivo>"` e `pages: "<N>-<N+19>"`.
2. Extraia: estrutura (o que começa/termina em que páginas), fatos-chave com página, trechos citáveis literais.
3. **Escreva (ou append) em `.caso/resumos/RESUMO-<slug>.md`** no formato do template — adicionando a entrada ao "Índice por faixa de página", acrescentando fatos-chave e trechos citáveis, sem sobrescrever o que já estava lá.
4. Atualize o frontmatter `paginas_cobertas`.

### 4. Checkpoint de contexto

Depois de cada 3 faixas (~60 páginas lidas), avalie o contexto:
- Se ainda está leve: continue.
- Se está ficando pesado (muitos tokens consumidos, você começa a esquecer trechos anteriores da leitura): pare, grave o `RESUMO-<slug>.md` com o que tem, oriente o usuário a rodar `/clear` e `/caso:resumir-doc <mesmo-arquivo>` novamente — o modo incremental retomará da próxima faixa.

### 5. Encerramento

Quando `paginas_cobertas` atingir `paginas_totais`:

- Confirme visualmente: o `RESUMO-<slug>.md` deve ter índice completo, fatos-chave em ordem cronológica, trechos citáveis com páginas.
- Atualize `.caso/ESTADO.md` acrescentando o resumo à lista (se `ESTADO.md` já existir).

**Diga ao usuário**, literalmente (adaptando):

> Resumo de **<arquivo>** concluído — cobre pp. 1–<N> de <total>. Arquivo em `.caso/resumos/RESUMO-<slug>.md`.
>
> **<Se houver outros documentos pendentes de resumo:>** ainda faltam resumir: `<lista>`. Rode `/caso:resumir-doc` para cada um antes de `/caso:discutir`.
>
> Quando terminar os resumos:
> 1. Rode `/clear` (recomendado, especialmente se leu muitas páginas)
> 2. Depois `/caso:discutir` para seguir para a fase 2

## Regras firmes

- **Nada de interpretação jurídica.** Se você se pegar pensando "isso configura quebra contratual", pare — esse juízo é da fase `/caso:discutir`. O resumo é descritivo.
- **Nada de jurisprudência.** Se o documento citar precedentes, anote o nome/número como fato (p. XX), não busque a ementa.
- **Preserve citações literais** nos trechos citáveis — fidelidade à pontuação, grifos, itálicos originais.
- **Incremental, não destrutivo.** Nunca sobrescreva um `RESUMO-*.md` em modo incremental; só sobrescreva se o usuário pediu explicitamente "refazer do zero".
