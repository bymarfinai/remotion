import {Composition, Folder} from 'remotion';
import {MarfinTest} from './MarfinTest';
import {KECStylePreview} from './styles/kinetic-editorial-collage/StylePreview';
import {MonasKECV3} from './generated/monas-kec-v3/Video';
import {MonasEIMV12} from './generated/monas-eim-v12/Video';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Styles">
        <Composition
          id="Style-KEC-Preview"
          component={KECStylePreview}
          durationInFrames={150}
          fps={30}
          width={1080}
          height={1920}
        />
      </Folder>

      <Folder name="Production">
        <Composition
          id="KEC-Approved-v3"
          component={MonasKECV3}
          durationInFrames={150}
          fps={30}
          width={1080}
          height={1920}
        />
      </Folder>

      <Folder name="References">
        <Composition
          id="EIM-Legacy-v12"
          component={MonasEIMV12}
          durationInFrames={300}
          fps={30}
          width={1080}
          height={1920}
        />
      </Folder>

      <Folder name="Tests">
        <Composition
          id="MarfinTest"
          component={MarfinTest}
          durationInFrames={90}
          fps={30}
          width={1920}
          height={1080}
        />
      </Folder>
    </>
  );
};
