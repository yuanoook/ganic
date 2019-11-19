
const { create, attach, render } = require('./Ganic');

const {
  useRef,
  useMemo,
  useCallback,
  useState,
  useEffect,

  useTimeout,
  useInterval,

  useDebounce,
  useThrottle,

  useOrgan,
  usePromise,
} = require('./use');

const { Fragment, createElement } = require('./lab/JSXparser');

module.exports = {
  Fragment,
  createElement,

  create,
  render,

  // attach, to design useX - Composite Parasite Maker
  attach,

  // useX - Composite Parasite Maker, to design organism
  useRef,
  useMemo,
  useCallback,
  useState,
  useEffect,

  useTimeout,
  useInterval,

  useDebounce,
  useThrottle,

  useOrgan,
  usePromise,
};
