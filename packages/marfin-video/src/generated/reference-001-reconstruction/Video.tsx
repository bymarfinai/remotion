import React from 'react';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const BG = '#f7f0ff';
const INK = '#20233a';
const MUTED = '#697089';
const PURPLE = '#7968ff';
const LILAC = '#cbbcff';
const PEACH = '#ffb77d';
const PINK = '#f7a8d8';
const GREEN = '#76d6b2';
const CARD = 'rgba(255,255,255,0.84)';
const BORDER = 'rgba(44,39,74,0.10)';
const SHADOW = '0 26px 70px rgba(73,52,111,0.16)';

const clamp = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
};

const ease = Easing.bezier(0.16, 1, 0.3, 1);
const soft = Easing.bezier(0.65, 0, 0.35, 1);

const enter = (frame: number, start: number, duration = 18) =>
  interpolate(frame, [start, start + duration], [0, 1], {
    ...clamp,
    easing: ease,
  });

const fadeWindow = (frame: number, start: number, end: number, fade = 10) =>
  interpolate(frame, [start, start + fade, end - fade, end], [0, 1, 1, 0], {
    ...clamp,
    easing: ease,
  });

const bgStyle = (frame: number): React.CSSProperties => ({
  background:
    'radial-gradient(circle at 19% 24%, rgba(255,183,125,.70), transparent 31%), radial-gradient(circle at 82% 18%, rgba(203,188,255,.85), transparent 36%), radial-gradient(circle at 72% 79%, rgba(247,168,216,.62), transparent 31%), linear-gradient(135deg,#fff7f0 0%,#f7f0ff 48%,#eef2ff 100%)',
  scale: 1.03 + Math.sin(frame / 42) * 0.012,
});

const Card: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({children, style}) => (
  <div
    style={{
      position: 'absolute',
      background: CARD,
      border: `1px solid ${BORDER}`,
      borderRadius: 26,
      boxShadow: SHADOW,
      backdropFilter: 'blur(12px)',
      color: INK,
      ...style,
    }}
  >
    {children}
  </div>
);

const Dot: React.FC<{x: number; y: number; color?: string; size?: number}> = ({
  x,
  y,
  color = PURPLE,
  size = 18,
}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: size,
      height: size,
      borderRadius: '50%',
      background: color,
      boxShadow: `0 0 0 10px ${color}22`,
    }}
  />
);

const PaymentChip: React.FC<{
  frame: number;
  start: number;
  x: number;
  y: number;
  rotate: number;
  label: string;
  amount: string;
  accent: string;
}> = ({frame, start, x, y, rotate, label, amount, accent}) => {
  const p = enter(frame, start, 16);
  return (
    <Card
      style={{
        left: x,
        top: y,
        width: 300,
        padding: '22px 24px',
        opacity: p,
        translate: `${interpolate(p, [0, 1], [0, 0])}px ${interpolate(
          p,
          [0, 1],
          [60, 0],
        )}px`,
        scale: interpolate(p, [0, 1], [0.8, 1]),
        rotate: `${rotate + Math.sin((frame + start) / 18) * 2}deg`,
      }}
    >
      <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: '50%',
            background: accent,
          }}
        />
        <div style={{fontSize: 17, color: MUTED, fontWeight: 700}}>{label}</div>
      </div>
      <div style={{fontSize: 30, fontWeight: 800, marginTop: 12}}>{amount}</div>
    </Card>
  );
};

const FloatingUniverse: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{...bgStyle(frame), overflow: 'hidden'}}>
      <div
        style={{
          position: 'absolute',
          left: 820,
          top: 440,
          width: 320,
          height: 320,
          borderRadius: '50%',
          background: PEACH,
          opacity: 0.9,
          translate: `${Math.sin(frame / 22) * 38}px ${Math.cos(frame / 26) * 24}px`,
        }}
      />
      <PaymentChip frame={frame} start={0} x={90} y={640} rotate={-5} label="Payment received" amount="$8,420.00" accent={GREEN} />
      <PaymentChip frame={frame} start={6} x={470} y={190} rotate={5} label="Invoice paid" amount="$2,185.60" accent={PURPLE} />
      <PaymentChip frame={frame} start={12} x={1120} y={290} rotate={-4} label="Subscription" amount="$839.00" accent={PINK} />
      <PaymentChip frame={frame} start={18} x={1450} y={680} rotate={6} label="Payout sent" amount="$4,910.20" accent={PEACH} />
      <PaymentChip frame={frame} start={24} x={650} y={760} rotate={-7} label="Autopay" amount="$1,240.00" accent={GREEN} />
      <PaymentChip frame={frame} start={30} x={1300} y={120} rotate={3} label="Reminder" amount="$620.40" accent={PURPLE} />
    </AbsoluteFill>
  );
};

const LogoScene: React.FC = () => {
  const frame = useCurrentFrame();
  const p = enter(frame, 52, 22);
  return (
    <AbsoluteFill
      style={{
        ...bgStyle(frame),
        alignItems: 'center',
        justifyContent: 'center',
        opacity: fadeWindow(frame, 48, 97, 8),
      }}
    >
      <div
        style={{
          fontFamily: 'Arial, Helvetica, sans-serif',
          fontSize: 126,
          fontWeight: 900,
          letterSpacing: -7,
          color: INK,
          opacity: p,
          scale: interpolate(p, [0, 1], [0.76, 1]),
          translate: `0 ${interpolate(p, [0, 1], [40, 0])}px`,
        }}
      >
        Flow<span style={{color: PURPLE}}>Paid</span>
      </div>
    </AbsoluteFill>
  );
};

const PaymentStack: React.FC = () => {
  const frame = useCurrentFrame();
  const p = enter(frame, 88, 18);
  return (
    <AbsoluteFill style={{...bgStyle(frame), opacity: fadeWindow(frame, 84, 155, 10)}}>
      <Card
        style={{
          left: 560,
          top: 245,
          width: 700,
          height: 470,
          padding: 38,
          opacity: p,
          translate: `${interpolate(p, [0, 1], [-90, 0])}px 0`,
          scale: interpolate(p, [0, 1], [0.92, 1]),
        }}
      >
        <div style={{fontSize: 20, color: MUTED, fontWeight: 700}}>Credit memo</div>
        <div style={{fontSize: 32, fontWeight: 900, marginTop: 10}}>$17,384.11</div>
        <div style={{height: 1, background: BORDER, margin: '28px 0'}} />
        {['Customer', 'Invoice', 'Amount', 'Status'].map((x, i) => (
          <div key={x} style={{display: 'grid', gridTemplateColumns: '1fr 1fr', marginTop: 16, fontSize: 18}}>
            <div style={{color: MUTED}}>{x}</div>
            <div style={{fontWeight: 800}}>{['Alex Rivera', '#INV-5829', '$17,384.11', 'Paid'][i]}</div>
          </div>
        ))}
      </Card>
      <Card
        style={{
          left: 1050,
          top: 190,
          width: 350,
          padding: 28,
          opacity: enter(frame, 101, 16),
          translate: `${interpolate(enter(frame, 101), [0, 1], [80, 0])}px 0`,
        }}
      >
        <div style={{display: 'flex', gap: 16, alignItems: 'center'}}>
          <div style={{width: 70, height: 70, borderRadius: '50%', background: 'linear-gradient(135deg,#ffbe8a,#8e78ff)'}} />
          <div>
            <div style={{fontSize: 18, fontWeight: 900}}>Dana Collins</div>
            <div style={{fontSize: 15, color: MUTED}}>Enterprise plan</div>
          </div>
        </div>
      </Card>
      <Card
        style={{
          left: 280,
          top: 610,
          width: 420,
          padding: 26,
          opacity: enter(frame, 112, 16),
          rotate: '-2deg',
        }}
      >
        <div style={{fontSize: 17, color: MUTED}}>Payment processed</div>
        <div style={{fontSize: 34, fontWeight: 900, marginTop: 6}}>$5,920.00</div>
      </Card>
    </AbsoluteFill>
  );
};

const NetworkScene: React.FC = () => {
  const frame = useCurrentFrame();
  const p = enter(frame, 144, 20);
  const dash = interpolate(frame, [150, 196], [260, 0], clamp);
  return (
    <AbsoluteFill style={{...bgStyle(frame), opacity: fadeWindow(frame, 142, 211, 9)}}>
      <svg width="1920" height="1080" style={{position: 'absolute', inset: 0}}>
        <path d="M390 690 C650 500 750 770 970 540 S1320 280 1550 410" fill="none" stroke="rgba(121,104,255,.45)" strokeWidth="4" strokeDasharray="260" strokeDashoffset={dash} />
      </svg>
      <Dot x={370} y={670} color={PINK} size={34} />
      <Dot x={935} y={510} color={PURPLE} size={42} />
      <Dot x={1530} y={390} color={PEACH} size={34} />
      <Card style={{left: 720, top: 430, width: 500, padding: 34, opacity: p, scale: interpolate(p, [0, 1], [0.8, 1])}}>
        <div style={{fontSize: 17, color: MUTED}}>Automatic payment</div>
        <div style={{fontSize: 42, fontWeight: 900, marginTop: 8}}>$6,541.90</div>
      </Card>
      <div style={{position: 'absolute', left: 560, top: 245, fontSize: 22, fontWeight: 800, color: MUTED, opacity: enter(frame, 165)}}>Paid on time</div>
      <div style={{position: 'absolute', right: 370, top: 640, fontSize: 22, fontWeight: 800, color: MUTED, opacity: enter(frame, 176)}}>Synced automatically</div>
    </AbsoluteFill>
  );
};

const ReminderScene: React.FC = () => {
  const frame = useCurrentFrame();
  const p = enter(frame, 204, 16);
  return (
    <AbsoluteFill style={{...bgStyle(frame), opacity: fadeWindow(frame, 202, 276, 8)}}>
      <Card style={{left: 350, top: 190, width: 1220, height: 650, padding: 36, opacity: p, scale: interpolate(p, [0, 1], [0.86, 1])}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div style={{fontSize: 27, fontWeight: 900}}>Reminder templates</div>
          <div style={{background: PURPLE, color: 'white', padding: '12px 20px', borderRadius: 12, fontSize: 16, fontWeight: 800}}>+ New reminder</div>
        </div>
        <div style={{marginTop: 34}}>
          {['7 days before due', '3 days before due', 'On due date', '3 days overdue', '7 days overdue'].map((x, i) => (
            <div key={x} style={{display: 'grid', gridTemplateColumns: '1.7fr 1fr 1fr', alignItems: 'center', padding: '22px 8px', borderBottom: `1px solid ${BORDER}`, opacity: enter(frame, 214 + i * 5)}}>
              <div style={{fontWeight: 800}}>{x}</div>
              <div style={{color: MUTED}}>Email + SMS</div>
              <div style={{color: i < 3 ? GREEN : PEACH, fontWeight: 800}}>Active</div>
            </div>
          ))}
        </div>
      </Card>
      <Card style={{left: 1020, top: 600, width: 520, padding: 28, opacity: enter(frame, 244), translate: `${interpolate(enter(frame,244),[0,1],[120,0])}px 0`}}>
        <div style={{fontSize: 17, color: MUTED}}>Message preview</div>
        <div style={{fontSize: 21, fontWeight: 800, marginTop: 12}}>Your invoice is due soon. Pay securely in one click.</div>
      </Card>
    </AbsoluteFill>
  );
};

const Laptop: React.FC<{frame: number; start: number; chart?: boolean; mail?: boolean}> = ({frame, start, chart, mail}) => {
  const p = enter(frame, start, 20);
  return (
    <div style={{position: 'absolute', left: 240, top: 245, width: 850, opacity: p, scale: interpolate(p,[0,1],[0.72,1]), translate: `${interpolate(p,[0,1],[-120,0])}px ${interpolate(p,[0,1],[60,0])}px`}}>
      <div style={{height: 500, borderRadius: '24px 24px 10px 10px', background: '#222735', padding: 18, boxShadow: '0 50px 90px rgba(42,33,78,.24)'}}>
        <div style={{height: '100%', borderRadius: 12, background: 'linear-gradient(180deg,#fff,#f7f5ff)', padding: 30}}>
          <div style={{display:'flex', gap:8, marginBottom:24}}><div style={{width:10,height:10,borderRadius:'50%',background:'#ff8c7b'}}/><div style={{width:10,height:10,borderRadius:'50%',background:'#ffc76b'}}/><div style={{width:10,height:10,borderRadius:'50%',background:'#70d39f'}}/></div>
          {mail ? (
            <div>
              <div style={{fontSize:18,color:MUTED}}>Invoice follow-up</div>
              <div style={{fontSize:28,fontWeight:900,marginTop:10}}>Payment reminder sent</div>
              <div style={{marginTop:26,height:200,borderRadius:16,background:'#f2ebff',padding:24,color:MUTED,fontSize:18,lineHeight:1.5}}>Hi Dana, your invoice is ready. Review details and pay securely from the link below.</div>
            </div>
          ) : chart ? (
            <div>
              <div style={{fontSize:20,color:MUTED}}>Cashflow</div>
              <div style={{display:'flex',alignItems:'end',gap:18,height:260,marginTop:34}}>
                {[42,58,50,72,66,84,77,92,70,88,82,96].map((v,i)=><div key={i} style={{width:32,height:`${v*2.2}px`,borderRadius:10,background:i%2?GREEN:PURPLE,opacity:.9}}/>) }
              </div>
            </div>
          ) : (
            <div>
              <div style={{fontSize:18,color:MUTED}}>Total invoiced (MTD)</div>
              <div style={{fontSize:64,fontWeight:900,marginTop:12}}>$31,911</div>
              <div style={{fontSize:18,color:GREEN,fontWeight:800,marginTop:8}}>↑ 27.33% from last month</div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16,marginTop:42}}>
                {['Paid','Pending','Overdue'].map((x,i)=><div key={x} style={{background:'#f2efff',borderRadius:16,padding:20}}><div style={{fontSize:15,color:MUTED}}>{x}</div><div style={{fontSize:26,fontWeight:900,marginTop:8}}>{['$19.2k','$9.4k','$3.3k'][i]}</div></div>)}
              </div>
            </div>
          )}
        </div>
      </div>
      <div style={{height:34,width:970,marginLeft:-60,background:'linear-gradient(180deg,#b6b9c5,#7c808c)',clipPath:'polygon(5% 0,95% 0,100% 100%,0 100%)',borderRadius:'0 0 18px 18px'}}/>
    </div>
  );
};

const LaptopScene: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{...bgStyle(frame), opacity: fadeWindow(frame, 268, 372, 8)}}>
      <Laptop frame={frame} start={270} />
      <div style={{position:'absolute',right:210,top:330,width:600,opacity:enter(frame,286),translate:`${interpolate(enter(frame,286),[0,1],[80,0])}px 0`}}>
        <div style={{fontSize:72,fontWeight:900,lineHeight:.98,letterSpacing:-4,color:INK}}>Healthy cash<br/>flow on track.</div>
        <div style={{fontSize:24,color:MUTED,marginTop:28,lineHeight:1.5}}>Automate invoicing, reminders and collections in one connected system.</div>
      </div>
    </AbsoluteFill>
  );
};

const ChartScene: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{...bgStyle(frame), opacity: fadeWindow(frame, 350, 405, 8)}}>
      <Card style={{left:220,top:230,width:640,height:420,padding:32,opacity:enter(frame,352)}}>
        <div style={{fontSize:20,fontWeight:900}}>Cashflow</div>
        <div style={{display:'flex',gap:13,alignItems:'end',height:270,marginTop:30}}>
          {[58,72,66,90,78,98,82,106,94,112,101,118].map((v,i)=><div key={i} style={{width:34,height:`${v*2}px`,borderRadius:8,background:i%3===0?PINK:i%2?GREEN:PURPLE,scale:interpolate(frame,[356+i*2,370+i*2],[0,1],clamp),transformOrigin:'bottom'}}/>)}
        </div>
      </Card>
      <Laptop frame={frame} start={360} chart />
    </AbsoluteFill>
  );
};

const MailScene: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{...bgStyle(frame), opacity: fadeWindow(frame, 394, 438, 8)}}>
      <Laptop frame={frame} start={396} mail />
      <Card style={{right:250,top:330,width:500,padding:30,opacity:enter(frame,408),translate:`${interpolate(enter(frame,408),[0,1],[80,0])}px 0`}}>
        <div style={{fontSize:18,color:MUTED}}>Automation</div>
        <div style={{fontSize:32,fontWeight:900,marginTop:8}}>Reminder sent ✓</div>
        <div style={{fontSize:18,color:MUTED,marginTop:16}}>No chasing. No manual follow-up.</div>
      </Card>
    </AbsoluteFill>
  );
};

const PhoneScene: React.FC = () => {
  const frame = useCurrentFrame();
  const p = enter(frame, 426, 18);
  const orbit = interpolate(frame,[426,484],[0,1],clamp);
  return (
    <AbsoluteFill style={{...bgStyle(frame), opacity: fadeWindow(frame, 424, 484, 5)}}>
      <svg width="1920" height="1080" style={{position:'absolute',inset:0,opacity:.55}}>
        <path d="M240 585 C580 120 1320 120 1680 585" fill="none" stroke="rgba(121,104,255,.35)" strokeWidth="3" strokeDasharray="10 14"/>
      </svg>
      <div style={{position:'absolute',left:785,top:130,width:350,height:730,borderRadius:58,background:'#202534',padding:16,boxShadow:'0 50px 100px rgba(55,40,98,.25)',opacity:p,scale:interpolate(p,[0,1],[0.72,1])}}>
        <div style={{height:'100%',borderRadius:45,background:'linear-gradient(180deg,#fff,#f7f3ff)',padding:'42px 28px'}}>
          <div style={{fontSize:20,fontWeight:900,textAlign:'center'}}>FlowPaid</div>
          <div style={{marginTop:36,fontSize:16,color:MUTED}}>Notifications</div>
          {['Invoice paid · $4,750','Payout deposited · $2,100','Reminder sent','Autopay scheduled'].map((x,i)=><div key={x} style={{marginTop:18,padding:18,borderRadius:18,background:'#f0ecff',fontSize:17,fontWeight:800,opacity:enter(frame,438+i*5)}}>{x}</div>)}
        </div>
      </div>
      {[
        {x:250,y:560,c:PINK,t:'INV'},
        {x:520,y:250,c:GREEN,t:'$'},
        {x:1360,y:240,c:PURPLE,t:'✓'},
        {x:1620,y:565,c:PEACH,t:'PDF'},
      ].map((n,i)=>{
        const local = Math.min(1, Math.max(0, orbit*1.3-i*.08));
        return <div key={i} style={{position:'absolute',left:n.x,top:n.y,width:96,height:96,borderRadius:26,background:'white',boxShadow:SHADOW,display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,fontWeight:900,color:n.c,opacity:local,translate:`0 ${interpolate(local,[0,1],[50,0])}px`,rotate:`${(i%2?-1:1)*6}deg`}}>{n.t}</div>;
      })}
      <Card style={{left:320,top:760,width:360,padding:26,opacity:enter(frame,448)}}><div style={{fontSize:16,color:MUTED}}>Revenue</div><div style={{fontSize:36,fontWeight:900,marginTop:8}}>$17,384.11</div></Card>
      <Card style={{right:300,top:720,width:420,padding:26,opacity:enter(frame,456)}}><div style={{fontSize:16,color:MUTED}}>Cashflow</div><div style={{display:'flex',gap:8,alignItems:'end',height:90,marginTop:12}}>{[30,52,44,68,58,76,64,84].map((h,i)=><div key={i} style={{width:28,height:h,borderRadius:6,background:i%2?GREEN:PURPLE}}/>)}</div></Card>
    </AbsoluteFill>
  );
};

export const Video: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  void fps;

  return (
    <AbsoluteFill style={{backgroundColor: BG, fontFamily:'Arial, Helvetica, sans-serif', overflow:'hidden'}}>
      <Sequence from={0} durationInFrames={72}><FloatingUniverse /></Sequence>
      <LogoScene />
      <PaymentStack />
      <NetworkScene />
      <ReminderScene />
      <LaptopScene />
      <ChartScene />
      <MailScene />
      <PhoneScene />
      <div style={{position:'absolute',left:48,bottom:34,fontSize:16,color:'rgba(32,35,58,.38)',fontWeight:700,letterSpacing:2,opacity:frame<470?1:0}}>REFERENCE 001 · MOTION RECONSTRUCTION</div>
    </AbsoluteFill>
  );
};
