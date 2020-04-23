// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/093-double-pendulum.html
// https://youtu.be/uWzPe_S-RVE

import Ganic from 'ganic';
import { useMemo, useState, useInterval } from 'ganic-usex';
import useNumber from '../shared/useNumber';
import { keepInRange } from '../shared/utils';

const calculateAcceleration = ({
  r1,
  r2,
  a1,
  a2,
  a1_v,
  a2_v,
}) => {
  const g = 1;
  const m1 = 10;
  const m2 = 10;

  let num1 = -g * (2 * m1 + m2) * Math.sin(a1);
  let num2 = -m2 * g * Math.sin(a1 - 2 * a2);
  let num3 = -2 * Math.sin(a1 - a2) * m2;
  let num4 = a2_v * a2_v * r2 + a1_v * a1_v * r1 * Math.cos(a1 - a2);
  let den = r1 * (2 * m1 + m2 - m2 * Math.cos(2 * a1 - 2 * a2));
  let a1_a = (num1 + num2 + num3 * num4) / den;

  num1 = 2 * Math.sin(a1 - a2);
  num2 = (a1_v * a1_v * r1 * (m1 + m2));
  num3 = g * (m1 + m2) * Math.cos(a1);
  num4 = a2_v * a2_v * r2 * m2 * Math.cos(a1 - a2);
  den = r2 * (2 * m1 + m2 - m2 * Math.cos(2 * a1 - 2 * a2));
  let a2_a = (num1 * (num2 + num3 + num4)) / den;
  return [a1_a, a2_a];
};

const calculatePosition = ({
  r1,
  r2,
  a1,
  a2,
}) => {
  const x1 = r1 * Math.sin(a1);
  const y1 = r1 * Math.cos(a1);
  const x2 = x1 + r2 * Math.sin(a2);
  const y2 = y1 + r2 * Math.cos(a2);
  return [[x1, y1], [x2, y2]];
};

const tickPendulum = state => {
  const [a1_a, a2_a] = calculateAcceleration(state);
  const a1_v = state.a1_v + a1_a;
  const a2_v = state.a2_v + a2_a;
  const a1 = state.a1 + a1_v;
  const a2 = state.a2 + a2_v;
  // a1_v *= 0.9999;
  // a2_v *= 0.9999;
  return {
    ...state,
    a1_v,
    a2_v,
    a1,
    a2,
  };
};

const setUpCanvas = () => {
  const viewWidth = 520;
  const viewHeight = 520;
  const canvasWidth = 500;
  const canvasHeight = 500;
  const halfCanvasWidth = canvasWidth / 2;
  const halfCanvasHeight = canvasHeight / 2;
  const canvasOffset = {
    x: (viewWidth - canvasWidth) / 2,
    y: (viewHeight - canvasHeight) / 2,
  };
  return {
    viewWidth,
    viewHeight,
    canvasWidth,
    canvasHeight,
    halfCanvasWidth,
    halfCanvasHeight,
    canvasOffset,
  };
};

const DoublePendulum = () => {
  const {
    viewWidth,
    viewHeight,
    halfCanvasWidth,
    halfCanvasHeight,
    canvasOffset,
  } = useMemo(setUpCanvas);

  const [state, setState] = useState(() => ({
    r1: halfCanvasWidth / 2,
    r2: halfCanvasWidth / 2,
    a1: Math.PI / 2,
    a2: Math.PI / 2,
    a1_v: 0,
    a2_v: 0,
  }));
  const [[x1, y1], [x2, y2]] = calculatePosition(state);

  const [fps, FpsInput] = useNumber(30, 'ganic_demo__double_pendulum_fps');
  const fpsInRange = keepInRange(fps, 0, 100);
  const interval = !fpsInRange ? null : (1000 / fpsInRange);

  useInterval(() => {
    setState(tickPendulum);
  }, interval);

  const pendulums = `M${
    halfCanvasWidth
  },${
    halfCanvasHeight
  },${
    x1 + halfCanvasWidth
  },${
    y1 + halfCanvasHeight
  },${
    x2 + halfCanvasWidth
  },${
    y2 + halfCanvasHeight
  }`;

  const [trackMax, TrackMaxInput] = useNumber(1000, 'ganic_demo__double_pendulum_track_length');
  const track = useMemo([]);
  const newPoint = [Math.floor(x2 + halfCanvasWidth), Math.floor(y2 + halfCanvasHeight)].join();
  track.push(newPoint);
  if (track.length > trackMax) {
    track.splice(0, track.length - trackMax);
  }
  const trackPath = 'M' + track.join();

  return <>
    <br/>
    Speed <FpsInput value={fps} max={100} min={0}/>
    <br/>
    <br/>
    Track <TrackMaxInput value={trackMax} max={100000} min={0} step={100}/>
    <svg width={viewWidth} height={viewHeight} viewBox={`0 0 ${viewWidth} ${viewHeight}`} xmlns="http://www.w3.org/2000/svg">
      <g transform={`translate(${canvasOffset.x},${canvasOffset.y})`}>
        <circle cx={x1 + halfCanvasWidth} cy={y1 + halfCanvasHeight} r="5" fill="red" />
        <circle cx={x2 + halfCanvasWidth} cy={y2 + halfCanvasHeight} r="5" fill="red" />
        <path d={pendulums} stroke-width="2" stroke="red" fill="transparent" stroke-linecap="round"/>
        <path d={trackPath} stroke-width=".5" stroke="black" fill="transparent" stroke-linecap="round"/>
      </g>
    </svg>
  </>;
};

export default DoublePendulum;
