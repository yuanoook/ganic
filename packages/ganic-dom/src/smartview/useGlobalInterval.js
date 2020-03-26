const { attach } = require('ganic');
const { useRef } = require('ganic-usex');

const runningIntervals = {};
const intervalRefSets = {};

const removeRefLastDelay = ref => {
  if (intervalRefSets[ref.lastDelay]) {
    intervalRefSets[ref.lastDelay].delete(ref);
  }
};

const removeRefDelay = ref => {
  if (intervalRefSets[ref.delay]) {
    intervalRefSets[ref.delay].delete(ref);
  }
};

const addRef = ref => {
  removeRefLastDelay(ref);
  const delay = ref.delay;
  if (typeof delay === 'number') {
    if (intervalRefSets[delay]) {
      intervalRefSets[delay].add(ref);
    } else {
      intervalRefSets[delay] = new Set([ref]);
    }
    if (!runningIntervals[delay]) {
      runningIntervals[delay] = setInterval(() => callRefs(delay), delay);
    }
  }
};

const getRefSet = delay => intervalRefSets[delay];
const callRefs = delay => {
  const refSet = getRefSet(delay);
  if (!refSet || !refSet.size) {
    clearInterval(runningIntervals[delay]);
    runningIntervals[delay] = null;
    intervalRefSets[delay] = null;
    return;
  }
  refSet.forEach(ref => {
    ref.callback();
  });
};

const useGlobalInterval = (callback, delay) => {
  const ref = useRef();
  ref.callback = callback;
  attach(interval => {
    ref.lastDelay = ref.delay;
    ref.delay = interval;
    addRef(ref);
    return () => {
      removeRefDelay(ref);
    };
  }, delay);
};

module.exports = useGlobalInterval;
