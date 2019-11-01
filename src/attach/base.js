'use strict';

const {attach} = require('../Ganic');

const attachRef = () => attach({});

const stateParasitism = function(deps, give, parasite) {
  let state = deps;
  let setState = newState => {
    if (!setState) {
      return;
    }
    state = typeof newState === 'function' ? newState(state) : newState;
    give([state, setState, parasite]);
  };
  give([state, setState, parasite]);
  return () => {
    state = null;
    setState = null;
  };
};

const attachState = initState => {
  return attach(stateParasitism, initState);
};

const attachMemo = (fn, dependencies) => {
  const parasitism = (deps, give) => give(fn(deps));
  return attach(parasitism, dependencies);
};

const attachEffect = (parasitism, deps) => {
  const toTakeDeps = deps !== undefined ? deps : Math.random();
  const toAttachParasitism = () => parasitism(deps);
  return attach(toAttachParasitism, toTakeDeps);
};

module.exports = {
  attach,
  attachRef,
  attachState,
  attachMemo,
  attachEffect,
};
