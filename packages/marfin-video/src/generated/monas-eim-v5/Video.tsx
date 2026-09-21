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
const BLUE_2 = '#396FEA';
const WHITE = '#FFFEFB';
const OFF = '#F6F5F1';
const LINE = '#DCE4F1';
const MUTED = '#687B96';

const MONAS = staticFile('generated/monas-eim-v5/monas-editorial.webp');
const SKYLINE = staticFile('generated/monas-eim-v5/jakarta-skyline.webp');
const GLOBE = staticFile('generated/monas-eim-v5/globe-asia.webp');
const PEOPLE = staticFile('generated/monas-eim-v5/people-crowd.webp');

const clamp = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
};

const ease = Easing.bezier(0.16, 1, 0.3, 1);
const reveal = (f:number,a:number,b:number) =>
  interpolate(f,[a,b],[0,1],{...clamp,easing:ease});

const windowOpacity = (f:number,a:number,b:number,fade=5) =>
  interpolate(f,[a,a+fade,b-fade,b],[0,1,1,0],clamp);

const Keyword: React.FC<{
  children: React.ReactNode;
  top:number;
  size:number;
  align?:'left'|'center';
  color?:string;
}> = ({children,top,size,align='left',color=NAVY}) => (
  <div style={{
    position:'absolute',
    left:align==='center'?0:74,
    right:align==='center'?0:74,
    top,
    textAlign:align,
    fontFamily:'Arial Narrow, Arial, Helvetica, sans-serif',
    fontSize:size,
    lineHeight:0.88,
    fontWeight:950,
    letterSpacing:'-0.055em',
    color,
  }}>
    {children}
  </div>
);

const SmallCopy: React.FC<{
  children: React.ReactNode;
  top:number;
  left?:number;
  width?:number;
  align?:'left'|'center';
  size?:number;
}> = ({children,top,left=74,width=500,align='left',size=31}) => (
  <div style={{
    position:'absolute',
    left:align==='center'?0:left,
    right:align==='center'?0:undefined,
    top,
    width:align==='center'?undefined:width,
    textAlign:align,
    fontFamily:'Arial, Helvetica, sans-serif',
    fontSize:size,
    lineHeight:1.08,
    fontWeight:550,
    color:NAVY,
  }}>
    {children}
  </div>
);

const AssetCircle: React.FC<{
  src:string;
  left:number;
  top:number;
  size:number;
  imageScale?:number;
  imageX?:number;
  imageY?:number;
  opacity?:number;
}> = ({src,left,top,size,imageScale=1,imageX=0,imageY=0,opacity=1}) => (
  <div style={{
    position:'absolute',
    left,top,width:size,height:size,borderRadius:999,
    overflow:'hidden',
    background:'#EEF2F8',
    opacity,
  }}>
    <Img src={src} style={{
      width:'100%',height:'100%',objectFit:'cover',
      transform:`translate(${imageX}px,${imageY}px) scale(${imageScale})`,
    }}/>
  </div>
);

const MiniIcon: React.FC<{type:'cut'|'music'|'time';x:number;y:number;label:string;delay:number}> =
({type,x,y,label,delay}) => {
  const frame=useCurrentFrame();
  const p=spring({frame:frame-delay,fps:30,config:{damping:17,stiffness:190,mass:.55}});
  return <div style={{
    position:'absolute',left:x,top:y,
    transform:`translate(-50%,-50%) scale(${p})`,opacity:p,zIndex:20
  }}>
    <div style={{
      width:62,height:62,borderRadius:14,background:WHITE,
      display:'grid',placeItems:'center',
    }}>
      {type==='cut' && <svg width="36" height="36" viewBox="0 0 36 36">
        <circle cx="10" cy="10" r="5" fill="none" stroke={NAVY} strokeWidth="2.6"/>
        <circle cx="10" cy="26" r="5" fill="none" stroke={NAVY} strokeWidth="2.6"/>
        <path d="M14 13l15 15M14 23L29 8" stroke={BLUE} strokeWidth="3" strokeLinecap="round"/>
      </svg>}
      {type==='music' && <svg width="36" height="36" viewBox="0 0 36 36">
        <path d="M14 8v18M14 10l14-3v16" fill="none" stroke={BLUE} strokeWidth="3" strokeLinecap="round"/>
        <circle cx="10" cy="27" r="5" fill={NAVY}/><circle cx="24" cy="24" r="5" fill={NAVY}/>
      </svg>}
      {type==='time' && <svg width="36" height="36" viewBox="0 0 36 36">
        <path d="M12 6h12M12 30h12M14 8c0 6 8 6 8 10s-8 4-8 10M22 8c0 6-8 6-8 10s8 4 8 10"
          fill="none" stroke={NAVY} strokeWidth="2.5" strokeLinecap="round"/>
      </svg>}
    </div>
    <div style={{
      position:'absolute',left:72,top:18,whiteSpace:'nowrap',
      fontSize:21,fontWeight:800,color:NAVY
    }}>{label}</div>
  </div>
};

const StoryBlocks: React.FC<{frame:number;start:number}> = ({frame,start}) => (
  <div style={{
    position:'absolute',left:110,right:110,top:650,
    display:'grid',gridTemplateColumns:'1fr 1.05fr 1fr',gap:10,
  }}>
    {[0,1,2,3,4,5,6,7,8].map((i)=>{
      const p=reveal(frame,start+i*2,start+10+i*2);
      const widths=[1,.82,.65,.72,1,.88,.9,.7,1];
      return <div key={i} style={{
        height:70*widths[i],
        borderRadius:12,
        background:i===4?NAVY:BLUE_2,
        opacity:p,
        transform:`scaleX(${p})`,
        transformOrigin:'left center',
      }}/>;
    })}
    <div style={{
      position:'absolute',left:'48%',top:-20,bottom:-20,width:2,background:NAVY,
      opacity:reveal(frame,start+16,start+25)
    }}/>
    <div style={{
      position:'absolute',left:'48%',top:-34,
      width:0,height:0,borderLeft:'8px solid transparent',
      borderRight:'8px solid transparent',borderTop:`12px solid ${NAVY}`,
      transform:'translateX(-7px)',opacity:reveal(frame,start+16,start+25)
    }}/>
  </div>
);

export const MonasEIMV5: React.FC = () => {
  const frame=useCurrentFrame();
  const {fps}=useVideoConfig();

  const card=spring({frame,fps,config:{damping:22,stiffness:120,mass:.85}});
  const s1=windowOpacity(frame,0,32,5);
  const s2=windowOpacity(frame,27,62,5);
  const s3=windowOpacity(frame,57,91,5);
  const s4=windowOpacity(frame,86,122,5);
  const s5=windowOpacity(frame,117,154,5);
  const s6=windowOpacity(frame,149,180,5);
  const s7=interpolate(frame,[174,184],[0,1],clamp);

  const hero1=spring({frame:frame-8,fps,config:{damping:18,stiffness:160,mass:.7}});
  const hero2=spring({frame:frame-37,fps,config:{damping:18,stiffness:160,mass:.7}});
  const curve=reveal(frame,124,145);
  const circleDraw=reveal(frame,155,171);
  const finalPeople=reveal(frame,181,196);

  return (
    <AbsoluteFill style={{background:OFF,fontFamily:'Arial, Helvetica, sans-serif',overflow:'hidden'}}>
      <div style={{
        position:'absolute',left:112,right:112,top:142,bottom:128,
        background:WHITE,border:`3px solid ${NAVY}`,borderRadius:42,
        overflow:'hidden',boxShadow:'0 18px 26px rgba(18,42,71,.16)',
        opacity:card,
        transform:`translateY(${(1-card)*55}px) scale(${.985+card*.015})`,
      }}>
        {/* persistent ghost geometry */}
        <div style={{
          position:'absolute',left:-100,top:270,width:560,height:560,borderRadius:999,
          border:`2px solid ${LINE}`,opacity:.34
        }}/>
        <div style={{
          position:'absolute',right:-170,bottom:240,width:620,height:620,borderRadius:999,
          border:`2px solid ${LINE}`,opacity:.28
        }}/>
        <div style={{
          position:'absolute',left:70,right:70,top:'48%',height:2,background:LINE,opacity:.28
        }}/>

        {/* tiny persistent corner mark */}
        <div style={{
          position:'absolute',left:38,top:34,width:54,height:54,borderRadius:15,
          background:NAVY,zIndex:50,boxShadow:'0 8px 15px rgba(23,58,104,.18)'
        }}>
          <div style={{
            position:'absolute',left:15,top:15,width:24,height:24,borderRadius:999,
            border:`3px solid ${WHITE}`,borderRightColor:BLUE,
            transform:`rotate(${frame*2}deg)`
          }}/>
        </div>

        {/* Scene 1 */}
        <AbsoluteFill style={{opacity:s1}}>
          <SmallCopy top={180} left={145} width={420} size={29}>Why do some symbols</SmallCopy>
          <Keyword top={228} size={98}>STAY?</Keyword>
          <SmallCopy top={346} left={145} width={420} size={27}>Long after the moment is gone.</SmallCopy>
          <AssetCircle src={GLOBE} left={146} top={590} size={470} imageScale={1.08} opacity={hero1}/>
          <div style={{
            position:'absolute',left:500,top:530,width:300,height:300,borderRadius:999,
            background:'#7587AE',opacity:.85*hero1
          }}/>
        </AbsoluteFill>

        {/* Scene 2 */}
        <AbsoluteFill style={{opacity:s2}}>
          <SmallCopy top={180} left={168} width={470} size={29}>Stay in our mind</SmallCopy>
          <Keyword top={226} size={102}>FOREVER</Keyword>
          <AssetCircle src={MONAS} left={180} top={500} size={560} imageScale={1.03} opacity={hero2}/>
          <div style={{
            position:'absolute',right:85,top:430,width:150,height:420,borderRadius:80,
            background:'#6E7FA8',opacity:.72*hero2
          }}/>
        </AbsoluteFill>

        {/* Scene 3 */}
        <AbsoluteFill style={{opacity:s3}}>
          <SmallCopy top={185} align="center" size={27}>Because a city is</SmallCopy>
          <Keyword top={232} size={106} align="center">PEOPLE</Keyword>
          <div style={{
            position:'absolute',left:135,right:135,bottom:210,height:700,
            overflow:'hidden',borderRadius:'360px 360px 24px 24px'
          }}>
            <Img src={PEOPLE} style={{
              position:'absolute',width:'100%',height:'100%',objectFit:'cover',
              filter:'saturate(.55) contrast(1.05)',
            }}/>
          </div>
        </AbsoluteFill>

        {/* Scene 4 */}
        <AbsoluteFill style={{opacity:s4}}>
          <SmallCopy top={195} align="center" size={28}>That&apos;s exactly a</SmallCopy>
          <Keyword top={240} size={104} align="center">GREAT STORY</Keyword>
          <StoryBlocks frame={frame} start={94}/>
          <SmallCopy top={1090} align="center" size={24}>Editing does not add meaning.</SmallCopy>
          <SmallCopy top={1132} align="center" size={24}>It reveals what matters.</SmallCopy>
        </AbsoluteFill>

        {/* Scene 5 */}
        <AbsoluteFill style={{opacity:s5}}>
          <div style={{
            position:'absolute',left:0,top:0,width:'100%',height:'100%'
          }}>
            <svg width="100%" height="100%" viewBox="0 0 856 1650" preserveAspectRatio="none">
              <path d="M780 55 C540 210 514 515 620 730 C720 930 605 1215 350 1500"
                fill="none" stroke={NAVY} strokeWidth="3.2" strokeLinecap="round"
                pathLength="1" strokeDasharray="1" strokeDashoffset={1-curve}/>
            </svg>
          </div>
          <Keyword top={690} size={72}>They use</Keyword>
          <MiniIcon type="cut" x={635} y={430} label="Cuts" delay={130}/>
          <MiniIcon type="music" x={690} y={760} label="Music" delay={137}/>
          <MiniIcon type="time" x={590} y={1090} label="Timing" delay={144}/>
        </AbsoluteFill>

        {/* Scene 6 */}
        <AbsoluteFill style={{opacity:s6}}>
          <svg style={{position:'absolute',left:170,top:400}} width="520" height="520" viewBox="0 0 520 520">
            <circle cx="260" cy="260" r="205" fill="none" stroke={LINE} strokeWidth="3"/>
            <circle cx="260" cy="260" r="205" fill="none" stroke={BLUE} strokeWidth="7"
              strokeLinecap="round" pathLength="1" strokeDasharray="1"
              strokeDashoffset={1-circleDraw} transform="rotate(-90 260 260)"/>
          </svg>
          <SmallCopy top={610} align="center" size={24}>To turn a place into</SmallCopy>
          <Keyword top={660} size={91} align="center">MEMORY</Keyword>
          <AssetCircle src={MONAS} left={330} top={820} size={230} imageScale={1.15} opacity={reveal(frame,162,176)}/>
        </AbsoluteFill>

        {/* Scene 7 */}
        <AbsoluteFill style={{opacity:s7}}>
          <SmallCopy top={190} align="center" size={25}>It&apos;s about making people</SmallCopy>
          <Keyword top={232} size={94} align="center">REMEMBER</Keyword>

          <div style={{
            position:'absolute',left:0,right:0,bottom:0,height:620,
            overflow:'hidden'
          }}>
            <Img src={PEOPLE} style={{
              position:'absolute',left:-30,bottom:-90,width:'110%',height:700,
              objectFit:'cover',opacity:finalPeople,
              filter:'grayscale(1) contrast(1.16)'
            }}/>
          </div>

          <div style={{
            position:'absolute',left:40,top:65,width:220,height:220,borderRadius:999,
            overflow:'hidden',opacity:.35*s7
          }}>
            <Img src={GLOBE} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
          </div>
        </AbsoluteFill>

        <div style={{
          position:'absolute',left:48,right:48,bottom:40,
          display:'flex',justifyContent:'space-between',
          fontSize:14,fontWeight:850,letterSpacing:'.15em',
          color:MUTED,zIndex:80
        }}>
          <span>MONAS / JAKARTA</span>
          <span>EIM 005</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
