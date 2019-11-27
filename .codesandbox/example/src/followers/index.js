/* eslint-disable no-unused-vars */

import Ganic from "ganic";
import useMouse from '../shared/useMouse';
import useMotion from '../shared/useMotion';

const followerStyle = {
  position: 'fixed',
  width: '10px',
  height: '10px',
  background: 'blue',
  borderRadius: '100%',
};

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

const colors = ['blue', 'green', 'brown', 'red', 'yellow', 'purple', 'pink'];

const useMouseFollowers = n => {
  const {clientX, clientY} = useMouse();
  return Array(n).join().split(',')
    .reduce((prev, x, i) => {
      return [...prev, useFollower({
        clientX: prev[prev.length - 1][0].currentX,
        clientY: prev[prev.length - 1][0].currentY,
        delay: 300,
        background: colors[i % 7],
      })]
    }, [
      [{currentX: clientX, currentY: clientY}]
    ])
    .map(([pos, ui]) => ui)
    .filter(ui => !!ui);
};

const MouseFollowers = props => {
  const followers = useMouseFollowers(props && props.number || 70);

  return <div {...props}>
    { followers }
  </div>
};

export default MouseFollowers;