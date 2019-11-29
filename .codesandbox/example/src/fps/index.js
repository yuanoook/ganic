/* eslint-disable no-unused-vars */

import Ganic from "ganic";
import { useThrottle, useOrgan } from "ganic-usex";
import useFPS from '../shared/useFPS';
import Progress from '../components/Progress';

const Display = ({wrapperProps, fps}) => (
  <div {...wrapperProps}>
    <Progress value={fps} prefix='FPS' postfix={fps}/>
  </div>
);

const Fps = props => {
  const fps = useThrottle(useFPS(), 50);
  return <Display wrapperProps={props} fps={fps}/>
}

export default Fps;
