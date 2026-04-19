---
name: caso:retomar
description: "Retoma o caso de onde parou após /caso:pausar + /clear. Lê HANDOFF.md e ESTADO.md e segue a próxima ação concreta sem pedir dados já registrados."
---

# /caso:retomar — Retomar de onde parou

Use após `/caso:pausar` seguido de `/clear`. Este comando reconstrói o contexto mínimo necessário a partir dos `.md` em `.caso/`.

## LEIA PRIMEIRO (obrigatório)

Use o Read tool AGORA, nesta ordem:

1. `.caso/HANDOFF.md` — ponto exato em que o trabalho parou
2. `.caso/ESTADO.md` — visão geral do progresso
3. `.caso/CASO.md` — tipo de peça, partes

Se `.caso/HANDOFF.md` **não existir**:
- Verifique `.caso/ESTADO.md`: se a última fase está concluída, não há nada a retomar — recomende `/caso:<próxima>` e pare.
- Se não há `.caso/` sequer, diga: "Nenhum caso aberto neste diretório."

## O que fazer

### 1. Entender exatamente onde parou

Do `HANDOFF.md`, extraia:
- Qual fase estava em curso (N).
- Checklist de progresso (o que está [x] e o que está [ ]).
- Dados coletados que não viraram `.md` ainda.
- Próxima ação concreta.

### 2. Ler o `.md` da fase anterior concluída

Dependendo de N:
- N=2 (discutir): leia `.caso/fases/1-caso/DOSSIE.md` + resumos.
- N=3 (pesquisar): leia `.caso/fases/2-discussao/DISCUSSAO.md`.
- N=4 (planejar): leia `.caso/fases/2-discussao/DISCUSSAO.md` + `.caso/fases/3-pesquisa/PESQUISA.md`.
- N=5 (executar): leia `.caso/fases/4-plano/PLANO.md` + `.caso/fases/3-pesquisa/PESQUISA.md`.

### 3. Anunciar ao usuário o estado e confirmar

Responda com um resumo curto:

```
Retomando de /caso:<comando> (fase <N>).

Progresso salvo no handoff:
  [x] <item concluído 1>
  [x] <item concluído 2>
  [ ] <item pendente 1>
  [ ] <item pendente 2>

Próxima ação: <frase do HANDOFF.md>

Seguindo agora?
```

Aguarde "sim" (ou equivalente) antes de continuar o trabalho. Se o usuário tiver ajustes (mudança de rumo, nova informação), aceite antes de prosseguir.

### 4. Executar a próxima ação

Continue o trabalho a partir da ação concreta registrada. Siga as regras da fase N (incluindo **LEIA PRIMEIRO** do comando correspondente se ainda não leu tudo — por segurança). Quando terminar o trabalho pendente daquela fase, siga o encerramento normal dela: grave o `.md` da fase e oriente `/clear` + próximo comando.

### 5. Limpar o handoff

Depois de gravar o `.md` da fase (concluindo-a de fato), **apague** `.caso/HANDOFF.md`:

```bash
rm .caso/HANDOFF.md
```

Isso evita confundir execuções futuras. O `ESTADO.md` passa a refletir a fase como concluída.

## Regras firmes

- **Nunca continue de memória.** O `/clear` significa que o histórico volátil sumiu. O que não está em `.md` não existe mais. Se o `HANDOFF.md` estiver incompleto, peça ao usuário — não invente dados.
- **Não recomece a fase do zero** se o `HANDOFF.md` mostra progresso parcial. Retome do ponto registrado.
- **Não pule o aguardar confirmação do usuário.** Ele pode ter mudado de ideia entre o `/clear` e o `/caso:retomar`.
