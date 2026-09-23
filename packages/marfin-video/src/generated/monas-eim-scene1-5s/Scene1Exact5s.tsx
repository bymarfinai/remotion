import React from 'react';
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from 'remotion';

const NAVY = '#143B72';
const BLUE = '#245FF5';
const PAPER = '#F6F3EC';
const OUTER = '#0A2645';
const PALE = '#E1E7F0';

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

export const MonasEIMScene1Exact5s: React.FC = () => {
  const frame = useCurrentFrame();

  const introOpacity = fade(frame, 2, 12);
  const introY = moveY(frame, 2, 12, 24);

  const iconicOpacity = fade(frame, 8, 18);
  const iconicY = moveY(frame, 8, 18, 30);

  const noteOpacity = fade(frame, 14, 24);
  const noteY = moveY(frame, 14, 24, 16);

  const paleOpacity = fade(frame, 10, 20);
  const paleX = moveX(frame, 10, 20, 36);
  const paleScale = scaleIn(frame, 10, 20, 0.95);

  const cityMaskOpacity = fade(frame, 12, 22);
  const cityMaskY = moveY(frame, 12, 22, 18);
  const cityMaskScale = scaleIn(frame, 12, 22, 0.96);

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
            left: 74,
            top: 58,
            color: NAVY,
            fontSize: 15,
            fontWeight: 900,
            letterSpacing: '.18em',
            lineHeight: 1.08,
            zIndex: 20,
          }}
        >
          JAKARTA<br />INDONESIA
        </div>

        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 77,
            width: 56,
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
            right: 72,
            top: 60,
            color: NAVY,
            fontSize: 14,
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
            left: 76,
            top: 250,
            width: 500,
            color: NAVY,
            opacity: introOpacity,
            transform: `translateY(${introY}px)`,
            fontSize: 74,
            fontWeight: 700,
            letterSpacing: '-.045em',
            lineHeight: 0.93,
            zIndex: 12,
          }}
        >
          What<br />makes a city<br />truly
        </div>

        <div
          style={{
            position: 'absolute',
            left: 72,
            top: 590,
            width: 860,
            color: BLUE,
            opacity: iconicOpacity,
            transform: `translateY(${iconicY}px)`,
            fontFamily: 'Arial Narrow, Arial, Helvetica, sans-serif',
            fontSize: 168,
            fontWeight: 950,
            letterSpacing: '-.075em',
            lineHeight: 0.80,
            zIndex: 13,
          }}
        >
          ICONIC?
        </div>

        <div
          style={{
            position: 'absolute',
            left: 84,
            top: 1232,
            width: 215,
            color: NAVY,
            opacity: noteOpacity,
            transform: `translateY(${noteY}px)`,
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: '-.02em',
            lineHeight: 0.98,
            zIndex: 13,
          }}
        >
          More than<br />buildings,<br />it&apos;s what people<br />remember.
        </div>

        <div
          style={{
            position: 'absolute',
            right: -165,
            bottom: -165,
            width: 760,
            height: 760,
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
            right: -10,
            bottom: 58,
            width: 470,
            height: 470,
            borderRadius: 999,
            overflow: 'hidden',
            opacity: cityMaskOpacity,
            transform: `translateY(${cityMaskY}px) scale(${cityMaskScale})`,
            zIndex: 8,
          }}
        >
          <Img
            src={CITY}
            style={{
              position: 'absolute',
              left: -38,
              top: -8,
              width: 560,
              height: 560,
              objectFit: 'cover',
            }}
          />
        </div>

        <div
          style={{
            position: 'absolute',
            left: 78,
            bottom: 76,
            width: 54,
            height: 3,
            borderRadius: 99,
            background: BLUE,
            zIndex: 20,
          }}
        />

        <div
          style={{
            position: 'absolute',
            left: 78,
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
