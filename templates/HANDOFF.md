---
caso: <slug>
pausado_em: <YYYY-MM-DD HH:MM>
fase_em_curso: <1 | 2 | 3 | 4 | 5>
proxima_acao: <texto da próxima ação concreta>
---

# Handoff — pausa no meio da fase <N>

> Arquivo gerado por `/caso:pausar`. Quando o usuário rodar `/caso:retomar` depois de `/clear`, esta é a primeira coisa a ser lida.

## O que já foi feito nesta fase

<Checklist do progresso parcial. Marcar [x] o que está pronto.>

- [x] Li `DOSSIE.md` e `DISCUSSAO.md`
- [x] Pesquisei precedentes da tese T1 (3 ementas integrais salvas)
- [ ] Pesquisar precedentes da tese T2
- [ ] Pesquisar doutrina sobre <tema>
- [ ] Gravar `PESQUISA.md` final

## Dados já coletados (para não perder no /clear)

<Aqui vai tudo que estava em contexto volátil e ainda não virou `.md`. Ex: lista de URLs abertas, achados intermediários, decisões tomadas.>

- URL consultada mas ainda não citada: <URL>
- Decisão: excluir Precedente X porque foi superado pelo Tema Y do STJ.

## Próxima ação concreta

<Uma única frase dizendo exatamente o que fazer quando retomar. Ex: "Continuar em `/caso:pesquisar` buscando doutrina de Nelson Nery sobre art. 1.015 do CPC, ponto 3 da lista em `DISCUSSAO.md`.">

## Instrução ao usuário

Ao retomar:
1. Rode `/clear` (se ainda não rodou).
2. Rode `/caso:retomar`. Este arquivo será lido automaticamente.
3. O modelo continuará de onde parou, sem pedir dados já registrados.
