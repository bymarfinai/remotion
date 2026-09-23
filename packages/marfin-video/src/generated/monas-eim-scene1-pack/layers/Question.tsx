import React from 'react';
import {useCurrentFrame} from 'remotion';
import {EIM, SCENE1} from '../config';
import {fromY, reveal} from '../motion';

export const QuestionText: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = reveal(frame, 2, 12);
  const y = fromY(frame, 2, 12, 28);

  return (
    <div
      data-eim-layer="question-text"
      style={{
        position: 'absolute',
        left: SCENE1.question.left,
        top: SCENE1.question.top,
        width: SCENE1.question.width,
        color: EIM.navy,
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: SCENE1.question.fontSize,
        fontWeight: 700,
        letterSpacing: '-.045em',
        lineHeight: SCENE1.question.lineHeight,
        opacity,
        transform: `translateY(${y}px)`,
        zIndex: 30,
      }}
    >
      What<br />makes a city<br />truly
    </div>
  );
};