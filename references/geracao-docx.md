---
name: geracao-docx
description: Regras técnicas e tipográficas para gerar a peça final em .docx na fase /caso:executar. Consolida o padrão do escritório (Century Gothic, numeração 01., margens assimétricas) e o uso da biblioteca docx-js.
---

# Geração do .docx — referência técnica da fase `/caso:executar`

Este arquivo consolida o que a fase 5 precisa saber para produzir o `.docx` final. Usado em conjunto com `~/.claude/commands/caso/templates/peticao_base.js` (template JS) e `~/.claude/commands/caso/scripts/validate.sh` (validador).

## 1. Padrão tipográfico (OBRIGATÓRIO — não negociar)

| Elemento | Fonte | Tamanho | Estilo | Alinhamento |
|----------|-------|---------|--------|-------------|
| Corpo (Normal) | Century Gothic | 24 half-pt (12pt) | Regular | Justificado |
| Título de seção | Century Gothic | 24 half-pt (12pt) | **Bold** | Justificado |
| Título da peça | Century Gothic | 24 half-pt (12pt) | **Bold** | Justificado |
| Citação/jurisprudência | Century Gothic | 22 half-pt (11pt) | Regular | Justificado, indent 1500 DXA |

- **Espaçamento:** `line: 360` (1.5 linhas), `after: 0`, `before: 0`.
- **Margens:** esq 1418 DXA (2,5 cm), dir 851 DXA (1,5 cm), topo 1843 DXA (3,25 cm), base 1134 DXA (2 cm).
- **Página:** A4 — `11906 x 16838` DXA.
- **Header/footer:** nenhum (sem cabeçalho nem rodapé visível).

### Regras invioláveis

- **Parágrafos numerados sequencialmente** no corpo: `01.`, `02.`, `03.` (formato `DECIMAL_ZERO`), SEM recuo. Use `p()`, `pRuns()` e `pedido()`.
- **Títulos de seção NÃO são numerados.** Use `titulo()` — é um parágrafo normal em bold. Nunca use `HeadingLevel`.
- **Endereçamento** ("EXCELENTÍSSIMO SENHOR JUIZ...") é **justificado, bold, SEM numeração**. Não centralizar.
- **Citações de jurisprudência** não usam itálico. Indent 1500 DXA, tamanho 11pt. Use `citacao()` / `citacaoRuns()`.
- **Itálico** é reservado a termos latinos (ex: *rebus sic stantibus*, *in verbis*).
- **Parágrafos vazios** (`pVazio()`) são a única forma de separação visual — não use `spacing.after` para afastar parágrafos.
- **Resumo da peça** (quando usado): `pResumo()` com indent 5669 DXA (~10 cm), justificado, bold.

## 2. Funções auxiliares do template

O template `templates/peticao_base.js` já exporta estas funções — não reinvente:

| Função | Uso |
|--------|-----|
| `p(text)` | Parágrafo numerado simples do corpo. |
| `pRuns(runs)` | Parágrafo numerado com múltiplos runs (para bold inline). |
| `pSemNum(text, opts)` | Parágrafo sem numeração — endereçamento, fecho, assinatura. |
| `pSemNumRuns(runs, opts)` | Idem, com múltiplos runs. |
| `pVazio()` | Parágrafo em branco — separação visual. |
| `pResumo(text, opts)` | Resumo da peça com recuo ~10 cm. |
| `titulo(text)` | Título de seção (bold, sem numeração). |
| `subtitulo(text)` | Alias de `titulo()`. |
| `citacao(text)` | Citação em bloco (indent 1500, 11pt). |
| `citacaoRuns(runs)` | Citação com bold em trechos da ementa. |
| `pedido(letra, runs)` | Pedido a), b), c)... — numerado. |
| `subPedido(codigo, runs)` | Sub-pedido b.1), b.2)... — numerado com recuo. |
| `pCenter(text, opts)` | Parágrafo centralizado (local/data, assinatura). |
| `imagem(filename, w, h, descr)` | Imagem centralizada em `imgDir`. |

## 3. Estrutura arquetípica do documento

```
pSemNum("EXCELENTÍSSIMO SENHOR JUIZ...", { bold: true })
pVazio(), pVazio()

pSemNumRuns([                              // qualificação
  { text: "FULANO DE TAL", bold: true },
  { text: ", brasileiro..., vem propor a presente" }
])
pVazio()
pSemNum("AÇÃO DE DIVÓRCIO LITIGIOSO", { bold: true })
pVazio()

pResumo("Urgente. Pedido de tutela de urgência.", { bold: true })
pVazio()

titulo("I – DOS FATOS")                    // sem numeração, bold
p("A relação tornou-se insustentável...") // 01.
pRuns([                                    // 02. com bold inline
  { text: "O casamento, " },
  { text: "celebrado em 2010", bold: true },
  { text: ", está deteriorado." }
])
pVazio()

titulo("II – DO DIREITO")
p("É caso de aplicação do art. X do CPC...")
citacaoRuns([
  { text: "RESPONSABILIDADE CIVIL. ", bold: true, size: 22 },
  { text: "Ação declaratória... ", size: 22 },
  { text: "trecho relevante", bold: true, size: 22 },
  { text: " (Ementa integral segue.)", size: 22 }
])
pVazio()

titulo("III – DOS PEDIDOS")
p("Diante do exposto, requer:")
pedido("a", "O recebimento e processamento...")
pedido("b", "A condenação do réu ao pagamento...")
pVazio()

pSemNum("Protesta por todos os meios de prova...")
pVazio()
pCenter("Nestes termos, pede deferimento.")
pVazio()
pCenter("Uberaba - MG, 18 de abril de 2026.")
pVazio(), pVazio()
pCenter("Ricardo Pacheco Mesquita de Freitas", { bold: true })
pCenter("OAB/MG 145.814")
```

## 4. Regras de construção do JS

1. **Nunca use `\n`** — cada parágrafo é um objeto `Paragraph` separado.
2. **Negrito inline**: múltiplos `TextRun` no mesmo `Paragraph`, um com `bold: true`.
3. **Caracteres especiais** via Unicode: `\u00a7` = §, `\u00ba` = º, `\u00aa` = ª, `\u201c` = ", `\u201d` = ", `\u2013` = –.
4. **Ementa integral, nunca parcial.** Se a `PESQUISA.md` tem ementa completa, cole inteira em `citacaoRuns()` com negritos nos trechos-chave. Se veio parcial com nota "Consultar íntegra em [URL]", preserve a nota como parágrafo ou pRuns após a citação.
5. **Referência do julgado completa:** `(Tribunal – Tipo: Número, Relator: Nome, Data de julgamento: DD/MM/AAAA, Órgão, Data de publicação: DD/MM/AAAA)`.

## 5. Imagens (Passo opcional, obrigatório quando aplicável)

Se a `PLANO.md` ou documentos originais apontam imagens (prints de WhatsApp, faturas, decisões, extratos):

1. As imagens originais devem estar em `.caso/documentos/imagens/` (ou subpasta por documento). Se vieram dentro de um `.docx` original, o `/caso:resumir-doc` já deve ter copiado para `.caso/resumos/imagens-<slug>/`.
2. Ajuste `imgDir` no JS gerado para apontar para a pasta correta (relativa ao `peticao.js`).
3. Use `imagem(filename, widthPx, heightPx, descricao)` precedida por um parágrafo com "Confira-se:" ou "Veja-se:", como é praxe forense.
4. Conversão de dimensões EMU → pixels: `pixels = Math.round(emu / 9525)` (equivale a `emu / 914400 * 96`).
5. Sempre incluir `altText` — acessibilidade e robustez.

## 6. Execução e validação

### Gerar o `.docx`

O script JS é gerado no diretório de trabalho da fase 5 (ex: `.caso/fases/5-execucao/peticao.js`), com `dados.outputPath = ".caso/fases/5-execucao/peticao.docx"`.

```bash
cd .caso/fases/5-execucao
NODE_PATH=$(npm root -g) node peticao.js
```

Requer `docx` (docx-js) instalado globalmente: `npm install -g docx`. Se não estiver, instale com `sudo npm install -g docx` antes.

### Validar

```bash
bash ~/.claude/commands/caso/scripts/validate.sh .caso/fases/5-execucao/peticao.docx
```

Checks mínimos (exit 0 se todos ok, exit 1 se falha estrutural ou mais de 2 avisos):

- Estrutura do .docx íntegra (zip + document.xml parseável).
- Endereçamento ("EXCELENT...").
- Fundamentação legal ("art." / "CPC" / "artigo").
- Seção de pedidos ("requer" / "pede").
- Fecho ("nestes termos" / "pede deferimento").
- OAB presente.
- Data em formato extenso (`DD de <mês> de YYYY`).

Falhou? Corrija o JS e regenere. Não entregue `.docx` com validação estrutural falha.

## 7. Checklist final antes de entregar

- [ ] Todas as partes corretamente identificadas (nomes, CPF/CNPJ quando aplicável).
- [ ] Número do processo correto (ou "sem processo" se é inicial).
- [ ] OAB e nome do advogado corretos.
- [ ] Data do documento apropriada.
- [ ] Fundamentação legal coerente com a tese.
- [ ] Pedidos claros, específicos, coerentes com a argumentação.
- [ ] **Ementas integrais** — nenhuma parcial sem nota explicativa.
- [ ] **Negritos na ementa** — trechos relevantes destacados.
- [ ] **Referência completa** em cada precedente.
- [ ] Imagens inseridas nos mesmos pontos contextuais do documento original (quando aplicável).
- [ ] Validação do `validate.sh` passou sem erros.

## 8. O que jamais fazer

- Inventar nome de parte, número de processo, ementa, data de julgamento ou relator.
- Citar ementa parcial quando a integral é obtível (volte à fase 3 se falta).
- Centralizar o endereçamento.
- Usar itálico em citação de jurisprudência.
- Numerar títulos de seção.
- Usar `HeadingLevel` — é sempre `Paragraph` com `TextRun({ bold: true })`.
- Deixar o `.docx` sem validar antes de entregar.
