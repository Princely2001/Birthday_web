'use client';

import {useEffect} from 'react';
import {motion, useReducedMotion} from 'motion/react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {Sparkles, Heart} from 'lucide-react';
import {birthday} from '@/data/birthday';
import {MusicControl} from './MusicProvider';

export default function GrandReveal({
  active,
  onComplete,
}: {
  active: boolean;
  onComplete: () => void;
}) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!active) return;

    const timer = setTimeout(
      onComplete,
      reduced ? 2000 : 6500
    );

    return () => clearTimeout(timer);
  }, [active, reduced, onComplete]);

  return (
    <Dialog
      open={active}
      onOpenChange={(open) => {
        if (!open) onComplete();
      }}
    >
      <DialogContent
        className="
          grand-reveal
          !fixed
          !inset-0
          !top-0
          !left-0
          !translate-x-0
          !translate-y-0
          !w-screen
          !h-[100dvh]
          !max-w-none
          !rounded-none
          !border-0
          !bg-transparent
          !p-0
          !shadow-none
        "
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">
          Your birthday surprise
        </DialogTitle>

        <DialogDescription className="sr-only">
          A cinematic birthday reveal, followed by your memories.
        </DialogDescription>

        {/* Transparent glass tint */}
        <div className="reveal-backdrop" aria-hidden="true" />

        {/* Ambient glows */}
        <div className="reveal-glow reveal-glow-one" aria-hidden="true" />
        <div className="reveal-glow reveal-glow-two" aria-hidden="true" />

        {/* Decorative rings */}
        <motion.div
          className="reveal-ring reveal-ring-one"
          aria-hidden="true"
          initial={{opacity: 0, scale: 0.75}}
          animate={{opacity: 1, scale: 1}}
          transition={{
            duration: reduced ? 0.2 : 1.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        />

        <motion.div
          className="reveal-ring reveal-ring-two"
          aria-hidden="true"
          initial={{opacity: 0, scale: 0.7}}
          animate={{opacity: 0.7, scale: 1}}
          transition={{
            duration: reduced ? 0.2 : 2.4,
            delay: reduced ? 0 : 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        />

        {/* Small floating sparkles */}
        <div className="reveal-sparkles" aria-hidden="true">
          {Array.from({length: 12}, (_, i) => (
            <motion.span
              key={i}
              style={{
                left: `${8 + ((i * 17) % 84)}%`,
                top: `${10 + ((i * 23) % 76)}%`,
              }}
              initial={{opacity: 0, scale: 0}}
              animate={{
                opacity: [0, 0.9, 0.25],
                scale: [0, 1, 0.7],
                y: [0, -12, -20],
              }}
              transition={{
                duration: 3 + (i % 3),
                delay: reduced ? 0 : i * 0.15,
                repeat: Infinity,
                repeatType: 'mirror',
              }}
            >
              ✦
            </motion.span>
          ))}
        </div>

        {/* Main glass card */}
        <motion.div
          className="reveal-glass-card"
          initial={
            reduced
              ? {opacity: 0}
              : {
                  opacity: 0,
                  y: 35,
                  scale: 0.94,
                  filter: 'blur(15px)',
                }
          }
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
          }}
          transition={{
            duration: reduced ? 0.25 : 1.1,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <motion.div
            className="reveal-icon"
            initial={{opacity: 0, scale: 0.5, rotate: -25}}
            animate={{opacity: 1, scale: 1, rotate: 0}}
            transition={{
              delay: reduced ? 0 : 0.25,
              duration: 0.8,
            }}
          >
            <Sparkles size={18} strokeWidth={1.3} />
          </motion.div>

          <motion.p
            className="reveal-eyebrow"
            initial={{opacity: 0, y: 12}}
            animate={{opacity: 1, y: 0}}
            transition={{
              delay: reduced ? 0 : 0.4,
              duration: 0.8,
            }}
          >
            EVERY STAR TONIGHT IS FOR YOU
          </motion.p>

          <motion.p
            className="reveal-pretitle"
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{
              delay: reduced ? 0 : 1.1,
              duration: 0.9,
            }}
          >
            Happy Birthday,
          </motion.p>

          <motion.h2
            className="reveal-name"
            initial={{
              opacity: 0,
              scale: 0.82,
              filter: reduced ? 'none' : 'blur(12px)',
            }}
            animate={{
              opacity: 1,
              scale: 1,
              filter: 'blur(0px)',
            }}
            transition={{
              delay: reduced ? 0 : 1.7,
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {birthday.shortName}

            <motion.span
              animate={
                reduced
                  ? undefined
                  : {
                      scale: [1, 1.16, 1],
                    }
              }
              transition={{
                duration: 1.6,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            >
              ♡
            </motion.span>
          </motion.h2>

          <motion.div
            className="reveal-divider"
            initial={{scaleX: 0, opacity: 0}}
            animate={{scaleX: 1, opacity: 1}}
            transition={{
              delay: reduced ? 0 : 2.6,
              duration: 0.8,
            }}
          />

          <motion.p
            className="reveal-message"
            initial={{opacity: 0, y: 15}}
            animate={{opacity: 1, y: 0}}
            transition={{
              delay: reduced ? 0 : 3,
              duration: 0.9,
            }}
          >
            You deserve a whole sky of beautiful things.
          </motion.p>

          <motion.div
            className="reveal-date"
            initial={{opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            transition={{
              delay: reduced ? 0 : 3.7,
              duration: 0.8,
            }}
          >
            <span>05</span>
            <i>✦</i>
            <span>10</span>
          </motion.div>

          <motion.div
            className="reveal-heart"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{
              delay: reduced ? 0 : 4.1,
            }}
          >
            <Heart size={15} strokeWidth={1.2} />
          </motion.div>
        </motion.div>

        <div className="reveal-controls">
          <MusicControl />

          <motion.button
            type="button"
            className="skip-reveal"
            onClick={onComplete}
            initial={{opacity: 0, y: 8}}
            animate={{opacity: 1, y: 0}}
            transition={{
              delay: reduced ? 0 : 4,
              duration: 0.7,
            }}
          >
            Continue to your surprise
            <span>→</span>
          </motion.button>
        </div>
      </DialogContent>
    </Dialog>
  );
}