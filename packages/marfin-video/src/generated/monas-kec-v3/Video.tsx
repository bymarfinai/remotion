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
};

const MONAS = staticFile('generated/monas-kec-v2/monas.webp');
const SKYLINE = staticFile('generated/monas-kec-v2/skyline.webp');

const clamp = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
};

const enter = (
  frame: number,
  fps: number,
  start: number,
  fromScale = 0.8,
) => {
  const p = spring({
    frame: Math.max(0, frame - start),
    fps,
    config: {
      damping: 12,
      stiffness: 185,
      mass: 0.72,
    },
  });

  return {
    p,
    opacity: interpolate(p, [0, 0.06, 1], [0, 1, 1], clamp),
    scale: interpolate(p, [0, 0.72, 1], [fromScale, 1.06, 1], clamp),
  };
};

const BackgroundAtmosphere: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <>
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(circle at 26% 18%, rgba(255,90,18,0.18), transparent 30%), radial-gradient(circle at 74% 42%, rgba(11,121,232,0.18), transparent 36%), radial-gradient(circle at 50% 84%, rgba(255,255,255,0.045), transparent 32%)',
          opacity: 0.95,
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: -120,
          top: 300,
          width: 560,
          height: 560,
          borderRadius: '50%',
          opacity: 0.12,
          backgroundImage:
            'radial-gradient(circle, rgba(243,235,221,0.92) 0 2px, transparent 2.4px)',
          backgroundSize: '12px 12px',
          transform: `rotate(${interpolate(frame, [0, 149], [-6, 2], clamp)}deg)`,
        }}
      />

      <div
        style={{
          position: 'absolute',
          right: -150,
          bottom: 100,
          width: 500,
          height: 500,
          borderRadius: '50%',
          opacity: 0.09,
          backgroundImage:
            'radial-gradient(circle, rgba(243,235,221,0.9) 0 2px, transparent 2.4px)',
          backgroundSize: '12px 12px',
          transform: `rotate(${interpolate(frame, [0, 149], [4, -4], clamp)}deg)`,
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: -30,
          top: 1040,
          width: 520,
          height: 220,
          background: 'rgba(243,235,221,0.075)',
          clipPath:
            'polygon(0 18%,8% 10%,19% 16%,30% 9%,42% 14%,54% 8%,67% 13%,79% 7%,92% 12%,100% 9%,100% 100%,0 100%)',
          transform: 'rotate(-5deg)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          right: -70,
          top: 1120,
          width: 500,
          height: 190,
          background: 'rgba(243,235,221,0.055)',
          clipPath:
            'polygon(0 16%,12% 8%,25% 14%,40% 7%,55% 13%,69% 6%,82% 12%,100% 9%,100% 100%,0 100%)',
          transform: 'rotate(4deg)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.18,
          mixBlendMode: 'screen',
          backgroundImage:
            'radial-gradient(circle at 20% 18%, rgba(255,255,255,.1) 0 1px, transparent 1.2px), radial-gradient(circle at 76% 68%, rgba(255,255,255,.07) 0 1px, transparent 1.1px), radial-gradient(circle at 40% 80%, rgba(255,255,255,.05) 0 1px, transparent 1.1px)',
          backgroundSize: '8px 8px, 13px 13px, 11px 11px',
        }}
      />

      <AbsoluteFill
        style={{
          background:
            'radial-gradient(circle at center, transparent 50%, rgba(0,0,0,0.24) 100%)',
        }}
      />
    </>
  );
};

const PaperTexture: React.FC = () => (
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

const GraphicMasses: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const orange = enter(frame, fps, 1, 0.25);
  const blue = enter(frame, fps, 7, 0.28);

  return (
    <>
      <div
        style={{
          position: 'absolute',
          width: 430,
          height: 430,
          left: 70,
          top: 210,
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
          top: 385,
          borderRadius: '50%',
          background: C.blue,
          opacity: blue.opacity,
          transform: `scale(${blue.scale}) rotate(3deg)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: 48,
          top: 705,
          width: 255,
          height: 255,
          background: C.orange,
          clipPath:
            'polygon(0 60%,31% 0,48% 47%,80% 5%,70% 59%,100% 41%,74% 100%,38% 76%)',
          transform: 'rotate(-11deg)',
          opacity: interpolate(frame, [34, 49], [0, 0.98], clamp),
          zIndex: 7,
        }}
      />
    </>
  );
};

const GeneratedSkyline: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({
    frame: Math.max(0, frame - 18),
    fps,
    config: {damping: 15, stiffness: 165, mass: 0.76},
  });

  return (
    <Img
      src={SKYLINE}
      style={{
        position: 'absolute',
        zIndex: 5,
        width: 1160,
        left: -40,
        bottom: 65,
        opacity: interpolate(p, [0, 0.06, 1], [0, 1, 1], clamp),
        transform: `translateY(${interpolate(p, [0, 1], [180, 0], clamp)}px) rotate(-1.5deg)`,
        filter: 'contrast(1.04)',
      }}
    />
  );
};

const GeneratedCloud: React.FC = () => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [22, 38], [0, 1], clamp);

  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 8,
        left: -20,
        top: 540,
        width: 520,
        height: 185,
        opacity: p * 0.9,
        transform: `translateX(${interpolate(p, [0, 1], [-100, 0], clamp)}px) rotate(-3deg)`,
        backgroundImage:
          'radial-gradient(circle, rgba(243,235,221,.95) 0 2px, transparent 2.3px)',
        backgroundSize: '9px 9px',
        borderRadius: '50%',
        WebkitMaskImage:
          'radial-gradient(ellipse at 50% 72%, black 0 60%, transparent 63%)',
      }}
    />
  );
};

const GeneratedBirds: React.FC = () => {
  const frame = useCurrentFrame();

  const Bird = ({
    left,
    top,
    width,
    delay,
    rotate,
  }: {
    left: number;
    top: number;
    width: number;
    delay: number;
    rotate: number;
  }) => {
    const p = interpolate(frame, [delay, delay + 14], [0, 1], clamp);
    return (
      <svg
        viewBox="0 0 120 72"
        style={{
          position: 'absolute',
          zIndex: 23,
          left,
          top,
          width,
          opacity: p,
          transform: `translateX(${interpolate(p, [0, 1], [-80, 0], clamp)}px) rotate(${rotate}deg)`,
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
      <Bird left={650} top={390} width={125} delay={94} rotate={-10} />
      <Bird left={785} top={500} width={100} delay={101} rotate={6} />
      <Bird left={535} top={515} width={86} delay={107} rotate={12} />
    </>
  );
};

const HeroMonas: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const p = spring({
    frame: Math.max(0, frame - 43),
    fps,
    config: {damping: 13, stiffness: 168, mass: 0.8},
  });

  return (
    <Img
      src={MONAS}
      style={{
        position: 'absolute',
        zIndex: 18,
        width: 820,
        left: 130,
        top: 350,
        opacity: interpolate(p, [0, 0.05, 1], [0, 1, 1], clamp),
        transform: `translateY(${interpolate(p, [0, 1], [430, 0], clamp)}px) scale(${interpolate(
          p,
          [0, 0.74, 1],
          [0.76, 1.07, 1],
          clamp,
        )}) rotate(${interpolate(p, [0, 1], [2.4, 0], clamp)}deg)`,
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
    frame: Math.max(0, frame - 73),
    fps,
    config: {damping: 11, stiffness: 205, mass: 0.66},
  });

  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 26,
        left: 32,
        top: 555,
        color: C.cream,
        fontFamily: 'Arial Black, Arial, Helvetica, sans-serif',
        fontSize: 247,
        fontWeight: 900,
        letterSpacing: -21,
        lineHeight: 0.8,
        whiteSpace: 'nowrap',
        textTransform: 'uppercase',
        opacity: interpolate(p, [0, 0.05, 1], [0, 1, 1], clamp),
        transform: `translateY(${interpolate(p, [0, 1], [180, 0], clamp)}px) rotate(${interpolate(
          p,
          [0, 1],
          [-8, -2],
          clamp,
        )}deg) scale(${interpolate(p, [0, 0.73, 1], [0.84, 1.055, 1], clamp)})`,
        textShadow: '0 14px 0 rgba(0,0,0,.22)',
      }}
    >
      MONAS
    </div>
  );
};

const JakartaLabel: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const e = enter(frame, fps, 88, 0.82);

  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 30,
        left: 450,
        top: 790,
        width: 510,
        height: 145,
        opacity: e.opacity,
        transform: `translateX(${interpolate(e.p, [0, 1], [150, 0], clamp)}px) scale(${e.scale}) rotate(-4deg)`,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: C.cream,
          clipPath:
            'polygon(1% 15%,8% 9%,17% 13%,27% 7%,38% 12%,49% 8%,61% 13%,72% 6%,83% 12%,98% 8%,99% 83%,92% 89%,81% 85%,69% 92%,57% 87%,45% 94%,31% 88%,18% 94%,3% 87%)',
          zIndex: 0,
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
          fontSize: 52,
          letterSpacing: -2,
          zIndex: 2,
        }}
      >
        JAKARTA ICON
      </div>
      <div
        style={{
          position: 'absolute',
          left: 125,
          right: 35,
          bottom: 15,
          height: 9,
          background: C.orange,
          transform: 'rotate(-2deg)',
          zIndex: 3,
        }}
      />
    </div>
  );
};

const SideCopy: React.FC = () => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [100, 119], [0, 1], clamp);

  return (
    <>
      <div
        style={{
          position: 'absolute',
          zIndex: 30,
          left: 62,
          top: 855,
          color: C.cream,
          fontFamily: 'Arial, Helvetica, sans-serif',
          fontSize: 30,
          fontWeight: 700,
          letterSpacing: 9,
          lineHeight: 1.45,
          textTransform: 'uppercase',
          opacity: p,
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
          right: 64,
          top: 930,
          width: 260,
          color: C.cream,
          fontFamily: 'Georgia, serif',
          fontSize: 42,
          fontStyle: 'italic',
          fontWeight: 700,
          lineHeight: 1.02,
          transform: 'rotate(-5deg)',
          opacity: p,
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
            width: 168,
            height: 8,
            background: C.orange,
            transform: 'rotate(-3deg)',
          }}
        />
      </div>
    </>
  );
};

export const MonasKECV3: React.FC = () => {
  const frame = useCurrentFrame();

  const cameraScale = interpolate(frame, [0, 149], [1, 1.045], clamp);
  const cameraY = interpolate(frame, [110, 149], [0, -14], clamp);

  return (
    <AbsoluteFill
      style={{
        background: C.ink,
        overflow: 'hidden',
      }}
    >
      <BackgroundAtmosphere />
      <PaperTexture />

      <AbsoluteFill
        style={{
          transform: `translateY(${cameraY}px) scale(${cameraScale})`,
          transformOrigin: '50% 52%',
        }}
      >
        <GraphicMasses />
        <GeneratedCloud />
        <GeneratedSkyline />
        <HeroMonas />
        <MainTitle />
        <JakartaLabel />
        <SideCopy />
        <GeneratedBirds />

        <div
          style={{
            position: 'absolute',
            zIndex: 34,
            top: 76,
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
            zIndex: 34,
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
