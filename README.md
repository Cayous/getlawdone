# getlawdone — Skill `/caso:*` para Claude Code

Fluxo em 5 fases para elaborar peças jurídicas no [Claude Code](https://claude.ai/code), com gerenciamento explícito de contexto entre fases. Inspirado no [GSD (Get Shit Done)](https://github.com/mannyfoo/get-shit-done), adaptado do domínio de engenharia de software para o jurídico.

## Problema que resolve

Elaborar uma peça processual com IA envolve ler autos enormes (iniciais, contestações, laudos, anexos), pesquisar jurisprudência e doutrina, discutir teses e redigir o documento final. Tudo isso num único prompt estoura o contexto do modelo: ele "esquece" trechos do PDF, mistura precedentes, perde o fio da argumentação.

A skill `/caso:*` resolve isso dividindo o trabalho em fases, cada uma produzindo um `.md` de entrega que funciona como **ponto de corte**. Entre fases você pode (e é incentivado a) rodar `/clear` — o próximo comando recupera tudo que precisa a partir dos `.md`, sem depender da memória volátil do modelo.

## As 5 fases

```
/caso:novo       →   1. Abertura do caso: partes, tipo de peça, dossiê de fatos
     ↓
/caso:discutir   →   2. Análise jurídica: teses adotadas e descartadas, estratégia
     ↓
/caso:pesquisar  →   3. Pesquisa: ementas integrais, doutrina, legislação
     ↓
/caso:planejar   →   4. Plano da peça: storyboard seção a seção
     ↓
/caso:executar   →   5. Execução: gera .docx final (delega ao peticao-juridica)
```

Cada comando começa com um bloco **LEIA PRIMEIRO** que força o uso do `Read` tool nos `.md` das fases anteriores **antes de qualquer outra ação**. Se faltar um artefato, o comando para e indica qual `/caso:*` rodar antes — nada de improvisar de memória após um `/clear`.

## Comandos auxiliares

- **`/caso:resumir-doc <arquivo>`** — para PDFs grandes. Lê em faixas de 20 páginas e grava um `RESUMO-<slug>.md` incremental. As fases seguintes consomem o resumo em vez do PDF original. Se o contexto pesar no meio da leitura, o comando salva o progresso parcial e você pode retomá-lo após `/clear`.
- **`/caso:estado`** — mostra onde o caso está: última fase concluída, artefatos produzidos, resumos gerados, próximo comando sugerido.
- **`/caso:pausar`** — interrompe o trabalho no meio de uma fase salvando um `HANDOFF.md` com progresso parcial e próxima ação concreta.
- **`/caso:retomar`** — lê o `HANDOFF.md` após `/clear` e continua do ponto exato onde você parou.

## Workspace por caso

A skill opera sobre um workspace local `.caso/` criado na pasta onde você invocou o Claude Code. Um caso = uma pasta. Estrutura:

```
./.caso/
├── CASO.md                           # visão geral (partes, tipo de peça, prazo)
├── ESTADO.md                         # última fase concluída, próximo passo
├── documentos/                       # PDFs e .docx originais (você coloca aqui)
├── resumos/                          # RESUMO-<slug>.md por documento grande
├── fases/
│   ├── 1-caso/DOSSIE.md              # fatos, partes qualificadas, linha do tempo
│   ├── 2-discussao/DISCUSSAO.md      # teses, estratégia, briefing de pesquisa
│   ├── 3-pesquisa/PESQUISA.md        # precedentes, doutrina, legislação
│   ├── 4-plano/PLANO.md              # storyboard da peça
│   └── 5-execucao/
│       ├── EXECUCAO.md               # log de redação
│       └── peticao.docx              # peça final
└── HANDOFF.md                        # existe só após /caso:pausar
```

## Instalação

1. Clone em `~/.claude/commands/`:

   ```bash
   cd ~/.claude/commands
   git clone git@github.com:Cayous/getlawdone.git caso
   ```

   A pasta precisa se chamar **`caso`** para os comandos aparecerem como `/caso:*` no Claude Code.

2. Reinicie o Claude Code (ou rode `/help` em uma nova sessão) — os 9 comandos `/caso:*` e os arquivos de `templates/` e `references/` devem aparecer na lista de skills.

### Dependências

Esta skill consome duas outras skills no fluxo:

- **[peticao-juridica](https://github.com/Cayous/peticao-juridica)** (obrigatória) — a fase `/caso:executar` delega a geração do `.docx` a ela. Tipografia Century Gothic, espaçamento 1.5, margens assimétricas, numeração `01.`, citações com recuo, imagens via `ImageRun`. Deve estar em `~/.claude/commands/peticao-juridica/`.
- **analise-juridica** (recomendada) — a fase `/caso:discutir` e `/caso:pesquisar` usam esta skill para sondagem e pesquisa de precedentes brasileiros (STJ, STF, TJs). Sem ela, as fases caem para `WebSearch` direto.

Estas duas skills são independentes e não fazem parte deste repo.

## Como usar — exemplo completo

Supondo que você vai fazer um agravo interno. Em uma pasta dedicada ao caso:

```bash
mkdir -p agravo-lucas/documentos
cp ~/Downloads/decisao-monocratica.pdf agravo-lucas/documentos/
cp ~/Downloads/autos-completos.pdf agravo-lucas/documentos/
cd agravo-lucas
claude
```

Na sessão do Claude Code:

```
/caso:novo
```

O modelo pergunta partes, tipo de peça, tribunal, prazo, e indexa os documentos em `./documentos/`. Para PDFs grandes, recomenda rodar:

```
/caso:resumir-doc autos-completos.pdf
```

Após o resumo (que pode ser incremental, com `/clear` no meio se preciso):

```
/clear
/caso:discutir
```

O modelo relê automaticamente `DOSSIE.md` + resumos, identifica teses, grava `DISCUSSAO.md`. E assim sucessivamente:

```
/clear
/caso:pesquisar

/clear
/caso:planejar

/clear
/caso:executar
```

Ao fim, `.caso/fases/5-execucao/peticao.docx` está pronta para revisão e protocolo.

## Gestão de contexto — as duas invariantes

A skill inteira se apoia em duas regras que todo subcomando respeita:

**1. Leia antes de agir.** Todo `/caso:*` começa com um bloco "LEIA PRIMEIRO" que usa o `Read` tool nos `.md` das fases anteriores antes de qualquer outra coisa — inclusive antes de responder ao usuário. Se faltar um `.md`, o comando para e aponta qual fase rodar antes.

**2. Grave antes de encerrar.** Nenhuma fase termina sem gravar seu `.md` de saída. Só depois disso o comando sugere `/clear` + próximo comando — garantindo que o corte de contexto seja sempre seguro.

O detalhe das regras está em [`references/gestao-contexto.md`](./references/gestao-contexto.md).

## Estrutura do repo

```
.
├── README.md                         # este arquivo
├── novo.md                           # /caso:novo
├── discutir.md                       # /caso:discutir
├── pesquisar.md                      # /caso:pesquisar
├── planejar.md                       # /caso:planejar
├── executar.md                       # /caso:executar
├── resumir-doc.md                    # /caso:resumir-doc
├── estado.md                         # /caso:estado
├── pausar.md                         # /caso:pausar
├── retomar.md                        # /caso:retomar
├── templates/                        # esqueletos dos .md de cada fase
│   ├── CASO.md
│   ├── ESTADO.md
│   ├── DOSSIE.md
│   ├── DISCUSSAO.md
│   ├── PESQUISA.md
│   ├── PLANO.md
│   ├── EXECUCAO.md
│   ├── RESUMO-DOC.md
│   └── HANDOFF.md
└── references/                       # documentação consultada pelos subcomandos
    ├── estrutura-caso.md             # layout de .caso/ e regras fixas
    ├── gestao-contexto.md            # invariantes de read-first e encerramento
    └── leitura-documentos.md         # como resumir PDFs grandes sem estourar contexto
```

## Licença

MIT
