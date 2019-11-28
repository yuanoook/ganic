/* eslint-disable no-unused-vars */

import Ganic from 'ganic';
import useMouse from '../shared/useMouse';
import useMotion from '../shared/useMotion';
import useBrowser from '../shared/useBrowser';
import { useInterval, useState, useEffect, useThrottle } from 'ganic-usex';

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
      top: currentY,
      left: currentX,
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
const keepInRange = (n, min, max) => Math.max(min, Math.min(max, n));

const moveLocation = ({clientX, clientY}) => {
  const diffTop = (Math.random() - 0.5) * maxStep;
  const diffLeft = (Math.random() - 0.5) * maxStep;
  return {
    clientX: keepInRange(clientX + diffTop, padding, window.innerHeight - padding),
    clientY: keepInRange(clientY + diffLeft, padding, window.innerWidth - padding),
  };
};

const useRandomLocation = interval => {
  const [location, setLocation] = useState(() => getWindowLocation(0.5, 0.5));
  useInterval(() => setLocation(moveLocation), interval);

  // useEffect(({clientX, clientY}) => {
  //   if (clientX && clientY) {
  //     setLocation({clientX, clientY});
  //   }
  // }, useMouse());

  return location;
}

const useMouseFollowers = n => {
  const {isMobile} = useBrowser();
  const delay = isMobile ? 3000 : 300;
  const {clientX, clientY} = useRandomLocation(100);

  return Array(n).join().split(',')
    .reduce((prev, x, i) => {
      return [...prev, useFollower({
        clientX: prev[prev.length - 1][0].currentX,
        clientY: prev[prev.length - 1][0].currentY,
        delay,
        background: colors[i % 7],
      })]
    }, [
      [{currentX: clientX, currentY: clientY}]
    ])
    .map(([pos, ui]) => ui)
    .filter(ui => !!ui);
};

const MouseFollowers = props => {
  const {isMobile} = useBrowser();
  const followers = useMouseFollowers(props && props.number || (isMobile ? 10 : 50));

  return <div {...props}>
    { followers }
  </div>
};

export default MouseFollowers;
