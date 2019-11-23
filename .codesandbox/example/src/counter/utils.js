/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */

import Ganic, { attach } from "ganic";
import {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useInterval,
  useThrottle
} from "ganic-usex";

import useStorage from "../shared/useStorage";

const mouseUpEffect = mouseup => {
  document.documentElement.addEventListener("mouseup", mouseup);
  document.documentElement.addEventListener("touchend", mouseup);
  return () => {
    document.documentElement.removeEventListener("mouseup", mouseup);
    document.documentElement.removeEventListener("touchend", mouseup);
  };
};
const useMouseUp = fn => useEffect(mouseUpEffect, fn);

export const useSetter = (set, value, deps) =>
  useCallback(() => set(value), deps);
export const usePositiveNumberSetter = (set, fn, deps) =>
  useSetter(set, n => Math.max(fn(n), 0), deps);

export const Button = ({ onPress, children, ...others }) => {
  const [interval, setInterval] = useState(null);
  const onMousedown = useSetter(setInterval, 50);
  useMouseUp(useSetter(setInterval, null));
  useInterval(onPress, interval);
  const props = {
    ...others,
    onMousedown,
    onTouchstart: onMousedown
  };
  return <button {...props}>{children}</button>;
};

const makeItem = i => {
  const color = `rgb(${i % 255},${(i * 2) % 255},${(i * 3) % 255})`;
  return (
    <p style={{ color }} key={i}>
      {i + 1}
    </p>
  );
};

const makeList = (start, length) => {
  const list = [];
  for (let i = 0; i < length; i++) {
    list.push(makeItem(i + start));
  }
  return list;
};

const chunkBack = (arr, size) => {
  let r = [];
  for (let i = arr.length; i > -1; i -= size)
    r.unshift(arr.slice(Math.max(i - size, 0), Math.max(0, i)));
  return r;
};

const numbersParasitism = (size, give, { handover: list = [] }) => {
  if (size > list.length) {
    list = makeList(list.length, size - list.length)
      .reverse()
      .concat(list);
  } else if (size < list.length) {
    list = list.slice(list.length - size);
  }
  give(list);
  return ({ ending = false }) => {
    if (ending) {
      list = null;
    } else {
      return list;
    }
  };
};

export const buttonStyle = {
  fontSize: "30px",
  padding: "20px",
  borderRadius: "5px",
  margin: "10px",
  userSelect: "none"
};

const smallBtnStyle = {
  ...buttonStyle,
  padding: "10px"
};

export const xAcceleratorsOrganism = initX => {
  let [x, setX] = useStorage("ganic_counter_app__x", initX);
  const accelerators = [1, 10, 100].map(i => {
    const minusX = usePositiveNumberSetter(setX, x => x - i, i);
    const plusX = useSetter(setX, x => x + i, i);
    return (
      <>
        <Button onPress={minusX} style={smallBtnStyle}>
          - {i}
        </Button>
        <Button onPress={plusX} style={smallBtnStyle}>
          + {i}
        </Button>
        <br />
      </>
    );
  });
  return [x, accelerators];
};

export const useSuperLongList = (count, chunkSize, delay) => {
  const numbers = attach(numbersParasitism, count);
  const list = useMemo(
    () =>
      chunkBack(numbers, chunkSize).map((items, index, arr) => (
        <div key={arr.length - index}>{items}</div>
      )),
    useThrottle(count, delay)
  );

  return (
    <div
      style={{
        height: "100px",
        overflow: "auto",
        background: "lightgray"
      }}
    >
      <h2>Super Long List (Items: {count})</h2>
      {list}
    </div>
  );
};
