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
  outer: '#0A2645',
  paper: '#F6F3EC',
  navy: '#143B72',
  blue: '#245FF5',
  pale: '#DCE4EE',
};

const CITY = staticFile('generated/monas-eim-scene1-v1/city-visual-tight.png');

const clamp = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
};

const enter = (frame: number, fps: number, start: number, distance = 24) => {
  const p = spring({
    frame: Math.max(0, frame - start),
    fps,
    config: {damping: 16, stiffness: 170, mass: 0.75},
  });

  return {
    p,
    opacity: interpolate(p, [0, 0.05, 1], [0, 1, 1], clamp),
    y: interpolate(p, [0, 1], [distance, 0], clamp),
    scale: interpolate(p, [0, 0.78, 1], [0.97, 1.01, 1], clamp),
  };
};

const SceneCard: React.FC<{children: React.ReactNode}> = ({children}) => (
  <div
    data-eim-layer="scene-card"
    style={{
      position: 'absolute',
      left: 18,
      right: 18,
      top: 18,
      bottom: 18,
      borderRadius: 28,
      overflow: 'hidden',
      background: C.paper,
      border: `2px solid ${C.navy}`,
    }}
  >
    {children}
  </div>
);

const HeaderLeft: React.FC = () => (
  <div
    data-eim-layer="header-left"
    style={{
      position: 'absolute',
      left: 118,
      top: 112,
      color: C.navy,
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: 16,
      fontWeight: 900,
      letterSpacing: 3.4,
      lineHeight: 1.12,
      zIndex: 80,
    }}
  >
    JAKARTA<br />INDONESIA
  </div>
);

const HeaderCenter: React.FC = () => (
  <div
    data-eim-layer="header-center-line"
    style={{
      position: 'absolute',
      left: 566,
      top: 145,
      width: 104,
      height: 4,
      borderRadius: 999,
      background: C.navy,
      zIndex: 80,
    }}
  />
);

const HeaderRight: React.FC = () => (
  <div
    data-eim-layer="header-right"
    style={{
      position: 'absolute',
      right: 112,
      top: 120,
      color: C.navy,
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: 15,
      fontWeight: 900,
      letterSpacing: 2.5,
      zIndex: 80,
    }}
  >
    01 / 07
  </div>
);

const QuestionText: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const e = enter(frame, fps, 2, 28);

  return (
    <div
      data-eim-layer="question-text"
      style={{
        position: 'absolute',
        left: 122,
        top: 330,
        width: 610,
        color: C.navy,
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: 88,
        fontWeight: 700,
        letterSpacing: -4.4,
        lineHeight: 0.91,
        opacity: e.opacity,
        transform: `translateY(${e.y}px)`,
        zIndex: 30,
      }}
    >
      What<br />makes a city<br />truly
    </div>
  );
};

const IconicTitle: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const e = enter(frame, fps, 8, 34);

  return (
    <div
      data-eim-layer="iconic-title"
      style={{
        position: 'absolute',
        left: 116,
        top: 646,
        color: C.blue,
        fontFamily: 'Arial Narrow, Arial, Helvetica, sans-serif',
        fontSize: 230,
        fontWeight: 950,
        letterSpacing: -15,
        lineHeight: 0.78,
        whiteSpace: 'nowrap',
        opacity: e.opacity,
        transform: `translateY(${e.y}px) scale(${e.scale})`,
        transformOrigin: '0 50%',
        zIndex: 35,
      }}
    >
      ICONIC?
    </div>
  );
};

const SupportingCopy: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const e = enter(frame, fps, 16, 18);

  return (
    <div
      data-eim-layer="supporting-copy"
      style={{
        position: 'absolute',
        left: 142,
        top: 1230,
        width: 250,
        color: C.navy,
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: 28,
        fontWeight: 700,
        letterSpacing: -0.7,
        lineHeight: 0.98,
        opacity: e.opacity,
        transform: `translateY(${e.y}px)`,
        zIndex: 40,
      }}
    >
      More than<br />buildings,<br />it&apos;s what people<br />remember.
    </div>
  );
};

const PaleCircle: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const e = enter(frame, fps, 10, 36);

  return (
    <div
      data-eim-layer="pale-circle"
      style={{
        position: 'absolute',
        left: 505,
        top: 1010,
        width: 1110,
        height: 1110,
        borderRadius: '50%',
        background: C.pale,
        opacity: e.opacity,
        transform: `translateY(${e.y}px) scale(${e.scale})`,
        transformOrigin: '50% 50%',
        zIndex: 10,
      }}
    />
  );
};

const CityArtwork: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const e = enter(frame, fps, 13, 30);

  return (
    <div
      data-eim-layer="city-artwork-mask"
      style={{
        position: 'absolute',
        left: 505,
        top: 1010,
        width: 1110,
        height: 1110,
        borderRadius: '50%',
        overflow: 'hidden',
        opacity: e.opacity,
        transform: `translateY(${e.y}px) scale(${e.scale})`,
        transformOrigin: '50% 50%',
        zIndex: 16,
      }}
    >
      <Img
        data-eim-layer="city-visual"
        src={CITY}
        style={{
          position: 'absolute',
          left: -10,
          top: 100,
          width: 690,
          height: 'auto',
          objectFit: 'contain',
        }}
      />
    </div>
  );
};

const FooterDash: React.FC = () => (
  <div
    data-eim-layer="footer-dash"
    style={{
      position: 'absolute',
      left: 138,
      bottom: 126,
      width: 112,
      height: 4,
      borderRadius: 999,
      background: C.blue,
      zIndex: 80,
    }}
  />
);

const FooterText: React.FC = () => (
  <div
    data-eim-layer="footer-text"
    style={{
      position: 'absolute',
      left: 138,
      bottom: 70,
      color: C.navy,
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: 13,
      fontWeight: 900,
      letterSpacing: 3.2,
      zIndex: 80,
    }}
  >
    MONAS / JAKARTA
  </div>
);

export const MonasEIMScene1V1: React.FC = () => {
  const frame = useCurrentFrame();
  const cameraScale = interpolate(frame, [0, 149], [1, 1.008], clamp);

  return (
    <AbsoluteFill style={{background: C.outer, overflow: 'hidden'}}>
      <SceneCard>
        <AbsoluteFill
          style={{
            transform: `scale(${cameraScale})`,
            transformOrigin: '50% 50%',
          }}
        >
          <PaleCircle />
          <CityArtwork />
          <QuestionText />
          <IconicTitle />
          <SupportingCopy />
          <HeaderLeft />
          <HeaderCenter />
          <HeaderRight />
          <FooterDash />
          <FooterText />
        </AbsoluteFill>
      </SceneCard>
    </AbsoluteFill>
  );
};
