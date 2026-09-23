import React from 'react';
import {EIM, SCENE1} from '../config';

export const FooterDash: React.FC = () => (
  <div
    data-eim-layer="footer-dash"
    style={{
      position: 'absolute',
      left: SCENE1.footerDash.left,
      bottom: SCENE1.footerDash.bottom,
      width: SCENE1.footerDash.width,
      height: 3,
      borderRadius: 99,
      background: EIM.blue,
      zIndex: 80,
    }}
  />
);

export const FooterText: React.FC = () => (
  <div
    data-eim-layer="footer-text"
    style={{
      position: 'absolute',
      left: SCENE1.footerText.left,
      bottom: SCENE1.footerText.bottom,
      color: EIM.navy,
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: 12,
      fontWeight: 900,
      letterSpacing: '.18em',
      zIndex: 80,
    }}
  >
    MONAS / JAKARTA
  </div>
);