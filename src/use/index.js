'use strict';

const {
  useRef,
  useMemo,
  useState,
  useEffect,
} = require('./base');
const {useTimeout, useInterval} = require('./timer');
const {useDebounce, useThrottle} = require('./sloth');
const {useOrgan} = require('./async');

// TODO: Add useOrgan, usePigeon, usePromise

// const xResult = useOrgan(organism, props);
// const msg = usePigeon(PIGEON_NAME, {receiver: true});
// const sendMsg = usePigeon(PIGEON_NAME, {sender: true});

module.exports = {
  useRef,
  useMemo,
  useState,
  useEffect,

  useTimeout,
  useInterval,

  useDebounce,
  useThrottle,

  useOrgan,
};
