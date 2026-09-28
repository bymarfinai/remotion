import React from 'react';
import {AbsoluteFill, Img, Sequence, staticFile} from 'remotion';
import {monasEimFullCompositionConfig as config} from './project-config';

const CREAM = '#F7F4EC';
const NAVY = '#163B6E';
const BLUE = '#2F62F1';
const PALE = '#E8EEF7';
const MUTED = '#55749A';

const asset = (scene: string, file: string) =>
  staticFile(`${config.assetsBase}/${scene}/${file}`);

const SCENE_1_SKYLINE = asset('scene-01', 'skyline-with-treeline.png');
const SCENE_1_CLOUDS = asset('scene-01', 'clouds.png');
const SCENE_1_PLAZA = asset('scene-01', 'foreground-plaza.png');

const SCENE_2_MONAS = asset('scene-02', 'monas-hero.png');
const SCENE_2_SKY = asset('scene-02', 'blue-sky-circle.png');
const SCENE_2_CLOUDS = asset('scene-02', 'bottom-cloud-bank.png');

const SCENE_3_ARC = asset('scene-03', 'blue-arc-three-nodes.png');

const baseText: React.CSSProperties = {
  position: 'absolute',
  fontFamily: 'Arial Narrow, Arial, Helvetica, sans-serif',
  color: NAVY,
};

const Header: React.FC<{page: string}> = ({page}) => {
  return (
    <>
      <div
        style={{
          ...baseText,
          left: 64,
          top: 58,
          fontSize: 21,
          fontWeight: 900,
          lineHeight: 1.08,
          letterSpacing: '0.16em',
        }}
      >
        JAKARTA
        <br />
        INDONESIA
      </div>

      <div
        style={{
          position: 'absolute',
          left: 470,
          top: 79,
          width: 78,
          height: 3,
          borderRadius: 99,
          background: BLUE,
        }}
      />

      <div
        style={{
          ...baseText,
          right: 64,
          top: 60,
          fontSize: 20,
          fontWeight: 900,
          letterSpacing: '0.13em',
        }}
      >
        {page}
      </div>
    </>
  );
};

const FooterLine: React.FC = () => {
  return (
    <div
      style={{
        position: 'absolute',
        left: 72,
        bottom: 82,
        width: 62,
        height: 3,
        background: BLUE,
        borderRadius: 99,
      }}
    />
  );
};

const Scene1: React.FC = () => {
  return (
    <AbsoluteFill style={{background: CREAM, overflow: 'hidden'}}>
      <Header page="01 / 07" />

      <div
        style={{
          ...baseText,
          left: 76,
          top: 275,
          width: 580,
          fontSize: 78,
          fontWeight: 700,
          lineHeight: 0.94,
          letterSpacing: '-0.045em',
        }}
      >
        What
        <br />
        makes a city
        <br />
        truly
      </div>

      <div
        style={{
          ...baseText,
          left: 72,
          top: 565,
          width: 760,
          color: BLUE,
          fontSize: 156,
          fontWeight: 950,
          lineHeight: 0.82,
          letterSpacing: '-0.055em',
        }}
      >
        ICONIC?
      </div>

      <div
        style={{
          ...baseText,
          left: 82,
          top: 1242,
          width: 255,
          fontSize: 28,
          fontWeight: 650,
          lineHeight: 1.02,
          letterSpacing: '-0.015em',
        }}
      >
        More than
        <br />
        buildings,
        <br />
        it&apos;s what people
        <br />
        remember.
      </div>

      <div
        style={{
          position: 'absolute',
          width: 790,
          height: 790,
          borderRadius: '50%',
          right: -235,
          bottom: -80,
          background: PALE,
          overflow: 'hidden',
        }}
      >
        <Img
          src={SCENE_1_SKYLINE}
          style={{
            position: 'absolute',
            width: 810,
            left: 5,
            bottom: 252,
          }}
        />
        <Img
          src={SCENE_1_CLOUDS}
          style={{
            position: 'absolute',
            width: 880,
            left: -70,
            bottom: 104,
            opacity: 0.96,
          }}
        />
        <Img
          src={SCENE_1_PLAZA}
          style={{
            position: 'absolute',
            width: 950,
            left: -85,
            bottom: -52,
            opacity: 0.96,
          }}
        />
      </div>

      <FooterLine />

      <div
        style={{
          ...baseText,
          left: 72,
          bottom: 42,
          fontSize: 14,
          fontWeight: 900,
          letterSpacing: '0.16em',
        }}
      >
        MONAS / JAKARTA
      </div>
    </AbsoluteFill>
  );
};

const Scene2: React.FC = () => {
  return (
    <AbsoluteFill style={{background: CREAM, overflow: 'hidden'}}>
      <Header page="02 / 07" />

      <div
        style={{
          ...baseText,
          left: 76,
          top: 200,
          fontSize: 76,
          fontWeight: 850,
          lineHeight: 1,
          letterSpacing: '-0.03em',
        }}
      >
        A
      </div>

      <div
        style={{
          ...baseText,
          left: 72,
          top: 276,
          width: 770,
          color: BLUE,
          fontSize: 154,
          fontWeight: 950,
          lineHeight: 0.8,
          letterSpacing: '-0.055em',
        }}
      >
        SYMBOL
      </div>

      <div
        style={{
          ...baseText,
          left: 76,
          top: 425,
          width: 390,
          fontSize: 48,
          fontWeight: 650,
          lineHeight: 0.92,
          letterSpacing: '-0.025em',
        }}
      >
        can hold
        <br />a whole city.
      </div>

      <Img
        src={SCENE_2_SKY}
        style={{
          position: 'absolute',
          width: 790,
          height: 790,
          objectFit: 'contain',
          left: 275,
          top: 690,
        }}
      />

      <Img
        src={SCENE_2_CLOUDS}
        style={{
          position: 'absolute',
          width: 1000,
          left: 80,
          top: 1215,
          opacity: 0.95,
        }}
      />

      <Img
        src={SCENE_2_MONAS}
        style={{
          position: 'absolute',
          height: 1180,
          right: -20,
          bottom: -25,
          objectFit: 'contain',
          zIndex: 8,
        }}
      />

      <div
        style={{
          ...baseText,
          left: 78,
          top: 1390,
          fontSize: 20,
          fontWeight: 900,
          lineHeight: 1.72,
          letterSpacing: '0.14em',
          color: MUTED,
          zIndex: 12,
        }}
      >
        PEOPLE
        <br />
        HISTORY
        <br />
        IDENTITY
        <br />
        TOMORROW
      </div>

      <FooterLine />
    </AbsoluteFill>
  );
};

const Scene3Label: React.FC<{
  left: number;
  top: number;
  title: string;
  sub: React.ReactNode;
}> = ({left, top, title, sub}) => {
  return (
    <div
      style={{
        ...baseText,
        left,
        top,
        width: 260,
        zIndex: 10,
      }}
    >
      <div
        style={{
          fontSize: 23,
          fontWeight: 950,
          lineHeight: 1,
          letterSpacing: '0.09em',
        }}
      >
        {title}
      </div>
      <div
        style={{
          marginTop: 10,
          color: MUTED,
          fontSize: 18,
          fontWeight: 700,
          lineHeight: 1.08,
          letterSpacing: '0.09em',
        }}
      >
        {sub}
      </div>
    </div>
  );
};

const Scene3: React.FC = () => {
  return (
    <AbsoluteFill style={{background: CREAM, overflow: 'hidden'}}>
      <div
        style={{
          ...baseText,
          left: 74,
          top: 275,
          width: 330,
          fontSize: 58,
          fontWeight: 700,
          lineHeight: 0.95,
          letterSpacing: '-0.04em',
        }}
      >
        It brings
        <br />
        together
      </div>

      <div
        style={{
          ...baseText,
          left: 72,
          top: 470,
          width: 500,
          color: BLUE,
          fontSize: 116,
          fontWeight: 950,
          lineHeight: 0.82,
          letterSpacing: '-0.055em',
        }}
      >
        PLACE
        <br />
        PEOPLE
        <br />
        PURPOSE
      </div>

      <Img
        src={SCENE_3_ARC}
        style={{
          position: 'absolute',
          width: 520,
          height: 1560,
          objectFit: 'contain',
          left: 465,
          top: 205,
          zIndex: 4,
        }}
      />

      <Scene3Label
        left={765}
        top={430}
        title="PLACE"
        sub={
          <>
            A CAPITAL
            <br />
            CITY
          </>
        }
      />

      <Scene3Label
        left={800}
        top={925}
        title="PEOPLE"
        sub={
          <>
            A SHARED
            <br />
            STORY
          </>
        }
      />

      <Scene3Label
        left={690}
        top={1395}
        title="PURPOSE"
        sub={
          <>
            A BRIGHTER
            <br />
            TOMORROW
          </>
        }
      />

      <FooterLine />
    </AbsoluteFill>
  );
};

export const MonasEIMFullCompositionTest: React.FC = () => {
  return (
    <AbsoluteFill style={{background: CREAM}}>
      <Sequence from={0} durationInFrames={config.sceneDurationInFrames}>
        <Scene1 />
      </Sequence>

      <Sequence
        from={config.sceneDurationInFrames}
        durationInFrames={config.sceneDurationInFrames}
      >
        <Scene2 />
      </Sequence>

      <Sequence
        from={config.sceneDurationInFrames * 2}
        durationInFrames={config.sceneDurationInFrames}
      >
        <Scene3 />
      </Sequence>
    </AbsoluteFill>
  );
};
