const {
  useRef,
  useMemo,
  useCallback,
  useState,
  useEffect,
} = require('./src/base');

const {useTimeout, useInterval} = require('./src/timer');
const {useDebounce, useThrottle} = require('./src/sloth');
const {useOrgan, usePromise} = require('./src/async');

module.exports = {
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
