/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */

import Ganic from 'ganic';
import { useCallback, useRef } from 'ganic-usex';
import useStorage from './useStorage';

const useInputRadios = (radioMap, initValue = '', storageKey) => {
  const [value, setValue] = useStorage(storageKey, initValue);

  const Radios = useCallback(props => {
    const {
      value,
      onChange: onChangeProp,
      ...attrs
    } = props || {};
    const type = 'radio';

    const wrapSetValue = fn => e => {
      const value = e.target.value;
      setValue(type === 'number' ? + value : value);
      if (typeof fn === 'function') {
        fn(e);
      }
    };
    const onChange = wrapSetValue(onChangeProp);

    const toApplyProps = {
      type,
      ...attrs,
      onChange,
    };

    return Object.keys(radioMap).map((key, index) =>
      <label key={key}>
        { index ? <>&nbsp; &nbsp;</> : null }
        <input {...toApplyProps} value={key} checked={key === value}/>
        &nbsp; {radioMap[key]}
      </label>
    );
  });

  return [value, Radios, setValue];
};

export default useInputRadios;
