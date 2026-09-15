import {Composition} from 'remotion';
import {MarfinTest} from './MarfinTest';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MarfinTest"
        component={MarfinTest}
        durationInFrames={90}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
