import { useState } from 'react';
import { lessonLibrary } from './data/lessons.js';
import { ArrowLeft, BookOpen, Check, ChevronLeft, Flame, Globe2, Headphones, Home, LockKeyhole, Menu, Sparkles, Star, Target, Trophy, X, Zap, Languages } from 'lucide-react';

const copy = {
 ar: {
  navHome:'الرئيسية',navPath:'مسار التعلم',navWords:'كلماتي',navRanks:'الإنجازات',
  greeting:'أهلاً بعودتك 👋',subtitle:'رحلتك التعليمية تبدأ بخطوة صغيرة اليوم.',
  level:'المستوى',levelName:'المستكشف',continue:'أكمل التعلم',daily:'هدفك اليومي',
  dailyDone:'أنجزت 1 من 3 أنشطة',streak:'أيام متتالية',xp:'نقاط الخبرة',
  league:'الدوري البرونزي',weekly:'تقدمك هذا الأسبوع',weeklySub:'كل خطوة تصنع فرقاً',
  lesson:'درس اليوم',lessonType:'مفردات أساسية',lessonTitle:'كلمات تستخدمها كل يوم',
  lessonDesc:'تعلّم كلمات جديدة من الحياة اليومية',start:'ابدأ الدرس',
  path:'مسار رحلتك',pathSub:'تقدّم خطوة بخطوة، وافتح المرحلة التالية',
  unit1:'البدايات الذكية',unit1sub:'التحيات والتعارف',unit2:'في الحياة اليومية',
  unit2sub:'البيت، الطعام، والوقت',unit3:'تواصل بثقة',unit3sub:'محادثات ومواقف حقيقية',
  locked:'مقفل',inProgress:'قيد التقدم',minutes:'دقائق',week:'هذا الأسبوع',
  mon:'اثن',tue:'ثلا',wed:'أرب',thu:'خمي',fri:'جمع',sat:'سبت',sun:'أحد',
  switchLang:'English',question:'ماذا تعني هذه الكلمة؟',answer:'اختر الإجابة الصحيحة',
  checkAnswer:'تحقق من الإجابة',correct:'إجابة رائعة! +10 XP',wrong:'ليست هذه الإجابة. حاول مرة أخرى!',
  next:'السؤال التالي',finish:'أحسنت! أنهيت التدريب',back:'العودة للرئيسية',close:'إغلاق',
  chooseTitle:'ابدأ رحلتك مع Lingoza',chooseSub:'اختر اللغة التي تريد تعلمها. يمكنك تغييرها لاحقاً.',
  learning:'لغة التعلم',interface:'لغة الواجهة',levelTitle:'اختر مستواك الحالي',
  levelSub:'سنرتب الدروس بما يناسب خبرتك.',beginner0:'مبتدئ تماماً',beginner:'لدي بعض الأساسيات',
  intermediate:'متوسط',startNow:'ابدأ التعلم',changeCourse:'تغيير اللغة',
  courseEnglish:'الإنجليزية',courseFrench:'الفرنسية',englishDesc:'لغة عالمية للحياة والعمل والسفر',
  frenchDesc:'تعلّم لغة الثقافة والسفر والتواصل',courseLabel:'تتعلم الآن'
 },
 en: {
  navHome:'Home',navPath:'Learning path',navWords:'My words',navRanks:'Achievements',
  greeting:'Welcome back 👋',subtitle:'Your learning journey starts with one small step today.',
  level:'LEVEL',levelName:'The Explorer',continue:'Continue learning',daily:'Daily goal',
  dailyDone:'1 of 3 activities completed',streak:'Day streak',xp:'Total XP',
  league:'Bronze league',weekly:'Your week',weeklySub:'Every step makes a difference',
  lesson:"Today's lesson",lessonType:'CORE VOCABULARY',lessonTitle:'Words for everyday life',
  lessonDesc:'Learn useful words from daily life',start:'Start lesson',
  path:'Your learning path',pathSub:'Move forward, one step at a time',
  unit1:'Smart beginnings',unit1sub:'Greetings & introductions',unit2:'Everyday life',
  unit2sub:'Home, food & time',unit3:'Speak with confidence',unit3sub:'Real-life conversations',
  locked:'Locked',inProgress:'In progress',minutes:'MIN',week:'THIS WEEK',
  mon:'MON',tue:'TUE',wed:'WED',thu:'THU',fri:'FRI',sat:'SAT',sun:'SUN',
  switchLang:'العربية',question:'What does this word mean?',answer:'Choose the correct answer',
  checkAnswer:'Check answer',correct:'Great answer! +10 XP',wrong:'Not quite. Try again!',
  next:'Next question',finish:'Great work! Practice complete',back:'Back to home',close:'Close',
  chooseTitle:'Start your journey with Lingoza',chooseSub:'Choose the language you want to learn. You can change it later.',
  learning:'Learning language',interface:'App language',levelTitle:'Choose your current level',
  levelSub:'We will organize lessons to match your experience.',beginner0:'Complete beginner',
  beginner:'I know some basics',intermediate:'Intermediate',startNow:'Start learning',
  changeCourse:'Change language',courseEnglish:'English',courseFrench:'French',
  englishDesc:'A global language for life, work and travel',
  frenchDesc:'Learn the language of culture, travel and connection',courseLabel:'LEARNING'
 }
};

function App(){
 const [lang,setLang]=useState(()=>localStorage.getItem('lingoza-ui')||'ar');
 const [course,setCourse]=useState(()=>localStorage.getItem('lingoza-course')||'');
 const [level,setLevel]=useState(()=>localStorage.getItem('lingoza-level')||'');
 const [setupDone,setSetupDone]=useState(()=>localStorage.getItem('lingoza-setup-done')==='1');
 const [active,setActive]=useState('home'),[lessonOpen,setLessonOpen]=useState(false),
 [q,setQ]=useState(0),[choice,setChoice]=useState(null),[checked,setChecked]=useState(false),
 [earned,setEarned]=useState(()=>Number(localStorage.getItem('lingoza-xp')||0)),
 [completedLessons,setCompletedLessons]=useState(()=>JSON.parse(localStorage.getItem('lingoza-completed')||'[]')),
 [awardedQuestions,setAwardedQuestions]=useState(()=>JSON.parse(localStorage.getItem('lingoza-awarded')||'[]')),
 [lessonIndex,setLessonIndex]=useState(0),[mobileNav,setMobileNav]=useState(false);
 const rtl=lang==='ar';
 const t=copy[lang];
 const courseLessons=lessonLibrary[course]||lessonLibrary.en;
 const selectedLesson=courseLessons[lessonIndex]||courseLessons[0];
 const questions=selectedLesson.questions;
 const current=questions[q];
 const options=rtl?current.ar:current.en;
 const progress=Math.min(100,Math.round((completedLessons.length/3)*100));
 const days=[t.mon,t.tue,t.wed,t.thu,t.fri,t.sat,t.sun];
 const nav=[{id:'home',label:t.navHome,icon:Home},{id:'path',label:t.navPath,icon:BookOpen},{id:'words',label:t.navWords,icon:Globe2},{id:'ranks',label:t.navRanks,icon:Trophy}];
 const saveUi=(v)=>{setLang(v);localStorage.setItem('lingoza-ui',v)};
 const chooseCourse=(v)=>{setCourse(v);localStorage.setItem('lingoza-course',v)};
 const chooseLevel=(v)=>{setLevel(v);localStorage.setItem('lingoza-level',v)};
 const closeLesson=()=>{setLessonOpen(false);setQ(0);setChoice(null);setChecked(false)};
 const startLesson=(index=lessonIndex)=>{setLessonIndex(index);setLessonOpen(true);setQ(0);setChoice(null);setChecked(false)};
 const check=()=>{if(choice!==null&&!checked){setChecked(true);const key=course+'-'+lessonIndex+'-'+q;if(choice===current.correct&&!awardedQuestions.includes(key)){const updated=[...awardedQuestions,key];setAwardedQuestions(updated);localStorage.setItem('lingoza-awarded',JSON.stringify(updated));setEarned(v=>{const next=v+10;localStorage.setItem('lingoza-xp',String(next));return next})}}};
 const next=()=>{if(q<questions.length-1){setQ(q+1);setChoice(null);setChecked(false)}else{const key=course+'-'+lessonIndex;if(!completedLessons.includes(key)){const updated=[...completedLessons,key];setCompletedLessons(updated);localStorage.setItem('lingoza-completed',JSON.stringify(updated))}closeLesson()}};
 const courseName=course==='fr'?(rtl?'الفرنسية':'French'):(rtl?'الإنجليزية':'English');
 if(!setupDone) return <div className="setup-screen" dir={rtl?'rtl':'ltr'}>
  <div className="setup-top"><div className="brand"><div className="brand-mark"><Sparkles size={21}/></div><span>lingoza<span className="brand-dot">.</span></span></div><button className="language-btn" onClick={()=>saveUi(rtl?'en':'ar')}><Globe2 size={17}/>{t.switchLang}</button></div>
  <div className="setup-content"><div className="setup-eyebrow"><Sparkles size={15}/> LINGOZA LEARNING</div><h1>{t.chooseTitle}</h1><p className="setup-intro">{t.chooseSub}</p>
   <div className="setup-section"><div className="setup-section-head"><span className="setup-step">01</span><div><h2>{t.learning}</h2><p>{rtl?'يمكنك اختيار لغة واحدة الآن والتبديل لاحقاً.':'Choose one language for now. You can switch anytime.'}</p></div></div>
    <div className="course-options">
     <button className={'course-option '+(course==='en'?'selected':'')} onClick={()=>chooseCourse('en')}><span className="course-symbol">EN</span><span className="course-copy"><strong>{t.courseEnglish}</strong><small>{t.englishDesc}</small></span>{course==='en'&&<Check className="course-check"/>}</button>
     <button className={'course-option '+(course==='fr'?'selected':'')} onClick={()=>chooseCourse('fr')}><span className="course-symbol french">FR</span><span className="course-copy"><strong>{t.courseFrench}</strong><small>{t.frenchDesc}</small></span>{course==='fr'&&<Check className="course-check"/>}</button>
    </div>
   </div>
   <div className="setup-section"><div className="setup-section-head"><span className="setup-step">02</span><div><h2>{t.levelTitle}</h2><p>{t.levelSub}</p></div></div>
    <div className="level-options">
     {[['beginner0',rtl?'أبدأ من الصفر':'Start from zero'],['beginner',rtl?'أعرف بعض الكلمات والقواعد':'I know a few words and basics'],['intermediate',rtl?'أستطيع تكوين جمل بسيطة':'I can form simple sentences']].map(([id,desc],i)=><button key={id} className={'level-option '+(level===id?'selected':'')} onClick={()=>chooseLevel(id)}><span className="level-number">0{i+1}</span><span><strong>{t[id]}</strong><small>{desc}</small></span>{level===id&&<Check size={18}/>}</button>)}
    </div>
   </div>
   <button className="setup-submit" disabled={!course||!level} onClick={()=>{setSetupDone(true);localStorage.setItem('lingoza-setup-done','1');setActive('home')}}>{t.startNow}<ArrowLeft size={18}/></button>
   <div className="setup-foot">{rtl?'اختياراتك محفوظة على جهازك ويمكنك تغييرها لاحقاً.':'Your choices are saved on this device and can be changed later.'}</div>
  </div>
 </div>;
 return <div className={'app '+(rtl?'rtl':'ltr')} dir={rtl?'rtl':'ltr'}>
  <aside className={'sidebar '+(mobileNav?'show':'')}><div className="brand"><div className="brand-mark"><Sparkles size={21}/></div><span>lingoza<span className="brand-dot">.</span></span><button className="mobile-close icon-btn" onClick={()=>setMobileNav(false)}><X size={19}/></button></div><div className="side-label">{rtl?'القائمة الرئيسية':'MAIN MENU'}</div><nav>{nav.map(n=><button key={n.id} onClick={()=>{setActive(n.id);setMobileNav(false)}} className={'nav-item '+(active===n.id?'selected':'')}><n.icon size={19}/><span>{n.label}</span>{active===n.id&&<span className="nav-indicator"/>}</button>)}</nav><div className="sidebar-bottom"><div className="streak-card"><div className="streak-icon"><Flame size={20} fill="currentColor"/></div><div><strong>5 {rtl?'أيام':'days'}</strong><span>{rtl?'حافظ على حماسك!':'Keep your streak alive!'}</span></div></div><div className="profile"><div className="avatar">L</div><div className="profile-info"><strong>{rtl?'المتعلم':'Learner'}</strong><span>{courseName}</span></div><button className="more">•••</button></div></div></aside>
  {mobileNav&&<button className="scrim" onClick={()=>setMobileNav(false)} aria-label="Close menu"/>}
  <main className="main"><header className="topbar"><div className="top-left"><button className="mobile-menu icon-btn" onClick={()=>setMobileNav(true)}><Menu size={21}/></button><div className="breadcrumb">{rtl?'مساحة التعلم':'Learning space'} <ChevronLeft size={14}/><b>{nav.find(n=>n.id===active)?.label}</b></div></div><div className="top-actions"><button className="language-btn course-switch" onClick={()=>{setCourse('');setLevel('');setSetupDone(false);localStorage.removeItem('lingoza-setup-done')}}><Languages size={16}/><span>{courseName}</span></button><button className="language-btn" onClick={()=>saveUi(rtl?'en':'ar')}><Globe2 size={17}/><span>{t.switchLang}</span></button><div className="top-divider"/><button className="notification">✦</button><div className="avatar small">L</div></div></header>
  {active==='home'?<div className="content"><section className="welcome-row"><div><div className="eyebrow"><span className="eyebrow-line"/>{rtl?'مساحتك للتطور':'YOUR SPACE TO GROW'}</div><h1>{t.greeting}</h1><p>{rtl?'رحلتك في '+courseName+' تبدأ بخطوة صغيرة اليوم.':'Your '+courseName+' journey starts with one small step today.'}</p></div><div className="date-chip"><span className="date-dot"/>{rtl?'الثلاثاء، 3 نوفمبر':'Tuesday, November 3'}</div></section>
   <section className="hero-grid"><div className="hero-card"><div className="hero-orb orb-one"/><div className="hero-orb orb-two"/><div className="hero-content"><div className="hero-tag"><Sparkles size={14}/>{t.level} · {level==='beginner0'?(rtl?'مبتدئ تماماً':'Complete beginner'):level==='beginner'?(rtl?'أساسيات':'Basic'):(rtl?'متوسط':'Intermediate')}</div><h2>{rtl?'كل يوم أقرب إلى الطلاقة.':'A little every day.'}<br/><em>{rtl?'استمر، أنت تتقدم!':'A lot of progress.'}</em></h2><p>{rtl?'ابدأ درساً قصيراً اليوم، واجعل التعلم جزءاً من يومك.':'Build your confidence with one focused lesson at a time.'}</p><button className="primary-btn" onClick={startLesson}>{t.continue}<ArrowLeft size={17}/></button></div><div className="hero-art"><div className="art-ring ring-a"/><div className="art-ring ring-b"/><div className="book-illustration"><BookOpen size={76} strokeWidth={1.25}/><Sparkles className="book-spark" size={25}/></div><div className="float-pill"><Zap size={14} fill="currentColor"/> +10 XP</div><div className="float-star"><Star size={20} fill="currentColor"/></div></div></div><div className="stats-column"><div className="stat-card"><div className="stat-icon fire"><Flame size={19}/></div><div><span>{t.streak}</span><strong>5 <small>{rtl?'أيام':'days'}</small></strong><em>{rtl?'أنت على المسار الصحيح':'You’re on a roll'}</em></div></div><div className="stat-card"><div className="stat-icon purple"><Zap size={19}/></div><div><span>{t.xp}</span><strong>{earned} <small>XP</small></strong><em>{t.league}</em></div></div></div></section>
   <section className="dashboard-grid"><div className="panel daily-panel"><div className="panel-heading"><div><h3>{t.daily}</h3><p>{t.dailyDone}</p></div><div className="target-icon"><Target size={21}/></div></div><div className="goal-progress"><div className="progress-track"><span style={{width:progress+'%'}}/></div><strong>{progress}%</strong></div><div className="goal-footer"><span><Check size={14}/>{rtl?'نشاط واحد مكتمل':'1 activity completed'}</span><b>2 {rtl?'متبقي':'left'}</b></div></div><div className="panel week-panel"><div className="panel-heading"><div><h3>{t.weekly}</h3><p>{t.weeklySub}</p></div><span className="week-label">{t.week}</span></div><div className="week-bars">{days.map((d,i)=><div className="day-col" key={d}><div className="bar-wrap"><span className={i<3?'bar active':'bar'} style={{height:[64,88,48,25,25,25,25][i]+'%'}}/></div><span className={i===2?'day today':'day'}>{d}</span></div>)}</div></div></section>
   <section className="section-heading"><div><h2>{t.lesson}</h2><p>{rtl?'خطوة صغيرة اليوم، إنجاز كبير غداً':'A small step today, a big win tomorrow'}</p></div><button className="text-link" onClick={()=>setActive('path')}>{t.path}<ChevronLeft size={16}/></button></section>
   <section className="lesson-card"><div className="lesson-icon"><BookOpen size={27}/></div><div className="lesson-info"><span className="lesson-kicker">{course==='fr'?'FRENCH':'ENGLISH'} · {t.lessonType}</span><h3>{rtl?selectedLesson.arTitle:selectedLesson.title}</h3><p>{rtl?selectedLesson.arDescription:selectedLesson.description}</p><select className="lesson-picker" value={lessonIndex} onChange={e=>setLessonIndex(Number(e.target.value))}>{courseLessons.map((lesson,i)=><option key={lesson.title} value={i}>{rtl?lesson.arTitle:lesson.title}</option>)}</select></div><div className="lesson-meta"><span>◷ 5 {t.minutes}</span><span><Zap size={14}/> +30 XP</span></div><button className="lesson-button" onClick={startLesson}>{t.start}<ArrowLeft size={16}/></button></section>
   <section className="section-heading path-heading"><div><h2>{t.path}</h2><p>{t.pathSub}</p></div><span className="path-count">01 / 03</span></section><section className="path-grid"><div className="path-card current"><div className="unit-top"><span className="unit-number">01</span><span className="unit-status"><span/> {t.inProgress}</span></div><div className="unit-symbol"><b>Aa</b></div><h3>{t.unit1}</h3><p>{t.unit1sub}</p><div className="unit-progress"><span style={{width:(completedLessons.filter(x=>x.startsWith(course+'-')).length/8*100)+'%'}}/></div><div className="unit-bottom"><span>{completedLessons.filter(x=>x.startsWith(course+'-')).length} / 8 {rtl?'دروس مكتملة':'lessons completed'}</span><button onClick={startLesson}><ArrowLeft size={16}/></button></div></div><div className="path-card"><div className="unit-top"><span className="unit-number">02</span><span className="unit-status muted"><LockKeyhole size={12}/> {t.locked}</span></div><div className="unit-symbol mint"><Globe2 size={26}/></div><h3>{t.unit2}</h3><p>{t.unit2sub}</p><div className="unit-bottom muted-text"><span>8 {rtl?'دروس':'lessons'}</span><LockKeyhole size={15}/></div></div><div className="path-card"><div className="unit-top"><span className="unit-number">03</span><span className="unit-status muted"><LockKeyhole size={12}/> {t.locked}</span></div><div className="unit-symbol peach"><Headphones size={26}/></div><h3>{t.unit3}</h3><p>{t.unit3sub}</p><div className="unit-bottom muted-text"><span>10 {rtl?'دروس':'lessons'}</span><LockKeyhole size={15}/></div></div></section><footer className="footer"><span>© 2026 Lingoza</span><span>{rtl?'تعلّم قليلاً. وتقدّم كثيراً.':'Learn a little. Grow a lot.'}</span></footer></div>:<div className="placeholder-page"><div className="placeholder-icon"><Sparkles size={30}/></div><h1>{nav.find(n=>n.id===active)?.label}</h1><p>{rtl?'نعمل على تجهيز هذا القسم ليكون جزءاً من تجربتك التعليمية.':'We’re crafting this part of your learning experience.'}</p><button className="primary-btn" onClick={()=>setActive('home')}>{t.back}<ArrowLeft size={16}/></button></div>}</main>
  {lessonOpen&&<div className="modal-backdrop"><div className="lesson-modal"><div className="modal-top"><div className="modal-brand"><span className="modal-brand-icon"><Sparkles size={16}/></span><span>Lingoza practice</span></div><button className="icon-btn" onClick={closeLesson}><X size={20}/></button></div><div className="modal-progress"><span style={{width:((q+1)/questions.length*100)+'%'}}/></div><div className="question-meta"><span>{course==='fr'?'FRENCH':'ENGLISH'} · {rtl?selectedLesson.arTitle:selectedLesson.title}</span><b>{q+1} / {questions.length}</b></div><div className="question-visual"><BookOpen size={38}/></div><h2>{t.question}</h2><div className="word-display">{current.word}</div><p className="question-hint">{t.answer}</p><div className="answers">{options.map((o,i)=><button key={o} onClick={()=>!checked&&setChoice(i)} className={'answer-option '+(choice===i?'chosen':'')+' '+(checked&&i===current.correct?'right':'')+' '+(checked&&choice===i&&i!==current.correct?'incorrect':'')}><span className="answer-letter">{String.fromCharCode(65+i)}</span><span>{o}</span>{checked&&i===current.correct&&<Check size={18}/>}</button>)}</div>{checked&&<div className={'feedback '+(choice===current.correct?'good':'bad')}>{choice===current.correct?t.correct:t.wrong}</div>}<button className="primary-btn modal-submit" disabled={choice===null} onClick={checked?next:check}>{checked?(q===questions.length-1?t.finish:t.next):t.checkAnswer}<ArrowLeft size={17}/></button><button className="modal-back" onClick={closeLesson}>{t.close}</button></div></div>}
 </div>;
}
export default App;
