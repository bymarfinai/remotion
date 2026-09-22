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
const BLUE_SOFT = '#DDE7F6';
const WHITE = '#FFFEFB';
const OFF = '#F4F2EC';
const MUTED = '#6B7B93';
const DARK = '#0D1B2D';

const MONAS = staticFile('generated/monas-eim-v7/monas-full.webp');
const FLAME = staticFile('generated/monas-eim-v7/monas-flame-detail.webp');
const SKYLINE = staticFile('generated/monas-eim-v7/jakarta-skyline.webp');
const CROWD = staticFile('generated/monas-eim-v7/people-crowd.webp');
const CLOUD = staticFile('generated/monas-eim-v7/cloud-soft.webp');

const clamp = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
};

const ease = Easing.bezier(0.16, 1, 0.3, 1);

const fade = (f:number,a:number,b:number) =>
  interpolate(f,[a,b],[0,1],{...clamp,easing:ease});

const rise = (f:number,a:number,b:number,px=28) =>
  interpolate(f,[a,b],[px,0],{...clamp,easing:ease});

const scaleIn = (f:number,a:number,b:number,from=.94) =>
  interpolate(f,[a,b],[from,1],{...clamp,easing:ease});

const scene = (f:number,a:number,b:number,fadeFrames=4) =>
  interpolate(f,[a,a+fadeFrames,b-fadeFrames,b],[0,1,1,0],clamp);

const Header: React.FC<{page:string}> = ({page}) => (
  <>
    <div style={{
      position:'absolute',left:48,top:40,fontSize:16,fontWeight:900,
      letterSpacing:'.15em',lineHeight:1.15,color:NAVY,zIndex:100
    }}>
      JAKARTA / INDONESIA
    </div>
    <div style={{
      position:'absolute',left:'50%',top:50,width:56,height:3,borderRadius:99,
      transform:'translateX(-50%)',background:NAVY,zIndex:100
    }}/>
    <div style={{
      position:'absolute',right:48,top:40,fontSize:16,fontWeight:900,
      letterSpacing:'.12em',color:NAVY,zIndex:100
    }}>
      {page}
    </div>
  </>
);

const Footer: React.FC = () => (
  <div style={{
    position:'absolute',left:50,bottom:38,fontSize:14,fontWeight:900,
    letterSpacing:'.15em',color:MUTED,zIndex:100
  }}>
    MONAS / JAKARTA
  </div>
);

const SceneFrame: React.FC<{opacity:number;children:React.ReactNode}> = ({opacity,children}) => (
  <AbsoluteFill style={{opacity}}>{children}</AbsoluteFill>
);

const Keyword: React.FC<{
  children:React.ReactNode;
  left?:number;
  top:number;
  size:number;
  color?:string;
  width?:number;
  align?:'left'|'center';
  opacity?:number;
  y?:number;
}> = ({children,left=54,top,size,color=NAVY,width=900,align='left',opacity=1,y=0}) => (
  <div style={{
    position:'absolute',
    left:align==='center'?0:left,
    right:align==='center'?0:undefined,
    top,
    width:align==='center'?undefined:width,
    textAlign:align,
    fontFamily:'Arial Narrow, Arial, Helvetica, sans-serif',
    fontSize:size,
    lineHeight:.86,
    fontWeight:950,
    letterSpacing:'-.055em',
    color,
    opacity,
    transform:`translateY(${y}px)`,
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
  align?:'left'|'center';
  opacity?:number;
  y?:number;
}> = ({children,left=58,top,size=30,width=480,weight=600,align='left',opacity=1,y=0}) => (
  <div style={{
    position:'absolute',
    left:align==='center'?0:left,
    right:align==='center'?0:undefined,
    top,
    width:align==='center'?undefined:width,
    textAlign:align,
    fontSize:size,
    lineHeight:1.02,
    fontWeight:weight,
    color:NAVY,
    opacity,
    transform:`translateY(${y}px)`,
  }}>
    {children}
  </div>
);

const SmallStack: React.FC<{items:string[];left:number;bottom:number;opacity:number}> =
({items,left,bottom,opacity}) => (
  <div style={{
    position:'absolute',left,bottom,fontSize:18,lineHeight:1.62,fontWeight:900,
    letterSpacing:'.14em',color:MUTED,opacity
  }}>
    {items.map((item)=><div key={item}>{item}</div>)}
  </div>
);

export const MonasEIMV7: React.FC = () => {
  const frame=useCurrentFrame();
  const {fps}=useVideoConfig();

  const cardIn=spring({
    frame,
    fps,
    config:{damping:22,stiffness:130,mass:.8}
  });

  const s1=scene(frame,0,42,4);
  const s2=scene(frame,38,84,4);
  const s3=scene(frame,80,124,4);
  const s4=scene(frame,120,166,4);
  const s5=scene(frame,162,210,4);
  const s6=scene(frame,206,252,4);
  const s7=interpolate(frame,[248,258],[0,1],clamp);

  const hero2=spring({
    frame:frame-50,fps,
    config:{damping:18,stiffness:165,mass:.7}
  });

  const crowdIn=spring({
    frame:frame-176,fps,
    config:{damping:18,stiffness:150,mass:.75}
  });

  return (
    <AbsoluteFill style={{background:DARK,overflow:'hidden',fontFamily:'Arial, Helvetica, sans-serif'}}>
      <div style={{
        position:'absolute',
        left:28,right:28,top:32,bottom:32,
        background:WHITE,
        border:`2px solid ${NAVY}`,
        borderRadius:28,
        overflow:'hidden',
        boxShadow:'0 14px 30px rgba(0,0,0,.22)',
        opacity:cardIn,
        transform:`translateY(${(1-cardIn)*28}px) scale(${.992+cardIn*.008})`,
      }}>
        {/* SCENE 1 */}
        <SceneFrame opacity={s1}>
          <Header page="01 / 07"/>
          <Copy
            top={180}
            size={58}
            width={570}
            weight={650}
            opacity={fade(frame,4,12)}
            y={rise(frame,4,12,22)}
          >
            What makes a city
          </Copy>
          <Copy
            top={246}
            size={54}
            width={420}
            weight={650}
            opacity={fade(frame,10,17)}
            y={rise(frame,10,17,18)}
          >
            truly
          </Copy>
          <Keyword
            top={320}
            size={146}
            color={BLUE}
            opacity={fade(frame,15,24)}
            y={rise(frame,15,24,24)}
          >
            ICONIC?
          </Keyword>

          <Copy
            top={600}
            left={58}
            size={26}
            width={245}
            weight={650}
            opacity={fade(frame,24,34)}
          >
            More than buildings,<br/>
            it&apos;s what people<br/>
            remember.
          </Copy>

          <div style={{
            position:'absolute',
            right:-28,
            bottom:84,
            width:430,
            height:430,
            borderRadius:999,
            background:BLUE_SOFT,
            overflow:'hidden',
            opacity:fade(frame,18,28),
            transform:`scale(${scaleIn(frame,18,28,.86)})`,
          }}>
            <Img src={SKYLINE} style={{
              position:'absolute',
              width:620,
              left:-86,
              bottom:-12,
              opacity:fade(frame,21,32),
              transform:`translateY(${rise(frame,21,32,48)}px) scale(1.12)`,
              filter:'saturate(.72) brightness(1.06)',
            }}/>
            <Img src={CLOUD} style={{
              position:'absolute',width:390,left:40,bottom:12,
              opacity:fade(frame,27,35)*.42,
            }}/>
          </div>
          <div style={{
            position:'absolute',left:58,bottom:85,width:58,height:3,borderRadius:99,
            background:BLUE,opacity:fade(frame,28,36)
          }}/>
          <Footer/>
        </SceneFrame>

        {/* SCENE 2 */}
        <SceneFrame opacity={s2}>
          <Header page="02 / 07"/>
          <Copy top={150} size={58} width={150} opacity={fade(frame,42,49)} y={rise(frame,42,49,18)}>
            A
          </Copy>
          <Keyword
            top={206}
            size={148}
            color={BLUE}
            opacity={fade(frame,47,58)}
            y={rise(frame,47,58,22)}
          >
            SYMBOL
          </Keyword>
          <Copy
            top={350}
            size={52}
            width={460}
            weight={650}
            opacity={fade(frame,55,66)}
            y={rise(frame,55,66,18)}
          >
            can hold<br/>
            a whole city.
          </Copy>

          <div style={{
            position:'absolute',left:445,top:535,width:430,height:430,borderRadius:999,
            background:BLUE,
            opacity:hero2,
            transform:`scale(${hero2})`,
          }}/>
          <Img src={MONAS} style={{
            position:'absolute',
            height:1120,
            right:58,
            top:410,
            opacity:hero2,
            transformOrigin:'50% 82%',
            transform:`translateY(${(1-hero2)*150}px) scale(${.95+hero2*.05})`,
            zIndex:10,
          }}/>
          <Img src={CLOUD} style={{
            position:'absolute',right:22,top:770,width:360,
            opacity:fade(frame,60,71)*.38,zIndex:6,
          }}/>

          {['PEOPLE','HISTORY','IDENTITY','TOMORROW'].map((item,i)=>(
            <div key={item} style={{
              position:'absolute',left:62,bottom:250-i*34,
              fontSize:17,fontWeight:900,letterSpacing:'.14em',color:MUTED,
              opacity:fade(frame,62+i*3,70+i*3),
              transform:`translateX(${interpolate(frame,[62+i*3,70+i*3],[-16,0],clamp)}px)`
            }}>
              {item}
            </div>
          ))}
          <Footer/>
        </SceneFrame>

        {/* SCENE 3 */}
        <SceneFrame opacity={s3}>
          <Header page="03 / 07"/>
          <Copy top={180} size={46} width={330} opacity={fade(frame,84,92)} y={rise(frame,84,92,18)}>
            It brings<br/>together
          </Copy>

          {['PLACE','PEOPLE','PURPOSE'].map((word,i)=>(
            <Keyword
              key={word}
              top={320+i*112}
              size={104}
              width={390}
              opacity={fade(frame,90+i*6,100+i*6)}
              y={rise(frame,90+i*6,100+i*6,20)}
            >
              {word}
            </Keyword>
          ))}

          <div style={{position:'absolute',left:430,top:170,width:510,height:1250}}>
            <svg width="510" height="1250" viewBox="0 0 510 1250">
              <path
                d="M390 40 C130 180 160 470 295 635 C402 765 355 1040 105 1185"
                fill="none"
                stroke={BLUE}
                strokeWidth="4"
                strokeLinecap="round"
                pathLength="1"
                strokeDasharray="1"
                strokeDashoffset={1-fade(frame,97,115)}
              />
            </svg>
          </div>

          {[
            {x:705,y:360,label:'PLACE',sub:'A CAPITAL CITY',d:104},
            {x:760,y:720,label:'PEOPLE',sub:'A SHARED STORY',d:111},
            {x:610,y:1080,label:'PURPOSE',sub:'A BRIGHTER TOMORROW',d:118},
          ].map(({x,y,label,sub,d})=>{
            const p=spring({
              frame:frame-d,fps,
              config:{damping:18,stiffness:190,mass:.5}
            });
            return <div key={label} style={{
              position:'absolute',left:x,top:y,opacity:p,transform:`scale(${p})`
            }}>
              <div style={{
                width:22,height:22,borderRadius:99,background:BLUE,
                border:`4px solid ${WHITE}`,boxShadow:`0 0 0 2px ${BLUE}`
              }}/>
              <div style={{
                position:'absolute',left:36,top:-2,width:220,
                fontSize:19,fontWeight:950,letterSpacing:'.07em',color:NAVY
              }}>
                {label}
                <div style={{
                  marginTop:8,fontSize:15,fontWeight:800,letterSpacing:'.08em',
                  lineHeight:1.18,color:MUTED
                }}>
                  {sub}
                </div>
              </div>
            </div>
          })}
          <Footer/>
        </SceneFrame>

        {/* SCENE 4 */}
        <SceneFrame opacity={s4}>
          <Header page="04 / 07"/>
          <Copy
            top={180}
            size={64}
            width={520}
            weight={650}
            opacity={fade(frame,124,134)}
            y={rise(frame,124,134,20)}
          >
            Standing<br/>
            across<br/>
            generations.
          </Copy>

          <div style={{position:'absolute',left:62,top:545,width:820,height:300}}>
            <svg width="820" height="300" viewBox="0 0 820 300">
              <path
                d="M18 235 C180 150 300 218 415 156 C555 82 652 128 800 42"
                fill="none" stroke={BLUE} strokeWidth="4" strokeLinecap="round"
                pathLength="1" strokeDasharray="1"
                strokeDashoffset={1-fade(frame,132,149)}
              />
              {[
                [28,230,0],[300,196,1],[560,112,2],[790,48,3]
              ].map(([cx,cy,i])=>{
                const p=spring({
                  frame:frame-(140+i*5),fps,
                  config:{damping:18,stiffness:185,mass:.5}
                });
                return <circle key={i} cx={cx} cy={cy} r={10*p} fill={i===3?BLUE:NAVY}/>;
              })}
            </svg>
            {[
              ['1961',6,245],['1975',272,210],['1998',534,126],['TODAY',748,12]
            ].map(([t,l,tp],i)=>(
              <div key={String(t)} style={{
                position:'absolute',left:Number(l),top:Number(tp),
                fontSize:18,fontWeight:900,color:NAVY,
                opacity:fade(frame,140+i*5,148+i*5)
              }}>{t}</div>
            ))}
          </div>

          <SmallStack
            items={['SAME','CITY','NEW','STORIES']}
            left={62}
            bottom={170}
            opacity={fade(frame,146,157)}
          />

          <div style={{
            position:'absolute',right:-45,bottom:-10,width:470,height:470,
            borderRadius:999,background:'#EEF2F7',opacity:fade(frame,143,155)
          }}/>
          <Img src={FLAME} style={{
            position:'absolute',right:-5,bottom:35,width:360,
            opacity:fade(frame,146,158),
            transform:`translateY(${rise(frame,146,158,55)}px) scale(1.08)`,
            zIndex:8,
          }}/>
          <Footer/>
        </SceneFrame>

        {/* SCENE 5 */}
        <SceneFrame opacity={s5}>
          <Header page="05 / 07"/>
          <Copy
            top={175}
            size={52}
            width={520}
            weight={650}
            opacity={fade(frame,166,176)}
            y={rise(frame,166,176,18)}
          >
            It&apos;s more than<br/>a monument.
          </Copy>

          {['IT’S A','MEETING','POINT.'].map((word,i)=>(
            <Keyword
              key={word}
              top={360+i*112}
              size={118}
              color={BLUE}
              opacity={fade(frame,176+i*5,186+i*5)}
              y={rise(frame,176+i*5,186+i*5,22)}
            >
              {word}
            </Keyword>
          ))}

          <div style={{
            position:'absolute',left:0,right:0,bottom:0,height:720,overflow:'hidden'
          }}>
            <Img src={CROWD} style={{
              position:'absolute',width:'116%',left:'-8%',bottom:-45,
              opacity:crowdIn,
              transform:`translateY(${(1-crowdIn)*120}px) scale(${1.03})`,
              filter:'saturate(.58) contrast(1.04) brightness(1.06)',
            }}/>
            <Img src={MONAS} style={{
              position:'absolute',height:560,left:'50%',bottom:92,
              transform:'translateX(-50%)',opacity:crowdIn*.62,
            }}/>
          </div>

          <div style={{
            position:'absolute',right:-80,bottom:70,width:330,height:330,
            borderRadius:999,background:BLUE_SOFT,opacity:fade(frame,183,197)*.75
          }}/>

          <div style={{
            position:'absolute',left:62,bottom:110,
            fontSize:17,fontWeight:900,letterSpacing:'.14em',lineHeight:1.55,
            color:WHITE,textShadow:'0 2px 8px rgba(23,58,104,.5)',
            opacity:fade(frame,190,201),zIndex:30
          }}>
            DIFFERENT<br/>PEOPLE<br/>SAME HORIZON
          </div>
          <Footer/>
        </SceneFrame>

        {/* SCENE 6 */}
        <SceneFrame opacity={s6}>
          <Header page="06 / 07"/>
          <Copy top={165} size={48} width={180} opacity={fade(frame,210,217)} y={rise(frame,210,217,16)}>
            At
          </Copy>
          <Keyword
            top={238}
            size={124}
            color={BLUE}
            opacity={fade(frame,215,226)}
            y={rise(frame,215,226,20)}
          >
            132 METERS
          </Keyword>
          <Copy
            top={470}
            size={28}
            width={280}
            weight={600}
            opacity={fade(frame,222,233)}
          >
            Monas stands<br/>
            as a reminder<br/>
            of how far<br/>
            we can go,<br/>
            together.
          </Copy>

          <Img src={MONAS} style={{
            position:'absolute',height:1000,left:'50%',bottom:110,
            transform:`translateX(-50%) translateY(${rise(frame,219,233,85)}px)`,
            opacity:fade(frame,219,233),
          }}/>

          <Img src={CLOUD} style={{
            position:'absolute',width:300,left:74,bottom:335,
            opacity:fade(frame,226,238)*.28
          }}/>

          <div style={{
            position:'absolute',right:96,top:670,width:2,
            height:620*fade(frame,228,243),background:NAVY,
            transformOrigin:'top'
          }}/>
          <div style={{
            position:'absolute',right:88,top:662,width:18,height:18,borderRadius:99,
            background:BLUE,opacity:fade(frame,228,237)
          }}/>
          <div style={{
            position:'absolute',right:88,top:1272,width:18,height:18,borderRadius:99,
            background:BLUE,opacity:fade(frame,238,246)
          }}/>
          <div style={{
            position:'absolute',right:18,top:1266,fontSize:17,fontWeight:900,
            lineHeight:1.05,color:NAVY,opacity:fade(frame,239,247)
          }}>
            132 M<br/>HEIGHT
          </div>
          <Footer/>
        </SceneFrame>

        {/* SCENE 7 */}
        <SceneFrame opacity={s7}>
          <Header page="07 / 07"/>
          <Copy
            top={160}
            size={44}
            width={430}
            weight={650}
            opacity={fade(frame,252,262)}
            y={rise(frame,252,262,16)}
          >
            A symbol today.<br/>
            A stronger<br/>
            tomorrow.
          </Copy>

          {['JAKARTA','KEEPS','MOVING'].map((word,i)=>(
            <Keyword
              key={word}
              top={410+i*118}
              size={126}
              opacity={fade(frame,262+i*5,273+i*5)}
              y={rise(frame,262+i*5,273+i*5,24)}
            >
              {word}
            </Keyword>
          ))}

          <div style={{
            position:'absolute',right:-80,bottom:145,width:420,height:420,borderRadius:999,
            background:BLUE,opacity:fade(frame,260,273),
            transform:`scale(${scaleIn(frame,260,273,.86)})`,
            overflow:'hidden'
          }}>
            <Img src={CLOUD} style={{
              position:'absolute',width:360,left:-48,bottom:32,opacity:.32
            }}/>
          </div>

          <Img src={MONAS} style={{
            position:'absolute',width:340,right:-4,bottom:24,
            opacity:fade(frame,264,278),
            transform:`translateX(${interpolate(frame,[264,278],[90,0],clamp)}px)`,
            zIndex:12,
          }}/>

          <SmallStack
            items={['PEOPLE','PLACES','POSSIBILITIES']}
            left={62}
            bottom={150}
            opacity={fade(frame,281,291)}
          />

          <div style={{
            position:'absolute',left:62,bottom:102,width:58,height:3,borderRadius:99,
            background:BLUE,opacity:fade(frame,284,292)
          }}/>
          <Footer/>
        </SceneFrame>
      </div>
    </AbsoluteFill>
  );
};
