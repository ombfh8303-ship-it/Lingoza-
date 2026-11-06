import React, { useEffect, useMemo, useState } from 'react';
import defaultUnitData from './data/unit-1.json';
import unit1Audio from './data/unit-1-audio.json';
import { ArrowLeft, BookOpen, Check, Headphones, LockKeyhole, Volume2, X } from 'lucide-react';

const readArray = (key) => { try { const value = JSON.parse(localStorage.getItem(key) || '[]'); return Array.isArray(value) ? value : []; } catch { return []; } };
const speakFallback = (value, data = defaultUnitData) => {
  if (!value || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(value);
  utterance.lang = data.tts_lang || 'en-US';
  utterance.rate = 0.86;
  window.speechSynthesis.speak(utterance);
};

const playPronunciation = (value, data = defaultUnitData) => {
  if (!value || typeof window === 'undefined') return;
  const recordingPath = data.id === 'unit-1' ? unit1Audio.recordings?.[value] : null;
  if (!recordingPath) {
    speakFallback(value, data);
    return;
  }
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  const audio = new Audio(recordingPath);
  audio.preload = 'auto';
  audio.play().catch(() => speakFallback(value, data));
};

function UnitLulu({ mood = 'idle', action = 'none' }) {
  return <svg viewBox="0 0 180 220" className={"iu-lulu-art " + mood + " action-" + action} role="img" aria-label="لولو، ثعلب Lingoza">
    <defs>
      <linearGradient id="luluFur" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ffbd68"/><stop offset="1" stopColor="#e8792e"/></linearGradient>
      <linearGradient id="luluBelly" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff7e9"/><stop offset="1" stopColor="#f5dfc5"/></linearGradient>
      <radialGradient id="luluCheek"><stop stopColor="#ff9c91" stopOpacity=".85"/><stop offset="1" stopColor="#ff9c91" stopOpacity="0"/></radialGradient>
    </defs>
    <ellipse className="iu-lulu-shadow" cx="91" cy="207" rx="43" ry="7" fill="#245b43" opacity=".12"/>
    <g className="iu-lulu-tail"><path d="M119 153Q165 157 157 112Q181 140 158 173Q145 189 119 173Z" fill="url(#luluFur)" stroke="#a94e1c" strokeWidth="3.5"/><path d="M153 119Q168 143 151 161Q143 168 132 165Q151 150 153 119Z" fill="#fff2dc"/></g>
    <g className="iu-lulu-legs">
      <g className="iu-lulu-leg-left"><path d="M61 166Q57 185 53 197Q51 207 65 208L82 208Q91 205 83 195L83 166Z" fill="#df792f" stroke="#a94e1c" strokeWidth="3"/><ellipse cx="68" cy="204" rx="16" ry="7" fill="#fff0dd"/></g>
      <g className="iu-lulu-leg-right"><path d="M101 166Q103 185 105 197Q106 207 120 208L136 208Q144 204 134 195L122 165Z" fill="#df792f" stroke="#a94e1c" strokeWidth="3"/><ellipse cx="124" cy="204" rx="16" ry="7" fill="#fff0dd"/></g>
    </g>
    <path d="M53 119Q43 139 47 174Q49 190 90 191Q131 190 134 174Q137 139 126 119Z" fill="url(#luluFur)" stroke="#a94e1c" strokeWidth="3.5"/>
    <path d="M69 137Q90 127 111 137Q122 161 111 181Q90 192 69 181Q58 161 69 137Z" fill="url(#luluBelly)"/>
    <g className="iu-lulu-arms">
      <g className="iu-lulu-arm-left"><path d="M54 132Q36 139 31 161Q29 171 40 174Q49 174 53 158L66 146Z" fill="#ef9946" stroke="#a94e1c" strokeWidth="3.2"/><ellipse cx="37" cy="169" rx="9" ry="7" fill="#fff0dd"/></g>
      <g className="iu-lulu-arm-right"><path d="M126 132Q144 139 149 161Q151 171 140 174Q131 174 127 158L114 146Z" fill="#ef9946" stroke="#a94e1c" strokeWidth="3.2"/><ellipse cx="143" cy="169" rx="9" ry="7" fill="#fff0dd"/></g>
    </g>
    <g className="iu-lulu-head">
      <path d="M48 59Q33 39 27 9Q58 18 72 48Z" fill="url(#luluFur)" stroke="#a94e1c" strokeWidth="3.5"/><path d="M132 59Q147 39 153 9Q122 18 108 48Z" fill="url(#luluFur)" stroke="#a94e1c" strokeWidth="3.5"/>
      <path d="M42 35Q39 24 37 19Q52 27 61 48Z M138 35Q141 24 143 19Q128 27 119 48Z" fill="#f5a0a0"/>
      <ellipse cx="90" cy="82" rx="58" ry="54" fill="url(#luluFur)" stroke="#a94e1c" strokeWidth="3.5"/>
      <path d="M39 88Q49 62 73 72Q90 83 90 106Q66 119 47 104Z M141 88Q131 62 107 72Q90 83 90 106Q114 119 133 104Z" fill="#fff1df"/>
      <ellipse cx="61" cy="96" rx="16" ry="9" fill="url(#luluCheek)"/><ellipse cx="119" cy="96" rx="16" ry="9" fill="url(#luluCheek)"/>
      <g className="iu-lulu-eyes"><ellipse cx="69" cy="77" rx="5.7" ry="8.5" fill="#35251e"/><ellipse cx="111" cy="77" rx="5.7" ry="8.5" fill="#35251e"/><circle cx="71" cy="74" r="2" fill="#fff"/><circle cx="113" cy="74" r="2" fill="#fff"/></g>
      <path d="M82 96Q90 90 98 96Q96 104 90 105Q84 104 82 96Z" fill="#8c4a43"/>
      <path className="iu-lulu-mouth-smile" d="M80 109Q90 119 100 109" fill="none" stroke="#78402d" strokeWidth="3" strokeLinecap="round"/>
      <path className="iu-lulu-mouth-sad" d="M80 116Q90 106 100 116" fill="none" stroke="#78402d" strokeWidth="3" strokeLinecap="round"/>
      <ellipse className="iu-lulu-mouth-open" cx="90" cy="112" rx="7" ry="9" fill="#8f4435"/>
      <path className="iu-lulu-tear" d="M124 89Q136 105 124 111Q112 105 124 89Z" fill="#68c8ef"/>
      <path className="iu-lulu-brow" d="M57 62Q68 56 78 62M102 62Q112 56 123 62" fill="none" stroke="#a94e1c" strokeWidth="3" strokeLinecap="round"/>
    </g>
    <g className="iu-lulu-sparkles" fill="#ffc84d"><path d="M15 78 19 88 29 92 19 96 15 106 11 96 1 92 11 88Z"/><path d="M159 62 163 72 173 76 163 80 159 90 155 80 145 76 155 72Z"/><path d="M91 5 94 13 102 16 94 19 91 27 88 19 80 16 88 13Z"/></g>
    <g className="iu-lulu-hearts" fill="#f59a40"><path d="M19 123C8 113 1 126 19 140C37 126 30 113 19 123Z"/><path d="M160 119C149 109 142 122 160 136C178 122 171 109 160 119Z"/></g>
  </svg>;
}
const playUnitTone = (kind, enabled) => {
  if (!enabled || typeof window === 'undefined') return;
  try {
    const Audio = window.AudioContext || window.webkitAudioContext;
    if (!Audio) return;
    const ctx = new Audio();
    const notes = kind === 'wrong' ? [290,220] : kind === 'combo' || kind === 'success' ? [520,660,820,1040] : kind === 'click' ? [650] : [560,780];
    let at = ctx.currentTime + .02;
    const duration = kind === 'click' ? .055 : kind === 'combo' || kind === 'success' ? .22 : .12;
    notes.forEach(hz => { const osc=ctx.createOscillator(), gain=ctx.createGain(); osc.type='sine'; osc.frequency.setValueAtTime(hz,at); gain.gain.setValueAtTime(.0001,at); const volume = kind === 'wrong' ? .115 : kind === 'combo' || kind === 'success' ? .13 : kind === 'click' ? .022 : .125; gain.gain.exponentialRampToValueAtTime(volume,at+.025); gain.gain.exponentialRampToValueAtTime(.0001,at+duration); osc.connect(gain); gain.connect(ctx.destination); osc.start(at); osc.stop(at+duration+.01); at+=duration+.035; });
    window.setTimeout(()=>ctx.close().catch(()=>{}),1600);
  } catch {}
};

const renderMixedText = (value) => {
  if (typeof value !== 'string') return value;
  const parts = value.split(/\{\{([^{}]+)\}\}|([A-Za-z][A-Za-z0-9'’.-]*(?:\s+[A-Za-z][A-Za-z0-9'’.-]*)*)/g);
  return parts.map((part,index) => {
    if (part === undefined || part === '') return null;
    if (index % 3 === 1 || index % 3 === 2) return <bdi key={index} dir="ltr" className="iu-inline-en">{part}</bdi>;
    return part;
  });
};

const normalizeExercise = (item) => ({
  ...item,
  prompt: item.prompt_ar || '',
  answerIndex: Number.isInteger(item.answer) ? item.answer : 0
});

export default function IndependentUnit({ rtl = true, hearts = 5, onEarnXp, onUnitComplete, unitData: suppliedUnitData }) {
  const unitData = suppliedUnitData || defaultUnitData;
  const unitNumber = Number((unitData.id.match(/\d+/) || ['1'])[0]);
  const storageKeys = {
    progress: unitData.id === 'unit-1' ? 'lingoza-independent-unit-1-lessons' : `lingoza-independent-${unitData.id}-lessons`,
    test: unitData.id === 'unit-1' ? 'lingoza-independent-unit-1-test' : `lingoza-independent-${unitData.id}-test`,
    sound: unitData.id === 'unit-1' ? 'lingoza-unit1-sound' : `lingoza-${unitData.id}-sound`,
    vibration: unitData.id === 'unit-1' ? 'lingoza-unit1-vibration' : `lingoza-${unitData.id}-vibration`
  };
  const [completed, setCompleted] = useState(() => readArray(storageKeys.progress));
  const [testPassed, setTestPassed] = useState(() => localStorage.getItem(storageKeys.test) === 'passed');
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
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [firstTryCorrect, setFirstTryCorrect] = useState(0);
  const [lessonXpEarned, setLessonXpEarned] = useState(0);
  const [soundOn, setSoundOn] = useState(() => localStorage.getItem(storageKeys.sound) !== 'off');
  const [vibrationOn, setVibrationOn] = useState(() => localStorage.getItem(storageKeys.vibration) !== 'off');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [luluMood, setLuluMood] = useState('idle');
  const [luluAction, setLuluAction] = useState('none');
  const [comboMessage, setComboMessage] = useState('');
  const [luluMessage, setLuluMessage] = useState('هيا نبدأ مغامرتنا!');

  const exercises = testMode
    ? unitData.unit_test.questions.map(normalizeExercise)
    : (activeLesson?.exercises || []).map(normalizeExercise);
  const current = exercises[exerciseIndex];
  const shuffledMatch = useMemo(() => {
    if (current?.type !== 'match') return {left:[],right:[]};
    const shuffle = (values) => { const a=[...values]; for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; };
    const indexes=current.pairs.map((_,i)=>i); return {left:shuffle(indexes),right:shuffle(indexes)};
  },[current?.id]);
  const vocabulary = activeLesson?.vocabulary || [];
  const phrases = activeLesson?.phrases || [];
  const mistakes = activeLesson?.common_mistakes || [];
  const isLastExercise = exerciseIndex === exercises.length - 1;
  const isCorrect = current?.type === 'word_order'
    ? order.join(' ') === (current.answer || []).join(' ')
    : current?.type === 'match'
      ? matches.length === (current.pairs || []).length && matches.every(({left,right}) => current.pairs[left]?.ar === current.pairs[right]?.ar)
      : selected === current?.answerIndex;
  const percent = Math.round(completed.length / unitData.lessons.length * 100);
  const unitComplete = completed.length === unitData.lessons.length;

  useEffect(() => { if (luluMood === 'idle') return; const timer = window.setTimeout(() => setLuluMood('idle'), 1500); return () => window.clearTimeout(timer); }, [luluMood]);
  useEffect(() => {
    if ((!activeLesson && !testMode) || luluMood !== 'idle' || checked) { setLuluAction('none'); return; }
    let actionTimer, resetTimer;
    const actions = ['peek','wave','look','wiggle'];
    const tick = () => {
      const action = actions[Math.floor(Math.random() * actions.length)];
      setLuluAction(action);
      if (Math.random() < 0.62) setLuluMessage(chooseLuluLine('idle'));
      resetTimer = window.setTimeout(() => setLuluAction('none'), 1450);
      actionTimer = window.setTimeout(tick, 4200 + Math.random() * 3200);
    };
    actionTimer = window.setTimeout(tick, 2600 + Math.random() * 2400);
    return () => { window.clearTimeout(actionTimer); window.clearTimeout(resetTimer); };
  }, [activeLesson?.id, testMode, luluMood, checked]);
  const vibrate = (pattern) => { if (!vibrationOn || typeof navigator === 'undefined' || !navigator.vibrate) return; try { navigator.vibrate(pattern); } catch {} };
  const resetExercise = () => { setSelected(null); setChecked(false); setOrder([]); setMatchLeft(null); setMatches([]); };
  const chooseLuluLine = (kind) => {
    const lines={
      start:['أهلًا بك! هل أنت مستعد؟','لنبدأ خطوة خطوة، أنا معك!','هذه مغامرتنا الجديدة، هيا بنا!','جهّز تركيزك، لدينا إنجازات جميلة!','أنا متحمسة لنتعلم معًا!'],
      correct:['أحسنت! إجابة رائعة!','ممتاز! أنت تتقدم بسرعة!','رائع! لقد أتقنتها!','يا سلام على هذه الإجابة!','كل محاولة تجعلك أقوى!','أبدعت، استمر بهذا الحماس!'],
      wrong:['لا بأس، نتعلم من المحاولة!','اقتربت كثيرًا، جرّب مجددًا!','أنا معك، سننجح معًا!','الخطأ خطوة في طريق التعلم!','خذ نفسًا وفكّر، أنت تستطيع!','لا تستعجل، جرّب مرة أخرى!'],
      streak:['يا لك من نجم! استمر!','ثلاثة انتصارات وأكثر! مذهل!','أنت تتألق، واصل التقدم!','هذا تسلسل رائع!','حماسك معدٍ، هيا إلى التالي!','أصبحت سريع البديهة!'],
      finish:['أنهيتها ببراعة! أنا فخورة بك!','يا له من إنجاز رائع!','لقد أصبحت أقوى في الإنجليزية!','أكملت التحدي مثل الأبطال!','تستحق احتفالًا كبيرًا!'],
      idle:['هل نجرّب تحديًا جديدًا؟','أنا هنا أشجعك!','تركيزك رائع، واصل!','أحب فضولك في التعلم!','هيا، خطوة صغيرة أخرى!','هل لاحظت كم تعلمت؟','سأبقى بجانبك حتى تنجح!','لنمنح عقولنا تحديًا لطيفًا!'],
      thinking:['فكّر بهدوء، ستجد الإجابة!','تذكّر العبارة التي تعلمناها!','خذ وقتك، لا يوجد داعٍ للعجلة!','أنا أثق بقدرتك على التذكر!'],
      transition:['رائع، انتقلنا إلى خطوة جديدة!','مستعد للمحطة التالية؟','كل درس يضيف لك كلمة جديدة!','هيا نواصل رحلتنا!'],
      comboBreak:['لا بأس، ما زالت مغامرتنا مستمرة!','تعثر بسيط، والفرصة التالية أمامك!','أنا أشجعك، حاول من جديد!','التقدم أهم من الكمال!']
    };
    const pool=lines[kind]||lines.start; return pool[Math.floor(Math.random()*pool.length)];
  };
  const resolveFeedback = (correct) => {
    if (correct) {
      const next=combo+1; setCombo(next); setBestCombo(v=>Math.max(v,next));
      setLuluMood(next>=3?'fire':'cheer'); setLuluMessage(chooseLuluLine(next>=3?'streak':'correct')); playUnitTone(next>=3?'combo':'correct',soundOn);
      vibrate(next>=3?[40,40,40,40,90]:40);
      if(next>=3){ const lines=rtl?['أنت مشتعل! لا يوقفك أحد!','مذهل، استمر!','أداء رائع!']:['You are on fire!','Amazing, keep going!','Unstoppable!']; setComboMessage(lines[(next-3)%lines.length]); }
    } else {
      setCombo(0); setComboMessage(chooseLuluLine('comboBreak'));
      setLuluMood('sad'); setLuluMessage(chooseLuluLine('wrong')); playUnitTone('wrong',soundOn); vibrate([90,50,90]);
    }
  };
  const unlockAudio = () => { if (!soundOn) return; try { const Audio=window.AudioContext||window.webkitAudioContext; if(Audio){ const ctx=new Audio(); if(ctx.state==='suspended')ctx.resume(); ctx.close(); } } catch {} };
  const beginLesson = (lesson) => {
    setCombo(0); setBestCombo(0); setFirstTryCorrect(0); setLessonXpEarned(0); setComboMessage(''); setLuluMood('idle'); setLuluMessage(chooseLuluLine('start')); setActiveLesson(lesson); setTestMode(false); setPhase('vocabulary'); setContentIndex(0); setExerciseIndex(0); resetExercise();
  };
  const closeLesson = () => { setActiveLesson(null); setTestMode(false); setTestDone(false); resetExercise(); };
  const finishLesson = () => {
    playUnitTone('success',soundOn); vibrate([40,40,40,40,90]); setLuluMood('fire'); setLuluMessage(chooseLuluLine('finish'));
    const xpEarned = completed.includes(activeLesson.id) ? 0 : (unitData.xp_per_lesson || 30);
    setLessonXpEarned(xpEarned);
    if (!completed.includes(activeLesson.id)) {
      const next = [...completed, activeLesson.id];
      setCompleted(next); localStorage.setItem(storageKeys.progress, JSON.stringify(next));
      onEarnXp?.(xpEarned);
    }
    setPhase('complete');
  };
  const beginTest = () => {
    setCombo(0); setComboMessage(''); setLuluMood('idle'); setTestMode(true); setActiveLesson(null); setPhase('exercises'); setTestIndex(0); setTestScore(0); setTestDone(false); setExerciseIndex(0); resetExercise();
  };
  const chooseOption = (index) => { if (!checked) setSelected(index); };
  const submit = () => {
    if (!checked) { if (!testMode && isCorrect) setFirstTryCorrect(value=>value+1); setChecked(true); resolveFeedback(isCorrect); return; }
    if (testMode) {
      const score = testScore + (isCorrect ? 1 : 0);
      setTestScore(score);
      if (isLastExercise) {
        setTestDone(true);
        if (score / exercises.length * 100 >= unitData.unit_test.pass_score_percent && !testPassed) {
          setTestPassed(true); localStorage.setItem(storageKeys.test, 'passed'); onEarnXp?.(unitData.unit_test.xp || 50); onUnitComplete?.();
        }
      } else { setExerciseIndex(v => v + 1); resetExercise(); }
      return;
    }
    if (!isCorrect) { resetExercise(); return; }
    if (isLastExercise) { goPhase('speaking'); return; }
    setExerciseIndex(v => v + 1); resetExercise();
  };
  const selectMatchRight = (index) => {
    if (matchLeft === null || matches.some(match=>match.left===matchLeft) || matches.some(match=>match.right===index)) return;
    setMatches(values=>[...values,{left:matchLeft,right:index}]);
    setMatchLeft(null);
  };
  const beginSpeaking = () => { setPhase('speaking'); setContentIndex(0); };
  const phases = ['vocabulary', 'phrases', 'mistakes', 'exercises', 'speaking'];
  const phaseLabels = rtl ? ['المفردات', 'العبارات', 'أخطاء شائعة', 'التدريبات', 'التحدث'] : ['Vocabulary', 'Phrases', 'Common mistakes', 'Exercises', 'Speaking'];
  const phaseIndex = phases.indexOf(phase);
  const phaseCounts = [vocabulary.length, phrases.length, mistakes.length, exercises.length, 1];
  const lessonProgressTotal = phaseCounts.reduce((sum,count)=>sum+count,0);
  const lessonProgressDone = phaseCounts.slice(0,Math.max(0,phaseIndex)).reduce((sum,count)=>sum+count,0)
    + (phase==='exercises' ? exerciseIndex + (checked ? 1 : 0) : phase==='speaking' ? 1 : contentIndex);
  const lessonProgressPercent = phase==='complete' ? 100 : lessonProgressTotal ? Math.min(100,Math.round(lessonProgressDone/lessonProgressTotal*100)) : 0;
  const goPhase = (nextPhase) => { setPhase(nextPhase); setContentIndex(0); setExerciseIndex(0); resetExercise(); };
  const lessonContent = phase === 'vocabulary' ? vocabulary : phase === 'phrases' ? phrases : mistakes;
  const activeContent = lessonContent[contentIndex];

  const lessonNumber = activeLesson ? unitData.lessons.findIndex(item => item.id === activeLesson.id) + 1 : null;
  const renderExercise = () => {
    if (!current) return null;
    if (current.type === 'match') return <div className="iu-match-grid">
      <div><small>{rtl ? 'الإنجليزية' : 'English'}</small>{shuffledMatch.left.map(i=>{const pair=current.pairs[i];const linked=matches.find(match=>match.left===i);const status=checked&&linked?(current.pairs[linked.right]?.ar===pair.ar?'right':'incorrect'):'';return <button key={i} disabled={matches.some(match=>match.left===i)} className={(matchLeft===i?'selected ':'')+status} onClick={()=>!checked&&setMatchLeft(i)} dir="ltr">{renderMixedText(pair.en)}{checked&&linked&&<span className="iu-match-status">{status==='right'?'✓':'✕'}</span>}</button>;})}</div>
      <div><small>{rtl ? 'المعنى' : 'Meaning'}</small>{shuffledMatch.right.map(i=>{const pair=current.pairs[i];const linked=matches.find(match=>match.right===i);const status=checked&&linked?(current.pairs[linked.left]?.ar===pair.ar?'right':'incorrect'):'';return <button key={i} disabled={matches.some(match=>match.right===i)} className={(linked?'selected ':'')+status} onClick={()=>!checked&&selectMatchRight(i)}>{renderMixedText(pair.ar)}{checked&&linked&&<span className="iu-match-status">{status==='right'?'✓':'✕'}</span>}</button>;})}</div>
      <p>{rtl ? 'اختر عبارة ثم معناها المطابق.' : 'Choose a phrase, then its matching meaning.'} · {matches.length}/{current.pairs.length}</p>
    </div>;
    if (current.type === 'word_order') return <div className="iu-order">
      <div className="iu-answer-order" dir="ltr">{order.map((word,i)=><button key={i} onClick={()=>!checked&&setOrder(v=>v.filter((_,j)=>j!==i))}>{word}</button>)}</div>
      <div className="iu-word-bank" dir="ltr">{(current.words||[]).map((word,i)=><button key={i} disabled={order.filter(x=>x===word).length >= (current.words||[]).filter(x=>x===word).length} onClick={()=>!checked&&setOrder(v=>[...v,word])}>{renderMixedText(word)}</button>)}</div>
    </div>;
    const options = current.options || [];
    return <div className="iu-options">
      {current.type === 'listening' && <button className="iu-listen" onClick={()=>playPronunciation(current.audio_text, unitData)}><Volume2 size={19}/>{rtl?'استمع إلى العبارة':'Play audio'}</button>}
      {current.sentence && <p className="iu-sentence" dir="ltr">{renderMixedText(current.sentence)}</p>}
      {options.map((option,i)=><button key={i} dir={/[A-Za-z]/.test(option)?'ltr':'rtl'} className={'iu-option '+(selected===i?'selected':'')+(checked&&i===current.answerIndex?' correct':'')+(checked&&selected===i&&i!==current.answerIndex?' wrong':'')} onClick={()=>chooseOption(i)}>{renderMixedText(option)}</button>)}
    </div>;
  };

  const activeIndex = unitData.lessons.findIndex(lesson => !completed.includes(lesson.id));
  const lessonKinds = rtl ? ['مفردات','قواعد','استماع','تحدث','مراجعة'] : ['Vocabulary','Grammar','Listening','Speaking','Review'];
  return <section className="iu-unit iu-reference-style">
    <div className="iu-reference-heading">
      <div className="iu-reference-title"><small>{rtl?('الوحدة '+unitNumber+' · '+unitData.title_ar):('UNIT '+String(unitNumber).padStart(2,'0')+' · '+unitData.title_en)}</small><h3>{rtl?unitData.title_ar:unitData.title_en}</h3></div>
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
    <div className="iu-test-card iu-reference-test"><div><small>{rtl?'الاختبار النهائي':'FINAL ASSESSMENT'}</small><h3>{rtl?unitData.unit_test.title_ar:'Unit test'}</h3><p>{rtl?('أكمل الدروس '+unitData.lessons.length+' لفتح الاختبار. درجة النجاح '+unitData.unit_test.pass_score_percent+'٪.'):'Complete all '+unitData.lessons.length+' lessons to unlock the test. Pass mark: '+unitData.unit_test.pass_score_percent+'%.'}</p></div><button disabled={!unitComplete} onClick={beginTest}>{testPassed?(rtl?'إعادة الاختبار':'Retake test'):(rtl?'ابدأ الاختبار':'Start test')} {unitComplete?'':'🔒'}</button></div>

    {(activeLesson || testMode) && <div className="iu-overlay iu-fullscreen-overlay"><section className="iu-modal iu-adventure-modal" dir={rtl?'rtl':'ltr'} onPointerDownCapture={unlockAudio} onClickCapture={e=>{if(e.target.closest("button")&&!e.target.closest("button").disabled)playUnitTone("click",soundOn)}}>
      <header className="iu-adventure-header"><div><small>{testMode?(rtl?'اختبار الوحدة':'UNIT TEST'):(rtl?('الوحدة '+unitNumber+' · الدرس '+lessonNumber):('UNIT '+unitNumber+' · LESSON '+lessonNumber))}</small><h2>{testMode?(rtl?unitData.unit_test.title_ar:'Unit test'):(rtl?activeLesson.title_ar:activeLesson.title_en)}</h2></div><button className="iu-close" onClick={closeLesson}><X size={20}/></button></header>
      <div className="iu-game-hud"><div className="iu-game-progress" role="progressbar" aria-label={rtl?'تقدم الدرس':'Lesson progress'} aria-valuemin={0} aria-valuemax={100} aria-valuenow={lessonProgressPercent}><i style={{width:lessonProgressPercent+'%'}}/></div><div className="iu-game-hearts" aria-label={rtl?'القلوب المتبقية':'Hearts remaining'}><span>❤️</span><b dir="ltr">{hearts}</b></div><div className={'iu-game-combo '+(combo>=3?'is-hot':'')}><span>🔥</span><b>{combo}</b><small>{rtl?'كومبو':'COMBO'}</small></div><button className="iu-sound-toggle" onClick={()=>setSettingsOpen(v=>!v)} aria-label={rtl?'الإعدادات':'Settings'}>⚙️</button></div>
      {settingsOpen && <div className="iu-settings-panel"><label><input type="checkbox" checked={soundOn} onChange={e=>{setSoundOn(e.target.checked);localStorage.setItem(storageKeys.sound,e.target.checked?'on':'off')}}/> {rtl?'الأصوات':'Sound effects'}</label><label><input type="checkbox" checked={vibrationOn} onChange={e=>{setVibrationOn(e.target.checked);localStorage.setItem(storageKeys.vibration,e.target.checked?'on':'off')}}/> {rtl?'الاهتزاز':'Vibration'}</label></div>}
      <div className="iu-lulu-coach"><div className="iu-lulu-stage"><UnitLulu mood={luluMood} action={luluAction}/>{(luluMood==='cheer'||luluMood==='fire')&&<span className="iu-lulu-sparks">✨ ⭐ 🔥</span>}</div><div><b>لولو</b><p>{renderMixedText(checked?(comboMessage || luluMessage):luluMessage)}</p></div></div>
      {combo>=3 && comboMessage && <div className="iu-combo-banner"><span>🔥</span><b>{comboMessage}</b><strong>×{combo}</strong><span>✨</span></div>}
      {!testMode && <>
      {phase==='vocabulary' && activeContent && <div className="iu-content-card"><div className="iu-card-counter"><span dir="ltr">{contentIndex+1} / {vocabulary.length}</span></div><h3 dir="ltr">{renderMixedText(activeContent.en)}</h3><strong>{renderMixedText(activeContent.ar)}</strong><p>{rtl?'النطق التقريبي: ': 'Pronunciation: '}{renderMixedText(activeContent.pron_ar)}</p><div className="iu-example"><button onClick={()=>playPronunciation(activeContent.example_en, unitData)}><Volume2 size={17}/></button><b dir="ltr">{renderMixedText(activeContent.example_en)}</b><span>{renderMixedText(activeContent.example_ar)}</span></div><footer><button disabled={contentIndex===0} onClick={()=>setContentIndex(v=>v-1)}>{rtl?'السابق':'Previous'}</button><button onClick={()=>contentIndex===vocabulary.length-1?goPhase('phrases'):setContentIndex(v=>v+1)}>{rtl?'التالي':'Next'}<ArrowLeft size={15}/></button></footer></div>}
      {phase==='phrases' && activeContent && <div className="iu-content-card"><div className="iu-card-counter"><span dir="ltr">{contentIndex+1} / {phrases.length}</span></div><h3 dir="ltr">{renderMixedText(activeContent.en)}</h3><strong>{renderMixedText(activeContent.ar)}</strong><button className="iu-listen" onClick={()=>playPronunciation(activeContent.en, unitData)}><Volume2 size={18}/>{rtl?'استمع للنطق':'Listen'}</button><footer><button disabled={contentIndex===0} onClick={()=>setContentIndex(v=>v-1)}>{rtl?'السابق':'Previous'}</button><button onClick={()=>contentIndex===phrases.length-1?goPhase('mistakes'):setContentIndex(v=>v+1)}>{rtl?'التالي':'Next'}<ArrowLeft size={15}/></button></footer></div>}
      {phase==='mistakes' && activeContent && <div className="iu-content-card"><div className="iu-card-counter"><span dir="ltr">{contentIndex+1} / {mistakes.length}</span></div><div className="iu-mistake"><span>{rtl?'❌ الخطأ الشائع':'❌ Common mistake'}</span><b>{renderMixedText(activeContent.wrong)}</b><span>{rtl?'✅ الصحيح':'✅ Correct form'}</span><b>{renderMixedText(activeContent.right)}</b><p>{renderMixedText(activeContent.explain_ar)}</p></div><footer><button disabled={contentIndex===0} onClick={()=>setContentIndex(v=>v-1)}>{rtl?'السابق':'Previous'}</button><button onClick={()=>contentIndex===mistakes.length-1?goPhase('exercises'):setContentIndex(v=>v+1)}>{rtl?'التالي':'Next'}<ArrowLeft size={15}/></button></footer></div>}
      {phase==='exercises' && <div className="iu-content-card"><div className="iu-card-counter"><span dir="ltr">{exerciseIndex+1} / {exercises.length}</span></div><h3 className="iu-exercise-prompt">{renderMixedText(current?.prompt)}</h3>{renderExercise()}{checked && <div className={'iu-feedback '+(isCorrect?'good':'bad')}>{current?.feedback_ar?renderMixedText(current.feedback_ar):(isCorrect?(rtl?'إجابة صحيحة، أحسنت!':'Correct! Well done.'):(rtl?'ليست صحيحة، حاول مرة أخرى.':'Not quite. Try again.'))}</div>}{checked && current?.type==='match' && !isCorrect && <div className="iu-match-corrections" role="status"><strong>{rtl?'راجع الأخطاء والإجابات الصحيحة:':'Review the incorrect pairs:'}</strong>{matches.filter(({left,right})=>current.pairs[left]?.ar!==current.pairs[right]?.ar).map(({left,right})=><p key={left}><span dir="ltr">{current.pairs[left]?.en}</span><b>←</b><span>{rtl?current.pairs[left]?.ar:current.pairs[left]?.ar}</span></p>)}</div>}<button className="iu-primary" disabled={current?.type==='match'?matches.length!==current.pairs.length:current?.type==='word_order'?order.length!==(current.answer||[]).length:selected===null} onClick={submit}>{!checked?(rtl?'تحقق من الإجابة':'Check answer'):(isCorrect?(isLastExercise?(testMode?(rtl?'إنهاء الاختبار':'Finish test'):(rtl?'إنهاء الدرس':'Finish lesson')):(rtl?'التالي':'Next')):(rtl?'حاول مجدداً':'Try again'))}<ArrowLeft size={17}/></button></div>}
      {phase==='speaking' && <div className="iu-content-card"><h3>{renderMixedText(activeLesson.speaking.prompt_ar)}</h3>{activeLesson.speaking.repeat.map((line,i)=><div className="iu-speaking-line" key={i}><span dir="ltr">{renderMixedText(line)}</span><button onClick={()=>playPronunciation(line, unitData)}><Volume2 size={18}/></button></div>)}<button className="iu-primary" onClick={finishLesson}>{rtl?'إنهاء الدرس · +30 XP':'Complete lesson · +30 XP'}<Check size={17}/></button></div>}
      {phase==='complete' && <div className="iu-content-card iu-lesson-complete"><UnitLulu mood="fire"/><h3>{rtl?'أحسنت! أنهيت الدرس 🎉':'Lesson complete! 🎉'}</h3><p>{rtl?'لولو فخورة بإنجازك!':'Lulu is proud of you!'}</p><div className="iu-completion-stats"><div><strong dir="ltr">{lessonXpEarned} XP</strong><span>{rtl?'النقاط المكتسبة':'Points earned'}</span></div><div><strong dir="ltr">{Math.round(firstTryCorrect/Math.max(1,exercises.length)*100)}%</strong><span>{rtl?'الصحيح من أول محاولة':'Correct on first try'}</span></div><div><strong dir="ltr">×{bestCombo}</strong><span>{rtl?'أعلى كومبو':'Best combo'}</span></div></div><div className="iu-completion-actions"><button className="iu-primary" onClick={()=>{const index=unitData.lessons.findIndex(item=>item.id===activeLesson.id);const nextLesson=unitData.lessons[index+1];if(nextLesson)beginLesson(nextLesson);else beginTest();}}>{rtl?(unitData.lessons.findIndex(item=>item.id===activeLesson.id)===unitData.lessons.length-1?'اختبار الوحدة':'الدرس التالي'):(unitData.lessons.findIndex(item=>item.id===activeLesson.id)===unitData.lessons.length-1?'Unit test':'Next lesson')}<ArrowLeft size={17}/></button><button className="iu-completion-secondary" onClick={closeLesson}>{rtl?'العودة إلى الوحدة':'Back to unit'}</button></div></div>}
      </>}
      {testMode && !testDone && <div className="iu-content-card"><div className="iu-card-counter"><span dir="ltr">{exerciseIndex+1} / {exercises.length}</span></div><h3>{renderMixedText(current?.prompt)}</h3>{renderExercise()}{checked && <div className={'iu-feedback '+(isCorrect?'good':'bad')}>{current?.feedback_ar?renderMixedText(current.feedback_ar):(isCorrect?(rtl?'إجابة صحيحة، أحسنت!':'Correct! Well done.'):(rtl?'ليست صحيحة، حاول مرة أخرى.':'Not quite. Try again.'))}</div>}<button className="iu-primary" disabled={current?.type==='match'?matches.length!==current.pairs.length:current?.type==='word_order'?order.length!==(current.answer||[]).length:selected===null} onClick={submit}>{!checked?(rtl?'تحقق من الإجابة':'Check answer'):(isCorrect?(isLastExercise?(rtl?'إنهاء الاختبار':'Finish test'):(rtl?'التالي':'Next')):(rtl?'حاول مجدداً':'Try again'))}<ArrowLeft size={17}/></button></div>}
      {testMode && testDone && <div className="iu-content-card iu-test-result"><div className="iu-test-score">{Math.round(testScore/exercises.length*100)}%</div><p className="iu-result-combo">{rtl?("أفضل كومبو: "+bestCombo):("Best combo: "+bestCombo)}</p><h3>{testScore/exercises.length*100>=unitData.unit_test.pass_score_percent?(rtl?'اجتزت اختبار الوحدة!':'Unit test passed!'):(rtl?'حاول مرة أخرى':'Try again')}</h3><p>{testScore} / {exercises.length} {rtl?'إجابات صحيحة':'correct answers'}</p><button className="iu-primary" onClick={closeLesson}>{rtl?'العودة إلى الوحدة':'Back to unit'}<ArrowLeft size={17}/></button></div>}
    </section></div>}
  </section>;
}
