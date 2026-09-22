import React from 'react';
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from 'remotion';

const clamp = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
};

const ease = Easing.bezier(0.16, 1, 0.3, 1);

const FRAMES = [
  staticFile('generated/monas-eim-v8/scene-01.webp'),
  staticFile('generated/monas-eim-v8/scene-02.webp'),
  staticFile('generated/monas-eim-v8/scene-03.webp'),
  staticFile('generated/monas-eim-v8/scene-04.webp'),
  staticFile('generated/monas-eim-v8/scene-05.webp'),
  staticFile('generated/monas-eim-v8/scene-06.webp'),
  staticFile('generated/monas-eim-v8/scene-07.webp'),
];

const ranges = [
  [0, 42],
  [40, 84],
  [82, 124],
  [122, 166],
  [164, 210],
  [208, 252],
  [250, 300],
] as const;

const sceneOpacity = (frame:number,start:number,end:number) =>
  interpolate(frame,[start,start+4,end-4,end],[0,1,1,0],clamp);

const sceneProgress = (frame:number,start:number,end:number) =>
  interpolate(frame,[start,end],[0,1],clamp);

const Scene: React.FC<{src:string;start:number;end:number;index:number}> = ({src,start,end,index}) => {
  const frame = useCurrentFrame();
  const opacity = sceneOpacity(frame,start,end);
  const p = sceneProgress(frame,start,end);

  const scale = interpolate(p,[0,1],[1.018,1.0],clamp);
  const y = interpolate(p,[0,1],[18,0],{...clamp,easing:ease});

  const reveal = interpolate(frame,[start,start+8],[10,0],{...clamp,easing:ease});
  const x = index % 2 === 0 ? reveal : -reveal;

  return (
    <AbsoluteFill style={{opacity}}>
      <Img
        src={src}
        style={{
          width:'100%',
          height:'100%',
          objectFit:'cover',
          transform:`translate(${x}px,${y}px) scale(${scale})`,
          transformOrigin:'center center',
        }}
      />
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(180deg, rgba(15,42,80,0.00) 0%, rgba(15,42,80,0.015) 100%)',
        }}
      />
    </AbsoluteFill>
  );
};

export const MonasEIMV8: React.FC = () => {
  return (
    <AbsoluteFill style={{background:'#0D1B2D',overflow:'hidden'}}>
      {FRAMES.map((src,i) => (
        <Scene
          key={src}
          src={src}
          start={ranges[i][0]}
          end={ranges[i][1]}
          index={i}
        />
      ))}
    </AbsoluteFill>
  );
};
