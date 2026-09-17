import React from 'react';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
} from 'remotion';

const INK = '#2d2441';
const MUTED = '#716b80';
const PURPLE = '#7655f6';
const PURPLE_2 = '#9b7cff';
const PINK = '#f6a0cf';
const PEACH = '#f5ad77';
const ORANGE = '#ffb13b';
const GREEN = '#3fc79a';
const BLUE = '#6d8fff';
const CARD = 'rgba(255,255,255,0.93)';
const BORDER = 'rgba(74,54,104,0.11)';
const SHADOW = '0 22px 58px rgba(85,58,130,0.14)';

const clamp = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
};

const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
const easeInOut = Easing.bezier(0.65, 0, 0.35, 1);

const p = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], {...clamp, easing: easeOut});

const pi = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], {...clamp, easing: easeInOut});

const win = (frame: number, start: number, end: number, fade = 6) =>
  interpolate(
    frame,
    [start, start + fade, end - fade, end],
    [0, 1, 1, 0],
    {...clamp, easing: easeOut},
  );

const Background: React.FC<{frame: number}> = ({frame}) => (
  <AbsoluteFill
    style={{
      background:
        'radial-gradient(ellipse at 14% 18%, rgba(255,177,110,.66) 0%, rgba(255,177,110,0) 34%), radial-gradient(ellipse at 78% 15%, rgba(145,113,255,.56) 0%, rgba(145,113,255,0) 37%), radial-gradient(ellipse at 74% 82%, rgba(247,148,202,.50) 0%, rgba(247,148,202,0) 35%), radial-gradient(ellipse at 38% 67%, rgba(120,208,255,.30) 0%, rgba(120,208,255,0) 30%), linear-gradient(135deg,#fff8f2 0%,#f7efff 48%,#fff2f8 100%)',
      scale: 1.018 + Math.sin(frame / 66) * 0.004,
    }}
  />
);

const Panel: React.FC<{
  children?: React.ReactNode;
  style?: React.CSSProperties;
}> = ({children, style}) => (
  <div
    style={{
      position: 'absolute',
      background: CARD,
      border: `1px solid ${BORDER}`,
      borderRadius: 22,
      boxShadow: SHADOW,
      color: INK,
      fontFamily: 'Arial, Helvetica, sans-serif',
      ...style,
    }}
  >
    {children}
  </div>
);

const Pill: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({children, style}) => (
  <div
    style={{
      position: 'absolute',
      padding: '11px 20px',
      borderRadius: 999,
      background: 'rgba(255,255,255,.94)',
      border: `1px solid ${BORDER}`,
      boxShadow: '0 11px 30px rgba(79,54,126,.12)',
      fontFamily: 'Arial, Helvetica, sans-serif',
      color: INK,
      fontSize: 16,
      fontWeight: 700,
      ...style,
    }}
  >
    {children}
  </div>
);

const MiniInvoice: React.FC<{
  frame: number;
  start: number;
  x: number;
  y: number;
  r: number;
  label: string;
  amount: string;
  accent: string;
  large?: boolean;
}> = ({frame, start, x, y, r, label, amount, accent, large}) => {
  const enter = p(frame, start, start + 11);
  const gather = pi(frame, 33, 47);
  const driftX = Math.sin((frame + start) / 22) * 7;
  const driftY = Math.cos((frame + start) / 25) * 5;
  const centerX = 960 - (large ? 155 : 125);
  const centerY = 540 - (large ? 55 : 44);

  return (
    <Panel
      style={{
        left: interpolate(gather, [0, 1], [x, centerX]),
        top: interpolate(gather, [0, 1], [y, centerY]),
        width: interpolate(gather, [0, 1], [large ? 315 : 250, 120]),
        height: interpolate(gather, [0, 1], [large ? 102 : 82, 44]),
        padding: gather < 0.7 ? (large ? '20px 23px' : '15px 18px') : 0,
        opacity: enter * interpolate(gather, [0, 1], [1, 0]),
        scale: interpolate(enter, [0, 1], [0.7, 1]),
        translate: `${driftX}px ${driftY + interpolate(enter, [0, 1], [36, 0])}px`,
        rotate: `${interpolate(gather, [0, 1], [r, 0])}deg`,
        overflow: 'hidden',
      }}
    >
      <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
        <div style={{width: 11, height: 11, borderRadius: 4, background: accent}} />
        <div style={{fontSize: large ? 15 : 13, fontWeight: 700, color: MUTED}}>
          {label}
        </div>
      </div>
      <div style={{fontSize: large ? 23 : 19, fontWeight: 900, marginTop: 7}}>
        {amount}
      </div>
    </Panel>
  );
};

const FloatingToBrand: React.FC<{frame: number}> = ({frame}) => {
  const yellow = p(frame, 20, 32);
  const brand = p(frame, 39, 51);
  const brandExit = pi(frame, 61, 72);

  return (
    <AbsoluteFill style={{opacity: win(frame, 0, 78, 4)}}>
      <div
        style={{
          position: 'absolute',
          left: -120,
          top: 770,
          width: 280,
          height: 280,
          borderRadius: '50%',
          background: '#f9b414',
          opacity: yellow * (1 - brand),
          scale: interpolate(yellow, [0, 1], [0.55, 1]),
        }}
      />

      <MiniInvoice frame={frame} start={0} x={105} y={540} r={-3} label="Invoice sent" amount="$8,420.00" accent={GREEN} large />
      <MiniInvoice frame={frame} start={3} x={465} y={282} r={4} label="Payment received" amount="$2,185.60" accent={BLUE} />
      <MiniInvoice frame={frame} start={6} x={920} y={238} r={-4} label="New invoice" amount="$839.00" accent={PURPLE} large />
      <MiniInvoice frame={frame} start={9} x={1332} y={365} r={3} label="Reminder sent" amount="$4,910.20" accent={PEACH} />
      <MiniInvoice frame={frame} start={12} x={1368} y={668} r={-2} label="Paid" amount="$1,240.00" accent={GREEN} />
      <MiniInvoice frame={frame} start={15} x={655} y={708} r={5} label="Subscription" amount="$620.40" accent={PURPLE} />

      <div
        style={{
          position: 'absolute',
          left: 875,
          top: 510,
          width: 17,
          height: 17,
          borderRadius: '50%',
          background: ORANGE,
          opacity: p(frame, 12, 22) * (1 - brandExit),
          scale: 1 + Math.sin(frame / 8) * 0.12,
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          translate: '-50% -50%',
          fontFamily: 'Arial, Helvetica, sans-serif',
          fontWeight: 900,
          fontSize: 112,
          letterSpacing: -6,
          color: INK,
          opacity: brand * (1 - brandExit),
          scale: interpolate(brand, [0, 1], [0.86, 1]),
        }}
      >
        Flow<span style={{color: PURPLE}}>Paid</span>
        <span style={{fontSize: 56, color: PINK}}>.</span>
      </div>
    </AbsoluteFill>
  );
};

const StackScene: React.FC<{frame: number}> = ({frame}) => {
  const enter = p(frame, 68, 80);
  const collapse = pi(frame, 91, 103);

  return (
    <AbsoluteFill style={{opacity: win(frame, 65, 106, 5)}}>
      <Panel
        style={{
          left: interpolate(collapse, [0, 1], [560, 790]),
          top: interpolate(collapse, [0, 1], [255, 470]),
          width: interpolate(collapse, [0, 1], [715, 330]),
          height: interpolate(collapse, [0, 1], [450, 120]),
          padding: collapse < 0.7 ? 34 : 18,
          opacity: enter,
          scale: interpolate(enter, [0, 1], [0.9, 1]),
          translate: `${interpolate(enter, [0, 1], [-65, 0])}px 0`,
          overflow: 'hidden',
        }}
      >
        <div style={{fontSize: 17, color: MUTED, fontWeight: 800}}>Credit memo</div>
        <div style={{fontSize: 30, fontWeight: 900, marginTop: 9}}>$17,384.11</div>
        <div style={{height: 1, background: BORDER, margin: '21px 0'}} />
        {[
          ['Customer', 'Avery Martin'],
          ['Invoice', '#INV-5829'],
          ['Amount', '$17,384.11'],
          ['Status', 'Paid'],
        ].map(([a, b], i) => (
          <div
            key={a}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              marginTop: 14,
              opacity: p(frame, 72 + i * 3, 80 + i * 3) * (1 - collapse),
            }}
          >
            <div style={{fontSize: 16, color: MUTED}}>{a}</div>
            <div style={{fontSize: 17, fontWeight: 800}}>{b}</div>
          </div>
        ))}
      </Panel>

      <Panel
        style={{
          left: interpolate(collapse, [0, 1], [1120, 895]),
          top: interpolate(collapse, [0, 1], [210, 420]),
          width: 330,
          padding: 22,
          opacity: p(frame, 74, 84) * (1 - collapse),
          translate: `${interpolate(p(frame, 74, 84), [0, 1], [55, 0])}px 0`,
        }}
      >
        <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
          <div
            style={{
              width: 66,
              height: 66,
              borderRadius: '50%',
              background: 'linear-gradient(135deg,#ffbf84,#7760f5)',
            }}
          />
          <div>
            <div style={{fontWeight: 900, fontSize: 17}}>Avery Martin</div>
            <div style={{color: MUTED, fontSize: 14, marginTop: 4}}>Customer profile</div>
          </div>
        </div>
      </Panel>

      <Panel
        style={{
          left: interpolate(collapse, [0, 1], [430, 840]),
          top: interpolate(collapse, [0, 1], [600, 510]),
          width: 340,
          padding: 20,
          opacity: p(frame, 78, 88) * (1 - collapse),
          rotate: `${interpolate(collapse, [0, 1], [-2, 0])}deg`,
        }}
      >
        <div style={{fontSize: 14, color: MUTED}}>Paid automatically</div>
        <div style={{fontSize: 27, fontWeight: 900, marginTop: 7}}>$17,384.11</div>
      </Panel>
    </AbsoluteFill>
  );
};

const NetworkJourney: React.FC<{frame: number}> = ({frame}) => {
  const pillEnter = p(frame, 98, 106);
  const network = p(frame, 112, 126);
  const networkExit = pi(frame, 165, 178);
  const ready = p(frame, 168, 176);
  const dash = interpolate(frame, [116, 151], [760, 0], clamp);
  const pillX = interpolate(network, [0, 1], [812, 798]);
  const pillY = interpolate(network, [0, 1], [496, 500]);

  return (
    <AbsoluteFill style={{opacity: win(frame, 95, 191, 4)}}>
      <svg width="1920" height="1080" style={{position: 'absolute', inset: 0, opacity: network * (1 - networkExit)}}>
        <path
          d="M650 620 C710 370 1005 290 1245 430 C1470 560 1330 755 1075 724 C855 698 665 650 650 620"
          fill="none"
          stroke="rgba(119,87,246,.44)"
          strokeWidth="3.5"
          strokeDasharray="760"
          strokeDashoffset={dash}
        />
      </svg>

      <Pill
        style={{
          left: pillX,
          top: pillY,
          opacity: pillEnter * (1 - networkExit),
          scale: interpolate(pillEnter, [0, 1], [0.74, 1]),
        }}
      >
        {frame < 126 ? 'AI-powered platform' : frame < 168 ? 'Built for teams · scalable' : 'Ready to send · instantly'}
      </Pill>

      {[
        {x: 585, y: 590, c: 'linear-gradient(135deg,#ffb47b,#f074b8)', s: 54, d: 0},
        {x: 890, y: 288, c: 'linear-gradient(135deg,#6b82ff,#9d78ff)', s: 54, d: 3},
        {x: 1290, y: 385, c: 'linear-gradient(135deg,#72d9b7,#6086ff)', s: 54, d: 6},
        {x: 1330, y: 685, c: 'linear-gradient(135deg,#f1a770,#7c68f4)', s: 54, d: 9},
        {x: 810, y: 735, c: 'linear-gradient(135deg,#f2a5cd,#8a6cf6)', s: 54, d: 12},
      ].map((a, i) => {
        const q = p(frame, 121 + a.d, 131 + a.d);
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: a.x,
              top: a.y,
              width: a.s,
              height: a.s,
              borderRadius: '50%',
              background: a.c,
              border: '5px solid rgba(255,255,255,.94)',
              boxShadow: '0 12px 28px rgba(73,50,118,.18)',
              opacity: q * (1 - networkExit),
              scale: interpolate(q, [0, 1], [0.55, 1]),
              translate: `${interpolate(q, [0, 1], [18, 0])}px ${interpolate(q, [0, 1], [32, 0])}px`,
            }}
          />
        );
      })}

      <div style={{position:'absolute',left:710,top:425,width:36,height:36,borderRadius:'50%',background:PURPLE,opacity:p(frame,128,137)*(1-networkExit)}}/>
      <div style={{position:'absolute',left:1170,top:710,width:40,height:40,borderRadius:'50%',background:INK,opacity:p(frame,132,141)*(1-networkExit)}}/>
      <div style={{position:'absolute',left:1420,top:510,width:28,height:28,borderRadius:'9px',background:GREEN,opacity:p(frame,136,145)*(1-networkExit)}}/>
      <div style={{position:'absolute',left:945,top:568,width:24,height:24,borderRadius:8,background:PURPLE,opacity:p(frame,104,113)*(1-network)}}/>
      <div style={{position:'absolute',left:772,top:500,width:370,height:52,borderRadius:999,border:`1px solid ${BORDER}`,opacity:ready*(1-networkExit)}}/>
    </AbsoluteFill>
  );
};

const TableToReminders: React.FC<{frame: number}> = ({frame}) => {
  const table = p(frame, 180, 191);
  const tableExit = pi(frame, 214, 224);
  const reminder = p(frame, 213, 224);
  const reminderExit = pi(frame, 253, 264);

  return (
    <AbsoluteFill style={{opacity: win(frame, 177, 269, 4)}}>
      <Panel
        style={{
          left: interpolate(reminder, [0, 1], [365, 900]),
          top: interpolate(reminder, [0, 1], [260, 230]),
          width: interpolate(reminder, [0, 1], [1190, 620]),
          height: interpolate(reminder, [0, 1], [520, 470]),
          padding: 32,
          opacity: table * (1 - reminderExit),
          scale: interpolate(table, [0, 1], [0.75, 1]),
          translate: `0 ${interpolate(table, [0, 1], [44, 0])}px`,
          overflow: 'hidden',
        }}
      >
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div style={{fontSize:23,fontWeight:900}}>{frame < 214 ? 'Invoices' : 'Reminder templates'}</div>
          {frame < 214 ? (
            <div style={{background:PURPLE,color:'#fff',borderRadius:11,padding:'10px 17px',fontWeight:800,fontSize:15}}>Create invoice</div>
          ) : null}
        </div>

        {frame < 214 ? (
          <div style={{marginTop:25}}>
            {[
              ['Acme Studio', '$4,250', 'Paid'],
              ['North Labs', '$8,120', 'Sent'],
              ['Studio 24', '$3,780', 'Viewed'],
              ['Monarch', '$6,410', 'Due'],
            ].map((row, i) => (
              <div
                key={row[0]}
                style={{
                  display:'grid',
                  gridTemplateColumns:'2fr 1fr 1fr 50px',
                  padding:'20px 4px',
                  borderTop:`1px solid ${BORDER}`,
                  alignItems:'center',
                  opacity:p(frame,187+i*3,194+i*3)*(1-tableExit),
                  fontFamily:'Arial, Helvetica, sans-serif',
                }}
              >
                <div style={{fontWeight:800}}>{row[0]}</div>
                <div style={{color:MUTED}}>{row[1]}</div>
                <div style={{color:i===0?GREEN:MUTED,fontWeight:800}}>{row[2]}</div>
                <div style={{width:27,height:27,borderRadius:7,background:i%2?PURPLE_2:'#eee9ff'}} />
              </div>
            ))}
          </div>
        ) : (
          <div style={{marginTop:24}}>
            {['7 days before due','3 days before due','On due date','3 days overdue'].map((x,i)=>(
              <div key={x} style={{display:'flex',justifyContent:'space-between',padding:'18px 0',borderTop:`1px solid ${BORDER}`,opacity:p(frame,218+i*3,226+i*3)}}>
                <span style={{fontWeight:700}}>{x}</span><span style={{color:GREEN,fontWeight:800}}>Active</span>
              </div>
            ))}
          </div>
        )}
      </Panel>

      <div
        style={{
          position:'absolute',
          left:130,
          top:495,
          width:720,
          fontFamily:'Arial, Helvetica, sans-serif',
          fontSize:53,
          lineHeight:1.02,
          fontWeight:900,
          color:'rgba(255,255,255,.95)',
          letterSpacing:-2,
          opacity:reminder*(1-reminderExit),
          textShadow:'0 4px 20px rgba(88,48,128,.16)',
          translate:`${interpolate(reminder,[0,1],[-40,0])}px 0`,
        }}
      >
        Sends personalized
        <br />
        payment <span style={{color:PURPLE}}>reminders.</span>
      </div>

      <Panel
        style={{
          left:interpolate(reminder,[0,1],[850,670]),
          top:315,
          width:420,
          height:310,
          padding:26,
          opacity:p(frame,220,231)*(1-reminderExit),
          rotate:'-3deg',
        }}
      >
        <div style={{fontSize:16,color:MUTED}}>Message preview</div>
        <div style={{fontSize:19,fontWeight:800,lineHeight:1.35,marginTop:16}}>A quick reminder that your payment is due soon.</div>
        <div style={{height:42,borderRadius:10,background:'#eee9ff',marginTop:26}}/>
      </Panel>

      <div style={{position:'absolute',left:840,top:260,width:88,height:88,borderRadius:'50%',background:'linear-gradient(135deg,#ffb47b,#7a5bf6)',opacity:p(frame,217,227)*(1-reminderExit)}}/>
    </AbsoluteFill>
  );
};

const ComposeScene: React.FC<{frame: number}> = ({frame}) => {
  const q = p(frame, 252, 262);
  const exit = pi(frame, 276, 286);
  return (
    <AbsoluteFill style={{opacity: win(frame, 249, 288, 4)}}>
      <Panel
        style={{
          left:490,
          top:185,
          width:960,
          height:700,
          padding:34,
          opacity:q*(1-exit),
          scale:interpolate(q,[0,1],[0.92,1]),
          translate:`0 ${interpolate(q,[0,1],[35,0])}px`,
        }}
      >
        <div style={{fontSize:21,fontWeight:900}}>Reminder settings</div>
        <div style={{height:1,background:BORDER,margin:'24px 0'}}/>
        <div style={{fontSize:15,color:MUTED,fontWeight:700}}>Trigger schedule</div>
        <div style={{display:'flex',gap:14,marginTop:14}}>
          <div style={{width:52,height:42,borderRadius:9,background:PURPLE}}/>
          <div style={{width:52,height:42,borderRadius:9,background:'#eee9ff'}}/>
          <div style={{height:42,padding:'0 20px',display:'flex',alignItems:'center',border:`1px solid ${BORDER}`,borderRadius:9,fontWeight:700}}>days</div>
        </div>
        <div style={{height:1,background:BORDER,margin:'25px 0'}}/>
        <div style={{fontSize:15,color:MUTED,fontWeight:700}}>Message</div>
        <div style={{height:210,border:`1px solid ${BORDER}`,borderRadius:13,marginTop:12,padding:18,fontSize:18,lineHeight:1.5}}>
          Hope you're well. Just a quick reminder that the payment is due.
        </div>
      </Panel>
    </AbsoluteFill>
  );
};

const DashboardHome: React.FC = () => (
  <div style={{padding:24,fontFamily:'Arial, Helvetica, sans-serif'}}>
    <div style={{display:'flex',justifyContent:'space-between'}}>
      <div><div style={{fontSize:14,color:MUTED}}>Total invoiced</div><div style={{fontSize:34,fontWeight:900,marginTop:5}}>$31,911</div></div>
      <div style={{width:120,height:42,borderRadius:10,background:'#eee9ff'}}/>
    </div>
    <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12,marginTop:28}}>
      {[1,2,3].map(i=><div key={i} style={{height:130,borderRadius:12,background:i===1?'#f4efff':'#faf8fc',border:`1px solid ${BORDER}`}}/>)}
    </div>
  </div>
);

const DashboardChart: React.FC = () => (
  <div style={{padding:26,fontFamily:'Arial, Helvetica, sans-serif'}}>
    <div style={{fontSize:15,color:MUTED,fontWeight:700}}>Cashflow</div>
    <div style={{display:'flex',alignItems:'flex-end',gap:8,height:210,marginTop:24}}>
      {[110,155,130,178,145,190,150,205,166,218,175,230].map((h,i)=>(
        <div key={i} style={{width:18,height:h,background:i%2?GREEN:'#f15f65',borderRadius:'5px 5px 0 0',translate:`0 ${i%2?0:42}px`}}/>
      ))}
    </div>
  </div>
);

const DashboardForm: React.FC<{check?: boolean}> = ({check}) =>
  check ? (
    <div style={{height:'100%',display:'flex',alignItems:'center',justifyContent:'center',background:'linear-gradient(135deg,#f5a7d0,#fbba80,#8b75f4)',color:'#fff',fontSize:120,fontWeight:900}}>✓</div>
  ) : (
    <div style={{padding:24,fontFamily:'Arial, Helvetica, sans-serif'}}>
      <div style={{height:28,borderRadius:6,background:'#512aa9'}}/>
      <div style={{marginTop:26,fontSize:16,fontWeight:900}}>Payment reminder sent</div>
      <div style={{height:12,width:'82%',background:'#eeeaf4',borderRadius:6,marginTop:22}}/>
      <div style={{height:12,width:'66%',background:'#eeeaf4',borderRadius:6,marginTop:12}}/>
      <div style={{height:38,width:110,background:GREEN,borderRadius:8,marginTop:30}}/>
    </div>
  );

const LaptopJourney: React.FC<{frame: number}> = ({frame}) => {
  const appear = p(frame, 276, 288);
  const disappear = pi(frame, 390, 402);
  const moveToChart = pi(frame, 322, 337);
  const moveToCenter = pi(frame, 347, 359);
  const x = moveToCenter > 0
    ? interpolate(moveToCenter,[0,1],[1030,590])
    : interpolate(moveToChart,[0,1],[285,1030]);
  const y = moveToCenter > 0
    ? interpolate(moveToCenter,[0,1],[300,245])
    : interpolate(moveToChart,[0,1],[250,300]);
  const width = moveToCenter > 0
    ? interpolate(moveToCenter,[0,1],[650,760])
    : interpolate(moveToChart,[0,1],[700,650]);
  const homeOpacity = 1 - p(frame, 327, 338);
  const chartOpacity = win(frame, 327, 362, 5);
  const formOpacity = p(frame, 351, 361);
  const checkOpacity = p(frame, 378, 388);
  const autoText = win(frame, 281, 315, 5);
  const cashText = win(frame, 303, 344, 5);
  const leftChartPanel = win(frame, 326, 361, 5);

  return (
    <AbsoluteFill style={{opacity: appear * (1 - disappear)}}>
      <div
        style={{
          position:'absolute',
          left:x,
          top:y,
          width,
          opacity:appear,
          scale:interpolate(appear,[0,1],[0.76,1]),
          translate:`${interpolate(appear,[0,1],[-75,0])}px ${interpolate(appear,[0,1],[55,0])}px`,
        }}
      >
        <div style={{height:width*.59,borderRadius:'22px 22px 10px 10px',background:'#262737',padding:15,boxShadow:'0 42px 80px rgba(65,44,102,.20)'}}>
          <div style={{height:'100%',borderRadius:10,background:'#fff',overflow:'hidden',position:'relative'}}>
            <div style={{position:'absolute',inset:0,opacity:homeOpacity}}><DashboardHome/></div>
            <div style={{position:'absolute',inset:0,opacity:chartOpacity}}><DashboardChart/></div>
            <div style={{position:'absolute',inset:0,opacity:formOpacity*(1-checkOpacity)}}><DashboardForm/></div>
            <div style={{position:'absolute',inset:0,opacity:checkOpacity}}><DashboardForm check/></div>
          </div>
        </div>
        <div style={{height:24,width:width*1.13,marginLeft:-width*.065,background:'linear-gradient(180deg,#d9d8df,#aaa9b1)',borderRadius:'4px 4px 18px 18px'}}/>
      </div>

      <div style={{position:'absolute',left:1048,top:338,fontFamily:'Arial, Helvetica, sans-serif',fontSize:67,lineHeight:.95,fontWeight:900,letterSpacing:-3,color:'rgba(255,255,255,.96)',opacity:autoText}}>
        Automated
        <br/>
        <span style={{color:PURPLE}}>system.</span>
      </div>

      <Panel style={{left:1075,top:600,width:505,height:240,padding:24,opacity:win(frame,288,315,5)}}>
        <div style={{fontWeight:900}}>Aging Summary</div>
        {['Current','1–30 days','31–60 days'].map((x2,i)=><div key={x2} style={{display:'flex',justifyContent:'space-between',marginTop:17,color:MUTED}}><span>{x2}</span><span>{[12,6,2][i]}</span></div>)}
      </Panel>

      <div style={{position:'absolute',left:1050,top:330,width:640,fontFamily:'Arial, Helvetica, sans-serif',fontSize:65,lineHeight:.96,fontWeight:900,letterSpacing:-3,color:'rgba(255,255,255,.96)',opacity:cashText}}>
        Healthy cash
        <br/>
        flow <span style={{color:PURPLE}}>on track.</span>
      </div>

      <div style={{position:'absolute',left:1072,top:565,fontFamily:'Arial, Helvetica, sans-serif',color:INK,opacity:win(frame,308,343,5)}}>
        <div style={{fontSize:17,color:MUTED}}>Total invoiced (MTD)</div>
        <div style={{fontSize:49,fontWeight:900,marginTop:7}}>$571,541</div>
        <div style={{fontSize:14,color:MUTED,marginTop:7}}>+12.8% from last month</div>
      </div>

      <Panel style={{left:235,top:235,width:680,height:520,padding:22,opacity:leftChartPanel}}>
        <DashboardChart/>
      </Panel>
    </AbsoluteFill>
  );
};

const PhoneAndEcosystem: React.FC<{frame: number}> = ({frame}) => {
  const phone = p(frame, 392, 404);
  const ecosystem = p(frame, 426, 440);
  const line = p(frame, 396, 412);
  const phoneX = interpolate(ecosystem,[0,1],[770,850]);
  const phoneY = interpolate(ecosystem,[0,1],[150,635]);
  const phoneScale = interpolate(ecosystem,[0,1],[1,0.34]);

  return (
    <AbsoluteFill style={{opacity: win(frame, 390, 484, 4),fontFamily:'Arial, Helvetica, sans-serif'}}>
      <svg width="1920" height="1080" style={{position:'absolute',inset:0,opacity:1-ecosystem*.75}}>
        <path d="M405 615 C560 330 1360 300 1515 615" fill="none" stroke="rgba(119,87,246,.42)" strokeWidth="3.5" strokeDasharray="1200" strokeDashoffset={interpolate(line,[0,1],[1200,0])}/>
      </svg>

      {[{x:425,y:560,c:BLUE},{x:550,y:380,c:PINK},{x:1370,y:380,c:GREEN},{x:1490,y:570,c:PURPLE}].map((d,i)=>{
        const q=p(frame,400+i*3,408+i*3);
        const endX=[740,530,1100,835][i];
        const endY=[550,225,405,720][i];
        return <div key={i} style={{position:'absolute',left:interpolate(ecosystem,[0,1],[d.x,endX]),top:interpolate(ecosystem,[0,1],[d.y,endY]),width:54,height:54,borderRadius:14,background:d.c,boxShadow:SHADOW,opacity:q,scale:interpolate(q,[0,1],[.55,1])*interpolate(ecosystem,[0,1],[1,.78])}}/>;
      })}

      <div style={{position:'absolute',left:phoneX,top:phoneY,width:380,height:790,borderRadius:62,background:'#232331',padding:15,boxShadow:'0 40px 80px rgba(60,40,100,.23)',opacity:phone,scale:interpolate(phone,[0,1],[.74,1])*phoneScale,translate:`0 ${interpolate(phone,[0,1],[120,0])}px`}}>
        <div style={{height:'100%',borderRadius:49,background:'#fdfbff',padding:'32px 22px',fontFamily:'Arial, Helvetica, sans-serif',overflow:'hidden'}}>
          <div style={{width:118,height:28,borderRadius:20,background:'#252533',margin:'0 auto 30px'}}/>
          <div style={{textAlign:'center',fontWeight:900,fontSize:21}}>FlowPaid.</div>
          {[["Payment received","$4,730"],["Invoice paid","$8,822"],["Reminder sent","$5,648"],["Autopay ready","$1,320"]].map(([a,b],i)=>(
            <div key={a} style={{marginTop:20,padding:'15px 14px',borderRadius:15,background:'#fff',border:`1px solid ${BORDER}`,boxShadow:'0 8px 18px rgba(80,55,125,.08)',opacity:p(frame,402+i*4,410+i*4),translate:`${interpolate(p(frame,402+i*4,410+i*4),[0,1],[48,0])}px 0`}}>
              <div style={{fontSize:13,color:MUTED}}>{a}</div><div style={{fontSize:19,fontWeight:900,marginTop:4}}>{b}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{position:'absolute',left:790,top:95,fontSize:17,fontWeight:800,color:MUTED,opacity:ecosystem}}>NOVEMBER</div>

      <Panel style={{left:530,top:225,width:470,height:185,padding:24,opacity:p(frame,430,441),translate:`0 ${interpolate(p(frame,430,441),[0,1],[-34,0])}px`}}>
        <div style={{display:'flex',gap:9}}>
          {[0,1,2,3,4].map(i=><div key={i} style={{width:35,height:35,borderRadius:'50%',background:['#ffb47b','#7a64f5','#f38abe','#70cdb3','#7896ff'][i]}}/>)}
        </div>
        <div style={{marginTop:23,fontSize:15,color:MUTED}}>Team activity</div>
      </Panel>

      <Panel style={{left:375,top:470,width:420,height:210,padding:24,opacity:p(frame,433,444)}}>
        <div style={{fontSize:14,color:MUTED}}>TOTAL INVOICED</div>
        <div style={{fontSize:40,fontWeight:900,marginTop:8}}>$17,384.11</div>
        <div style={{height:12,width:'74%',borderRadius:6,background:'#eee9ff',marginTop:25}}/>
      </Panel>

      <Panel style={{left:1100,top:405,width:340,height:260,padding:22,opacity:p(frame,436,447)}}>
        <div style={{fontWeight:900}}>Tasks</div>
        {[1,2,3].map(i=><div key={i} style={{display:'flex',gap:10,alignItems:'center',marginTop:22}}><div style={{width:18,height:18,borderRadius:5,background:i===1?GREEN:'#eee9ff'}}/><div style={{height:11,width:180,borderRadius:6,background:'#ece8f2'}}/></div>)}
      </Panel>

      <Panel style={{left:835,top:720,width:530,height:210,padding:22,opacity:p(frame,439,450)}}>
        <div style={{fontSize:14,color:MUTED}}>Cashflow</div>
        <div style={{display:'flex',alignItems:'center',gap:5,height:105,marginTop:15}}>
          {[12,24,18,31,21,36,27,42,29,46,34,51,38,56,41,60,45,64].map((h,i)=><div key={i} style={{width:5,height:h,background:i%2?GREEN:PINK,borderRadius:4}}/>)}
        </div>
      </Panel>
    </AbsoluteFill>
  );
};

export const Video: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{overflow:'hidden'}}>
      <Background frame={frame}/>
      <FloatingToBrand frame={frame}/>
      <StackScene frame={frame}/>
      <NetworkJourney frame={frame}/>
      <TableToReminders frame={frame}/>
      <ComposeScene frame={frame}/>
      <LaptopJourney frame={frame}/>
      <PhoneAndEcosystem frame={frame}/>
    </AbsoluteFill>
  );
};
