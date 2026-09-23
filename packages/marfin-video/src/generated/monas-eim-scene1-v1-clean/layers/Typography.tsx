import React from 'react';
import {useCurrentFrame} from 'remotion';
import {EIM, SCENE1} from '../config';
import {fromY, reveal} from '../motion';

export const QuestionText: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = reveal(frame, 2, 12);
  const y = fromY(frame, 2, 12, 24);
  return (
    <div data-eim-layer="question-text" style={{position:'absolute',left:SCENE1.question.left,top:SCENE1.question.top,width:SCENE1.question.width,color:EIM.navy,fontFamily:'Arial, Helvetica, sans-serif',fontSize:SCENE1.question.fontSize,fontWeight:700,letterSpacing:'-.045em',lineHeight:SCENE1.question.lineHeight,opacity,transform:`translateY(${y}px)`,zIndex:30}}>
      What<br/>makes a city<br/>truly
    </div>
  );
};

export const IconicTitle: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = reveal(frame, 8, 18);
  const y = fromY(frame, 8, 18, 28);
  return (
    <div data-eim-layer="iconic-title" style={{position:'absolute',left:SCENE1.iconic.left,top:SCENE1.iconic.top,color:EIM.blue,fontFamily:'Arial Narrow, Arial, Helvetica, sans-serif',fontSize:SCENE1.iconic.fontSize,fontWeight:950,letterSpacing:'-.072em',lineHeight:SCENE1.iconic.lineHeight,whiteSpace:'nowrap',opacity,transform:`translateY(${y}px)`,zIndex:36}}>
      ICONIC?
    </div>
  );
};

export const SupportingCopy: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = reveal(frame, 14, 24);
  const y = fromY(frame, 14, 24, 16);
  return (
    <div data-eim-layer="supporting-copy" style={{position:'absolute',left:SCENE1.supporting.left,top:SCENE1.supporting.top,width:SCENE1.supporting.width,color:EIM.navy,fontFamily:'Arial, Helvetica, sans-serif',fontSize:SCENE1.supporting.fontSize,fontWeight:700,letterSpacing:'-.02em',lineHeight:SCENE1.supporting.lineHeight,opacity,transform:`translateY(${y}px)`,zIndex:34}}>
      More than<br/>buildings,<br/>it&apos;s what people<br/>remember.
    </div>
  );
};