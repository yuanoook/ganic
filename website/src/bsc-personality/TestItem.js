/* eslint-disable no-unused-vars */

import Ganic from "ganic";
import useInputRadios from '../shared/useInputRadios';

const TestItem = ({
  name,
  left,
  right,
  style
}) => {
  const [value, Radios] = useInputRadios({
    '-2': '',
    '-1': '',
    '0': '',
    '1': '',
    '2': '',
  }, 'male', `bsc-personal-test-item-${name}`);

  return <span style={{
    border: '1px solid',
    padding: '3px 5px 0px',
    display: 'inline-block',
    ...style
  }}>
    {left} &nbsp;&nbsp;
    <Radios value={ value }/>
    &nbsp; {right}
  </span>
}

export default TestItem;
