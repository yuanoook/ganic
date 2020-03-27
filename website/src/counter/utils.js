/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */

import Ganic from 'ganic';
import {
  useState,
  useMemo,
  useCallback,
  useInterval,
} from 'ganic-usex';
import range from 'lodash.range';
import chunk from 'lodash.chunk';

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
  fontSize: '30px',
  padding: '20px',
  borderRadius: '5px',
  margin: '10px',
  userSelect: 'none',
};

const smallBtnStyle = {
  ...buttonStyle,
  padding: '10px',
};

export const xAcceleratorsOrganism = initX => {
  let [x, setX] = useStorage('ganic_counter_app__x', initX);
  const accelerators = [1, 10, 100, 1000, 10000, 100000].map(i => {
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

const Item = ({ num: i }) => {
  const color = `rgb(${(i * 10) % 255},${(i * 20) % 255},${(i * 30) % 255})`;
  return <p style={{ color }}>{ i }</p>;
};

const List = ({ numbers }) => {
  return <div>{ numbers.map(num => <Item key={num} num={num}/>) }</div>;
};

const ChunkList = ({ numbers, size = 10 }) => {
  if (numbers.length <= size) {
    return <List numbers={numbers}/>;
  }
  const chunks = chunk(numbers, Math.floor(numbers.length / size));
  const list = chunks.map(nums => <ChunkList numbers={nums} size={size}/>);
  return <div>{list}</div>;
};

export const useSuperLongList = (count) => {
  const numbers = useMemo(total => range(total, 0, -1), count);
  return (
    <div
      style={{
        height: '150px',
        overflow: 'auto',
        background: 'lightgray',
      }}
    >
      <h2>Super Long List (Items: {count})</h2>
      <ChunkList numbers={numbers}/>
    </div>
  );
};
