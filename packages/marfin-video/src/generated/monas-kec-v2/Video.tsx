import React from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const C = {
  ink: '#111111',
  cream: '#F3EBDD',
  orange: '#FF5A12',
  blue: '#0B79E8',
  gray: '#B8B8B8',
};

const clamp = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
};

const enter = (
  frame: number,
  fps: number,
  start: number,
  fromScale = 0.82,
) => {
  const p = spring({
    frame: Math.max(0, frame - start),
    fps,
    config: {
      damping: 12,
      stiffness: 180,
      mass: 0.72,
    },
  });

  return {
    p,
    opacity: interpolate(p, [0, 0.08, 1], [0, 1, 1], clamp),
    scale: interpolate(p, [0, 0.72, 1], [fromScale, 1.06, 1], clamp),
  };
};

const PaperTexture: React.FC = () => {
  return (
    <>
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(circle at 20% 18%, rgba(255,255,255,.045) 0 1px, transparent 1.25px), radial-gradient(circle at 76% 68%, rgba(255,255,255,.028) 0 1px, transparent 1.2px)',
          backgroundSize: '8px 8px, 13px 13px',
          opacity: 0.7,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            'repeating-linear-gradient(103deg, transparent 0 31px, rgba(255,255,255,.018) 32px, transparent 33px 68px)',
          opacity: 0.7,
        }}
      />
    </>
  );
};

const CircleMasses: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const orange = enter(frame, fps, 2, 0.28);
  const blue = enter(frame, fps, 8, 0.3);

  return (
    <>
      <div
        style={{
          position: 'absolute',
          width: 430,
          height: 430,
          left: 70,
          top: 220,
          borderRadius: '50%',
          background: C.orange,
          opacity: orange.opacity,
          transform: `scale(${orange.scale}) rotate(-7deg)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 760,
          height: 760,
          left: 205,
          top: 390,
          borderRadius: '50%',
          background: C.blue,
          opacity: blue.opacity,
          transform: `scale(${blue.scale}) rotate(3deg)`,
        }}
      />
    </>
  );
};

const HalftoneCloud: React.FC<{
  left: number;
  top: number;
  width: number;
  delay: number;
}> = ({left, top, width, delay}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [delay, delay + 14], [0, 1], clamp);

  return (
    <div
      style={{
        position: 'absolute',
        left,
        top,
        width,
        height: width * 0.33,
        opacity: p * 0.92,
        transform: `translateX(${interpolate(p, [0, 1], [-70, 0], clamp)}px)`,
        backgroundImage:
          'radial-gradient(circle, rgba(243,235,221,.94) 0 2px, transparent 2.3px)',
        backgroundSize: '9px 9px',
        borderRadius: '50%',
        WebkitMaskImage:
          'radial-gradient(ellipse at 50% 72%, black 0 60%, transparent 63%)',
      }}
    />
  );
};

const TornSkyline: React.FC<{
  side: 'left' | 'right';
  delay: number;
}> = ({side, delay}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const p = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: {
      damping: 15,
      stiffness: 165,
      mass: 0.75,
    },
  });

  const x = interpolate(
    p,
    [0, 1],
    [side === 'left' ? -210 : 210, 0],
    clamp,
  );

  const heights =
    side === 'left'
      ? [120, 210, 155, 255, 185, 222, 145]
      : [135, 178, 240, 160, 230, 190];

  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 5,
        width: 520,
        height: 330,
        left: side === 'left' ? -35 : undefined,
        right: side === 'right' ? -45 : undefined,
        bottom: side === 'left' ? 120 : 170,
        opacity: interpolate(p, [0, 0.06, 1], [0, 1, 1], clamp),
        transform: `translateX(${x}px) rotate(${side === 'left' ? -3.5 : 3.5}deg)`,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: C.cream,
          clipPath:
            side === 'left'
              ? 'polygon(0 17%,8% 12%,18% 17%,28% 9%,42% 15%,57% 8%,70% 14%,84% 7%,100% 15%,100% 100%,0 100%)'
              : 'polygon(0 16%,12% 8%,25% 14%,40% 7%,55% 13%,69% 6%,82% 12%,100% 9%,100% 100%,0 100%)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: 28,
          right: 25,
          bottom: 25,
          height: 250,
          display: 'flex',
          gap: 9,
          alignItems: 'flex-end',
        }}
      >
        {heights.map((h, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: h,
              border: '3px solid #242424',
              background:
                i % 2
                  ? 'linear-gradient(180deg,#9b9b9b,#303030)'
                  : 'linear-gradient(180deg,#b5b5b5,#383838)',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 8,
                opacity: 0.42,
                backgroundImage:
                  'repeating-linear-gradient(90deg,rgba(255,255,255,.35) 0 2px,transparent 2px 10px),repeating-linear-gradient(0deg,rgba(255,255,255,.22) 0 2px,transparent 2px 12px)',
              }}
            />
          </div>
        ))}
      </div>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.35,
          mixBlendMode: 'multiply',
          backgroundImage:
            'radial-gradient(circle,rgba(0,0,0,.48) 0 1.5px,transparent 1.8px)',
          backgroundSize: '7px 7px',
        }}
      />
    </div>
  );
};

const HeroMonas: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const p = spring({
    frame: Math.max(0, frame - 42),
    fps,
    config: {
      damping: 13,
      stiffness: 165,
      mass: 0.8,
    },
  });

  const y = interpolate(p, [0, 1], [420, 0], clamp);
  const scale = interpolate(p, [0, 0.74, 1], [0.78, 1.07, 1], clamp);
  const rotate = interpolate(p, [0, 1], [2.5, 0], clamp);

  return (
    <Img
      src={staticFile('generated/monas-kec-v2/monas.webp')}
      style={{
        position: 'absolute',
        zIndex: 18,
        width: 850,
        height: 1275,
        objectFit: 'contain',
        left: 112,
        bottom: -15,
        opacity: interpolate(p, [0, 0.06, 1], [0, 1, 1], clamp),
        transform: `translateY(${y}px) scale(${scale}) rotate(${rotate}deg)`,
        transformOrigin: '50% 100%',
        filter: 'drop-shadow(0 22px 0 rgba(0,0,0,.22))',
      }}
    />
  );
};

const MainTitle: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const p = spring({
    frame: Math.max(0, frame - 72),
    fps,
    config: {
      damping: 11,
      stiffness: 205,
      mass: 0.66,
    },
  });

  const y = interpolate(p, [0, 1], [170, 0], clamp);
  const rot = interpolate(p, [0, 1], [-8, -2], clamp);
  const scale = interpolate(p, [0, 0.73, 1], [0.83, 1.055, 1], clamp);

  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 24,
        left: 35,
        top: 550,
        color: C.cream,
        fontFamily: 'Arial Black, Arial, Helvetica, sans-serif',
        fontWeight: 900,
        fontSize: 245,
        letterSpacing: -21,
        lineHeight: 0.8,
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
        opacity: interpolate(p, [0, 0.06, 1], [0, 1, 1], clamp),
        transform: `translateY(${y}px) rotate(${rot}deg) scale(${scale})`,
        textShadow: '0 14px 0 rgba(0,0,0,.2)',
      }}
    >
      MONAS
    </div>
  );
};

const JakartaLabel: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const p = enter(frame, fps, 87, 0.8);
  const x = interpolate(p.p, [0, 1], [150, 0], clamp);

  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 28,
        left: 450,
        top: 790,
        width: 505,
        height: 112,
        opacity: p.opacity,
        transform: `translateX(${x}px) scale(${p.scale}) rotate(-4deg)`,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: C.cream,
          clipPath:
            'polygon(1% 15%,8% 9%,17% 13%,27% 7%,38% 12%,49% 8%,61% 13%,72% 6%,83% 12%,98% 8%,99% 83%,92% 89%,81% 85%,69% 92%,57% 87%,45% 94%,31% 88%,18% 94%,3% 87%)',
          boxShadow: '0 9px 0 rgba(0,0,0,.2)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: C.ink,
          fontFamily: 'Arial Black, Arial, sans-serif',
          fontWeight: 900,
          fontSize: 53,
          letterSpacing: -2,
        }}
      >
        JAKARTA ICON
      </div>
      <div
        style={{
          position: 'absolute',
          left: 120,
          right: 42,
          bottom: -7,
          height: 10,
          background: C.orange,
          transform: 'rotate(-2deg)',
        }}
      />
    </div>
  );
};

const Birds: React.FC = () => {
  const frame = useCurrentFrame();

  const bird = (
    x: number,
    y: number,
    width: number,
    delay: number,
    rotate: number,
  ) => {
    const p = interpolate(frame, [delay, delay + 14], [0, 1], clamp);
    const dx = interpolate(p, [0, 1], [-80, 0], clamp);

    return (
      <svg
        key={`${x}-${y}`}
        width={width}
        height={width * 0.62}
        viewBox="0 0 120 72"
        style={{
          position: 'absolute',
          zIndex: 20,
          left: x,
          top: y,
          opacity: p,
          transform: `translateX(${dx}px) rotate(${rotate}deg)`,
          filter: 'drop-shadow(0 5px 0 rgba(0,0,0,.18))',
        }}
      >
        <path
          d="M56 42C40 12 19 9 4 18c20 1 34 13 46 33 5 7 13 9 18 3 10-12 22-21 48-23-17-12-37-12-53 11z"
          fill="#ECE5D9"
          stroke="#252525"
          strokeWidth="3"
        />
      </svg>
    );
  };

  return (
    <>
      {bird(655, 390, 125, 94, -10)}
      {bird(785, 505, 100, 101, 6)}
      {bird(535, 515, 86, 107, 12)}
    </>
  );
};

const SideCopy: React.FC = () => {
  const frame = useCurrentFrame();
  const small = interpolate(frame, [98, 118], [0, 1], clamp);

  return (
    <>
      <div
        style={{
          position: 'absolute',
          zIndex: 30,
          left: 62,
          top: 850,
          color: C.cream,
          fontFamily: 'Arial, Helvetica, sans-serif',
          fontSize: 30,
          fontWeight: 700,
          letterSpacing: 9,
          lineHeight: 1.45,
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
          zIndex: 30,
          right: 66,
          top: 920,
          width: 255,
          color: C.cream,
          fontFamily: 'Georgia, serif',
          fontSize: 42,
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
            width: 165,
            height: 8,
            background: C.orange,
            transform: 'rotate(-3deg)',
          }}
        />
      </div>
    </>
  );
};

export const MonasKECV2: React.FC = () => {
  const frame = useCurrentFrame();

  const cameraScale = interpolate(frame, [0, 149], [1, 1.045], clamp);
  const cameraY = interpolate(frame, [106, 149], [0, -13], clamp);

  return (
    <AbsoluteFill
      style={{
        background: C.ink,
        overflow: 'hidden',
      }}
    >
      <PaperTexture />

      <AbsoluteFill
        style={{
          transform: `translateY(${cameraY}px) scale(${cameraScale})`,
          transformOrigin: '50% 52%',
        }}
      >
        <CircleMasses />

        <HalftoneCloud left={0} top={500} width={390} delay={18} />
        <HalftoneCloud left={640} top={565} width={410} delay={27} />

        <TornSkyline side="left" delay={17} />
        <TornSkyline side="right" delay={27} />

        <div
          style={{
            position: 'absolute',
            zIndex: 8,
            right: 52,
            top: 710,
            width: 260,
            height: 260,
            background: C.orange,
            clipPath:
              'polygon(0 60%,31% 0,48% 47%,80% 5%,70% 59%,100% 41%,74% 100%,38% 76%)',
            transform: 'rotate(-11deg)',
            opacity: interpolate(frame, [34, 48], [0, 0.98], clamp),
          }}
        />

        <HeroMonas />
        <MainTitle />
        <JakartaLabel />
        <SideCopy />
        <Birds />

        <div
          style={{
            position: 'absolute',
            zIndex: 31,
            top: 78,
            left: 66,
            color: C.cream,
            fontFamily: 'Arial, Helvetica, sans-serif',
            fontSize: 22,
            letterSpacing: 8,
            lineHeight: 1.45,
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
            zIndex: 31,
            top: 88,
            right: 65,
            color: C.cream,
            fontFamily: 'Arial, Helvetica, sans-serif',
            fontSize: 21,
            letterSpacing: 7,
            lineHeight: 1.35,
            textAlign: 'right',
            textTransform: 'uppercase',
            opacity: interpolate(frame, [8, 22], [0, 0.9], clamp),
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
            'linear-gradient(180deg,rgba(0,0,0,.08),transparent 18%,transparent 82%,rgba(0,0,0,.18))',
        }}
      />
    </AbsoluteFill>
  );
};
