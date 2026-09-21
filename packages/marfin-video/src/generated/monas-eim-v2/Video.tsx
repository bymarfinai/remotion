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
const BLUE_SOFT = '#DCE6FB';
const IVORY = '#F6F0E5';
const PAPER = '#FFFDF8';
const INK = '#0E213A';
const MUTED = '#718197';

const MONAS = staticFile('generated/monas-kec-v3/monas.webp');

const clamp = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
};

const easeOut = Easing.bezier(0.16, 1, 0.3, 1);

const reveal = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], {...clamp, easing: easeOut});

const Dot: React.FC<{x: number; y: number; label: string; delay: number}> = ({
  x,
  y,
  label,
  delay,
}) => {
  const frame = useCurrentFrame();
  const p = spring({
    frame: frame - delay,
    fps: 30,
    config: {damping: 17, stiffness: 190, mass: 0.55},
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
          fontSize: 22,
          fontWeight: 900,
          letterSpacing: '0.10em',
          color: NAVY,
        }}
      >
        {label}
      </div>
    </div>
  );
};

const MiniBadge: React.FC<{
  left: number;
  top: number;
  title: string;
  body: string;
  delay: number;
}> = ({left, top, title, body, delay}) => {
  const frame = useCurrentFrame();
  const p = reveal(frame, delay, delay + 14);

  return (
    <div
      style={{
        position: 'absolute',
        left,
        top,
        width: 238,
        padding: '22px 22px 20px',
        background: PAPER,
        border: `2px solid ${NAVY}`,
        borderRadius: 24,
        boxShadow: '0 9px 0 rgba(16,42,73,.10)',
        opacity: p,
        transform: `translateY(${(1 - p) * 22}px)`,
        zIndex: 24,
      }}
    >
      <div
        style={{
          fontSize: 18,
          fontWeight: 900,
          letterSpacing: '0.12em',
          color: BLUE,
          marginBottom: 8,
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: 26,
          fontWeight: 850,
          lineHeight: 1.02,
          color: NAVY,
        }}
      >
        {body}
      </div>
    </div>
  );
};

export const MonasEIMV2: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const cardIn = spring({
    frame,
    fps,
    config: {damping: 22, stiffness: 125, mass: 0.8},
  });

  const headIn = reveal(frame, 10, 28);
  const keywordIn = spring({
    frame: frame - 22,
    fps,
    config: {damping: 18, stiffness: 160, mass: 0.7},
  });
  const circleIn = spring({
    frame: frame - 16,
    fps,
    config: {damping: 20, stiffness: 135, mass: 0.78},
  });
  const heroIn = spring({
    frame: frame - 30,
    fps,
    config: {damping: 19, stiffness: 165, mass: 0.72},
  });
  const accentIn = reveal(frame, 35, 52);
  const pathProgress = reveal(frame, 46, 88);
  const statIn = spring({
    frame: frame - 73,
    fps,
    config: {damping: 19, stiffness: 175, mass: 0.68},
  });
  const footerIn = reveal(frame, 101, 122);

  const keywordMask = interpolate(keywordIn, [0, 1], [100, 0], clamp);
  const heroY = interpolate(heroIn, [0, 1], [210, 0], clamp);
  const heroScale = interpolate(heroIn, [0, 0.72, 1], [0.94, 1.035, 1], clamp);
  const orbit = interpolate(frame, [0, 149], [-7, 6], clamp);
  const camera = interpolate(frame, [0, 149], [1.018, 1], clamp);

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
            left: 42,
            right: 42,
            top: 56,
            bottom: 56,
            borderRadius: 52,
            background: IVORY,
            overflow: 'hidden',
            border: `3px solid ${NAVY}`,
            boxShadow: '0 30px 0 rgba(0,0,0,.18)',
            opacity: cardIn,
            transform: `translateY(${(1 - cardIn) * 80}px) scale(${0.975 + 0.025 * cardIn})`,
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(180deg, rgba(255,255,255,.28), transparent 28%, transparent 72%, rgba(47,103,244,.03))',
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              position: 'absolute',
              left: 64,
              top: 58,
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: '0.16em',
              color: NAVY,
              opacity: headIn,
            }}
          >
            JAKARTA / INDONESIA
          </div>

          <div
            style={{
              position: 'absolute',
              right: 64,
              top: 58,
              fontSize: 17,
              lineHeight: 1.1,
              fontWeight: 900,
              letterSpacing: '0.10em',
              textAlign: 'right',
              color: NAVY,
              opacity: headIn,
            }}
          >
            ONE CITY
            <br />
            ONE SYMBOL
          </div>

          <div
            style={{
              position: 'absolute',
              left: 66,
              top: 138,
              fontSize: 44,
              fontWeight: 650,
              lineHeight: 1.02,
              color: NAVY,
              opacity: headIn,
              transform: `translateY(${(1 - headIn) * 18}px)`,
              zIndex: 30,
            }}
          >
            What makes a city
            <br />
            feel
          </div>

          <div
            style={{
              position: 'absolute',
              left: 62,
              top: 235,
              fontSize: 122,
              lineHeight: 0.82,
              fontWeight: 950,
              letterSpacing: '-0.07em',
              color: NAVY,
              zIndex: 30,
              clipPath: `inset(0 ${keywordMask}% 0 0)`,
              transform: `translateX(${(1 - keywordIn) * 24}px)`,
            }}
          >
            ICONIC?
          </div>

          <div
            style={{
              position: 'absolute',
              right: -70,
              top: 352,
              width: 620,
              height: 620,
              borderRadius: 999,
              background: BLUE,
              opacity: circleIn,
              transform: `scale(${circleIn}) translateX(${orbit}px)`,
              transformOrigin: 'center',
              zIndex: 2,
            }}
          />

          <div
            style={{
              position: 'absolute',
              left: 82,
              top: 410,
              width: 275,
              padding: '20px 22px 18px',
              border: `2px solid ${NAVY}`,
              borderRadius: 22,
              background: PAPER,
              opacity: accentIn,
              transform: `translateX(${(1 - accentIn) * -30}px)`,
              zIndex: 25,
            }}
          >
            <div
              style={{
                fontSize: 17,
                fontWeight: 900,
                letterSpacing: '0.14em',
                color: BLUE,
              }}
            >
              MEMORY DEVICE
            </div>
            <div
              style={{
                marginTop: 8,
                fontSize: 31,
                fontWeight: 900,
                lineHeight: 0.98,
                color: NAVY,
              }}
            >
              LANDMARK
              <br />
              AS IDENTITY
            </div>
          </div>

          <div
            style={{
              position: 'absolute',
              right: 22,
              top: 330,
              width: 560,
              height: 900,
              overflow: 'hidden',
              zIndex: 15,
            }}
          >
            <Img
              src={MONAS}
              style={{
                position: 'absolute',
                width: 680,
                left: -70,
                top: 18,
                opacity: heroIn,
                transformOrigin: '52% 78%',
                transform: `translateY(${heroY}px) scale(${heroScale})`,
                filter: 'drop-shadow(0 16px 0 rgba(16,42,73,.09))',
              }}
            />
          </div>

          <div
            style={{
              position: 'absolute',
              left: 58,
              top: 936,
              width: 870,
              height: 300,
              zIndex: 8,
            }}
          >
            <svg width="870" height="300" viewBox="0 0 870 300">
              <path
                d="M24 208 C150 82 272 78 360 150 C448 222 522 254 610 184 C693 118 770 104 846 58"
                fill="none"
                stroke={NAVY}
                strokeWidth="4"
                strokeLinecap="round"
                pathLength="1"
                strokeDasharray="1"
                strokeDashoffset={1 - pathProgress}
              />
              <path
                d="M24 208 C150 82 272 78 360 150 C448 222 522 254 610 184 C693 118 770 104 846 58"
                fill="none"
                stroke={BLUE}
                strokeWidth="11"
                strokeLinecap="round"
                pathLength="1"
                strokeDasharray="0.18 0.82"
                strokeDashoffset={0.86 - pathProgress * 0.22}
                opacity="0.95"
              />
            </svg>
          </div>

          <Dot x={151} y={1119} label="1961" delay={55} />
          <Dot x={453} y={1154} label="1975" delay={67} />
          <Dot x={811} y={1028} label="TODAY" delay={79} />

          <MiniBadge
            left={72}
            top={1265}
            title="01 / SCALE"
            body="132 METERS"
            delay={74}
          />

          <MiniBadge
            left={326}
            top={1265}
            title="02 / ROLE"
            body="NATIONAL ICON"
            delay={82}
          />

          <div
            style={{
              position: 'absolute',
              right: 66,
              top: 1275,
              width: 286,
              opacity: statIn,
              transform: `translateY(${(1 - statIn) * 46}px)`,
              zIndex: 26,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                gap: 10,
              }}
            >
              <div
                style={{
                  fontSize: 132,
                  lineHeight: 0.76,
                  fontWeight: 950,
                  letterSpacing: '-0.07em',
                  color: BLUE,
                }}
              >
                132
              </div>
              <div
                style={{
                  fontSize: 42,
                  lineHeight: 0.9,
                  fontWeight: 950,
                  color: NAVY,
                  marginBottom: 4,
                }}
              >
                M
              </div>
            </div>
            <div
              style={{
                marginTop: 12,
                fontSize: 18,
                fontWeight: 900,
                letterSpacing: '0.14em',
                color: MUTED,
              }}
            >
              VERTICAL LANDMARK
            </div>
          </div>

          <div
            style={{
              position: 'absolute',
              left: 66,
              right: 66,
              bottom: 170,
              display: 'flex',
              gap: 10,
              zIndex: 27,
            }}
          >
            {['ICON', 'IDENTITY', 'MEMORY'].map((label, index) => {
              const p = reveal(frame, 88 + index * 6, 102 + index * 6);
              return (
                <div
                  key={label}
                  style={{
                    flex: index === 1 ? 1.25 : 1,
                    height: 62,
                    borderRadius: 18,
                    background: index === 1 ? BLUE : BLUE_SOFT,
                    border: index === 1 ? 'none' : `2px solid ${BLUE}`,
                    color: index === 1 ? PAPER : NAVY,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 22,
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
            })}
          </div>

          <div
            style={{
              position: 'absolute',
              left: 68,
              right: 68,
              bottom: 72,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              opacity: footerIn,
              transform: `translateY(${(1 - footerIn) * 18}px)`,
              zIndex: 30,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 999,
                  background: BLUE,
                }}
              />
              <div
                style={{
                  fontSize: 21,
                  fontWeight: 950,
                  letterSpacing: '0.11em',
                  color: NAVY,
                }}
              >
                MONAS / JAKARTA
              </div>
            </div>

            <div
              style={{
                fontSize: 20,
                fontWeight: 800,
                letterSpacing: '0.06em',
                color: MUTED,
              }}
            >
              5S EDITORIAL STUDY
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
