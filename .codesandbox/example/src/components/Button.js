/* eslint-disable no-unused-vars */

import Ganic from "ganic";
import usePress from "../shared/usePress";

const Button = ({
  onPress,
  children,
  onMouseDown: onMouseDownProp,
  onTouchStart: onTouchStartProp,
  ...others
}) => {
  const attachPress = usePress(onPress, 50);
  const onMouseDown = attachPress(onMouseDownProp);
  const onTouchStart = attachPress(onTouchStartProp);
  const props = {
    ...others,
    onMouseDown,
    onTouchStart,
  };
  return <button {...props}>{children}</button>;
};

export default Button;
