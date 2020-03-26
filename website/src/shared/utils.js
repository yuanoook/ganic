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

export const getFactors = num => {
  const isEven = num % 2 === 0;
  let inc = isEven ? 1 : 2;
  let factors = [1, num];

  for (let curFactor = isEven ? 2 : 3; Math.pow(curFactor, 2) <= num; curFactor += inc) {
    if (num % curFactor !== 0) continue;
    factors.push(curFactor);
    let compliment = num / curFactor;
    if (compliment !== curFactor) factors.push(compliment);
  }

  return factors;
};

export const getPrimeFactors = num => {
  num = Math.floor(num);
  let root, factors = [], x, sqrt = Math.sqrt, doLoop = 1 < num;
  while( doLoop ){
      root = sqrt(num);
      x = 2;
      if (num % x) {
          x = 3;
          while ((num % x) && ((x += 2) < root));
      }
      x = (x > root) ? num : x;
      factors.push(x);
      doLoop = ( x != num );
      num /= x;
  }
  return factors;
};

export const formatNumber = num => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
};
