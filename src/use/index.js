'use strict';

const {
  useRef,
  useMemo,
  useState,
  useEffect,
} = require('./base');
const {useTimeout, useInterval} = require('./timer');
const {useDebounce, useThrottle} = require('./sloth');

module.exports = {
  useRef,
  useMemo,
  useState,
  useEffect,

  useTimeout,
  useInterval,

  useDebounce,
  useThrottle,
};
