import audioLibrary from './data/audio-library.json';

const normalizeSpeechText = (value) => String(value || '')
  .normalize('NFKC')
  .toLowerCase()
  .replace(/[’']/g, "'")
  .replace(/[^a-z0-9]+/g, ' ')
  .trim()
  .replace(/\s+/g, ' ');

let archivePromise = null;
const objectUrls = new Map();

async function loadArchive() {
  if (archivePromise) return archivePromise;
  archivePromise = (async () => {
    const response = await fetch(audioLibrary.archiveUrl, { mode: 'cors', credentials: 'omit' });
    if (!response.ok) throw new Error('Audio archive could not be loaded');
    const buffer = await response.arrayBuffer();
    const view = new DataView(buffer);
    const bytes = new Uint8Array(buffer);
    const decoder = new TextDecoder();
    let end = -1;
    const min = Math.max(0, bytes.length - 65557);
    for (let i = bytes.length - 22; i >= min; i--) {
      if (view.getUint32(i, true) === 0x06054b50) { end = i; break; }
    }
    if (end < 0) throw new Error('Invalid audio archive');
    const count = view.getUint16(end + 10, true);
    let cursor = view.getUint32(end + 16, true);
    const files = new Map();
    for (let i = 0; i < count; i++) {
      if (view.getUint32(cursor, true) !== 0x02014b50) break;
      const method = view.getUint16(cursor + 10, true);
      const compressedSize = view.getUint32(cursor + 20, true);
      const nameLength = view.getUint16(cursor + 28, true);
      const extraLength = view.getUint16(cursor + 30, true);
      const commentLength = view.getUint16(cursor + 32, true);
      const localOffset = view.getUint32(cursor + 42, true);
      const filename = decoder.decode(bytes.slice(cursor + 46, cursor + 46 + nameLength));
      const localNameLength = view.getUint16(localOffset + 26, true);
      const localExtraLength = view.getUint16(localOffset + 28, true);
      const dataStart = localOffset + 30 + localNameLength + localExtraLength;
      const compressed = bytes.slice(dataStart, dataStart + compressedSize);
      if (filename.toLowerCase().endsWith('.mp3')) {
        let audioBytes;
        if (method === 0) audioBytes = compressed;
        else if (method === 8 && typeof DecompressionStream !== 'undefined') {
          const stream = new Blob([compressed]).stream().pipeThrough(new DecompressionStream('deflate-raw'));
          audioBytes = new Uint8Array(await new Response(stream).arrayBuffer());
        } else throw new Error('Unsupported audio archive compression');
        files.set(filename.split('/').pop(), URL.createObjectURL(new Blob([audioBytes], { type: 'audio/mpeg' })));
      }
      cursor += 46 + nameLength + extraLength + commentLength;
    }
    if (!files.size) throw new Error('No MP3 recordings found in archive');
    return files;
  })().catch((error) => {
    archivePromise = null;
    throw error;
  });
  return archivePromise;
}

async function recordingUrlFor(value) {
  const key = normalizeSpeechText(value);
  const filename = audioLibrary.recordings?.[key];
  if (!filename) return null;
  if (objectUrls.has(filename)) return objectUrls.get(filename);
  const files = await loadArchive();
  const url = files.get(filename);
  if (url) objectUrls.set(filename, url);
  return url || null;
}

export async function playLingozaRecording(value) {
  if (!value || typeof window === 'undefined') return false;
  try {
    const path = await recordingUrlFor(value);
    if (!path) return false;
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
  recordingUrlFor(value).then((path) => {
    if (!path) return speakFallback(value, { lang, rate, pitch, volume });
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    const player = new Audio(path);
    player.preload = 'auto';
    player.play().catch(() => speakFallback(value, { lang, rate, pitch, volume }));
  }).catch(() => speakFallback(value, { lang, rate, pitch, volume }));
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
