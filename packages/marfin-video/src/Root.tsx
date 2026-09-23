import {Composition, Folder} from 'remotion';
import {MarfinTest} from './MarfinTest';
import {KECStylePreview} from './styles/kinetic-editorial-collage/StylePreview';
import {MonasKECVideo} from './generated/monas-kec-v1/Video';
import {MonasKECV2} from './generated/monas-kec-v2/Video';
import {MonasKECV3} from './generated/monas-kec-v3/Video';
import {MonasEIMV1} from './generated/monas-eim-v1/Video';
import {MonasEIMV2} from './generated/monas-eim-v2/Video';
import {MonasEIMV3} from './generated/monas-eim-v3/Video';
import {MonasEIMV4} from './generated/monas-eim-v4/Video';
import {MonasEIMV5} from './generated/monas-eim-v5/Video';
import {MonasEIMV6} from './generated/monas-eim-v6/Video';
import {MonasEIMV7} from './generated/monas-eim-v7/Video';
import {MonasEIMV8} from './generated/monas-eim-v8/Video';
import {MonasEIMV9} from './generated/monas-eim-v9/Video';
import {MonasEIMV10} from './generated/monas-eim-v10/Video';
import {MonasEIMV12} from './generated/monas-eim-v12/Video';
import {MonasEIMScene1Exact} from './generated/monas-eim-scene1-exact/Scene1Exact';

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

      <Folder name="Generated">
        <Folder name="KEC">
          <Composition
            id="Monas-5s-v1"
            component={MonasKECVideo}
            durationInFrames={150}
            fps={30}
            width={1080}
            height={1920}
          />
          <Composition
            id="Monas-5s-v2"
            component={MonasKECV2}
            durationInFrames={150}
            fps={30}
            width={1080}
            height={1920}
          />
          <Composition
            id="Monas-5s-v3"
            component={MonasKECV3}
            durationInFrames={150}
            fps={30}
            width={1080}
            height={1920}
          />
        </Folder>
        <Folder name="EIM">
          <Composition
            id="Monas-5s-EIM-v1"
            component={MonasEIMV1}
            durationInFrames={150}
            fps={30}
            width={1080}
            height={1920}
          />
          <Composition
            id="Monas-5s-EIM-v2"
            component={MonasEIMV2}
            durationInFrames={150}
            fps={30}
            width={1080}
            height={1920}
          />
          <Composition
            id="Monas-5s-EIM-v3"
            component={MonasEIMV3}
            durationInFrames={150}
            fps={30}
            width={1080}
            height={1920}
          />
          <Composition
            id="Monas-7s-EIM-v4"
            component={MonasEIMV4}
            durationInFrames={210}
            fps={30}
            width={1080}
            height={1920}
          />
          <Composition
            id="Monas-7s-EIM-v5"
            component={MonasEIMV5}
            durationInFrames={210}
            fps={30}
            width={1080}
            height={1920}
          />
          <Composition
            id="Monas-10s-EIM-v6"
            component={MonasEIMV6}
            durationInFrames={300}
            fps={30}
            width={1080}
            height={1920}
          />
          <Composition
            id="Monas-10s-EIM-v7"
            component={MonasEIMV7}
            durationInFrames={300}
            fps={30}
            width={1080}
            height={1920}
          />
          <Composition
            id="Monas-10s-EIM-v8"
            component={MonasEIMV8}
            durationInFrames={300}
            fps={30}
            width={1080}
            height={1920}
          />
          <Composition
            id="Monas-10s-EIM-v9"
            component={MonasEIMV9}
            durationInFrames={300}
            fps={30}
            width={1080}
            height={1920}
          />
          <Composition
            id="Monas-10s-EIM-v10"
            component={MonasEIMV10}
            durationInFrames={300}
            fps={30}
            width={1080}
            height={1920}
          />
          <Composition
            id="Monas-10s-EIM-v12"
            component={MonasEIMV12}
            durationInFrames={300}
            fps={30}
            width={1080}
            height={1920}
          />
          <Composition
            id="Monas-EIM-Scene1-Exact"
            component={MonasEIMScene1Exact}
            durationInFrames={30}
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
