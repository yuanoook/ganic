const {
  useRef,
  useEffect,
} = require('ganic-usex');

const mouseUpEffect = ref => {
  const fn = e => {
    if (typeof ref.current === 'function') {
      ref.current(e);
    }
  };
  document.documentElement.addEventListener('mouseup', fn);
  document.documentElement.addEventListener('touchend', fn, {passive: true});
  return () => {
    document.documentElement.removeEventListener('mouseup', fn);
    document.documentElement.removeEventListener('touchend', fn, {passive: true});
    ref.current = null;
  };
};

const useMouseUp = fn => {
  const ref = useRef();
  ref.current = fn;
  useEffect(mouseUpEffect, ref);
};

module.exports = useMouseUp;
