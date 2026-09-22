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

const NAVY = '#0F3A73';
const BLUE = '#125BFF';
const PALE = '#DCE8F7';
const PAPER = '#FFFDF6';
const OUTER = '#072A4D';
const MUTED = '#28558D';

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

const reveal = (f:number,a:number,b:number) =>
  interpolate(f,[a,b],[0,1],{...clamp,easing:ease});

const rise = (f:number,a:number,b:number,px=26) =>
  interpolate(f,[a,b],[px,0],{...clamp,easing:ease});

const scale = (f:number,a:number,b:number,from=.94,to=1) =>
  interpolate(f,[a,b],[from,to],{...clamp,easing:ease});

const sceneOpacity = (f:number,a:number,b:number) =>
  interpolate(f,[a,a+4,b-4,b],[0,1,1,0],clamp);

const Header: React.FC<{page:string}> = ({page}) => (
  <>
    <div style={{
      position:'absolute',left:58,top:52,
      fontSize:19,fontWeight:900,letterSpacing:'.16em',
      color:NAVY,lineHeight:1.15,zIndex:90,
    }}>
      JAKARTA<br/>INDONESIA
    </div>
    <div style={{
      position:'absolute',left:'50%',top:73,width:78,height:4,
      borderRadius:999,background:NAVY,transform:'translateX(-50%)',zIndex:90,
    }}/>
    <div style={{
      position:'absolute',right:58,top:55,
      fontSize:19,fontWeight:900,letterSpacing:'.14em',color:NAVY,zIndex:90,
    }}>
      {page}
    </div>
  </>
);

const Footer: React.FC = () => (
  <div style={{
    position:'absolute',left:62,bottom:48,
    fontSize:16,fontWeight:900,letterSpacing:'.18em',
    color:NAVY,zIndex:90,
  }}>
    MONAS / JAKARTA
  </div>
);

const Key: React.FC<{
  children:React.ReactNode;
  left?:number;
  top:number;
  size:number;
  color?:string;
  width?:number;
  opacity?:number;
  y?:number;
}> = ({children,left=58,top,size,color=NAVY,width=930,opacity=1,y=0}) => (
  <div style={{
    position:'absolute',left,top,width,
    fontFamily:'Arial Narrow, Impact, sans-serif',
    fontSize:size,lineHeight:.86,fontWeight:950,
    letterSpacing:'-.045em',color,opacity,
    transform:`translateY(${y}px)`,
    zIndex:30,
  }}>
    {children}
  </div>
);

const Copy: React.FC<{
  children:React.ReactNode;
  left?:number;
  top:number;
  size?:number;
  width?:number;
  weight?:number;
  opacity?:number;
  y?:number;
}> = ({children,left=62,top,size=34,width=520,weight=600,opacity=1,y=0}) => (
  <div style={{
    position:'absolute',left,top,width,
    fontFamily:'Arial, Helvetica, sans-serif',
    fontSize:size,lineHeight:1.02,fontWeight:weight,
    color:NAVY,opacity,
    transform:`translateY(${y}px)`,
    zIndex:32,
  }}>
    {children}
  </div>
);

const SmallStack: React.FC<{items:string[];left:number;top:number;opacity:number}> =
({items,left,top,opacity}) => (
  <div style={{
    position:'absolute',left,top,
    fontSize:19,lineHeight:1.65,fontWeight:900,
    letterSpacing:'.15em',color:MUTED,opacity,zIndex:40,
  }}>
    {items.map((x)=><div key={x}>{x}</div>)}
  </div>
);

export const MonasEIMV9: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const s1 = sceneOpacity(frame,0,42);
  const s2 = sceneOpacity(frame,38,84);
  const s3 = sceneOpacity(frame,80,124);
  const s4 = sceneOpacity(frame,120,166);
  const s5 = sceneOpacity(frame,162,210);
  const s6 = sceneOpacity(frame,206,252);
  const s7 = interpolate(frame,[248,258],[0,1],clamp);

  const hero2 = spring({
    frame:frame-48,fps,
    config:{damping:18,stiffness:165,mass:.72},
  });

  const crowd = spring({
    frame:frame-174,fps,
    config:{damping:20,stiffness:145,mass:.8},
  });

  const finalHero = spring({
    frame:frame-262,fps,
    config:{damping:18,stiffness:150,mass:.75},
  });

  return (
    <AbsoluteFill style={{background:OUTER,overflow:'hidden'}}>
      <div style={{
        position:'absolute',
        left:14,right:14,top:14,bottom:14,
        borderRadius:38,
        background:PAPER,
        border:`3px solid ${NAVY}`,
        overflow:'hidden',
      }}>

        {/* 01 */}
        <AbsoluteFill style={{opacity:s1}}>
          <Header page="01 / 07"/>

          <Copy
            top={200}
            size={61}
            width={600}
            weight={650}
            opacity={reveal(frame,4,12)}
            y={rise(frame,4,12,24)}
          >
            What makes a city
          </Copy>

          <Copy
            top={275}
            size={58}
            width={340}
            weight={650}
            opacity={reveal(frame,10,17)}
            y={rise(frame,10,17,18)}
          >
            truly
          </Copy>

          <Key
            top={360}
            size={166}
            color={BLUE}
            opacity={reveal(frame,15,24)}
            y={rise(frame,15,24,24)}
          >
            ICONIC?
          </Key>

          <Copy
            top={1030}
            left={62}
            size={28}
            width={255}
            weight={650}
            opacity={reveal(frame,25,34)}
          >
            More than buildings,<br/>
            it&apos;s what people<br/>
            remember.
          </Copy>

          <div style={{
            position:'absolute',
            right:-34,bottom:82,
            width:650,height:650,borderRadius:999,
            background:PALE,overflow:'hidden',
            opacity:reveal(frame,18,29),
            transform:`scale(${scale(frame,18,29,.86)})`,
            zIndex:10,
          }}>
            <Img src={CITY} style={{
              position:'absolute',
              width:'100%',height:'100%',objectFit:'cover',
              transform:`translateY(${rise(frame,22,33,34)}px) scale(1.05)`,
              opacity:reveal(frame,22,33),
            }}/>
          </div>

          <div style={{
            position:'absolute',left:62,bottom:105,
            width:72,height:4,borderRadius:99,background:BLUE,
            opacity:reveal(frame,28,36),
          }}/>
          <Footer/>
        </AbsoluteFill>

        {/* 02 */}
        <AbsoluteFill style={{opacity:s2}}>
          <Header page="02 / 07"/>

          <Copy top={160} size={72} width={120}
            opacity={reveal(frame,42,49)} y={rise(frame,42,49,18)}>
            A
          </Copy>

          <Key
            top={230}
            size={165}
            color={BLUE}
            opacity={reveal(frame,47,58)}
            y={rise(frame,47,58,22)}
          >
            SYMBOL
          </Key>

          <Copy
            top={385}
            size={55}
            width={470}
            weight={650}
            opacity={reveal(frame,55,65)}
            y={rise(frame,55,65,18)}
          >
            can hold<br/>a whole city.
          </Copy>

          <div style={{
            position:'absolute',
            left:310,top:615,
            width:660,height:660,borderRadius:999,
            background:BLUE,
            opacity:hero2,
            transform:`scale(${hero2})`,
            zIndex:7,
          }}/>

          <Img src={CLOUD} style={{
            position:'absolute',right:40,top:890,width:410,
            opacity:reveal(frame,59,70)*.42,zIndex:8,
          }}/>

          <Img src={MONAS} style={{
            position:'absolute',
            height:1260,
            right:92,
            top:505,
            opacity:hero2,
            transformOrigin:'50% 88%',
            transform:`translateY(${(1-hero2)*170}px) scale(${.95+hero2*.05})`,
            zIndex:12,
          }}/>

          <SmallStack
            items={['PEOPLE','HISTORY','IDENTITY','TOMORROW']}
            left={70}
            top={1395}
            opacity={reveal(frame,63,74)}
          />
          <Footer/>
        </AbsoluteFill>

        {/* 03 */}
        <AbsoluteFill style={{opacity:s3}}>
          <Header page="03 / 07"/>

          <Copy
            top={255}
            size={55}
            width={340}
            weight={650}
            opacity={reveal(frame,84,92)}
            y={rise(frame,84,92,18)}
          >
            It brings<br/>together
          </Copy>

          {['PLACE','PEOPLE','PURPOSE'].map((word,i)=>(
            <Key
              key={word}
              top={445+i*150}
              size={118}
              color={BLUE}
              width={470}
              opacity={reveal(frame,90+i*5,100+i*5)}
              y={rise(frame,90+i*5,100+i*5,18)}
            >
              {word}
            </Key>
          ))}

          <svg
            width="1080" height="1920"
            viewBox="0 0 1080 1920"
            style={{position:'absolute',inset:0,zIndex:10}}
          >
            <path
              d="M640 270 C820 430 845 700 780 945 C720 1170 610 1410 380 1685"
              fill="none"
              stroke={BLUE}
              strokeWidth="4"
              strokeLinecap="round"
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset={1-reveal(frame,96,114)}
            />
          </svg>

          {[
            {x:760,y:500,label:'PLACE',sub:'A CAPITAL CITY',d:103},
            {x:830,y:1010,label:'PEOPLE',sub:'A SHARED STORY',d:110},
            {x:650,y:1480,label:'PURPOSE',sub:'A BRIGHTER TOMORROW',d:117},
          ].map((n)=>{
            const p=spring({
              frame:frame-n.d,fps,
              config:{damping:18,stiffness:190,mass:.5}
            });
            return (
              <div key={n.label} style={{
                position:'absolute',left:n.x,top:n.y,zIndex:25,
                opacity:p,transform:`scale(${p})`,
              }}>
                <div style={{
                  width:32,height:32,borderRadius:99,
                  background:BLUE,border:`4px solid ${PAPER}`,
                  boxShadow:`0 0 0 2px ${BLUE}`,
                }}/>
                <div style={{
                  position:'absolute',left:50,top:-2,width:210,
                  fontSize:23,fontWeight:950,letterSpacing:'.08em',
                  color:NAVY,lineHeight:1,
                }}>
                  {n.label}
                  <div style={{
                    marginTop:10,fontSize:18,fontWeight:700,
                    letterSpacing:'.08em',lineHeight:1.15,color:MUTED,
                  }}>
                    {n.sub}
                  </div>
                </div>
              </div>
            );
          })}

          <div style={{
            position:'absolute',left:62,bottom:102,
            width:72,height:4,borderRadius:99,background:BLUE,
          }}/>
        </AbsoluteFill>

        {/* 04 */}
        <AbsoluteFill style={{opacity:s4}}>
          <Header page="04 / 07"/>

          <Copy
            top={255}
            size={78}
            width={590}
            weight={650}
            opacity={reveal(frame,124,134)}
            y={rise(frame,124,134,22)}
          >
            Standing<br/>across<br/>generations.
          </Copy>

          <svg
            width="1080" height="1920"
            viewBox="0 0 1080 1920"
            style={{position:'absolute',inset:0,zIndex:10}}
          >
            <path
              d="M120 915 C330 800 445 890 560 825 C690 750 800 805 965 650"
              fill="none"
              stroke={BLUE}
              strokeWidth="4"
              strokeLinecap="round"
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset={1-reveal(frame,132,149)}
            />
          </svg>

          {[
            {x:130,y:910,t:'1961',d:140},
            {x:430,y:860,t:'1975',d:145},
            {x:680,y:770,t:'1998',d:150},
            {x:950,y:650,t:'TODAY',d:155},
          ].map((n,i)=>{
            const p=spring({
              frame:frame-n.d,fps,
              config:{damping:18,stiffness:185,mass:.5}
            });
            return (
              <React.Fragment key={n.t}>
                <div style={{
                  position:'absolute',left:n.x-10,top:n.y-10,
                  width:20,height:20,borderRadius:99,
                  background:i===3?BLUE:NAVY,
                  transform:`scale(${p})`,zIndex:18,
                }}/>
                <div style={{
                  position:'absolute',left:n.x-42,top:n.y+(i===3?-50:30),
                  fontSize:21,fontWeight:900,color:NAVY,
                  opacity:reveal(frame,n.d,n.d+7),zIndex:18,
                }}>
                  {n.t}
                </div>
              </React.Fragment>
            );
          })}

          <div style={{
            position:'absolute',
            right:-120,bottom:-40,
            width:680,height:680,borderRadius:999,
            background:PALE,
            opacity:reveal(frame,142,153),
            zIndex:6,
          }}/>

          <Img src={FLAME} style={{
            position:'absolute',
            width:540,
            right:-18,
            bottom:0,
            opacity:reveal(frame,145,158),
            transform:`translateY(${rise(frame,145,158,60)}px)`,
            zIndex:12,
          }}/>

          <SmallStack
            items={['SAME','CITY','NEW','STORIES']}
            left={70}
            top={1450}
            opacity={reveal(frame,145,156)}
          />

          <div style={{
            position:'absolute',left:70,bottom:95,
            width:72,height:4,background:BLUE,borderRadius:99,
          }}/>
        </AbsoluteFill>

        {/* 05 */}
        <AbsoluteFill style={{opacity:s5}}>
          <Header page="05 / 07"/>

          <Copy
            top={220}
            size={62}
            width={650}
            weight={650}
            opacity={reveal(frame,166,176)}
            y={rise(frame,166,176,20)}
          >
            It&apos;s more than<br/>a monument.
          </Copy>

          {['IT’S A','MEETING','POINT.'].map((word,i)=>(
            <Key
              key={word}
              top={440+i*155}
              size={142}
              color={BLUE}
              width={760}
              opacity={reveal(frame,176+i*5,187+i*5)}
              y={rise(frame,176+i*5,187+i*5,22)}
            >
              {word}
            </Key>
          ))}

          <div style={{
            position:'absolute',
            left:0,right:0,bottom:0,
            height:800,
            overflow:'hidden',
            opacity:crowd,
            transform:`translateY(${(1-crowd)*100}px)`,
            zIndex:8,
          }}>
            <Img src={MEETING} style={{
              position:'absolute',left:0,bottom:0,
              width:'100%',height:'100%',objectFit:'cover',
            }}/>
          </div>

          <div style={{
            position:'absolute',left:62,bottom:120,
            fontSize:18,fontWeight:900,letterSpacing:'.15em',
            lineHeight:1.6,color:NAVY,
            opacity:reveal(frame,190,202),zIndex:25,
          }}>
            DIFFERENT<br/>PEOPLE<br/>SAME HORIZON
          </div>
        </AbsoluteFill>

        {/* 06 */}
        <AbsoluteFill style={{opacity:s6}}>
          <Header page="06 / 07"/>

          <Copy
            top={210}
            size={64}
            width={160}
            weight={650}
            opacity={reveal(frame,210,217)}
            y={rise(frame,210,217,16)}
          >
            At
          </Copy>

          <Key
            top={300}
            size={152}
            color={BLUE}
            width={960}
            opacity={reveal(frame,215,226)}
            y={rise(frame,215,226,20)}
          >
            132 METERS
          </Key>

          <Copy
            top={650}
            size={48}
            width={390}
            weight={600}
            opacity={reveal(frame,222,233)}
          >
            Monas stands<br/>
            as a reminder<br/>
            of how far<br/>
            we can go,<br/>
            together.
          </Copy>

          <Img src={MONAS} style={{
            position:'absolute',
            height:1050,
            left:425,
            bottom:95,
            opacity:reveal(frame,219,232),
            transform:`translateY(${rise(frame,219,232,75)}px)`,
            zIndex:12,
          }}/>

          <Img src={CLOUD} style={{
            position:'absolute',left:80,bottom:300,width:360,
            opacity:reveal(frame,226,238)*.28,zIndex:8,
          }}/>

          <div style={{
            position:'absolute',
            right:150,top:720,
            width:3,
            height:630*reveal(frame,228,244),
            background:NAVY,zIndex:20,
          }}/>
          <div style={{
            position:'absolute',right:140,top:710,
            width:22,height:22,borderRadius:99,background:BLUE,
            opacity:reveal(frame,228,237),zIndex:20,
          }}/>
          <div style={{
            position:'absolute',right:140,top:1330,
            width:22,height:22,borderRadius:99,background:BLUE,
            opacity:reveal(frame,238,247),zIndex:20,
          }}/>
          <div style={{
            position:'absolute',right:42,top:1290,
            fontSize:26,fontWeight:950,lineHeight:1.05,color:NAVY,
            opacity:reveal(frame,238,247),zIndex:25,
          }}>
            132 M<br/><span style={{fontSize:20,letterSpacing:'.12em'}}>HEIGHT</span>
          </div>

          <div style={{
            position:'absolute',left:70,bottom:95,
            width:72,height:4,background:BLUE,borderRadius:99,
          }}/>
        </AbsoluteFill>

        {/* 07 */}
        <AbsoluteFill style={{opacity:s7}}>
          <Header page="07 / 07"/>

          <Copy
            top={220}
            size={60}
            width={620}
            weight={650}
            opacity={reveal(frame,252,262)}
            y={rise(frame,252,262,18)}
          >
            A symbol today.<br/>
            A stronger<br/>
            tomorrow.
          </Copy>

          {['JAKARTA','KEEPS','MOVING'].map((word,i)=>(
            <Key
              key={word}
              top={500+i*175}
              size={154}
              width={760}
              opacity={reveal(frame,262+i*5,274+i*5)}
              y={rise(frame,262+i*5,274+i*5,24)}
            >
              {word}
            </Key>
          ))}

          <div style={{
            position:'absolute',
            right:-110,bottom:90,
            width:650,height:650,borderRadius:999,
            background:BLUE,
            opacity:finalHero,
            transform:`scale(${finalHero})`,
            zIndex:5,
            overflow:'hidden',
          }}>
            <Img src={CLOUD} style={{
              position:'absolute',left:-70,bottom:60,width:520,opacity:.35,
            }}/>
          </div>

          <Img src={MONAS} style={{
            position:'absolute',
            height:1020,
            right:-28,
            bottom:0,
            opacity:finalHero,
            transform:`translateX(${(1-finalHero)*90}px)`,
            zIndex:12,
          }}/>

          <SmallStack
            items={['PEOPLE','PLACES','POSSIBILITIES']}
            left={68}
            top={1370}
            opacity={reveal(frame,282,292)}
          />

          <div style={{
            position:'absolute',left:68,bottom:150,
            width:72,height:4,background:BLUE,borderRadius:99,
            zIndex:20,
          }}/>
          <Footer/>
        </AbsoluteFill>
      </div>
    </AbsoluteFill>
  );
};
