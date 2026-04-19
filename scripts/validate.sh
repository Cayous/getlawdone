#!/bin/bash
# validate.sh — Valida petição jurídica gerada em .docx
# Uso: bash validate.sh /caminho/para/peticao.docx

set -e

FILE="$1"

if [ -z "$FILE" ]; then
  echo "❌ Uso: bash validate.sh <arquivo.docx>"
  exit 1
fi

if [ ! -f "$FILE" ]; then
  echo "❌ Arquivo não encontrado: $FILE"
  exit 1
fi

echo "🔍 Validando: $FILE"
echo ""

# 1. Validação estrutural do .docx (zipfile válido + document.xml parseável)
echo "1️⃣  Validação estrutural (docx)..."
STRUCT_RESULT=$(python3 -c "
import sys, zipfile, xml.etree.ElementTree as ET
try:
    with zipfile.ZipFile(sys.argv[1]) as z:
        if 'word/document.xml' not in z.namelist():
            print('FAILED: word/document.xml ausente'); sys.exit(1)
        ET.parse(z.open('word/document.xml'))
        print('OK: estrutura do .docx válida')
except zipfile.BadZipFile:
    print('FAILED: arquivo não é um .docx válido (zip corrompido)'); sys.exit(1)
except ET.ParseError as e:
    print(f'FAILED: XML do documento inválido — {e}'); sys.exit(1)
" "$FILE" 2>&1) || { echo "$STRUCT_RESULT"; echo "❌ Validação estrutural FALHOU"; exit 1; }
echo "$STRUCT_RESULT"
echo ""

# 2. Extração de texto para verificações de conteúdo
echo "2️⃣  Extraindo texto para verificação de conteúdo..."
TEMP_DIR=$(mktemp -d)
TEXT_FILE="$TEMP_DIR/content.txt"

# Extrai texto via pandoc se disponível, senão via python-docx
if command -v pandoc &> /dev/null; then
  pandoc "$FILE" -t plain -o "$TEXT_FILE" 2>/dev/null
else
  python3 -c "
import zipfile, xml.etree.ElementTree as ET
with zipfile.ZipFile('$FILE') as z:
    tree = ET.parse(z.open('word/document.xml'))
    ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
    texts = [t.text for t in tree.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t') if t.text]
    print(' '.join(texts))
" > "$TEXT_FILE" 2>/dev/null
fi

if [ ! -s "$TEXT_FILE" ]; then
  echo "⚠️  Não foi possível extrair texto para verificação"
  rm -rf "$TEMP_DIR"
  echo ""
  echo "✅ Validação estrutural OK (conteúdo não verificado)"
  exit 0
fi

CONTENT=$(cat "$TEXT_FILE")
ERRORS=0

# 3. Verificações de conteúdo jurídico
echo "3️⃣  Verificando elementos obrigatórios da petição..."
echo ""

# Endereçamento
if echo "$CONTENT" | grep -qi "EXCELENT"; then
  echo "  ✅ Endereçamento presente"
else
  echo "  ⚠️  Endereçamento não encontrado (EXCELENTÍSSIMO...)"
  ERRORS=$((ERRORS + 1))
fi

# Fundamentação legal
if echo "$CONTENT" | grep -qi "art\.\|artigo\|CPC\|Código de Processo"; then
  echo "  ✅ Fundamentação legal presente"
else
  echo "  ⚠️  Referência a dispositivo legal não encontrada"
  ERRORS=$((ERRORS + 1))
fi

# Pedidos
if echo "$CONTENT" | grep -qi "requer\|pede\|pedido"; then
  echo "  ✅ Seção de pedidos presente"
else
  echo "  ⚠️  Seção de pedidos não encontrada"
  ERRORS=$((ERRORS + 1))
fi

# Fecho
if echo "$CONTENT" | grep -qi "nestes termos\|pede deferimento\|termos em que"; then
  echo "  ✅ Fecho presente"
else
  echo "  ⚠️  Fecho não encontrado (Nestes termos...)"
  ERRORS=$((ERRORS + 1))
fi

# Advogado/OAB
if echo "$CONTENT" | grep -qi "OAB"; then
  echo "  ✅ Identificação do advogado (OAB) presente"
else
  echo "  ⚠️  OAB do advogado não encontrada"
  ERRORS=$((ERRORS + 1))
fi

# Data
if echo "$CONTENT" | grep -qiE "[0-9]{1,2} de (janeiro|fevereiro|março|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro) de [0-9]{4}"; then
  echo "  ✅ Data presente"
else
  echo "  ⚠️  Data não encontrada no formato esperado"
  ERRORS=$((ERRORS + 1))
fi

echo ""

# Cleanup
rm -rf "$TEMP_DIR"

# Resultado final
if [ $ERRORS -eq 0 ]; then
  echo "✅ Petição validada com sucesso — todos os elementos presentes!"
  exit 0
elif [ $ERRORS -le 2 ]; then
  echo "⚠️  Petição validada com $ERRORS aviso(s) — verifique os itens acima"
  exit 0
else
  echo "❌ Petição com $ERRORS problemas — revise o conteúdo"
  exit 1
fi
