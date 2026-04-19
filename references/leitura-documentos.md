# Leitura de documentos grandes

Casos reais trazem PDFs de dezenas ou centenas de páginas (autos completos, laudos, extratos). Puxar o PDF inteiro para o contexto torna o modelo lento e esquecido. A regra é: **transformar cada documento grande em um `RESUMO-<slug>.md` antes de usá-lo nas fases de discussão, pesquisa e plano**.

## Quando resumir

Gere `RESUMO-*.md` para todo documento em `.caso/documentos/` que atenda a qualquer um destes critérios:
- PDF com mais de 30 páginas
- arquivo maior que 5 MB
- documento que o usuário marcou como "principal" (inicial, contestação, sentença)

Documentos pequenos (pareceres curtos, ofícios, contratos de 1–3 páginas) podem ser lidos direto nas fases sem resumo.

## Como resumir (passo a passo)

O Read tool aceita o parâmetro `pages` para PDFs. Use-o para ler em faixas de até 20 páginas:

1. Leia `pages: "1-20"`. Tome nota de:
   - **Estrutura**: que assunto começa/termina em quais páginas.
   - **Fatos**: datas, valores, nomes, decisões citadas.
   - **Trechos citáveis literais**: um ou dois parágrafos que podem servir como prova documental, com o número da página de origem.
2. Escreva o bloco correspondente em `.caso/resumos/RESUMO-<slug>.md` (append incremental, não sobrescreva). Use o template `RESUMO-DOC.md`.
3. Siga para `pages: "21-40"`, repita.
4. Prossiga até cobrir o documento inteiro.

Se em qualquer momento o contexto ficar pesado, pare, grave o `RESUMO-*.md` até onde chegou, e oriente `/clear` + retomada. O `RESUMO-*.md` é incremental — pode ser continuado em outra sessão.

## O que o resumo deve conter

1. **Índice por faixa de página** — "pp. 1–12: qualificação das partes e fatos introdutórios; pp. 13–27: pedido principal e fundamentação contratual; ..."
2. **Fatos-chave** com referência de página: "Contrato firmado em 12/03/2022 (p. 14). Valor da causa R$ 48.200,00 (p. 33)."
3. **Trechos citáveis** literais em blockquote, com página: cada um deve ser utilizável em uma peça sem o modelo precisar reler o PDF.
4. **Imagens ou anexos internos relevantes** — apenas descrição e posição, não tentar transcrever tudo.

## O que o resumo NÃO deve conter

- Interpretação jurídica (isso é da fase 2, `/caso:discutir`).
- Opiniões sobre força probatória.
- Citação de jurisprudência (isso é da fase 3).

O `RESUMO-*.md` é puramente descritivo. Isola a leitura do PDF do raciocínio jurídico, para que cada fase posterior possa confiar nele sem precisar rever o original.

## Documentos .docx e outros formatos

Para `.docx` o mesmo princípio vale: se for grande, resuma em `RESUMO-<slug>.md`. Use o fluxo do `peticao-juridica` (unzip + verificação de imagens em `/word/media/`) **somente** quando for necessário citar imagens visualmente. Caso contrário, trate como texto.
