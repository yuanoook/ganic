const { attach } = require('ganic');
const shallowEqual = require('../../shared/shallowEqual');

const useMemo = (fn, dependencies) => {
  if (typeof fn !== 'function') {
    return attach(fn, dependencies);
  }
  const parasitism = (deps, give) => give(fn(deps));
  return attach(parasitism, dependencies);
};

const simpleRef = () => useMemo(() => {
  const fn = value => (fn.current = value);
  fn.current = null;
  return fn;
});

const proxyRef = () => useMemo(() => {
  const __curr = Symbol();
  const fn = value => (fn[__curr] = value);
  fn[__curr] = null;

  return new Proxy(fn, {
    get: function(_, property) {
      return _[__curr] && _[__curr][property];
    },
    set: function(_, property, value) {
      if (_[__curr]) {
        _[__curr][property] = value;
      } else {
        console.warn(`Proxy ref is not ready for ${property}!`);
      }
      return true;
    },
  });
});

const useRef = (proxy = false) => proxy ? proxyRef() : simpleRef();

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
  useMemo,
  useRef,
  useCallback,
  useState,
  useEffect,
};
