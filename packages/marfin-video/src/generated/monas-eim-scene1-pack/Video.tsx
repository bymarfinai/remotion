import React from 'react';
import {AbsoluteFill} from 'remotion';
import {EIM} from './config';
import {HeaderCenter, HeaderLeft, HeaderRight} from './layers/Header';
import {QuestionText} from './layers/Question';
import {IconicTitle} from './layers/Iconic';
import {SupportingCopy} from './layers/SupportingCopy';
import {CityArtwork, PaleCircle} from './layers/CityCircle';
import {FooterDash, FooterText} from './layers/Footer';

export const MonasEIMScene1LayerPack: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: EIM.outer,
        overflow: 'hidden',
        fontFamily: 'Arial, Helvetica, sans-serif',
      }}
    >
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
          background: EIM.paper,
          border: `2px solid ${EIM.navy}`,
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
      </div>
    </AbsoluteFill>
  );
};