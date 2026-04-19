---
caso: <slug-do-diretorio>
tipo_peca: <ex: agravo-interno | apelacao | contestacao | inicial>
tribunal: <ex: TJMG | TJSP | STJ>
processo: <numero CNJ se houver, senão "sem processo">
data_abertura: <YYYY-MM-DD>
status: <fase em curso: fase-1-caso | ... | fase-5-executada>
---

# Caso: <Nome curto do caso>

## Partes

- **Cliente (<polo>):** <nome completo>
- **Parte contrária (<polo>):** <nome completo>

## Resumo em uma frase

<Uma única frase que identifica o caso — o que se pede, contra quem, com que fundamento. Ex: "Agravo interno contra decisão monocrática que não conheceu de agravo de instrumento em pedido de revogação de gratuidade de justiça.">

## Objetivo da peça

<Qual resultado processual se busca. Ex: "Provimento do agravo interno para que o agravo de instrumento seja conhecido e julgado no mérito.">

## Prazo

<Data limite para protocolo. Se não houver prazo, anote "sem prazo fixo".>

## Documentos-fonte indexados

<Lista referenciando `.caso/documentos/` e os `RESUMO-*.md` correspondentes em `.caso/resumos/`. Ex:>
- `documentos/inicial.pdf` → `resumos/RESUMO-inicial.md`
- `documentos/decisao-monocratica.pdf` (curto, lido direto)

---

> Este arquivo é reusado por todas as fases. O corpo acima (partes, resumo, objetivo) não muda após a fase 1. Apenas `status` no frontmatter é atualizado.
