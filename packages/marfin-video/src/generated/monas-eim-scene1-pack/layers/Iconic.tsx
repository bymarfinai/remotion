import React from 'react';
import {useCurrentFrame} from 'remotion';
import {EIM, SCENE1} from '../config';
import {fromY, reveal} from '../motion';

export const IconicTitle: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = reveal(frame, 8, 18);
  const y = fromY(frame, 8, 18, 34);

  return (
    <div
      data-eim-layer="iconic-title"
      style={{
        position: 'absolute',
        left: SCENE1.iconic.left,
        top: SCENE1.iconic.top,
        width: SCENE1.iconic.width,
        color: EIM.blue,
        fontFamily: 'Arial Narrow, Arial, Helvetica, sans-serif',
        fontSize: SCENE1.iconic.fontSize,
        fontWeight: 950,
        letterSpacing: '-.075em',
        lineHeight: SCENE1.iconic.lineHeight,
        whiteSpace: 'nowrap',
        opacity,
        transform: `translateY(${y}px)`,
        zIndex: 35,
      }}
    >
      ICONIC?
    </div>
  );
};