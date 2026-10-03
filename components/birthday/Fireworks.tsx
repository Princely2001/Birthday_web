'use client';

import { useEffect, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { birthday } from '@/data/birthday';
import { MusicControl } from './MusicProvider';

type Particle = {
  x: number;
  y: number;
  px: number;
  py: number;
  vx: number;
  vy: number;
  life: number;
  age: number;
  color: string;
  size: number;
  confetti: boolean;
};

type Rocket = {
  x: number;
  y: number;
  tx: number;
  ty: number;
  color: string;
  type: number;
};

const palette = [
  '#ffa4c4',
  '#f4d499',
  '#bda5ff',
  '#fff5ed',
  '#f874a9',
];

/**
 * Full-screen fireworks canvas.
 * Every listener and animation frame is cleaned up properly.
 */
export function FireworksCanvas({
  active,
  duration = 12000,
}: {
  active: boolean;
  duration?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active || !ref.current) return;

    const canvas = ref.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    const media = matchMedia('(prefers-reduced-motion: reduce)');

    if (media.matches) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let elapsed = 0;
    let last = 0;
    let nextLaunch = 0;
    let sequence = 0;

    let particles: Particle[] = [];
    let rockets: Rocket[] = [];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const burst = (
      x: number,
      y: number,
      color: string,
      type: number
    ) => {
      const count = width < 600 ? 55 : 105;
      const limit = width < 600 ? 450 : 950;

      for (
        let i = 0;
        i < count && particles.length < limit;
        i++
      ) {
        const angle = (i / count) * Math.PI * 2;

        let vx =
          Math.cos(angle) * (80 + Math.random() * 125);

        let vy =
          Math.sin(angle) * (80 + Math.random() * 125);

        // Heart-shaped burst
        if (type === 1) {
          vx =
            16 *
            Math.pow(Math.sin(angle), 3) *
            11;

          vy =
            -(
              13 * Math.cos(angle) -
              5 * Math.cos(2 * angle) -
              2 * Math.cos(3 * angle) -
              Math.cos(4 * angle)
            ) * 11;
        }

        // Circular burst
        if (type === 2) {
          vx = Math.cos(angle) * 180;
          vy = Math.sin(angle) * 180;
        }

        particles.push({
          x,
          y,
          px: x,
          py: y,
          vx,
          vy,
          life: 1.4 + Math.random() * 1.1,
          age: 0,
          color,
          size: 1 + Math.random() * 1.6,
          confetti: false,
        });
      }

      // Confetti particles for heart burst
      if (type === 1) {
        for (let i = 0; i < 18; i++) {
          particles.push({
            x,
            y,
            px: x,
            py: y,
            vx: (Math.random() - 0.5) * 180,
            vy: -Math.random() * 170,
            life: 3.5,
            age: 0,
            color: palette[i % palette.length],
            size: 3,
            confetti: true,
          });
        }
      }
    };

    const draw = (now: number) => {
      const dt = Math.min(
        (now - (last || now)) / 1000,
        0.04
      );

      last = now;
      elapsed += dt * 1000;

      ctx.clearRect(0, 0, width, height);

      if (
        elapsed < duration - 2600 &&
        elapsed >= nextLaunch
      ) {
        nextLaunch =
          elapsed + (width < 600 ? 470 : 320);

        const tx =
          width * (0.13 + Math.random() * 0.74);

        const ty =
          height * (0.12 + Math.random() * 0.42);

        rockets.push({
          x: width * (0.15 + Math.random() * 0.7),
          y: height + 20,
          tx,
          ty,
          color:
            palette[sequence % palette.length],
          type: sequence++ % 4,
        });
      }

      rockets = rockets.filter((rocket) => {
        const dx = rocket.tx - rocket.x;
        const dy = rocket.ty - rocket.y;
        const distance = Math.hypot(dx, dy);

        if (distance < 20) {
          burst(
            rocket.tx,
            rocket.ty,
            rocket.color,
            rocket.type
          );

          return false;
        }

        const step = Math.min(
          distance,
          650 * dt
        );

        const previousX = rocket.x;
        const previousY = rocket.y;

        rocket.x +=
          (dx / distance) * step;

        rocket.y +=
          (dy / distance) * step;

        ctx.beginPath();
        ctx.moveTo(
          previousX,
          previousY + 12
        );
        ctx.lineTo(
          rocket.x,
          rocket.y
        );

        ctx.strokeStyle = rocket.color;
        ctx.lineWidth = 1.7;
        ctx.globalAlpha = 0.85;
        ctx.stroke();

        ctx.fillStyle = '#fff4e8';

        ctx.beginPath();
        ctx.arc(
          rocket.x,
          rocket.y,
          2,
          0,
          Math.PI * 2
        );
        ctx.fill();

        return true;
      });

      particles = particles.filter(
        (particle) =>
          particle.age < particle.life
      );

      for (const particle of particles) {
        particle.age += dt;

        particle.px = particle.x;
        particle.py = particle.y;

        particle.x += particle.vx * dt;
        particle.y += particle.vy * dt;

        particle.vx *= Math.exp(
          -0.45 * dt
        );

        particle.vy +=
          (particle.confetti ? 35 : 48) *
          dt;

        ctx.globalAlpha = Math.max(
          0,
          1 -
            particle.age /
              particle.life
        );

        ctx.strokeStyle =
          particle.color;

        ctx.fillStyle =
          particle.color;

        if (particle.confetti) {
          ctx.save();

          ctx.translate(
            particle.x,
            particle.y
          );

          ctx.rotate(
            particle.age * 3
          );

          ctx.fillRect(
            -particle.size,
            -particle.size,
            particle.size * 2,
            particle.size * 0.8
          );

          ctx.restore();
        } else {
          ctx.lineWidth =
            particle.size;

          ctx.beginPath();

          ctx.moveTo(
            particle.px,
            particle.py
          );

          ctx.lineTo(
            particle.x,
            particle.y
          );

          ctx.stroke();

          ctx.beginPath();

          ctx.arc(
            particle.x,
            particle.y,
            particle.size * 0.65,
            0,
            Math.PI * 2
          );

          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;

      if (
        elapsed < duration ||
        particles.length ||
        rockets.length
      ) {
        frame =
          requestAnimationFrame(draw);
      } else {
        ctx.clearRect(
          0,
          0,
          width,
          height
        );
      }
    };

    const visibility = () => {
      cancelAnimationFrame(frame);

      last = 0;

      if (
        !document.hidden &&
        !media.matches
      ) {
        frame =
          requestAnimationFrame(draw);
      }
    };

    const reducedMotion = () => {
      cancelAnimationFrame(frame);

      ctx.clearRect(
        0,
        0,
        width,
        height
      );
    };

    resize();

    frame =
      requestAnimationFrame(draw);

    window.addEventListener(
      'resize',
      resize
    );

    document.addEventListener(
      'visibilitychange',
      visibility
    );

    media.addEventListener(
      'change',
      reducedMotion
    );

    return () => {
      cancelAnimationFrame(frame);

      window.removeEventListener(
        'resize',
        resize
      );

      document.removeEventListener(
        'visibilitychange',
        visibility
      );

      media.removeEventListener(
        'change',
        reducedMotion
      );

      ctx.clearRect(
        0,
        0,
        width,
        height
      );

      particles = [];
      rockets = [];
    };
  }, [active, duration]);

  return (
    <canvas
      ref={ref}
      className="
        fireworks-canvas
        pointer-events-none
        absolute
        inset-0
        z-[1]
        h-full
        w-full
      "
      aria-hidden="true"
    />
  );
}

export default function Fireworks({
  active,
  onClose,
}: {
  active: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!active) return;

    const id = setTimeout(
      onClose,
      12000
    );

    return () => clearTimeout(id);
  }, [active, onClose]);

  return (
    <Dialog
      open={active}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="
          celebration
          fireworks-dialog

          !fixed
          !inset-0
          !left-0
          !top-0

          !z-[100]

          !h-[100dvh]
          !w-screen
          !max-w-none

          !translate-x-0
          !translate-y-0

          !overflow-hidden

          !rounded-none
          !border-0
          !p-0

          !shadow-none
        "
      >
        <DialogTitle className="sr-only">
          Happy birthday{' '}
          {birthday.shortName}
        </DialogTitle>

        <DialogDescription className="sr-only">
          A sky full of birthday
          fireworks. Close whenever
          you like.
        </DialogDescription>

        <div
          className="
            absolute
            inset-0
            z-0
            bg-[#100916]
          "
          aria-hidden="true"
        />

        <div
          className="
            celebration-aurora
            pointer-events-none
            absolute
            inset-0
            z-[1]
          "
          aria-hidden="true"
        />

        <FireworksCanvas
          active={active}
        />

        <div
          className="
            absolute
            left-4
            top-4
            z-20

            sm:left-6
            sm:top-6
          "
        >
          <MusicControl />
        </div>

        <button
          autoFocus
          type="button"
          className="
            round-button
            celebration-close

            absolute
            right-4
            top-4
            z-30

            flex
            h-11
            w-11
            items-center
            justify-center

            rounded-full
            border
            border-white/20

            bg-black/20

            text-white

            backdrop-blur-md

            transition

            hover:bg-white/15

            sm:right-6
            sm:top-6
          "
          onClick={onClose}
          aria-label="Close celebration"
        >
          <X size={20} />
        </button>

        <div
          className="
            celebration-copy

            pointer-events-none

            absolute
            inset-0
            z-10

            flex
            flex-col
            items-center
            justify-center

            px-6
            text-center
          "
        >
          <p
            className="
              eyebrow

              mb-5

              text-xs
              tracking-[0.25em]

              text-white/70

              sm:text-sm
            "
          >
            05 · 10 — TODAY IS ALL
            ABOUT YOU
          </p>

          <h2
            className="
              text-4xl
              leading-tight

              text-white

              sm:text-5xl
              md:text-6xl
              lg:text-7xl
            "
          >
            Happy Birthday,
            <br />

            <em>
              {birthday.shortName}!
            </em>
          </h2>

          <p
            className="
              mt-6
              max-w-xl

              text-base

              text-white/80

              sm:text-lg
            "
          >
            May every wish you make
            come true. ♡
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}