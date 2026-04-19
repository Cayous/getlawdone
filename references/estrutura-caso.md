# Estrutura do workspace `.caso/`

Todos os comandos `/caso:*` operam sobre um workspace local na pasta onde o Claude Code foi invocado:

```
./.caso/
├── CASO.md                           # visão geral do caso (curta, estável)
├── ESTADO.md                         # última fase concluída, próximo passo
├── documentos/                       # originais entregues (PDFs, .docx)
├── resumos/                          # RESUMO-<slug>.md por documento grande
├── fases/
│   ├── 1-caso/DOSSIE.md              # fatos, partes, linha do tempo
│   ├── 2-discussao/DISCUSSAO.md      # teses, estratégia
│   ├── 3-pesquisa/PESQUISA.md        # precedentes, doutrina, legislação
│   ├── 4-plano/PLANO.md              # esqueleto da peça
│   └── 5-execucao/
│       ├── EXECUCAO.md               # log de redação
│       └── peticao.docx              # peça final
└── HANDOFF.md                        # existe só após /caso:pausar
```

## Regras fixas

1. **Sempre relativo ao cwd.** O comando não sobe diretórios procurando `.caso/`. Se não existir e o comando não for `/caso:novo`, pare e oriente: "Workspace `.caso/` não encontrado. Rode `/caso:novo` nesta pasta ou mude para a pasta do caso."

2. **Documentos originais nunca são movidos nem modificados.** Ficam em `documentos/` como o usuário colocou.

3. **Resumos em `resumos/` são imutáveis depois de gerados.** Se o usuário quiser refazer, delete e rode `/caso:resumir-doc` novamente. Isso dá previsibilidade — uma fase que leu `RESUMO-x.md` confia que ele não vai mudar nas costas dela.

4. **Cada fase escreve apenas seu próprio `.md`.** Nunca edite `DOSSIE.md` durante `/caso:pesquisar`. Se um fato da fase 1 estava errado, use o `ESTADO.md` para registrar a correção; a próxima iteração completa refaz.

5. **`CASO.md` é a única exceção.** Ele é atualizado a cada fase com um pequeno bloco no topo ("status: fase 3 concluída"). O corpo do `CASO.md` (partes, tipo de peça, tribunal) não muda.

## Slug do caso

O slug é o nome da pasta de trabalho (resultado de `basename "$PWD"`). Não há um "nome" separado no metadado — o diretório É o caso.

## Verificação rápida de integridade

Antes de começar qualquer fase, confirme que todos os `.md` das fases anteriores existem:

```bash
test -f .caso/fases/1-caso/DOSSIE.md
test -f .caso/fases/2-discussao/DISCUSSAO.md
# ... etc
```

Se faltar qualquer um, pare e aponte ao usuário qual `/caso:*` precisa rodar antes.
