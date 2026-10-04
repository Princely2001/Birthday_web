'use client';

import {
  useState,
  useCallback,
  useEffect,
  useRef,
  type PointerEvent as ReactPointerEvent,
} from 'react';

import {
  AnimatePresence,
  motion,
  MotionConfig,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';

import {
  Heart,
  Sparkles,
  ChevronDown,
  Star,
  WandSparkles,
} from 'lucide-react';

import { birthday } from '@/data/birthday';

import {
  Photo,
  MagicButton,
  Eyebrow,
} from './Primitives';

import Countdown from './Countdown';
import Gallery from './Gallery';
import Story from './Story';

import Fireworks, {
  FireworksCanvas,
} from './Fireworks';

import GrandReveal from './GrandReveal';

import {
  MusicProvider,
  MusicControl,
  useBirthdayMusic,
} from './MusicProvider';

import {
  LoveLetter,
  BirthdayCake,
  FinalSurprise,
  Ending,
} from './Surprises';


/* =========================================================
   TYPES
========================================================= */

type Phase =
  | 'intro'
  | 'reveal'
  | 'explore';

type TrailPoint = {
  x: number;
  y: number;
  id: number;
};


/* =========================================================
   BACKGROUND
========================================================= */

function Background() {
  const reduced = useReducedMotion();

  const [trail, setTrail] =
    useState<TrailPoint[]>([]);

  const serial = useRef(0);

  useEffect(() => {
    if (reduced) return;

    const finePointer =
      window.matchMedia(
        '(pointer:fine)',
      ).matches;

    if (!finePointer) return;

    let last = 0;

    const move = (
      event: globalThis.PointerEvent,
    ) => {
      const now = performance.now();

      if (now - last < 105) {
        return;
      }

      last = now;

      setTrail((current) => [
        ...current.slice(-8),
        {
          x: event.clientX,
          y: event.clientY,
          id: serial.current++,
        },
      ]);
    };

    window.addEventListener(
      'pointermove',
      move,
    );

    return () => {
      window.removeEventListener(
        'pointermove',
        move,
      );
    };
  }, [reduced]);


  return (
    <>
      <div
        className="ambient"
        aria-hidden="true"
      >
        {/* MAIN GLOW */}

        <motion.div
          className="ambient-glow"
          animate={
            reduced
              ? undefined
              : {
                  scale: [
                    1,
                    1.07,
                    1.03,
                    1,
                  ],
                  opacity: [
                    0.45,
                    0.8,
                    0.62,
                    0.45,
                  ],
                }
          }
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />


        {/* AURORAS */}

        <motion.div
          className="
            aurora
            aurora-pink
          "
          animate={
            reduced
              ? undefined
              : {
                  x: [
                    '-5%',
                    '10%',
                    '-2%',
                    '-5%',
                  ],
                  y: [
                    '0%',
                    '-10%',
                    '7%',
                    '0%',
                  ],
                  scale: [
                    1,
                    1.12,
                    1.03,
                    1,
                  ],
                  rotate: [
                    0,
                    8,
                    -5,
                    0,
                  ],
                }
          }
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.div
          className="
            aurora
            aurora-violet
          "
          animate={
            reduced
              ? undefined
              : {
                  x: [
                    '4%',
                    '-10%',
                    '7%',
                    '4%',
                  ],
                  y: [
                    '0%',
                    '10%',
                    '-7%',
                    '0%',
                  ],
                  scale: [
                    1,
                    1.08,
                    1.15,
                    1,
                  ],
                  rotate: [
                    0,
                    -7,
                    5,
                    0,
                  ],
                }
          }
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />


        {/* GRID */}

        <div className="ambient-grid" />


        {/* STARS */}

        <div className="background-stars">
          {Array.from(
            {
              length: 42,
            },
            (_, index) => (
              <i
                key={index}
                style={{
                  left: `${
                    (index * 37) % 100
                  }%`,
                  top: `${
                    (index * 23) % 100
                  }%`,
                  animationDelay: `${
                    index * 0.38
                  }s`,
                  animationDuration: `${
                    3 +
                    (index % 5)
                  }s`,
                }}
              />
            ),
          )}
        </div>
      </div>


      {/* FLOATING SYMBOLS */}

      <div
        className="floating-hearts"
        aria-hidden="true"
      >
        {Array.from(
          {
            length: 12,
          },
          (_, index) => (
            <span
              key={index}
              style={{
                left: `${
                  4 +
                  index * 8.1
                }%`,
                animationDelay: `${
                  index * -2.4
                }s`,
                animationDuration: `${
                  18 +
                  (index % 4) * 4
                }s`,
              }}
            >
              {
                index % 4 === 0
                  ? '✧'
                  : index % 3 === 0
                    ? '⋆'
                    : '♡'
              }
            </span>
          ),
        )}
      </div>


      {/* POINTER TRAIL */}

      <div
        className="pointer-trail"
        aria-hidden="true"
      >
        <AnimatePresence>
          {trail.map((point) => (
            <motion.span
              key={point.id}
              style={{
                left: point.x,
                top: point.y,
              }}
              initial={{
                opacity: 0.9,
                scale: 0.4,
                y: 0,
                rotate: -12,
              }}
              animate={{
                opacity: 0,
                scale: 1.5,
                y: -52,
                rotate: 22,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 1.05,
                ease: 'easeOut',
              }}
            >
              ♡
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}


/* =========================================================
   INTRO DECORATION
========================================================= */

function IntroDecoration() {
  const reduced =
    useReducedMotion();

  return (
    <div
      className="intro-decoration"
      aria-hidden="true"
    >
      <motion.span
        className="
          intro-spark
          intro-spark-one
        "
        animate={
          reduced
            ? undefined
            : {
                rotate: 360,
                scale: [
                  1,
                  1.35,
                  1,
                ],
              }
        }
        transition={{
          rotate: {
            duration: 16,
            repeat: Infinity,
            ease: 'linear',
          },

          scale: {
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
      >
        ✧
      </motion.span>

      <motion.span
        className="
          intro-spark
          intro-spark-two
        "
        animate={
          reduced
            ? undefined
            : {
                y: [
                  0,
                  -12,
                  0,
                ],

                rotate: [
                  0,
                  -12,
                  0,
                ],
              }
        }
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        ♡
      </motion.span>

      <motion.span
        className="
          intro-spark
          intro-spark-three
        "
        animate={
          reduced
            ? undefined
            : {
                y: [
                  0,
                  9,
                  0,
                ],

                x: [
                  0,
                  5,
                  0,
                ],
              }
        }
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        ⋆
      </motion.span>
    </div>
  );
}


/* =========================================================
   HERO PORTRAIT
========================================================= */

function HeroPortrait({
  visible,
}: {
  visible: boolean;
}) {
  const reduced =
    useReducedMotion();

  const mouseX =
    useMotionValue(0);

  const mouseY =
    useMotionValue(0);

  const rotateX =
    useSpring(
      useTransform(
        mouseY,
        [-0.5, 0.5],
        [6, -6],
      ),
      {
        stiffness: 120,
        damping: 20,
      },
    );

  const rotateY =
    useSpring(
      useTransform(
        mouseX,
        [-0.5, 0.5],
        [-7, 7],
      ),
      {
        stiffness: 120,
        damping: 20,
      },
    );


  const handlePointerMove = (
    event:
      ReactPointerEvent<HTMLDivElement>,
  ) => {
    if (reduced) return;

    if (
      window.matchMedia(
        '(pointer:coarse)',
      ).matches
    ) {
      return;
    }

    const rect =
      event.currentTarget
        .getBoundingClientRect();

    const x =
      (
        event.clientX -
        rect.left
      ) /
        rect.width -
      0.5;

    const y =
      (
        event.clientY -
        rect.top
      ) /
        rect.height -
      0.5;

    mouseX.set(x);
    mouseY.set(y);
  };


  const resetTilt = () => {
    mouseX.set(0);
    mouseY.set(0);
  };


  return (
    <motion.div
      className="hero-visual"
      initial={false}
      animate={{
        opacity:
          visible
            ? 1
            : 0,

        scale:
          visible
            ? 1
            : 0.91,

        y:
          visible
            ? 0
            : 50,
      }}
      transition={{
        duration: 1.4,
        delay: 0.3,
        ease: [
          0.16,
          1,
          0.3,
          1,
        ],
      }}
    >
      <motion.div
        className="portrait-scene"
        onPointerMove={
          handlePointerMove
        }
        onPointerLeave={
          resetTilt
        }
        style={
          reduced
            ? undefined
            : {
                rotateX,
                rotateY,
              }
        }
      >
        {/* GLOW */}

        <motion.div
          className="portrait-glow"
          animate={
            reduced
              ? undefined
              : {
                  scale: [
                    1,
                    1.08,
                    1,
                  ],

                  opacity: [
                    0.45,
                    0.8,
                    0.45,
                  ],
                }
          }
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />


        {/* ORBIT */}

        <motion.div
          className="
            portrait-orbit
            portrait-orbit-one
          "
          animate={
            reduced
              ? undefined
              : {
                  rotate: 360,
                }
          }
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <span />
          <span />
        </motion.div>

        <motion.div
          className="
            portrait-orbit
            portrait-orbit-two
          "
          animate={
            reduced
              ? undefined
              : {
                  rotate: -360,
                }
          }
          transition={{
            duration: 34,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <span />
        </motion.div>


        {/* PHOTO */}

        <motion.div
          className="portrait-float"
          animate={
            reduced
              ? undefined
              : {
                  y: [
                    0,
                    -12,
                    0,
                  ],

                  rotateZ: [
                    -2,
                    -0.6,
                    -2,
                  ],
                }
          }
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <motion.div
            className="hero-photo"
            whileHover={
              reduced
                ? undefined
                : {
                    scale: 1.025,
                  }
            }
            transition={{
              type: 'spring',
              stiffness: 180,
              damping: 18,
            }}
          >
            <Photo
              index={0}
              priority
            />

            <div
              className="
                photo-light-sweep
              "
            />
          </motion.div>


          {/* NOTE */}

          <motion.span
            className="
              hero-photo-note
            "
            animate={
              reduced
                ? undefined
                : {
                    y: [
                      0,
                      -3,
                      0,
                    ],
                  }
            }
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            my favourite kind
            of magic.
          </motion.span>


          {/* STAR */}

          <motion.span
            className="hero-star"
            animate={
              reduced
                ? undefined
                : {
                    rotate: 360,

                    scale: [
                      1,
                      1.3,
                      1,
                    ],
                  }
            }
            transition={{
              rotate: {
                duration: 12,
                repeat: Infinity,
                ease: 'linear',
              },

              scale: {
                duration: 2.7,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }}
          >
            ✧
          </motion.span>


          {/* SEAL */}

          <motion.span
            className="hero-seal"
            animate={
              reduced
                ? undefined
                : {
                    rotate: [
                      6,
                      10,
                      6,
                    ],
                  }
            }
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            made of
            <br />

            <em>
              stardust
            </em>

            <Heart
              size={15}
              strokeWidth={1.2}
            />
          </motion.span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}


/* =========================================================
   BIRTHDAY EXPERIENCE
========================================================= */

function BirthdayExperience() {
  const [
    phase,
    setPhase,
  ] =
    useState<Phase>(
      'intro',
    );

  const [
    celebrating,
    setCelebrating,
  ] =
    useState(false);

  const [
    afterglow,
    setAfterglow,
  ] =
    useState(false);

  const [
    stage,
    setStage,
  ] =
    useState(false);

  const afterTimer =
    useRef<
      ReturnType<
        typeof setTimeout
      > | null
    >(null);

  const reduced =
    useReducedMotion();

  const {
    start,
  } =
    useBirthdayMusic();

  const opened =
    phase !== 'intro';


  /* =======================================================
     SCROLL MOTION
  ======================================================= */

  const {
    scrollY,
    scrollYProgress,
  } =
    useScroll();


  const progress =
    useSpring(
      scrollYProgress,
      {
        stiffness: 120,
        damping: 28,
        mass: 0.25,
      },
    );


  const heroCopyY =
    useTransform(
      scrollY,
      [
        0,
        650,
      ],
      [
        0,
        reduced
          ? 0
          : 80,
      ],
    );


  const heroVisualY =
    useTransform(
      scrollY,
      [
        0,
        650,
      ],
      [
        0,
        reduced
          ? 0
          : 45,
      ],
    );


  const heroOpacity =
    useTransform(
      scrollY,
      [
        0,
        520,
      ],
      [
        1,
        0.18,
      ],
    );


  const orbitScale =
    useTransform(
      scrollY,
      [
        0,
        600,
      ],
      [
        1,
        1.18,
      ],
    );


  /* =======================================================
     CALLBACKS
  ======================================================= */

  const close =
    useCallback(
      () => {
        setCelebrating(
          false,
        );
      },
      [],
    );


  const celebrate =
    useCallback(
      () => {
        setCelebrating(
          true,
        );
      },
      [],
    );


  const onBirthday =
    useCallback(
      () => {
        if (
          phase ===
            'explore' &&
          !afterglow
        ) {
          setCelebrating(
            true,
          );
        }
      },
      [
        phase,
        afterglow,
      ],
    );


  /* =======================================================
     INTRO TIMER
  ======================================================= */

  useEffect(() => {
    if (
      phase !== 'intro'
    ) {
      return;
    }

    setStage(false);

    const timer =
      setTimeout(
        () => {
          setStage(
            true,
          );
        },

        reduced
          ? 0
          : 1250,
      );

    return () =>
      clearTimeout(
        timer,
      );
  }, [
    phase,
    reduced,
  ]);


  /* =======================================================
     BODY SCROLL LOCK
  ======================================================= */

  useEffect(() => {
    document.body.style.overflow =
      phase === 'explore'
        ? ''
        : 'hidden';

    return () => {
      document.body.style.overflow =
        '';
    };
  }, [
    phase,
  ]);


  /* =======================================================
     CLEANUP
  ======================================================= */

  useEffect(() => {
    return () => {
      if (
        afterTimer.current
      ) {
        clearTimeout(
          afterTimer.current,
        );
      }
    };
  }, []);


  /* =======================================================
     OPEN
  ======================================================= */

  const open = () => {
    start();

    setPhase(
      'reveal',
    );

    setAfterglow(
      true,
    );

    window.scrollTo({
      top: 0,
      behavior:
        'instant',
    });
  };


  /* =======================================================
     REVEAL COMPLETE
  ======================================================= */

  const complete =
    useCallback(
      () => {
        setPhase(
          'explore',
        );

        if (
          afterTimer.current
        ) {
          clearTimeout(
            afterTimer.current,
          );
        }

        afterTimer.current =
          setTimeout(
            () => {
              setAfterglow(
                false,
              );
            },
            4200,
          );
      },
      [],
    );


  /* =======================================================
     REPLAY
  ======================================================= */

  const replay =
    () => {
      if (
        afterTimer.current
      ) {
        clearTimeout(
          afterTimer.current,
        );
      }

      setAfterglow(
        false,
      );

      setCelebrating(
        false,
      );

      setPhase(
        'intro',
      );

      window.scrollTo({
        top: 0,
        behavior:
          'instant',
      });
    };


  /* =======================================================
     UI
  ======================================================= */

  return (
    <>
      <Background />


      {/* ===================================================
          READING PROGRESS
      =================================================== */}

      <motion.div
        className="
          reading-progress
        "
        style={{
          scaleX:
            progress,

          transformOrigin:
            '0% 50%',
        }}
        aria-hidden="true"
      />


      {/* ===================================================
          INTRO
      =================================================== */}

      <AnimatePresence
        mode="wait"
      >
        {
          phase ===
            'intro' && (
            <motion.div
              key="intro"
              className="
                intro
                upgraded-intro
              "
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={
                reduced
                  ? {
                      opacity: 0,
                    }
                  : {
                      opacity: 0,

                      scale:
                        1.12,

                      filter:
                        'blur(18px)',
                    }
              }
              transition={{
                duration:
                  reduced
                    ? 0.2
                    : 0.9,

                ease: [
                  0.16,
                  1,
                  0.3,
                  1,
                ],
              }}
            >
              <IntroDecoration />


              {/* TOP TEXT */}

              <motion.div
                className="intro-top"
                initial={
                  reduced
                    ? false
                    : {
                        opacity: 0,
                        y: -20,
                      }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.9,
                  delay: 0.15,
                }}
              >
                <span>
                  AN OCTOBER
                  LOVE LETTER
                </span>

                <span>
                  FOR YOU,
                  ALWAYS
                </span>
              </motion.div>


              {/* CINEMATIC BACKDROP */}

              <motion.div
                className="
                  intro-halo
                "
                aria-hidden="true"
                animate={
                  reduced
                    ? undefined
                    : {
                        scale: [
                          1,
                          1.1,
                          1,
                        ],

                        rotate: [
                          0,
                          3,
                          -3,
                          0,
                        ],

                        opacity: [
                          0.55,
                          0.9,
                          0.55,
                        ],
                      }
                }
                transition={{
                  duration: 9,
                  repeat:
                    Infinity,
                  ease:
                    'easeInOut',
                }}
              />


              <motion.div
                className="
                  intro-ring
                  intro-ring-one
                "
                animate={
                  reduced
                    ? undefined
                    : {
                        rotate: 360,
                      }
                }
                transition={{
                  duration: 28,
                  repeat:
                    Infinity,
                  ease: 'linear',
                }}
              />

              <motion.div
                className="
                  intro-ring
                  intro-ring-two
                "
                animate={
                  reduced
                    ? undefined
                    : {
                        rotate: -360,
                      }
                }
                transition={{
                  duration: 38,
                  repeat:
                    Infinity,
                  ease: 'linear',
                }}
              />


              {/* DATE ORBIT */}

              <motion.div
                className="
                  intro-orbit
                "
                initial={
                  reduced
                    ? false
                    : {
                        opacity: 0,
                        scale:
                          0.75,
                        rotate:
                          -15,
                      }
                }
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                }}
                transition={{
                  duration:
                    1.1,

                  delay:
                    0.25,

                  ease: [
                    0.16,
                    1,
                    0.3,
                    1,
                  ],
                }}
              >
                <span>
                  05
                  <i>
                    ·
                  </i>
                  10
                </span>

                <motion.div
                  animate={
                    reduced
                      ? undefined
                      : {
                          scale: [
                            1,
                            1.19,
                            1,
                          ],
                        }
                  }
                  transition={{
                    duration: 2,
                    repeat:
                      Infinity,
                    ease:
                      'easeInOut',
                  }}
                >
                  <Heart
                    strokeWidth={
                      1
                    }
                  />
                </motion.div>
              </motion.div>


              {/* EYEBROW */}

              <motion.p
                className="eyebrow"
                initial={
                  reduced
                    ? false
                    : {
                        opacity: 0,
                        y: 14,
                      }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay:
                    0.45,

                  duration:
                    0.8,
                }}
              >
                SOMETHING
                BEAUTIFUL
                HAPPENED ON
                THIS DAY
              </motion.p>


              {/* TITLE */}

              <motion.h1
                className="
                  intro-title
                "
                initial={
                  reduced
                    ? false
                    : {
                        opacity: 0,
                        y: 45,

                        filter:
                          'blur(12px)',
                      }
                }
                animate={{
                  opacity: 1,
                  y: 0,

                  filter:
                    'blur(0px)',
                }}
                transition={{
                  delay: 0.55,
                  duration: 1.2,

                  ease: [
                    0.16,
                    1,
                    0.3,
                    1,
                  ],
                }}
              >
                <span>
                  The world got
                </span>

                <br />

                <motion.em
                  initial={
                    reduced
                      ? false
                      : {
                          opacity:
                            0,

                          scale:
                            0.9,

                          y: 20,
                        }
                  }
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.9,
                    duration: 1,
                    ease: [
                      0.16,
                      1,
                      0.3,
                      1,
                    ],
                  }}
                >
                  Ovini.
                </motion.em>
              </motion.h1>


              {/* SUBTITLE */}

              <motion.p
                className="
                  intro-subtitle
                "
                initial={false}
                animate={{
                  opacity:
                    stage
                      ? 1
                      : 0,

                  y:
                    stage
                      ? 0
                      : 15,
                }}
                transition={{
                  duration:
                    0.8,
                }}
              >
                And mine became a
                little more
                magical.
              </motion.p>


              {/* BUTTON */}

              <motion.div
                className="
                  intro-action
                "
                initial={
                  false
                }
                animate={{
                  opacity:
                    stage
                      ? 1
                      : 0,

                  y:
                    stage
                      ? 0
                      : 16,

                  scale:
                    stage
                      ? 1
                      : 0.95,
                }}
                transition={{
                  duration: 0.8,

                  ease: [
                    0.16,
                    1,
                    0.3,
                    1,
                  ],
                }}
                whileHover={
                  reduced
                    ? undefined
                    : {
                        scale:
                          1.025,
                      }
                }
                whileTap={{
                  scale:
                    0.97,
                }}
              >
                <div
                  className="
                    magic-button-shell
                  "
                >
                  <motion.span
                    className="
                      button-orbit
                    "
                    animate={
                      reduced
                        ? undefined
                        : {
                            rotate:
                              360,
                          }
                    }
                    transition={{
                      duration: 6,
                      repeat:
                        Infinity,
                      ease:
                        'linear',
                    }}
                  />

                  <MagicButton
                    disabled={
                      !stage
                    }
                    onClick={
                      open
                    }
                  >
                    <span
                      className="
                        button-content
                      "
                    >
                      Open your
                      surprise

                      <Sparkles
                        size={
                          15
                        }
                      />
                    </span>
                  </MagicButton>
                </div>
              </motion.div>


              <motion.p
                className="
                  sound-hint
                "
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity:
                    stage
                      ? 0.72
                      : 0,
                }}
                transition={{
                  delay: 0.2,
                }}
              >
                A little birthday
                music begins when
                you open ♡
              </motion.p>


              <motion.span
                className="
                  intro-bottom
                "
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity:
                    stage
                      ? 1
                      : 0,
                }}
                transition={{
                  delay: 0.4,
                  duration: 1,
                }}
              >
                A LITTLE LOVE.
                A LITTLE MAGIC.
                ALL FOR YOU.
              </motion.span>
            </motion.div>
          )
        }
      </AnimatePresence>


      {/* ===================================================
          MAIN EXPERIENCE
      =================================================== */}

      <main
        aria-hidden={
          phase !==
          'explore'
        }
        inert={
          phase !==
          'explore'
        }
        className={
          opened
            ? 'experience open'
            : 'experience'
        }
      >
        {/* HEADER */}

        <motion.header
          className="
            page-header
            glass-header
          "
          initial={false}
          animate={{
            opacity:
              phase ===
              'explore'
                ? 1
                : 0,

            y:
              phase ===
              'explore'
                ? 0
                : -22,
          }}
          transition={{
            duration: 0.9,
            delay: 0.15,
          }}
        >
          <a
            href="#hero"
            className="wordmark"
          >
            For Ovini

            <motion.span
              animate={
                reduced
                  ? undefined
                  : {
                      scale: [
                        1,
                        1.16,
                        1,
                      ],
                    }
              }
              transition={{
                duration: 2,
                repeat:
                  Infinity,
              }}
            >
              ♡
            </motion.span>
          </a>

          <span
            className="
              header-center
            "
          >
            A BIRTHDAY
            LOVE STORY
          </span>

          <a
            className="
              header-date
            "
            href="#wish"
          >
            05 OCTOBER

            <motion.span
              animate={
                reduced
                  ? undefined
                  : {
                      rotate: [
                        0,
                        20,
                        -15,
                        0,
                      ],

                      scale: [
                        1,
                        1.2,
                        1,
                      ],
                    }
              }
              transition={{
                duration: 4,
                repeat:
                  Infinity,
              }}
            >
              <Sparkles
                size={14}
              />
            </motion.span>
          </a>
        </motion.header>


        {/* =================================================
            HERO
        ================================================= */}

        <section
          id="hero"
          className="
            hero
            section-width
          "
        >
          {/* HUGE BACKGROUND WORD */}

          <motion.div
            className="
              hero-background-word
            "
            aria-hidden="true"
            style={{
              y:
                heroCopyY,
            }}
          >
            LOVE
          </motion.div>


          {/* HERO ORBIT */}

          <motion.div
            className="
              hero-orbit
            "
            aria-hidden="true"
            style={{
              scale:
                orbitScale,
            }}
            animate={
              reduced
                ? undefined
                : {
                    rotate: 360,
                  }
            }
            transition={{
              duration: 48,
              repeat:
                Infinity,
              ease: 'linear',
            }}
          />


          {/* HERO COPY */}

          <motion.div
            className="
              hero-copy
            "
            style={{
              y:
                heroCopyY,
            }}
            initial={
              false
            }
            animate={{
              opacity:
                phase ===
                'explore'
                  ? 1
                  : 0,

              x:
                phase ===
                'explore'
                  ? 0
                  : -38,
            }}
            transition={{
              duration:
                1.2,

              delay:
                0.08,

              ease: [
                0.16,
                1,
                0.3,
                1,
              ],
            }}
          >
            <motion.div
              initial={{
                opacity: 0,
                y: 16,
              }}
              animate={
                phase ===
                'explore'
                  ? {
                      opacity: 1,
                      y: 0,
                    }
                  : {}
              }
              transition={{
                delay:
                  0.35,
              }}
            >
              <Eyebrow>
                TO MY
                FAVOURITE PERSON
              </Eyebrow>
            </motion.div>


            <motion.p
              className="
                hero-greeting
              "
              initial={{
                opacity: 0,
                y: 18,
              }}
              animate={
                phase ===
                'explore'
                  ? {
                      opacity: 1,
                      y: 0,
                    }
                  : {}
              }
              transition={{
                delay:
                  0.48,
              }}
            >
              Happy Birthday,
            </motion.p>


            {/* NAME */}

            <motion.h1
              className="
                shimmer-name
              "
              initial={{
                opacity: 0,
                y: 42,

                filter:
                  'blur(10px)',
              }}
              animate={
                phase ===
                'explore'
                  ? {
                      opacity: 1,
                      y: 0,

                      filter:
                        'blur(0px)',
                    }
                  : {}
              }
              transition={{
                delay:
                  0.58,

                duration:
                  1.05,

                ease: [
                  0.16,
                  1,
                  0.3,
                  1,
                ],
              }}
            >
              {
                birthday.shortName
              }

              <motion.span
                initial={{
                  opacity: 0,
                  x: -10,
                }}
                animate={
                  phase ===
                  'explore'
                    ? {
                        opacity: 1,
                        x: 0,
                      }
                    : {}
                }
                transition={{
                  delay:
                    0.9,
                }}
              >
                Dissanayake
              </motion.span>
            </motion.h1>


            {/* MESSAGE */}

            <motion.p
              className="
                hero-message
              "
              initial={{
                opacity: 0,
                y: 18,
              }}
              animate={
                phase ===
                'explore'
                  ? {
                      opacity: 1,
                      y: 0,
                    }
                  : {}
              }
              transition={{
                delay:
                  0.78,
              }}
            >
              To the girl who
              makes ordinary
              days
              <br />
              feel a little
              more magical.
            </motion.p>


            {/* DATE CARD */}

            <motion.div
              className="
                hero-date
                modern-date-card
              "
              initial={{
                opacity: 0,
                y: 28,
                scale: 0.95,
              }}
              animate={
                phase ===
                'explore'
                  ? {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }
                  : {}
              }
              transition={{
                delay:
                  0.92,

                duration:
                  0.75,

                ease: [
                  0.16,
                  1,
                  0.3,
                  1,
                ],
              }}
              whileHover={
                reduced
                  ? undefined
                  : {
                      y: -5,
                      scale:
                        1.015,
                    }
              }
            >
              <motion.span
                className="
                  date-number
                "
                animate={
                  reduced
                    ? undefined
                    : {
                        y: [
                          0,
                          -3,
                          0,
                        ],
                      }
                }
                transition={{
                  duration: 3,
                  repeat:
                    Infinity,
                  ease:
                    'easeInOut',
                }}
              >
                05
              </motion.span>

              <div
                className="
                  date-copy
                "
              >
                OCTOBER

                <br />

                <small>
                  A day worth
                  celebrating.
                </small>
              </div>

              <motion.div
                className="
                  date-heart
                "
                animate={
                  reduced
                    ? undefined
                    : {
                        scale: [
                          1,
                          1.18,
                          1,
                          1.1,
                          1,
                        ],
                      }
                }
                transition={{
                  duration:
                    2.3,

                  repeat:
                    Infinity,

                  repeatDelay:
                    1.5,
                }}
              >
                <Heart
                  size={22}
                  strokeWidth={
                    1
                  }
                />
              </motion.div>

              <span
                className="
                  date-shine
                "
                aria-hidden="true"
              />
            </motion.div>


            {/* CTA */}

            <motion.div
              className="
                hero-celebrate
              "
              initial={{
                opacity: 0,
                y: 18,
              }}
              animate={
                phase ===
                'explore'
                  ? {
                      opacity: 1,
                      y: 0,
                    }
                  : {}
              }
              transition={{
                delay:
                  1.05,
              }}
            >
              <div
                className="
                  magic-button-shell
                "
              >
                <motion.span
                  className="
                    button-orbit
                  "
                  animate={
                    reduced
                      ? undefined
                      : {
                          rotate:
                            360,
                        }
                  }
                  transition={{
                    duration: 7,
                    repeat:
                      Infinity,
                    ease:
                      'linear',
                  }}
                />

                <MagicButton
                  onClick={
                    celebrate
                  }
                >
                  <span
                    className="
                      button-content
                    "
                  >
                    Light up
                    the sky

                    <WandSparkles
                      size={16}
                    />
                  </span>
                </MagicButton>
              </div>
            </motion.div>


            {/* SCROLL */}

            <motion.a
              className="
                scroll-hint
              "
              href="#memories"
              initial={{
                opacity: 0,
              }}
              animate={
                phase ===
                'explore'
                  ? {
                      opacity: 1,
                    }
                  : {}
              }
              transition={{
                delay:
                  1.25,
              }}
            >
              <span>
                YOUR STORY,
                OUR MEMORIES
              </span>

              <motion.span
                animate={
                  reduced
                    ? undefined
                    : {
                        y: [
                          0,
                          6,
                          0,
                        ],
                      }
                }
                transition={{
                  duration:
                    1.5,

                  repeat:
                    Infinity,

                  ease:
                    'easeInOut',
                }}
              >
                <ChevronDown
                  size={18}
                />
              </motion.span>
            </motion.a>
          </motion.div>


          {/* HERO PHOTO */}

          <motion.div
            style={{
              y:
                heroVisualY,

              opacity:
                phase ===
                'explore'
                  ? heroOpacity
                  : 0,
            }}
            className="
              hero-visual-wrapper
            "
          >
            <HeroPortrait
              visible={
                phase ===
                'explore'
              }
            />
          </motion.div>


          {/* SIDE COPY */}

          <motion.span
            className="
              hero-side
            "
            initial={{
              opacity: 0,
            }}
            animate={
              phase ===
              'explore'
                ? {
                    opacity: 1,
                  }
                : {}
            }
            transition={{
              delay:
                1.35,
            }}
          >
            A WHOLE WORLD OF
            BEAUTIFUL, IN ONE
            PERSON.
          </motion.span>


          {/* DECOR */}

          <motion.div
            className="
              hero-floating-star
              hero-floating-star-one
            "
            aria-hidden="true"
            animate={
              reduced
                ? undefined
                : {
                    y: [
                      0,
                      -10,
                      0,
                    ],

                    rotate: [
                      0,
                      20,
                      0,
                    ],
                  }
            }
            transition={{
              duration: 5,
              repeat:
                Infinity,
              ease:
                'easeInOut',
            }}
          >
            <Star
              size={18}
              strokeWidth={1}
            />
          </motion.div>


          <motion.div
            className="
              hero-floating-star
              hero-floating-star-two
            "
            aria-hidden="true"
            animate={
              reduced
                ? undefined
                : {
                    y: [
                      0,
                      10,
                      0,
                    ],

                    scale: [
                      1,
                      1.25,
                      1,
                    ],
                  }
            }
            transition={{
              duration: 4,
              repeat:
                Infinity,
              ease:
                'easeInOut',
            }}
          >
            ✧
          </motion.div>
        </section>


        {/* =================================================
            MARQUEE
        ================================================= */}

        <div
          className="
            marquee
            premium-marquee
          "
          aria-hidden="true"
        >
          <div>
            {Array.from(
              {
                length: 8,
              },
              (_, index) => (
                <span
                  key={
                    index
                  }
                >
                  A LITTLE MORE
                  MAGIC

                  <i>
                    ✧
                  </i>

                  A LITTLE MORE
                  YOU

                  <i>
                    ♡
                  </i>
                </span>
              ),
            )}
          </div>
        </div>


        {/* =================================================
            CONTENT
        ================================================= */}

        {
          phase ===
            'explore' && (
            <>
              <Countdown
                onBirthday={
                  onBirthday
                }
              />

              <Gallery />

              <Story />

              <LoveLetter />

              <BirthdayCake
                onCelebrate={
                  celebrate
                }
              />

              <FinalSurprise />

              <Ending
                onReplay={
                  replay
                }
                onCelebrate={
                  celebrate
                }
              />
            </>
          )
        }


        {/* =================================================
            PROGRESS NAV
        ================================================= */}

        <nav
          className="
            progress-dots
            modern-progress-dots
          "
          aria-label="Sections"
        >
          {[
            [
              'hero',
              'Birthday',
            ],
            [
              'memories',
              'Memories',
            ],
            [
              'story',
              'Our story',
            ],
            [
              'letter',
              'Love letter',
            ],
            [
              'wish',
              'Make a wish',
            ],
            [
              'ending',
              'With love',
            ],
          ].map(
            ([
              id,
              label,
            ]) => (
              <a
                key={id}
                href={`#${id}`}
                aria-label={
                  label
                }
                title={
                  label
                }
              />
            ),
          )}
        </nav>
      </main>


      {/* ===================================================
          MUSIC
      =================================================== */}

      {
        phase ===
          'explore' &&
          !celebrating && (
          <MusicControl />
        )
      }


      {/* ===================================================
          GRAND REVEAL
      =================================================== */}

      <GrandReveal
        active={
          phase ===
          'reveal'
        }
        onComplete={
          complete
        }
      />


      {/* ===================================================
          OPENING FIREWORKS
      =================================================== */}

      {
        afterglow && (
          <div
            className="
              opening-fireworks
            "
          >
            <FireworksCanvas
              active
              duration={
                11500
              }
            />
          </div>
        )
      }


      {/* ===================================================
          FIREWORK CELEBRATION
      =================================================== */}

      <Fireworks
        active={
          celebrating
        }
        onClose={
          close
        }
      />
    </>
  );
}


/* =========================================================
   EXPORT
========================================================= */

export default function Experience() {
  return (
    <MotionConfig
      reducedMotion="user"
    >
      <MusicProvider>
        <BirthdayExperience />
      </MusicProvider>
    </MotionConfig>
  );
}