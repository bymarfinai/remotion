import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {EIM, SCENE1} from './config';
import {
  FooterDash,
  FooterText,
  HeaderCenter,
  HeaderLeft,
  HeaderRight,
} from './layers/HeaderFooter';
import {
  IconicTitle,
  QuestionText,
  SupportingCopy,
} from './layers/Typography';
import {CityMask, PaleCircle} from './layers/CityVisual';

const DURATION = 150;

export const MonasEIMScene1V1: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: EIM.outer,
        overflow: 'hidden',
        fontFamily: 'Arial, Helvetica, sans-serif',
      }}
    >
      <Sequence name="Scene Card" from={0} durationInFrames={DURATION}>
        <div
          data-eim-layer="scene-card"
          style={{
            position: 'absolute',
            left: SCENE1.cardInset,
            right: SCENE1.cardInset,
            top: SCENE1.cardInset,
            bottom: SCENE1.cardInset,
            borderRadius: SCENE1.cardRadius,
            overflow: 'hidden',
            background: EIM.paper,
            border: `2px solid ${EIM.navy}`,
          }}
        >
          <Sequence name="Pale Circle" from={0} durationInFrames={DURATION}>
            <PaleCircle />
          </Sequence>

          <Sequence name="City Visual" from={0} durationInFrames={DURATION}>
            <CityMask />
          </Sequence>

          <Sequence name="Question Text" from={0} durationInFrames={DURATION}>
            <QuestionText />
          </Sequence>

          <Sequence name="ICONIC Title" from={0} durationInFrames={DURATION}>
            <IconicTitle />
          </Sequence>

          <Sequence name="Supporting Copy" from={0} durationInFrames={DURATION}>
            <SupportingCopy />
          </Sequence>

          <Sequence name="Header Left" from={0} durationInFrames={DURATION}>
            <HeaderLeft />
          </Sequence>

          <Sequence name="Header Center Line" from={0} durationInFrames={DURATION}>
            <HeaderCenter />
          </Sequence>

          <Sequence name="Header Right" from={0} durationInFrames={DURATION}>
            <HeaderRight />
          </Sequence>

          <Sequence name="Footer Dash" from={0} durationInFrames={DURATION}>
            <FooterDash />
          </Sequence>

          <Sequence name="Footer Text" from={0} durationInFrames={DURATION}>
            <FooterText />
          </Sequence>
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};
