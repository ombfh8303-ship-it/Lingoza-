import React, { useMemo, useState } from 'react';
import unitData from './data/unit-1.json';
import { ArrowLeft, BookOpen, Check, Headphones, LockKeyhole, Volume2, X } from 'lucide-react';

const PROGRESS_KEY = 'lingoza-independent-unit-1-lessons';
const TEST_KEY = 'lingoza-independent-unit-1-test';
const readArray = (key) => { try { const value = JSON.parse(localStorage.getItem(key) || '[]'); return Array.isArray(value) ? value : []; } catch { return []; } };
const speak = (value) => {
  if (!value || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(value);
  utterance.lang = unitData.tts_lang || 'en-US';
  utterance.rate = 0.88;
  window.speechSynthesis.speak(utterance);
};
const normalizeExercise = (item) => ({
  ...item,
  prompt: item.prompt_ar || '',
  answerIndex: Number.isInteger(item.answer) ? item.answer : 0
});

export default function IndependentUnit({ rtl = true, onEarnXp, onUnitComplete }) {
  const [completed, setCompleted] = useState(() => readArray(PROGRESS_KEY));
  const [testPassed, setTestPassed] = useState(() => localStorage.getItem(TEST_KEY) === 'passed');
  const [activeLesson, setActiveLesson] = useState(null);
  const [phase, setPhase] = useState('vocabulary');
  const [contentIndex, setContentIndex] = useState(0);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [checked, setChecked] = useState(false);
  const [order, setOrder] = useState([]);
  const [matchLeft, setMatchLeft] = useState(null);
  const [matches, setMatches] = useState([]);
  const [testMode, setTestMode] = useState(false);
  const [testIndex, setTestIndex] = useState(0);
  const [testScore, setTestScore] = useState(0);
  const [testDone, setTestDone] = useState(false);

  const exercises = testMode
    ? unitData.unit_test.questions.map(normalizeExercise)
    : (activeLesson?.exercises || []).map(normalizeExercise);
  const current = exercises[exerciseIndex];
  const vocabulary = activeLesson?.vocabulary || [];
  const phrases = activeLesson?.phrases || [];
  const mistakes = activeLesson?.common_mistakes || [];
  const isLastExercise = exerciseIndex === exercises.length - 1;
  const isCorrect = current?.type === 'word_order'
    ? order.join(' ') === (current.answer || []).join(' ')
    : current?.type === 'match'
      ? matches.length === (current.pairs || []).length
      : selected === current?.answerIndex;
  const percent = Math.round(completed.length / unitData.lessons.length * 100);
  const unitComplete = completed.length === unitData.lessons.length;

  const resetExercise = () => { setSelected(null); setChecked(false); setOrder([]); setMatchLeft(null); setMatches([]); };
  const beginLesson = (lesson) => {
    setActiveLesson(lesson); setTestMode(false); setPhase('vocabulary'); setContentIndex(0); setExerciseIndex(0); resetExercise();
  };
  const closeLesson = () => { setActiveLesson(null); setTestMode(false); setTestDone(false); resetExercise(); };
  const finishLesson = () => {
    if (!completed.includes(activeLesson.id)) {
      const next = [...completed, activeLesson.id];
      setCompleted(next); localStorage.setItem(PROGRESS_KEY, JSON.stringify(next));
      onEarnXp?.(unitData.xp_per_lesson || 30);
    }
    closeLesson();
  };
  const beginTest = () => {
    setTestMode(true); setActiveLesson(null); setPhase('exercises'); setTestIndex(0); setTestScore(0); setTestDone(false); setExerciseIndex(0); resetExercise();
  };
  const chooseOption = (index) => { if (!checked) setSelected(index); };
  const submit = () => {
    if (!checked) { setChecked(true); return; }
    if (testMode) {
      const score = testScore + (isCorrect ? 1 : 0);
      setTestScore(score);
      if (isLastExercise) {
        setTestDone(true);
        if (score / exercises.length * 100 >= unitData.unit_test.pass_score_percent && !testPassed) {
          setTestPassed(true); localStorage.setItem(TEST_KEY, 'passed'); onEarnXp?.(unitData.unit_test.xp || 50); onUnitComplete?.();
        }
      } else { setExerciseIndex(v => v + 1); resetExercise(); }
      return;
    }
    if (!isCorrect) { resetExercise(); return; }
    if (isLastExercise) { goPhase('speaking'); return; }
    setExerciseIndex(v => v + 1); resetExercise();
  };
  const selectMatchRight = (index) => {
    if (matchLeft === null || matches.includes(matchLeft)) return;
    const pair = current.pairs[matchLeft];
    if (pair.ar === current.pairs[index].ar) {
      const next = [...matches, matchLeft];
      setMatches(next); setMatchLeft(null);
      if (next.length === current.pairs.length) setChecked(true);
    } else { setMatchLeft(null); }
  };
  const beginSpeaking = () => { setPhase('speaking'); setContentIndex(0); };
  const phases = ['vocabulary', 'phrases', 'mistakes', 'exercises', 'speaking'];
  const phaseLabels = rtl ? ['المفردات', 'العبارات', 'أخطاء شائعة', 'التدريبات', 'التحدث'] : ['Vocabulary', 'Phrases', 'Common mistakes', 'Exercises', 'Speaking'];
  const phaseIndex = phases.indexOf(phase);
  const goPhase = (nextPhase) => { setPhase(nextPhase); setContentIndex(0); setExerciseIndex(0); resetExercise(); };
  const lessonContent = phase === 'vocabulary' ? vocabulary : phase === 'phrases' ? phrases : mistakes;
  const activeContent = lessonContent[contentIndex];

  const renderExercise = () => {
    if (!current) return null;
    if (current.type === 'match') return <div className="iu-match-grid">
      <div><small>{rtl ? 'الإنجليزية' : 'English'}</small>{current.pairs.map((pair,i)=><button key={i} disabled={matches.includes(i)} className={matchLeft===i?'selected':''} onClick={()=>setMatchLeft(i)} dir="ltr">{pair.en}</button>)}</div>
      <div><small>{rtl ? 'المعنى' : 'Meaning'}</small>{current.pairs.map((pair,i)=><button key={i} disabled={matches.includes(i)} onClick={()=>selectMatchRight(i)}>{pair.ar}</button>)}</div>
      <p>{rtl ? 'اختر عبارة ثم معناها المطابق.' : 'Choose a phrase, then its matching meaning.'} · {matches.length}/{current.pairs.length}</p>
    </div>;
    if (current.type === 'word_order') return <div className="iu-order">
      <div className="iu-answer-order" dir="ltr">{order.map((word,i)=><button key={i} onClick={()=>!checked&&setOrder(v=>v.filter((_,j)=>j!==i))}>{word}</button>)}</div>
      <div className="iu-word-bank" dir="ltr">{(current.words||[]).map((word,i)=><button key={i} disabled={order.filter(x=>x===word).length >= (current.words||[]).filter(x=>x===word).length} onClick={()=>!checked&&setOrder(v=>[...v,word])}>{word}</button>)}</div>
    </div>;
    const options = current.options || [];
    return <div className="iu-options">
      {current.type === 'listening' && <button className="iu-listen" onClick={()=>speak(current.audio_text)}><Volume2 size={19}/>{rtl?'استمع إلى العبارة':'Play audio'}</button>}
      {current.sentence && <p className="iu-sentence" dir="ltr">{current.sentence}</p>}
      {options.map((option,i)=><button key={i} dir={/[A-Za-z]/.test(option)?'ltr':'rtl'} className={'iu-option '+(selected===i?'selected':'')+(checked&&i===current.answerIndex?' correct':'')+(checked&&selected===i&&i!==current.answerIndex?' wrong':'')} onClick={()=>chooseOption(i)}>{option}</button>)}
    </div>;
  };

  const activeIndex = unitData.lessons.findIndex(lesson => !completed.includes(lesson.id));
  const lessonKinds = rtl ? ['مفردات','قواعد','استماع','تحدث','مراجعة'] : ['Vocabulary','Grammar','Listening','Speaking','Review'];
  return <section className="iu-unit iu-reference-style">
    <div className="iu-reference-heading">
      <div className="iu-reference-title"><small>{rtl?'الوحدة الأولى · أساسيات المحادثة':'UNIT 01 · CONVERSATION BASICS'}</small><h3>{rtl?unitData.title_ar:unitData.title_en}</h3></div>
      <b className="iu-reference-count">{completed.length}/{unitData.lessons.length}</b>
      <div className="iu-reference-track"><i style={{width:percent+'%'}}/></div>
    </div>
    <div className="iu-reference-lessons">{unitData.lessons.map((lesson,index)=>{
      const done=completed.includes(lesson.id);
      const available=done||index===activeIndex||testPassed;
      const category=lessonKinds[index]|| (rtl?'درس':'Lesson');
      return <article className={'iu-reference-lesson '+(done?'is-done ':'')+(available&&!done?'is-active ':'')+(!available?'is-locked ':'')+(index%2?'offset':'')} key={lesson.id}>
        <button className="iu-reference-status" disabled={!available} onClick={()=>beginLesson(lesson)} aria-label={done?(rtl?'إعادة الدرس':'Review lesson'):(rtl?'ابدأ الدرس':'Start lesson')}>
          {done?<Check size={27}/>:available?<span className="iu-play-mark"/>:<LockKeyhole size={24}/>}
        </button>
        <div className="iu-reference-copy">
          <div className="iu-reference-meta"><span className={'iu-reference-kind kind-'+index}>{category}</span><small>XP {index===2?'25':index===3?'30':'20'}+</small></div>
          <h4>{rtl?lesson.title_ar:lesson.title_en}</h4>
          {!done&&available&&<div className="iu-reference-mini-track"><i/></div>}
        </div>
      </article>;
    })}</div>
    <div className="iu-test-card iu-reference-test"><div><small>{rtl?'الاختبار النهائي':'FINAL ASSESSMENT'}</small><h3>{rtl?unitData.unit_test.title_ar:'Unit test'}</h3><p>{rtl?'أكمل الدروس الخمسة لفتح الاختبار. درجة النجاح 70٪.':'Complete all five lessons to unlock the test. Pass mark: 70%.'}</p></div><button disabled={!unitComplete} onClick={beginTest}>{testPassed?(rtl?'إعادة الاختبار':'Retake test'):(rtl?'ابدأ الاختبار':'Start test')} {unitComplete?'':'🔒'}</button></div>

    {(activeLesson || testMode) && <div className="iu-overlay"><section className="iu-modal" dir={rtl?'rtl':'ltr'}>
      <header><div><small>{testMode?(rtl?'اختبار الوحدة':'UNIT TEST'):(rtl?'الوحدة الأولى · الدرس':'UNIT 1 · LESSON')}</small><h2>{testMode?(rtl?unitData.unit_test.title_ar:'Unit test'):(rtl?activeLesson.title_ar:activeLesson.title_en)}</h2></div><button className="iu-close" onClick={closeLesson}><X size={20}/></button></header>
      {!testMode && <><div className="iu-tabs">{phaseLabels.map((label,i)=><button key={label} className={phaseIndex===i?'active':''} onClick={()=>goPhase(phases[i])}>{String(i+1).padStart(2,'0')} · {label}</button>)}</div>
      {phase==='vocabulary' && activeContent && <div className="iu-content-card"><div className="iu-card-counter">{contentIndex+1} / {vocabulary.length}</div><h3 dir="ltr">{activeContent.en}</h3><strong>{activeContent.ar}</strong><p>{rtl?'النطق التقريبي: ': 'Pronunciation: '}{activeContent.pron_ar}</p><div className="iu-example"><button onClick={()=>speak(activeContent.example_en)}><Volume2 size={17}/></button><b dir="ltr">{activeContent.example_en}</b><span>{activeContent.example_ar}</span></div><footer><button disabled={contentIndex===0} onClick={()=>setContentIndex(v=>v-1)}>{rtl?'السابق':'Previous'}</button><button onClick={()=>contentIndex===vocabulary.length-1?goPhase('phrases'):setContentIndex(v=>v+1)}>{rtl?'التالي':'Next'}<ArrowLeft size={15}/></button></footer></div>}
      {phase==='phrases' && activeContent && <div className="iu-content-card"><div className="iu-card-counter">{contentIndex+1} / {phrases.length}</div><h3 dir="ltr">{activeContent.en}</h3><strong>{activeContent.ar}</strong><button className="iu-listen" onClick={()=>speak(activeContent.en)}><Volume2 size={18}/>{rtl?'استمع للنطق':'Listen'}</button><footer><button disabled={contentIndex===0} onClick={()=>setContentIndex(v=>v-1)}>{rtl?'السابق':'Previous'}</button><button onClick={()=>contentIndex===phrases.length-1?goPhase('mistakes'):setContentIndex(v=>v+1)}>{rtl?'التالي':'Next'}<ArrowLeft size={15}/></button></footer></div>}
      {phase==='mistakes' && activeContent && <div className="iu-content-card"><div className="iu-card-counter">{contentIndex+1} / {mistakes.length}</div><div className="iu-mistake"><span>{rtl?'❌ الخطأ الشائع':'❌ Common mistake'}</span><b dir="ltr">{activeContent.wrong}</b><span>{rtl?'✅ الصحيح':'✅ Correct form'}</span><b dir="ltr">{activeContent.right}</b><p>{activeContent.explain_ar}</p></div><footer><button disabled={contentIndex===0} onClick={()=>setContentIndex(v=>v-1)}>{rtl?'السابق':'Previous'}</button><button onClick={()=>contentIndex===mistakes.length-1?goPhase('exercises'):setContentIndex(v=>v+1)}>{rtl?'التالي':'Next'}<ArrowLeft size={15}/></button></footer></div>}
      {phase==='exercises' && <div className="iu-content-card"><div className="iu-card-counter">{exerciseIndex+1} / {exercises.length}</div><h3>{current?.prompt}</h3>{current?.audio_text && <p className="iu-audio-hint">{rtl?'استمع ثم اختر المعنى':'Listen, then choose the meaning'}</p>}{renderExercise()}{checked && <div className={'iu-feedback '+(isCorrect?'good':'bad')}>{isCorrect?(rtl?'إجابة صحيحة، أحسنت!':'Correct! Well done.'):(rtl?'ليست صحيحة، حاول مرة أخرى.':'Not quite. Try again.')}</div>}{!checked && current?.type==='match' && matches.length===current.pairs.length && <div className="iu-feedback good">{rtl?'اكتملت المطابقة!':'All pairs matched!'}</div>}<button className="iu-primary" disabled={current?.type==='match'?matches.length!==current.pairs.length:current?.type==='word_order'?order.length!==(current.answer||[]).length:selected===null} onClick={submit}>{!checked?(rtl?'تحقق من الإجابة':'Check answer'):(isCorrect?(isLastExercise?(testMode?(rtl?'إنهاء الاختبار':'Finish test'):(rtl?'إنهاء الدرس':'Finish lesson')):(rtl?'التالي':'Next')):(rtl?'حاول مجدداً':'Try again'))}<ArrowLeft size={17}/></button></div>}
      {phase==='speaking' && <div className="iu-content-card"><h3>{activeLesson.speaking.prompt_ar}</h3>{activeLesson.speaking.repeat.map((line,i)=><div className="iu-speaking-line" key={i}><span dir="ltr">{line}</span><button onClick={()=>speak(line)}><Volume2 size={18}/></button></div>)}<button className="iu-primary" onClick={finishLesson}>{rtl?'إنهاء الدرس · +30 XP':'Complete lesson · +30 XP'}<Check size={17}/></button></div>}
      </>}
      {testMode && !testDone && <div className="iu-content-card"><div className="iu-card-counter">{exerciseIndex+1} / {exercises.length}</div><h3>{current?.prompt}</h3>{current?.audio_text && <p className="iu-audio-hint">{rtl?'استمع ثم اختر المعنى':'Listen, then choose the meaning'}</p>}{renderExercise()}{checked && <div className={'iu-feedback '+(isCorrect?'good':'bad')}>{isCorrect?(rtl?'إجابة صحيحة، أحسنت!':'Correct! Well done.'):(rtl?'ليست صحيحة، حاول مرة أخرى.':'Not quite. Try again.')}</div>}<button className="iu-primary" disabled={current?.type==='match'?matches.length!==current.pairs.length:current?.type==='word_order'?order.length!==(current.answer||[]).length:selected===null} onClick={submit}>{!checked?(rtl?'تحقق من الإجابة':'Check answer'):(isCorrect?(isLastExercise?(rtl?'إنهاء الاختبار':'Finish test'):(rtl?'التالي':'Next')):(rtl?'حاول مجدداً':'Try again'))}<ArrowLeft size={17}/></button></div>}
      {testMode && testDone && <div className="iu-content-card iu-test-result"><div className="iu-test-score">{Math.round(testScore/exercises.length*100)}%</div><h3>{testScore/exercises.length*100>=unitData.unit_test.pass_score_percent?(rtl?'اجتزت اختبار الوحدة!':'Unit test passed!'):(rtl?'حاول مرة أخرى':'Try again')}</h3><p>{testScore} / {exercises.length} {rtl?'إجابات صحيحة':'correct answers'}</p><button className="iu-primary" onClick={closeLesson}>{rtl?'العودة إلى الوحدة':'Back to unit'}<ArrowLeft size={17}/></button></div>}
    </section></div>}
  </section>;
}
