# Checkpoint Ciclo 2

## Identificação

```text
Projeto: Inglês Falado na Prática
Checkpoint: conclusão dos Ciclos 1, 1A, 2, 2A e 2B
```

## Objetivo do projeto

Página estática de estudo de inglês para brasileiros, organizada por situações reais do cotidiano.

## Fonte inicial

```text
1000-frases-mais-usadas-no-ingles.pdf
```

O PDF foi usado como matéria-prima. Traduções, categorias e pronúncias não foram copiadas automaticamente; cada entrada foi revisada antes de entrar no conjunto de dados.

## Arquitetura

```text
index.html
styles.css
app.js
data/phrases.js
data/dialogues.js
js/speech.js
js/storage.js
```

## Funcionalidades

- Pesquisa em inglês e português.
- Normalização de acentos.
- Filtros por categoria e status.
- Favoritos.
- Progresso.
- Tradução ocultável.
- Detalhes de pronúncia.
- Fala conectada.
- Palavras fortes.
- Áudio normal e lento.
- Modo de estudo.
- Diálogos.
- Observações culturais.
- Persistência em localStorage.
- Responsividade.
- Acessibilidade básica.

## Estado quantitativo

```text
63 frases
7 diálogos
9 categorias
63 IDs únicos
```

## Categorias

```text
Frases essenciais
Cumprimentos e apresentações
Dificuldades na comunicação
Viagens e direções
Hotel
Restaurante
Perguntas essenciais
Conversas casuais
Rotina diária
```

## Decisões linguísticas

- H inglês nunca é representado por R brasileiro.
- TH é mantido visível.
- Há diferenciação entre TH sonoro e TH surdo.
- Evitam-se vogais brasileiras após consoantes finais.
- Connected speech é usado somente quando natural.
- O áudio é a referência principal.
- As traduções usam português brasileiro natural.
- `notes` registra contexto cultural.
- `pronunciationTip` fica reservado para pronúncia.

## Correções importantes

```text
Is it close? -> É perto?
Do you have any vacancies? -> Vocês têm vagas disponíveis?
```

`How old are you?` possui observação cultural: perguntar idade pode ser pessoal em algumas situações e é mais comum com crianças, formulários, contextos médicos ou quando já existe intimidade.

## Validações

Passaram:

```text
node --check
importação dos dados
IDs únicos
campos obrigatórios
valores válidos
busca
filtros
favoritos
progresso
modo de estudo
diálogos
acessibilidade
responsividade
ausência de padrões perigosos de renderização
```

## Limitações

- Áudio não validado auditivamente em todos os dispositivos.
- Dependência de `speechSynthesis`.
- Ausência de testes automatizados formais.
- Ausência de pipeline de build.
- Expansão de conteúdo ainda incompleta.
- O PDF não deve ser tratado como fonte linguisticamente confiável sem revisão.

## Próximo ciclo recomendado

```text
expansão controlada de módulos de viagem, hotel e restaurante
```

Essa expansão não foi executada neste ciclo.
