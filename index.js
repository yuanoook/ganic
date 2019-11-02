'use strict';

const { live } = require('./src/Ganic');

const {
  attach,

  useRef: useRef,
  useMemo: useMemo,
  useState: useState,
  useEffect: useEffect,

  useTimeout: useTimeout,
  useInterval: useInterval,

  useDebounce: useDebounce,
  useThrottle: useThrottle,
} = require('./src/attach');

module.exports = {
  live,

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
};
