import { keepInRange } from './utils';

export const COLORS = {
  red: 0,
  yellow: 60,
  green: 120,
  turquoise: 180,
  blue: 240,
  pink: 300,
};

export const byPercent = (percent, start = COLORS.red, end = COLORS.green) => {
  var a = keepInRange(percent, 0, 100) / 100,
      b = (end - start) * a,
  		c = b + start;
  return 'hsl('+c+', 100%, 50%)';
};

export const red2green = percent => byPercent(percent, COLORS.red, COLORS.green);
