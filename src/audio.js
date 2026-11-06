import audioLibrary from './data/audio-library.json';

const normalizeSpeechText = (value) => String(value || '')
  .normalize('NFKC')
  .toLowerCase()
  .replace(/[’']/g, "'")
  .replace(/[^a-z0-9]+/g, ' ')
  .trim()
  .replace(/\s+/g, ' ');

const recordingPathFor = (value) => {
  const key = normalizeSpeechText(value);
  const filename = audioLibrary.recordings?.[key];
  return filename ? `${import.meta.env.BASE_URL}audio/library/${filename}` : null;
};

export async function playLingozaRecording(value) {
  if (!value || typeof window === 'undefined') return false;
  const path = recordingPathFor(value);
  if (!path) return false;
  try {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    const player = new Audio(path);
    player.preload = 'auto';
    await player.play();
    return true;
  } catch {
    return false;
  }
}

export function speakLingoza(value, { lang = 'en-US', rate = 0.86, pitch = 1, volume = 1 } = {}) {
  if (!value || typeof window === 'undefined') return;
  const path = recordingPathFor(value);
  if (path) {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    const player = new Audio(path);
    player.preload = 'auto';
    player.play().catch(() => speakFallback(value, { lang, rate, pitch, volume }));
    return;
  }
  speakFallback(value, { lang, rate, pitch, volume });
}

function speakFallback(value, { lang, rate, pitch, volume }) {
  if (!('speechSynthesis' in window) || typeof SpeechSynthesisUtterance === 'undefined') return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(value);
  utterance.lang = lang;
  utterance.rate = rate;
  utterance.pitch = pitch;
  utterance.volume = volume;
  window.speechSynthesis.speak(utterance);
}
