# Lingoza shared pronunciation library

This is the shared pronunciation library for the whole app—not a Unit 1-only asset folder.

- MP3 files are stored in `public/audio/library/`.
- Exact normalized spoken-text keys and filenames are mapped in `src/data/audio-library.json`.
- The shared player in `src/audio.js` is used by lessons, conversations, listening exercises, reviews and other speaking controls.
- Text matching ignores letter case and punctuation differences, while keeping the complete phrase intact.
- If a phrase has no matching recording, or the recording cannot play, the browser speech voice remains the fallback.
- Correct/incorrect answers, clicks, combo and celebration effects remain separate from pronunciation audio.

Add future recordings to this folder and add their spoken-text key to the shared manifest. Any component using the shared player can then use the new recording automatically.
