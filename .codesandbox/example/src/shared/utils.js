export const makeArray = n => Array(n).join().split(',').map((x, i) => i);
export const keepInRange = (n, min, max) => Math.max(min, Math.min(max, n));
