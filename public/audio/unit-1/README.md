# Lingoza shared pronunciation library

This folder is reserved for the shared pronunciation library used throughout the app—not a Unit 1-only asset folder.

- The shared player is in `src/audio.js`.
- The global phrase-to-file mapping is in `src/data/audio-library.json`.
- Lessons, conversations, listening exercises and reviews now use the same player.
- Matching ignores capitalization and punctuation differences while preserving the full phrase.
- If a recording is not available or cannot play, browser speech synthesis remains the fallback.
- Correct/incorrect answer sounds and other game effects remain separate.

The recording files still need a binary-safe upload step before the custom voice can play. Once hosted, add their paths or URLs to the shared manifest; do not add them to a unit-specific folder.
