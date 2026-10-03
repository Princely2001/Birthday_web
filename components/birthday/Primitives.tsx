'use client';
import {motion,useReducedMotion,useMotionValue,useSpring} from 'motion/react';
import {useState,type ReactNode,type PointerEvent} from 'react';
import Image from 'next/image';
import {Camera,Sparkles} from 'lucide-react';
import {birthday} from '@/data/birthday';

export function Reveal({children,className=''}:{children:ReactNode;className?:string}){
 const reduced=useReducedMotion();
 return <motion.div className={`scroll-reveal ${className}`} initial={reduced?false:{opacity:0,y:42,scale:.975,filter:'blur(5px)'}} whileInView={{opacity:1,y:0,scale:1,filter:'blur(0px)'}} viewport={{once:true,amount:.12}} transition={{duration:1,ease:[.22,1,.36,1]}}>{children}</motion.div>
}
export function MagicButton({children,onClick,className='',disabled=false}:{children:ReactNode;onClick?:()=>void;className?:string;disabled?:boolean}){
 const reduced=useReducedMotion();const px=useMotionValue(0),py=useMotionValue(0);const x=useSpring(px,{stiffness:160,damping:16}),y=useSpring(py,{stiffness:160,damping:16});
 const move=(e:PointerEvent<HTMLButtonElement>)=>{if(reduced||e.pointerType!=='mouse')return;const r=e.currentTarget.getBoundingClientRect();px.set((e.clientX-r.left-r.width/2)*.1);py.set((e.clientY-r.top-r.height/2)*.15);e.currentTarget.style.setProperty('--pointer-x',`${e.clientX-r.left}px`);e.currentTarget.style.setProperty('--pointer-y',`${e.clientY-r.top}px`)};
 return <motion.button className={`magic-button ${className}`} style={{x,y}} onPointerMove={move} onPointerLeave={()=>{px.set(0);py.set(0)}} onClick={onClick} disabled={disabled} whileTap={reduced?undefined:{scale:.94}}><span>{children}</span><Sparkles size={16}/><i className="button-orbit" aria-hidden="true"/></motion.button>
}
export function Photo({index,priority=false}:{index:number;priority?:boolean}){
 const [missing,setMissing]=useState(false);
 return <div className={`photo-surface photo-tone-${index%4}`}>
  {!missing&&<Image src={birthday.photos[index].src} alt={birthday.photos[index].alt} fill sizes="(max-width:600px) 90vw, (max-width:1000px) 45vw, 40vw" priority={priority} onError={()=>setMissing(true)} className="real-photo"/>}
  <div className={`photo-placeholder ${missing?'':'under-image'}`}><span className="placeholder-index">{String(index+1).padStart(2,'0')}</span><span className="placeholder-monogram">O.</span><span className="placeholder-label"><Camera size={15}/>Your favourite photo here</span></div>
 </div>
}
export function Eyebrow({children}:{children:ReactNode}){return <p className="eyebrow">{children}</p>}
