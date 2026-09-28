import React from 'react';
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from 'remotion';

const CREAM = '#F7F4EC';
const BLUE = '#2F62F1';

const SCENE_1 = staticFile('generated/monas-eim-v8/scene-01.webp');
const SCENE_2 = staticFile('generated/monas-eim-v8/scene-02.webp');
const SCENE_3 = staticFile('generated/monas-eim-v8/scene-03.webp');

const clamp = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
};

const ease = Easing.bezier(0.16, 1, 0.3, 1);

const p = (
  frame: number,
  from: number,
  to: number,
  outFrom = 0,
  outTo = 1,
) =>
  interpolate(frame, [from, to], [outFrom, outTo], {
    ...clamp,
    easing: ease,
  });

const sceneOpacity = (
  frame: number,
  start: number,
  end: number,
  fade = 8,
) => {
  if (frame < start || frame > end) {
    return 0;
  }

  const fadeIn = p(frame, start, start + fade);
  const fadeOut = p(frame, end - fade, end, 1, 0);

  return Math.min(fadeIn, fadeOut);
};

const ScenePlate: React.FC<{
  src: string;
  opacity: number;
  transform: string;
  zIndex: number;
}> = ({src, opacity, transform, zIndex}) => {
  return (
    <AbsoluteFill
      style={{
        opacity,
        zIndex,
        background: CREAM,
        overflow: 'hidden',
        transform,
        transformOrigin: '50% 50%',
      }}
    >
      <Img
        src={src}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
    </AbsoluteFill>
  );
};

export const MonasEIMFullCompTest: React.FC = () => {
  const frame = useCurrentFrame();

  // 3 scenes x 60 frames = 180 frames / 6 seconds.
  // Small overlaps are intentional so this behaves as one continuous timeline.
  const s1Opacity = sceneOpacity(frame, 0, 64, 8);
  const s2Opacity = sceneOpacity(frame, 54, 124, 8);
  const s3Opacity = sceneOpacity(frame, 114, 179, 8);

  const s1Scale = p(frame, 0, 60, 1, 1.035);
  const s1X = p(frame, 54, 64, 0, -54);

  const s2X = p(frame, 54, 64, 72, 0) + p(frame, 114, 124, 0, -72);
  const s2Scale =
    p(frame, 54, 66, 0.985, 1) + p(frame, 114, 124, 0, 0.025);

  const s3Y = p(frame, 114, 124, 74, 0);
  const s3Scale = p(frame, 114, 126, 1.025, 1);

  const boundary1 = p(frame, 52, 60) * p(frame, 60, 68, 1, 0);
  const boundary2 = p(frame, 112, 120) * p(frame, 120, 128, 1, 0);

  return (
    <AbsoluteFill style={{background: CREAM, overflow: 'hidden'}}>
      <ScenePlate
        src={SCENE_1}
        opacity={s1Opacity}
        transform={`translateX(${s1X}px) scale(${s1Scale})`}
        zIndex={1}
      />

      <ScenePlate
        src={SCENE_2}
        opacity={s2Opacity}
        transform={`translateX(${s2X}px) scale(${s2Scale})`}
        zIndex={2}
      />

      <ScenePlate
        src={SCENE_3}
        opacity={s3Opacity}
        transform={`translateY(${s3Y}px) scale(${s3Scale})`}
        zIndex={3}
      />

      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: 1180,
          height: 1180,
          borderRadius: '50%',
          background: BLUE,
          opacity: boundary1 * 0.08,
          transform: `translate(-50%, -50%) scale(${0.25 + boundary1 * 1.2})`,
          zIndex: 4,
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: '68%',
          top: '56%',
          width: 900,
          height: 900,
          borderRadius: '50%',
          border: `5px solid ${BLUE}`,
          opacity: boundary2 * 0.15,
          transform: `translate(-50%, -50%) scale(${0.55 + boundary2 * 0.7})`,
          zIndex: 4,
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};
