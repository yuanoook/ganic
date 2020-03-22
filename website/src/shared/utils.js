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
export const floor = (num, unit = 1) => Math.floor(num - num % unit)

export const getRefRect = (domRef, unit = 1) => {
  if(
    !domRef.current
    || !domRef.current.parentElement
    || !domRef.current.getBoundingClientRect
  ) return

  const {
    width = 0,
    height = 0,
    top = 0,
    right = 0,
    bottom = 0,
    left = 0
  } = domRef.current.getBoundingClientRect()
  return {
    width: floor(width, unit),
    height: floor(height, unit),
    top: floor(top, unit),
    right: floor(right, unit),
    bottom: floor(bottom, unit),
    left: floor(left, unit)
  }
};

export const walkViewPort = (density = 30, fn) => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  for (let x = 0; x <= density; x++) {
    const clientX = x * width / density;
    for (let y = 0; y <= density; y++) {
      const clientY = y * height / density;
      const element = document.elementFromPoint(clientX, clientY);
      if (element && (fn(element) === false)) {
        return;
      }
    }
  }
};

export const getAllFromViewPort = (density = 30) => {
  const elements = new Set();
  const addToElements = elements.add.bind(elements);
  walkViewPort(density, addToElements);
  return elements;
};
