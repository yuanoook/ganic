/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */

import Ganic from "ganic";
import { useCallback, useInitialValue, useInitialState } from "ganic-usex";
import useStorage from "./useStorage";

const useInput = (initValue = "", storageKey) => {
  const [value, setValue] = useInitialValue(storageKey)
    ? useStorage(storageKey, initValue)
    : useInitialState(initValue);

  const Input = useCallback(props => {
    const { onInput: onInputProp, onKeyup: onKeyupProp, onEnter, ...attrs } =
      props || {};
    const onInput = e => {
      setValue(e.target.value);
      if (typeof onInputProp === "function") {
        onInputProp(e);
      }
    };
    const onKeyup = e => {
      if (typeof onKeyupProp === "function") {
        onKeyupProp(e);
      }
      if (e.keyCode === 13 && typeof onEnter === "function") {
        onEnter(e);
      }
    };
    const toApplyProps = {
      type: "text",
      ...attrs,
      onKeyup,
      onInput
    };
    return <input {...toApplyProps} />;
  });

  return [value, Input, setValue];
};

export default useInput;
