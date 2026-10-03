'use client';

import {createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode} from 'react';
import {Music2, Pause, Volume2} from 'lucide-react';
import {birthday} from '@/data/birthday';

type MusicState = {playing: boolean; loading: boolean; error: boolean; start: () => void; toggle: () => void};
const MusicContext = createContext<MusicState | null>(null);
export function useBirthdayMusic() {
  const context = useContext(MusicContext);
  if (!context) throw new Error('Music controls need MusicProvider.');
  return context;
}

export function MusicProvider({children}: {children: ReactNode}) {
  const player = useRef<HTMLAudioElement | null>(null);
  const fade = useRef<ReturnType<typeof setInterval> | null>(null);
  const intent = useRef(false);
  const version = useRef(0);
  const mounted = useRef(true);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const stopFade = useCallback(() => { if (fade.current) clearInterval(fade.current); fade.current = null; }, []);

  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; version.current++; stopFade(); player.current?.pause(); };
  }, [stopFade]);

  const start = useCallback(() => {
    if (intent.current && player.current && !player.current.paused) return;
    const request = ++version.current;
    intent.current = true;
    stopFade();
    // Called directly from the opening button's click: preserves browser user activation.
    const audio = player.current ?? new Audio(birthday.music);
    player.current = audio;
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = 0;
    audio.onpause = () => { if (mounted.current) setPlaying(false); };
    setLoading(true);
    setError(false);
    const ready = () => {
      if (!mounted.current || request !== version.current || !intent.current) { audio.pause(); return; }
      setPlaying(true); setLoading(false);
      fade.current = setInterval(() => {
        audio.volume = Math.min(birthday.musicVolume, audio.volume + .025);
        if (audio.volume >= birthday.musicVolume) stopFade();
      }, 80);
    };
    const failed = () => {
      if (!mounted.current || request !== version.current) return;
      intent.current = false; setPlaying(false); setLoading(false); setError(true);
    };
    void audio.play().then(ready).catch(() => {
      if (request !== version.current || !intent.current) return;
      audio.src = birthday.fallbackMusic;
      void audio.play().then(ready).catch(failed);
    });
  }, [stopFade]);

  const toggle = useCallback(() => {
    if (!intent.current || (!loading && player.current?.paused)) { start(); return; }
    intent.current = false; version.current++; stopFade(); setLoading(false); setPlaying(false);
    const audio = player.current;
    if (!audio) return;
    fade.current = setInterval(() => {
      audio.volume = Math.max(0, audio.volume - .04);
      if (audio.volume === 0) { audio.pause(); stopFade(); }
    }, 40);
  }, [loading, start, stopFade]);

  return <MusicContext.Provider value={{playing, loading, error, start, toggle}}>{children}</MusicContext.Provider>;
}

export function MusicControl() {
  const {playing, loading, error, toggle} = useBirthdayMusic();
  return <button className={`music-control ${playing ? 'playing' : ''}`} onClick={toggle}
    aria-pressed={playing} aria-label={playing ? 'Pause birthday music' : 'Play birthday music'}>
    {playing ? <Pause size={16}/> : error ? <Volume2 size={16}/> : <Music2 size={16}/>}
    <span>{loading ? 'Starting…' : error ? 'Tap for music' : playing ? 'Music on' : 'Music off'}</span>
    <span className="equalizer" aria-hidden="true"><i/><i/><i/><i/></span>
  </button>;
}
