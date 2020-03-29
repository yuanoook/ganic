/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */

import Ganic from 'ganic';
import { useCallback } from 'ganic-usex';

import { getPrimeFactors, formatNumber } from '../shared/utils';
import PowerList from '../components/PowerList';

const Factors = ({ num }) => {
  const factors = getPrimeFactors(num).map(
    (x, index) => (<>
      {index ? ` * ` : `= `}
      <i>{x}</i>
    </>),
  );
  return <div>{ factors.length > 1 ? factors : `is a prime number` }</div>;
};

const itemStyle = {
  fontSize: '2em',
  lineHeight: '1',
  padding: '5px',
  marginBottom: '10px',
};

const Item = ({ num: i }) => {
  const color = `rgb(${
    (i * 23) % 255
  },${
    (i * 29) % 255
  },${
    (i * 31) % 255
  })`;

  return <div style={{ ...itemStyle, color }}>
    <b>{ i }</b>
    <Factors num={i}/>
  </div>;
};

const SuperLongList = ({ length }) => {
  const render = useCallback(
    (i, length) => [length - i, <Item num={length - i}/>],
  length);

  return <>
    <h2>Super Long List</h2>
    <h4>Items: {formatNumber(length)}</h4>
    <div
      style={{
        overflow: 'auto',
        border: '1px solid lightgray',
        maxHeight: 'calc(100vh - 230px)',
      }}
    >
      <PowerList length={length} render={render}/>
    </div>
  </>;
};

export default SuperLongList;
