import React, {CSSProperties, ReactNode} from 'react';
import {AbsoluteFill} from 'remotion';
import {EIM_COLORS, EIM_DEFAULTS, EIM_RADIUS, EIM_SHADOWS, EIM_SPACING, EIM_TYPE} from './tokens';

type EIMSceneShellProps = {
  children: ReactNode;
  pageLabel?: string;
  headerLeftLines?: string[];
  showHeader?: boolean;
  showTopRule?: boolean;
  showFooterRule?: boolean;
  useRoundedCard?: boolean;
  contentStyle?: CSSProperties;
  backgroundColor?: string;
  cardInset?: number;
};

const labelStyle: CSSProperties = {
  color: EIM_COLORS.navy,
  fontFamily: EIM_TYPE.micro.fontFamily,
  fontWeight: EIM_TYPE.micro.fontWeight,
  fontSize: EIM_TYPE.micro.fontSize,
  lineHeight: EIM_TYPE.micro.lineHeight,
  letterSpacing: EIM_TYPE.micro.letterSpacing,
  textTransform: EIM_TYPE.micro.textTransform,
};

export const EIMSceneShell: React.FC<EIMSceneShellProps> = ({
  children,
  pageLabel,
  headerLeftLines = [...EIM_DEFAULTS.headerLeft],
  showHeader = true,
  showTopRule = true,
  showFooterRule = true,
  useRoundedCard = false,
  contentStyle,
  backgroundColor = EIM_COLORS.bg,
  cardInset = 18,
}) => {
  const body = (
    <AbsoluteFill
      style={{
        backgroundColor,
        overflow: 'hidden',
      }}
    >
      {showHeader ? (
        <>
          <div
            style={{
              position: 'absolute',
              top: EIM_SPACING.top,
              left: EIM_SPACING.pageX,
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
            }}
          >
            {headerLeftLines.map((line) => (
              <div key={line} style={labelStyle}>
                {line}
              </div>
            ))}
          </div>

          {showTopRule ? (
            <div
              style={{
                position: 'absolute',
                top: EIM_SPACING.top + 6,
                left: '50%',
                width: EIM_DEFAULTS.topRuleWidth,
                height: 4,
                backgroundColor: EIM_COLORS.blue,
                transform: 'translateX(-50%)',
                borderRadius: 999,
              }}
            />
          ) : null}

          {pageLabel ? (
            <div
              style={{
                position: 'absolute',
                top: EIM_SPACING.top,
                right: EIM_SPACING.pageX,
                ...labelStyle,
              }}
            >
              {pageLabel}
            </div>
          ) : null}
        </>
      ) : null}

      {showFooterRule ? (
        <div
          style={{
            position: 'absolute',
            bottom: EIM_SPACING.bottom,
            left: EIM_SPACING.pageX,
            width: EIM_DEFAULTS.footerRuleWidth,
            height: 4,
            backgroundColor: EIM_COLORS.blue,
            borderRadius: 999,
          }}
        />
      ) : null}

      <AbsoluteFill
        style={{
          ...contentStyle,
        }}
      >
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );

  if (!useRoundedCard) {
    return body;
  }

  return (
    <AbsoluteFill style={{backgroundColor: EIM_COLORS.navy}}>
      <AbsoluteFill
        style={{
          top: cardInset,
          left: cardInset,
          right: cardInset,
          bottom: cardInset,
          backgroundColor,
          borderRadius: EIM_RADIUS.card,
          boxShadow: EIM_SHADOWS.card,
          overflow: 'hidden',
        }}
      >
        {body}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export default EIMSceneShell;
