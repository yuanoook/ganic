/* eslint-disable no-unused-vars */

import Ganic from 'ganic';
import { useState } from 'ganic-usex';

const listeners = new Set;
const wakeListeners = fps => {
  listeners.forEach(fn => fn(fps));
};

let running = false;
const runFPSChecker = () => {
  let be = Date.now(), fps=0;
  const loop = () => {
    if (!listeners.size) {
      running = false;
      return;
    }
    running = true;
    const now = Date.now();
    fps = Math.round(1000 / (now - be));
    be = now;
    requestAnimationFrame(loop);
    if (fps <= 60) {
      wakeListeners(fps);
    }
  };
  requestAnimationFrame(loop);
}

const requestFPS = fn => {
  listeners.add(fn);
  if (running) {
    return;
  }
  runFPSChecker();
}

const useFPS = () => {
  const [fps, setFPS] = useState(0);
  requestFPS(setFPS);
  return fps;
}

export default useFPS;
