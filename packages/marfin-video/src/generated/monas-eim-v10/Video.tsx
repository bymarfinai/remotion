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
const BLUE = '#2E63F1';
const SOFT = '#E9EEF5';
const PAPER = '#F8F6F1';
const OUTER = '#0B233F';
const MUTED = '#4B6E99';

const MONAS = staticFile('generated/monas-eim-v10/monas-full.webp');
const FLAME_TOP = staticFile('generated/monas-eim-v10/monas-flame-top.webp');
const CLOUD = staticFile('generated/monas-eim-v10/cloud-soft.webp');
const SKYLINE = staticFile('generated/monas-eim-v10/jakarta-skyline.webp');
const CROWD = staticFile('generated/monas-eim-v10/people-crowd.webp');
const CITY_CIRCLE = staticFile('generated/monas-eim-v10/city-circle-visual.webp');
const MEETING = staticFile('generated/monas-eim-v10/meeting-point-visual.webp');

const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};
const ease = Easing.bezier(0.16, 1, 0.3, 1);
const fade = (f:number,a:number,b:number) => interpolate(f,[a,b],[0,1],{...clamp,easing:ease});
const rise = (f:number,a:number,b:number,px=22) => interpolate(f,[a,b],[px,0],{...clamp,easing:ease});
const sceneOpacity = (f:number,a:number,b:number) => interpolate(f,[a,a+4,b-4,b],[0,1,1,0],clamp);

const Header: React.FC<{page:string}> = ({page}) => (
  <>
    <div style={{position:'absolute',left:54,top:50,fontSize:17,fontWeight:900,letterSpacing:'.16em',lineHeight:1.1,color:NAVY,zIndex:50}}>
      JAKARTA<br/>INDONESIA
    </div>
    <div style={{position:'absolute',left:'50%',top:72,width:60,height:3,borderRadius:99,transform:'translateX(-50%)',background:NAVY,zIndex:50}}/>
    <div style={{position:'absolute',right:54,top:52,fontSize:16,fontWeight:900,letterSpacing:'.14em',color:NAVY,zIndex:50}}>{page}</div>
  </>
);

const Footer: React.FC = () => (
  <div style={{position:'absolute',left:56,bottom:44,fontSize:14,fontWeight:900,letterSpacing:'.16em',color:NAVY,zIndex:50}}>MONAS / JAKARTA</div>
);

const Big: React.FC<{children:React.ReactNode; top:number; left?:number; size:number; color?:string; width?:number; opacity?:number; y?:number; lineHeight?:number;}> =
({children, top, left=54, size, color=BLUE, width=900, opacity=1, y=0, lineHeight=.84}) => (
  <div style={{position:'absolute',top,left,width,fontFamily:'Arial Narrow, Arial, sans-serif',fontSize:size,fontWeight:950,letterSpacing:'-.055em',lineHeight,color,opacity,transform:`translateY(${y}px)`,zIndex:30}}>{children}</div>
);

const Body: React.FC<{children:React.ReactNode; top:number; left?:number; size?:number; width?:number; weight?:number; opacity?:number; y?:number;}> =
({children, top, left=56, size=34, width=500, weight=650, opacity=1, y=0}) => (
  <div style={{position:'absolute',top,left,width,fontSize:size,fontWeight:weight,lineHeight:1.0,color:NAVY,opacity,transform:`translateY(${y}px)`,zIndex:30}}>{children}</div>
);

export const MonasEIMV10: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s1 = sceneOpacity(frame,0,42);
  const s2 = sceneOpacity(frame,38,84);
  const s3 = sceneOpacity(frame,80,124);
  const s4 = sceneOpacity(frame,120,166);
  const s5 = sceneOpacity(frame,162,210);
  const s6 = sceneOpacity(frame,206,252);
  const s7 = interpolate(frame,[248,258],[0,1],clamp);

  const hero2 = spring({frame:frame-50,fps,config:{damping:18,stiffness:160,mass:.72}});
  const crowdIn = spring({frame:frame-176,fps,config:{damping:20,stiffness:145,mass:.8}});
  const hero7 = spring({frame:frame-262,fps,config:{damping:18,stiffness:150,mass:.75}});

  return (
    <AbsoluteFill style={{background:OUTER,overflow:'hidden',fontFamily:'Arial, Helvetica, sans-serif'}}>
      <div style={{position:'absolute',left:22,right:22,top:22,bottom:22,background:PAPER,border:`2px solid ${NAVY}`,borderRadius:28,overflow:'hidden'}}>

        <AbsoluteFill style={{opacity:s1}}>
          <Header page="01 / 07"/>
          <Body top={200} size={56} width={580} opacity={fade(frame,4,12)} y={rise(frame,4,12)}>What<br/>makes a city<br/>truly</Body>
          <Big top={420} size={126} width={720} opacity={fade(frame,12,22)} y={rise(frame,12,22,24)}>ICONIC?</Big>
          <Body top={1060} left={58} size={24} width={180} weight={700} opacity={fade(frame,22,30)}>More than<br/>buildings,<br/>it&apos;s what people<br/>remember.</Body>
          <div style={{position:'absolute',right:-8,bottom:54,width:465,height:465,borderRadius:999,background:SOFT,overflow:'hidden',opacity:fade(frame,16,28),zIndex:10}}>
            <Img src={CITY_CIRCLE} style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',transform:`translateY(${rise(frame,18,30,18)}px) scale(1.02)`,opacity:fade(frame,18,30)}}/>
          </div>
          <div style={{position:'absolute',left:54,bottom:98,width:56,height:3,borderRadius:99,background:BLUE,opacity:fade(frame,26,34),zIndex:30}}/>
          <Footer/>
        </AbsoluteFill>

        <AbsoluteFill style={{opacity:s2}}>
          <Header page="02 / 07"/>
          <Body top={162} size={56} width={120} opacity={fade(frame,42,48)} y={rise(frame,42,48)}>A</Body>
          <Big top={215} size={112} width={700} opacity={fade(frame,46,56)} y={rise(frame,46,56)}>SYMBOL</Big>
          <Body top={342} size={50} width={360} opacity={fade(frame,54,64)} y={rise(frame,54,64)}>can hold<br/>a whole city.</Body>
          <div style={{position:'absolute',left:330,top:620,width:430,height:430,borderRadius:999,background:BLUE,opacity:hero2,zIndex:8}}/>
          <Img src={CLOUD} style={{position:'absolute',left:610,top:760,width:220,opacity:fade(frame,60,72)*.45,zIndex:9}}/>
          <Img src={MONAS} style={{position:'absolute',height:1100,left:340,top:430,opacity:hero2,transform:`translateY(${(1-hero2)*120}px) scale(${0.96+hero2*0.04})`,transformOrigin:'50% 86%',zIndex:12}}/>
          <div style={{position:'absolute',left:66,top:1370,fontSize:18,lineHeight:1.6,fontWeight:900,letterSpacing:'.14em',color:MUTED,opacity:fade(frame,62,72),zIndex:20}}>
            <div>PEOPLE</div><div>HISTORY</div><div>IDENTITY</div><div>TOMORROW</div>
          </div>
          <Footer/>
        </AbsoluteFill>

        <AbsoluteFill style={{opacity:s3}}>
          <Header page="03 / 07"/>
          <Body top={245} size={50} width={280} opacity={fade(frame,84,92)} y={rise(frame,84,92)}>It brings<br/>together</Body>
          <Big top={448} size={84} width={380} opacity={fade(frame,90,100)} y={rise(frame,90,100)}>PLACE</Big>
          <Big top={560} size={84} width={430} opacity={fade(frame,95,105)} y={rise(frame,95,105)}>PEOPLE</Big>
          <Big top={672} size={84} width={470} opacity={fade(frame,100,110)} y={rise(frame,100,110)}>PURPOSE</Big>

          <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{position:'absolute',inset:0,zIndex:10}}>
            <path d="M710 280 C850 470 860 690 820 930 C770 1180 680 1400 520 1650" fill="none" stroke={BLUE} strokeWidth="3" strokeLinecap="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1-fade(frame,96,112)}/>
          </svg>

          {[
            {x:756,y:520,label:'PLACE',sub:'A CAPITAL\nCITY',d:102},
            {x:812,y:890,label:'PEOPLE',sub:'A SHARED\nSTORY',d:108},
            {x:690,y:1470,label:'PURPOSE',sub:'A BRIGHTER\nTOMORROW',d:114},
          ].map((n)=>{
            const p = spring({frame:frame-n.d,fps,config:{damping:18,stiffness:190,mass:.5}});
            return <div key={n.label} style={{position:'absolute',left:n.x,top:n.y,opacity:p,transform:`scale(${p})`,zIndex:25}}>
              <div style={{width:24,height:24,borderRadius:99,background:BLUE,border:`4px solid ${PAPER}`,boxShadow:`0 0 0 1px ${BLUE}`}}/>
              <div style={{position:'absolute',left:36,top:-2,fontSize:18,fontWeight:950,letterSpacing:'.08em',color:NAVY,lineHeight:1}}>
                {n.label}
                <div style={{marginTop:8,whiteSpace:'pre-line',fontSize:14,fontWeight:700,letterSpacing:'.06em',lineHeight:1.05,color:MUTED}}>{n.sub}</div>
              </div>
            </div>
          })}

          <div style={{position:'absolute',left:54,bottom:98,width:56,height:3,borderRadius:99,background:BLUE,zIndex:30}}/>
          <Footer/>
        </AbsoluteFill>

        <AbsoluteFill style={{opacity:s4}}>
          <Header page="04 / 07"/>
          <Body top={220} size={62} width={430} opacity={fade(frame,124,134)} y={rise(frame,124,134)}>Standing<br/>across<br/>generations.</Body>

          <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{position:'absolute',inset:0,zIndex:10}}>
            <path d="M140 930 C290 840 430 915 560 860 C700 800 820 860 940 740" fill="none" stroke={BLUE} strokeWidth="4" strokeLinecap="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1-fade(frame,132,148)}/>
          </svg>
          {[
            {x:148,y:928,t:'1961',d:140},
            {x:420,y:890,t:'1975',d:145},
            {x:676,y:834,t:'1998',d:150},
            {x:930,y:736,t:'TODAY',d:155},
          ].map((n,i)=>{
            const p=spring({frame:frame-n.d,fps,config:{damping:18,stiffness:190,mass:.5}});
            return <React.Fragment key={n.t}>
              <div style={{position:'absolute',left:n.x-9,top:n.y-9,width:18,height:18,borderRadius:99,background:i===3?BLUE:NAVY,transform:`scale(${p})`,zIndex:20}}/>
              <div style={{position:'absolute',left:n.x-26,top:n.y+(i===3?-48:24),fontSize:16,fontWeight:900,color:NAVY,opacity:fade(frame,n.d,n.d+6),zIndex:20}}>{n.t}</div>
            </React.Fragment>
          })}

          <div style={{position:'absolute',right:-90,bottom:-10,width:430,height:430,borderRadius:999,background:SOFT,opacity:fade(frame,142,154),zIndex:6}}/>
          <Img src={FLAME_TOP} style={{position:'absolute',right:18,bottom:76,width:330,opacity:fade(frame,145,158),transform:`translateY(${rise(frame,145,158,48)}px)`,zIndex:12}}/>

          <div style={{position:'absolute',left:66,bottom:190,fontSize:18,lineHeight:1.55,fontWeight:900,letterSpacing:'.14em',color:MUTED,opacity:fade(frame,146,156),zIndex:20}}>
            <div>SAME</div><div>CITY</div><div>NEW</div><div>STORIES</div>
          </div>
          <div style={{position:'absolute',left:54,bottom:98,width:56,height:3,borderRadius:99,background:BLUE,zIndex:30}}/>
          <Footer/>
        </AbsoluteFill>

        <AbsoluteFill style={{opacity:s5}}>
          <Header page="05 / 07"/>
          <Body top={220} size={56} width={460} opacity={fade(frame,166,176)} y={rise(frame,166,176)}>It&apos;s more than<br/>a monument.</Body>
          <Big top={430} size={96} width={640} opacity={fade(frame,176,186)} y={rise(frame,176,186)}>IT’S A</Big>
          <Big top={542} size={96} width={640} opacity={fade(frame,181,191)} y={rise(frame,181,191)}>MEETING</Big>
          <Big top={654} size={96} width={640} opacity={fade(frame,186,196)} y={rise(frame,186,196)}>POINT.</Big>
          <div style={{position:'absolute',left:0,right:0,bottom:0,height:760,overflow:'hidden',opacity:crowdIn,zIndex:8}}>
            <Img src={MEETING} style={{position:'absolute',left:0,bottom:0,width:'100%',height:'100%',objectFit:'cover',transform:`translateY(${(1-crowdIn)*80}px) scale(1.02)`}}/>
          </div>
          <div style={{position:'absolute',left:62,bottom:132,fontSize:16,fontWeight:900,letterSpacing:'.14em',lineHeight:1.55,color:NAVY,opacity:fade(frame,192,202),zIndex:20}}>
            <div>DIFFERENT</div><div>PEOPLE</div><div>SAME HORIZON</div>
          </div>
          <Footer/>
        </AbsoluteFill>

        <AbsoluteFill style={{opacity:s6}}>
          <Header page="06 / 07"/>
          <Body top={195} size={52} width={120} opacity={fade(frame,210,217)} y={rise(frame,210,217)}>At</Body>
          <Big top={270} size={108} width={640} opacity={fade(frame,215,226)} y={rise(frame,215,226)}>132</Big>
          <Big top={372} size={108} width={780} opacity={fade(frame,220,231)} y={rise(frame,220,231)}>METERS</Big>
          <Body top={575} size={22} width={220} opacity={fade(frame,224,234)}>Monas stands<br/>as a reminder<br/>of how far<br/>we can go,<br/>together.</Body>
          <Img src={MONAS} style={{position:'absolute',height:860,left:380,bottom:100,opacity:fade(frame,219,232),transform:`translateY(${rise(frame,219,232,48)}px)`,zIndex:12}}/>
          <Img src={CLOUD} style={{position:'absolute',left:76,bottom:310,width:230,opacity:fade(frame,226,238)*.26,zIndex:8}}/>
          <div style={{position:'absolute',right:128,top:620,width:2,height:560*fade(frame,228,243),background:BLUE,zIndex:16}}/>
          <div style={{position:'absolute',right:121,top:614,width:14,height:14,borderRadius:99,background:BLUE,opacity:fade(frame,228,235),zIndex:18}}/>
          <div style={{position:'absolute',right:121,top:1170,width:14,height:14,borderRadius:99,background:BLUE,opacity:fade(frame,238,246),zIndex:18}}/>
          <div style={{position:'absolute',right:46,top:1128,fontSize:15,fontWeight:900,letterSpacing:'.08em',lineHeight:1.05,color:NAVY,opacity:fade(frame,238,247),zIndex:18}}>132 M<br/>HEIGHT</div>
          <div style={{position:'absolute',left:54,bottom:98,width:56,height:3,borderRadius:99,background:BLUE,zIndex:30}}/>
          <Footer/>
        </AbsoluteFill>

        <AbsoluteFill style={{opacity:s7}}>
          <Header page="07 / 07"/>
          <Body top={210} size={50} width={360} opacity={fade(frame,252,262)} y={rise(frame,252,262)}>A symbol today.<br/>A stronger<br/>tomorrow.</Body>
          <Big top={470} size={106} width={600} opacity={fade(frame,262,272)} y={rise(frame,262,272)}>JAKARTA</Big>
          <Big top={588} size={106} width={520} opacity={fade(frame,267,277)} y={rise(frame,267,277)}>KEEPS</Big>
          <Big top={706} size={106} width={620} opacity={fade(frame,272,282)} y={rise(frame,272,282)}>MOVING</Big>
          <div style={{position:'absolute',right:-70,bottom:120,width:430,height:430,borderRadius:999,background:BLUE,opacity:hero7,overflow:'hidden',zIndex:6}}>
            <Img src={CLOUD} style={{position:'absolute',left:-30,bottom:40,width:300,opacity:.32}}/>
          </div>
          <Img src={MONAS} style={{position:'absolute',height:860,right:-20,bottom:8,opacity:hero7,transform:`translateX(${(1-hero7)*72}px)`,zIndex:12}}/>
          <div style={{position:'absolute',left:62,bottom:160,fontSize:18,lineHeight:1.55,fontWeight:900,letterSpacing:'.14em',color:MUTED,opacity:fade(frame,282,292),zIndex:20}}><div>PEOPLE</div><div>PLACES</div><div>POSSIBILITIES</div></div>
          <div style={{position:'absolute',left:54,bottom:98,width:56,height:3,borderRadius:99,background:BLUE,zIndex:30}}/>
          <Footer/>
        </AbsoluteFill>
      </div>
    </AbsoluteFill>
  );
};