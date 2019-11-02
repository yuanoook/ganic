'use strict';

const { live } = require('./src/Ganic');

const {
  attach,

  attachRef: useRef,
  attachMemo: useMemo,
  attachState: useState,
  attachEffect: useEffect,

  attachTimeout: useTimeout,
  attachInterval: useInterval,

  attachDebounce: useDebounce,
  attachThrottle: useThrottle,
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
