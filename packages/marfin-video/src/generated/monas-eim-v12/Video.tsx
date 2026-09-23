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

const NAVY = '#163B6E';
const BLUE = '#2F62F1';
const PAPER = '#F7F4EC';
const OUTER = '#0B223D';
const PALE = '#E5ECF5';
const MUTED = '#55749A';

const SCENE1 = staticFile('generated/monas-eim-v12/scene1-city.webp');
const SCENE2 = staticFile('generated/monas-eim-v12/scene2-hero.webp');
const SCENE4 = staticFile('generated/monas-eim-v12/scene4-hero.webp');
const SCENE5 = staticFile('generated/monas-eim-v12/scene5-hero.webp');
const SCENE7 = staticFile('generated/monas-eim-v12/scene7-hero.webp');
const MONAS = staticFile('generated/monas-eim-v12/monas-full.webp');
const CLOUD = staticFile('generated/monas-eim-v12/cloud-soft.webp');

const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};
const ease = Easing.bezier(0.16, 1, 0.3, 1);
const p = (f:number,a:number,b:number) => interpolate(f,[a,b],[0,1],{...clamp,easing:ease});
const slide = (f:number,a:number,b:number,d=26) => interpolate(f,[a,b],[d,0],{...clamp,easing:ease});
const scene = (f:number,a:number,b:number) => interpolate(f,[a,a+4,b-4,b],[0,1,1,0],clamp);

const Header: React.FC<{page:string}> = ({page}) => (
  <>
    <div style={{position:'absolute',left:54,top:47,fontSize:17,fontWeight:900,letterSpacing:'.17em',lineHeight:1.12,color:NAVY,zIndex:50}}>
      JAKARTA<br/>INDONESIA
    </div>
    <div style={{position:'absolute',left:'50%',top:72,width:58,height:3,borderRadius:99,background:NAVY,transform:'translateX(-50%)',zIndex:50}}/>
    <div style={{position:'absolute',right:54,top:50,fontSize:16,fontWeight:900,letterSpacing:'.14em',color:NAVY,zIndex:50}}>{page}</div>
  </>
);

const Footer: React.FC = () => (
  <>
    <div style={{position:'absolute',left:54,bottom:72,width:54,height:3,borderRadius:99,background:BLUE,zIndex:50}}/>
    <div style={{position:'absolute',left:54,bottom:40,fontSize:13,fontWeight:900,letterSpacing:'.18em',color:NAVY,zIndex:50}}>MONAS / JAKARTA</div>
  </>
);

const Text: React.FC<{children:React.ReactNode;left:number;top:number;width:number;size:number;weight?:number;color?:string;lineHeight?:number;letter?:string;opacity?:number;y?:number}> =
({children,left,top,width,size,weight=700,color=NAVY,lineHeight=.98,letter='-.035em',opacity=1,y=0}) => (
  <div style={{
    position:'absolute',left,top,width,fontFamily:'Arial Narrow, Arial, Helvetica, sans-serif',
    fontSize:size,fontWeight,letterSpacing:letter,lineHeight,color,opacity,
    transform:`translateY(${y}px)`,zIndex:30
  }}>{children}</div>
);

const Scene1: React.FC = () => {
  const f=useCurrentFrame();
  return <AbsoluteFill>
    <Header page="01 / 07"/>
    <Text left={74} top={270} width={620} size={82} opacity={p(f,4,12)} y={slide(f,4,12,24)}>
      What<br/>makes a city<br/>truly
    </Text>
    <Text left={72} top={610} width={760} size={166} weight={950} color={BLUE} lineHeight={.82} opacity={p(f,12,23)} y={slide(f,12,23,28)}>
      ICONIC?
    </Text>
    <Text left={86} top={1250} width={250} size={28} weight={650} letter="-.015em" lineHeight={1.0} opacity={p(f,23,31)}>
      More than<br/>buildings,<br/>it&apos;s what people<br/>remember.
    </Text>
    <div style={{position:'absolute',right:-2,bottom:20,width:610,height:730,overflow:'hidden',opacity:p(f,16,29),transform:`translateX(${slide(f,16,29,44)}px)`,zIndex:10}}>
      <Img src={SCENE1} style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'center'}}/>
    </div>
    <Footer/>
  </AbsoluteFill>;
};

const Scene2: React.FC = () => {
  const f=useCurrentFrame();
  const {fps}=useVideoConfig();
  const hero=spring({frame:f-12,fps,config:{damping:18,stiffness:150,mass:.75}});
  return <AbsoluteFill>
    <Header page="02 / 07"/>
    <Text left={76} top={170} width={120} size={68} opacity={p(f,2,8)} y={slide(f,2,8,18)}>A</Text>
    <Text left={74} top={235} width={760} size={160} weight={950} color={BLUE} lineHeight={.82} opacity={p(f,6,16)} y={slide(f,6,16,26)}>SYMBOL</Text>
    <Text left={78} top={390} width={430} size={54} weight={650} lineHeight={.94} opacity={p(f,12,20)} y={slide(f,12,20,18)}>can hold<br/>a whole city.</Text>
    <div style={{position:'absolute',right:-6,top:525,width:760,height:1390,opacity:hero,transform:`translateX(${(1-hero)*60}px) scale(${.98+hero*.02})`,zIndex:10}}>
      <Img src={SCENE2} style={{width:'100%',height:'100%',objectFit:'contain',objectPosition:'right top'}}/>
    </div>
    <div style={{position:'absolute',left:78,top:1430,fontSize:20,lineHeight:1.78,fontWeight:900,letterSpacing:'.14em',color:MUTED,opacity:p(f,18,28),zIndex:20}}>
      <div>PEOPLE</div><div>HISTORY</div><div>IDENTITY</div><div>TOMORROW</div>
    </div>
    <Footer/>
  </AbsoluteFill>;
};

const Scene3: React.FC = () => {
  const f=useCurrentFrame();
  const {fps}=useVideoConfig();
  const nodes=[
    {x:754,y:425,label:'PLACE',sub:'A CAPITAL\nCITY',d:17},
    {x:820,y:920,label:'PEOPLE',sub:'A SHARED\nSTORY',d:23},
    {x:700,y:1470,label:'PURPOSE',sub:'A BRIGHTER\nTOMORROW',d:29},
  ];
  return <AbsoluteFill>
    <Header page="03 / 07"/>
    <Text left={72} top={260} width={330} size={60} weight={700} lineHeight={.95} opacity={p(f,2,10)} y={slide(f,2,10,18)}>It brings<br/>together</Text>
    <Text left={72} top={455} width={430} size={112} weight={950} color={BLUE} lineHeight={.84} opacity={p(f,8,17)} y={slide(f,8,17,18)}>PLACE</Text>
    <Text left={72} top={595} width={470} size={112} weight={950} color={BLUE} lineHeight={.84} opacity={p(f,12,21)} y={slide(f,12,21,18)}>PEOPLE</Text>
    <Text left={72} top={735} width={520} size={112} weight={950} color={BLUE} lineHeight={.84} opacity={p(f,16,25)} y={slide(f,16,25,18)}>PURPOSE</Text>
    <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{position:'absolute',inset:0,zIndex:12}}>
      <path d="M640 255 C845 470 850 725 815 930 C770 1185 685 1410 495 1668" fill="none" stroke={BLUE} strokeWidth="4" strokeLinecap="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1-p(f,12,31)}/>
    </svg>
    {nodes.map((n)=>{
      const s=spring({frame:f-n.d,fps,config:{damping:18,stiffness:190,mass:.5}});
      return <div key={n.label} style={{position:'absolute',left:n.x,top:n.y,opacity:s,transform:`scale(${s})`,zIndex:25}}>
        <div style={{width:34,height:34,borderRadius:999,background:BLUE,border:`5px solid ${PAPER}`,boxShadow:`0 0 0 2px ${BLUE}`}}/>
        <div style={{position:'absolute',left:50,top:-2,width:210,fontSize:23,fontWeight:950,letterSpacing:'.08em',lineHeight:1,color:NAVY}}>
          {n.label}
          <div style={{marginTop:10,whiteSpace:'pre-line',fontSize:18,fontWeight:700,letterSpacing:'.08em',lineHeight:1.08,color:MUTED}}>{n.sub}</div>
        </div>
      </div>;
    })}
    <Footer/>
  </AbsoluteFill>;
};

const Scene4: React.FC = () => {
  const f=useCurrentFrame();
  const {fps}=useVideoConfig();
  const years=[
    {x:165,y:925,t:'1961',d:17},
    {x:455,y:900,t:'1975',d:21},
    {x:675,y:815,t:'1998',d:25},
    {x:932,y:685,t:'TODAY',d:29},
  ];
  return <AbsoluteFill>
    <Header page="04 / 07"/>
    <Text left={76} top={260} width={620} size={74} weight={700} lineHeight={.93} opacity={p(f,3,12)} y={slide(f,3,12,20)}>Standing<br/>across<br/>generations.</Text>
    <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{position:'absolute',inset:0,zIndex:12}}>
      <path d="M165 930 C330 830 430 935 560 860 C700 778 815 838 930 690" fill="none" stroke={BLUE} strokeWidth="4" strokeLinecap="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1-p(f,12,29)}/>
    </svg>
    {years.map((n)=>{
      const s=spring({frame:f-n.d,fps,config:{damping:18,stiffness:190,mass:.5}});
      return <React.Fragment key={n.t}>
        <div style={{position:'absolute',left:n.x-11,top:n.y-11,width:22,height:22,borderRadius:99,background:BLUE,transform:`scale(${s})`,zIndex:20}}/>
        <div style={{position:'absolute',left:n.x-40,top:n.y+(n.t==='TODAY'?-55:30),fontSize:18,fontWeight:900,color:NAVY,opacity:p(f,n.d,n.d+6),zIndex:20}}>{n.t}</div>
      </React.Fragment>;
    })}
    <div style={{position:'absolute',right:-4,bottom:-8,width:610,height:880,overflow:'hidden',opacity:p(f,18,32),transform:`translateY(${slide(f,18,32,44)}px)`,zIndex:9}}>
      <Img src={SCENE4} style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'right bottom'}}/>
    </div>
    <div style={{position:'absolute',left:76,bottom:230,fontSize:20,lineHeight:1.65,fontWeight:900,letterSpacing:'.14em',color:MUTED,opacity:p(f,23,32),zIndex:20}}>
      <div>SAME</div><div>CITY</div><div>NEW</div><div>STORIES</div>
    </div>
    <Footer/>
  </AbsoluteFill>;
};

const Scene5: React.FC = () => {
  const f=useCurrentFrame();
  return <AbsoluteFill>
    <Header page="05 / 07"/>
    <Text left={90} top={255} width={600} size={64} weight={700} lineHeight={.96} opacity={p(f,3,11)} y={slide(f,3,11,20)}>It&apos;s more than<br/>a monument.</Text>
    <Text left={88} top={430} width={650} size={124} weight={950} color={BLUE} lineHeight={.82} opacity={p(f,10,18)} y={slide(f,10,18,24)}>IT’S A</Text>
    <Text left={88} top={560} width={650} size={124} weight={950} color={BLUE} lineHeight={.82} opacity={p(f,14,22)} y={slide(f,14,22,24)}>MEETING</Text>
    <Text left={88} top={690} width={650} size={124} weight={950} color={BLUE} lineHeight={.82} opacity={p(f,18,26)} y={slide(f,18,26,24)}>POINT.</Text>
    <div style={{position:'absolute',left:0,right:0,bottom:0,height:970,overflow:'hidden',opacity:p(f,15,28),transform:`translateY(${slide(f,15,28,52)}px)`,zIndex:8}}>
      <Img src={SCENE5} style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'center bottom'}}/>
    </div>
    <div style={{position:'absolute',left:92,bottom:145,fontSize:20,fontWeight:900,letterSpacing:'.14em',lineHeight:1.55,color:NAVY,opacity:p(f,25,34),zIndex:25}}>
      <div>DIFFERENT</div><div>PEOPLE</div><div>SAME HORIZON</div>
    </div>
    <Footer/>
  </AbsoluteFill>;
};

const Scene6: React.FC = () => {
  const f=useCurrentFrame();
  const {fps}=useVideoConfig();
  const mon=spring({frame:f-12,fps,config:{damping:20,stiffness:150,mass:.75}});
  return <AbsoluteFill>
    <Header page="06 / 07"/>
    <Text left={82} top={245} width={130} size={60} weight={700} opacity={p(f,2,8)} y={slide(f,2,8,16)}>At</Text>
    <Text left={80} top={340} width={390} size={154} weight={950} color={BLUE} lineHeight={.8} opacity={p(f,7,16)} y={slide(f,7,16,22)}>132</Text>
    <Text left={405} top={370} width={520} size={112} weight={950} color={BLUE} lineHeight={.82} opacity={p(f,10,19)} y={slide(f,10,19,22)}>METERS</Text>
    <Text left={84} top={650} width={300} size={42} weight={650} lineHeight={.98} letter="-.02em" opacity={p(f,15,24)}>Monas stands<br/>as a reminder<br/>of how far<br/>we can go,<br/>together.</Text>
    <Img src={CLOUD} style={{position:'absolute',left:125,bottom:330,width:310,opacity:p(f,20,30)*.25,zIndex:8}}/>
    <Img src={MONAS} style={{position:'absolute',height:1030,left:405,bottom:80,opacity:mon,transform:`translateY(${(1-mon)*90}px)`,zIndex:12}}/>
    <div style={{position:'absolute',right:150,top:690,width:3,height:720*p(f,20,34),background:BLUE,zIndex:18}}/>
    <div style={{position:'absolute',right:140,top:680,width:22,height:22,borderRadius:99,background:BLUE,opacity:p(f,20,26),zIndex:20}}/>
    <div style={{position:'absolute',right:140,top:1390,width:22,height:22,borderRadius:99,background:BLUE,opacity:p(f,29,35),zIndex:20}}/>
    <div style={{position:'absolute',right:48,top:1230,fontSize:26,fontWeight:950,lineHeight:1.05,color:NAVY,opacity:p(f,27,34),zIndex:20}}>132 M<br/><span style={{fontSize:19,letterSpacing:'.12em'}}>HEIGHT</span></div>
    <Footer/>
  </AbsoluteFill>;
};

const Scene7: React.FC = () => {
  const f=useCurrentFrame();
  return <AbsoluteFill>
    <Header page="07 / 07"/>
    <Text left={85} top={260} width={440} size={57} weight={700} lineHeight={.95} opacity={p(f,2,10)} y={slide(f,2,10,18)}>A symbol today.<br/>A stronger<br/>tomorrow.</Text>
    <Text left={83} top={515} width={620} size={128} weight={950} color={NAVY} lineHeight={.83} opacity={p(f,9,18)} y={slide(f,9,18,22)}>JAKARTA</Text>
    <Text left={83} top={655} width={560} size={128} weight={950} color={NAVY} lineHeight={.83} opacity={p(f,13,22)} y={slide(f,13,22,22)}>KEEPS</Text>
    <Text left={83} top={795} width={650} size={128} weight={950} color={NAVY} lineHeight={.83} opacity={p(f,17,26)} y={slide(f,17,26,22)}>MOVING</Text>
    <div style={{position:'absolute',right:-12,bottom:-8,width:585,height:890,overflow:'hidden',opacity:p(f,14,29),transform:`translateX(${slide(f,14,29,50)}px)`,zIndex:9}}>
      <Img src={SCENE7} style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'right bottom'}}/>
    </div>
    <div style={{position:'absolute',left:84,bottom:220,fontSize:20,lineHeight:1.65,fontWeight:900,letterSpacing:'.14em',color:MUTED,opacity:p(f,25,34),zIndex:20}}>
      <div>PEOPLE</div><div>PLACES</div><div>POSSIBILITIES</div>
    </div>
    <Footer/>
  </AbsoluteFill>;
};

export const MonasEIMV12: React.FC = () => {
  const f=useCurrentFrame();
  const s1=scene(f,0,43);
  const s2=scene(f,39,86);
  const s3=scene(f,82,128);
  const s4=scene(f,124,170);
  const s5=scene(f,166,214);
  const s6=scene(f,210,256);
  const s7=interpolate(f,[252,260],[0,1],clamp);
  return <AbsoluteFill style={{background:OUTER,fontFamily:'Arial, Helvetica, sans-serif'}}>
    <div style={{position:'absolute',left:22,right:22,top:22,bottom:22,background:PAPER,border:`2px solid ${NAVY}`,borderRadius:30,overflow:'hidden'}}>
      <AbsoluteFill style={{opacity:s1}}><Scene1/></AbsoluteFill>
      <AbsoluteFill style={{opacity:s2}}><Scene2/></AbsoluteFill>
      <AbsoluteFill style={{opacity:s3}}><Scene3/></AbsoluteFill>
      <AbsoluteFill style={{opacity:s4}}><Scene4/></AbsoluteFill>
      <AbsoluteFill style={{opacity:s5}}><Scene5/></AbsoluteFill>
      <AbsoluteFill style={{opacity:s6}}><Scene6/></AbsoluteFill>
      <AbsoluteFill style={{opacity:s7}}><Scene7/></AbsoluteFill>
    </div>
  </AbsoluteFill>;
};