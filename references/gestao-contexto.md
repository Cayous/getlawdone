# Gestão de contexto entre fases

O valor central do fluxo `/caso:*` é que cada fase pode começar com contexto limpo. Isto só funciona se dois invariantes forem respeitados em todo subcomando:

## Invariante 1 — Leia o `.md` anterior antes de qualquer outra coisa

Todo subcomando de fase começa com um bloco chamado **LEIA PRIMEIRO**. Ele lista caminhos exatos. Você (modelo) **usa o tool Read imediatamente**, nesses arquivos, antes de:
- chamar outras skills
- pesquisar na web
- escrever qualquer texto para o usuário
- fazer qualquer pergunta

Se algum arquivo da lista não existir, pare e oriente o usuário a rodar o comando anterior. **Não improvise a partir do que você "lembra" da conversa** — o histórico pode ter sido limpo com `/clear` e o que parece memória pode ser alucinação.

## Invariante 2 — Grave o `.md` da fase antes de encerrar

Nenhum subcomando termina sem gravar seu artefato. Se você chegou ao fim do raciocínio mas ainda não usou o Write tool no caminho esperado (`.caso/fases/N-xxx/XXX.md`), você ainda não terminou.

Depois de gravar o `.md`:
1. Atualize `.caso/ESTADO.md` com `fase_concluida: N` e timestamp atual.
2. Recomende `/clear` ao usuário, explicando que o próximo comando relerá o que precisar.

## Padrão de mensagem de encerramento

Use literalmente (ajustando fase e próximo comando):

> Fase **<nome>** concluída. O artefato ficou em `.caso/fases/<N>-<slug>/<ARTEFATO>.md`.
>
> Para preservar contexto para as próximas fases, recomendo:
> 1. Rodar `/clear`
> 2. Depois `/caso:<próximo>` para continuar
>
> Você não perde nada — o próximo comando relê automaticamente os `.md` de que precisa.

## Quando o contexto estourar no meio de uma fase

Sinais:
- você percebe que já leu muitos PDFs ou resultados de pesquisa
- mensagens de sistema sobre compressão
- você começa a esquecer dados básicos do caso

Ação:
1. Pare imediatamente o trabalho em curso.
2. Rode `/caso:pausar`.
3. Após o `HANDOFF.md` ser gravado, peça ao usuário para rodar `/clear` e depois `/caso:retomar`.

## O que NUNCA fazer

- Continuar uma fase "de memória" depois de um `/clear` sem reler os `.md`.
- Editar `.md` de fases anteriores durante a fase atual.
- Pular o bloco **LEIA PRIMEIRO** porque "já vi antes".
- Esquecer de gravar o `.md` da fase antes de sugerir `/clear` ao usuário.
