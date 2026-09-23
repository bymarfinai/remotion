import React from 'react';
import {EIM, SCENE1} from '../config';

export const HeaderLeft: React.FC = () => (
  <div data-eim-layer="header-left" style={{position:'absolute',left:SCENE1.headerLeft.left,top:SCENE1.headerLeft.top,color:EIM.navy,fontFamily:'Arial, Helvetica, sans-serif',fontSize:15,fontWeight:900,letterSpacing:'.18em',lineHeight:1.08,zIndex:80}}>
    JAKARTA<br/>INDONESIA
  </div>
);

export const HeaderCenter: React.FC = () => (
  <div data-eim-layer="header-center" style={{position:'absolute',left:SCENE1.headerCenter.left,top:SCENE1.headerCenter.top,width:SCENE1.headerCenter.width,height:3,borderRadius:99,background:EIM.navy,transform:'translateX(-50%)',zIndex:80}} />
);

export const HeaderRight: React.FC = () => (
  <div data-eim-layer="header-right" style={{position:'absolute',right:SCENE1.headerRight.right,top:SCENE1.headerRight.top,color:EIM.navy,fontFamily:'Arial, Helvetica, sans-serif',fontSize:14,fontWeight:900,letterSpacing:'.14em',zIndex:80}}>
    01 / 07
  </div>
);

export const FooterDash: React.FC = () => (
  <div data-eim-layer="footer-dash" style={{position:'absolute',left:SCENE1.footerDash.left,bottom:SCENE1.footerDash.bottom,width:SCENE1.footerDash.width,height:3,borderRadius:99,background:EIM.blue,zIndex:80}} />
);

export const FooterText: React.FC = () => (
  <div data-eim-layer="footer-text" style={{position:'absolute',left:SCENE1.footerText.left,bottom:SCENE1.footerText.bottom,color:EIM.navy,fontFamily:'Arial, Helvetica, sans-serif',fontSize:12,fontWeight:900,letterSpacing:'.18em',zIndex:80}}>
    MONAS / JAKARTA
  </div>
);