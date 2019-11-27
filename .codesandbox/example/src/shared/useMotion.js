import {
  useRef,
  useInitialState,
  useInterval,
} from "ganic-usex";

const useMotion = (value, delay) => {
  const [current, setCurrent] = useInitialState(value);

  const ref = useRef();
  if (ref.target !== value) {
    ref.startValue = current;
    ref.target = value;
    ref.startAt = Date.now();
  }

  const defaultInterval = 16;
  const approached = delay < defaultInterval || current === ref.target;
  const interval = approached ? null : defaultInterval;

  let approach;
  if (!approached) {
    const diff = ref.target - ref.startValue;
    const times = delay / interval;
    approach = diff / times;
  }

  useInterval(() => {
    const timeSpent = Date.now() - ref.startAt;
    const timeLeft = delay - timeSpent;
    if (timeLeft <= interval) {
      setCurrent(ref.target);
      return;
    }
    setCurrent(current => current + approach);
  }, interval);

  return approached ? value : current;
}

export default useMotion;
