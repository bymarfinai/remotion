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

const MONAS = staticFile('generated/monas-kec-v3/monas.webp');

const clamp = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
};

const easeOut = Easing.bezier(0.16, 1, 0.3, 1);

const r = (frame: number, a: number, b: number) =>
  interpolate(frame, [a, b], [0, 1], {...clamp, easing: easeOut});

const sceneOpacity = (frame: number, start: number, end: number, fade = 6) =>
  interpolate(
    frame,
    [start, start + fade, end - fade, end],
    [0, 1, 1, 0],
    clamp,
  );

const TinyIcon: React.FC<{
  type: 'scale' | 'place' | 'memory';
  label: string;
  x: number;
  y: number;
  delay: number;
}> = ({type, label, x, y, delay}) => {
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
          width: 70,
          height: 70,
          borderRadius: 999,
          background: PAPER,
          border: `2px solid ${NAVY}`,
          display: 'grid',
          placeItems: 'center',
          boxShadow: '0 8px 0 rgba(16,42,73,.08)',
        }}
      >
        {type === 'scale' && (
          <svg width="34" height="34" viewBox="0 0 34 34">
            <path d="M8 26V8M8 26h18" fill="none" stroke={NAVY} strokeWidth="3" strokeLinecap="round"/>
            <path d="M13 22l4-5 4 2 5-8" fill="none" stroke={BLUE} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
        {type === 'place' && (
          <svg width="34" height="34" viewBox="0 0 34 34">
            <path d="M17 29s9-8.4 9-16a9 9 0 10-18 0c0 7.6 9 16 9 16z" fill="none" stroke={NAVY} strokeWidth="3"/>
            <circle cx="17" cy="13" r="3.5" fill={BLUE}/>
          </svg>
        )}
        {type === 'memory' && (
          <svg width="34" height="34" viewBox="0 0 34 34">
            <path d="M9 18a8 8 0 0116 0v7H9z" fill="none" stroke={NAVY} strokeWidth="3"/>
            <path d="M13 13c1-4 7-4 8 0M12 23h10" fill="none" stroke={BLUE} strokeWidth="3" strokeLinecap="round"/>
          </svg>
        )}
      </div>
      <div
        style={{
          marginTop: 12,
          textAlign: 'center',
          fontSize: 18,
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

const BlockGrid: React.FC<{frame: number}> = ({frame}) => (
  <div
    style={{
      position: 'absolute',
      left: 118,
      right: 118,
      top: 650,
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: 14,
    }}
  >
    {[0, 1, 2, 3, 4, 5].map((i) => {
      const p = r(frame, 117 + i * 3, 126 + i * 3);
      return (
        <div
          key={i}
          style={{
            height: 58,
            borderRadius: 12,
            background: i === 4 ? NAVY : BLUE,
            transformOrigin: 'left center',
            transform: `scaleX(${p})`,
            opacity: p,
          }}
        />
      );
    })}
  </div>
);

export const MonasEIMV3: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const cardIn = spring({
    frame,
    fps,
    config: {damping: 23, stiffness: 125, mass: 0.82},
  });

  const s1 = sceneOpacity(frame, 0, 40, 5);
  const s2 = sceneOpacity(frame, 34, 77, 6);
  const s3 = sceneOpacity(frame, 70, 113, 6);
  const s4 = sceneOpacity(frame, 106, 150, 6);

  const monas1 = spring({
    frame: frame - 11,
    fps,
    config: {damping: 18, stiffness: 170, mass: 0.7},
  });
  const monas2 = spring({
    frame: frame - 43,
    fps,
    config: {damping: 19, stiffness: 160, mass: 0.72},
  });

  const arc1 = r(frame, 72, 98);
  const arc2 = r(frame, 83, 107);
  const finalText = r(frame, 112, 124);
  const camera = interpolate(frame, [0, 149], [1.012, 1], clamp);

  return (
    <AbsoluteFill
      style={{
        background: NAVY,
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
          <div
            style={{
              position: 'absolute',
              left: 54,
              top: 48,
              width: 58,
              height: 58,
              borderRadius: 18,
              background: NAVY,
              display: 'grid',
              placeItems: 'center',
              zIndex: 50,
            }}
          >
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: 999,
                border: `4px solid ${PAPER}`,
                borderRightColor: BLUE,
                transform: `rotate(${frame * 1.7}deg)`,
              }}
            />
          </div>

          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              height: 12,
              background: BLUE,
            }}
          />

          <AbsoluteFill style={{opacity: s1}}>
            <div
              style={{
                position: 'absolute',
                left: 98,
                top: 190,
                fontSize: 35,
                fontWeight: 650,
                color: NAVY,
              }}
            >
              Why do some
            </div>
            <div
              style={{
                position: 'absolute',
                left: 94,
                top: 245,
                fontSize: 92,
                lineHeight: 0.9,
                fontWeight: 950,
                letterSpacing: '-0.065em',
                color: NAVY,
              }}
            >
              LANDMARKS
            </div>
            <div
              style={{
                position: 'absolute',
                left: 97,
                top: 330,
                fontSize: 34,
                fontWeight: 650,
                color: NAVY,
              }}
            >
              stay with us?
            </div>

            <div
              style={{
                position: 'absolute',
                left: 220,
                top: 520,
                width: 535,
                height: 535,
                borderRadius: 999,
                background: BLUE,
                transform: `scale(${monas1})`,
                opacity: monas1,
              }}
            />
            <Img
              src={MONAS}
              style={{
                position: 'absolute',
                width: 590,
                left: 205,
                top: 470,
                zIndex: 10,
                opacity: monas1,
                transformOrigin: '50% 82%',
                transform: `translateY(${(1 - monas1) * 150}px) scale(${0.95 + monas1 * 0.05})`,
              }}
            />
          </AbsoluteFill>

          <AbsoluteFill style={{opacity: s2}}>
            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 210,
                textAlign: 'center',
                fontSize: 32,
                fontWeight: 650,
                color: NAVY,
              }}
            >
              Because a
            </div>
            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 260,
                textAlign: 'center',
                fontSize: 112,
                fontWeight: 950,
                letterSpacing: '-0.06em',
                lineHeight: 0.9,
                color: BLUE,
              }}
            >
              SYMBOL
            </div>
            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 370,
                textAlign: 'center',
                fontSize: 32,
                fontWeight: 650,
                color: NAVY,
              }}
            >
              can hold a whole city.
            </div>

            <div
              style={{
                position: 'absolute',
                left: 170,
                right: 170,
                bottom: -40,
                height: 900,
                overflow: 'hidden',
              }}
            >
              <Img
                src={MONAS}
                style={{
                  position: 'absolute',
                  width: 770,
                  left: -15,
                  top: 135,
                  opacity: monas2,
                  transformOrigin: '50% 85%',
                  transform: `translateY(${(1 - monas2) * 240}px) scale(${0.93 + monas2 * 0.07})`,
                }}
              />
            </div>
          </AbsoluteFill>

          <AbsoluteFill style={{opacity: s3}}>
            <div
              style={{
                position: 'absolute',
                left: 96,
                top: 250,
                fontSize: 43,
                fontWeight: 650,
                color: NAVY,
              }}
            >
              They use
            </div>

            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: 1080,
                height: 1550,
                pointerEvents: 'none',
              }}
            >
              <svg width="1080" height="1550" viewBox="0 0 1080 1550">
                <path
                  d="M72 1240 C360 1045 415 735 315 480 C244 298 255 170 463 83"
                  fill="none"
                  stroke={NAVY}
                  strokeWidth="4"
                  strokeLinecap="round"
                  pathLength="1"
                  strokeDasharray="1"
                  strokeDashoffset={1 - arc1}
                />
                <path
                  d="M1008 114 C770 258 720 526 794 718 C857 882 817 1062 640 1268"
                  fill="none"
                  stroke={BLUE}
                  strokeWidth="4"
                  strokeLinecap="round"
                  pathLength="1"
                  strokeDasharray="1"
                  strokeDashoffset={1 - arc2}
                />
              </svg>
            </div>

            <TinyIcon type="scale" label="SCALE" x={610} y={350} delay={80} />
            <TinyIcon type="place" label="PLACE" x={770} y={655} delay={89} />
            <TinyIcon type="memory" label="MEMORY" x={635} y={970} delay={98} />

            <div
              style={{
                position: 'absolute',
                left: 95,
                bottom: 260,
                fontSize: 78,
                lineHeight: 0.9,
                fontWeight: 950,
                letterSpacing: '-0.055em',
                color: NAVY,
              }}
            >
              TO MAKE
              <br />
              MEANING.
            </div>
          </AbsoluteFill>

          <AbsoluteFill style={{opacity: s4}}>
            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 210,
                textAlign: 'center',
                fontSize: 31,
                fontWeight: 650,
                color: NAVY,
                opacity: finalText,
              }}
            >
              So
            </div>
            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 254,
                textAlign: 'center',
                fontSize: 118,
                lineHeight: 0.86,
                fontWeight: 950,
                letterSpacing: '-0.07em',
                color: NAVY,
                opacity: finalText,
                transform: `translateY(${(1 - finalText) * 24}px)`,
              }}
            >
              MONAS
            </div>

            <BlockGrid frame={frame} />

            <div
              style={{
                position: 'absolute',
                left: 110,
                right: 110,
                top: 845,
                textAlign: 'center',
                fontSize: 34,
                fontWeight: 650,
                lineHeight: 1.25,
                color: NAVY,
                opacity: r(frame, 126, 139),
              }}
            >
              isn&apos;t just
              <br />
              <span style={{fontWeight: 950, color: BLUE}}>132 METERS</span>
            </div>

            <div
              style={{
                position: 'absolute',
                left: 92,
                right: 92,
                bottom: 270,
                paddingTop: 28,
                borderTop: `3px solid ${NAVY}`,
                textAlign: 'center',
                fontSize: 52,
                lineHeight: 1.02,
                fontWeight: 850,
                letterSpacing: '-0.03em',
                color: NAVY,
                opacity: r(frame, 132, 145),
              }}
            >
              It&apos;s how Jakarta
              <br />
              <span style={{color: BLUE}}>remembers itself.</span>
            </div>
          </AbsoluteFill>

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
            <div>EIM STUDY 003</div>
          </div>

          <div
            style={{
              position: 'absolute',
              left: -130,
              bottom: 105,
              width: 410,
              height: 150,
              border: `3px solid ${PALE}`,
              borderRadius: '50%',
              transform: 'rotate(-18deg)',
              opacity: 0.55,
            }}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
