'use strict';

const { live } = require('./src/Ganic');

const {
  attach,

  attachRef,
  attachMemo,
  attachState,
  attachEffect,

  attachTimeout,
  attachInterval,

  attachDebounce,
  attachThrottle,
} = require('./src/attach');

module.exports = {
  live,
  // alias use*=attach*
  use: attach,

  useRef: attachRef,
  useMemo: attachMemo,
  useState: attachState,
  useEffect: attachEffect,

  useTimeout: attachTimeout,
  useInterval: attachInterval,

  useDebounce: attachDebounce,
  useThrottle: attachThrottle,
};
