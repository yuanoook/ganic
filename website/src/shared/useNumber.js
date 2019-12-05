/* eslint-disable no-unused-vars */

import Ganic from 'ganic';
import { useCallback } from 'ganic-usex';
import useInput from './useInput';
import Button from '../components/Button';
import { keepInRange } from './utils'

const btnStyle = {
  border: '1px solid',
  borderColor: '#A9A9A9',
  height: '100%',
  minWidth: '2em',
};

const btnRadius = '3px';

const useNumber = (initValue, storageKey) => {
  const [number, Input, setNumber] = useInput(initValue, storageKey);

  const NumberInput = useCallback(props => {
    const {
      min = -Infinity,
      step = 1,
      max = Infinity,
      showStep = false,
      wrapperStyle,
      buttonStyle,
      buttonLeftStyle,
      buttonRightStyle,
      ...inputProps
    } = props || {};

    const plus = useCallback(() => setNumber(n => keepInRange(+n + +step, min, max)));
    const minus = useCallback(() => setNumber(n => keepInRange(n - step, min, max)));

    return <span style={{
      display: 'inline-block',
      height: '25px',
      ... wrapperStyle,
    }}>
      <Button style={{
        ... btnStyle,
        borderTopLeftRadius: btnRadius,
        borderBottomLeftRadius: btnRadius,
        borderRightColor: 'transparent',
        marginRight: '-1px',
        ... buttonStyle,
        ... buttonLeftStyle,
      }} onPress={minus}>-{showStep && step}</Button>
        <Input {...inputProps} min={min} max={max} step={step}/>
      <Button style={{
        ... btnStyle,
        borderTopRightRadius: btnRadius,
        borderBottomRightRadius: btnRadius,
        borderLeftColor: 'transparent',
        marginLeft: '-1px',
        ... buttonStyle,
        ... buttonRightStyle,
      }} onPress={plus}>+{showStep && step}</Button>
    </span>;
  });

  return [number, NumberInput];
};

export default useNumber;
