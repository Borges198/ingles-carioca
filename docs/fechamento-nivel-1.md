# Fechamento do Nível 1

## Estado inicial da fase
- Branch base: expansao-viagens-hotel
- HEAD base: e60915f
- 1 nível
- 9 aulas
- 93 frases
- 70 frases únicas usadas
- 72 ocorrências
- 23 frases fora das aulas
- 10 diálogos usados

## Problemas pedagógicos encontrados
- Aulas 4 e 5 sem unidade comunicativa clara.
- Aula 6 com alergia posicionada tarde.
- Aula 8 com subcenários em ordem confusa.
- Aula 9 ampla demais.
- Repetição desnecessária de questions-what-are-you-doing.

## Arquitetura final
1. Primeiro contato
2. Quando não entendo
3. Perguntas e respostas simples
4. Reações e encerramento de conversas
5. Direções básicas
6. Aeroporto e transporte
7. Chegada e check-in no hotel
8. Durante a hospedagem e check-out
9. Restaurante

## Alterações pedagógicas
- Frases adicionadas às aulas: communication-still-learning-english, communication-what-do-you-mean, communication-pronounce-that, essentials-of-course, casual-maybe, essentials-im-not-sure, essentials-i-dont-know, essentials-excellent, essentials-thank-you-very-much, essentials-no-problem.
- Frases retiradas da progressão formal: communication-speak-little-english, questions-what-are-you-doing, questions-can-you-show-me, questions-can-you-give-example, routine-i-wake-up-early, routine-i-go-to-work.
- Principais realocações: lesson-hotel-check-in passou para a Aula 7, lesson-restaurant passou para a Aula 9, lesson-basic-directions passou para a Aula 5, lesson-airport-transport passou para a Aula 6.
- greetings-my-name-is foi mantida em duas aulas porque serve tanto ao primeiro contato quanto à rota de check-in com reserva.
- questions-what-are-you-doing foi removida das aulas para evitar repetição e por não ter sequência de respostas suficientes no nível.

## Frases fora das aulas
- essentials-be-careful
- essentials-help
- essentials-dont-worry
- communication-translate-this
- restaurant-table-for-two
- restaurant-water-please
- essentials-are-you-okay
- essentials-what-happened
- greetings-how-old-are-you
- questions-do-you-understand
- restaurant-see-menu
- restaurant-this-to-go
- restaurant-table-outside
- communication-speak-little-english
- questions-what-are-you-doing
- questions-can-you-show-me
- questions-can-you-give-example
- routine-i-wake-up-early
- routine-i-go-to-work

Essas frases permanecem no catálogo.

## Diálogos
- 10 diálogos utilizados.
- Nenhum diálogo fora das aulas.
- restaurant-ordering-meal foi apenas reordenado para posicionar a alergia antes da escolha definitiva do prato.
- Nenhuma fala foi criada ou reescrita amplamente.

## Estado final
- 9 aulas
- 75 ocorrências
- 74 frases únicas usadas
- 19 frases fora das aulas
- 10 diálogos usados

## Arquivos alterados
- data/lessons.js
- data/dialogues.js
- docs/fechamento-nivel-1.md

## Validações
- Checks de sintaxe executados para data/phrases.js, data/dialogues.js e data/lessons.js.
- git diff --check executado.
- Validação por importação executada.
- Homologação funcional executada em Chrome headless com instrumentação de áudio.
- Limitação: a validação auditiva real não foi executada neste ambiente.

## Limitações e próximos passos
- Conteúdo de emergência ainda insuficiente para aula própria.
- Rotina diária precisa de mais frases.
- Ações do momento precisam de respostas.
- Perguntas de aprendizagem precisam de contexto.
- How old are you? permanece fora da progressão cotidiana.
- Push, merge e deploy ainda não realizados.
