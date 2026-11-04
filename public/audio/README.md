# Lingoza Audio Library

This folder is the home for reviewed, reusable listening audio. The app checks for a matching curated MP3 first and uses device text-to-speech only as a temporary fallback.

## Asset conventions

- English (US): public/audio/en/
- English (UK), if added later: public/audio/en-gb/
- French: public/audio/fr/
- File name: lowercase ASCII phrase slug + .mp3 (e.g. what-would-you-like.mp3)
- Keep a lossless WAV master outside the deployed app/library archive, and retain source/licensing details.
- Do not commit empty or fake audio files. Add an asset only after listening review and pronunciation approval.

## Recording / generation standard

1. Use one consistent, natural native-quality voice per course path; no exaggerated announcer delivery.
2. Record each dialogue line separately, plus a full-dialogue version when useful.
3. Target clean speech with no music/effects, minimal room noise, natural pauses, consistent loudness, and no clipping.
4. Export mono MP3, 44.1 kHz, 128–192 kbps (or equivalent high-quality speech export). Preserve WAV masters.
5. Review on a phone speaker and headphones. Check names, contractions, word endings, pacing, and intelligibility.
6. Keep script, voice/provider, license/usage permission, generation date, and reviewer in an audio manifest before publishing.
7. Avoid over-slow synthetic speech as the only sample. Offer a slower practice variant later while preserving natural pronunciation.

## Pilot unit: At the Restaurant (English / US)

Pilot dialogue authored for learning goals; final editorial/audio review is required before recording:

- what-would-you-like.mp3 — “What would you like?”
- id-like-a-burger-please.mp3 — “I'd like a burger, please.”
- anything-to-drink.mp3 — “Anything to drink?”
- a-glass-of-water-please.mp3 — “A glass of water, please.”
- sorry-were-out-of-burgers.mp3 — “Sorry, we're out of burgers.”
- could-i-have-the-bill-please.mp3 — “Could I have the bill, please?”
- restaurant-pilot-dialogue.mp3 — Waiter/customer dialogue with natural turn-taking and pauses.

## Publishing checklist

- [ ] Script and accepted transcript reviewed
- [ ] English variety and voice identity recorded
- [ ] Rights/usage permission verified
- [ ] File names and paths match the app
- [ ] Playback reviewed on mobile
- [ ] Listening prompt does not reveal transcript before the attempt
- [ ] Transcript and translation revealed after the attempt
- [ ] Audio tested in deployed Pages build

**Current status:** Playback support is prepared. Professional recorded/generated audio assets have not been added yet.
