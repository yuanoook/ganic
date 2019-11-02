'use strict';

const {attach} = require('../Ganic');

const useRef = () => attach({});

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

const useState = initState => {
  return attach(stateParasitism, initState);
};

const useMemo = (fn, dependencies) => {
  const parasitism = (deps, give) => give(fn(deps));
  return attach(parasitism, dependencies);
};

const useEffect = (parasitism, deps) => {
  const toTakeDeps = deps !== undefined ? deps : Math.random();
  const toAttachParasitism = () => parasitism(deps);
  return attach(toAttachParasitism, toTakeDeps);
};

module.exports = {
  useRef,
  useState,
  useMemo,
  useEffect,
};
