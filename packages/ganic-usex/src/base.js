const { attach } = require('ganic');

const useRef = () => useMemo(() => {
  const fn = value => (fn.current = value);
  fn.current = null;
  return fn;
});

const useMemo = (fn, dependencies) => {
  if (typeof fn !== 'function') {
    return attach(fn, dependencies);
  }
  const parasitism = (deps, give) => give(fn(deps));
  return attach(parasitism, dependencies);
};

const useCallback = (fn, dependencies) =>
  useMemo(deps => (...args) => fn(...args, deps), dependencies);

const useInitialValue = x =>
  typeof x === 'function' ? useCallback(x) : useMemo(x);

const stateParasitism = function(deps, give) {
  let state = deps;
  let setState = newState => {
    if (!setState) {
      return;
    }
    state = typeof newState === 'function' ? newState(state) : newState;
    give([state, setState]);
  };
  give([state, setState]);
  return () => {
    state = null;
    setState = null;
  };
};

const useState = initState => attach(stateParasitism, initState);

const useInitialState = initState =>
  attach(stateParasitism, useInitialValue(initState));

const useEffect = (parasitism, dependencies) =>
  attach(deps => {
    const toDetach = parasitism(deps);
    return () => {
      toDetach();
    };
  }, dependencies);

module.exports = {
  useRef,
  useMemo,
  useCallback,
  useState,
  useEffect,

  useInitialValue,
  useInitialState,
};
