/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */

import Ganic from "ganic";
import { useCallback } from "ganic-usex";
import useStorage from "./useStorage";

const useInput = (initValue = "", storageKey) => {
  const [value, setValue] = useStorage(storageKey, initValue);

  const Input = useCallback(props => {
    const {
      onInput: onInputProp,
      onChange: onChangeProp,
      onKeyup: onKeyupProp,
      onEnter,
      ...attrs
    } = props || {};
    const type = attrs && attrs.type || 'text';

    const wrapSetValue = fn => e => {
      const value = e.target.value;
      setValue(type === 'number' ? + value : value);
      if (typeof fn === "function") {
        fn(e);
      }
    };

    const onInput = wrapSetValue(onInputProp);
    const onChange = wrapSetValue(onChangeProp);

    const onKeyup = e => {
      if (typeof onKeyupProp === "function") {
        onKeyupProp(e);
      }
      if (e.keyCode === 13 && typeof onEnter === "function") {
        onEnter(e);
      }
    };
    const toApplyProps = {
      type,
      defaultValue: value,
      ...attrs,
      onKeyup,
      onInput,
      onChange,
    };
    return <input {...toApplyProps} />;
  });

  return [value, Input, setValue];
};

export default useInput;
