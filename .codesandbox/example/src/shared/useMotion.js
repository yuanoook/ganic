import {
  useRef,
  useState,
} from 'ganic-usex';
import useGlobalInterval from '../shared/useGlobalInterval';
import useBrowser from '../shared/useBrowser';

const useMotion = (value, timeBudget) => {
  const [current, setCurrent] = useState(value);

  const ref = useRef();
  if (ref.target !== value) {
    ref.startValue = current;
    ref.target = value;
    ref.startAt = Date.now();
  }

  const { isMobile, isIE } = useBrowser();
  const defaultInterval = (isMobile || isIE) ? 100 : 50;

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
    setCurrent(current => {
      const diff = ref.target - ref.startValue;
      const times = timeBudget / interval;
      const approach = diff / times;
      return current + approach;
    });
  }, interval);

  if (timeout && !approached) {
    setCurrent(ref.target);
  }

  return current;
}

export default useMotion;
