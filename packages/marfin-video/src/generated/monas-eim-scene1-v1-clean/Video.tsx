import React from 'react';
import {AbsoluteFill} from 'remotion';
import {EIM, SCENE1} from './config';
import {HeaderCenter, HeaderLeft, HeaderRight, FooterDash, FooterText} from './layers/HeaderFooter';
import {QuestionText, IconicTitle, SupportingCopy} from './layers/Typography';
import {CityMask, PaleCircle} from './layers/CityVisual';

export const MonasEIMScene1V1: React.FC = () => {
  return (
    <AbsoluteFill style={{background:EIM.outer,overflow:'hidden',fontFamily:'Arial, Helvetica, sans-serif'}}>
      <div data-eim-layer="scene-card" style={{position:'absolute',left:SCENE1.cardInset,right:SCENE1.cardInset,top:SCENE1.cardInset,bottom:SCENE1.cardInset,borderRadius:SCENE1.cardRadius,overflow:'hidden',background:EIM.paper,border:`2px solid ${EIM.navy}`}}>
        <PaleCircle />
        <CityMask />
        <QuestionText />
        <IconicTitle />
        <SupportingCopy />
        <HeaderLeft />
        <HeaderCenter />
        <HeaderRight />
        <FooterDash />
        <FooterText />
      </div>
    </AbsoluteFill>
  );
};