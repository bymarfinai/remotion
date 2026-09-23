import {Easing, interpolate} from 'remotion';

export const clamp = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
};

const ease = Easing.bezier(0.16, 1, 0.3, 1);

export const reveal = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], {...clamp, easing: ease});

export const fromY = (
  frame: number,
  start: number,
  end: number,
  amount: number,
) => interpolate(frame, [start, end], [amount, 0], {...clamp, easing: ease});

export const fromX = (
  frame: number,
  start: number,
  end: number,
  amount: number,
) => interpolate(frame, [start, end], [amount, 0], {...clamp, easing: ease});

export const fromScale = (
  frame: number,
  start: number,
  end: number,
  amount: number,
) => interpolate(frame, [start, end], [amount, 1], {...clamp, easing: ease});