const { attach } = require('ganic');
const shallowEqual = require('../../shared/shallowEqual');

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

const stateParasitism = function(deps, give) {
  let state = deps;
  let setState = newState => {
    if (!setState) {
      return;
    }
    const evalNewState = typeof newState === 'function' ? newState(state) : newState;
    if (shallowEqual(evalNewState, state)) {
      return;
    }
    state = evalNewState;
    give([state, setState]);
  };
  give([state, setState]);
  return () => {
    state = null;
    setState = null;
  };
};

const useState = initState => attach(stateParasitism, useMemo(initState));

const useEffect = (parasitism, dependencies) =>
  attach(deps => {
    const toDetach = parasitism(deps);
    return () => {
      if (typeof toDetach === 'function') {
        toDetach();
      }
    };
  }, dependencies);

module.exports = {
  useRef,
  useMemo,
  useCallback,
  useState,
  useEffect,
};
