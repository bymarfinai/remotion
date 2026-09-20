import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const COLORS = {
  ink: '#111111',
  cream: '#F3EBDD',
  blue: '#0C7BEA',
  orange: '#FF5A12',
  gray: '#CFC9BE',
};

const clamp = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
};

const pop = (frame: number, fps: number, start: number, from = 0.72) => {
  const p = spring({
    frame: Math.max(0, frame - start),
    fps,
    config: {
      damping: 11,
      stiffness: 190,
      mass: 0.7,
    },
  });

  return {
    opacity: interpolate(p, [0, 0.08, 1], [0, 1, 1], clamp),
    scale: interpolate(p, [0, 0.72, 1], [from, 1.08, 1], clamp),
  };
};

const PaperNoise: React.FC = () => {
  return (
    <>
      <AbsoluteFill
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 25%, rgba(255,255,255,0.055) 0 1px, transparent 1.1px), radial-gradient(circle at 77% 68%, rgba(255,255,255,0.035) 0 1px, transparent 1.1px)',
          backgroundSize: '8px 8px, 13px 13px',
          opacity: 0.65,
        }}
      />
      <AbsoluteFill
        style={{
          backgroundImage:
            'linear-gradient(92deg, transparent 0 49.7%, rgba(255,255,255,0.025) 50%, transparent 50.3%), linear-gradient(7deg, transparent 0 49.8%, rgba(255,255,255,0.018) 50%, transparent 50.2%)',
          backgroundSize: '170px 170px, 220px 220px',
          opacity: 0.5,
        }}
      />
    </>
  );
};

const HalftoneCloud: React.FC<{
  left: number;
  top: number;
  width: number;
  opacity?: number;
}> = ({left, top, width, opacity = 1}) => {
  return (
    <div
      style={{
        position: 'absolute',
        left,
        top,
        width,
        height: width * 0.36,
        opacity,
        backgroundImage:
          'radial-gradient(circle, rgba(243,235,221,0.94) 0 2px, transparent 2.3px)',
        backgroundSize: '10px 10px',
        borderRadius: '52% 48% 46% 54% / 65% 68% 32% 35%',
        WebkitMaskImage:
          'radial-gradient(ellipse at 50% 70%, black 0 62%, transparent 64%)',
      }}
    />
  );
};

const TornSkyline: React.FC<{
  side: 'left' | 'right';
  frame: number;
}> = ({side, frame}) => {
  const start = side === 'left' ? 18 : 28;
  const progress = interpolate(frame, [start, start + 18], [0, 1], clamp);
  const x = interpolate(
    progress,
    [0, 1],
    [side === 'left' ? -180 : 180, 0],
    clamp,
  );

  const buildings = side === 'left'
    ? [110, 180, 140, 235, 170, 205, 130]
    : [130, 200, 165, 250, 145, 190];

  return (
    <div
      style={{
        position: 'absolute',
        width: 520,
        height: 300,
        left: side === 'left' ? -40 : undefined,
        right: side === 'right' ? -45 : undefined,
        bottom: side === 'left' ? 135 : 175,
        transform: `translateX(${x}px) rotate(${side === 'left' ? -3 : 4}deg)`,
        opacity: progress,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: COLORS.cream,
          clipPath:
            side === 'left'
              ? 'polygon(0 18%, 12% 12%, 20% 18%, 31% 11%, 45% 15%, 61% 8%, 74% 14%, 88% 9%, 100% 16%, 100% 100%, 0 100%)'
              : 'polygon(0 17%, 15% 9%, 32% 14%, 48% 7%, 62% 12%, 78% 5%, 100% 14%, 100% 100%, 0 100%)',
          opacity: 0.96,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 28,
          right: 20,
          bottom: 25,
          height: 235,
          display: 'flex',
          alignItems: 'flex-end',
          gap: 10,
        }}
      >
        {buildings.map((h, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: h,
              background:
                i % 2 === 0
                  ? 'linear-gradient(180deg, #8E8E8E, #2C2C2C)'
                  : 'linear-gradient(180deg, #B0B0B0, #3B3B3B)',
              border: '3px solid #222',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 8,
                backgroundImage:
                  'repeating-linear-gradient(90deg, rgba(255,255,255,0.32) 0 3px, transparent 3px 11px), repeating-linear-gradient(0deg, rgba(255,255,255,0.2) 0 3px, transparent 3px 12px)',
                opacity: 0.55,
              }}
            />
          </div>
        ))}
      </div>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(circle, rgba(0,0,0,0.4) 0 1.7px, transparent 2px)',
          backgroundSize: '7px 7px',
          mixBlendMode: 'multiply',
          opacity: 0.42,
        }}
      />
    </div>
  );
};

const MonasVector: React.FC<{frame: number; fps: number}> = ({frame, fps}) => {
  const p = spring({
    frame: Math.max(0, frame - 44),
    fps,
    config: {
      damping: 13,
      stiffness: 165,
      mass: 0.78,
    },
  });

  const y = interpolate(p, [0, 1], [420, 0], clamp);
  const scale = interpolate(p, [0, 0.76, 1], [0.72, 1.065, 1], clamp);
  const rotation = interpolate(p, [0, 1], [3.5, 0], clamp);

  return (
    <div
      style={{
        position: 'absolute',
        left: 140,
        bottom: -35,
        width: 800,
        height: 1330,
        transform: `translateY(${y}px) scale(${scale}) rotate(${rotation}deg)`,
        transformOrigin: '50% 100%',
        filter: 'drop-shadow(0 22px 0 rgba(0,0,0,0.22))',
      }}
    >
      <svg viewBox="0 0 800 1330" width="100%" height="100%">
        <defs>
          <linearGradient id="tower" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#D0C4AE" />
            <stop offset="46%" stopColor="#F4EBDD" />
            <stop offset="100%" stopColor="#B7AB96" />
          </linearGradient>
          <linearGradient id="flame" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#E07D00" />
            <stop offset="55%" stopColor="#FFB000" />
            <stop offset="100%" stopColor="#FFF0A6" />
          </linearGradient>
          <pattern id="stone" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="5" r="1.1" fill="rgba(0,0,0,0.12)" />
            <circle cx="11" cy="10" r="0.8" fill="rgba(255,255,255,0.22)" />
          </pattern>
        </defs>

        <path
          d="M392 14 C360 42 372 77 338 104 C352 92 332 150 383 185 C405 150 424 112 412 80 C452 119 464 155 434 199 C477 177 489 121 452 81 C433 60 424 38 392 14 Z"
          fill="url(#flame)"
          stroke={COLORS.cream}
          strokeWidth="9"
        />

        <polygon
          points="303,195 497,195 548,280 252,280"
          fill="#C5BAA6"
          stroke={COLORS.cream}
          strokeWidth="10"
        />
        <polygon
          points="274,280 526,280 486,335 314,335"
          fill="#EFE7D8"
          stroke={COLORS.cream}
          strokeWidth="8"
        />

        <polygon
          points="340,335 460,335 515,1110 285,1110"
          fill="url(#tower)"
          stroke={COLORS.cream}
          strokeWidth="12"
        />
        <polygon
          points="340,335 460,335 515,1110 285,1110"
          fill="url(#stone)"
          opacity="0.55"
        />

        <polygon
          points="205,1085 595,1085 710,1220 90,1220"
          fill="#C8BDA9"
          stroke={COLORS.cream}
          strokeWidth="12"
        />
        <polygon
          points="90,1220 710,1220 770,1300 30,1300"
          fill="#B1A58F"
          stroke={COLORS.cream}
          strokeWidth="12"
        />
        <path
          d="M70 1262 L735 1262"
          stroke="rgba(0,0,0,0.28)"
          strokeWidth="8"
        />
      </svg>
    </div>
  );
};

const Bird: React.FC<{
  x: number;
  y: number;
  scale: number;
  rotate: number;
  delay: number;
  frame: number;
}> = ({x, y, scale, rotate, delay, frame}) => {
  const p = interpolate(frame, [delay, delay + 14], [0, 1], clamp);
  const dx = interpolate(p, [0, 1], [-70, 0], clamp);

  return (
    <svg
      width={120 * scale}
      height={72 * scale}
      viewBox="0 0 120 72"
      style={{
        position: 'absolute',
        left: x,
        top: y,
        opacity: p,
        transform: `translateX(${dx}px) rotate(${rotate}deg)`,
        filter: 'drop-shadow(0 5px 0 rgba(0,0,0,0.18))',
      }}
    >
      <path
        d="M56 42 C40 12 19 9 4 18 C24 19 38 31 50 51 C55 58 63 60 68 54 C78 42 90 33 116 31 C99 19 79 19 63 42 Z"
        fill="#EDE6DB"
        stroke="#262626"
        strokeWidth="3"
      />
      <path
        d="M57 42 C55 35 57 29 62 25 C64 33 66 38 68 45"
        stroke="#262626"
        strokeWidth="3"
        fill="none"
      />
    </svg>
  );
};

const BigTitle: React.FC<{frame: number; fps: number}> = ({frame, fps}) => {
  const p = spring({
    frame: Math.max(0, frame - 77),
    fps,
    config: {
      damping: 11,
      stiffness: 205,
      mass: 0.68,
    },
  });
  const y = interpolate(p, [0, 1], [180, 0], clamp);
  const rotate = interpolate(p, [0, 1], [-8, -2], clamp);
  const scale = interpolate(p, [0, 0.72, 1], [0.86, 1.055, 1], clamp);

  return (
    <div
      style={{
        position: 'absolute',
        left: 35,
        right: -70,
        top: 535,
        zIndex: 20,
        fontFamily: 'Arial Black, Arial, Helvetica, sans-serif',
        fontSize: 252,
        lineHeight: 0.76,
        fontWeight: 900,
        letterSpacing: -22,
        color: COLORS.cream,
        textTransform: 'uppercase',
        transform: `translateY(${y}px) rotate(${rotate}deg) scale(${scale})`,
        textShadow: '0 15px 0 rgba(0,0,0,0.2)',
        whiteSpace: 'nowrap',
      }}
    >
      MONAS
    </div>
  );
};

const CopyBlock: React.FC<{frame: number; fps: number}> = ({frame, fps}) => {
  const label = pop(frame, fps, 89, 0.84);
  const small = interpolate(frame, [103, 118], [0, 1], clamp);

  return (
    <>
      <div
        style={{
          position: 'absolute',
          zIndex: 24,
          top: 785,
          left: 455,
          padding: '18px 25px 15px',
          background: COLORS.cream,
          color: COLORS.ink,
          fontFamily: 'Arial Black, Arial, sans-serif',
          fontSize: 53,
          lineHeight: 1,
          fontWeight: 900,
          letterSpacing: -2,
          transform: `scale(${label.scale}) rotate(-4deg)`,
          opacity: label.opacity,
          boxShadow: '0 8px 0 rgba(0,0,0,0.25)',
        }}
      >
        JAKARTA ICON
        <div
          style={{
            position: 'absolute',
            left: 35,
            right: 18,
            bottom: -13,
            height: 10,
            background: COLORS.orange,
            transform: 'rotate(-2deg)',
          }}
        />
      </div>

      <div
        style={{
          position: 'absolute',
          zIndex: 25,
          left: 70,
          top: 862,
          color: COLORS.cream,
          fontFamily: 'Arial, Helvetica, sans-serif',
          fontSize: 31,
          fontWeight: 700,
          letterSpacing: 9,
          lineHeight: 1.4,
          textTransform: 'uppercase',
          opacity: small,
        }}
      >
        NATIONAL
        <br />
        MONUMENT
      </div>

      <div
        style={{
          position: 'absolute',
          zIndex: 25,
          right: 62,
          top: 900,
          width: 255,
          color: COLORS.cream,
          fontFamily: 'Georgia, serif',
          fontSize: 43,
          fontStyle: 'italic',
          fontWeight: 700,
          lineHeight: 1.02,
          transform: 'rotate(-5deg)',
          opacity: small,
        }}
      >
        Satu
        <br />
        Jakarta
        <br />
        Untuk
        <br />
        Indonesia
        <div
          style={{
            marginTop: 12,
            width: 170,
            height: 8,
            background: COLORS.orange,
            transform: 'rotate(-3deg)',
          }}
        />
      </div>
    </>
  );
};

export const MonasKECVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const blue = pop(frame, fps, 5, 0.35);
  const orange = pop(frame, fps, 1, 0.4);

  const cameraScale = interpolate(frame, [0, 149], [1, 1.045], clamp);
  const finalSettle = interpolate(frame, [112, 149], [0, -12], clamp);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.ink,
        overflow: 'hidden',
      }}
    >
      <PaperNoise />

      <AbsoluteFill
        style={{
          transform: `translateY(${finalSettle}px) scale(${cameraScale})`,
          transformOrigin: '50% 52%',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 98,
            top: 236,
            width: 405,
            height: 405,
            borderRadius: '50%',
            background: COLORS.orange,
            opacity: orange.opacity,
            transform: `scale(${orange.scale}) rotate(-5deg)`,
          }}
        />

        <div
          style={{
            position: 'absolute',
            left: 228,
            top: 425,
            width: 760,
            height: 760,
            borderRadius: '50%',
            background: COLORS.blue,
            opacity: blue.opacity,
            transform: `scale(${blue.scale}) rotate(2deg)`,
          }}
        />

        <HalftoneCloud left={18} top={505} width={385} opacity={0.88} />
        <HalftoneCloud left={620} top={575} width={410} opacity={0.95} />

        <TornSkyline side="left" frame={frame} />
        <TornSkyline side="right" frame={frame} />

        <div
          style={{
            position: 'absolute',
            right: 62,
            top: 702,
            width: 250,
            height: 250,
            background: COLORS.orange,
            clipPath:
              'polygon(0 62%, 33% 0, 48% 48%, 81% 4%, 70% 59%, 100% 43%, 74% 100%, 39% 76%)',
            transform: 'rotate(-10deg)',
            opacity: interpolate(frame, [34, 49], [0, 0.96], clamp),
          }}
        />

        <MonasVector frame={frame} fps={fps} />
        <BigTitle frame={frame} fps={fps} />
        <CopyBlock frame={frame} fps={fps} />

        <Bird x={610} y={395} scale={0.9} rotate={-9} delay={95} frame={frame} />
        <Bird x={760} y={505} scale={0.72} rotate={5} delay={100} frame={frame} />
        <Bird x={520} y={545} scale={0.58} rotate={11} delay={106} frame={frame} />

        <div
          style={{
            position: 'absolute',
            zIndex: 30,
            left: 90,
            bottom: 123,
            width: 10,
            height: 220,
            background: COLORS.orange,
            transform: 'rotate(13deg)',
            opacity: interpolate(frame, [110, 125], [0, 1], clamp),
          }}
        />
        <div
          style={{
            position: 'absolute',
            zIndex: 30,
            left: 127,
            bottom: 102,
            width: 10,
            height: 162,
            background: COLORS.cream,
            transform: 'rotate(28deg)',
            opacity: interpolate(frame, [115, 130], [0, 1], clamp),
          }}
        />

        <div
          style={{
            position: 'absolute',
            zIndex: 30,
            top: 76,
            left: 70,
            color: COLORS.cream,
            fontFamily: 'Arial, Helvetica, sans-serif',
            fontSize: 23,
            letterSpacing: 8,
            lineHeight: 1.5,
            textTransform: 'uppercase',
            opacity: interpolate(frame, [4, 18], [0, 0.92], clamp),
          }}
        >
          JAKARTA / INDONESIA
          <br />
          EST. 1961
        </div>

        <div
          style={{
            position: 'absolute',
            zIndex: 30,
            top: 90,
            right: 70,
            color: COLORS.cream,
            fontFamily: 'Arial, Helvetica, sans-serif',
            fontSize: 22,
            letterSpacing: 7,
            lineHeight: 1.35,
            textAlign: 'right',
            textTransform: 'uppercase',
            opacity: interpolate(frame, [8, 20], [0, 0.9], clamp),
          }}
        >
          SATU
          <br />
          JAKARTA
          <br />
          UNTUK
          <br />
          INDONESIA
        </div>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          pointerEvents: 'none',
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.06), transparent 18%, transparent 82%, rgba(0,0,0,0.16))',
        }}
      />
    </AbsoluteFill>
  );
};
