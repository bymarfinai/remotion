import {Composition, Folder} from 'remotion';
import {MarfinTest} from './MarfinTest';
import {KECStylePreview} from './styles/kinetic-editorial-collage/StylePreview';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Styles">
        <Folder name="001-Kinetic-Editorial-Collage">
          <Composition
            id="Style-KEC-Preview"
            component={KECStylePreview}
            durationInFrames={150}
            fps={30}
            width={1080}
            height={1920}
          />
        </Folder>
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
