# Checkpoint - Estrutura pedagógica inicial

## Identificação

```text
Projeto: Inglês Falado na Prática
Fase: Estrutura pedagógica inicial
Branch: expansao-viagens-hotel
Base inicial: b135c7a
```

## Objetivo da fase

Transformar a aplicação de consulta em uma base de curso guiado, preservando a experiência livre existente.

## Decisão arquitetural

```text
data/phrases.js
→ fonte linguística das frases

data/dialogues.js
→ fonte dos diálogos

data/lessons.js
→ organização pedagógica por referências de IDs
```

O catálogo pedagógico separado foi escolhido por reduzir acoplamento, permitir reutilização de frases, manter a ordem pedagógica independente e preservar favoritos e progresso existentes.

## Estrutura criada

```text
1 nível inicial
3 aulas
```

| Aula | Objetivo | Frases | Diálogos |
| --- | --- | ---: | ---: |
| Primeiro contato | Cumprimentar, apresentar-se e iniciar uma conversa simples. | 6 | 2 |
| Quando não entendo | Pedir ajuda, repetição, explicação, soletração e redução da velocidade da fala. | 8 | 2 |
| Check-in no hotel | Chegar ao hotel, informar uma reserva e pedir informações iniciais da hospedagem. | 8 | 2 |

## Funcionalidades implementadas

```text
catálogo visual
cards informativos
botão Abrir aula
painel individual da aula
frases resolvidas por phraseId
diálogos resolvidos por dialogueId
áudio normal e lento reutilizados
fechamento da aula
troca entre aulas
restauração de foco
cancelamento do áudio ao fechar ou trocar
```

## Preservações

Não foram alterados:

```text
busca
filtros
favoritos
estudadas
progresso global
modo de estudo
localStorage
conteúdo linguístico
```

## Revisão independente

```text
APROVADO COM RESSALVA NÃO BLOQUEANTE
```

A ressalva sobre o áudio continuar após fechar ou trocar a aula foi corrigida com reutilização de:

```text
stopSpeech()
```

## Homologação de Rodrigo

```text
fluxo visual aprovado
três aulas testadas individualmente
áudios testados
frases práticas alinhadas ao conteúdo
diálogos alinhados às lições
estrutura aprovada para fechamento
```

## Limitações atuais

```text
não há progresso por aula
não há conclusão de aula
não há desbloqueio sequencial
não há login ou banco de dados
progresso permanece local ao navegador
estrutura possui somente três aulas iniciais
```

## Próximo ciclo recomendado

```text
progresso mínimo por aula, sem banco de dados e preservando o progresso global
```
