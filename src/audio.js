import audioLibrary from './data/audio-library.json';

const ARCHIVE_URLS = [
  'https://dl.dropboxusercontent.com/scl/fi/ubjspjkyxzm18a3ex0ebb/Lingoza-Audio-Unit-1..zip?rlkey=ewr4qs95jc0umja2coxbfdmnh&st=wwbnvvhg&dl=1',
  'https://dl.dropboxusercontent.com/scl/fi/mav51u8jb5qkupr36vw0c/0.zip?rlkey=o7w0wvivzo2hr460yrwp6yxhb&st=935t3i7a&dl=1'
];

const normalizeSpeechText = (value) => String(value || '')
  .normalize('NFKC')
  .toLowerCase()
  .replace(/[’']/g, "'")
  .replace(/[^a-z0-9]+/g, ' ')
  .trim()
  .replace(/\s+/g, ' ');

let archivePromise;
const urls = new Map();

async function parseZipArchive(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Audio archive request failed: ${response.status}`);

  const buffer = await response.arrayBuffer();
  if (buffer.byteLength < 22) throw new Error('Audio archive is empty or invalid');

  const bytes = new Uint8Array(buffer);
  const view = new DataView(buffer);
  const decoder = new TextDecoder();
  let end = -1;

  for (let i = bytes.length - 22; i >= Math.max(0, bytes.length - 65557); i--) {
    if (view.getUint32(i, true) === 0x06054b50) {
      end = i;
      break;
    }
  }
  if (end < 0) throw new Error('ZIP end record not found');

  const count = view.getUint16(end + 10, true);
  let offset = view.getUint32(end + 16, true);
  const files = new Map();

  for (let n = 0; n < count; n++) {
    if (offset + 46 > bytes.length || view.getUint32(offset, true) !== 0x02014b50) {
      throw new Error('Invalid ZIP directory entry');
    }

    const method = view.getUint16(offset + 10, true);
    const size = view.getUint32(offset + 20, true);
    const nameLength = view.getUint16(offset + 28, true);
    const extraLength = view.getUint16(offset + 30, true);
    const commentLength = view.getUint16(offset + 32, true);
    const local = view.getUint32(offset + 42, true);
    const name = decoder.decode(bytes.slice(offset + 46, offset + 46 + nameLength));
    const filename = name.split('/').pop();

    if (filename && filename.toLowerCase().endsWith('.mp3')) {
      if (local + 30 > bytes.length || view.getUint32(local, true) !== 0x04034b50) {
        throw new Error(`Invalid ZIP file header: ${filename}`);
      }

      const localName = view.getUint16(local + 26, true);
      const localExtra = view.getUint16(local + 28, true);
      const start = local + 30 + localName + localExtra;
      const packed = bytes.slice(start, start + size);
      if (packed.length !== size) throw new Error(`Truncated audio file: ${filename}`);

      let data;
      if (method === 0) {
        data = packed;
      } else if (method === 8 && typeof DecompressionStream !== 'undefined') {
        const stream = new Blob([packed]).stream().pipeThrough(
          new DecompressionStream('deflate-raw')
        );
        data = new Uint8Array(await new Response(stream).arrayBuffer());
      } else {
        throw new Error(`Unsupported ZIP compression method ${method}`);
      }

      files.set(filename, URL.createObjectURL(new Blob([data], { type: 'audio/mpeg' })));
    }

    offset += 46 + nameLength + extraLength + commentLength;
  }

  if (!files.size) throw new Error('No MP3 recordings found in archive');
  return files;
}

async function getArchiveFiles() {
  if (!archivePromise) {
    archivePromise = (async () => {
      const results = await Promise.allSettled(ARCHIVE_URLS.map(parseZipArchive));
      const merged = new Map();
      const failures = [];

      for (const result of results) {
        if (result.status === 'fulfilled') {
          for (const [name, url] of result.value) {
            if (!merged.has(name)) merged.set(name, url);
          }
        } else {
          failures.push(result.reason);
        }
      }

      if (!merged.size) {
        throw new Error(
          'Unable to load pronunciation archives: ' +
          failures.map((error) => error?.message || String(error)).join('; ')
        );
      }

      return merged;
    })().catch((error) => {
      archivePromise = null;
      console.error('[Lingoza audio] Could not load recording archives:', error);
      throw error;
    });
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
  } catch (error) {
    console.warn('[Lingoza audio] Recording playback failed:', error);
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
      player.play().catch((error) => {
        console.warn('[Lingoza audio] MP3 playback failed; using speech fallback:', error);
        speakFallback(value, { lang, rate, pitch, volume });
      });
    } else {
      speakFallback(value, { lang, rate, pitch, volume });
    }
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
