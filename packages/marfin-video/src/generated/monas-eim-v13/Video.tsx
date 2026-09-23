import React from 'react';
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from 'remotion';

const NAVY = '#123B72';
const BLUE = '#1D5CF5';
const PAPER = '#F8F5EC';
const PALE = '#DDE7F2';
const OUTER = '#092A4D';
const MUTED = '#58769B';

const MONAS = staticFile('generated/monas-eim-v9/monas-full.webp');
const FLAME = staticFile('generated/monas-eim-v9/monas-flame-detail.webp');
const CITY = staticFile('generated/monas-eim-v9/city-circle-visual.webp');
const MEETING = staticFile('generated/monas-eim-v9/meeting-point-visual.webp');
const CLOUD = staticFile('generated/monas-eim-v9/cloud-soft.webp');

const clamp = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
};

const ease = Easing.bezier(0.16, 1, 0.3, 1);

const tween = (frame: number, from: number, to: number) =>
  interpolate(frame, [from, to], [0, 1], {...clamp, easing: ease});

const map = (
  frame: number,
  input: number[],
  output: number[],
) => interpolate(frame, input, output, {...clamp, easing: ease});

const visibility = (frame: number, start: number, end: number, edge = 6) =>
  interpolate(
    frame,
    [start, start + edge, end - edge, end],
    [0, 1, 1, 0],
    clamp,
  );

const enterExitY = (
  frame: number,
  start: number,
  end: number,
  enter = 24,
  exit = -24,
) =>
  map(frame, [start, start + 8, end - 8, end], [enter, 0, 0, exit]);

const enterExitX = (
  frame: number,
  start: number,
  end: number,
  enter = 34,
  exit = -34,
) =>
  map(frame, [start, start + 8, end - 8, end], [enter, 0, 0, exit]);

const Header: React.FC<{page: string}> = ({page}) => (
  <>
    <div
      style={{
        position: 'absolute',
        left: 54,
        top: 48,
        color: NAVY,
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: 17,
        fontWeight: 900,
        letterSpacing: '.17em',
        lineHeight: 1.1,
        zIndex: 100,
      }}
    >
      JAKARTA<br />INDONESIA
    </div>
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: 71,
        width: 64,
        height: 3,
        borderRadius: 99,
        background: NAVY,
        transform: 'translateX(-50%)',
        zIndex: 100,
      }}
    />
    <div
      style={{
        position: 'absolute',
        right: 54,
        top: 50,
        color: NAVY,
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: 16,
        fontWeight: 900,
        letterSpacing: '.14em',
        zIndex: 100,
      }}
    >
      {page}
    </div>
  </>
);

const Footer: React.FC<{showLabel?: boolean}> = ({showLabel = true}) => (
  <>
    <div
      style={{
        position: 'absolute',
        left: 54,
        bottom: 77,
        width: 58,
        height: 3,
        borderRadius: 99,
        background: BLUE,
        zIndex: 100,
      }}
    />
    {showLabel ? (
      <div
        style={{
          position: 'absolute',
          left: 54,
          bottom: 43,
          color: NAVY,
          fontFamily: 'Arial, Helvetica, sans-serif',
          fontSize: 13,
          fontWeight: 900,
          letterSpacing: '.18em',
          zIndex: 100,
        }}
      >
        MONAS / JAKARTA
      </div>
    ) : null}
  </>
);

const Copy: React.FC<{
  children: React.ReactNode;
  left: number;
  top: number;
  width: number;
  size: number;
  weight?: number;
  color?: string;
  lineHeight?: number;
  opacity?: number;
  x?: number;
  y?: number;
}> = ({
  children,
  left,
  top,
  width,
  size,
  weight = 650,
  color = NAVY,
  lineHeight = 0.98,
  opacity = 1,
  x = 0,
  y = 0,
}) => (
  <div
    style={{
      position: 'absolute',
      left,
      top,
      width,
      color,
      opacity,
      transform: 'translate(' + x + 'px,' + y + 'px)',
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: size,
      fontWeight: weight,
      letterSpacing: '-.025em',
      lineHeight,
      zIndex: 30,
    }}
  >
    {children}
  </div>
);

const Key: React.FC<{
  children: React.ReactNode;
  left: number;
  top: number;
  width: number;
  size: number;
  color?: string;
  opacity?: number;
  x?: number;
  y?: number;
}> = ({
  children,
  left,
  top,
  width,
  size,
  color = BLUE,
  opacity = 1,
  x = 0,
  y = 0,
}) => (
  <div
    style={{
      position: 'absolute',
      left,
      top,
      width,
      color,
      opacity,
      transform: 'translate(' + x + 'px,' + y + 'px)',
      fontFamily: 'Arial Narrow, Arial, Helvetica, sans-serif',
      fontSize: size,
      fontWeight: 950,
      letterSpacing: '-.055em',
      lineHeight: 0.82,
      zIndex: 32,
    }}
  >
    {children}
  </div>
);

const SmallStack: React.FC<{
  items: string[];
  left: number;
  top: number;
  opacity: number;
}> = ({items, left, top, opacity}) => (
  <div
    style={{
      position: 'absolute',
      left,
      top,
      opacity,
      color: MUTED,
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: 17,
      fontWeight: 900,
      letterSpacing: '.15em',
      lineHeight: 1.58,
      zIndex: 40,
    }}
  >
    {items.map((item) => (
      <div key={item}>{item}</div>
    ))}
  </div>
);

const pageAt = (frame: number) =>
  Math.min(7, Math.max(1, Math.floor(frame / 30) + 1));

export const MonasEIMV13: React.FC = () => {
  const frame = useCurrentFrame();
  const page = String(pageAt(frame)).padStart(2, '0') + ' / 07';

  // Every keyframe owns about one second. The 8-frame edge around each
  // boundary is used for object-driven transitions instead of scene fades.
  const s1 = visibility(frame, 0, 35, 4);
  const s2 = visibility(frame, 25, 65, 5);
  const s3 = visibility(frame, 55, 95, 5);
  const s4 = visibility(frame, 85, 125, 5);
  const s5 = visibility(frame, 115, 155, 5);
  const s6 = visibility(frame, 145, 185, 5);
  const s7 = interpolate(frame, [175, 184], [0, 1], clamp);

  // Persistent shared hero system.
  // Circle: city crop -> hero disk -> curve hand-off -> final closing disk.
  const circleX = map(
    frame,
    [0, 24, 34, 55, 64, 88, 114, 144, 174, 205],
    [720, 720, 470, 470, 840, 840, 910, 840, 820, 820],
  );
  const circleY = map(
    frame,
    [0, 24, 34, 55, 64, 88, 114, 144, 174, 205],
    [1400, 1400, 880, 880, 720, 720, 1470, 1450, 1390, 1390],
  );
  const circleSize = map(
    frame,
    [0, 24, 34, 55, 64, 88, 114, 144, 174, 205],
    [560, 560, 650, 650, 180, 180, 620, 620, 650, 650],
  );
  const circleColorMix = tween(frame, 26, 40);
  const circleOpacity = map(
    frame,
    [0, 8, 55, 63, 87, 96, 113, 122, 145, 154, 174, 184, 209],
    [0, 1, 1, 0.2, 0.2, 0, 0, 1, 1, 0, 0, 1, 1],
  );

  // Monas hero continues through 2 -> exits into 3, returns through 4/5/6/7.
  const monasOpacity = map(
    frame,
    [20, 30, 54, 64, 88, 95, 112, 120, 142, 150, 205, 209],
    [0, 0, 1, 0, 0, 1, 1, 0.75, 0.75, 1, 1, 1],
  );
  const monasX = map(
    frame,
    [24, 36, 54, 64, 88, 104, 120, 145, 154, 176, 209],
    [320, 320, 320, 780, 780, 690, 690, 520, 390, 650, 650],
  );
  const monasY = map(
    frame,
    [24, 36, 54, 64, 88, 104, 120, 145, 154, 176, 209],
    [520, 520, 520, 920, 920, 980, 980, 980, 820, 910, 910],
  );
  const monasH = map(
    frame,
    [24, 36, 54, 64, 88, 104, 120, 145, 154, 176, 209],
    [1240, 1240, 1240, 860, 860, 970, 970, 850, 1040, 1000, 1000],
  );

  // Shared curve hand-off between scene 3 and 4.
  const curve3 = visibility(frame, 57, 97, 5);
  const curve4 = visibility(frame, 86, 126, 5);

  const cityCropOpacity = map(frame, [0, 8, 25, 34], [0, 1, 1, 0]);
  const crowdOpacity = map(frame, [112, 123, 144, 154], [0, 1, 1, 0]);
  const flameOpacity = map(frame, [86, 96, 116, 126], [0, 1, 1, 0]);
  const cloudOpacity = map(frame, [26, 38, 55, 65, 145, 155, 209], [0, 0.42, 0.42, 0, 0.18, 0.3, 0.3]);

  return (
    <AbsoluteFill
      style={{
        background: OUTER,
        overflow: 'hidden',
        fontFamily: 'Arial, Helvetica, sans-serif',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 18,
          right: 18,
          top: 18,
          bottom: 18,
          overflow: 'hidden',
          borderRadius: 30,
          border: '2px solid ' + NAVY,
          background: PAPER,
        }}
      >
        <Header page={page} />

        {/* Persistent background details */}
        <div
          style={{
            position: 'absolute',
            left: -130,
            top: 500,
            width: 420,
            height: 420,
            borderRadius: 999,
            border: '1px solid rgba(18,59,114,.08)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: -190,
            top: 1040,
            width: 520,
            height: 520,
            borderRadius: 999,
            border: '1px solid rgba(18,59,114,.07)',
          }}
        />

        {/* Shared circle / orb */}
        <div
          style={{
            position: 'absolute',
            left: circleX - circleSize / 2,
            top: circleY - circleSize / 2,
            width: circleSize,
            height: circleSize,
            borderRadius: 999,
            overflow: 'hidden',
            opacity: circleOpacity,
            background:
              circleColorMix < 0.5
                ? PALE
                : BLUE,
            zIndex: 7,
          }}
        >
          <Img
            src={CITY}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: cityCropOpacity,
              transform: 'scale(1.03)',
            }}
          />
          <Img
            src={CLOUD}
            style={{
              position: 'absolute',
              left: -20,
              bottom: 30,
              width: '86%',
              opacity: cloudOpacity,
            }}
          />
        </div>

        {/* Shared Monas hero */}
        <Img
          src={MONAS}
          style={{
            position: 'absolute',
            left: monasX,
            top: monasY,
            height: monasH,
            opacity: monasOpacity,
            transform: 'translate(-50%,-50%)',
            transformOrigin: '50% 86%',
            zIndex: 13,
          }}
        />

        {/* Scene 1: Setup Question */}
        <div style={{opacity: s1}}>
          <Copy
            left={72}
            top={245}
            width={590}
            size={78}
            opacity={visibility(frame, 2, 31, 6)}
            y={enterExitY(frame, 2, 31, 26, -30)}
          >
            What<br />makes a city<br />truly
          </Copy>
          <Key
            left={70}
            top={585}
            width={760}
            size={160}
            opacity={visibility(frame, 8, 34, 6)}
            y={enterExitY(frame, 8, 34, 32, -36)}
          >
            ICONIC?
          </Key>
          <Copy
            left={84}
            top={1260}
            width={260}
            size={27}
            weight={650}
            opacity={visibility(frame, 15, 32, 4)}
            y={enterExitY(frame, 15, 32, 18, -18)}
          >
            More than<br />buildings,<br />it&apos;s what people<br />remember.
          </Copy>
        </div>

        {/* Scene 2: Hero Reveal */}
        <div style={{opacity: s2}}>
          <Copy
            left={74}
            top={165}
            width={140}
            size={67}
            opacity={visibility(frame, 28, 58, 5)}
            y={enterExitY(frame, 28, 58, 18, -20)}
          >
            A
          </Copy>
          <Key
            left={72}
            top={238}
            width={800}
            size={154}
            opacity={visibility(frame, 31, 61, 5)}
            y={enterExitY(frame, 31, 61, 26, -28)}
          >
            SYMBOL
          </Key>
          <Copy
            left={76}
            top={398}
            width={440}
            size={52}
            opacity={visibility(frame, 35, 61, 5)}
            y={enterExitY(frame, 35, 61, 18, -22)}
          >
            can hold<br />a whole city.
          </Copy>
          <SmallStack
            items={['PEOPLE', 'HISTORY', 'IDENTITY', 'TOMORROW']}
            left={76}
            top={1432}
            opacity={visibility(frame, 39, 59, 4)}
          />
        </div>

        {/* Scene 3: The Layers */}
        <div style={{opacity: s3}}>
          <Copy
            left={70}
            top={260}
            width={330}
            size={56}
            opacity={visibility(frame, 58, 89, 5)}
            x={enterExitX(frame, 58, 89, -24, -28)}
          >
            It brings<br />together
          </Copy>
          {['PLACE', 'PEOPLE', 'PURPOSE'].map((word, index) => {
            const start = 62 + index * 3;
            return (
              <Key
                key={word}
                left={70}
                top={470 + index * 145}
                width={490}
                size={111}
                opacity={visibility(frame, start, 91, 5)}
                x={enterExitX(frame, start, 91, -30, -28)}
              >
                {word}
              </Key>
            );
          })}
        </div>

        <svg
          width="1080"
          height="1920"
          viewBox="0 0 1080 1920"
          style={{position: 'absolute', inset: 0, zIndex: 11, opacity: curve3}}
        >
          <path
            d="M650 260 C820 430 850 690 805 925 C760 1170 670 1425 470 1670"
            fill="none"
            stroke={BLUE}
            strokeWidth="4"
            strokeLinecap="round"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset={1 - tween(frame, 61, 78)}
          />
        </svg>

        {[
          {x: 770, y: 435, label: 'PLACE', sub: 'A CAPITAL\nCITY', at: 66},
          {x: 825, y: 915, label: 'PEOPLE', sub: 'A SHARED\nSTORY', at: 72},
          {x: 710, y: 1470, label: 'PURPOSE', sub: 'A BRIGHTER\nTOMORROW', at: 78},
        ].map((node) => {
          const o = visibility(frame, node.at, 92, 5);
          const sc = map(frame, [node.at, node.at + 7], [0.5, 1]);
          return (
            <div
              key={node.label}
              style={{
                position: 'absolute',
                left: node.x,
                top: node.y,
                opacity: o,
                transform: 'scale(' + sc + ')',
                transformOrigin: 'center',
                zIndex: 25,
              }}
            >
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 99,
                  background: BLUE,
                  border: '4px solid ' + PAPER,
                  boxShadow: '0 0 0 2px ' + BLUE,
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: 48,
                  top: -1,
                  width: 210,
                  color: NAVY,
                  fontSize: 22,
                  fontWeight: 950,
                  letterSpacing: '.08em',
                  lineHeight: 1,
                }}
              >
                {node.label}
                <div
                  style={{
                    marginTop: 9,
                    color: MUTED,
                    whiteSpace: 'pre-line',
                    fontSize: 17,
                    fontWeight: 700,
                    letterSpacing: '.08em',
                    lineHeight: 1.1,
                  }}
                >
                  {node.sub}
                </div>
              </div>
            </div>
          );
        })}

        {/* Scene 4: Through Time */}
        <div style={{opacity: s4}}>
          <Copy
            left={74}
            top={260}
            width={610}
            size={73}
            opacity={visibility(frame, 88, 119, 5)}
            y={enterExitY(frame, 88, 119, 24, -26)}
          >
            Standing<br />across<br />generations.
          </Copy>
        </div>

        <svg
          width="1080"
          height="1920"
          viewBox="0 0 1080 1920"
          style={{position: 'absolute', inset: 0, zIndex: 12, opacity: curve4}}
        >
          <path
            d="M145 925 C300 830 425 915 565 855 C705 795 820 820 950 690"
            fill="none"
            stroke={BLUE}
            strokeWidth="4"
            strokeLinecap="round"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset={1 - tween(frame, 91, 106)}
          />
        </svg>

        {[
          {x: 155, y: 930, label: '1961', at: 95, dy: 28},
          {x: 455, y: 900, label: '1975', at: 99, dy: 28},
          {x: 690, y: 820, label: '1998', at: 103, dy: -46},
          {x: 930, y: 690, label: 'TODAY', at: 107, dy: -50},
        ].map((point) => (
          <React.Fragment key={point.label}>
            <div
              style={{
                position: 'absolute',
                left: point.x - 10,
                top: point.y - 10,
                width: 20,
                height: 20,
                borderRadius: 99,
                background: BLUE,
                opacity: visibility(frame, point.at, 120, 5),
                transform: 'scale(' + map(frame, [point.at, point.at + 5], [0.3, 1]) + ')',
                zIndex: 20,
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: point.x - 38,
                top: point.y + point.dy,
                color: NAVY,
                fontSize: 17,
                fontWeight: 900,
                opacity: visibility(frame, point.at, 120, 5),
                zIndex: 21,
              }}
            >
              {point.label}
            </div>
          </React.Fragment>
        ))}

        <Img
          src={FLAME}
          style={{
            position: 'absolute',
            right: -20,
            bottom: -20,
            width: 550,
            opacity: flameOpacity,
            transform: 'translateY(' + map(frame, [88, 98, 116, 126], [70, 0, 0, 80]) + 'px)',
            zIndex: 14,
          }}
        />
        <SmallStack
          items={['SAME', 'CITY', 'NEW', 'STORIES']}
          left={74}
          top={1480}
          opacity={visibility(frame, 101, 119, 4)}
        />

        {/* Scene 5: More Than a Monument */}
        <div style={{opacity: s5}}>
          <Copy
            left={86}
            top={245}
            width={610}
            size={61}
            opacity={visibility(frame, 118, 149, 5)}
            y={enterExitY(frame, 118, 149, 22, -24)}
          >
            It&apos;s more than<br />a monument.
          </Copy>
          {['IT’S A', 'MEETING', 'POINT.'].map((word, index) => (
            <Key
              key={word}
              left={84}
              top={445 + index * 145}
              width={720}
              size={124}
              opacity={visibility(frame, 123 + index * 3, 151, 5)}
              y={enterExitY(frame, 123 + index * 3, 151, 28, -28)}
            >
              {word}
            </Key>
          ))}
        </div>

        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 830,
            overflow: 'hidden',
            opacity: crowdOpacity,
            transform: 'translateY(' + map(frame, [112, 124, 144, 154], [90, 0, 0, 100]) + 'px)',
            zIndex: 10,
          }}
        >
          <Img
            src={MEETING}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center bottom',
            }}
          />
        </div>
        <SmallStack
          items={['DIFFERENT', 'PEOPLE', 'SAME HORIZON']}
          left={86}
          top={1652}
          opacity={visibility(frame, 134, 151, 4)}
        />

        {/* Scene 6: The Numbers */}
        <div style={{opacity: s6}}>
          <Copy
            left={80}
            top={240}
            width={160}
            size={60}
            opacity={visibility(frame, 148, 179, 5)}
            y={enterExitY(frame, 148, 179, 20, -22)}
          >
            At
          </Copy>
          <Key
            left={78}
            top={340}
            width={360}
            size={150}
            opacity={visibility(frame, 151, 181, 5)}
            y={enterExitY(frame, 151, 181, 24, -26)}
          >
            132
          </Key>
          <Key
            left={405}
            top={375}
            width={560}
            size={106}
            opacity={visibility(frame, 154, 181, 5)}
            y={enterExitY(frame, 154, 181, 24, -26)}
          >
            METERS
          </Key>
          <Copy
            left={84}
            top={660}
            width={300}
            size={41}
            opacity={visibility(frame, 157, 179, 5)}
            x={enterExitX(frame, 157, 179, -22, -22)}
          >
            Monas stands<br />as a reminder<br />of how far<br />we can go,<br />together.
          </Copy>
        </div>

        <div
          style={{
            position: 'absolute',
            right: 150,
            top: 705,
            width: 3,
            height: 665 * map(frame, [158, 171], [0, 1]),
            background: BLUE,
            opacity: visibility(frame, 156, 183, 4),
            zIndex: 22,
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: 140,
            top: 695,
            width: 22,
            height: 22,
            borderRadius: 99,
            background: BLUE,
            opacity: visibility(frame, 158, 183, 4),
            zIndex: 23,
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: 140,
            top: 1350,
            width: 22,
            height: 22,
            borderRadius: 99,
            background: BLUE,
            opacity: visibility(frame, 166, 183, 4),
            zIndex: 23,
          }}
        />
        <Copy
          left={920}
          top={1250}
          width={110}
          size={26}
          weight={950}
          opacity={visibility(frame, 166, 183, 4)}
        >
          132 M<br /><span style={{fontSize: 17, letterSpacing: '.10em'}}>HEIGHT</span>
        </Copy>

        {/* Scene 7: Closing */}
        <div style={{opacity: s7}}>
          <Copy
            left={84}
            top={260}
            width={470}
            size={56}
            opacity={visibility(frame, 179, 209, 6)}
            y={enterExitY(frame, 179, 209, 20, 0)}
          >
            A symbol today.<br />A stronger<br />tomorrow.
          </Copy>
          {['JAKARTA', 'KEEPS', 'MOVING'].map((word, index) => (
            <Key
              key={word}
              left={82}
              top={550 + index * 145}
              width={690}
              size={128}
              color={NAVY}
              opacity={visibility(frame, 184 + index * 3, 209, 5)}
              x={enterExitX(frame, 184 + index * 3, 209, -26, 0)}
            >
              {word}
            </Key>
          ))}
          <SmallStack
            items={['PEOPLE', 'PLACES', 'POSSIBILITIES']}
            left={84}
            top={1470}
            opacity={visibility(frame, 196, 209, 4)}
          />
        </div>

        <Footer />
      </div>
    </AbsoluteFill>
  );
};
