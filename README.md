# Inglês Falado na Prática

Página estática para brasileiros estudarem frases comuns em inglês por situações reais de comunicação.

## Objetivo

O projeto reúne frases revisadas com tradução natural, pronúncia aproximada, áudio, fala conectada, palavras fortes, dicas de pronúncia, favoritos, progresso, modo de estudo, diálogos, aulas guiadas e observações culturais.

## Stack

- HTML
- CSS
- JavaScript puro
- Web Speech API
- localStorage

## Como executar

```bash
python3 -m http.server 8080
```

Acesse:

```text
http://localhost:8080
```

## Estrutura

```text
index.html                 Estrutura semântica da página.
styles.css                 Layout, responsividade e estados visuais.
app.js                     Renderização, busca, filtros, modo de estudo e eventos.
data/phrases.js            Dados estruturados das frases.
data/dialogues.js          Diálogos demonstrativos.
data/lessons.js            Catálogo pedagógico com níveis, aulas e referências por IDs.
js/speech.js               Integração com speechSynthesis.
js/storage.js              Favoritos e progresso no localStorage.
```

## Estado atual

```text
93 frases
10 diálogos
9 categorias
1 nível pedagógico inicial
3 aulas guiadas
sem backend
sem autenticação
sem dependências externas
```

## Experiências

```text
Curso guiado
→ percurso recomendado por níveis e aulas

Consulta livre
→ busca, filtros, favoritos, estudadas e modo de estudo
```

## Limitações

- O áudio depende das vozes instaladas no navegador.
- A pronúncia em português é aproximada.
- O áudio deve ser a referência principal.
- O conteúdo será expandido gradualmente.
- Ainda não existe build automatizado.
- Não há testes automatizados formais.

## Próximos passos

- Progresso por aula.
- Conclusão de aulas.
- Revisão pedagógica por uso real.
- Expansão gradual do percurso.

## Publicação estática

Gere o diretório de publicação com:

```bash
bash scripts/build-static.sh
```

O diretório a ser publicado é:

```text
dist/
```

A produção futura usará a branch `main`. A branch `expansao-viagens-hotel` permanece como ambiente de desenvolvimento. A aplicação continua estática, sem banco de dados e sem backend.
