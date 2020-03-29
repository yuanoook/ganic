const {
  useState,
  useInterval,
  useCallback,
} = require('ganic-usex');
const useMouseUp = require('./useMouseUp');

const usePress = (onPress, interlude = 1) => {
  const [interval, setInterval] = useState(null);
  useInterval(onPress, interval);
  useMouseUp(() => {
    setInterval(null);
  });
  const attachPress = useCallback(fn => e => {
    setInterval(interlude);
    if (typeof fn === 'function') {
      fn(e);
    }
  });
  return attachPress;
};

module.exports = usePress;
