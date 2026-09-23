import React from 'react';
import {Img, staticFile, useCurrentFrame} from 'remotion';
import {SCENE1} from '../config';
import {fromScale, fromY, reveal} from '../motion';

const CITY = staticFile('generated/monas-eim-scene1-pack/city-circle.png');

export const CityArtwork: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = reveal(frame, 12, 24);
  const y = fromY(frame, 12, 24, 32);
  const scale = fromScale(frame, 12, 24, 0.985);

  return (
    <Img
      src={CITY}
      data-eim-layer="city-artwork"
      style={{
        position: 'absolute',
        left: SCENE1.cityArtwork.left,
        top: SCENE1.cityArtwork.top,
        width: SCENE1.cityArtwork.width,
        height: 'auto',
        opacity,
        transform: `translateY(${y}px) scale(${scale})`,
        transformOrigin: '50% 50%',
        zIndex: 12,
      }}
    />
  );
};