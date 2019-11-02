'use strict';

const {
  attach,

  useRef,
  useMemo,
  useState,
  useEffect,
} = require('./base');

const {useTimeout, useInterval} = require('./time');

const {useDebounce, useThrottle} = require('./times');

module.exports = {
  attach,

  useRef,
  useMemo,
  useState,
  useEffect,

  useTimeout,
  useInterval,

  useDebounce,
  useThrottle,
};
