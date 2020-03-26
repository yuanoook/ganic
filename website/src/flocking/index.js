import Ganic from 'ganic';
import { useMemo, useState, useEffect } from 'ganic-usex';
import { useGlobalInterval } from 'ganic-pandora';
import useNumber from '../shared/useNumber';
import Flock from './lab/Flock';
import Vector from './lab/Vector';
import Boid from './lab/Boid';

const maxNumber = 200;

const addBoid = (flock, x, y) => {
  flock.boids.push(new Boid(
    new Vector(0, 0),
    new Vector(Math.random() * 6 - 3, Math.random() * 6 - 3),
  ));
};

const getBoidsUI = boids => {
  const playgroundWidth = window.innerWidth;
  const halfWidth = playgroundWidth / 2;
  const playgroundHeight = window.innerHeight;
  const halfHeight = playgroundHeight / 2;
  const boidsUI = boids.map((boid, index) => {
    let x = boid.position.x;
    let y = boid.position.y;
    boid.position.x = (playgroundWidth + x + halfWidth) % playgroundWidth - halfWidth;
    boid.position.y = (playgroundHeight + y + halfHeight) % playgroundHeight - halfHeight;
    return <div style={{
      ...boidStyle,
      background: colors[index % colors.length],
      left: x + halfWidth + 'px',
      top: y + halfHeight + 'px',
    }}>
    </div>;
  });
  return boidsUI;
};

const colors = ['blue', 'green', 'brown', 'red', 'yellow', 'purple', 'pink'];
const boidStyle = {
  position: 'fixed',
  width: '10px',
  height: '10px',
  background: 'gray',
  borderRadius: '100%',
};

const Flocking = () => {
  const [number, Input] = useNumber(30, 'ganic_demo__flock_boids');
  const flock = useMemo(() => new Flock({
    boids: number,
  }));

  const [, tickRandom] = useState(0);
  useGlobalInterval(() => {
    flock.tick();
    tickRandom(Math.random());
  }, 1);

  useEffect(n => {
    while (n > flock.boids.length) {
      addBoid(flock);
    }
    while (n < flock.boids.length) {
      flock.boids.length--;
    }
  }, number);

  useEffect(() => () => {
    flock.boids.length = 0;
  });

  const boidsUI = getBoidsUI(flock.boids);

  return <>
    Boids <Input value={number} max={maxNumber} min={0}/>
    { boidsUI }
  </>;
};

export default Flocking;
