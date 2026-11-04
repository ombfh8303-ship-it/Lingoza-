# Lingoza Audio Library

This directory contains reviewed, reusable listening audio. The app checks a curated MP3 first and uses device text-to-speech only as a temporary fallback.

## Storage convention
- Deployed assets live under `public/audio/`; Vite publishes them under the app base URL.
- English US: `public/audio/en/`
- English UK (future): `public/audio/en-gb/`
- French legacy support: `public/audio/fr/`
- Filename: lowercase ASCII slug + `.mp3`, derived from the spoken phrase using the current player normalization.
- Keep lossless WAV masters outside the deployed web assets, and preserve source and licensing details.
- Never commit empty or fake MP3s.

## Quality standard
- Choose one consistent, natural English voice for the pilot (recommend General American); clearly label alternate accents.
- Speech only: no music or effects. Natural cadence, deliberate but not exaggerated enunciation.
- Clean recording, minimal room echo/noise, no clipping/plosives, consistent perceived loudness.
- Keep phrase clips short and dialogues as separate speaker turns; also provide a full-dialogue clip when useful.
- Master: WAV, mono, 44.1/48 kHz, 24-bit PCM. Archive it outside deploy assets.
- Delivery: MP3, mono, 44.1 kHz, 128–192 kbps; target true peak at or below -1 dBTP. Keep consistent loudness between assets.
- Listen to each exported file on a normal phone speaker and headphones.

## Pilot: At the Restaurant (English / US)
Suggested scripts; not recordings and not approved audio yet:
- `what-would-you-like.mp3` — “What would you like?”
- `id-like-a-burger-please.mp3` — “I'd like a burger, please.”
- `anything-to-drink.mp3` — “Anything to drink?”
- `a-glass-of-water-please.mp3` — “A glass of water, please.”
- `sorry-were-out-of-burgers.mp3` — “Sorry, we're out of burgers.”
- `could-i-have-the-bill-please.mp3` — “Could I have the bill, please?”
- `restaurant-pilot-dialogue.mp3` — Waiter/customer dialogue, with natural turn-taking and pauses.

Important: current app playback uses normalized spoken text as the filename. Check each intended filename against the exact string in `audioText` before adding it; punctuation can affect the normalized slug.

## Approval checklist
- [ ] Learning script and accepted transcript reviewed
- [ ] English variety, speaker identity, creator/provider, and creation date recorded
- [ ] Commercial/redistribution rights documented
- [ ] Transcript matches the actual spoken recording
- [ ] Pronunciation, endings, names, pauses, noise, loudness, and clipping checked
- [ ] Export checked on phone speaker and headphones
- [ ] Asset filename matches the current player's expected path
- [ ] Audio is not revealing answer text before the learner's attempt
- [ ] Deployed GitHub Pages playback tested
- [ ] Reviewer and approval date recorded in the catalog

## Catalog
`manifest.json` is an editorial tracking proposal. The current app does not read it yet; adding a manifest-driven player is a separate integration task and must preserve current playback fallback behavior.

**Status:** audio delivery path and playback fallback exist. Professional custom recordings have not yet been supplied or approved.
