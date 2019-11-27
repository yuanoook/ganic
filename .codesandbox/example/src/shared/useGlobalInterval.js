import { attach } from 'ganic';
import { useRef } from 'ganic-usex';

const runningIntervals = {};
const globalIntervalSet = new Set();

const getCallbacks = delay => {
  const callbackGroup = {};
  globalIntervalSet.forEach(ref => {
    callbackGroup[ref.delay] = callbackGroup[ref.delay] || [];
    callbackGroup[ref.delay].push(ref.callback); 
  });
  return delay ? callbackGroup[delay] : callbackGroup;
};

const callCallbacks = delay => {
  const callbacks = getCallbacks(delay);
  if (callbacks === undefined) {
    debugger;
  }
  callbacks.forEach(fn => {
    fn();
  });
}

const startUpInterval = ref => {
  globalIntervalSet.add(ref);
  const delay = ref.delay;
  if (!runningIntervals[delay]) {
    runningIntervals[delay] = setInterval(() => callCallbacks(delay), delay);
  }
};

const clearUpInterval = ref => {
  globalIntervalSet.delete(ref);
  if (ref.lastDelay) {
    const lastDelayCallbacks = getCallbacks(ref.lastDelay);
    if (!lastDelayCallbacks || !lastDelayCallbacks.length) {
      clearInterval(runningIntervals[ref.lastDelay]);
      runningIntervals[ref.lastDelay] = null;
    }
  }
};

const useGlobalInterval = (callback, delay) => {
  const ref = useRef();
  ref.callback = callback;
  attach(interval => {
    ref.lastDelay = ref.delay;
    ref.delay = interval;
    if (typeof interval !== 'number') {
      clearUpInterval(ref);
    } else {
      startUpInterval(ref);
    }
    return () => {
      clearUpInterval(ref);
    };
  }, delay);
};

export default useGlobalInterval;
