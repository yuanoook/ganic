/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */

import Ganic from 'ganic';
import {
  useState,
  useCallback,
  useInterval,
} from 'ganic-usex';

import useStorage from '../shared/useStorage';
import useMouseUp from '../shared/useMouseUp';

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
    onTouchstart: onMousedown,
  };
  return <button {...props}>{children}</button>;
};

export const buttonStyle = {
  fontSize: '20px',
  padding: '6px',
  borderRadius: '5px',
  margin: '5px',
  userSelect: 'none',
};

export const xAcceleratorsOrganism = initX => {
  let [x, setX] = useStorage('ganic_counter_app__x', initX);
  const accelerators = [1, 10, 100, 1000, 10000, 100000, 1000000, 10000000].reverse().map(i => {
    const minusX = usePositiveNumberSetter(setX, x => x - i, i);
    const plusX = useSetter(setX, x => x + i, i);
    return (
      <>
        <Button onPress={plusX} style={buttonStyle}>
          + {i}
        </Button>
        <Button onPress={minusX} style={buttonStyle}>
          - {i}
        </Button>
        <br />
      </>
    );
  });
  return [x, accelerators];
};
