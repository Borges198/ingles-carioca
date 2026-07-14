import { phrases, categories } from "./data/phrases.js";
import { dialogues } from "./data/dialogues.js";
import { courseLevels } from "./data/lessons.js";
import { reconcileStoredIds, toggleFavorite, toggleStudied } from "./js/storage.js";
import { isSpeechSupported, loadVoices, speak, stopSpeech } from "./js/speech.js";

const reconciledStorage = reconcileStoredIds(phrases.map((phrase) => phrase.id));
const phraseById = new Map(phrases.map((phrase) => [phrase.id, phrase]));
const dialogueById = new Map(dialogues.map((dialogue) => [dialogue.id, dialogue]));
const quickPracticeStartMessage =
  "Escolha uma pesquisa, categoria ou status para começar a prática.";

const state = {
  query: "",
  category: "Todas",
  studyFilter: "all",
  favorites: reconciledStorage.favorites,
  studied: reconciledStorage.studied,
  expanded: new Set(),
  hiddenTranslations: new Set(),
  dialogueTranslations: new Set(),
  studyModeOpen: false,
  activeCourseLessonId: null,
  lastCourseLessonTrigger: null,
  studyIndex: 0,
  studyTranslationVisible: false,
  lastStudyTrigger: null
};

const els = {
  search: document.querySelector("#search-input"),
  category: document.querySelector("#category-filter"),
  studyFilter: document.querySelector("#study-filter"),
  courseLevels: document.querySelector("#course-levels"),
  courseLessonPanel: document.querySelector("#course-lesson-panel"),
  phraseList: document.querySelector("#phrases-list"),
  dialogueList: document.querySelector("#dialogue-list"),
  resultsMessage: document.querySelector("#results-message"),
  audioStatus: document.querySelector("#audio-status"),
  studiedCount: document.querySelector("#studied-count"),
  totalCount: document.querySelector("#total-count"),
  progressPercent: document.querySelector("#progress-percent"),
  favoriteCount: document.querySelector("#favorite-count"),
  studyMode: document.querySelector("#study-mode"),
  studyCard: document.querySelector("#study-card"),
  openStudyMode: document.querySelector("#open-study-mode"),
  closeStudyMode: document.querySelector("#close-study-mode")
};

function reportStorageResult(result) {
  if (result.ok) {
    els.audioStatus.textContent = "";
    return;
  }

  els.audioStatus.textContent =
    "Não foi possível salvar no navegador agora. A página continua funcionando nesta sessão.";
}

function normalize(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function createButton(text, className, onClick, ariaLabel) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = className || "button";
  button.textContent = text;
  if (ariaLabel) button.setAttribute("aria-label", ariaLabel);
  button.addEventListener("click", onClick);
  return button;
}

function buildSearchText(phrase) {
  return normalize(
    [
      phrase.english,
      phrase.portuguese,
      phrase.naturalMeaning,
      phrase.category,
      phrase.situation,
      phrase.tags.join(" ")
    ].join(" ")
  );
}

function hasActiveQuickPracticeCriteria() {
  return (
    state.query.trim() !== "" ||
    state.category !== "Todas" ||
    state.studyFilter !== "all"
  );
}

function getFilteredPhrases() {
  const query = normalize(state.query.trim());

  return phrases.filter((phrase) => {
    const matchesQuery = !query || buildSearchText(phrase).includes(query);
    const matchesCategory = state.category === "Todas" || phrase.category === state.category;
    const isFavorite = state.favorites.has(phrase.id);
    const isStudied = state.studied.has(phrase.id);

    let matchesStudy = true;
    if (state.studyFilter === "unstudied") matchesStudy = !isStudied;
    if (state.studyFilter === "studied") matchesStudy = isStudied;
    if (state.studyFilter === "favorites") matchesStudy = isFavorite;

    return matchesQuery && matchesCategory && matchesStudy;
  });
}

function getQuickPracticePhrases() {
  if (!hasActiveQuickPracticeCriteria()) return [];
  return getFilteredPhrases();
}

function updateStudyModeButton(filtered) {
  const canOpenStudyMode = hasActiveQuickPracticeCriteria() && filtered.length > 0;
  els.openStudyMode.disabled = !canOpenStudyMode;
  els.openStudyMode.setAttribute("aria-disabled", String(!canOpenStudyMode));
  els.openStudyMode.title = canOpenStudyMode
    ? "Abrir modo de estudo com as frases filtradas"
    : "Escolha uma pesquisa, categoria ou status com resultados para abrir o modo de estudo";

  if (!canOpenStudyMode && state.studyModeOpen) {
    state.studyModeOpen = false;
    state.studyTranslationVisible = false;
  }
}

function updateProgress() {
  const studiedTotal = phrases.filter((phrase) => state.studied.has(phrase.id)).length;
  const favoriteTotal = phrases.filter((phrase) => state.favorites.has(phrase.id)).length;
  const percent = phrases.length ? Math.round((studiedTotal / phrases.length) * 100) : 0;

  els.studiedCount.textContent = String(studiedTotal);
  els.totalCount.textContent = String(phrases.length);
  els.progressPercent.textContent = `${percent}%`;
  els.favoriteCount.textContent = String(favoriteTotal);
}

function renderCategoryOptions() {
  const allOption = document.createElement("option");
  allOption.value = "Todas";
  allOption.textContent = "Todas";
  els.category.append(allOption);

  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    els.category.append(option);
  });
}

function findLessonById(lessonId) {
  for (const level of courseLevels) {
    const lesson = level.lessons.find((item) => item.id === lessonId);
    if (lesson) return { level, lesson };
  }

  return null;
}

function renderCourseCatalog() {
  els.courseLevels.replaceChildren();

  courseLevels.forEach((level) => {
    const section = createElement("section", "course-level");
    section.setAttribute("aria-labelledby", `course-level-${level.id}`);

    const header = createElement("div", "course-level-header");
    const title = createElement("h3", "", level.title);
    title.id = `course-level-${level.id}`;
    header.append(title, createElement("p", "", level.description));
    section.append(header);

    const lessons = createElement("div", "lesson-grid");
    level.lessons.forEach((lesson) => {
      const card = createElement("article", "lesson-card");
      const openButton = createButton(
        "Abrir aula",
        "secondary-button lesson-open-button",
        (event) => openCourseLesson(lesson.id, event.currentTarget),
        `Abrir aula ${lesson.order}: ${lesson.title}`
      );
      card.append(
        createElement("p", "lesson-order", `Aula ${lesson.order}`),
        createElement("h4", "lesson-title", lesson.title),
        createElement("p", "lesson-objective", lesson.objective),
        createElement(
          "p",
          "lesson-meta",
          `${lesson.phraseIds.length} frases · ${lesson.dialogueIds.length} diálogos`
        ),
        openButton
      );
      lessons.append(card);
    });

    section.append(lessons);
    els.courseLevels.append(section);
  });
}

function openCourseLesson(lessonId, trigger) {
  if (state.activeCourseLessonId && state.activeCourseLessonId !== lessonId) {
    stopSpeech();
  }

  state.activeCourseLessonId = lessonId;
  state.lastCourseLessonTrigger = trigger;
  renderCourseLesson();
  els.courseLessonPanel.hidden = false;
  els.courseLessonPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  document.querySelector("#course-lesson-title").focus({ preventScroll: true });
}

function closeCourseLesson() {
  stopSpeech();
  state.activeCourseLessonId = null;
  els.courseLessonPanel.hidden = true;
  els.courseLessonPanel.replaceChildren();

  if (state.lastCourseLessonTrigger) {
    state.lastCourseLessonTrigger.focus();
  }
}

function renderCourseLesson() {
  const match = findLessonById(state.activeCourseLessonId);
  els.courseLessonPanel.replaceChildren();

  if (!match) {
    console.warn("Aula do curso guiado não encontrada.", state.activeCourseLessonId);
    return;
  }

  const { lesson } = match;
  const header = createElement("div", "course-lesson-header");
  const titleGroup = createElement("div");
  const title = createElement("h3", "", lesson.title);
  title.id = "course-lesson-title";
  title.tabIndex = -1;
  titleGroup.append(
    createElement("p", "lesson-order", `Aula ${lesson.order}`),
    title,
    createElement("p", "lesson-objective", lesson.objective),
    createElement(
      "p",
      "lesson-meta",
      `${lesson.phraseIds.length} frases · ${lesson.dialogueIds.length} diálogos`
    )
  );
  header.append(
    titleGroup,
    createButton("Fechar aula", "ghost-button", closeCourseLesson, `Fechar aula ${lesson.title}`)
  );

  const phraseSection = createElement("section", "lesson-content-section");
  phraseSection.append(createElement("h4", "lesson-section-title", "Frases da aula"));
  const phraseList = createElement("div", "lesson-phrase-list");
  lesson.phraseIds.forEach((phraseId) => {
    const phrase = phraseById.get(phraseId);
    if (!phrase) {
      console.warn("Frase do curso guiado não encontrada.", phraseId);
      return;
    }
    phraseList.append(renderLessonPhrase(phrase));
  });
  phraseSection.append(phraseList);

  const dialogueSection = createElement("section", "lesson-content-section");
  dialogueSection.append(createElement("h4", "lesson-section-title", "Diálogos da aula"));
  const dialogueList = createElement("div", "lesson-dialogue-list");
  lesson.dialogueIds.forEach((dialogueId) => {
    const dialogue = dialogueById.get(dialogueId);
    if (!dialogue) {
      console.warn("Diálogo do curso guiado não encontrado.", dialogueId);
      return;
    }
    dialogueList.append(renderLessonDialogue(dialogue));
  });
  dialogueSection.append(dialogueList);

  els.courseLessonPanel.append(header, phraseSection, dialogueSection);
}

function renderLessonPhrase(phrase) {
  const article = createElement("article", "lesson-phrase-card");
  article.append(
    createElement("p", "phrase-english", phrase.english),
    createElement("p", "translation", phrase.portuguese),
    createElement("p", "study-pronunciation", phrase.pronunciationPtBr),
    createAudioControls(phrase.english)
  );
  return article;
}

function renderLessonDialogue(dialogue) {
  const article = createElement("article", "lesson-dialogue-card");
  article.append(createElement("h5", "lesson-dialogue-title", dialogue.title));

  if (dialogue.context) {
    article.append(createElement("p", "dialogue-translation", dialogue.context));
  }

  const lines = createElement("div", "lesson-dialogue-lines");
  dialogue.lines.forEach((line) => {
    const item = createElement("div", "lesson-dialogue-line");
    const textGroup = createElement("div");
    textGroup.append(
      createElement("strong", "", line.speaker),
      createElement("p", "dialogue-english", line.english)
    );

    if (line.portuguese) {
      textGroup.append(createElement("p", "dialogue-translation", line.portuguese));
    }

    item.append(textGroup);
    lines.append(item);
  });

  article.append(lines);
  return article;
}

async function playText(text, rate, button) {
  const result = await speak(text, {
    rate,
    button,
    onError: () => {
      els.audioStatus.textContent = "Não foi possível concluir o áudio agora.";
    }
  });

  if (result.message) {
    els.audioStatus.textContent = result.ok ? "" : result.message;
  }
}

function createAudioControls(text) {
  const wrapper = createElement("div", "button-row");
  wrapper.append(
    createButton("Ouvir normal", "secondary-button", (event) => {
      playText(text, 1, event.currentTarget);
    }, `Ouvir em velocidade normal: ${text}`),
    createButton("Ouvir devagar", "secondary-button", (event) => {
      playText(text, 0.6, event.currentTarget);
    }, `Ouvir devagar: ${text}`)
  );
  return wrapper;
}

function createTag(text, modifier) {
  const tag = createElement("span", `tag ${modifier || ""}`.trim(), text);
  return tag;
}

function createStressedWords(phrase) {
  const wrapper = createElement("p", "stressed-words");
  phrase.english.split(" ").forEach((word, index) => {
    const clean = word.replace(/[^a-z']/gi, "").toLowerCase();
    const isStressed = phrase.stressedWords.some((item) => item.toLowerCase() === clean);
    const span = createElement("span", isStressed ? "word-strong" : "", word);
    wrapper.append(span);
    if (index < phrase.english.split(" ").length - 1) {
      wrapper.append(document.createTextNode(" "));
    }
  });
  return wrapper;
}

function createPhraseCard(phrase) {
  const isFavorite = state.favorites.has(phrase.id);
  const isStudied = state.studied.has(phrase.id);
  const isExpanded = state.expanded.has(phrase.id);
  const isTranslationHidden = state.hiddenTranslations.has(phrase.id);

  const article = createElement("article", "phrase-card");
  article.dataset.id = phrase.id;

  const header = createElement("div", "phrase-header");
  const titleGroup = createElement("div");
  titleGroup.append(
    createElement("p", "phrase-english", phrase.english),
    createElement("p", "phrase-situation", phrase.situation)
  );

  const badges = createElement("div", "tag-row");
  badges.append(
    createTag(phrase.category),
    createTag(phrase.difficulty, "tag-muted"),
    createTag(phrase.usage, phrase.usage === "essential" ? "tag-strong" : "tag-muted")
  );
  titleGroup.append(badges);

  const status = createElement("div", "card-status");
  status.append(
    createTag(isFavorite ? "Favorita" : "Não favorita", isFavorite ? "tag-favorite" : "tag-muted"),
    createTag(isStudied ? "Estudada" : "Não estudada", isStudied ? "tag-studied" : "tag-muted")
  );

  header.append(titleGroup, status);
  article.append(header);

  const translation = createElement(
    "p",
    `translation ${isTranslationHidden ? "is-hidden" : ""}`.trim(),
    isTranslationHidden ? "Tradução oculta para prática." : phrase.portuguese
  );
  article.append(translation);

  const controls = createElement("div", "card-actions");
  controls.append(
    ...createAudioControls(phrase.english).childNodes,
    createButton(
      isFavorite ? "Remover favorito" : "Favoritar",
      "secondary-button",
      () => {
        const update = toggleFavorite(phrase.id, state.favorites);
        state.favorites = update.values;
        reportStorageResult(update.result);
        render();
      },
      `${isFavorite ? "Remover dos" : "Adicionar aos"} favoritos`
    ),
    createButton(
      isStudied ? "Marcar como não estudada" : "Estudei esta frase",
      "secondary-button",
      () => {
        const update = toggleStudied(phrase.id, state.studied);
        state.studied = update.values;
        reportStorageResult(update.result);
        render();
      }
    ),
    createButton(
      isTranslationHidden ? "Mostrar tradução" : "Ocultar tradução",
      "secondary-button",
      () => {
        if (state.hiddenTranslations.has(phrase.id)) {
          state.hiddenTranslations.delete(phrase.id);
        } else {
          state.hiddenTranslations.add(phrase.id);
        }
        render();
      }
    )
  );
  article.append(controls);

  const expandButton = createButton(
    isExpanded ? "Ocultar pronúncia e contexto" : "Ver pronúncia e contexto",
    "expand-button",
    () => {
      if (state.expanded.has(phrase.id)) {
        state.expanded.delete(phrase.id);
      } else {
        state.expanded.add(phrase.id);
      }
      render();
    }
  );
  const detailsId = `phrase-details-${phrase.id}`;
  expandButton.setAttribute("aria-expanded", String(isExpanded));
  expandButton.setAttribute("aria-controls", detailsId);
  article.append(expandButton);

  const details = createElement("div", "phrase-details");
  details.id = detailsId;
  details.hidden = !isExpanded;

  const rows = [
    ["Pronúncia aproximada", phrase.pronunciationPtBr],
    ["Fala conectada", phrase.connectedSpeech],
    ["Dica de pronúncia", phrase.pronunciationTip],
    ["Resposta possível", phrase.exampleResponse],
    ["Tradução da resposta", phrase.responseTranslation]
  ];

  rows.forEach(([label, value]) => {
    const row = createElement("div", "detail-row");
    row.append(createElement("strong", "", label), createElement("p", "", value));
    details.append(row);
  });

  const stressRow = createElement("div", "detail-row");
  stressRow.append(createElement("strong", "", "Palavras fortes"), createStressedWords(phrase));
  details.append(stressRow);

  if (phrase.naturalMeaning) {
    const meaningRow = createElement("div", "detail-row");
    meaningRow.append(createElement("strong", "", "Sentido natural"), createElement("p", "", phrase.naturalMeaning));
    details.append(meaningRow);
  }

  if (typeof phrase.notes === "string" && phrase.notes.trim()) {
    const notesRow = createElement("div", "detail-row");
    notesRow.append(createElement("strong", "", "Observação de uso"), createElement("p", "", phrase.notes));
    details.append(notesRow);
  }

  article.append(details);

  return article;
}

function renderPhrases() {
  const hasCriteria = hasActiveQuickPracticeCriteria();
  const filtered = getQuickPracticePhrases();
  els.phraseList.replaceChildren();
  updateStudyModeButton(filtered);

  if (!hasCriteria) {
    els.resultsMessage.textContent = "";
    els.phraseList.append(createElement("p", "empty-state", quickPracticeStartMessage));
    return;
  }

  els.resultsMessage.textContent = `${filtered.length} de ${phrases.length} frases encontradas.`;

  if (!filtered.length) {
    const empty = createElement("p", "empty-state", "Nenhuma frase encontrada com os filtros atuais.");
    els.phraseList.append(empty);
    return;
  }

  filtered.forEach((phrase) => {
    els.phraseList.append(createPhraseCard(phrase));
  });
}

function renderDialogues() {
  els.dialogueList.replaceChildren();

  dialogues.forEach((dialogue) => {
    const article = createElement("article", "dialogue-card");
    const isVisible = state.dialogueTranslations.has(dialogue.id);

    const header = createElement("div", "dialogue-header");
    const titleGroup = createElement("div");
    titleGroup.append(createElement("h3", "", dialogue.title), createElement("p", "", dialogue.context));
    const toggle = createButton(
      isVisible ? "Ocultar traduções" : "Mostrar traduções",
      "secondary-button",
      () => {
        if (state.dialogueTranslations.has(dialogue.id)) {
          state.dialogueTranslations.delete(dialogue.id);
        } else {
          state.dialogueTranslations.add(dialogue.id);
        }
        renderDialogues();
      }
    );
    header.append(titleGroup, toggle);
    article.append(header);

    const lines = createElement("div", "dialogue-lines");
    dialogue.lines.forEach((line) => {
      const item = createElement("div", "dialogue-line");
      const textGroup = createElement("div");
      textGroup.append(createElement("strong", "", line.speaker), createElement("p", "dialogue-english", line.english));
      if (isVisible) {
        textGroup.append(createElement("p", "dialogue-translation", line.portuguese));
      }
      item.append(
        textGroup,
        createButton("Ouvir", "secondary-button compact", (event) => {
          playText(line.english, 1, event.currentTarget);
        }, `Ouvir fala de ${line.speaker}`)
      );
      lines.append(item);
    });
    article.append(lines);
    els.dialogueList.append(article);
  });
}

function getStudyPhrases() {
  return getQuickPracticePhrases();
}

function renderStudyMode() {
  els.studyMode.hidden = !state.studyModeOpen;
  els.studyCard.replaceChildren();
  if (!state.studyModeOpen) return;

  const list = getStudyPhrases();
  if (!list.length) {
    els.studyMode.hidden = true;
    return;
  }

  if (state.studyIndex >= list.length) state.studyIndex = 0;
  if (state.studyIndex < 0) state.studyIndex = list.length - 1;

  const phrase = list[state.studyIndex];
  const isFavorite = state.favorites.has(phrase.id);
  const isStudied = state.studied.has(phrase.id);

  els.studyCard.append(
    createElement("p", "study-counter", `${state.studyIndex + 1} de ${list.length}`),
    createElement("h3", "study-phrase", phrase.english),
    createElement(
      "p",
      `translation ${state.studyTranslationVisible ? "" : "is-hidden"}`.trim(),
      state.studyTranslationVisible ? phrase.portuguese : "Tradução oculta para prática."
    ),
    createElement("p", "study-pronunciation", phrase.pronunciationPtBr)
  );

  const actions = createElement("div", "card-actions");
  actions.append(
    createButton("Anterior", "secondary-button", () => {
      state.studyIndex -= 1;
      state.studyTranslationVisible = false;
      renderStudyMode();
    }),
    createButton("Próxima frase", "secondary-button", () => {
      state.studyIndex += 1;
      state.studyTranslationVisible = false;
      renderStudyMode();
    }),
    ...createAudioControls(phrase.english).childNodes,
    createButton(
      state.studyTranslationVisible ? "Ocultar tradução" : "Mostrar tradução",
      "secondary-button",
      () => {
        state.studyTranslationVisible = !state.studyTranslationVisible;
        renderStudyMode();
      }
    ),
    createButton(isStudied ? "Estudada" : "Estudei esta frase", "secondary-button", () => {
      const update = toggleStudied(phrase.id, state.studied);
      state.studied = update.values;
      reportStorageResult(update.result);
      render();
    }),
    createButton(isFavorite ? "Favorita" : "Favoritar", "secondary-button", () => {
      const update = toggleFavorite(phrase.id, state.favorites);
      state.favorites = update.values;
      reportStorageResult(update.result);
      render();
    })
  );

  els.studyCard.append(actions);
}

function render() {
  updateProgress();
  renderPhrases();
  renderStudyMode();
}

function bindEvents() {
  els.search.addEventListener("input", (event) => {
    state.query = event.target.value;
    state.studyIndex = 0;
    render();
  });

  els.category.addEventListener("change", (event) => {
    state.category = event.target.value;
    state.studyIndex = 0;
    render();
  });

  els.studyFilter.addEventListener("change", (event) => {
    state.studyFilter = event.target.value;
    state.studyIndex = 0;
    render();
  });

  els.openStudyMode.addEventListener("click", (event) => {
    if (els.openStudyMode.disabled) return;
    state.lastStudyTrigger = event.currentTarget;
    state.studyModeOpen = true;
    state.studyTranslationVisible = false;
    renderStudyMode();
    els.studyMode.scrollIntoView({ behavior: "smooth", block: "start" });
    document.querySelector("#study-mode-title").focus({ preventScroll: true });
  });

  els.closeStudyMode.addEventListener("click", closeStudyMode);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && state.studyModeOpen) {
      closeStudyMode();
    }
  });
}

function closeStudyMode() {
  if (!state.studyModeOpen) return;

    state.studyModeOpen = false;
    stopSpeech();
    renderStudyMode();
    if (state.lastStudyTrigger) {
      state.lastStudyTrigger.focus();
    }
}

async function init() {
  renderCategoryOptions();
  renderCourseCatalog();
  bindEvents();
  render();
  renderDialogues();

  if (!isSpeechSupported()) {
    els.audioStatus.textContent = "Seu navegador não oferece suporte a áudio por fala. O restante da página funciona normalmente.";
  } else {
    await loadVoices();
  }
}

init();
