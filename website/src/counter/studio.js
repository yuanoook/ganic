/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */

import Ganic from 'ganic';
import {
  useMemo,
  useState,
  useOrgan,
  useInterval,
  useTimeout,
  useThrottle,
  useDebounce,
} from 'ganic-usex';
import { useStorage } from 'ganic-pandora';

import {
  Button,
  useSetter,
  usePositiveNumberSetter,
  xAcceleratorsOrganism,
  buttonStyle,
} from './utils';

export const Counter = () => {
  const [count, setCount] = useStorage('ganic_counter_app__count', 0);

  const [interval, setInterval] = useState(100);
  useInterval(useSetter(setCount, n => n + 1), interval);
  useTimeout(useSetter(setInterval, null), 3000);

  const [x, accelerators] = useOrgan(xAcceleratorsOrganism, 100000);
  const minus = usePositiveNumberSetter(setCount, n => n - x, x);
  const plus = useSetter(setCount, n => n + x, x);
  const ui = useMemo(
    () => (
      <>
        <h3>Adjust Items</h3>
        <Button onPress={plus} style={buttonStyle}>
          {`+${x}`}
        </Button>
        <Button onPress={minus} style={buttonStyle}>
          {`-${x}`}
        </Button>
        <h3>Accelerator</h3>
        {accelerators}
      </>
    ),
    x,
  );
  return [count, ui];
};

export const LazyUpdate = count => (
  <>
    <h3>Lazy Update</h3>
    <p>Throttle 1000ms: {useThrottle(count, 1000)}</p>
    <p>Throttle 2000ms: {useThrottle(count, 2000)}</p>
    <p>Debounce 3000ms: {useDebounce(count, 3000)}</p>
  </>
);
