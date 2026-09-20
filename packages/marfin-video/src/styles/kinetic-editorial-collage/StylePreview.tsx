import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export const KECStylePreview: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const pop = spring({
    frame,
    fps,
    config: {
      damping: 11,
      stiffness: 180,
      mass: 0.7,
    },
  });

  const titleProgress = spring({
    frame: frame - 10,
    fps,
    config: {
      damping: 13,
      stiffness: 190,
      mass: 0.65,
    },
  });

  const labelProgress = spring({
    frame: frame - 22,
    fps,
    config: {
      damping: 14,
      stiffness: 170,
      mass: 0.65,
    },
  });

  const cameraScale = interpolate(frame, [0, 149], [1, 1.055], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const orangeRotation = interpolate(pop, [0, 1], [-18, -5]);
  const blueRotation = interpolate(pop, [0, 1], [10, 2]);
  const titleY = interpolate(titleProgress, [0, 1], [170, 0]);
  const titleRotation = interpolate(titleProgress, [0, 1], [-8, -2]);
  const labelX = interpolate(labelProgress, [0, 1], [220, 0]);

  return (
    <AbsoluteFill
      style={{
        overflow: 'hidden',
        backgroundColor: '#111111',
        fontFamily: 'Arial, Helvetica, sans-serif',
      }}
    >
      <AbsoluteFill
        style={{
          transform: `scale(${cameraScale})`,
          transformOrigin: '50% 50%',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'radial-gradient(circle at 18% 22%, rgba(255,255,255,0.06) 0 1px, transparent 1px), radial-gradient(circle at 74% 64%, rgba(255,255,255,0.045) 0 1px, transparent 1px)',
            backgroundSize: '9px 9px, 13px 13px',
            opacity: 0.55,
          }}
        />

        <div
          style={{
            position: 'absolute',
            width: 760,
            height: 760,
            borderRadius: '50%',
            background: '#087DEB',
            left: 275,
            top: 390,
            transform: `scale(${interpolate(pop, [0, 1], [0.35, 1])}) rotate(${blueRotation}deg)`,
            opacity: interpolate(pop, [0, 1], [0, 1]),
          }}
        />

        <div
          style={{
            position: 'absolute',
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: '#FF5A12',
            left: 70,
            top: 235,
            transform: `scale(${interpolate(pop, [0, 1], [0.4, 1])}) rotate(${orangeRotation}deg)`,
            opacity: interpolate(pop, [0, 1], [0, 1]),
          }}
        />

        <div
          style={{
            position: 'absolute',
            left: 65,
            right: -120,
            top: 520,
            fontSize: 225,
            fontWeight: 900,
            letterSpacing: -15,
            lineHeight: 0.78,
            color: '#F3EBDD',
            textTransform: 'uppercase',
            transform: `translateY(${titleY}px) rotate(${titleRotation}deg)`,
            textShadow: '0 12px 0 rgba(0,0,0,0.22)',
          }}
        >
          KINETIC
          <br />
          COLLAGE
        </div>

        <div
          style={{
            position: 'absolute',
            left: 85,
            top: 1190,
            padding: '24px 34px',
            background: '#F3EBDD',
            color: '#111111',
            fontSize: 58,
            fontWeight: 900,
            letterSpacing: -2,
            transform: `translateX(${labelX}px) rotate(-3deg)`,
          }}
        >
          STYLE 001 / KEC
        </div>

        <div
          style={{
            position: 'absolute',
            right: 80,
            top: 1335,
            width: 610,
            color: '#F3EBDD',
            fontSize: 31,
            lineHeight: 1.25,
            letterSpacing: 2,
            textTransform: 'uppercase',
            transform: 'rotate(2deg)',
          }}
        >
          CUTOUTS / PAPER GRAIN / BOLD TYPE / OVERSHOOT / STAGGER / CAMERA PUSH
        </div>

        <div
          style={{
            position: 'absolute',
            left: 95,
            bottom: 120,
            width: 12,
            height: 260,
            background: '#FF5A12',
            transform: 'rotate(13deg)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 130,
            bottom: 90,
            width: 12,
            height: 190,
            background: '#F3EBDD',
            transform: 'rotate(28deg)',
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
