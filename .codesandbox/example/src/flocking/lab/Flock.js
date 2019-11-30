// Copied from https://github.com/anoopelias/boids

import Vector from './Vector';
import Boid from './Boid';

function Flock(opts) {
  opts = opts || {};

  this.speedLimit = opts.speedLimit || 1;
  this.accelerationLimit = opts.accelerationLimit || 0.03;
  this.separationDistance = opts.separationDistance || 30;
  this.separationDistanceSq = Math.pow(this.separationDistance, 2);
  this.alignmentDistance = opts.alignmentDistance || 60;
  this.alignmentDistanceSq = Math.pow(this.alignmentDistance, 2);
  this.cohesionDistance = opts.cohesionDistance || 60;
  this.cohesionDistanceSq = Math.pow(this.cohesionDistance, 2);
  this.separationForce = opts.separationForce || 2;
  this.cohesionForce = opts.cohesionForce || 1;
  this.alignmentForce = opts.alignmentForce || opts.alignment || 1;
  this.maxDistSq = Math.max(
    this.separationDistanceSq,
    this.cohesionDistanceSq,
    this.alignmentDistanceSq
  );

  var boids = (this.boids = []);

  for (
    var i = 0, l = opts.boids === undefined ? 150 : opts.boids;
    i < l;
    i += 1
  ) {
    boids[i] = new Boid(
      new Vector(Math.random() * 100 - 50, Math.random() * 100 - 50),
      new Vector(0, 0)
    );
  }
}

Flock.prototype.init = function() {
  this.tickData = {};
};

Flock.prototype.findNeighbors = function(point) {
  let neighbors = (this.tickData.neighbors = []);
  for (let i = 0; i < this.boids.length; i++) {
    let boid = this.boids[i];

    if (point === boid.position) {
      continue;
    }

    let distSq = boid.position.distSquared(point);
    if (distSq < this.maxDistSq) {
      neighbors.push({
        neighbor: this.boids[i],
        distSq: distSq
      });
    }
  }
};

Flock.prototype.calcCohesion = function(boid) {
  var total = new Vector(0, 0),
    distSq,
    target,
    neighbors = this.tickData.neighbors,
    count = 0;

  for (var i = 0; i < neighbors.length; i++) {
    target = neighbors[i].neighbor;
    if (boid === target) continue;

    distSq = neighbors[i].distSq;
    if (
      distSq < this.cohesionDistanceSq &&
      isInFrontOf(boid, target.position)
    ) {
      total = total.add(target.position);
      count++;
    }
  }

  if (count === 0) return new Vector(0, 0);

  return total
    .divideBy(count)
    .subtract(boid.position)
    .normalize()
    .subtract(boid.speed)
    .limit(this.accelerationLimit);
};

Flock.prototype.calcSeparation = function(boid) {
  var total = new Vector(0, 0),
    target,
    distSq,
    neighbors = this.tickData.neighbors,
    count = 0;

  for (var i = 0; i < neighbors.length; i++) {
    target = neighbors[i].neighbor;
    if (boid === target) continue;

    distSq = neighbors[i].distSq;
    if (distSq < this.separationDistanceSq) {
      total = total.add(
        target.position
          .subtract(boid.position)
          .normalize()
          .divideBy(target.position.distance(boid.position))
      );
      count++;
    }
  }

  if (count === 0) return new Vector(0, 0);

  return total
    .divideBy(count)
    .normalize()
    .add(boid.speed) // Adding speed instead of subtracting because separation is repulsive
    .limit(this.accelerationLimit);
};

Flock.prototype.calcAlignment = function(boid) {
  var total = new Vector(0, 0),
    target,
    distSq,
    neighbors = this.tickData.neighbors,
    count = 0;

  for (var i = 0; i < neighbors.length; i++) {
    target = this.tickData.neighbors[i].neighbor;
    if (boid === target) continue;

    distSq = neighbors[i].distSq;
    if (
      distSq < this.alignmentDistanceSq &&
      isInFrontOf(boid, target.position)
    ) {
      total = total.add(target.speed);
      count++;
    }
  }

  if (count === 0) return new Vector(0, 0);

  return total
    .divideBy(count)
    .normalize()
    .subtract(boid.speed)
    .limit(this.accelerationLimit);
};

Flock.prototype.tick = function() {
  var boid;
  this.init();

  for (var i = 0; i < this.boids.length; i++) {
    boid = this.boids[i];
    this.findNeighbors(boid.position);

    boid.acceleration = this.calcCohesion(boid)
      .multiplyBy(this.cohesionForce)
      .add(this.calcAlignment(boid).multiplyBy(this.alignmentForce))
      .subtract(this.calcSeparation(boid).multiplyBy(this.separationForce));
  }

  delete this.tickData;

  for (var j = 0; j < this.boids.length; j++) {
    boid = this.boids[j];
    boid.speed = boid.speed.add(boid.acceleration).limit(this.speedLimit);

    boid.position = boid.position.add(boid.speed);
    delete boid.acceleration;
  }
};

function isInFrontOf(boid, point) {
  return (
    boid.position.angle(boid.position.add(boid.speed), point) <= Math.PI / 3
  );
}

export default Flock;
