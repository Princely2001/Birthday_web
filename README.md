# Ovini's Birthday Surprise — Next.js source

A complete, standalone Next.js App Router project with React, TypeScript, Tailwind CSS, Motion for React, Lucide icons and accessible Radix dialogs.

## Start on your computer

Install Node.js 22.13 or newer, then open a terminal in this folder:

```bash
npm install
npm run dev
```

Visit http://localhost:3000.

For a production build:

```bash
npm run typecheck
npm run build
npm start
```

This download runs directly with Next.js. It does not require Sites or Vinext.

## What happens when she opens the surprise

1. Clicking **Open your surprise** immediately starts the included birthday instrumental from the click event.
2. The intro expands and fades into a cinematic reveal.
3. Warm light blooms, expanding light rings, animated birthday text, rockets, heart-shaped fireworks and confetti appear.
4. After approximately 6.5 seconds the main page appears. Fireworks continue across the hero for another 4 seconds.
5. The birthday music loops through the entire experience, including photo dialogs, the love letter, candles and final surprise.
6. The floating music control pauses or resumes it, with volume fades. Replaying the surprise does not interrupt an already playing track.

The visitor can skip the opening animation with **Continue to your surprise** or Escape. With reduced motion enabled, the opening is shorter, fireworks and background movement are disabled, and all content remains available.

## Replace the eight photos

Replace these existing files with your own JPEGs, keeping the filenames:

```text
public/images/ovini-01.jpg
public/images/ovini-02.jpg
public/images/ovini-03.jpg
public/images/ovini-04.jpg
public/images/ovini-05.jpg
public/images/ovini-06.jpg
public/images/ovini-07.jpg
public/images/ovini-08.jpg
```

The included images are labelled placeholders. Photo 01 is also the hero portrait; photo 08 is also used for the final surprise. Portrait crops work well, especially for these two. Next.js Image handles responsive sizing and optimization.

## Personalize the content

Edit `data/birthday.ts` for the name, birthday date, timezone, eight captions, timeline, love reasons, letter paragraphs, audio paths and volume. The current countdown uses Sri Lankan time for 5 October and rolls over to the next birthday after that day.

## Birthday music

A 42.8-second stereo instrumental arrangement of the birthday melody is included. It combines a music-box melody, soft chord accompaniment, bass and light percussion, and loops automatically after the opening click. It is generated audio, not a singer's recording.

To use your preferred recording, replace `public/audio/birthday-song.mp3`. Use a track you have permission to share. Keep the filename, or change the `music` path in `data/birthday.ts`. The bundled WAV is a fallback if the primary file cannot play. Set `musicVolume` between 0 and 1.

Audio starts after a user gesture. Browsers and device settings may still block sound; **Tap for music** lets the visitor retry. Reloading starts a fresh visit and requires another opening click. A visitor's pause choice is respected during that visit.

## Main components

- `Experience.tsx`: intro, reveal flow, hero and page composition.
- `GrandReveal.tsx`: timed cinematic opening and skip action.
- `Fireworks.tsx`: bounded canvas engine with rockets, heart bursts, rings and confetti.
- `MusicProvider.tsx`: shared looping audio and fade controls.
- `Primitives.tsx`: magnetic buttons, scroll reveals and responsive photos.
- `Gallery.tsx`: eight images and swipe/keyboard lightbox.
- `Story.tsx`: scroll-lit timeline and animated reasons.
- `Surprises.tsx`: letter, candles, final reveal and replay.
- `app/globals.css`: responsive layout and all visual effects.

## Animation and performance

Fireworks use elapsed time rather than fixed frame steps, cap particle counts on phones, stop after the celebration, pause drawing in hidden tabs and clean up their listeners and animation frames. Background effects use CSS transforms and opacity. Desktop pointer effects are disabled on touchscreens. Motion respects `prefers-reduced-motion`.

The experience retains the existing countdown, memory lightbox, timeline, love letter, candles, celebration buttons, final photo reveal and hidden five-tap heart message.

## Verification

TypeScript and production builds are checked before delivery. The layout includes breakpoints for small phones through desktop. No automated browser interaction or visual screenshot testing was performed in this environment; preview on your own phone after replacing the photos and music.
