import React from 'react';
import {useCurrentFrame} from 'remotion';
import {EIM, SCENE1} from '../config';
import {fromY, reveal} from '../motion';

export const SupportingCopy: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = reveal(frame, 14, 24);
  const y = fromY(frame, 14, 24, 18);

  return (
    <div
      data-eim-layer="supporting-copy"
      style={{
        position: 'absolute',
        left: SCENE1.supporting.left,
        top: SCENE1.supporting.top,
        width: SCENE1.supporting.width,
        color: EIM.navy,
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: SCENE1.supporting.fontSize,
        fontWeight: 700,
        letterSpacing: '-.02em',
        lineHeight: SCENE1.supporting.lineHeight,
        opacity,
        transform: `translateY(${y}px)`,
        zIndex: 32,
      }}
    >
      More than<br />buildings,<br />it&apos;s what people<br />remember.
    </div>
  );
};