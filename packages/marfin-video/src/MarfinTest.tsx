import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export const MarfinTest: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: {
      damping: 18,
      stiffness: 120,
    },
  });

  const opacity = interpolate(frame, [0, 20, 70, 89], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const translateY = interpolate(entrance, [0, 1], [80, 0]);
  const scale = interpolate(entrance, [0, 1], [0.94, 1]);

  return (
    <AbsoluteFill
      style={{
        background: '#0A0D12',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          opacity,
          transform: `translateY(${translateY}px) scale(${scale})`,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: 26,
            letterSpacing: 8,
            textTransform: 'uppercase',
            color: '#9BA7B4',
            marginBottom: 30,
          }}
        >
          MARFIN MOTION ENGINE
        </div>

        <div
          style={{
            fontSize: 112,
            fontWeight: 700,
            letterSpacing: -5,
            color: 'white',
          }}
        >
          CREATE.
        </div>

        <div
          style={{
            fontSize: 112,
            fontWeight: 700,
            letterSpacing: -5,
            color: 'white',
          }}
        >
          ADAPT.
        </div>

        <div
          style={{
            fontSize: 112,
            fontWeight: 700,
            letterSpacing: -5,
            color: 'white',
          }}
        >
          RENDER.
        </div>
      </div>
    </AbsoluteFill>
  );
};
