/* eslint-disable no-unused-vars */

import Ganic from 'ganic';
import { useThrottle, useOrgan } from 'ganic-usex';
import { useFPS } from 'ganic-pandora';
import Progress from './Progress';

const Display = ({style, fps}) => (
  <div style={{display: 'inline-block', ...style}}>
    <Progress value={fps} prefix='FPS' postfix={fps} style={{width: '100%'}}/>
  </div>
);

const Fps = props => {
  const fps = useThrottle(useFPS(), props && props.ms || 100);
  return <Display style={props && props.style} fps={fps}/>
}

export default Fps;
