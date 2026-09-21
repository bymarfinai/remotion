import React from 'react';
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const NAVY = '#112B4A';
const BLUE = '#2D67F2';
const IVORY = '#F5F0E6';
const WHITE = '#FFFDF8';
const INK = '#10243E';
const PALE = '#DCE7F6';

const MONAS = staticFile('generated/monas-kec-v3/monas.webp');

const clamp = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
};

const easeOut = Easing.bezier(0.16, 1, 0.3, 1);

const Marker: React.FC<{
  x: number;
  y: number;
  label: string;
  delay: number;
}> = ({x, y, label, delay}) => {
  const frame = useCurrentFrame();
  const p = spring({
    frame: frame - delay,
    fps: 30,
    config: {damping: 18, stiffness: 170, mass: 0.7},
  });

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `translate(-50%, -50%) scale(${p})`,
        opacity: p,
        zIndex: 8,
      }}
    >
      <div
        style={{
          width: 22,
          height: 22,
          borderRadius: 999,
          background: BLUE,
          border: `5px solid ${WHITE}`,
          boxShadow: '0 0 0 2px rgba(17,43,74,0.22)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 30,
          left: '50%',
          transform: 'translateX(-50%)',
          whiteSpace: 'nowrap',
          fontFamily: 'Arial, Helvetica, sans-serif',
          fontWeight: 800,
          fontSize: 24,
          letterSpacing: '0.08em',
          color: NAVY,
        }}
      >
        {label}
      </div>
    </div>
  );
};

const SegmentedBar: React.FC = () => {
  const frame = useCurrentFrame();
  const widths = [0.18, 0.18, 0.18, 0.18, 0.18];

  return (
    <div
      style={{
        position: 'absolute',
        left: 92,
        right: 92,
        bottom: 155,
        display: 'flex',
        gap: 12,
        zIndex: 12,
      }}
    >
      {widths.map((_, i) => {
        const p = interpolate(frame, [70 + i * 5, 82 + i * 5], [0, 1], {
          ...clamp,
          easing: easeOut,
        });
        return (
          <div
            key={i}
            style={{
              height: 18,
              flex: 1,
              borderRadius: 999,
              background: i < 4 ? BLUE : PALE,
              transformOrigin: 'left center',
              transform: `scaleX(${p})`,
              opacity: 0.95,
            }}
          />
        );
      })}
    </div>
  );
};

export const MonasEIMV1: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const cardIn = spring({
    frame,
    fps,
    config: {damping: 22, stiffness: 120, mass: 0.9},
  });

  const circleIn = spring({
    frame: frame - 10,
    fps,
    config: {damping: 19, stiffness: 125, mass: 0.8},
  });

  const heroIn = spring({
    frame: frame - 20,
    fps,
    config: {damping: 20, stiffness: 150, mass: 0.85},
  });

  const kickerIn = interpolate(frame, [14, 28], [0, 1], {
    ...clamp,
    easing: easeOut,
  });

  const headlineIn = interpolate(frame, [24, 42], [0, 1], {
    ...clamp,
    easing: easeOut,
  });

  const pathProgress = interpolate(frame, [35, 78], [0, 1], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });

  const factIn = spring({
    frame: frame - 62,
    fps,
    config: {damping: 18, stiffness: 150, mass: 0.75},
  });

  const finalIn = interpolate(frame, [102, 122], [0, 1], {
    ...clamp,
    easing: easeOut,
  });

  const camera = interpolate(frame, [0, 149], [1.015, 1], clamp);

  return (
    <AbsoluteFill
      style={{
        background: NAVY,
        fontFamily: 'Arial, Helvetica, sans-serif',
        overflow: 'hidden',
      }}
    >
      <AbsoluteFill
        style={{
          transform: `scale(${camera})`,
          transformOrigin: 'center center',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 62,
            right: 62,
            top: 78,
            bottom: 78,
            borderRadius: 48,
            background: IVORY,
            border: `3px solid ${NAVY}`,
            boxShadow: '0 24px 0 rgba(3,17,31,0.18)',
            overflow: 'hidden',
            transform: `translateY(${(1 - cardIn) * 80}px) scale(${0.97 + cardIn * 0.03})`,
            opacity: cardIn,
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 72,
              top: 72,
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: '0.14em',
              color: NAVY,
              opacity: kickerIn,
              transform: `translateY(${(1 - kickerIn) * 18}px)`,
            }}
          >
            JAKARTA / INDONESIA
          </div>

          <div
            style={{
              position: 'absolute',
              right: 72,
              top: 72,
              fontSize: 19,
              fontWeight: 700,
              lineHeight: 1.15,
              textAlign: 'right',
              color: NAVY,
              opacity: kickerIn,
            }}
          >
            A LANDMARK
            <br />
            IN MOTION
          </div>

          <div
            style={{
              position: 'absolute',
              left: 72,
              top: 160,
              fontSize: 46,
              fontWeight: 600,
              lineHeight: 1.05,
              color: NAVY,
              opacity: headlineIn,
              transform: `translateY(${(1 - headlineIn) * 28}px)`,
              zIndex: 15,
            }}
          >
            A city remembers
            <br />
            through its
          </div>

          <div
            style={{
              position: 'absolute',
              left: 68,
              top: 258,
              fontSize: 116,
              lineHeight: 0.9,
              fontWeight: 900,
              letterSpacing: '-0.06em',
              color: NAVY,
              opacity: headlineIn,
              transform: `translateY(${(1 - headlineIn) * 34}px)`,
              zIndex: 15,
            }}
          >
            SYMBOLS
          </div>

          <div
            style={{
              position: 'absolute',
              left: 218,
              top: 440,
              width: 500,
              height: 500,
              borderRadius: 999,
              background: BLUE,
              transform: `scale(${circleIn})`,
              opacity: circleIn,
              zIndex: 2,
            }}
          />

          <div
            style={{
              position: 'absolute',
              left: 248,
              top: 400,
              width: 430,
              height: 680,
              overflow: 'hidden',
              borderRadius: '220px 220px 30px 30px',
              zIndex: 6,
            }}
          >
            <Img
              src={MONAS}
              style={{
                position: 'absolute',
                width: 510,
                left: -38,
                top: 38,
                transformOrigin: '50% 85%',
                transform: `translateY(${(1 - heroIn) * 180}px) scale(${0.92 + heroIn * 0.08})`,
                opacity: heroIn,
              }}
            />
          </div>

          <div
            style={{
              position: 'absolute',
              left: 92,
              top: 1010,
              width: 760,
              height: 260,
              zIndex: 5,
            }}
          >
            <svg width="760" height="260" viewBox="0 0 760 260">
              <path
                d="M20 190 C170 50 330 60 410 145 C500 240 625 205 738 78"
                fill="none"
                stroke={NAVY}
                strokeWidth="5"
                strokeLinecap="round"
                pathLength="1"
                strokeDasharray="1"
                strokeDashoffset={1 - pathProgress}
              />
              <path
                d="M20 190 C170 50 330 60 410 145 C500 240 625 205 738 78"
                fill="none"
                stroke={BLUE}
                strokeWidth="10"
                strokeLinecap="round"
                pathLength="1"
                strokeDasharray="0.24 0.76"
                strokeDashoffset={0.72 - pathProgress * 0.18}
                opacity="0.95"
              />
            </svg>
          </div>

          <Marker x={180} y={1147} label="1961" delay={50} />
          <Marker x={487} y={1168} label="1975" delay={63} />
          <Marker x={770} y={1092} label="TODAY" delay={76} />

          <div
            style={{
              position: 'absolute',
              left: 82,
              bottom: 275,
              display: 'flex',
              alignItems: 'baseline',
              gap: 22,
              zIndex: 15,
              transform: `translateY(${(1 - factIn) * 50}px)`,
              opacity: factIn,
            }}
          >
            <div
              style={{
                fontSize: 146,
                lineHeight: 0.8,
                fontWeight: 900,
                letterSpacing: '-0.07em',
                color: BLUE,
              }}
            >
              132
            </div>
            <div
              style={{
                fontSize: 62,
                lineHeight: 0.9,
                fontWeight: 900,
                color: NAVY,
              }}
            >
              M
            </div>
            <div
              style={{
                marginLeft: 10,
                fontSize: 24,
                lineHeight: 1.15,
                fontWeight: 800,
                letterSpacing: '0.12em',
                color: NAVY,
              }}
            >
              MONUMENT
              <br />
              HEIGHT
            </div>
          </div>

          <SegmentedBar />

          <div
            style={{
              position: 'absolute',
              right: 80,
              bottom: 78,
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              opacity: finalIn,
              transform: `translateX(${(1 - finalIn) * 24}px)`,
              zIndex: 15,
            }}
          >
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 999,
                background: BLUE,
              }}
            />
            <div
              style={{
                fontSize: 24,
                fontWeight: 900,
                letterSpacing: '0.08em',
                color: NAVY,
              }}
            >
              MONAS / JAKARTA
            </div>
          </div>

          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: 56,
              background:
                'linear-gradient(90deg, rgba(45,103,242,0.06), transparent 40%, rgba(17,43,74,0.04))',
            }}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
