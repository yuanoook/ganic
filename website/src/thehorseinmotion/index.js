/* eslint-disable no-unused-vars */

import Ganic from 'ganic';
import { useState, useInterval } from 'ganic-usex';
import useNumber from '../shared/useNumber';

const style = {
  width: '216px',
  height: '150px',
  backgroundImage: 'url(./images/Eadweard_Muybridge-Sallie_Gardner_1878.jpg)',
  backgroundPosition: `-63px -32px`
};

const frames = [
  '-63px -32px',
  '-291px -30px',
  '-523px -28px',
  '-753px -28px',

  '-64px -191px',
  '-292px -189px',
  '-522px -189px',
  '-752px -187px',

  '-65px -346px',
  '-292px -346px',
  '-522px -346px',
  // '-752px -347px',
];

const TheHorseInMotion = () => {
  const [frameIndex, setFrameIndex] = useState(0);
  const [fps, FpsInput] = useNumber(11, 'ganic_demo__the_horse_in_motion_fps');
  const interval = !fps ? null : (1000 / fps);

  useInterval(() => {
    setFrameIndex(frameIndex => (frameIndex + 1) % frames.length);
  }, interval);

  return <>
    <h2>The Horse In Motion</h2>
    <p>1878 by Eadweard Muybridge</p>
    <p>
      <a target='_blank' href='https://en.wikipedia.org/wiki/The_Horse_in_Motion'>
        The first movie in the history
      </a>
    </p>
    <div style={{
      ...style,
      backgroundPosition: frames[frameIndex],
    }}></div>
    <br/>
    <p>
      Speed <FpsInput value={fps} max={24} min={0}/> FPS
    </p>
  </>;
};

export default TheHorseInMotion;
