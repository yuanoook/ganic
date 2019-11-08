'use strict';

const { create, attach, render } = require('./Ganic');

const {
  useRef,
  useMemo,
  useState,
  useEffect,

  useTimeout,
  useInterval,

  useDebounce,
  useThrottle,

  useOrgan,
  usePromise,
} = require('./use');

module.exports = {
  create,
  render,

  // attach, to design useX - Composite Parasite Maker
  attach,

  // useX - Composite Parasite Maker, to design organism
  useRef,
  useMemo,
  useState,
  useEffect,

  useTimeout,
  useInterval,

  useDebounce,
  useThrottle,

  useOrgan,
  usePromise,
};
