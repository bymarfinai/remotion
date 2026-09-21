import React from 'react';
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const NAVY = '#102A49';
const BLUE = '#2F67F4';
const IVORY = '#F7F3EA';
const PAPER = '#FFFDF8';
const PALE = '#E7EDF7';
const MUTED = '#6F7F95';
const INK = '#0B1A2B';

const MONAS = staticFile('generated/monas-kec-v3/monas.webp');
const SKYLINE = staticFile('generated/monas-kec-v3/skyline.webp');
const BIRDS = staticFile('generated/monas-kec-v3/birds.webp');
const CLOUD = staticFile('generated/monas-kec-v3/cloud.webp');
const PAPER_STRIP = staticFile('generated/monas-kec-v3/paper-strip.webp');
const TEXTURE = staticFile('generated/monas-kec-v3/texture.webp');

const clamp = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
};

const easeOut = Easing.bezier(0.16, 1, 0.3, 1);

const reveal = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], {...clamp, easing: easeOut});

const sceneWindow = (
  frame: number,
  start: number,
  end: number,
  fadeIn = 8,
  fadeOut = 8,
) =>
  interpolate(
    frame,
    [start, start + fadeIn, end - fadeOut, end],
    [0, 1, 1, 0],
    clamp,
  );

const Marker: React.FC<{
  x: number;
  y: number;
  label: string;
  delay: number;
}> = ({x, y, label, delay}) => {
  const frame = useCurrentFrame();
  const p = spring({
    frame: frame - delay,
    fps: 30,
    config: {damping: 18, stiffness: 190, mass: 0.55},
  });

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `translate(-50%, -50%) scale(${p})`,
        opacity: p,
        zIndex: 20,
      }}
    >
      <div
        style={{
          width: 22,
          height: 22,
          borderRadius: 999,
          background: PAPER,
          border: `6px solid ${BLUE}`,
          boxShadow: '0 0 0 2px rgba(16,42,73,.16)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 34,
          left: '50%',
          transform: 'translateX(-50%)',
          whiteSpace: 'nowrap',
          fontSize: 20,
          fontWeight: 900,
          letterSpacing: '0.12em',
          color: NAVY,
        }}
      >
        {label}
      </div>
    </div>
  );
};

const InfoPill: React.FC<{
  label: string;
  active?: boolean;
  frame: number;
  delay: number;
}> = ({label, active = false, frame, delay}) => {
  const p = reveal(frame, delay, delay + 12);

  return (
    <div
      style={{
        flex: active ? 1.25 : 1,
        height: 58,
        borderRadius: 18,
        background: active ? BLUE : PALE,
        border: active ? 'none' : `2px solid ${BLUE}`,
        color: active ? PAPER : NAVY,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 20,
        fontWeight: 950,
        letterSpacing: '0.12em',
        opacity: p,
        transform: `scaleX(${p})`,
        transformOrigin: 'left center',
      }}
    >
      {label}
    </div>
  );
};

const TinyBadge: React.FC<{
  title: string;
  body: string;
  left: number;
  top: number;
  frame: number;
  delay: number;
}> = ({title, body, left, top, frame, delay}) => {
  const p = reveal(frame, delay, delay + 12);

  return (
    <div
      style={{
        position: 'absolute',
        left,
        top,
        width: 230,
        padding: '20px 20px 18px',
        background: PAPER,
        border: `2px solid ${NAVY}`,
        borderRadius: 22,
        boxShadow: '0 9px 0 rgba(16,42,73,.08)',
        opacity: p,
        transform: `translateY(${(1 - p) * 18}px)`,
        zIndex: 25,
      }}
    >
      <div
        style={{
          fontSize: 16,
          fontWeight: 900,
          letterSpacing: '0.14em',
          color: BLUE,
          marginBottom: 8,
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: 26,
          lineHeight: 1.02,
          fontWeight: 900,
          color: NAVY,
        }}
      >
        {body}
      </div>
    </div>
  );
};

export const MonasEIMV4: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const cardIn = spring({
    frame,
    fps,
    config: {damping: 23, stiffness: 125, mass: 0.82},
  });

  const s1 = sceneWindow(frame, 0, 46, 8, 8);
  const s2 = sceneWindow(frame, 40, 95, 8, 8);
  const s3 = sceneWindow(frame, 88, 152, 8, 8);
  const s4 = sceneWindow(frame, 145, 210, 8, 10);

  const hero1 = spring({
    frame: frame - 16,
    fps,
    config: {damping: 18, stiffness: 170, mass: 0.72},
  });

  const hero2 = spring({
    frame: frame - 56,
    fps,
    config: {damping: 19, stiffness: 165, mass: 0.75},
  });

  const skylineIn = reveal(frame, 124, 144);
  const birdsIn = reveal(frame, 132, 148);
  const cloudIn = reveal(frame, 10, 24);
  const paperIn = reveal(frame, 58, 76);

  const path1 = reveal(frame, 102, 128);
  const path2 = reveal(frame, 114, 140);

  const finalText = reveal(frame, 168, 188);

  const camera = interpolate(frame, [0, 209], [1.012, 1], clamp);

  return (
    <AbsoluteFill
      style={{
        background: INK,
        fontFamily: 'Arial, Helvetica, sans-serif',
        overflow: 'hidden',
      }}
    >
      <AbsoluteFill
        style={{
          transform: `scale(${camera})`,
          transformOrigin: 'center center',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 54,
            right: 54,
            top: 72,
            bottom: 72,
            borderRadius: 52,
            background: IVORY,
            overflow: 'hidden',
            border: `3px solid ${NAVY}`,
            boxShadow: '0 26px 0 rgba(0,0,0,.17)',
            opacity: cardIn,
            transform: `translateY(${(1 - cardIn) * 70}px) scale(${0.98 + cardIn * 0.02})`,
          }}
        >
          <Img
            src={TEXTURE}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.08,
            }}
          />

          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              height: 12,
              background: BLUE,
              zIndex: 50,
            }}
          />

          <div
            style={{
              position: 'absolute',
              left: 56,
              right: 56,
              bottom: 50,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              zIndex: 60,
              color: MUTED,
              fontSize: 16,
              fontWeight: 900,
              letterSpacing: '0.13em',
            }}
          >
            <div>MONAS / JAKARTA</div>
            <div>EIM STUDY 004</div>
          </div>

          <AbsoluteFill style={{opacity: s1}}>
            <div
              style={{
                position: 'absolute',
                left: 84,
                top: 96,
                fontSize: 18,
                fontWeight: 900,
                letterSpacing: '0.16em',
                color: NAVY,
              }}
            >
              JAKARTA / INDONESIA
            </div>

            <div
              style={{
                position: 'absolute',
                right: 84,
                top: 96,
                fontSize: 16,
                lineHeight: 1.1,
                textAlign: 'right',
                fontWeight: 900,
                letterSpacing: '0.10em',
                color: NAVY,
              }}
            >
              EDITORIAL
              <br />
              MOTION
            </div>

            <div
              style={{
                position: 'absolute',
                left: 84,
                top: 180,
                fontSize: 38,
                lineHeight: 1.05,
                fontWeight: 650,
                color: NAVY,
              }}
            >
              What makes a city
              <br />
              feel
            </div>

            <div
              style={{
                position: 'absolute',
                left: 80,
                top: 275,
                fontSize: 120,
                lineHeight: 0.85,
                fontWeight: 950,
                letterSpacing: '-0.07em',
                color: NAVY,
              }}
            >
              ICONIC?
            </div>

            <Img
              src={CLOUD}
              style={{
                position: 'absolute',
                left: 65,
                top: 410,
                width: 360,
                opacity: cloudIn * 0.9,
                transform: `translateX(${(1 - cloudIn) * -40}px)`,
              }}
            />

            <div
              style={{
                position: 'absolute',
                right: -110,
                top: 420,
                width: 640,
                height: 640,
                borderRadius: 999,
                background: BLUE,
                opacity: hero1,
                transform: `scale(${hero1})`,
              }}
            />

            <Img
              src={MONAS}
              style={{
                position: 'absolute',
                width: 640,
                right: 10,
                top: 405,
                opacity: hero1,
                transformOrigin: '50% 82%',
                transform: `translateY(${(1 - hero1) * 180}px) scale(${0.94 + hero1 * 0.06})`,
                zIndex: 10,
              }}
            />
          </AbsoluteFill>

          <AbsoluteFill style={{opacity: s2}}>
            <div
              style={{
                position: 'absolute',
                left: 90,
                top: 150,
                fontSize: 34,
                fontWeight: 650,
                color: NAVY,
              }}
            >
              A landmark becomes
            </div>

            <div
              style={{
                position: 'absolute',
                left: 88,
                top: 205,
                fontSize: 110,
                fontWeight: 950,
                lineHeight: 0.86,
                letterSpacing: '-0.065em',
                color: BLUE,
              }}
            >
              MEMORY
            </div>

            <div
              style={{
                position: 'absolute',
                left: 92,
                top: 320,
                fontSize: 30,
                lineHeight: 1.15,
                fontWeight: 650,
                color: NAVY,
                maxWidth: 430,
              }}
            >
              when form, place, and
              <br />
              identity move together.
            </div>

            <Img
              src={PAPER_STRIP}
              style={{
                position: 'absolute',
                left: 70,
                top: 520,
                width: 420,
                opacity: paperIn * 0.65,
                transform: 'rotate(-4deg)',
              }}
            />

            <div
              style={{
                position: 'absolute',
                right: 30,
                top: 360,
                width: 560,
                height: 820,
                overflow: 'hidden',
                zIndex: 8,
              }}
            >
              <Img
                src={MONAS}
                style={{
                  position: 'absolute',
                  width: 690,
                  left: -45,
                  top: 40,
                  opacity: hero2,
                  transformOrigin: '52% 84%',
                  transform: `translateY(${(1 - hero2) * 220}px) scale(${0.93 + hero2 * 0.07})`,
                }}
              />
            </div>

            <TinyBadge title="01 / FORM" body="RECOGNIZABLE" left={86} top={760} frame={frame} delay={66} />
            <TinyBadge title="02 / PLACE" body="JAKARTA" left={86} top={980} frame={frame} delay={74} />
          </AbsoluteFill>

          <AbsoluteFill style={{opacity: s3}}>
            <div
              style={{
                position: 'absolute',
                left: 86,
                top: 150,
                fontSize: 34,
                fontWeight: 650,
                color: NAVY,
              }}
            >
              It works through
            </div>

            <div
              style={{
                position: 'absolute',
                left: 82,
                top: 205,
                fontSize: 112,
                lineHeight: 0.86,
                fontWeight: 950,
                letterSpacing: '-0.06em',
                color: NAVY,
              }}
            >
              SIGNALS
            </div>

            <div
              style={{
                position: 'absolute',
                left: 56,
                top: 0,
                width: 968,
                height: 1500,
                pointerEvents: 'none',
              }}
            >
              <svg width="968" height="1500" viewBox="0 0 968 1500">
                <path
                  d="M110 1180 C340 1020 400 760 320 530 C260 360 275 220 470 110"
                  fill="none"
                  stroke={NAVY}
                  strokeWidth="4"
                  strokeLinecap="round"
                  pathLength="1"
                  strokeDasharray="1"
                  strokeDashoffset={1 - path1}
                />
                <path
                  d="M840 180 C675 300 655 520 720 690 C770 822 725 1012 525 1195"
                  fill="none"
                  stroke={BLUE}
                  strokeWidth="4"
                  strokeLinecap="round"
                  pathLength="1"
                  strokeDasharray="1"
                  strokeDashoffset={1 - path2}
                />
              </svg>
            </div>

            <Marker x={630} y={350} label="SCALE" delay={104} />
            <Marker x={770} y={650} label="PLACE" delay={114} />
            <Marker x={620} y={960} label="MEMORY" delay={124} />

            <div
              style={{
                position: 'absolute',
                left: 86,
                bottom: 310,
                fontSize: 76,
                lineHeight: 0.9,
                fontWeight: 950,
                letterSpacing: '-0.05em',
                color: NAVY,
              }}
            >
              TO CREATE
              <br />
              MEANING.
            </div>

            <div
              style={{
                position: 'absolute',
                left: 86,
                right: 86,
                bottom: 190,
                display: 'flex',
                gap: 12,
              }}
            >
              <InfoPill label="ICON" frame={frame} delay={118} />
              <InfoPill label="IDENTITY" frame={frame} delay={124} active />
              <InfoPill label="MEMORY" frame={frame} delay={130} />
            </div>
          </AbsoluteFill>

          <AbsoluteFill style={{opacity: s4}}>
            <div
              style={{
                position: 'absolute',
                left: 84,
                top: 110,
                fontSize: 18,
                fontWeight: 900,
                letterSpacing: '0.16em',
                color: NAVY,
              }}
            >
              JAKARTA / INDONESIA
            </div>

            <div
              style={{
                position: 'absolute',
                left: 82,
                top: 180,
                fontSize: 40,
                lineHeight: 1.05,
                fontWeight: 650,
                color: NAVY,
                opacity: finalText,
              }}
            >
              So Monas isn’t just
            </div>

            <div
              style={{
                position: 'absolute',
                left: 78,
                top: 245,
                fontSize: 130,
                lineHeight: 0.82,
                fontWeight: 950,
                letterSpacing: '-0.07em',
                color: BLUE,
                opacity: finalText,
              }}
            >
              132M
            </div>

            <div
              style={{
                position: 'absolute',
                left: 82,
                top: 375,
                fontSize: 34,
                lineHeight: 1.15,
                fontWeight: 650,
                color: NAVY,
                opacity: finalText,
              }}
            >
              It’s how Jakarta
              <br />
              remembers itself.
            </div>

            <Img
              src={SKYLINE}
              style={{
                position: 'absolute',
                left: -30,
                bottom: 120,
                width: 1140,
                opacity: skylineIn,
                zIndex: 6,
              }}
            />

            <Img
              src={PAPER_STRIP}
              style={{
                position: 'absolute',
                left: 60,
                bottom: 260,
                width: 680,
                opacity: finalText * 0.52,
                transform: 'rotate(-3deg)',
                zIndex: 8,
              }}
            />

            <Img
              src={BIRDS}
              style={{
                position: 'absolute',
                right: 70,
                top: 190,
                width: 220,
                opacity: birdsIn,
                zIndex: 20,
              }}
            />
          </AbsoluteFill>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
