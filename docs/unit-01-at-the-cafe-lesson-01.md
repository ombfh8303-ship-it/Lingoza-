# Lingoza — Unit: At the Café
## Course structure

**Unit (الوحدة):** At the Café — في المقهى  
**Level:** A1 / Beginner  
**Purpose:** Learner can order one drink and one snack politely, understand one follow-up question, and finish a simple interaction.  
**Unit is not one lesson.** It contains a sequence of short lessons that build toward the unit mission.

### Unit map
1. **Lesson 1 — Make your first order** (4–6 min): order one drink politely.
2. Lesson 2 — Choose size and options: small/large, with/without ice.
3. Lesson 3 — Add food and answer “Anything else?”
4. Lesson 4 — Understand the price and pay.
5. Lesson 5 — Café mission: complete the order from greeting to thanks.

This file fully specifies Lesson 1 as the pilot. Later lessons should reuse its interaction pattern, not duplicate its exact questions.

---

# Lesson 1: Make your first order
**Arabic title:** اطلب طلبك الأول  
**Duration target:** 4–6 minutes  
**Outcome:** By the end, learner can say: “Can I have a coffee, please?” and understand “Here you are.”  
**Target language (small, focused set):**
- Hi / Hello. — مرحباً.
- Can I have a coffee, please? — ممكن قهوة، لو سمحت؟
- A tea, please. — شاي، لو سمحت.
- Anything else? — هل تريد شيئاً آخر؟
- No, thanks. — لا، شكراً.
- Here you are. — تفضل.
- Thank you. — شكراً.

**Teaching principle:** Teach one usable speaking goal first. Keep Arabic instructions supportive, while keeping English in the interaction. Do not introduce pricing, sizes, milk choices, or complex food quantities in this first lesson.

## Screen 1 — Mission intro
Illustration: a friendly counter, barista, clear menu with three items only: Coffee, Tea, Orange juice. Customer is the learner's role.
- Label: UNIT 01 · AT THE CAFÉ
- Heading: Your first café order
- Arabic: مهمتك: اطلب مشروباً باللغة الإنجليزية.
- Goal chip: “Can I have …, please?”
- Main CTA: ابدأ المهمة
- Duration: 4–6 minutes
- Avoid large paragraphs or extra navigation clutter.

## Screen 2 — Hear the phrase in context
Show barista speech bubble:
**Barista:** Hi! What would you like?
**Customer:** Can I have a coffee, please?
**Barista:** Sure. Here you are.
**Customer:** Thank you.

Provide individual replay buttons beside each English line; speaking line should be heard at a comfortable volume, with no automatic overlapping audio. If recordings are not yet available, use the current TTS voice as a clearly temporary fallback. Add a “اسمع الحوار كاملاً” action.
Short Arabic tip: “Can I have …, please?” طريقة مهذبة لطلب شيء.
CTA: جرّب بنفسك

## Screen 3 — Build the order
Task: complete the request by tapping one word tile.
Prompt: “Can I have a ___, please?”
Tiles: coffee / thank / from
After selection:
- Correct: green friendly bubble “ممتاز! coffee هي المشروب المطلوب.” Play success sound, then offer Continue.
- Incorrect: calm hint “اختر اسم مشروب. جرّب مرة ثانية.” Explain the clue without marking a wrong choice as success.
Support keyboard-accessible/tap targets. Do not require drag gestures.

## Screen 4 — Understand the barista
Prompt audio: “Anything else?”
Arabic question: ماذا يقصد الباريستا؟
Options:
A. هل تريد شيئاً آخر؟ **Correct**
B. ما اسمك؟
C. أين تسكن؟
After answer, show the phrase and meaning. Allow replay.
Learning note: You can answer “No, thanks.” when you don’t need anything else.

## Screen 5 — Conversation choice (branching)
Barista: “Hi! What would you like?”
Choices:
- “Can I have a tea, please?” → natural, appropriate. Continue to next barista line.
- “I’m from Jordan.” → friendly retry. Feedback: هذه معلومة عن بلدك، لكنها لا تجيب عن سؤال الطلب.
- “Good night!” → retry. Feedback: هذه ليست إجابة لطلب المشروب.
On correct:
Barista: “Sure. Anything else?”
Learner chooses:
- “No, thanks.” → continue
- “My name is Lina.” → brief explanation + retry
Barista: “Here you are.”
Learner selects the meaning: “تفضل.”
End exchange: learner taps “Thank you.”
Provide concise reinforcement, not long dialogue exposition.

## Screen 6 — Mini speaking rehearsal
Display cue cards, not a long form:
“Can I have a ___, please?”
Selectable item: coffee / tea / orange juice.
Button: 🔊 اسمع
Button: 🎙️ تدرّب على النطق (only if reliable browser speech recognition is supported; otherwise label as repeat-after-audio and do not pretend the app scored pronunciation).
Learner says/repeats chosen phrase. Optional skip; no blocking gate.

## Screen 7 — Quick check (3 varied questions)
1. Choose the polite order: “Can I have a coffee, please?” / “Give coffee.” / “I from coffee.”
2. Match: “Here you are.” → “تفضل.”
3. What can you say after “Anything else?” when finished? → “No, thanks.”
Each question one attempt plus a gentle retry; save wrong items to Review. The earlier guided steps do the teaching, so avoid a long redundant quiz.

## Completion
- Celebrate: “طلبك الأول صار جاهز! ☕”
- State achievement in plain language: “أصبحت تعرف كيف تطلب مشروباً بأدب.”
- Show one useful phrase with replay: “Can I have a coffee, please?”
- CTA: “أكمل الوحدة” / next lesson unlocks.
- Award completion XP once only; replay must not farm XP.
- Record mastery separately from completion: the learner may finish with a retry and still advance, but weak phrases enter Review.
- No penalty hearts, forced countdown, or shame language.

## Mobile UX and accessibility
- Keep the lesson in the available viewport whenever practical, with responsive compact spacing.
- If content or keyboard exceeds viewport, allow one predictable page scroll rather than clipping controls; never hide the action button.
- Minimum tap targets ~44 px; readable line height; avoid nested scroll regions.
- English phrases LTR isolated inside Arabic RTL layout.
- Respect reduced-motion setting. Use brief motion and a success bubble only for positive feedback.
- Sound: honor device mute and offer replay; audio must not overlap. Do not claim volume is universally loud; provide optional in-app sound toggle/level later.
- Progress should indicate current stage and remaining steps without misleading percentages.

## Content QA checklist
- Each interaction has one defensible best answer.
- Arabic translations are natural and beginner-friendly.
- English examples remain grammatically natural.
- Every incorrect choice gives a meaningful clue.
- Every audio prompt has visible replay and equivalent readable support after answer.
- Check persistence, XP once-only, lesson unlock, review errors, mobile viewport, dark/light themes, RTL/LTR.
