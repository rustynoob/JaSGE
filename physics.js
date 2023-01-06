import {Component} from './engine.js';

import {Vector} from './vector.js';

export class PhysicsComponent extends Component {
  constructor(velocity,acceleration,force,mass) {
    super("physics");
    this.velocity = velocity || { x: 0, y: 0 };
    this.acceleration = acceleration || { x: 0, y: 0 };
    this.force = force || {x: 0, y:0};
    this.mass = mass || 1;
    this.momentOfInertia = 1;
    this.angularVelocity = 0;
    this.torque = 0;
  }
}

export class  PhysicsSystem {

  update(entities, dt) {

      // check for collisions between entities with physics and collision components
  for (const entity1 of entities) {
    if (entity1.hasComponent("collision") && entity1.hasComponent("physics")) {
      const physics1 = entity1.getComponent("physics");
      const collision1 = entity1.getComponent("collision");
      for (const collision of collision1.activeCollisions) {
        const entity2 = collision.collision;
        let physics2 = new PhysicsComponent(
            {x:0,y:0},
            {x:0,y:0},
            {x:0,y:0},
            Number.MAX_SAFE_INTEGER/2
                                            );
        if (entity2.hasComponent("physics")) {
          physics2 = entity2.getComponent("physics");
        }
        const collision2 = entity2.getComponent("collision");


        // calculate the resulting velocities of the two colliding entities
        // using the principles of conservation of momentum and kinetic energy
        const m1 = physics1.mass;
        const m2 = physics2.mass;
        const v1 = new Vector(physics1.velocity);
        const v2 = new Vector(physics2.velocity);
        const normal = new Vector(collision.normal);

        if(normal.length() == 0){
          physics1.velocity = v1.reflect()
        }
        const impulse = (2 * m1 * m2) / (m1 + m2) * (v1.subtract(v2)).dotProduct(normal) / normal.dotProduct(normal);

        physics1.velocity = v1.subtract(normal.multiply(impulse / m1));
        /*{
          x: (m1 - m2) / (m1 + m2) * v1.x + (2 * m2) / (m1 + m2) * v2.x,
          y: (m1 - m2) / (m1 + m2) * v1.y + (2 * m2) / (m1 + m2) * v2.y
        };*/
        //physics2.velocity = v2.subtract(normal.multiply(impulse / m2));
        /*{
          x: (2 * m1) / (m1 + m2) * v1.x + (m2 - m1) / (m1 + m2) * v2.x,
          y: (2 * m1) / (m1 + m2) * v1.y + (m2 - m1) / (m1 + m2) * v2.y
        };*/

      }
    }
  }


  // update physics for each entity with a physics component
  for (const entity of entities) {
    if (entity.hasComponent("physics")) {
      const physics = entity.getComponent("physics");
      physics.velocity.x += physics.acceleration.x * dt*0.001;
      physics.velocity.y += physics.acceleration.y * dt*0.001;
      const transform = entity.getComponent("transform");
      transform.x += physics.velocity.x * dt*0.001;
      transform.y += physics.velocity.y * dt*0.001;
    }
  }


  }
/*
  distanceTo(vertex1, vertex2) {
    const dx = vertex1.x - vertex2.x;
    const dy = vertex1.y - vertex2.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  length(vector) {
    return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
  }
  subtract(vector1, vector2) {
    return {
      x: vector1.x - vector2.x,
      y: vector1.y - vector2.y
    };
  }
  add(vector1, vector2) {
    return {
      x: vector1.x + vector2.x,
      y: vector1.y + vector2.y
    };
  }
  normalize(v) {
    const l = this.length(v);
    return {x: v.x / l, y: v.y / l};
  }
  multiply(vector, scalar) {
    return { x: vector.x * scalar, y: vector.y * scalar };
  }
  dotProduct(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y;
  }*/

  applyForce(entity, force) {
    const physics = entity.getComponent("physics");
    physics.acceleration.x += force.x / physics.mass;
    physics.acceleration.y += force.y / physics.mass;
    physics.force.x += force.x;
    physics.force.y += force.y;
  }
}
