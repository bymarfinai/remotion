import {Easing, interpolate} from 'remotion';

export type EntranceWindow = {
  startFrame: number;
  endFrame: number;
};

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

export const progressInWindow = (
  frame: number,
  window: EntranceWindow,
  easing: ((value: number) => number) | undefined = Easing.out(Easing.cubic),
) => {
  const raw = interpolate(frame, [window.startFrame, window.endFrame], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing,
  });

  return clamp01(raw);
};

export const fadeIn = (
  frame: number,
  window: EntranceWindow,
  from = 0,
  to = 1,
) => {
  return interpolate(progressInWindow(frame, window), [0, 1], [from, to], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
};

export const riseIn = (
  frame: number,
  window: EntranceWindow,
  fromY = 40,
  toY = 0,
) => {
  return interpolate(progressInWindow(frame, window), [0, 1], [fromY, toY], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
};

export const slideInX = (
  frame: number,
  window: EntranceWindow,
  fromX: number,
  toX = 0,
) => {
  return interpolate(progressInWindow(frame, window), [0, 1], [fromX, toX], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
};

export const scaleIn = (
  frame: number,
  window: EntranceWindow,
  fromScale = 0.9,
  toScale = 1,
) => {
  return interpolate(progressInWindow(frame, window), [0, 1], [fromScale, toScale], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
};

export const rotateIn = (
  frame: number,
  window: EntranceWindow,
  fromDeg = 0,
  toDeg = 0,
) => {
  return interpolate(progressInWindow(frame, window), [0, 1], [fromDeg, toDeg], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
};

export const drawProgress = (frame: number, window: EntranceWindow) => {
  return progressInWindow(frame, window, Easing.out(Easing.cubic));
};

export const popIn = (
  frame: number,
  window: EntranceWindow,
  fromScale = 0.5,
  overshoot = 1.08,
  toScale = 1,
) => {
  const t = progressInWindow(frame, window, Easing.out(Easing.back(1.7)));

  if (t < 0.7) {
    return interpolate(t, [0, 0.7], [fromScale, overshoot], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  }

  return interpolate(t, [0.7, 1], [overshoot, toScale], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
};

export const dramaticImageLift = (
  frame: number,
  window: EntranceWindow,
  opts?: {
    fromY?: number;
    fromScale?: number;
    fromRotate?: number;
  },
) => {
  const fromY = opts?.fromY ?? 180;
  const fromScale = opts?.fromScale ?? 0.88;
  const fromRotate = opts?.fromRotate ?? 2.5;
  const t = progressInWindow(frame, window, Easing.out(Easing.cubic));

  return {
    opacity: interpolate(t, [0, 0.2, 1], [0, 0.2, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
    translateY: interpolate(t, [0, 1], [fromY, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
    scale: interpolate(t, [0, 1], [fromScale, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
    rotate: interpolate(t, [0, 1], [fromRotate, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
  };
};

export const getTransformStyle = (parts: {
  x?: number;
  y?: number;
  scale?: number;
  rotate?: number;
}) => {
  const tx = parts.x ?? 0;
  const ty = parts.y ?? 0;
  const sc = parts.scale ?? 1;
  const rt = parts.rotate ?? 0;
  return `translate(${tx}px, ${ty}px) scale(${sc}) rotate(${rt}deg)`;
};

export const EIM_MOTION_PRESETS = {
  heroReveal: {
    startFrame: 8,
    endFrame: 54,
  },
  graphicReveal: {
    startFrame: 0,
    endFrame: 34,
  },
  headlineReveal: {
    startFrame: 12,
    endFrame: 42,
  },
  subheadlineReveal: {
    startFrame: 28,
    endFrame: 56,
  },
  lineDraw: {
    startFrame: 8,
    endFrame: 42,
  },
  nodePop: {
    startFrame: 28,
    endFrame: 46,
  },
} as const;
