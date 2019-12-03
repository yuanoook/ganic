import {
  useState,
  useInterval,
  useCallback,
} from 'ganic-usex';
import useMouseUp from "./useMouseUp";

const usePress = (onPress, interlude = 1) => {
  const [interval, setInterval] = useState(null);
  useInterval(onPress, interval);
  useMouseUp(() => {
    setInterval(null);
  });
  const attachPress = useCallback(fn => e => {
    setInterval(interlude);
    if (typeof fn === "function") {
      fn(e);
    }
  });
  return attachPress;
};

export default usePress;
