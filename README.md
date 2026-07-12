# Inglês Falado na Prática

Página estática para brasileiros estudarem frases comuns em inglês por situações reais de comunicação.

## Objetivo

O projeto reúne frases revisadas com tradução natural, pronúncia aproximada, áudio, fala conectada, palavras fortes, dicas de pronúncia, favoritos, progresso, modo de estudo, diálogos e observações culturais.

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
js/speech.js               Integração com speechSynthesis.
js/storage.js              Favoritos e progresso no localStorage.
```

## Estado atual

```text
63 frases
7 diálogos
9 categorias
sem backend
sem autenticação
sem dependências externas
```

## Limitações

- O áudio depende das vozes instaladas no navegador.
- A pronúncia em português é aproximada.
- O áudio deve ser a referência principal.
- O conteúdo será expandido gradualmente.
- Ainda não existe build automatizado.
- Não há testes automatizados formais.

## Próximos passos

- Expansão gradual de conteúdo.
- Revisão linguística por ciclo.
- Novos módulos.
- Melhoria futura do modo de estudo.
