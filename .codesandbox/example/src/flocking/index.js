import Ganic from 'ganic';
import { useMemo, useState, useEffect } from 'ganic-usex';
import useClick from '../shared/useClick';
import useGlobalInterval from '../shared/useGlobalInterval';
import Flock from './lab/Flock';
import Vector from './lab/Vector';
import Boid from './lab/Boid';

const maxNumber = 200;

const addBoid = (flock, x, y) => {
  flock.boids.push(new Boid(
    new Vector(
      x || window.innerWidth * Math.random(),
      y || window.innerHeight * Math.random(),
    ),
    new Vector(Math.random() * 6 - 3, Math.random() * 6 - 3)
  ));
};

const useBoids = () => {
  const flock = useMemo(() => new Flock({
    boids: 100,
  }));
  const [boids, setBoids] = useState(() => flock.boids);
  useGlobalInterval(() => {
    flock.tick();
    setBoids([...flock.boids]);
  }, 1);

  useEffect(({clientX, clientY}) => {
    if (flock.boids.length < maxNumber) {
      addBoid(flock, clientX - window.innerWidth / 2, clientY - window.innerHeight / 2);
    }
  }, useClick());

  return boids;
}

const colors = ['blue', 'green', 'brown', 'red', 'yellow', 'purple', 'pink'];
const boidStyle = {
  position: 'fixed',
  width: '10px',
  height: '10px',
  background: 'gray',
  borderRadius: '100%',
};

const Flocking = () => {
  const boids = useBoids();
  const playgroundWidth = window.innerWidth;
  const halfWidth = playgroundWidth / 2;
  const playgroundHeight = window.innerHeight;
  const halfHeight = playgroundHeight / 2;

  return boids.map((boid, index) => {
    let x = boid.position.x;
    let y = boid.position.y;
    boid.position.x = (playgroundWidth + x + halfHeight) % playgroundWidth - halfHeight;
    boid.position.y = (playgroundHeight + y + halfWidth) % playgroundHeight - halfWidth;
    return <div style={{
      ...boidStyle,
      background: colors[index % colors.length],
      left: x + halfWidth + 'px',
      top: y + halfHeight + 'px',
    }}>
    </div>;
  });
}

export default Flocking;
