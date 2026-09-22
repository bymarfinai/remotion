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

const NAVY = '#173A68';
const BLUE = '#2D63E8';
const BLUE_SOFT = '#DCE6FA';
const WHITE = '#FFFDF8';
const OFF_WHITE = '#F7F4EC';
const PALE = '#ECF1F8';
const MUTED = '#6D7E98';

const MONAS = staticFile('generated/monas-eim-v6/monas-full.webp');
const FLAME = staticFile('generated/monas-eim-v6/monas-flame-detail.webp');
const SKYLINE = staticFile('generated/monas-eim-v6/jakarta-skyline.webp');
const CROWD = staticFile('generated/monas-eim-v6/people-crowd.webp');
const CLOUD = staticFile('generated/monas-eim-v6/cloud-soft.webp');

const clamp = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
};

const ease = Easing.bezier(0.16, 1, 0.3, 1);

const reveal = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], {...clamp, easing: ease});

const sceneOpacity = (
  frame: number,
  start: number,
  end: number,
  fade = 5,
) =>
  interpolate(
    frame,
    [start, start + fade, end - fade, end],
    [0, 1, 1, 0],
    clamp,
  );

const Header: React.FC<{page: string}> = ({page}) => (
  <>
    <div
      style={{
        position: 'absolute',
        left: 66,
        top: 58,
        fontSize: 17,
        fontWeight: 900,
        letterSpacing: '0.17em',
        lineHeight: 1.1,
        color: NAVY,
        zIndex: 80,
      }}
    >
      JAKARTA
      <br />
      INDONESIA
    </div>

    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: 74,
        width: 56,
        height: 3,
        background: NAVY,
        transform: 'translateX(-50%)',
        zIndex: 80,
      }}
    />

    <div
      style={{
        position: 'absolute',
        right: 66,
        top: 64,
        fontSize: 16,
        fontWeight: 900,
        letterSpacing: '0.12em',
        color: NAVY,
        zIndex: 80,
      }}
    >
      {page}
    </div>
  </>
);

const Footer: React.FC = () => (
  <div
    style={{
      position: 'absolute',
      left: 66,
      bottom: 52,
      fontSize: 14,
      fontWeight: 900,
      letterSpacing: '0.16em',
      color: MUTED,
      zIndex: 90,
    }}
  >
    MONAS / JAKARTA
  </div>
);

const BigText: React.FC<{
  children: React.ReactNode;
  top: number;
  left?: number;
  size: number;
  color?: string;
  align?: 'left' | 'center';
  width?: number;
}> = ({
  children,
  top,
  left = 74,
  size,
  color = NAVY,
  align = 'left',
  width = 750,
}) => (
  <div
    style={{
      position: 'absolute',
      left: align === 'center' ? 0 : left,
      right: align === 'center' ? 0 : undefined,
      top,
      width: align === 'center' ? undefined : width,
      textAlign: align,
      fontFamily: 'Arial Narrow, Arial, Helvetica, sans-serif',
      fontSize: size,
      lineHeight: 0.88,
      fontWeight: 950,
      letterSpacing: '-0.055em',
      color,
    }}
  >
    {children}
  </div>
);

const BodyText: React.FC<{
  children: React.ReactNode;
  top: number;
  left?: number;
  width?: number;
  size?: number;
  align?: 'left' | 'center';
  weight?: number;
}> = ({
  children,
  top,
  left = 74,
  width = 500,
  size = 30,
  align = 'left',
  weight = 550,
}) => (
  <div
    style={{
      position: 'absolute',
      left: align === 'center' ? 0 : left,
      right: align === 'center' ? 0 : undefined,
      top,
      width: align === 'center' ? undefined : width,
      textAlign: align,
      fontSize: size,
      lineHeight: 1.08,
      fontWeight: weight,
      color: NAVY,
    }}
  >
    {children}
  </div>
);

const DotLabel: React.FC<{
  x: number;
  y: number;
  label: string;
  sub?: string;
  delay: number;
}> = ({x, y, label, sub, delay}) => {
  const frame = useCurrentFrame();
  const p = spring({
    frame: frame - delay,
    fps: 30,
    config: {damping: 18, stiffness: 185, mass: 0.55},
  });

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `scale(${p})`,
        transformOrigin: 'center center',
        opacity: p,
        zIndex: 30,
      }}
    >
      <div
        style={{
          width: 26,
          height: 26,
          borderRadius: 999,
          background: BLUE,
          border: `5px solid ${WHITE}`,
          boxShadow: `0 0 0 2px ${BLUE}`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 44,
          top: -2,
          width: 230,
          fontSize: 20,
          lineHeight: 1,
          fontWeight: 900,
          letterSpacing: '0.08em',
          color: NAVY,
        }}
      >
        {label}
        {sub ? (
          <div
            style={{
              marginTop: 8,
              fontSize: 15,
              lineHeight: 1.2,
              fontWeight: 750,
              letterSpacing: '0.11em',
              color: MUTED,
            }}
          >
            {sub}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export const MonasEIMV6: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const cardIn = spring({
    frame,
    fps,
    config: {damping: 22, stiffness: 120, mass: 0.85},
  });

  const s1 = sceneOpacity(frame, 0, 42, 5);
  const s2 = sceneOpacity(frame, 38, 84, 5);
  const s3 = sceneOpacity(frame, 80, 124, 5);
  const s4 = sceneOpacity(frame, 120, 166, 5);
  const s5 = sceneOpacity(frame, 162, 210, 5);
  const s6 = sceneOpacity(frame, 206, 252, 5);
  const s7 = interpolate(frame, [248, 260], [0, 1], clamp);

  const heroIn = spring({
    frame: frame - 44,
    fps,
    config: {damping: 18, stiffness: 155, mass: 0.72},
  });

  const skylineIn = reveal(frame, 14, 28);
  const crowdIn = reveal(frame, 172, 190);
  const path3 = reveal(frame, 92, 116);
  const path4 = reveal(frame, 132, 154);
  const measure = reveal(frame, 218, 241);
  const finalIn = reveal(frame, 258, 276);

  return (
    <AbsoluteFill
      style={{
        background: OFF_WHITE,
        fontFamily: 'Arial, Helvetica, sans-serif',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 106,
          right: 106,
          top: 120,
          bottom: 106,
          background: WHITE,
          border: `3px solid ${NAVY}`,
          borderRadius: 40,
          overflow: 'hidden',
          boxShadow: '0 22px 38px rgba(23,58,104,.16)',
          opacity: cardIn,
          transform: `translateY(${(1 - cardIn) * 60}px) scale(${0.985 + cardIn * 0.015})`,
        }}
      >
        <AbsoluteFill
          style={{
            background:
              'linear-gradient(180deg, rgba(255,255,255,.70), rgba(247,244,236,.32))',
          }}
        />

        {/* SCENE 1 */}
        <AbsoluteFill style={{opacity: s1}}>
          <Header page="01 / 07" />

          <BodyText top={200} left={74} width={480} size={34} weight={560}>
            What
            <br />
            makes a city
            <br />
            truly
          </BodyText>

          <BigText top={380} size={106} color={BLUE}>
            ICONIC?
          </BigText>

          <BodyText top={680} left={74} width={280} size={22} weight={650}>
            More than
            <br />
            buildings,
            <br />
            it&apos;s what people
            <br />
            remember.
          </BodyText>

          <div
            style={{
              position: 'absolute',
              right: -125,
              bottom: 88,
              width: 560,
              height: 560,
              borderRadius: 999,
              background: PALE,
              overflow: 'hidden',
            }}
          >
            <Img
              src={SKYLINE}
              style={{
                position: 'absolute',
                width: 720,
                left: -85,
                bottom: 0,
                opacity: skylineIn,
                filter: 'saturate(.75)',
              }}
            />
            <Img
              src={CLOUD}
              style={{
                position: 'absolute',
                width: 520,
                left: 70,
                bottom: 12,
                opacity: skylineIn * 0.5,
              }}
            />
          </div>

          <div
            style={{
              position: 'absolute',
              left: 74,
              bottom: 96,
              width: 50,
              height: 3,
              background: BLUE,
            }}
          />
        </AbsoluteFill>

        {/* SCENE 2 */}
        <AbsoluteFill style={{opacity: s2}}>
          <Header page="02 / 07" />

          <BodyText top={160} left={74} width={420} size={34}>
            A
          </BodyText>

          <BigText top={208} size={112} color={BLUE}>
            SYMBOL
          </BigText>

          <BodyText top={318} left={74} width={420} size={30}>
            can hold
            <br />
            a whole city.
          </BodyText>

          <div
            style={{
              position: 'absolute',
              left: 250,
              top: 500,
              width: 530,
              height: 530,
              borderRadius: 999,
              background: BLUE,
              transform: `scale(${heroIn})`,
              opacity: heroIn,
            }}
          />

          <Img
            src={CLOUD}
            style={{
              position: 'absolute',
              width: 420,
              right: 10,
              top: 690,
              opacity: heroIn * 0.58,
              zIndex: 4,
            }}
          />

          <Img
            src={MONAS}
            style={{
              position: 'absolute',
              width: 590,
              left: 230,
              top: 410,
              opacity: heroIn,
              transformOrigin: '50% 85%',
              transform: `translateY(${(1 - heroIn) * 160}px) scale(${0.94 + heroIn * 0.06})`,
              zIndex: 8,
            }}
          />

          <div
            style={{
              position: 'absolute',
              left: 74,
              bottom: 160,
              fontSize: 17,
              lineHeight: 1.65,
              fontWeight: 900,
              letterSpacing: '0.14em',
              color: MUTED,
            }}
          >
            PEOPLE
            <br />
            HISTORY
            <br />
            IDENTITY
            <br />
            TOMORROW
          </div>
        </AbsoluteFill>

        {/* SCENE 3 */}
        <AbsoluteFill style={{opacity: s3}}>
          <Header page="03 / 07" />

          <BodyText top={190} left={74} width={290} size={29}>
            It brings
            <br />
            together
          </BodyText>

          <BigText top={300} size={84} width={370}>
            PLACE
            <br />
            PEOPLE
            <br />
            PURPOSE
          </BigText>

          <div
            style={{
              position: 'absolute',
              left: 400,
              top: 170,
              width: 420,
              height: 1150,
            }}
          >
            <svg width="420" height="1150" viewBox="0 0 420 1150">
              <path
                d="M80 80 C300 220 280 450 180 610 C105 730 125 910 300 1070"
                fill="none"
                stroke={BLUE}
                strokeWidth="4"
                strokeLinecap="round"
                pathLength="1"
                strokeDasharray="1"
                strokeDashoffset={1 - path3}
              />
            </svg>
          </div>

          <DotLabel
            x={570}
            y={382}
            label="PLACE"
            sub={'A CAPITAL\nCITY'}
            delay={96}
          />
          <DotLabel
            x={658}
            y={710}
            label="PEOPLE"
            sub={'A SHARED\nSTORY'}
            delay={105}
          />
          <DotLabel
            x={560}
            y={1058}
            label="PURPOSE"
            sub={'A BRIGHTER\nTOMORROW'}
            delay={114}
          />

          <div
            style={{
              position: 'absolute',
              left: 74,
              bottom: 92,
              width: 50,
              height: 3,
              background: BLUE,
            }}
          />
        </AbsoluteFill>

        {/* SCENE 4 */}
        <AbsoluteFill style={{opacity: s4}}>
          <Header page="04 / 07" />

          <BodyText top={190} left={74} width={500} size={38} weight={650}>
            Standing
            <br />
            across
            <br />
            generations.
          </BodyText>

          <div
            style={{
              position: 'absolute',
              left: 74,
              top: 510,
              width: 650,
              height: 280,
            }}
          >
            <svg width="650" height="280" viewBox="0 0 650 280">
              <path
                d="M10 210 C150 145 240 200 330 150 C420 100 500 142 640 54"
                fill="none"
                stroke={BLUE}
                strokeWidth="4"
                strokeLinecap="round"
                pathLength="1"
                strokeDasharray="1"
                strokeDashoffset={1 - path4}
              />
              {[
                [20, 207],
                [240, 180],
                [430, 125],
                [625, 61],
              ].map(([cx, cy], i) => {
                const p = spring({
                  frame: frame - (134 + i * 6),
                  fps,
                  config: {damping: 18, stiffness: 190, mass: 0.5},
                });
                return (
                  <circle
                    key={i}
                    cx={cx}
                    cy={cy}
                    r={10 * p}
                    fill={i === 3 ? BLUE : NAVY}
                  />
                );
              })}
            </svg>

            {[
              ['1961', 6, 225],
              ['1975', 212, 196],
              ['1998', 406, 142],
              ['TODAY', 586, 35],
            ].map(([label, left, top]) => (
              <div
                key={String(label)}
                style={{
                  position: 'absolute',
                  left: Number(left),
                  top: Number(top),
                  fontSize: 17,
                  fontWeight: 900,
                  color: NAVY,
                }}
              >
                {label}
              </div>
            ))}
          </div>

          <div
            style={{
              position: 'absolute',
              right: -80,
              bottom: -80,
              width: 540,
              height: 540,
              borderRadius: 999,
              background: PALE,
            }}
          />

          <Img
            src={FLAME}
            style={{
              position: 'absolute',
              width: 510,
              right: -45,
              bottom: -10,
              zIndex: 8,
            }}
          />

          <div
            style={{
              position: 'absolute',
              left: 74,
              bottom: 170,
              fontSize: 17,
              lineHeight: 1.6,
              fontWeight: 900,
              letterSpacing: '0.14em',
              color: MUTED,
            }}
          >
            SAME
            <br />
            CITY
            <br />
            NEW
            <br />
            STORIES
          </div>
        </AbsoluteFill>

        {/* SCENE 5 */}
        <AbsoluteFill style={{opacity: s5}}>
          <Header page="05 / 07" />

          <BodyText top={190} left={74} width={520} size={34}>
            It&apos;s more than
            <br />a monument.
          </BodyText>

          <BigText top={330} size={84} color={BLUE} width={460}>
            IT&apos;S A
            <br />
            MEETING
            <br />
            POINT.
          </BigText>

          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: 720,
              overflow: 'hidden',
            }}
          >
            <Img
              src={CROWD}
              style={{
                position: 'absolute',
                width: '115%',
                left: '-7%',
                bottom: -40,
                opacity: crowdIn,
                filter: 'saturate(.65) contrast(1.05)',
              }}
            />

            <Img
              src={MONAS}
              style={{
                position: 'absolute',
                height: 610,
                left: '50%',
                bottom: 70,
                transform: 'translateX(-50%)',
                opacity: crowdIn * 0.72,
              }}
            />
          </div>

          <div
            style={{
              position: 'absolute',
              left: 74,
              bottom: 105,
              fontSize: 16,
              lineHeight: 1.55,
              fontWeight: 900,
              letterSpacing: '0.14em',
              color: WHITE,
              textShadow: '0 2px 8px rgba(23,58,104,.45)',
              zIndex: 20,
            }}
          >
            DIFFERENT
            <br />
            PEOPLE
            <br />
            SAME HORIZON
          </div>
        </AbsoluteFill>

        {/* SCENE 6 */}
        <AbsoluteFill style={{opacity: s6}}>
          <Header page="06 / 07" />

          <BodyText top={185} left={74} width={280} size={33}>
            At
          </BodyText>

          <BigText top={235} size={96} color={BLUE}>
            132 METERS
          </BigText>

          <BodyText top={445} left={74} width={300} size={28}>
            Monas stands
            <br />
            as a reminder
            <br />
            of how far
            <br />
            we can go,
            <br />
            together.
          </BodyText>

          <Img
            src={CLOUD}
            style={{
              position: 'absolute',
              width: 340,
              left: 60,
              bottom: 360,
              opacity: 0.38,
            }}
          />

          <Img
            src={MONAS}
            style={{
              position: 'absolute',
              height: 930,
              left: '50%',
              bottom: 125,
              transform: 'translateX(-50%)',
            }}
          />

          <div
            style={{
              position: 'absolute',
              right: 92,
              top: 690,
              width: 2,
              height: 585 * measure,
              background: NAVY,
              transformOrigin: 'top center',
            }}
          />

          <div
            style={{
              position: 'absolute',
              right: 84,
              top: 682,
              width: 18,
              height: 18,
              borderRadius: 999,
              background: BLUE,
              opacity: measure,
            }}
          />

          <div
            style={{
              position: 'absolute',
              right: 84,
              top: 1258,
              width: 18,
              height: 18,
              borderRadius: 999,
              background: BLUE,
              opacity: measure,
            }}
          />

          <div
            style={{
              position: 'absolute',
              right: 16,
              top: 1260,
              fontSize: 18,
              fontWeight: 900,
              lineHeight: 1.1,
              color: NAVY,
              opacity: measure,
            }}
          >
            132 M
            <br />
            HEIGHT
          </div>
        </AbsoluteFill>

        {/* SCENE 7 */}
        <AbsoluteFill style={{opacity: s7}}>
          <Header page="07 / 07" />

          <BodyText top={180} left={74} width={420} size={31}>
            A symbol today.
            <br />
            A stronger
            <br />
            tomorrow.
          </BodyText>

          <BigText top={350} size={92} color={NAVY}>
            JAKARTA
            <br />
            KEEPS
            <br />
            MOVING
          </BigText>

          <div
            style={{
              position: 'absolute',
              right: -180,
              bottom: 150,
              width: 620,
              height: 620,
              borderRadius: 999,
              background: BLUE,
              opacity: finalIn,
              overflow: 'hidden',
            }}
          >
            <Img
              src={CLOUD}
              style={{
                position: 'absolute',
                width: 520,
                left: -60,
                bottom: 40,
                opacity: 0.48,
              }}
            />
          </div>

          <Img
            src={MONAS}
            style={{
              position: 'absolute',
              height: 850,
              right: -82,
              bottom: 40,
              opacity: finalIn,
              transform: `translateX(${(1 - finalIn) * 90}px)`,
              zIndex: 12,
            }}
          />

          <div
            style={{
              position: 'absolute',
              left: 74,
              bottom: 165,
              fontSize: 16,
              lineHeight: 1.55,
              fontWeight: 900,
              letterSpacing: '0.14em',
              color: MUTED,
            }}
          >
            PEOPLE
            <br />
            PLACES
            <br />
            POSSIBILITIES
          </div>

          <div
            style={{
              position: 'absolute',
              left: 74,
              bottom: 112,
              width: 50,
              height: 3,
              background: BLUE,
            }}
          />
        </AbsoluteFill>

        <Footer />
      </div>
    </AbsoluteFill>
  );
};
