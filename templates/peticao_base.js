/**
 * TEMPLATE BASE — Petição Jurídica (.docx)
 *
 * PADRÃO TIPOGRÁFICO DO ESCRITÓRIO:
 * - Fonte: Century Gothic, 12pt (24 half-pt)
 * - Alinhamento: Justificado (both)
 * - Espaçamento entre linhas: 1.5 (line: 360)
 * - Espaçamento after: 0 (sem espaço extra entre parágrafos)
 * - Margens: esq 2.5cm (1418), dir 1.5cm (851), topo 3.25cm (1843), base 2cm (1134)
 * - Página: A4 (11906 x 16838 DXA)
 * - PARÁGRAFOS NUMERADOS sequencialmente: 01., 02., 03. (decimalZero), SEM recuo
 * - Títulos de seção: parágrafos normais em BOLD, SEM numeração (não usar HeadingLevel)
 * - Sem header/footer visível
 * - Citações: indent 1500 DXA, tamanho 11pt (22 half-pt), sem itálico
 * - Endereçamento: justificado, bold
 *
 * INSTRUÇÕES:
 * 1. Copie este arquivo para a pasta do projeto
 * 2. Substitua os dados e o conteúdo
 * 3. Execute: NODE_PATH=$(npm root -g) node peticao.js
 */

const {
  Document, Packer, Paragraph, TextRun, ImageRun,
  AlignmentType, LevelFormat,
  Header, Footer, PageNumber
} = require("docx");
const fs = require("fs");
const path = require("path");

// ============================================================
// DADOS DA PETIÇÃO — Preencha aqui
// ============================================================

const dados = {
  outputPath: "{{OUTPUT_PATH}}"
};

// ============================================================
// ESTILOS PADRÃO — NÃO ALTERE
// ============================================================

const estilos = {
  default: {
    document: { run: { font: "Century Gothic", size: 24 } }
  },
  paragraphStyles: [
    {
      id: "Normal",
      name: "Normal",
      run: { font: "Century Gothic", size: 24 },
      paragraph: {
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 0, before: 0, line: 360 }
      }
    }
  ]
};

// ============================================================
// NUMERAÇÃO SEQUENCIAL DE PARÁGRAFOS (01., 02., 03., ...)
// ============================================================

const numbering = {
  config: [
    {
      reference: "paragrafos",
      levels: [{
        level: 0,
        format: LevelFormat.DECIMAL_ZERO,
        text: "%1.\t",
        alignment: AlignmentType.START,
        style: {
          paragraph: {
            indent: { left: 0, hanging: 0 }
          },
          run: {
            font: "Century Gothic",
            size: 24,
            bold: false
          }
        }
      }]
    }
  ]
};

// ============================================================
// FUNÇÕES AUXILIARES
// ============================================================

/**
 * Parágrafo NUMERADO com texto simples.
 * Este é o padrão para TODOS os parágrafos do corpo da petição.
 */
function p(text) {
  return new Paragraph({
    style: "Normal",
    numbering: { reference: "paragrafos", level: 0 },
    children: [new TextRun({ text })]
  });
}

/**
 * Parágrafo NUMERADO com múltiplos TextRuns (negrito, itálico inline).
 */
function pRuns(runs) {
  return new Paragraph({
    style: "Normal",
    numbering: { reference: "paragrafos", level: 0 },
    children: runs.map(r => new TextRun(r))
  });
}

/**
 * Parágrafo SEM numeração (para endereçamento, fecho, assinatura, etc.)
 */
function pSemNum(text, opts = {}) {
  return new Paragraph({
    style: "Normal",
    alignment: opts.center ? AlignmentType.CENTER : AlignmentType.JUSTIFIED,
    children: [new TextRun({
      text,
      bold: opts.bold || false,
      size: opts.size || 24,
      font: "Century Gothic"
    })]
  });
}

/**
 * Parágrafo SEM numeração com múltiplos TextRuns.
 */
function pSemNumRuns(runs, opts = {}) {
  return new Paragraph({
    style: "Normal",
    alignment: opts.center ? AlignmentType.CENTER : AlignmentType.JUSTIFIED,
    children: runs.map(r => new TextRun(r))
  });
}

/** Parágrafo vazio (espaçamento visual — necessário pois after: 0) */
function pVazio() {
  return new Paragraph({ children: [] });
}

/**
 * Resumo da petição — Justificado com recuo de ~10cm à esquerda.
 * Ex: "Urgente. Pedido de divórcio litigioso."
 * Fica empurrado para a direita do texto.
 */
function pResumo(text, opts = {}) {
  return new Paragraph({
    style: "Normal",
    indent: { left: 5669 },  // ~10cm
    children: [new TextRun({
      text,
      bold: opts.bold || false,
      size: opts.size || 24,
      font: "Century Gothic"
    })]
  });
}

/**
 * Título de seção — Parágrafo SEM numeração, em bold.
 * NÃO usar HeadingLevel! É um parágrafo normal com bold, SEM numeração.
 */
function titulo(text) {
  return new Paragraph({
    style: "Normal",
    children: [new TextRun({ text, bold: true })]
  });
}

/**
 * Subtítulo de seção — Parágrafo SEM numeração, em bold.
 */
function subtitulo(text) {
  return titulo(text); // Mesmo estilo do título
}

/**
 * Citação jurisprudencial — Recuo 1500 DXA, 11pt, SEM itálico, SEM numeração.
 */
function citacao(text) {
  return new Paragraph({
    style: "Normal",
    indent: { left: 1500 },
    children: [new TextRun({ text, size: 22 })]
  });
}

/**
 * Citação com múltiplos TextRuns (para negritar "Grifou-se", etc.)
 */
function citacaoRuns(runs) {
  return new Paragraph({
    style: "Normal",
    indent: { left: 1500 },
    children: runs.map(r => new TextRun({ size: 22, ...r }))
  });
}

/**
 * Pedido com letra: a), b), c)... — NUMERADO
 */
function pedido(letra, runs) {
  if (typeof runs === "string") {
    return new Paragraph({
      style: "Normal",
      numbering: { reference: "paragrafos", level: 0 },
      children: [
        new TextRun({ text: `${letra}) `, bold: true }),
        new TextRun({ text: runs })
      ]
    });
  }
  return new Paragraph({
    style: "Normal",
    numbering: { reference: "paragrafos", level: 0 },
    children: [
      new TextRun({ text: `${letra}) `, bold: true }),
      ...runs.map(r => new TextRun(r))
    ]
  });
}

/**
 * Sub-pedido com recuo: b.1), b.2)... — NUMERADO
 */
function subPedido(codigo, runs) {
  if (typeof runs === "string") {
    return new Paragraph({
      style: "Normal",
      numbering: { reference: "paragrafos", level: 0 },
      indent: { left: 720 },
      children: [
        new TextRun({ text: `${codigo}) `, bold: true }),
        new TextRun({ text: runs })
      ]
    });
  }
  return new Paragraph({
    style: "Normal",
    numbering: { reference: "paragrafos", level: 0 },
    indent: { left: 720 },
    children: [
      new TextRun({ text: `${codigo}) `, bold: true }),
      ...runs.map(r => new TextRun(r))
    ]
  });
}

/**
 * Parágrafo centralizado SEM numeração (para local/data, assinatura)
 */
function pCenter(text, opts = {}) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 0 },
    children: [new TextRun({
      text,
      bold: opts.bold || false,
      size: opts.size || 24,
      font: "Century Gothic"
    })]
  });
}

/**
 * Imagem centralizada (para prints de tela, faturas, etc.)
 * @param {string} filename - Nome do arquivo na pasta de imagens
 * @param {number} widthPx - Largura em pixels
 * @param {number} heightPx - Altura em pixels
 * @param {string} descricao - Descrição da imagem (alt text)
 */
function imagem(filename, widthPx, heightPx, descricao) {
  const ext = filename.split(".").pop().toLowerCase();
  const type = ext === "jpg" ? "jpeg" : ext;
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 150, after: 150 },
    children: [
      new ImageRun({
        type: type,
        data: fs.readFileSync(path.join(imgDir, filename)),
        transformation: { width: widthPx, height: heightPx },
        altText: { title: descricao, description: descricao, name: filename }
      })
    ]
  });
}

// Caminho para pasta de imagens (ajustar conforme necessário)
const imgDir = path.join(__dirname, "imagens_original");

// ============================================================
// MONTAGEM DO DOCUMENTO
// ============================================================

/**
 * INSTRUÇÕES DE USO:
 *
 * Substitua o array "children" abaixo com o conteúdo real da petição.
 * Use as funções auxiliares acima para construir cada elemento.
 *
 * IMPORTANTE:
 * - Use p() e pRuns() para parágrafos do corpo (serão numerados automaticamente, SEM recuo)
 * - Use pSemNum() para endereçamento, fecho, assinatura (sem numeração)
 * - Use titulo() para títulos de seção (SEM numeração, bold)
 * - Use pResumo() para o resumo da petição com recuo ~10cm ("Urgente. Pedido de...")
 * - Use citacao() para jurisprudência (sem numeração, com recuo 1500 DXA)
 * - Use pVazio() para separar visualmente
 *
 * Modelo de estrutura:
 *
 * children: [
 *   // Endereçamento (SEM numeração)
 *   pSemNum("EXCELENTÍSSIMO SENHOR JUIZ DE DIREITO DA VARA...", { bold: true }),
 *   pVazio(), pVazio(),
 *
 *   // Qualificação + Título (SEM numeração)
 *   pSemNumRuns([
 *     { text: "FULANO DE TAL", bold: true },
 *     { text: ", brasileiro... vem propor a presente" }
 *   ]),
 *   pVazio(),
 *   pSemNum("AÇÃO DE DIVÓRCIO LITIGIOSO", { bold: true }),
 *   pVazio(),
 *
 *   // Resumo da petição (com recuo ~10cm)
 *   pResumo("Urgente. Pedido de divórcio litigioso.", { bold: true }),
 *   pVazio(),
 *
 *   // Corpo da petição (NUMERADO, sem recuo)
 *   titulo("I – DOS FATOS"),           // SEM numeração, bold
 *   p("A vida em comum tornou-se..."), // Parágrafo 01.
 *   pRuns([                             // Parágrafo 02.
 *     { text: "O casamento, ", },
 *     { text: "contraído em 06.08.2010", bold: true },
 *     { text: ", encontra-se deteriorado." }
 *   ]),
 *   pVazio(),
 *
 *   titulo("II – DO DIREITO"),          // SEM numeração, bold
 *   p("Texto do argumento..."),         // Parágrafo 03.
 *   citacao("EMENTA. DIREITO DE FAMÍLIA... (TJDFT, Acórdão 1234)"),
 *   pVazio(),
 *
 *   // Pedidos (NUMERADOS)
 *   titulo("III – DOS PEDIDOS"),        // SEM numeração, bold
 *   p("Diante do exposto, requer:"),    // Parágrafo 04.
 *   pedido("a", "O recebimento..."),    // Parágrafo 05.
 *   pedido("b", "A condenação..."),     // Parágrafo 06.
 *   pVazio(),
 *
 *   // Fecho (SEM numeração)
 *   pSemNum("Protesta por todos os meios de prova..."),
 *   pVazio(),
 *   pCenter("Nestes termos, pede deferimento."),
 *   pVazio(),
 *   pCenter("Brasília - DF, 11 de março de 2026."),
 *   pVazio(), pVazio(),
 *   pCenter("Advogado Nome", { bold: true }),
 *   pCenter("OAB-DF n. 12.345"),
 * ]
 */

const doc = new Document({
  styles: estilos,
  numbering: numbering,
  sections: [{
    properties: {
      page: {
        size: {
          width: 11906,   // A4
          height: 16838
        },
        margin: {
          top: 1843,      // 3.25cm
          right: 851,     // 1.5cm
          bottom: 1134,   // 2cm
          left: 1418      // 2.5cm
        }
      }
    },
    // Sem header/footer (padrão do escritório)
    children: [
      // =====================================================
      // SUBSTITUA ESTE BLOCO PELO CONTEÚDO DA PETIÇÃO
      // usando as funções auxiliares acima
      // =====================================================
      pSemNum("SUBSTITUA ESTE CONTEÚDO PELO DA PETIÇÃO"),
    ]
  }]
});

// ============================================================
// GERAÇÃO DO ARQUIVO
// ============================================================
Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync(dados.outputPath, buffer);
  console.log(`Documento gerado: ${dados.outputPath} (${(buffer.length / 1024).toFixed(1)} KB)`);
});
