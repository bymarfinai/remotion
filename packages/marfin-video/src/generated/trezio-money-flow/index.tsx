import React from 'react';
import {Composition, registerRoot} from 'remotion';
import {Video} from './Video';

const TrezioMoneyFlow: React.FC = () => {
  return (
    <Composition
      id="TrezioMoneyFlow"
      component={Video}
      durationInFrames={450}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};

registerRoot(TrezioMoneyFlow);
