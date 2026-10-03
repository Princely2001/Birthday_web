'use client';
import {useState,useRef,useEffect} from 'react';
import {AnimatePresence,motion} from 'motion/react';
import {Heart,MailOpen,Music2,Pause,RotateCcw} from 'lucide-react';
import {Dialog,DialogContent,DialogTitle,DialogDescription} from '@/components/ui/dialog';
import {birthday} from '@/data/birthday';
import {Reveal,Eyebrow,MagicButton,Photo} from './Primitives';
export function LoveLetter() {
  const [open, setOpen] = useState(false);

  return (
    <section id="letter" className="letter-section section-width">
      <Reveal className="letter-invitation">
        <span className="letter-icon">
          <Heart strokeWidth={1} />
        </span>

        <Eyebrow>A LITTLE PIECE OF MY HEART, JUST FOR YOU</Eyebrow>

        <h2>
          There are so many things
          <br />
          <em>I wish I could tell you…</em>
        </h2>

        <p>
          Some feelings are too special for ordinary words, so I kept these
          ones close to my heart — just for you.
        </p>

        <MagicButton onClick={() => setOpen(!open)}>
          {open ? 'Fold the letter ♡' : 'Open my heart ♡'}
        </MagicButton>
      </Reveal>

      <AnimatePresence>
        {open && (
          <motion.article
            className="letter-paper"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="letter-inner">
              <MailOpen size={28} strokeWidth={1} />

              <h3>My Darling {birthday.shortName},</h3>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                On your special day, I just want you to know how incredibly
                grateful I am that you exist. Somehow, just having you in my
                life makes ordinary moments feel a little more beautiful and
                the happiest moments feel even more special.
              </motion.p>

              {birthday.letter.map((p, i) => (
                <motion.p
                  key={p}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + i * 0.15 }}
                >
                  {p}
                </motion.p>
              ))}

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.5 + birthday.letter.length * 0.15,
                }}
              >
                I hope this new chapter of your life brings you endless
                happiness, beautiful memories, peaceful days, exciting
                adventures, and every little thing your heart has been quietly
                wishing for. You deserve to feel loved, appreciated, and
                celebrated — not only today, but every single day.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.65 + birthday.letter.length * 0.15,
                }}
              >
                And no matter where life takes us, I hope you always remember
                that there is someone here who will always smile a little
                brighter because of you. Thank you for being you, and for
                becoming such a beautiful part of my life.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.8 + birthday.letter.length * 0.15,
                }}
              >
                Happy Birthday, my love. May this year give you a thousand
                reasons to smile, and I hope I get to be the reason behind at
                least a few of them. ♡
              </motion.p>

              <span className="letter-signature">
                With all my love,
                <br />
                always yours. ♡
              </span>
            </div>
          </motion.article>
        )}
      </AnimatePresence>
    </section>
  );
}
export function BirthdayCake({onCelebrate}:{onCelebrate:()=>void}){const [blown,setBlown]=useState(false);const timer=useRef<ReturnType<typeof setTimeout>|null>(null);useEffect(()=>()=>{if(timer.current)clearTimeout(timer.current)},[]);const blow=()=>{setBlown(true);timer.current=setTimeout(onCelebrate,1000)};return <section id="wish" className={`cake-section ${blown?'candles-out':''}`}><Reveal className="center-heading"><Eyebrow>PAUSE. CLOSE YOUR EYES. DREAM A LITTLE.</Eyebrow><h2>Make a wish,<br/><em>Ovini.</em></h2><div className="cake-art"><svg viewBox="0 0 360 290" role="img" aria-label={blown?'Birthday cake with extinguished candles':'Birthday cake with five glowing candles'}><defs><linearGradient id="icing" x2="0" y2="1"><stop stopColor="#efc4ce"/><stop offset="1" stopColor="#b27989"/></linearGradient><linearGradient id="cakebody"><stop stopColor="#724556"/><stop offset=".5" stopColor="#9c6378"/><stop offset="1" stopColor="#583343"/></linearGradient><filter id="flameglow"><feGaussianBlur stdDeviation="4"/></filter></defs><ellipse cx="180" cy="262" rx="146" ry="14" fill="#d8b185" opacity=".25"/><path d="M62 160h236v82c0 32-236 32-236 0z" fill="url(#cakebody)"/><ellipse cx="180" cy="160" rx="118" ry="27" fill="url(#icing)"/><path d="M62 162c18 10 20 47 34 34s9-21 24-13 10 32 27 24 12-25 29-16 10 30 30 19 10-30 27-18 17 21 28 3 23-6 37-30v-5c-21 31-210 37-236 2" fill="#efc4ce"/><ellipse cx="180" cy="241" rx="117" ry="24" fill="none" stroke="#c29986" strokeWidth="3"/>{[112,146,180,214,248].map((x,i)=><g key={x}><rect x={x-4} y={102+(i%2)*9} width="8" height="58" rx="2" fill="#f6d7a7"/><path d={`M${x-4} 118l8-6m-8 25l8-6m-8 25l8-6`} stroke="#b86885" strokeWidth="2"/>{!blown?<g className="flame" style={{animationDelay:`${i*.2}s`,transformOrigin:`${x}px 100px`}}><ellipse cx={x} cy={92+(i%2)*9} rx="9" ry="14" fill="#ffc96d" filter="url(#flameglow)" opacity=".7"/><path d={`M${x} ${76+(i%2)*9}q-14 22 0 26q14-4 0-26`} fill="#ffe7ab"/></g>:<path className="smoke" d={`M${x} 101q-10-18 0-28t0-28`} stroke="#dbc9d3" strokeWidth="2" fill="none"/>}</g>)}</svg></div><p aria-live="polite">{blown?'May every wish you make come true. ♡':'A little birthday magic is waiting for you.'}</p><MagicButton onClick={blown?()=>{setBlown(false)}:blow}>{blown?'Light the candles again':'Blow the candles'}</MagicButton><button className="text-button" onClick={onCelebrate}>Celebrate Ovini ✧</button></Reveal></section>}
export function FinalSurprise(){const [open,setOpen]=useState(false);return <section className="last-surprise section-width"><Reveal><Eyebrow>BEFORE YOU GO</Eyebrow><h2>Wait…<br/><em>There's one more thing.</em></h2><MagicButton onClick={()=>setOpen(true)}>One last surprise</MagicButton></Reveal><Dialog open={open} onOpenChange={setOpen}><DialogContent className="final-modal"><DialogTitle className="final-title">Happy Birthday, Ovini ♡</DialogTitle><DialogDescription>I hope today reminds you how loved and special you truly are.</DialogDescription><motion.div className="final-photo" initial={{opacity:0,scale:.85}} animate={{opacity:1,scale:1}} transition={{duration:1}}><Photo index={7}/></motion.div><Heart className="final-heart" size={46} strokeWidth={1}/><p className="final-date">05 · 10 · ALWAYS YOU</p></DialogContent></Dialog></section>}
export function Ending({onReplay,onCelebrate}:{onReplay:()=>void,onCelebrate:()=>void}){const [taps,setTaps]=useState(0);const [secret,setSecret]=useState(false);return <footer className="ending" id="ending"><Reveal><button className="easter-heart" aria-label="A little heart" onClick={()=>{setTaps(v=>v+1);if(taps>=4)setSecret(true)}}><Heart size={30} strokeWidth={1}/></button>{secret&&<motion.p initial={{opacity:0,scale:.8}} animate={{opacity:1,scale:1}} className="secret-message">P.S. You're my favourite person. ♡ <span className="heart-burst">♡ ✧ ♡</span></motion.p>}<h2>Happy Birthday,<br/><em>Beautiful.</em></h2><p className="ending-name">{birthday.name}</p><Eyebrow>5 OCTOBER ♡</Eyebrow><p>Here's to another year of<br/>beautiful memories.</p><div className="ending-actions"><button className="text-button" onClick={onReplay}><RotateCcw size={15}/> Replay the surprise</button><a className="text-button" href="#memories">View our memories</a><button className="text-button" onClick={onCelebrate}>Celebrate again ✧</button></div><div className="footer-line"><span>MADE WITH LOVE, ONLY FOR YOU</span><span>05 / 10</span></div></Reveal></footer>}
