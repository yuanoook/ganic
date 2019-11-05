'use strict';

const { create, attach } = require('./src/Ganic');

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
} = require('./src/use');

module.exports = {
  // create an organSet from organSetDescription
  create,

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
