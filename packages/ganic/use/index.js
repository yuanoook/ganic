
const {
  useRef,
  useMemo,
  useCallback,
  useState,
  useEffect,
} = require('./base');
const {useTimeout, useInterval} = require('./timer');
const {useDebounce, useThrottle} = require('./sloth');
const {useOrgan, usePromise} = require('./async');

// TODO: Add usePigeon

// const msg = usePigeon(PIGEON_NAME, {receiver: true, filter});
// const sendMsg = usePigeon(PIGEON_NAME, {sender: true});

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
