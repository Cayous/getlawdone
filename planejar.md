---
name: caso:planejar
description: "Fase 4 de 5 — monta o plano (storyboard) da peça: endereçamento, seções numeradas, posição de cada precedente, pedidos, fecho. Depende de /caso:pesquisar."
---

# /caso:planejar — Fase 4 de 5 (Plano da peça)

Você está na **fase 4 de 5**. Vai construir o *storyboard* da peça — a fase 5 (execução) segue este plano mecanicamente. Ao final, gravará `.caso/fases/4-plano/PLANO.md`.

## LEIA PRIMEIRO (obrigatório, não pular)

Use o Read tool AGORA, nesta ordem:

1. `.caso/fases/2-discussao/DISCUSSAO.md` — teses e estratégia
2. `.caso/fases/3-pesquisa/PESQUISA.md` — precedentes, doutrina, legislação
3. `.caso/CASO.md` — tipo de peça, partes, objetivo
4. `.caso/ESTADO.md`
5. `~/.claude/commands/caso/templates/PLANO.md`
6. `~/.claude/commands/caso/references/tipos_pecas.md` — estrutura exigida pelo tipo de peça

**Se qualquer um dos três primeiros não existir**, pare e indique qual `/caso:*` rodar antes.

**Não leia `DOSSIE.md` nem `RESUMO-*.md`.** Os fatos relevantes já devem estar na `DISCUSSAO.md`. Só volte se detectar lacuna específica.

## O que fazer nesta fase

### 1. Consultar a estrutura exigida

Localize, em `tipos_pecas.md`, a estrutura do tipo de peça declarado em `CASO.md`. Tome a lista de seções como ponto de partida (ex: Agravo Interno = Tempestividade → Síntese → Razões → Pedidos; Apelação = Tempestividade → Síntese → Razões → Pedidos; Inicial = Partes → Fatos → Direito → Pedidos → Valor/Provas).

### 2. Definir endereçamento e preâmbulo

- **Endereçamento:** texto exato, caixa alta se for o padrão (ex: "EXCELENTÍSSIMOS SENHORES DESEMBARGADORES..."). Consulte `tipos_pecas.md` para o foro correto.
- **Preâmbulo:** "<parte>, já qualificada nos autos, vem interpor o presente <peça>, com fundamento em <dispositivo>, pelas razões seguir expostas."

### 3. Planejar as seções

Para cada seção da estrutura:
- **Frase-tese:** uma frase resumindo o que a seção prova.
- **Conteúdo esperado:** tópicos a cobrir (fatos, cálculo de prazo, exposição da decisão agravada, argumentos).
- **Precedentes a inserir:** ids dos blocos da `PESQUISA.md` (ex: "Precedente 1.2, Doutrina sobre T1").
- **Imagens a inserir:** se houver, com caminho em `.caso/documentos/` (ou `.caso/resumos/imagens-<slug>/`) e descrição. Ver `~/.claude/commands/caso/references/geracao-docx.md`, seção 5.

### 4. Planejar os pedidos

Pedidos com letras (a, b, c). Subpedidos com numeração (b.1, b.2). Ordem: principal → subsidiários → acessórios (gratuidade, provas, honorários).

### 5. Fecho

Inclua: cláusula de protesto por provas, "Nestes termos, pede deferimento", local/data, nome do advogado + OAB.

### 6. Observações para a execução

Sinalize restrições específicas que a fase 5 precisa respeitar. Exemplos:
- Negritar expressões específicas em precedentes.
- Inserir imagem logo após um parágrafo.
- Citações em 11pt com recuo 1500 DXA (ver `references/geracao-docx.md`, seção 1).
- Ementa parcial de um precedente — incluir nota de rodapé.

## ENCERRAMENTO (obrigatório)

1. **Escreva `.caso/fases/4-plano/PLANO.md`** preenchendo o template. O plano deve ser detalhado o suficiente para que a fase 5 não precise reabrir discussões nem inventar argumentos — apenas redigir.

2. **Atualize `.caso/ESTADO.md`** com `fase_concluida: 4`, `proxima_fase: 5`, timestamp.

3. **Atualize o `status` no frontmatter de `.caso/CASO.md`** para `fase-4-planejada`.

4. **Diga ao usuário**, literalmente:

> Fase **4 — plano da peça** concluída. Storyboard em `.caso/fases/4-plano/PLANO.md`.
>
> Para preservar contexto para a execução:
> 1. Rode `/clear`
> 2. Depois `/caso:executar` para gerar o `.docx` final
>
> Você não perde nada — `/caso:executar` relerá `PLANO.md` + `PESQUISA.md`.

## O que NÃO fazer aqui

- Não redigir trechos da peça no plano. O plano tem frases-tese e pontos; o texto corrido é fase 5.
- Não abrir nova pesquisa jurisprudencial. Se identificar lacuna grave, registre como observação e decida se aborta para voltar à fase 3 ou se segue com o que há.
- Não alterar `DISCUSSAO.md` nem `PESQUISA.md`.
