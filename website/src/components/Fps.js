/* eslint-disable no-unused-vars */

import Ganic from "ganic";
import { useThrottle, useOrgan } from "ganic-usex";
import useFPS from '../shared/useFPS';
import Progress from './Progress';

const Display = ({style, fps}) => (
  <div style={style}>
    <Progress value={fps} prefix='FPS' postfix={fps}/>
  </div>
);

const Fps = props => {
  const fps = useThrottle(useFPS(), props && props.ms || 100);
  return <Display style={props && props.style} fps={fps}/>
}

export default Fps;
