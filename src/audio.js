import audioLibrary from './data/audio-library.json';

const normalizeSpeechText = (value) => String(value || '')
  .normalize('NFKC')
  .toLowerCase()
  .replace(/[’']/g, "'")
  .replace(/[^a-z0-9]+/g, ' ')
  .trim()
  .replace(/\s+/g, ' ');

let archivePromise;
const urls = new Map();

async function getArchiveFiles() {
  if (!archivePromise) {
    archivePromise = (async () => {
      const response = await fetch('https://www.dropbox.com/scl/fi/ubjspjkyxzm18a3ex0ebb/Lingoza-Audio-Unit-1..zip?rlkey=ewr4qs95jc0umja2coxbfdmnh&st=wwbnvvhg&dl=1');
      if (!response.ok) throw new Error('Audio archive unavailable');
      const buffer = await response.arrayBuffer();
      const bytes = new Uint8Array(buffer);
      const view = new DataView(buffer);
      const decoder = new TextDecoder();
      let end = -1;
      for (let i = bytes.length - 22; i >= Math.max(0, bytes.length - 65557); i--) {
        if (view.getUint32(i, true) === 0x06054b50) { end = i; break; }
      }
      if (end < 0) throw new Error('Invalid ZIP');
      const count = view.getUint16(end + 10, true);
      let offset = view.getUint32(end + 16, true);
      const files = new Map();
      for (let n = 0; n < count; n++) {
        if (view.getUint32(offset, true) !== 0x02014b50) break;
        const method = view.getUint16(offset + 10, true);
        const size = view.getUint32(offset + 20, true);
        const nameLength = view.getUint16(offset + 28, true);
        const extraLength = view.getUint16(offset + 30, true);
        const commentLength = view.getUint16(offset + 32, true);
        const local = view.getUint32(offset + 42, true);
        const name = decoder.decode(bytes.slice(offset + 46, offset + 46 + nameLength));
        const localName = view.getUint16(local + 26, true);
        const localExtra = view.getUint16(local + 28, true);
        const start = local + 30 + localName + localExtra;
        const packed = bytes.slice(start, start + size);
        if (name.toLowerCase().endsWith('.mp3')) {
          let data = packed;
          if (method === 8) {
            const stream = new Blob([packed]).stream().pipeThrough(new DecompressionStream('deflate-raw'));
            data = new Uint8Array(await new Response(stream).arrayBuffer());
          }
          files.set(name.split('/').pop(), URL.createObjectURL(new Blob([data], { type: 'audio/mpeg' })));
        }
        offset += 46 + nameLength + extraLength + commentLength;
      }
      return files;
    })().catch((error) => { archivePromise = null; throw error; });
  }
  return archivePromise;
}

async function findRecording(text) {
  const filename = audioLibrary.recordings?.[normalizeSpeechText(text)];
  if (!filename) return null;
  if (urls.has(filename)) return urls.get(filename);
  const files = await getArchiveFiles();
  const url = files.get(filename) || null;
  if (url) urls.set(filename, url);
  return url;
}

export async function playLingozaRecording(value) {
  if (!value || typeof window === 'undefined') return false;
  try {
    const url = await findRecording(value);
    if (!url) return false;
    window.speechSynthesis?.cancel();
    const player = new Audio(url);
    player.preload = 'auto';
    await player.play();
    return true;
  } catch {
    return false;
  }
}

export function speakLingoza(value, { lang = 'en-US', rate = 0.86, pitch = 1, volume = 1 } = {}) {
  if (!value || typeof window === 'undefined') return;
  findRecording(value).then((url) => {
    if (url) {
      window.speechSynthesis?.cancel();
      const player = new Audio(url);
      player.preload = 'auto';
      player.play().catch(() => speakFallback(value, { lang, rate, pitch, volume }));
    } else speakFallback(value, { lang, rate, pitch, volume });
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
