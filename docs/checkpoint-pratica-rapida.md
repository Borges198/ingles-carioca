# Checkpoint - Pratica rapida

## Problema observado

A secao `Pratica rapida` mostrava automaticamente as 93 frases quando:

- pesquisa vazia
- categoria Todas
- status Todas

Isso aumentava a rolagem e duplicava visualmente o catalogo completo.

## Comportamento implementado

Sem criterio ativo:

- zero cards
- mensagem orientativa
- sem contagem "93 de 93"
- botao Abrir modo de estudo desabilitado

Com pesquisa ou filtro ativo:

- somente resultados correspondentes
- contagem filtrada
- modo de estudo habilitado quando existem resultados
- modo de estudo limitado ao conjunto filtrado

Com criterio ativo e nenhum resultado:

- mensagem de nenhum resultado
- modo de estudo desabilitado

## Criterios ativos

Existe criterio ativo quando:

- pesquisa possui texto
- ou categoria e diferente de Todas
- ou status e diferente de Todas

## Preservacoes

Permaneceram inalterados:

- curso guiado
- abertura das aulas
- audio
- favoritos
- estudadas
- progresso global
- localStorage
- busca por ingles e portugues
- busca por situacao e tags
- normalizacao de acentos
- combinacao de filtros

## Homologacao

- validacao local aprovada
- responsividade aprovada
- deploy da branch aprovado
- teste em celular aprovado
- comportamento considerado estavel por Rodrigo

## Commit funcional

`8a92514 fix: ocultar frases sem filtro na pratica rapida`

## Limitacoes preservadas

- nao ha banco de dados
- progresso permanece local ao navegador
- nao ha progresso especifico por aula
