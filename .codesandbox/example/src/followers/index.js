/* eslint-disable no-unused-vars */

import Ganic from "ganic";
import {
  useRef,
  useCallback,
  useInitialState,
  useInterval,
  useEffect,
} from "ganic-usex";

const useMotion = (value, delay) => {
  const [current, setCurrent] = useInitialState(value);

  const ref = useRef();
  if (ref.target !== value) {
    ref.startValue = current;
    ref.target = value;
    ref.startAt = Date.now();
  }

  const defaultInterval = 16;
  const approached = delay < defaultInterval || current === ref.target;
  const interval = approached ? null : defaultInterval;

  let approach;
  if (!approached) {
    const diff = ref.target - ref.startValue;
    const times = delay / interval;
    approach = diff / times;
  }

  useInterval(() => {
    const timeSpent = Date.now() - ref.startAt;
    const timeLeft = delay - timeSpent;
    if (timeLeft <= interval) {
      setCurrent(ref.target);
      return;
    }
    setCurrent(current => current + approach);
  }, interval);

  return approached ? value : current;
}

const useMouse = () => {
  const [position, setPosition] = useInitialState({clientX: 0, clientY: 0});
  const mouseTracker = useCallback(
    ({clientX, clientY}) => setPosition({clientX: clientX + 1, clientY: clientY + 1})
  );
  useEffect(() => {
    document.addEventListener('mousemove', mouseTracker);
    document.addEventListener('touchstart', mouseTracker);
    return () => {
      document.removeEventListener('mousemove', mouseTracker);
      document.removeEventListener('touchstart', mouseTracker);
    }
  });
  return position;
}

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
  const followers = useMouseFollowers(props && props.number || 7);

  return <div {...props}>
    { followers }
  </div>
};

export default MouseFollowers;
