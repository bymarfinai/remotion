import React from 'react';
import {
  AbsoluteFill,
  Img,
  Sequence,
  Easing,
  interpolate,
  staticFile,
  useCurrentFrame,
} from 'remotion';
import {DURATION, EIM, exactScene1 as C} from './config';

const ASSET = (name: string) =>
  staticFile(`generated/monas-eim-scene1-v1-clean/${name}`);

const MASTER = ASSET('scene1-master.png');
const HEADER_LEFT = ASSET('header-left.png');
const HEADER_CENTER = ASSET('header-center-line.png');
const HEADER_RIGHT = ASSET('header-right.png');
const QUESTION = ASSET('question-text.png');
const ICONIC = ASSET('iconic-title.png');
const SUPPORTING = ASSET('supporting-copy.png');
const CITY = ASSET('city-visual.png');
const FOOTER_DASH = ASSET('footer-dash.png');
const FOOTER_TEXT = ASSET('footer-text.png');

const clamp = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
};

const ease = Easing.bezier(0.16, 1, 0.3, 1);

const reveal = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], {...clamp, easing: ease});

const fromY = (
  frame: number,
  start: number,
  end: number,
  amount: number,
) => interpolate(frame, [start, end], [amount, 0], {...clamp, easing: ease});

const fromX = (
  frame: number,
  start: number,
  end: number,
  amount: number,
) => interpolate(frame, [start, end], [amount, 0], {...clamp, easing: ease});

const fromScale = (
  frame: number,
  start: number,
  end: number,
  amount: number,
) => interpolate(frame, [start, end], [amount, 1], {...clamp, easing: ease});

type ExactAssetProps = {
  name: string;
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
  start: number;
  end: number;
  fromX?: number;
  fromY?: number;
  fromScale?: number;
  zIndex: number;
};

const ExactAsset: React.FC<ExactAssetProps> = ({
  name,
  src,
  x,
  y,
  width,
  height,
  start,
  end,
  fromX: initialX = 0,
  fromY: initialY = 0,
  fromScale: initialScale = 1,
  zIndex,
}) => {
  const frame = useCurrentFrame();
  const opacity = reveal(frame, start, end);
  const tx = fromX(frame, start, end, initialX);
  const ty = fromY(frame, start, end, initialY);
  const scale = fromScale(frame, start, end, initialScale);

  return (
    <Img
      data-eim-layer={name}
      src={src}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width,
        height,
        objectFit: 'fill',
        opacity,
        transform: `translate(${tx}px, ${ty}px) scale(${scale})`,
        transformOrigin: '50% 50%',
        zIndex,
      }}
    />
  );
};

const BasePoster: React.FC = () => (
  <AbsoluteFill style={{background: EIM.outer}}>
    <div
      data-eim-layer="base-card"
      style={{
        position: 'absolute',
        left: 17,
        right: 17,
        top: 17,
        bottom: 17,
        borderRadius: 43,
        background: EIM.paper,
        border: `2px solid ${EIM.outer}`,
        overflow: 'hidden',
      }}
    />
  </AbsoluteFill>
);

const ExactLock: React.FC = () => {
  const frame = useCurrentFrame();
  if (!C.exactLock.enabled) return null;

  const opacity = interpolate(
    frame,
    [C.exactLock.startFrame, C.exactLock.endFrame],
    [0, 1],
    clamp,
  );

  return (
    <Img
      data-eim-layer="master-exact-lock"
      src={MASTER}
      style={{
        position: 'absolute',
        inset: 0,
        width: 1080,
        height: 1920,
        objectFit: 'fill',
        opacity,
        zIndex: 100,
      }}
    />
  );
};

export const MonasEIMScene1V1: React.FC = () => {
  const L = C.layers;

  return (
    <AbsoluteFill style={{background: EIM.outer, overflow: 'hidden'}}>
      <Sequence name="Base Poster" from={0} durationInFrames={DURATION}>
        <BasePoster />
      </Sequence>

      <Sequence name="Header Left" from={0} durationInFrames={DURATION}>
        <ExactAsset
          name="header-left"
          src={HEADER_LEFT}
          {...L.headerLeft}
          start={2}
          end={12}
          fromY={-12}
          fromScale={0.98}
          zIndex={20}
        />
      </Sequence>

      <Sequence name="Header Center Line" from={0} durationInFrames={DURATION}>
        <ExactAsset
          name="header-center-line"
          src={HEADER_CENTER}
          {...L.headerCenter}
          start={4}
          end={14}
          fromScale={0.7}
          zIndex={20}
        />
      </Sequence>

      <Sequence name="Header Right" from={0} durationInFrames={DURATION}>
        <ExactAsset
          name="header-right"
          src={HEADER_RIGHT}
          {...L.headerRight}
          start={4}
          end={14}
          fromY={-10}
          zIndex={20}
        />
      </Sequence>

      <Sequence name="Question Text" from={0} durationInFrames={DURATION}>
        <ExactAsset
          name="question-text"
          src={QUESTION}
          {...L.question}
          start={5}
          end={18}
          fromY={38}
          fromScale={0.97}
          zIndex={30}
        />
      </Sequence>

      <Sequence name="ICONIC Title" from={0} durationInFrames={DURATION}>
        <ExactAsset
          name="iconic-title"
          src={ICONIC}
          {...L.iconic}
          start={12}
          end={26}
          fromY={55}
          fromScale={0.93}
          zIndex={35}
        />
      </Sequence>

      <Sequence name="Supporting Copy" from={0} durationInFrames={DURATION}>
        <ExactAsset
          name="supporting-copy"
          src={SUPPORTING}
          {...L.supporting}
          start={20}
          end={32}
          fromX={-22}
          zIndex={30}
        />
      </Sequence>

      <Sequence name="City Visual" from={0} durationInFrames={DURATION}>
        <ExactAsset
          name="city-visual"
          src={CITY}
          {...L.city}
          start={18}
          end={36}
          fromX={90}
          fromY={60}
          fromScale={0.92}
          zIndex={15}
        />
      </Sequence>

      <Sequence name="Footer Dash" from={0} durationInFrames={DURATION}>
        <ExactAsset
          name="footer-dash"
          src={FOOTER_DASH}
          {...L.footerDash}
          start={28}
          end={40}
          fromX={-18}
          zIndex={25}
        />
      </Sequence>

      <Sequence name="Footer Text" from={0} durationInFrames={DURATION}>
        <ExactAsset
          name="footer-text"
          src={FOOTER_TEXT}
          {...L.footerText}
          start={30}
          end={42}
          fromY={10}
          zIndex={25}
        />
      </Sequence>

      <Sequence name="Master Exact Lock" from={0} durationInFrames={DURATION}>
        <ExactLock />
      </Sequence>
    </AbsoluteFill>
  );
};
