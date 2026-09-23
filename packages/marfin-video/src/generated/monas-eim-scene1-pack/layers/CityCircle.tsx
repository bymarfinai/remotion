import React from 'react';
import {Img, staticFile, useCurrentFrame} from 'remotion';
import {EIM, SCENE1} from '../config';
import {fromScale, fromX, fromY, reveal} from '../motion';

const CITY = staticFile('generated/monas-eim-v9/city-circle-visual.webp');

export const PaleCircle: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = reveal(frame, 10, 20);
  const x = fromX(frame, 10, 20, 50);
  const scale = fromScale(frame, 10, 20, 0.94);

  return (
    <div
      data-eim-layer="pale-circle"
      style={{
        position: 'absolute',
        right: SCENE1.cityCircle.right,
        top: SCENE1.cityCircle.top,
        width: SCENE1.cityCircle.size,
        height: SCENE1.cityCircle.size,
        borderRadius: '50%',
        background: EIM.pale,
        opacity,
        transform: `translateX(${x}px) scale(${scale})`,
        transformOrigin: '50% 50%',
        zIndex: 8,
      }}
    />
  );
};

export const CityArtwork: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = reveal(frame, 12, 24);
  const y = fromY(frame, 12, 24, 28);
  const scale = fromScale(frame, 12, 24, 0.97);

  return (
    <div
      data-eim-layer="city-artwork"
      style={{
        position: 'absolute',
        right: SCENE1.cityCircle.right,
        top: SCENE1.cityCircle.top,
        width: SCENE1.cityCircle.size,
        height: SCENE1.cityCircle.size,
        borderRadius: '50%',
        overflow: 'hidden',
        opacity,
        transform: `translateY(${y}px) scale(${scale})`,
        transformOrigin: '50% 50%',
        zIndex: 12,
      }}
    >
      <Img
        src={CITY}
        data-eim-layer="city-image"
        style={{
          position: 'absolute',
          left: SCENE1.cityImage.left,
          top: SCENE1.cityImage.top,
          width: SCENE1.cityImage.width,
          height: SCENE1.cityImage.height,
          objectFit: 'cover',
        }}
      />
    </div>
  );
};