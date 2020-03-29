const { useState, useRef } = require('ganic-usex');
const useGlobalInterval = require('./useGlobalInterval');
const floor = require('../../shared/math.floor');

const getRefRect = (domRef, unit = 1) => {
  if (
    !domRef.current
    || !domRef.current.parentElement
    || !domRef.current.getBoundingClientRect
  ) {
    return;
  }

  const {
    width = 0,
    height = 0,
    top = 0,
    right = 0,
    bottom = 0,
    left = 0,
  } = domRef.current.getBoundingClientRect();

  return {
    width: floor(width, unit),
    height: floor(height, unit),
    top: floor(top, unit),
    right: floor(right, unit),
    bottom: floor(bottom, unit),
    left: floor(left, unit),
  };
};

const useRectRef = () => {
  const ref = useRef();
  const [rect, setRect] = useState(() => getRefRect(ref));
  useGlobalInterval(() => setRect(getRefRect(ref)), 100);
  return [rect, ref];
};

module.exports = useRectRef;
