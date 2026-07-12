let voices = [];
let activeButton = null;
let voicesReady = false;
let playbackGeneration = 0;

export function isSpeechSupported() {
  return "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
}

export function loadVoices() {
  if (!isSpeechSupported()) return Promise.resolve([]);

  const synth = window.speechSynthesis;
  voices = synth.getVoices();
  if (voices.length) {
    voicesReady = true;
    return Promise.resolve(voices);
  }

  return new Promise((resolve) => {
    const timeout = window.setTimeout(() => {
      voices = synth.getVoices();
      voicesReady = true;
      resolve(voices);
    }, 800);

    synth.onvoiceschanged = () => {
      window.clearTimeout(timeout);
      voices = synth.getVoices();
      voicesReady = true;
      resolve(voices);
    };
  });
}

function findEnglishVoice() {
  const englishVoices = voices.filter((voice) => voice.lang.toLowerCase().startsWith("en"));
  return (
    englishVoices.find((voice) => voice.lang.toLowerCase() === "en-us") ||
    englishVoices.find((voice) => voice.lang.toLowerCase().includes("us")) ||
    englishVoices[0] ||
    null
  );
}

function setButtonPlaying(button, isPlaying) {
  if (!button) return;
  button.classList.toggle("is-playing", isPlaying);
  button.setAttribute("aria-pressed", String(isPlaying));
}

export async function speak(text, options = {}) {
  if (!isSpeechSupported()) {
    return { ok: false, message: "Seu navegador não oferece suporte a áudio por fala." };
  }

  playbackGeneration += 1;
  const currentGeneration = playbackGeneration;

  if (!voicesReady) {
    await loadVoices();
  }

  if (currentGeneration !== playbackGeneration) {
    return { ok: false, message: "" };
  }

  const synth = window.speechSynthesis;
  synth.cancel();
  setButtonPlaying(activeButton, false);

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = options.rate || 1;
  utterance.pitch = 1;
  utterance.voice = findEnglishVoice();

  activeButton = options.button || null;
  setButtonPlaying(activeButton, true);

  const clearCurrentPlayback = () => {
    if (currentGeneration !== playbackGeneration) return;
    setButtonPlaying(activeButton, false);
    activeButton = null;
  };

  utterance.onend = () => {
    clearCurrentPlayback();
  };

  utterance.onerror = (event) => {
    clearCurrentPlayback();
    if (typeof options.onError === "function" && currentGeneration === playbackGeneration) {
      options.onError(event);
    }
  };

  try {
    synth.speak(utterance);
    return { ok: true };
  } catch (error) {
    clearCurrentPlayback();
    return { ok: false, message: "Não foi possível iniciar o áudio agora.", error };
  }
}

export function stopSpeech() {
  if (!isSpeechSupported()) return;
  playbackGeneration += 1;
  window.speechSynthesis.cancel();
  setButtonPlaying(activeButton, false);
  activeButton = null;
}
