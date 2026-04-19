---
name: caso:estado
description: "Mostra o estado atual do caso aberto no diretório: última fase concluída, artefatos produzidos, resumos existentes e o próximo comando sugerido."
---

# /caso:estado — Consultar estado do caso

Comando de leitura apenas. Reporta ao usuário onde o caso está e qual o próximo passo.

## O que fazer

### 1. Verificar workspace

```bash
test -d .caso
```

Se não existir, responda: "Não há caso aberto neste diretório. Rode `/caso:novo` para começar."

### 2. Ler os artefatos presentes

Use Read em:
- `.caso/ESTADO.md` (se existir)
- `.caso/CASO.md` (se existir)

Use Bash/Glob para listar:
- `.caso/fases/*/` (quais pastas existem e quais têm `.md` dentro)
- `.caso/resumos/*.md`
- `.caso/HANDOFF.md` (se existir — sinal de pausa)

### 3. Reportar em formato compacto

Responda ao usuário com:

```
Caso: <slug do diretório> (<tipo de peça>)
Partes: <cliente> × <parte contrária>
Prazo: <data ou "sem prazo fixo">

Fase atual: <N> (<nome>)

Artefatos:
  [x] CASO.md
  [x] 1-caso/DOSSIE.md
  [x] 2-discussao/DISCUSSAO.md
  [ ] 3-pesquisa/PESQUISA.md      ← próxima
  [ ] 4-plano/PLANO.md
  [ ] 5-execucao/EXECUCAO.md
  [ ] 5-execucao/peticao.docx

Resumos de documentos:
  - RESUMO-inicial.md (180/180 pp)
  - RESUMO-contestacao.md (45/45 pp)

Handoff ativo: <sim | não>

Próximo comando: /caso:<nome>
```

### 4. Se houver `HANDOFF.md`

Leia-o também e destaque: "Há um handoff pendente de `/caso:pausar`. Rode `/caso:retomar` (idealmente após `/clear`)."

### 5. Não modifique nada

Este comando é puramente diagnóstico. Não crie, não edite, não sobrescreva arquivos.
