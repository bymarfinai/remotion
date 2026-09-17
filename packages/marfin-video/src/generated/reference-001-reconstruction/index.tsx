import React from 'react';
import {Composition, registerRoot} from 'remotion';
import {Video} from './Video';

const Reference001Reconstruction: React.FC = () => {
  return (
    <Composition
      id="Reference001Reconstruction"
      component={Video}
      durationInFrames={484}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};

registerRoot(Reference001Reconstruction);
