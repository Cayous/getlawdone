---
name: caso:pausar
description: "Pausa o trabalho no meio de uma fase. Grava HANDOFF.md com tudo que já foi feito e o próximo passo concreto. Use quando o contexto está pesado ou o usuário precisa interromper."
---

# /caso:pausar — Salvar estado e pausar

Use quando:
- O contexto está pesado (você está esquecendo trechos, mensagens de compressão aparecendo).
- O usuário pediu para parar no meio de uma fase.
- Você detectou que precisa de `/clear` para continuar com qualidade.

## LEIA PRIMEIRO

1. `~/.claude/commands/caso/templates/HANDOFF.md`
2. `.caso/ESTADO.md`

Se `.caso/` não existir, responda: "Não há caso aberto para pausar."

## O que fazer

### 1. Identificar a fase em curso

Qual era o último `/caso:*` que o usuário rodou? Qual o progresso parcial?

- Se você já escreveu algum `.md` de fase, ela está **concluída** — nesse caso `/caso:pausar` é desnecessário; oriente `/clear` + `/caso:<próxima>`.
- Se você **está no meio** (leu alguns arquivos, fez parte do trabalho, mas ainda não gravou o `.md` da fase), este é o caso de uso do `/caso:pausar`.

### 2. Escrever `.caso/HANDOFF.md`

Preencha o template com:

- **Fase em curso:** número e nome.
- **Checklist do progresso:** o que está [x] pronto, o que está [ ] pendente. Seja granular — quanto mais específico, mais fácil retomar.
- **Dados já coletados que ainda não viraram `.md`:** URLs úteis, achados intermediários, decisões tomadas, ementas encontradas. Isto é o ponto crítico — qualquer coisa que exista só no contexto volátil precisa ir aqui, senão some com `/clear`.
- **Próxima ação concreta:** uma única frase. Ex: "Continuar em `/caso:pesquisar` buscando o 4º precedente da tese T2 (doutrina de Nelson Nery sobre art. 1.015 do CPC)."

### 3. Atualizar `.caso/ESTADO.md`

Registre no `ESTADO.md` que há um handoff ativo, com timestamp. Não mude `fase_concluida` — a fase **não** está concluída, apenas pausada.

### 4. Instruir o usuário

Diga, literalmente:

> Handoff gravado em `.caso/HANDOFF.md`.
>
> Para retomar:
> 1. Rode `/clear` (o contexto atual pode ser descartado com segurança)
> 2. Depois `/caso:retomar`
>
> O modelo vai reler `HANDOFF.md` + `ESTADO.md` e continuar exatamente de onde parou.

## Regras firmes

- **Nunca** marque uma fase como `fase_concluida` em `ESTADO.md` sem que o `.md` correspondente (`DOSSIE`, `DISCUSSAO`, `PESQUISA`, `PLANO`, `EXECUCAO`) exista. Pausar ≠ concluir.
- **Nunca** delete dados do contexto ao pausar. Transfira tudo relevante para `HANDOFF.md`.
- Não faça outro trabalho depois de gravar `HANDOFF.md` — a próxima coisa é o usuário rodar `/clear`.
