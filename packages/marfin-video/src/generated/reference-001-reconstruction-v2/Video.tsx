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
const CARD = 'rgba(255,255,255,0.92)';
const BORDER = 'rgba(74,54,104,0.12)';
const SHADOW = '0 24px 64px rgba(85,58,130,0.15)';

const clamp = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
};
const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
const easeInOut = Easing.bezier(0.65, 0, 0.35, 1);

const p = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], {...clamp, easing: easeOut});

const win = (frame: number, start: number, end: number, fade = 8) =>
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
        'radial-gradient(ellipse at 16% 18%, rgba(255,177,110,.68) 0%, rgba(255,177,110,0) 34%), radial-gradient(ellipse at 78% 18%, rgba(145,113,255,.58) 0%, rgba(145,113,255,0) 37%), radial-gradient(ellipse at 70% 79%, rgba(247,148,202,.54) 0%, rgba(247,148,202,0) 35%), radial-gradient(ellipse at 39% 65%, rgba(120,208,255,.31) 0%, rgba(120,208,255,0) 30%), linear-gradient(135deg,#fff8f2 0%,#f7efff 48%,#fff2f8 100%)',
      scale: 1.025 + Math.sin(frame / 55) * 0.006,
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
      padding: '13px 22px',
      borderRadius: 999,
      background: 'rgba(255,255,255,.92)',
      border: `1px solid ${BORDER}`,
      boxShadow: '0 12px 35px rgba(79,54,126,.13)',
      fontFamily: 'Arial, Helvetica, sans-serif',
      color: INK,
      fontSize: 18,
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
  const q = p(frame, start, start + 13);
  const exit = interpolate(frame, [33, 49], [1, 0], {...clamp, easing: easeInOut});
  return (
    <Panel
      style={{
        left: x,
        top: y,
        width: large ? 350 : 270,
        height: large ? 110 : 88,
        padding: large ? '22px 26px' : '17px 20px',
        opacity: q * exit,
        scale: interpolate(q, [0, 1], [0.68, 1]),
        translate: `${interpolate(q, [0, 1], [0, 0])}px ${interpolate(
          q,
          [0, 1],
          [48, 0],
        )}px`,
        rotate: `${r + Math.sin((frame + start) / 15) * 1.4}deg`,
      }}
    >
      <div style={{display: 'flex', alignItems: 'center', gap: 11}}>
        <div style={{width: 13, height: 13, borderRadius: 4, background: accent}} />
        <div style={{fontSize: large ? 16 : 14, fontWeight: 700, color: MUTED}}>
          {label}
        </div>
      </div>
      <div style={{fontSize: large ? 25 : 21, fontWeight: 900, marginTop: 8}}>
        {amount}
      </div>
    </Panel>
  );
};

const FloatingScene: React.FC<{frame: number}> = ({frame}) => {
  const yellow = p(frame, 23, 38);
  return (
    <AbsoluteFill style={{opacity: win(frame, 0, 52, 4)}}>
      <div
        style={{
          position: 'absolute',
          left: -95,
          top: 755,
          width: 270,
          height: 270,
          borderRadius: '50%',
          background: '#f9b414',
          opacity: yellow,
          scale: interpolate(yellow, [0, 1], [0.5, 1]),
        }}
      />
      <MiniInvoice frame={frame} start={0} x={110} y={535} r={-3} label="Invoice sent" amount="$8,420.00" accent={GREEN} large />
      <MiniInvoice frame={frame} start={4} x={460} y={285} r={4} label="Payment received" amount="$2,185.60" accent={BLUE} />
      <MiniInvoice frame={frame} start={8} x={925} y={240} r={-4} label="New invoice" amount="$839.00" accent={PURPLE} large />
      <MiniInvoice frame={frame} start={12} x={1335} y={365} r={3} label="Reminder sent" amount="$4,910.20" accent={PEACH} />
      <MiniInvoice frame={frame} start={16} x={1365} y={665} r={-2} label="Paid" amount="$1,240.00" accent={GREEN} />
      <MiniInvoice frame={frame} start={20} x={655} y={705} r={5} label="Subscription" amount="$620.40" accent={PURPLE} />
      <div
        style={{
          position: 'absolute',
          left: 875,
          top: 510,
          width: 18,
          height: 18,
          borderRadius: '50%',
          background: ORANGE,
          opacity: p(frame, 13, 24),
          scale: 1 + Math.sin(frame / 7) * 0.18,
        }}
      />
    </AbsoluteFill>
  );
};

const LogoScene: React.FC<{frame: number}> = ({frame}) => {
  const q = p(frame, 43, 59);
  const exit = interpolate(frame, [67, 77], [1, 0], {...clamp, easing: easeInOut});
  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        opacity: win(frame, 40, 80, 5),
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          fontFamily: 'Arial, Helvetica, sans-serif',
          fontWeight: 900,
          fontSize: 112,
          letterSpacing: -6,
          color: INK,
          opacity: q * exit,
          scale: interpolate(q, [0, 1], [0.83, 1]),
        }}
      >
        Flow<span style={{color: PURPLE}}>Paid</span>
        <span style={{fontSize: 58, color: PINK}}>.</span>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 827,
          top: 385,
          width: 20,
          height: 20,
          borderRadius: 5,
          background: GREEN,
          opacity: p(frame, 61, 69),
        }}
      />
    </AbsoluteFill>
  );
};

const StackScene: React.FC<{frame: number}> = ({frame}) => {
  const q = p(frame, 72, 84);
  const exit = interpolate(frame, [91, 104], [1, 0], {...clamp, easing: easeInOut});
  return (
    <AbsoluteFill style={{opacity: win(frame, 69, 106, 5)}}>
      <Panel
        style={{
          left: 560,
          top: 255,
          width: 715,
          height: 450,
          padding: 34,
          opacity: q * exit,
          scale: interpolate(q, [0, 1], [0.88, 1]),
          translate: `${interpolate(q, [0, 1], [-85, 0])}px 0`,
        }}
      >
        <div style={{fontSize: 17, color: MUTED, fontWeight: 800}}>Credit memo</div>
        <div style={{fontSize: 30, fontWeight: 900, marginTop: 10}}>$17,384.11</div>
        <div style={{height: 1, background: BORDER, margin: '23px 0'}} />
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
              marginTop: 15,
              opacity: p(frame, 76 + i * 3, 84 + i * 3),
            }}
          >
            <div style={{fontSize: 16, color: MUTED}}>{a}</div>
            <div style={{fontSize: 17, fontWeight: 800}}>{b}</div>
          </div>
        ))}
      </Panel>
      <Panel
        style={{
          left: 1120,
          top: 210,
          width: 330,
          padding: 22,
          opacity: p(frame, 77, 88) * exit,
          translate: `${interpolate(p(frame, 77, 88), [0, 1], [75, 0])}px 0`,
        }}
      >
        <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
          <div
            style={{
              width: 68,
              height: 68,
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
          left: 430,
          top: 600,
          width: 340,
          padding: 20,
          opacity: p(frame, 80, 90) * exit,
          rotate: '-2deg',
        }}
      >
        <div style={{fontSize: 14, color: MUTED}}>Paid automatically</div>
        <div style={{fontSize: 27, fontWeight: 900, marginTop: 7}}>$17,384.11</div>
      </Panel>
      <div
        style={{
          position: 'absolute',
          right: 455,
          top: 545,
          width: 58,
          height: 58,
          borderRadius: 13,
          background: PURPLE,
          opacity: p(frame, 82, 92) * exit,
        }}
      />
    </AbsoluteFill>
  );
};

const AIPillScene: React.FC<{frame: number}> = ({frame}) => {
  const q = p(frame, 99, 108);
  const move = p(frame, 111, 126);
  return (
    <AbsoluteFill style={{opacity: win(frame, 96, 133, 5)}}>
      <Pill
        style={{
          left: interpolate(move, [0, 1], [815, 780]),
          top: interpolate(move, [0, 1], [495, 490]),
          opacity: q,
          scale: interpolate(q, [0, 1], [0.72, 1]),
          fontSize: 15,
          padding: '10px 18px',
        }}
      >
        AI-powered platform
      </Pill>
      <div
        style={{
          position: 'absolute',
          left: 936,
          top: interpolate(move, [0, 1], [565, 610]),
          width: 28,
          height: 28,
          borderRadius: 9,
          background: PURPLE,
          opacity: p(frame, 108, 118),
          rotate: `${interpolate(move, [0, 1], [0, 16])}deg`,
        }}
      />
    </AbsoluteFill>
  );
};

const Avatar: React.FC<{x: number; y: number; color: string; size?: number}> = ({
  x,
  y,
  color,
  size = 54,
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
      border: '5px solid rgba(255,255,255,.94)',
      boxShadow: '0 12px 30px rgba(73,50,118,.18)',
    }}
  />
);

const NetworkScene: React.FC<{frame: number}> = ({frame}) => {
  const q = p(frame, 118, 132);
  const orbit = p(frame, 126, 148);
  const exit = interpolate(frame, [167, 181], [1, 0], {...clamp, easing: easeInOut});
  const dash = interpolate(frame, [122, 157], [720, 0], clamp);
  return (
    <AbsoluteFill style={{opacity: win(frame, 115, 183, 5)}}>
      <svg width="1920" height="1080" style={{position: 'absolute', inset: 0}}>
        <path
          d="M665 615 C720 360 1010 290 1250 430 C1480 565 1320 760 1070 725 C860 696 660 650 665 615"
          fill="none"
          stroke="rgba(119,87,246,.46)"
          strokeWidth="4"
          strokeDasharray="720"
          strokeDashoffset={dash}
        />
      </svg>
      <Pill
        style={{
          left: 800,
          top: 500,
          opacity: q * exit,
          scale: interpolate(q, [0, 1], [0.72, 1]),
        }}
      >
        Built for teams · scalable
      </Pill>
      <Avatar x={585 + interpolate(orbit, [0, 1], [70, 0])} y={590} color="linear-gradient(135deg,#ffb47b,#f074b8)" />
      <Avatar x={890} y={288 + interpolate(orbit, [0, 1], [70, 0])} color="linear-gradient(135deg,#6b82ff,#9d78ff)" />
      <Avatar x={1290} y={385} color="linear-gradient(135deg,#72d9b7,#6086ff)" />
      <Avatar x={1330} y={685} color="linear-gradient(135deg,#f1a770,#7c68f4)" />
      <Avatar x={810} y={735} color="linear-gradient(135deg,#f2a5cd,#8a6cf6)" />
      <div style={{position:'absolute', left:710, top:425, width:38, height:38, borderRadius:'50%', background:PURPLE, opacity:p(frame,131,141)*exit}} />
      <div style={{position:'absolute', left:1170, top:710, width:42, height:42, borderRadius:'50%', background:INK, opacity:p(frame,135,145)*exit}} />
      <div style={{position:'absolute', left:1420, top:510, width:30, height:30, borderRadius:'9px', background:GREEN, opacity:p(frame,140,150)*exit}} />
    </AbsoluteFill>
  );
};

const ReadyScene: React.FC<{frame: number}> = ({frame}) => {
  const q = p(frame, 171, 179);
  return (
    <AbsoluteFill style={{opacity: win(frame, 168, 192, 4)}}>
      <Pill
        style={{
          left: 770,
          top: 500,
          opacity: q,
          scale: interpolate(q, [0, 1], [0.82, 1]),
          fontSize: 16,
        }}
      >
        Ready to send · instantly
      </Pill>
    </AbsoluteFill>
  );
};

const TableScene: React.FC<{frame: number}> = ({frame}) => {
  const q = p(frame, 183, 194);
  const exit = interpolate(frame, [218, 229], [1, 0], {...clamp, easing: easeInOut});
  return (
    <AbsoluteFill style={{opacity: win(frame, 180, 231, 4)}}>
      <Panel
        style={{
          left: 365,
          top: 260,
          width: 1190,
          height: 520,
          padding: 34,
          opacity: q * exit,
          scale: interpolate(q, [0, 1], [0.73, 1]),
          translate: `0 ${interpolate(q, [0, 1], [55, 0])}px`,
        }}
      >
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div style={{fontSize:23,fontWeight:900}}>Invoices</div>
          <div style={{background:PURPLE,color:'#fff',borderRadius:11,padding:'11px 18px',fontWeight:800,fontSize:15}}>Create invoice</div>
        </div>
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
                opacity:p(frame,190+i*4,198+i*4),
                fontFamily:'Arial, Helvetica, sans-serif',
              }}
            >
              <div style={{fontWeight:800}}>{row[0]}</div>
              <div style={{color:MUTED}}>{row[1]}</div>
              <div style={{color:i===0?GREEN:MUTED,fontWeight:800}}>{row[2]}</div>
              <div style={{width:28,height:28,borderRadius:7,background:i%2?PURPLE_2:'#eee9ff'}} />
            </div>
          ))}
        </div>
      </Panel>
    </AbsoluteFill>
  );
};

const ReminderScene: React.FC<{frame: number}> = ({frame}) => {
  const q = p(frame, 219, 230);
  const exit = interpolate(frame, [257, 270], [1, 0], {...clamp, easing: easeInOut});
  return (
    <AbsoluteFill style={{opacity: win(frame, 216, 272, 5)}}>
      <div
        style={{
          position:'absolute',
          left:130,
          top:495,
          width:760,
          fontFamily:'Arial, Helvetica, sans-serif',
          fontSize:54,
          lineHeight:1.02,
          fontWeight:900,
          color:'rgba(255,255,255,.95)',
          letterSpacing:-2,
          opacity:q*exit,
          textShadow:'0 4px 22px rgba(88,48,128,.16)',
        }}
      >
        Sends personalized
        <br />
        payment <span style={{color:PURPLE}}>reminders.</span>
      </div>
      <Panel style={{left:900,top:230,width:620,height:470,padding:30,opacity:q*exit}}>
        <div style={{fontWeight:900,fontSize:22}}>Reminder templates</div>
        {['7 days before due','3 days before due','On due date','3 days overdue'].map((x,i)=>(
          <div key={x} style={{display:'flex',justifyContent:'space-between',padding:'18px 0',borderTop:`1px solid ${BORDER}`,marginTop:i===0?22:0,opacity:p(frame,224+i*4,232+i*4)}}>
            <span style={{fontWeight:700}}>{x}</span><span style={{color:GREEN,fontWeight:800}}>Active</span>
          </div>
        ))}
      </Panel>
      <Panel style={{left:670,top:315,width:420,height:310,padding:26,opacity:p(frame,226,236)*exit,rotate:'-3deg'}}>
        <div style={{fontSize:16,color:MUTED}}>Message preview</div>
        <div style={{fontSize:19,fontWeight:800,lineHeight:1.35,marginTop:16}}>A quick reminder that your payment is due soon.</div>
        <div style={{height:42,borderRadius:10,background:'#eee9ff',marginTop:26}}/>
      </Panel>
      <div style={{position:'absolute',left:840,top:260,width:90,height:90,borderRadius:'50%',background:'linear-gradient(135deg,#ffb47b,#7a5bf6)',opacity:p(frame,223,234)*exit}}/>
    </AbsoluteFill>
  );
};

const ComposeScene: React.FC<{frame:number}> = ({frame}) => {
  const q=p(frame,258,268);
  const exit=interpolate(frame,[275,284],[1,0],{...clamp,easing:easeInOut});
  return (
    <AbsoluteFill style={{opacity:win(frame,255,286,4)}}>
      <Panel style={{left:490,top:185,width:960,height:700,padding:34,opacity:q*exit,scale:interpolate(q,[0,1],[.9,1])}}>
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

const LaptopShell: React.FC<{
  frame:number;
  start:number;
  x?:number;
  y?:number;
  width?:number;
  children?:React.ReactNode;
  opacity?:number;
}> = ({frame,start,x=350,y=230,width=720,children,opacity=1}) => {
  const q=p(frame,start,start+12);
  return (
    <div style={{position:'absolute',left:x,top:y,width,opacity:q*opacity,scale:interpolate(q,[0,1],[.72,1]),translate:`${interpolate(q,[0,1],[-80,0])}px ${interpolate(q,[0,1],[65,0])}px`}}>
      <div style={{height:width*.59,borderRadius:'22px 22px 10px 10px',background:'#262737',padding:15,boxShadow:'0 42px 80px rgba(65,44,102,.20)'}}>
        <div style={{height:'100%',borderRadius:10,background:'#fff',overflow:'hidden'}}>{children}</div>
      </div>
      <div style={{height:24,width:width*1.13,marginLeft:-width*.065,background:'linear-gradient(180deg,#d9d8df,#aaa9b1)',borderRadius:'4px 4px 18px 18px'}}/>
    </div>
  );
};

const DashboardScreen: React.FC<{chart?:boolean; check?:boolean; form?:boolean}> = ({chart,check,form}) => {
  if(check){
    return <div style={{height:'100%',display:'flex',alignItems:'center',justifyContent:'center',background:'linear-gradient(135deg,#f5a7d0,#fbba80,#8b75f4)',color:'#fff',fontSize:120,fontWeight:900}}>✓</div>;
  }
  if(form){
    return <div style={{padding:24,fontFamily:'Arial, Helvetica, sans-serif'}}>
      <div style={{height:28,borderRadius:6,background:'#512aa9'}}/>
      <div style={{marginTop:26,fontSize:16,fontWeight:900}}>Payment reminder sent</div>
      <div style={{height:12,width:'82%',background:'#eeeaf4',borderRadius:6,marginTop:22}}/>
      <div style={{height:12,width:'66%',background:'#eeeaf4',borderRadius:6,marginTop:12}}/>
      <div style={{height:38,width:110,background:GREEN,borderRadius:8,marginTop:30}}/>
    </div>;
  }
  if(chart){
    return <div style={{padding:26,fontFamily:'Arial, Helvetica, sans-serif'}}>
      <div style={{fontSize:15,color:MUTED,fontWeight:700}}>Cashflow</div>
      <div style={{display:'flex',alignItems:'flex-end',gap:8,height:210,marginTop:24}}>
        {[110,155,130,178,145,190,150,205,166,218,175,230].map((h,i)=>(
          <div key={i} style={{width:18,height:h,background:i%2?GREEN:'#f15f65',borderRadius:'5px 5px 0 0',translate:`0 ${i%2?0:42}px`}}/>
        ))}
      </div>
    </div>;
  }
  return <div style={{padding:24,fontFamily:'Arial, Helvetica, sans-serif'}}>
    <div style={{display:'flex',justifyContent:'space-between'}}>
      <div><div style={{fontSize:14,color:MUTED}}>Total invoiced</div><div style={{fontSize:34,fontWeight:900,marginTop:5}}>$31,911</div></div>
      <div style={{width:120,height:42,borderRadius:10,background:'#eee9ff'}}/>
    </div>
    <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12,marginTop:28}}>
      {[1,2,3].map(i=><div key={i} style={{height:130,borderRadius:12,background:i===1?'#f4efff':'#faf8fc',border:`1px solid ${BORDER}`}}/> )}
    </div>
  </div>;
};

const AutomatedScene: React.FC<{frame:number}> = ({frame}) => {
  const exit=interpolate(frame,[303,314],[1,0],{...clamp,easing:easeInOut});
  return (
    <AbsoluteFill style={{opacity:win(frame,276,316,5)}}>
      <LaptopShell frame={frame} start={278} x={305} y={255} width={700} opacity={exit}>
        <DashboardScreen/>
      </LaptopShell>
      <div style={{position:'absolute',left:1055,top:340,fontFamily:'Arial, Helvetica, sans-serif',fontSize:68,lineHeight:.95,fontWeight:900,letterSpacing:-3,color:'rgba(255,255,255,.96)',opacity:p(frame,286,298)*exit}}>
        Automated
        <br/>
        <span style={{color:PURPLE}}>system.</span>
      </div>
      <Panel style={{left:1080,top:600,width:510,height:245,padding:24,opacity:p(frame,291,302)*exit}}>
        <div style={{fontWeight:900}}>Aging Summary</div>
        {['Current','1–30 days','31–60 days'].map((x,i)=><div key={x} style={{display:'flex',justifyContent:'space-between',marginTop:17,color:MUTED}}><span>{x}</span><span>{[12,6,2][i]}</span></div>)}
      </Panel>
    </AbsoluteFill>
  );
};

const CashflowScene: React.FC<{frame:number}> = ({frame}) => {
  const q=p(frame,304,315);
  const exit=interpolate(frame,[329,342],[1,0],{...clamp,easing:easeInOut});
  return (
    <AbsoluteFill style={{opacity:win(frame,301,345,5)}}>
      <LaptopShell frame={frame} start={303} x={260} y={250} width={720} opacity={exit}>
        <DashboardScreen/>
      </LaptopShell>
      <div style={{position:'absolute',left:1060,top:330,width:630,fontFamily:'Arial, Helvetica, sans-serif',fontSize:65,lineHeight:.96,fontWeight:900,letterSpacing:-3,color:'rgba(255,255,255,.96)',opacity:q*exit}}>
        Healthy cash
        <br/>
        flow <span style={{color:PURPLE}}>on track.</span>
      </div>
      <div style={{position:'absolute',left:1080,top:565,fontFamily:'Arial, Helvetica, sans-serif',color:INK,opacity:p(frame,311,322)*exit}}>
        <div style={{fontSize:17,color:MUTED}}>Total invoiced (MTD)</div>
        <div style={{fontSize:49,fontWeight:900,marginTop:7}}>$571,541</div>
        <div style={{fontSize:14,color:MUTED,marginTop:7}}>+12.8% from last month</div>
      </div>
    </AbsoluteFill>
  );
};

const ChartScene: React.FC<{frame:number}> = ({frame}) => {
  const q=p(frame,330,340);
  const exit=interpolate(frame,[350,362],[1,0],{...clamp,easing:easeInOut});
  return (
    <AbsoluteFill style={{opacity:win(frame,327,365,5)}}>
      <Panel style={{left:235,top:235,width:680,height:520,padding:22,opacity:q*exit}}>
        <DashboardScreen chart/>
      </Panel>
      <LaptopShell frame={frame} start={332} x={1030} y={300} width={650} opacity={exit}>
        <DashboardScreen/>
      </LaptopShell>
    </AbsoluteFill>
  );
};

const BrowserScene: React.FC<{frame:number}> = ({frame}) => {
  const check=p(frame,379,390);
  const exit=interpolate(frame,[391,400],[1,0],{...clamp,easing:easeInOut});
  return (
    <AbsoluteFill style={{opacity:win(frame,352,402,5)}}>
      <LaptopShell frame={frame} start={353} x={590} y={245} width={760} opacity={exit}>
        {check>.78?<DashboardScreen check/>:<DashboardScreen form/>}
      </LaptopShell>
    </AbsoluteFill>
  );
};

const PhoneShell:React.FC<{frame:number}> = ({frame})=>{
  const q=p(frame,399,412);
  const shrink=p(frame,426,439);
  return (
    <div style={{position:'absolute',left:interpolate(shrink,[0,1],[770,825]),top:interpolate(shrink,[0,1],[150,600]),width:380,height:790,borderRadius:62,background:'#232331',padding:15,boxShadow:'0 40px 80px rgba(60,40,100,.23)',opacity:1-shrink*.65,scale:interpolate(q,[0,1],[.72,1])*interpolate(shrink,[0,1],[1,.38]),translate:`0 ${interpolate(q,[0,1],[130,0])}px`}}>
      <div style={{height:'100%',borderRadius:49,background:'#fdfbff',padding:'32px 22px',fontFamily:'Arial, Helvetica, sans-serif',overflow:'hidden'}}>
        <div style={{width:118,height:28,borderRadius:20,background:'#252533',margin:'0 auto 30px'}}/>
        <div style={{textAlign:'center',fontWeight:900,fontSize:21}}>FlowPaid.</div>
        {[["Payment received","$4,730"],["Invoice paid","$8,822"],["Reminder sent","$5,648"],["Autopay ready","$1,320"]].map(([a,b],i)=>(
          <div key={a} style={{marginTop:20,padding:'15px 14px',borderRadius:15,background:'#fff',border:`1px solid ${BORDER}`,boxShadow:'0 8px 18px rgba(80,55,125,.08)',opacity:p(frame,405+i*4,413+i*4),translate:`${interpolate(p(frame,405+i*4,413+i*4),[0,1],[55,0])}px 0`}}>
            <div style={{fontSize:13,color:MUTED}}>{a}</div><div style={{fontSize:19,fontWeight:900,marginTop:4}}>{b}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PhoneScene:React.FC<{frame:number}> = ({frame})=>{
  const line=p(frame,394,410);
  const exit=interpolate(frame,[431,440],[1,0],{...clamp,easing:easeInOut});
  return (
    <AbsoluteFill style={{opacity:win(frame,392,443,5)}}>
      <svg width="1920" height="1080" style={{position:'absolute',inset:0,opacity:exit}}>
        <path d="M410 610 C560 330 1360 300 1510 615" fill="none" stroke="rgba(119,87,246,.42)" strokeWidth="4" strokeDasharray="1200" strokeDashoffset={interpolate(line,[0,1],[1200,0])}/>
      </svg>
      <PhoneShell frame={frame}/>
      {[{x:425,y:560,c:BLUE},{x:550,y:380,c:PINK},{x:1370,y:380,c:GREEN},{x:1490,y:570,c:PURPLE}].map((d,i)=>(
        <div key={i} style={{position:'absolute',left:d.x,top:d.y,width:54,height:54,borderRadius:14,background:d.c,boxShadow:SHADOW,opacity:p(frame,402+i*3,411+i*3)*exit,scale:interpolate(p(frame,402+i*3,411+i*3),[0,1],[.5,1])}}/>
      ))}
    </AbsoluteFill>
  );
};

const EcosystemScene:React.FC<{frame:number}> = ({frame})=>{
  const q=p(frame,430,444);
  return (
    <AbsoluteFill style={{opacity:win(frame,428,484,5),fontFamily:'Arial, Helvetica, sans-serif'}}>
      <div style={{position:'absolute',left:790,top:95,fontSize:17,fontWeight:800,color:MUTED,opacity:q}}>NOVEMBER</div>
      <Panel style={{left:530,top:225,width:470,height:185,padding:24,opacity:p(frame,432,444),translate:`0 ${interpolate(p(frame,432,444),[0,1],[-40,0])}px`}}>
        <div style={{display:'flex',gap:9}}>
          {[0,1,2,3,4].map(i=><div key={i} style={{width:35,height:35,borderRadius:'50%',background:['#ffb47b','#7a64f5','#f38abe','#70cdb3','#7896ff'][i]}}/> )}
        </div>
        <div style={{marginTop:23,fontSize:15,color:MUTED}}>Team activity</div>
      </Panel>
      <Panel style={{left:375,top:470,width:420,height:210,padding:24,opacity:p(frame,435,447)}}>
        <div style={{fontSize:14,color:MUTED}}>TOTAL INVOICED</div>
        <div style={{fontSize:40,fontWeight:900,marginTop:8}}>$17,384.11</div>
        <div style={{height:12,width:'74%',borderRadius:6,background:'#eee9ff',marginTop:25}}/>
      </Panel>
      <Panel style={{left:1100,top:405,width:340,height:260,padding:22,opacity:p(frame,438,450)}}>
        <div style={{fontWeight:900}}>Tasks</div>
        {[1,2,3].map(i=><div key={i} style={{display:'flex',gap:10,alignItems:'center',marginTop:22}}><div style={{width:18,height:18,borderRadius:5,background:i===1?GREEN:'#eee9ff'}}/><div style={{height:11,width:180,borderRadius:6,background:'#ece8f2'}}/></div>)}
      </Panel>
      <Panel style={{left:835,top:720,width:530,height:210,padding:22,opacity:p(frame,441,453)}}>
        <div style={{fontSize:14,color:MUTED}}>Cashflow</div>
        <div style={{display:'flex',alignItems:'center',gap:5,height:105,marginTop:15}}>
          {[12,24,18,31,21,36,27,42,29,46,34,51,38,56,41,60,45,64].map((h,i)=><div key={i} style={{width:5,height:h,background:i%2?GREEN:PINK,borderRadius:4}}/> )}
        </div>
      </Panel>
      <div style={{position:'absolute',left:740,top:550,width:66,height:66,borderRadius:'50%',background:'linear-gradient(135deg,#ffb25f,#f07acb,#7d63f6)',opacity:p(frame,443,455)}}/>
      <div style={{position:'absolute',left:1000,top:320,width:42,height:42,borderRadius:10,background:BLUE,opacity:p(frame,445,457)}}/>
    </AbsoluteFill>
  );
};

export const Video:React.FC=()=>{
  const frame=useCurrentFrame();
  return (
    <AbsoluteFill style={{overflow:'hidden'}}>
      <Background frame={frame}/>
      <FloatingScene frame={frame}/>
      <LogoScene frame={frame}/>
      <StackScene frame={frame}/>
      <AIPillScene frame={frame}/>
      <NetworkScene frame={frame}/>
      <ReadyScene frame={frame}/>
      <TableScene frame={frame}/>
      <ReminderScene frame={frame}/>
      <ComposeScene frame={frame}/>
      <AutomatedScene frame={frame}/>
      <CashflowScene frame={frame}/>
      <ChartScene frame={frame}/>
      <BrowserScene frame={frame}/>
      <PhoneScene frame={frame}/>
      <EcosystemScene frame={frame}/>
    </AbsoluteFill>
  );
};
