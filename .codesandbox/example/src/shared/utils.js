export const makeArray = n => Array(n).join().split(',').map((x, i) => i);
export const keepInRange = (n, min, max) => Math.max(min, Math.min(max, n));
export const triggerEvent = (target, name) => {
  const oldFashion = 'createEvent' in document;
  const event = oldFashion ? document.createEvent('Event') : new Event(name);
  if (oldFashion) {
    event.initEvent(name, true, true);
  }
  target.dispatchEvent(event);
};
