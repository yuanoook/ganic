/* eslint-disable no-unused-vars */

import Ganic from 'ganic';
import useMouse from '../shared/useMouse';
import useMotion from '../shared/useMotion';
import useBrowser from '../shared/useBrowser';
import useInput from '../shared/useInput';
import { useInterval, useState, useEffect } from 'ganic-usex';
import { makeArray, keepInRange } from '../shared/utils';

const followerStyle = {
  position: 'fixed',
  width: '10px',
  height: '10px',
  background: 'blue',
  borderRadius: '100%',
};

const colors = ['blue', 'green', 'brown', 'red', 'yellow', 'purple', 'pink'];

const useFollower = ({clientX, clientY, delay, background}) => {
  const currentX = useMotion(clientX, delay);
  const currentY = useMotion(clientY, delay);
  return [
    {currentX, currentY},
    <div style={{
      ...followerStyle,
      left: currentX,
      top: currentY,
      background: background || 'blue',
    }}></div>
  ];
};

const getWindowLocation = (topRate, leftRate) => ({
  clientX: window.innerWidth * topRate,
  clientY: window.innerHeight * leftRate,
});

const maxStep = 300;
const padding = maxStep / 6;

const moveLocation = ({clientX, clientY}) => {
  const diffLeft = (Math.random() - 0.5) * maxStep;
  const diffTop = (Math.random() - 0.5) * maxStep;
  return {
    clientX: keepInRange(clientX + diffTop, padding, window.innerWidth - padding),
    clientY: keepInRange(clientY + diffLeft, padding, window.innerHeight - padding),
  };
};

const useRandomLocation = interval => {
  const [location, setLocation] = useState(() => getWindowLocation(0.5, 0.5));
  useInterval(() => setLocation(moveLocation), interval);
  useEffect(({clientX, clientY}) => {
    if (clientX && clientY) {
      setLocation({clientX, clientY});
    }
  }, useMouse());
  return location;
}

let useMouseFollowers = n => {
  const {isMobile} = useBrowser();
  const delay = isMobile ? 3000 : 300;
  const {clientX, clientY} = useRandomLocation(1000);

  return makeArray(keepInRange(n - 1, 0, Infinity)).reduce((prev, x, i) => {
      return [...prev, useFollower({
        clientX: prev[prev.length - 1][0].currentX,
        clientY: prev[prev.length - 1][0].currentY,
        delay,
        background: colors[i % 7],
      })]
    }, [
      useFollower({
        clientX,
        clientY,
        delay,
        background: colors[colors.length - 1]
      })
    ])
    .map(([pos, ui]) => ui);
};

const MouseFollowers = props => {
  const {isMobile} = useBrowser();
  return useMouseFollowers(props && props.number || (isMobile ? 10 : 50));
};

const Followers = props => {
  const [number, Input] = useInput(10, 'ganic_demo__followers_number');

  return <div style={props && props.style}>
    <Input type='number' value={number}/>
    <MouseFollowers number={number}/>
  </div>
};

export default Followers;
