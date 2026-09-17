import React from 'react';
import {Composition, registerRoot} from 'remotion';
import {Video} from './Video';

const Reference001ReconstructionV3: React.FC = () => {
  return (
    <Composition
      id="Reference001ReconstructionV3"
      component={Video}
      durationInFrames={484}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};

registerRoot(Reference001ReconstructionV3);
