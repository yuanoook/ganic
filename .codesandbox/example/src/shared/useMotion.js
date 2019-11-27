import { attach } from 'ganic';
import {
  useRef,
  useInitialState,
} from 'ganic-usex';
import useGlobalInterval from '../shared/useGlobalInterval';

const useMotion = (value, timeBudget) => {
  const [current, setCurrent] = useInitialState(value);

  const ref = useRef();
  if (ref.target !== value) {
    ref.startValue = current;
    ref.target = value;
    ref.startAt = Date.now();
  }

  const defaultInterval = 40;
  const approached = timeBudget < defaultInterval || current === ref.target;
  const interval = approached ? null : defaultInterval;

  let approach;
  if (!approached) {
    const diff = ref.target - ref.startValue;
    const times = timeBudget / interval;
    approach = diff / times;
  }

  useGlobalInterval(() => {
    const timeSpent = Date.now() - ref.startAt;
    const timeLeft = timeBudget - timeSpent;
    if (timeLeft <= interval) {
      setCurrent(ref.target);
      return;
    }
    setCurrent(current => current + approach);
  }, interval);

  return approached ? value : current;
}

export default useMotion;
