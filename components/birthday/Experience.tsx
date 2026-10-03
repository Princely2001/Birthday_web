'use client';
import {useState,useCallback,useEffect,useRef} from 'react';
import {AnimatePresence,motion,useReducedMotion,MotionConfig,useScroll,useSpring} from 'motion/react';
import {Heart,Sparkles,ChevronDown} from 'lucide-react';
import {birthday} from '@/data/birthday';
import {Photo,MagicButton,Eyebrow} from './Primitives';
import Countdown from './Countdown';
import Gallery from './Gallery';
import Story from './Story';
import Fireworks,{FireworksCanvas} from './Fireworks';
import GrandReveal from './GrandReveal';
import {MusicProvider,MusicControl,useBirthdayMusic} from './MusicProvider';
import {LoveLetter,BirthdayCake,FinalSurprise,Ending} from './Surprises';

function Background(){
 const reduced=useReducedMotion();const [trail,setTrail]=useState<{x:number;y:number;id:number}[]>([]);const serial=useRef(0);
 useEffect(()=>{if(reduced||!matchMedia('(pointer:fine)').matches)return;let last=0;const move=(e:PointerEvent)=>{const now=performance.now();if(now-last<140)return;last=now;setTrail(t=>[...t.slice(-5),{x:e.clientX,y:e.clientY,id:serial.current++}])};addEventListener('pointermove',move);return()=>removeEventListener('pointermove',move)},[reduced]);
 return <><div className="ambient" aria-hidden="true"><div className="ambient-glow"/><div className="aurora aurora-pink"/><div className="aurora aurora-violet"/>{Array.from({length:30},(_,i)=><i key={i} style={{left:`${(i*37)%100}%`,top:`${(i*19)%100}%`,animationDelay:`${i*.7}s`}}/>)}</div><div className="floating-hearts" aria-hidden="true">{Array.from({length:9},(_,i)=><span key={i} style={{left:`${7+i*11}%`,animationDelay:`${i*-2.3}s`,animationDuration:`${18+i%4*3}s`}}>{i%3?'♡':'✧'}</span>)}</div><div aria-hidden="true" className="pointer-trail">{trail.map(p=><motion.span key={p.id} style={{left:p.x,top:p.y}} initial={{opacity:.6,y:0,scale:.7}} animate={{opacity:0,y:-30,scale:0}} transition={{duration:.9}}>♡</motion.span>)}</div></>
}

function BirthdayExperience(){
 const [phase,setPhase]=useState<'intro'|'reveal'|'explore'>('intro');
 const [celebrating,setCelebrating]=useState(false);
 const [afterglow,setAfterglow]=useState(false);
 const [stage,setStage]=useState(false);
 const afterTimer=useRef<ReturnType<typeof setTimeout>|null>(null);
 const reduced=useReducedMotion();
 const {start}=useBirthdayMusic();
 const opened=phase!=='intro';
 const {scrollYProgress}=useScroll();const progress=useSpring(scrollYProgress,{stiffness:100,damping:25});
 const close=useCallback(()=>setCelebrating(false),[]);
 const celebrate=useCallback(()=>{setCelebrating(true)},[]);
 const onBirthday=useCallback(()=>{if(phase==='explore'&&!afterglow)setCelebrating(true)},[phase,afterglow]);
 useEffect(()=>{if(phase!=='intro')return;setStage(false);const id=setTimeout(()=>setStage(true),reduced?0:1400);return()=>clearTimeout(id)},[phase,reduced]);
 useEffect(()=>{document.body.style.overflow=phase==='explore'?'':'hidden';return()=>{document.body.style.overflow=''}},[phase]);
 useEffect(()=>()=>{if(afterTimer.current)clearTimeout(afterTimer.current)},[]);
 const open=()=>{start();setPhase('reveal');setAfterglow(true);window.scrollTo({top:0,behavior:'instant'})};
 const complete=useCallback(()=>{setPhase('explore');if(afterTimer.current)clearTimeout(afterTimer.current);afterTimer.current=setTimeout(()=>setAfterglow(false),4200)},[]);
 const replay=()=>{if(afterTimer.current)clearTimeout(afterTimer.current);setAfterglow(false);setCelebrating(false);setPhase('intro');window.scrollTo({top:0,behavior:'instant'})};
 return <><Background/><motion.div className="reading-progress" style={{scaleX:progress}} aria-hidden="true"/>
  <AnimatePresence>{phase==='intro'&&<motion.div className="intro upgraded-intro" key="intro" exit={reduced?{opacity:0}:{opacity:0,scale:1.16,filter:'blur(16px)'}} transition={{duration:reduced?.2:.9}}>
   <div className="intro-top"><span>AN OCTOBER LOVE LETTER</span><span>FOR YOU, ALWAYS</span></div>
   <div className="intro-halo" aria-hidden="true"/>
   <motion.div className="intro-orbit" initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1}}><span>05 <i>·</i> 10</span><Heart strokeWidth={1}/></motion.div>
   <p className="eyebrow">SOMETHING BEAUTIFUL HAPPENED ON THIS DAY</p>
   <h1>The world got<br/><em>Ovini.</em></h1>
   <motion.p className="intro-subtitle" animate={{opacity:stage?1:0}}>And mine became a little more magical.</motion.p>
   <motion.div animate={{opacity:stage?1:0,y:stage?0:10}}><MagicButton disabled={!stage} onClick={open}>Open your surprise</MagicButton></motion.div>
   <p className="sound-hint">A little birthday music begins when you open ♡</p>
   <span className="intro-bottom">A LITTLE LOVE. A LITTLE MAGIC. ALL FOR YOU.</span>
  </motion.div>}</AnimatePresence>
  <main aria-hidden={phase!=='explore'} inert={phase!=='explore'} className={opened?'experience open':'experience'}>
   <header className="page-header"><a href="#hero" className="wordmark">For Ovini<span>♡</span></a><span>A BIRTHDAY LOVE STORY</span><a className="header-date" href="#wish">05 OCTOBER <Sparkles size={14}/></a></header>
   <section id="hero" className="hero section-width">
    <div className="hero-orbit" aria-hidden="true"/>
    <motion.div className="hero-copy" initial={false} animate={{opacity:phase==='explore'?1:0,y:phase==='explore'?0:35}} transition={{duration:1.4,delay:.15}}>
     <Eyebrow>TO MY FAVOURITE PERSON</Eyebrow><p className="hero-greeting">Happy Birthday,</p>
     <h1 className="shimmer-name">{birthday.shortName}<span>Dissanayake</span></h1>
     <p className="hero-message">To the girl who makes ordinary days<br/>feel a little more magical.</p>
     <div className="hero-date"><span>05</span><div>OCTOBER<br/><small>A day worth celebrating.</small></div><Heart size={22} strokeWidth={1}/></div>
     <div className="hero-celebrate"><MagicButton onClick={celebrate}>Light up the sky</MagicButton></div>
     <a className="scroll-hint" href="#memories">YOUR STORY, OUR MEMORIES <ChevronDown size={18}/></a>
    </motion.div>
    <motion.div className="hero-visual" initial={false} animate={{opacity:phase==='explore'?1:0,rotate:phase==='explore'?-3:0,y:phase==='explore'?0:40}} transition={{duration:1.6,delay:.3}}>
     <div className="portrait-float"><span className="hero-star">✧</span><div className="hero-photo"><Photo index={0} priority/></div><span className="hero-photo-note">my favourite kind of magic.</span><span className="hero-seal">made of<br/><em>stardust</em><Heart size={15}/></span></div>
    </motion.div><span className="hero-side">A WHOLE WORLD OF BEAUTIFUL, IN ONE PERSON.</span>
   </section>
   <div className="marquee" aria-hidden="true"><div>{Array.from({length:6},(_,i)=><span key={i}>A LITTLE MORE MAGIC <i>✧</i> A LITTLE MORE YOU <i>♡</i> </span>)}</div></div>
   {phase==='explore'&&<><Countdown onBirthday={onBirthday}/><Gallery/><Story/><LoveLetter/><BirthdayCake onCelebrate={celebrate}/><FinalSurprise/><Ending onReplay={replay} onCelebrate={celebrate}/></>}
   <nav className="progress-dots" aria-label="Sections">{[['hero','Birthday'],['memories','Memories'],['story','Our story'],['letter','Love letter'],['wish','Make a wish'],['ending','With love']].map(([id,label])=><a key={id} href={`#${id}`} aria-label={label} title={label}/>)}</nav>
  </main>
  {phase==='explore'&&!celebrating&&<MusicControl/>}
  <GrandReveal active={phase==='reveal'} onComplete={complete}/>
  {afterglow&&<div className="opening-fireworks"><FireworksCanvas active duration={11500}/></div>}
  <Fireworks active={celebrating} onClose={close}/>
 </>
}
export default function Experience(){return <MotionConfig reducedMotion="user"><MusicProvider><BirthdayExperience/></MusicProvider></MotionConfig>}
