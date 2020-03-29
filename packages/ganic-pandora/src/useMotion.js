const {
  useRef,
  useState,
} = require('ganic-usex');
const useGlobalInterval = require('./useGlobalInterval');

const useMotion = (value, timeBudget) => {
  const [current, setCurrent] = useState(value);

  const ref = useRef();
  if (ref.target !== value) {
    ref.startValue = current;
    ref.target = value;
    ref.startAt = Date.now();
  }

  const defaultInterval = 50;

  const timeout = timeBudget < defaultInterval;
  const approached = current === ref.target;
  const interval = approached ? null : defaultInterval;

  useGlobalInterval(() => {
    const timeSpent = Date.now() - ref.startAt;
    const timeLeft = timeBudget - timeSpent;
    if (timeLeft <= interval) {
      setCurrent(ref.target);
      return;
    }
    setCurrent(_current => {
      const diff = ref.target - ref.startValue;
      const times = timeBudget / interval;
      const approach = diff / times;
      return _current + approach;
    });
  }, interval);

  if (timeout && !approached) {
    setCurrent(ref.target);
  }

  return current;
};

module.exports = useMotion;
