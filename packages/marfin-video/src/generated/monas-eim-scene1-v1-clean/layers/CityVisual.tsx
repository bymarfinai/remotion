import React from 'react';
import {Img, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {EIM, SCENE1} from '../config';
import {fromScale, fromX, fromY, reveal} from '../motion';

const SKYLINE = staticFile('generated/monas-eim-scene1-v1-clean/skyline-tight-v1.png');
const CLOUD = staticFile('generated/monas-eim-scene1-v1-clean/cloud-tight-v1.png');

export const PaleCircle: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = reveal(frame, 10, 20);
  const x = fromX(frame, 10, 20, 40);
  const scale = fromScale(frame, 10, 20, 0.95);

  return (
    <div
      data-eim-layer="pale-circle"
      style={{
        position: 'absolute',
        right: SCENE1.paleCircle.right,
        bottom: SCENE1.paleCircle.bottom,
        width: SCENE1.paleCircle.size,
        height: SCENE1.paleCircle.size,
        borderRadius: '50%',
        background: EIM.pale,
        opacity,
        transform: `translateX(${x}px) scale(${scale})`,
        zIndex: 6,
      }}
    />
  );
};

export const CityMask: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = reveal(frame, 12, 24);
  const y = fromY(frame, 12, 24, 20);
  const scale = fromScale(frame, 12, 24, 0.97);

  return (
    <div
      data-eim-layer="city-mask"
      style={{
        position: 'absolute',
        right: SCENE1.cityMask.right,
        bottom: SCENE1.cityMask.bottom,
        width: SCENE1.cityMask.size,
        height: SCENE1.cityMask.size,
        borderRadius: '50%',
        overflow: 'hidden',
        opacity,
        transform: `translateY(${y}px) scale(${scale})`,
        zIndex: 12,
      }}
    >
      <Sequence name="Cloud Artwork" from={0} durationInFrames={150}>
        <Img
          data-eim-layer="cloud-art"
          src={CLOUD}
          style={{
            position: 'absolute',
            left: SCENE1.cloud.left,
            bottom: SCENE1.cloud.bottom,
            width: SCENE1.cloud.width,
            height: 'auto',
          }}
        />
      </Sequence>

      <Sequence name="Skyline Artwork" from={0} durationInFrames={150}>
        <Img
          data-eim-layer="skyline-art"
          src={SKYLINE}
          style={{
            position: 'absolute',
            right: SCENE1.skyline.right,
            bottom: SCENE1.skyline.bottom,
            width: SCENE1.skyline.width,
            height: 'auto',
          }}
        />
      </Sequence>
    </div>
  );
};
