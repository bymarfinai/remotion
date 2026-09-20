import React from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {MONAS_GENERATED_ARTWORK} from './Artwork';

const clamp = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
};

const COLORS = {
  ink: '#111111',
  cream: '#F3EBDD',
  orange: '#FF5A12',
};

const GeneratedPanel: React.FC<{
  left: number;
  width: number;
  delay: number;
  offsetY: number;
  rotate: number;
}> = ({left, width, delay, offsetY, rotate}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const p = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: {
      damping: 12,
      stiffness: 185,
      mass: 0.72,
    },
  });

  const y = interpolate(p, [0, 1], [offsetY, 0], clamp);
  const scale = interpolate(p, [0, 0.72, 1], [0.9, 1.035, 1], clamp);
  const opacity = interpolate(p, [0, 0.08, 1], [0, 1, 1], clamp);

  return (
    <div
      style={{
        position: 'absolute',
        left: `${left}%`,
        top: 0,
        width: `${width}%`,
        height: '100%',
        overflow: 'hidden',
        opacity,
        transform: `translateY(${y}px) rotate(${rotate}deg) scale(${scale})`,
        transformOrigin: '50% 50%',
      }}
    >
      <Img
        src={MONAS_GENERATED_ARTWORK}
        style={{
          position: 'absolute',
          top: 0,
          left: `-${(left / width) * 100}%`,
          width: `${10000 / width}%`,
          height: '100%',
          objectFit: 'cover',
        }}
      />
    </div>
  );
};

export const MonasKECVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const fullReveal = spring({
    frame: Math.max(0, frame - 63),
    fps,
    config: {
      damping: 14,
      stiffness: 155,
      mass: 0.8,
    },
  });

  const finalOpacity = interpolate(fullReveal, [0, 0.6, 1], [0, 0.88, 1], clamp);
  const finalScale = interpolate(frame, [63, 149], [1.1, 1.025], clamp);
  const finalY = interpolate(frame, [63, 149], [22, -10], clamp);

  const accentPop = spring({
    frame,
    fps,
    config: {
      damping: 12,
      stiffness: 190,
      mass: 0.7,
    },
  });

  const darkCover = interpolate(frame, [0, 14], [1, 0], clamp);
  const accentOpacity = interpolate(frame, [96, 112, 149], [0, 1, 0.72], clamp);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.ink,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: 470,
          height: 470,
          borderRadius: '50%',
          left: 70,
          top: 170,
          background: COLORS.orange,
          opacity: interpolate(accentPop, [0, 1], [0, 0.95], clamp),
          transform: `scale(${interpolate(accentPop, [0, 1], [0.3, 1], clamp)}) rotate(-8deg)`,
        }}
      />

      <GeneratedPanel left={0} width={34} delay={5} offsetY={180} rotate={-2.5} />
      <GeneratedPanel left={33} width={34} delay={13} offsetY={-190} rotate={1.5} />
      <GeneratedPanel left={66} width={34} delay={21} offsetY={170} rotate={-1.5} />

      <Img
        src={MONAS_GENERATED_ARTWORK}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: finalOpacity,
          transform: `translateY(${finalY}px) scale(${finalScale})`,
          transformOrigin: '50% 48%',
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.38,
          pointerEvents: 'none',
          backgroundImage:
            'radial-gradient(circle at 25% 30%, rgba(255,255,255,0.09) 0 1px, transparent 1.2px), radial-gradient(circle at 70% 68%, rgba(0,0,0,0.14) 0 1.2px, transparent 1.4px)',
          backgroundSize: '9px 9px, 12px 12px',
          mixBlendMode: 'overlay',
        }}
      />

      <div
        style={{
          position: 'absolute',
          right: 60,
          top: 600,
          width: 12,
          height: 280,
          background: COLORS.orange,
          transform: 'rotate(62deg)',
          opacity: accentOpacity,
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: 92,
          top: 625,
          width: 9,
          height: 220,
          background: COLORS.cream,
          transform: 'rotate(55deg)',
          opacity: accentOpacity,
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: 42,
          bottom: 56,
          padding: '12px 18px',
          background: 'rgba(17,17,17,0.78)',
          color: COLORS.cream,
          fontFamily: 'Arial, Helvetica, sans-serif',
          fontSize: 19,
          fontWeight: 700,
          letterSpacing: 5,
          textTransform: 'uppercase',
          opacity: interpolate(frame, [105, 121], [0, 0.9], clamp),
        }}
      >
        KEC 001 / AI GENERATED ARTWORK
      </div>

      <AbsoluteFill
        style={{
          background: COLORS.ink,
          opacity: darkCover,
          pointerEvents: 'none',
        }}
      />

      <AbsoluteFill
        style={{
          pointerEvents: 'none',
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.13), transparent 20%, transparent 78%, rgba(0,0,0,0.24))',
        }}
      />
    </AbsoluteFill>
  );
};
