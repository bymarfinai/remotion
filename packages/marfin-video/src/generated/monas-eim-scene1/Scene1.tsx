import React from 'react';
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from 'remotion';

const NAVY = '#123B72';
const BLUE = '#1D5CF5';
const PAPER = '#F8F5EC';
const OUTER = '#092A4D';
const PALE = '#DDE7F2';

const CITY = staticFile('generated/monas-eim-v9/city-circle-visual.webp');

const clamp = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
};

const ease = Easing.bezier(0.16, 1, 0.3, 1);

const fade = (f: number, a: number, b: number) =>
  interpolate(f, [a, b], [0, 1], {...clamp, easing: ease});

const rise = (f: number, a: number, b: number, from = 24) =>
  interpolate(f, [a, b], [from, 0], {...clamp, easing: ease});

const scaleIn = (f: number, a: number, b: number, from = 0.92) =>
  interpolate(f, [a, b], [from, 1], {...clamp, easing: ease});

export const MonasEIMScene1: React.FC = () => {
  const frame = useCurrentFrame();

  const introOpacity = fade(frame, 2, 10);
  const introY = rise(frame, 2, 10, 24);

  const iconicOpacity = fade(frame, 8, 17);
  const iconicY = rise(frame, 8, 17, 30);

  const noteOpacity = fade(frame, 15, 23);
  const noteY = rise(frame, 15, 23, 18);

  const circleOpacity = fade(frame, 12, 22);
  const circleX = interpolate(frame, [12, 22], [48, 0], {...clamp, easing: ease});
  const circleScale = scaleIn(frame, 12, 22, 0.9);

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
          borderRadius: 30,
          overflow: 'hidden',
          background: PAPER,
          border: `2px solid ${NAVY}`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 54,
            top: 48,
            color: NAVY,
            fontSize: 17,
            fontWeight: 900,
            letterSpacing: '.17em',
            lineHeight: 1.1,
            zIndex: 20,
          }}
        >
          JAKARTA<br />INDONESIA
        </div>

        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 72,
            width: 62,
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
            right: 54,
            top: 50,
            color: NAVY,
            fontSize: 16,
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
            width: 560,
            color: NAVY,
            opacity: introOpacity,
            transform: `translateY(${introY}px)`,
            fontSize: 80,
            fontWeight: 650,
            letterSpacing: '-.03em',
            lineHeight: 0.95,
            zIndex: 10,
          }}
        >
          What<br />makes a city<br />truly
        </div>

        <div
          style={{
            position: 'absolute',
            left: 72,
            top: 610,
            width: 760,
            color: BLUE,
            opacity: iconicOpacity,
            transform: `translateY(${iconicY}px)`,
            fontFamily: 'Arial Narrow, Arial, Helvetica, sans-serif',
            fontSize: 164,
            fontWeight: 950,
            letterSpacing: '-.06em',
            lineHeight: 0.82,
            zIndex: 11,
          }}
        >
          ICONIC?
        </div>

        <div
          style={{
            position: 'absolute',
            left: 84,
            top: 1265,
            width: 250,
            color: NAVY,
            opacity: noteOpacity,
            transform: `translateY(${noteY}px)`,
            fontSize: 27,
            fontWeight: 650,
            letterSpacing: '-.02em',
            lineHeight: 1.03,
            zIndex: 11,
          }}
        >
          More than<br />buildings,<br />it&apos;s what people<br />remember.
        </div>

        <div
          style={{
            position: 'absolute',
            right: -16,
            bottom: 120,
            width: 560,
            height: 560,
            borderRadius: 999,
            overflow: 'hidden',
            background: PALE,
            opacity: circleOpacity,
            transform: `translateX(${circleX}px) scale(${circleScale})`,
            zIndex: 6,
          }}
        >
          <Img
            src={CITY}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>

        <div
          style={{
            position: 'absolute',
            left: 54,
            bottom: 76,
            width: 58,
            height: 3,
            borderRadius: 99,
            background: BLUE,
            zIndex: 20,
          }}
        />

        <div
          style={{
            position: 'absolute',
            left: 54,
            bottom: 42,
            color: NAVY,
            fontSize: 13,
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
