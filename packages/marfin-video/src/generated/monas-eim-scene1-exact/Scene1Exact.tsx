import React from 'react';
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from 'remotion';

const NAVY = '#153C72';
const BLUE = '#245FF5';
const PAPER = '#F6F3EC';
const OUTER = '#0A2645';
const PALE = '#E3E8F0';

const CITY = staticFile('generated/monas-eim-v9/city-circle-visual.webp');

const clamp = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
};

const ease = Easing.bezier(0.16, 1, 0.3, 1);

const fade = (f: number, a: number, b: number) =>
  interpolate(f, [a, b], [0, 1], {...clamp, easing: ease});

const moveY = (f: number, a: number, b: number, from: number) =>
  interpolate(f, [a, b], [from, 0], {...clamp, easing: ease});

const moveX = (f: number, a: number, b: number, from: number) =>
  interpolate(f, [a, b], [from, 0], {...clamp, easing: ease});

const scaleIn = (f: number, a: number, b: number, from: number) =>
  interpolate(f, [a, b], [from, 1], {...clamp, easing: ease});

export const MonasEIMScene1Exact: React.FC = () => {
  const frame = useCurrentFrame();

  const introOpacity = fade(frame, 2, 9);
  const introY = moveY(frame, 2, 9, 22);

  const iconicOpacity = fade(frame, 7, 15);
  const iconicY = moveY(frame, 7, 15, 28);

  const noteOpacity = fade(frame, 14, 21);
  const noteY = moveY(frame, 14, 21, 16);

  const paleOpacity = fade(frame, 9, 18);
  const paleX = moveX(frame, 9, 18, 42);
  const paleScale = scaleIn(frame, 9, 18, 0.94);

  const cityOpacity = fade(frame, 12, 20);
  const cityY = moveY(frame, 12, 20, 18);
  const cityScale = scaleIn(frame, 12, 20, 0.97);

  return (
    <AbsoluteFill
      style={{
        background: OUTER,
        fontFamily: 'Arial, Helvetica, sans-serif',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 18,
          right: 18,
          top: 18,
          bottom: 18,
          borderRadius: 28,
          overflow: 'hidden',
          background: PAPER,
          border: `2px solid ${NAVY}`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 52,
            top: 50,
            color: NAVY,
            fontSize: 16,
            fontWeight: 900,
            letterSpacing: '.17em',
            lineHeight: 1.12,
            zIndex: 20,
          }}
        >
          JAKARTA
          <br />
          INDONESIA
        </div>

        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 72,
            width: 58,
            height: 3,
            borderRadius: 99,
            background: NAVY,
            transform: 'translateX(-50%)',
            zIndex: 20,
          }}
        />

        <div
          style={{
            position: 'absolute',
            right: 52,
            top: 50,
            color: NAVY,
            fontSize: 15,
            fontWeight: 900,
            letterSpacing: '.14em',
            zIndex: 20,
          }}
        >
          01 / 07
        </div>

        <div
          style={{
            position: 'absolute',
            left: 74,
            top: 250,
            width: 470,
            color: NAVY,
            opacity: introOpacity,
            transform: `translateY(${introY}px)`,
            fontSize: 78,
            fontWeight: 700,
            letterSpacing: '-.045em',
            lineHeight: 0.92,
            zIndex: 12,
          }}
        >
          What
          <br />
          makes a city
          <br />
          truly
        </div>

        <div
          style={{
            position: 'absolute',
            left: 72,
            top: 604,
            width: 700,
            color: BLUE,
            opacity: iconicOpacity,
            transform: `translateY(${iconicY}px)`,
            fontFamily: 'Arial Narrow, Arial, Helvetica, sans-serif',
            fontSize: 158,
            fontWeight: 950,
            letterSpacing: '-.07em',
            lineHeight: 0.82,
            zIndex: 13,
          }}
        >
          ICONIC?
        </div>

        <div
          style={{
            position: 'absolute',
            left: 76,
            top: 1242,
            width: 205,
            color: NAVY,
            opacity: noteOpacity,
            transform: `translateY(${noteY}px)`,
            fontSize: 25,
            fontWeight: 700,
            letterSpacing: '-.025em',
            lineHeight: 1.0,
            zIndex: 13,
          }}
        >
          More than
          <br />
          buildings,
          <br />
          it&apos;s what people
          <br />
          remember.
        </div>

        <div
          style={{
            position: 'absolute',
            right: -150,
            bottom: -145,
            width: 720,
            height: 720,
            borderRadius: 999,
            background: PALE,
            opacity: paleOpacity,
            transform: `translateX(${paleX}px) scale(${paleScale})`,
            zIndex: 5,
          }}
        />

        <div
          style={{
            position: 'absolute',
            right: 2,
            bottom: 64,
            width: 455,
            height: 455,
            opacity: cityOpacity,
            transform: `translateY(${cityY}px) scale(${cityScale})`,
            zIndex: 8,
          }}
        >
          <Img
            src={CITY}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              objectPosition: 'right bottom',
            }}
          />
        </div>

        <div
          style={{
            position: 'absolute',
            left: 52,
            bottom: 76,
            width: 56,
            height: 3,
            borderRadius: 99,
            background: BLUE,
            zIndex: 20,
          }}
        />

        <div
          style={{
            position: 'absolute',
            left: 52,
            bottom: 42,
            color: NAVY,
            fontSize: 12,
            fontWeight: 900,
            letterSpacing: '.18em',
            zIndex: 20,
          }}
        >
          MONAS / JAKARTA
        </div>
      </div>
    </AbsoluteFill>
  );
};
