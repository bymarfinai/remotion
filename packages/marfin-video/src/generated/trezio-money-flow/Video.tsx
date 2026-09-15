import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Easing,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const NAVY = '#07111A';
const NAVY_2 = '#0D1A24';
const WARM = '#F4EFE5';
const MUTED = '#A8B0B5';
const LINE = 'rgba(244,239,229,0.15)';
const GREEN = '#9ED6B8';
const AMBER = '#F2B66D';
const RED = '#E98272';

const SALARY = 12_750_000;

const expenses = [
  {label: 'Housing', amount: 3_500_000, category: 'NEEDS', start: 54},
  {label: 'Food', amount: 2_000_000, category: 'NEEDS', start: 69},
  {label: 'Transport', amount: 1_250_000, category: 'NEEDS', start: 84},
  {label: 'Lifestyle', amount: 1_750_000, category: 'WANTS', start: 99},
  {label: 'Subscriptions', amount: 750_000, category: 'WANTS', start: 114},
  {label: 'Debt', amount: 1_500_000, category: 'NEEDS', start: 129},
  {label: 'Impulse', amount: 1_150_000, category: 'WANTS', start: 144},
] as const;

const categories = [
  {name: 'NEEDS', amount: 8_250_000, pct: 64.7, color: WARM},
  {name: 'WANTS', amount: 3_650_000, pct: 28.6, color: AMBER},
  {name: 'SAVINGS', amount: 850_000, pct: 6.7, color: GREEN},
] as const;

const clamp = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
};

const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
const easeInOut = Easing.bezier(0.65, 0, 0.35, 1);

const formatRupiah = (value: number) => {
  const rounded = Math.round(value).toString();
  return `Rp${rounded.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
};

const sceneOpacity = (frame: number, start: number, end: number, fade = 12) =>
  interpolate(frame, [start, start + fade, end - fade, end], [0, 1, 1, 0], {
    ...clamp,
    easing: easeOut,
  });

const writeAscii = (view: DataView, offset: number, text: string) => {
  for (let i = 0; i < text.length; i++) {
    view.setUint8(offset + i, text.charCodeAt(i));
  }
};

const makeSoundtrack = () => {
  const sampleRate = 22050;
  const duration = 15;
  const sampleCount = sampleRate * duration;
  const buffer = new ArrayBuffer(44 + sampleCount * 2);
  const view = new DataView(buffer);

  writeAscii(view, 0, 'RIFF');
  view.setUint32(4, 36 + sampleCount * 2, true);
  writeAscii(view, 8, 'WAVE');
  writeAscii(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeAscii(view, 36, 'data');
  view.setUint32(40, sampleCount * 2, true);

  let seed = 1937;
  const noise = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296 * 2 - 1;
  };

  const tickTimes = [1.8, 2.3, 2.8, 3.3, 3.8, 4.3, 4.8];
  const whooshTimes = [6.7, 10.6];

  for (let i = 0; i < sampleCount; i++) {
    const t = i / sampleRate;
    let sample = 0;

    // 120 BPM pulse. Slightly tense before the insight, warmer after it.
    const beat = t % 0.5;
    const kickEnv = Math.exp(-beat * 12);
    const kickFreq = t < 10 ? 54 : 48;
    sample += Math.sin(2 * Math.PI * kickFreq * t) * kickEnv * 0.11;

    const eighth = t % 0.25;
    if (eighth < 0.025) {
      sample += noise() * Math.exp(-eighth * 130) * 0.035;
    }

    const tense = t < 10;
    const root = tense ? 73.42 : 65.41;
    const third = tense ? 87.31 : 82.41;
    const fifth = tense ? 110 : 98;
    const bedEnv = 0.045 + 0.015 * Math.sin(2 * Math.PI * 0.125 * t);
    sample += Math.sin(2 * Math.PI * root * t) * bedEnv;
    sample += Math.sin(2 * Math.PI * third * t) * bedEnv * 0.55;
    sample += Math.sin(2 * Math.PI * fifth * t) * bedEnv * 0.38;

    for (const tickTime of tickTimes) {
      const dt = t - tickTime;
      if (dt >= 0 && dt < 0.08) {
        sample += Math.sin(2 * Math.PI * 1600 * dt) * Math.exp(-dt * 55) * 0.13;
      }
    }

    for (const whooshTime of whooshTimes) {
      const dt = t - whooshTime;
      if (dt >= 0 && dt < 0.65) {
        const env = Math.sin(Math.PI * dt / 0.65);
        sample += noise() * env * 0.04;
      }
    }

    // Controlled impact at the main insight.
    const impactDt = t - 9.85;
    if (impactDt >= 0 && impactDt < 0.8) {
      sample += Math.sin(2 * Math.PI * 42 * impactDt) * Math.exp(-impactDt * 5) * 0.22;
      sample += noise() * Math.exp(-impactDt * 35) * 0.07;
    }

    // Tonal resolve into the product and final line.
    if (t > 11.5) {
      const resolveEnv = Math.min(1, (t - 11.5) / 1.2) * 0.055;
      sample += Math.sin(2 * Math.PI * 130.81 * t) * resolveEnv;
      sample += Math.sin(2 * Math.PI * 164.81 * t) * resolveEnv * 0.72;
      sample += Math.sin(2 * Math.PI * 196 * t) * resolveEnv * 0.58;
    }

    sample = Math.max(-0.92, Math.min(0.92, sample));
    view.setInt16(44 + i * 2, Math.round(sample * 32767), true);
  }

  const bytes = new Uint8Array(buffer);
  let binary = '';
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }

  return `data:audio/wav;base64,${btoa(binary)}`;
};

const SOUNDTRACK = makeSoundtrack();

const Kicker: React.FC<{children: React.ReactNode}> = ({children}) => (
  <div
    style={{
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: 24,
      fontWeight: 700,
      letterSpacing: 5.5,
      color: MUTED,
    }}
  >
    {children}
  </div>
);

const SalaryScene: React.FC = () => {
  const frame = useCurrentFrame();
  const visible = sceneOpacity(frame, 0, 183, 10);

  const salaryEntrance = interpolate(frame, [0, 28], [0, 1], {
    ...clamp,
    easing: easeOut,
  });

  const spent = expenses.reduce((total, expense) => {
    const progress = interpolate(frame, [expense.start, expense.start + 11], [0, 1], {
      ...clamp,
      easing: easeInOut,
    });
    return total + expense.amount * progress;
  }, 0);

  const balance = SALARY - spent;
  const remainingRatio = balance / SALARY;

  return (
    <AbsoluteFill
      style={{
        opacity: visible,
        padding: '150px 92px 120px',
        backgroundColor: NAVY,
        color: WARM,
        fontFamily: 'Arial, Helvetica, sans-serif',
      }}
    >
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Kicker>MONTHLY INCOME</Kicker>
        <div style={{fontSize: 22, color: MUTED}}>01 / CASH FLOW</div>
      </div>

      <div
        style={{
          marginTop: 180,
          opacity: salaryEntrance,
          translate: `0 ${interpolate(frame, [0, 28], [60, 0], {...clamp, easing: easeOut})}px`,
        }}
      >
        <div style={{fontSize: 26, color: MUTED, marginBottom: 26}}>SALARY</div>
        <div
          style={{
            fontSize: 116,
            lineHeight: 0.96,
            letterSpacing: -6,
            fontWeight: 800,
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {formatRupiah(balance)}
        </div>
        <div style={{fontSize: 26, color: MUTED, marginTop: 24}}>
          started at {formatRupiah(SALARY)}
        </div>
      </div>

      <div style={{marginTop: 76}}>
        <div style={{height: 5, width: '100%', backgroundColor: LINE, overflow: 'hidden'}}>
          <div
            style={{
              height: '100%',
              width: `${Math.max(0, remainingRatio * 100)}%`,
              backgroundColor: balance > 2_000_000 ? WARM : RED,
            }}
          />
        </div>
      </div>

      <div style={{marginTop: 72, display: 'flex', flexDirection: 'column', gap: 24}}>
        {expenses.map((expense, index) => {
          const appear = interpolate(frame, [expense.start - 4, expense.start + 9], [0, 1], {
            ...clamp,
            easing: easeOut,
          });
          return (
            <div
              key={expense.label}
              style={{
                height: 78,
                borderTop: `1px solid ${LINE}`,
                display: 'grid',
                gridTemplateColumns: '58px 1fr auto',
                alignItems: 'center',
                opacity: appear,
                translate: `${interpolate(appear, [0, 1], [30, 0])}px 0`,
              }}
            >
              <div style={{fontSize: 22, color: MUTED}}>{String(index + 1).padStart(2, '0')}</div>
              <div style={{fontSize: 30, fontWeight: 700}}>{expense.label}</div>
              <div style={{fontSize: 29, color: RED, fontVariantNumeric: 'tabular-nums'}}>
                −{formatRupiah(expense.amount)}
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          position: 'absolute',
          left: 92,
          right: 92,
          bottom: 92,
          display: 'flex',
          justifyContent: 'space-between',
          color: MUTED,
          fontSize: 22,
        }}
      >
        <span>HIGH INCOME ≠ HEALTHY FINANCES</span>
        <span>120 BPM</span>
      </div>
    </AbsoluteFill>
  );
};

const CategoryScene: React.FC = () => {
  const frame = useCurrentFrame();
  const visible = sceneOpacity(frame, 168, 288, 12);
  const progress = interpolate(frame, [180, 224], [0, 1], {
    ...clamp,
    easing: easeInOut,
  });

  return (
    <AbsoluteFill
      style={{
        opacity: visible,
        padding: '150px 92px 100px',
        backgroundColor: WARM,
        color: NAVY,
        fontFamily: 'Arial, Helvetica, sans-serif',
      }}
    >
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <Kicker>WHERE DID IT GO?</Kicker>
        <div style={{fontSize: 22, color: '#667078'}}>02 / PATTERN</div>
      </div>

      <div style={{marginTop: 110, fontSize: 76, lineHeight: 1.02, letterSpacing: -4, fontWeight: 800}}>
        Same money.
        <br />
        Different story.
      </div>

      <div style={{marginTop: 100, display: 'flex', flexDirection: 'column', gap: 34}}>
        {categories.map((category, index) => {
          const delay = index * 7;
          const rowProgress = interpolate(frame, [184 + delay, 224 + delay], [0, 1], {
            ...clamp,
            easing: easeOut,
          });
          return (
            <div key={category.name} style={{opacity: rowProgress}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                <div style={{fontSize: 34, fontWeight: 800, letterSpacing: 2}}>{category.name}</div>
                <div style={{display: 'flex', gap: 26, alignItems: 'baseline'}}>
                  <span style={{fontSize: 25, color: '#667078'}}>{formatRupiah(category.amount)}</span>
                  <span style={{fontSize: 52, fontWeight: 800, letterSpacing: -2}}>{category.pct}%</span>
                </div>
              </div>
              <div style={{height: 110, marginTop: 18, backgroundColor: 'rgba(7,17,26,0.08)', overflow: 'hidden'}}>
                <div
                  style={{
                    height: '100%',
                    width: `${category.pct * rowProgress}%`,
                    backgroundColor: category.color === WARM ? NAVY : category.color,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: 95,
          borderTop: '1px solid rgba(7,17,26,0.22)',
          paddingTop: 30,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 24,
          opacity: progress,
        }}
      >
        <div style={{fontSize: 25, color: '#667078'}}>MONTH END</div>
        <div style={{fontSize: 42, textAlign: 'right', fontWeight: 800}}>Only {formatRupiah(850_000)} left.</div>
      </div>

      <div style={{position: 'absolute', bottom: 92, left: 92, fontSize: 22, color: '#667078'}}>
        EXPENSES → CATEGORIES → BEHAVIOR
      </div>
    </AbsoluteFill>
  );
};

const InsightScene: React.FC = () => {
  const frame = useCurrentFrame();
  const visible = sceneOpacity(frame, 267, 347, 8);
  const line1 = interpolate(frame, [276, 294], [0, 1], {...clamp, easing: easeOut});
  const line2 = interpolate(frame, [292, 315], [0, 1], {...clamp, easing: easeOut});
  const underline = interpolate(frame, [306, 329], [0, 1], {...clamp, easing: easeOut});

  return (
    <AbsoluteFill
      style={{
        opacity: visible,
        padding: '170px 92px',
        justifyContent: 'center',
        backgroundColor: NAVY,
        color: WARM,
        fontFamily: 'Arial, Helvetica, sans-serif',
      }}
    >
      <Kicker>THE INSIGHT</Kicker>
      <div style={{marginTop: 68, fontSize: 92, lineHeight: 0.98, letterSpacing: -5, fontWeight: 800}}>
        <div style={{opacity: line1, translate: `0 ${interpolate(line1, [0, 1], [48, 0])}px`}}>
          It’s not only
          <br />
          how much comes in.
        </div>
        <div
          style={{
            marginTop: 40,
            color: GREEN,
            opacity: line2,
            translate: `0 ${interpolate(line2, [0, 1], [48, 0])}px`,
          }}
        >
          It’s where it goes.
        </div>
      </div>
      <div style={{marginTop: 58, width: `${underline * 100}%`, height: 5, backgroundColor: GREEN}} />
      <div style={{marginTop: 50, fontSize: 27, lineHeight: 1.55, color: MUTED, maxWidth: 760}}>
        Healthy finances start when spending stops being invisible.
      </div>
    </AbsoluteFill>
  );
};

const ProductScene: React.FC = () => {
  const frame = useCurrentFrame();
  const visible = sceneOpacity(frame, 328, 420, 10);
  const shell = interpolate(frame, [338, 365], [0, 1], {...clamp, easing: easeOut});
  const bars = interpolate(frame, [354, 390], [0, 1], {...clamp, easing: easeInOut});

  return (
    <AbsoluteFill
      style={{
        opacity: visible,
        padding: '120px 70px 90px',
        backgroundColor: WARM,
        color: NAVY,
        fontFamily: 'Arial, Helvetica, sans-serif',
      }}
    >
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div style={{fontSize: 34, fontWeight: 800, letterSpacing: -1}}>Trezio</div>
        <div style={{fontSize: 20, color: '#667078'}}>by Danaloka</div>
      </div>

      <div
        style={{
          marginTop: 76,
          border: '1px solid rgba(7,17,26,0.2)',
          backgroundColor: '#FAF7F0',
          minHeight: 1280,
          padding: '44px 40px',
          opacity: shell,
          scale: interpolate(shell, [0, 1], [0.94, 1]),
          transformOrigin: '50% 50%',
        }}
      >
        <div style={{fontSize: 19, letterSpacing: 3, color: '#667078'}}>SPENDING PATTERN / SEPTEMBER</div>
        <div style={{marginTop: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
          <div>
            <div style={{fontSize: 24, color: '#667078'}}>Income</div>
            <div style={{fontSize: 54, fontWeight: 800, letterSpacing: -2}}>{formatRupiah(SALARY)}</div>
          </div>
          <div style={{textAlign: 'right'}}>
            <div style={{fontSize: 22, color: '#667078'}}>Saved</div>
            <div style={{fontSize: 44, fontWeight: 800, color: GREEN}}>6.7%</div>
          </div>
        </div>

        <div style={{marginTop: 58, borderTop: '1px solid rgba(7,17,26,0.14)', paddingTop: 44}}>
          <div style={{fontSize: 24, fontWeight: 700}}>Money flow</div>
          <div style={{marginTop: 34, display: 'flex', gap: 10, height: 220, alignItems: 'flex-end'}}>
            {[54, 72, 38, 82, 64, 92, 44, 76, 58, 88, 70, 48].map((height, index) => {
              const barProgress = interpolate(bars, [0, 1], [0, 1]);
              return (
                <div key={index} style={{flex: 1, height: '100%', display: 'flex', alignItems: 'flex-end'}}>
                  <div
                    style={{
                      width: '100%',
                      height: `${height * barProgress}%`,
                      backgroundColor: index > 8 ? GREEN : NAVY,
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div style={{marginTop: 66, display: 'flex', flexDirection: 'column', gap: 26}}>
          {categories.map((category, index) => (
            <div
              key={category.name}
              style={{
                display: 'grid',
                gridTemplateColumns: '140px 1fr 100px',
                gap: 20,
                alignItems: 'center',
                opacity: interpolate(frame, [365 + index * 7, 385 + index * 7], [0, 1], {
                  ...clamp,
                  easing: easeOut,
                }),
              }}
            >
              <div style={{fontSize: 22, fontWeight: 800}}>{category.name}</div>
              <div style={{height: 20, backgroundColor: 'rgba(7,17,26,0.09)', overflow: 'hidden'}}>
                <div
                  style={{
                    width: `${category.pct}%`,
                    height: '100%',
                    backgroundColor: category.name === 'SAVINGS' ? GREEN : category.name === 'WANTS' ? AMBER : NAVY,
                  }}
                />
              </div>
              <div style={{fontSize: 24, fontWeight: 800, textAlign: 'right'}}>{category.pct}%</div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 66,
            padding: '32px 30px',
            backgroundColor: NAVY,
            color: WARM,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <div style={{fontSize: 18, letterSpacing: 3, color: MUTED}}>TREZIO INSIGHT</div>
            <div style={{fontSize: 31, fontWeight: 800, marginTop: 12}}>Wants are crowding out savings.</div>
          </div>
          <div style={{fontSize: 52, color: GREEN}}>→</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const EndScene: React.FC = () => {
  const frame = useCurrentFrame();
  const visible = interpolate(frame, [404, 424], [0, 1], {...clamp, easing: easeOut});
  const tagline = interpolate(frame, [418, 444], [0, 1], {...clamp, easing: easeOut});

  return (
    <AbsoluteFill
      style={{
        opacity: visible,
        padding: '150px 92px 110px',
        justifyContent: 'space-between',
        backgroundColor: NAVY,
        color: WARM,
        fontFamily: 'Arial, Helvetica, sans-serif',
      }}
    >
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div style={{fontSize: 38, fontWeight: 800}}>Trezio</div>
        <div style={{fontSize: 21, color: MUTED}}>by Danaloka</div>
      </div>

      <div>
        <div
          style={{
            fontSize: 98,
            lineHeight: 0.98,
            letterSpacing: -5,
            fontWeight: 800,
            opacity: tagline,
            translate: `0 ${interpolate(tagline, [0, 1], [50, 0])}px`,
          }}
        >
          Know your money.
          <br />
          <span style={{color: GREEN}}>Before it disappears.</span>
        </div>
        <div style={{marginTop: 64, width: 160, height: 5, backgroundColor: GREEN}} />
      </div>

      <div style={{display: 'flex', justifyContent: 'space-between', color: MUTED, fontSize: 20}}>
        <span>SPENDING PATTERNS, MADE VISIBLE.</span>
        <span>15 SEC / 9:16</span>
      </div>
    </AbsoluteFill>
  );
};

export const Video: React.FC = () => {
  const {durationInFrames} = useVideoConfig();

  return (
    <AbsoluteFill style={{backgroundColor: NAVY}}>
      <Audio src={SOUNDTRACK} volume={0.72} durationInFrames={durationInFrames} />
      <Sequence from={0} durationInFrames={183} layout="none">
        <SalaryScene />
      </Sequence>
      <Sequence from={0} durationInFrames={288} layout="none">
        <CategoryScene />
      </Sequence>
      <Sequence from={0} durationInFrames={347} layout="none">
        <InsightScene />
      </Sequence>
      <Sequence from={0} durationInFrames={420} layout="none">
        <ProductScene />
      </Sequence>
      <Sequence from={0} durationInFrames={450} layout="none">
        <EndScene />
      </Sequence>
    </AbsoluteFill>
  );
};
