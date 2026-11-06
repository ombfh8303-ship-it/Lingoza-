# Unit 1 pronunciation recordings

This folder is reserved for **human-recorded American English, female-voice** pronunciation assets.

## Recording specification
- Accent/locale: en-US (General American)
- Voice: adult female voice, clear and warm
- Delivery: natural, learner-friendly pace; do not exaggerate individual sounds
- Master: WAV, 48 kHz, 24-bit, mono
- Delivery: MP3, 192 kbps CBR (or high-quality 160 kbps+), mono
- Keep clean room tone; no music, sound effects, reverb, or background noise
- Record each vocabulary item and sentence as a separate file; leave a short clean lead-in and tail

## File and manifest convention
1. Put the final MP3 files in this folder, for example `hello.mp3` or `good-morning.mp3`.
2. Add an exact spoken-text key to `src/data/unit-1-audio.json` under `recordings`.
3. Set its value to the public URL path, for example `/audio/unit-1/hello.mp3`.
4. Keep punctuation and wording in the key identical to the text passed by the lesson.

The lesson player checks this manifest first. If a recording is not listed or cannot be played, it falls back to the browser's en-US speech synthesis. Game feedback sounds (correct, wrong, combo, click) remain on their separate Web Audio channel and are not mixed into pronunciation files.

**Status:** playback infrastructure and manifest are prepared; actual studio recordings have not yet been supplied or added.
