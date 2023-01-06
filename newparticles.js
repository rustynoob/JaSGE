 import {debug, Entity, Component, DeleteComponent, TransformComponent, CollisionComponent, Game} from './engine.js';


export class ParticleTypeComponent extends Component {
  constructor(id, updateFn) {
    super("particleType");
    this.id = id;
    this.updateFn = updateFn || this.defaultUpdate;
    this.particles = [];
  }

  update(dt, tree) {
	let activeParticles = 0;
	// Iterate over the particles in this type
    for (const particle of this.particles) {
	  if(particle.markedForDeletion){
		
		continue;
	  }
	  activeParticles++;
      // Update the particle using the callback function
      this.updateFn(particle, dt);
     
     
      // Check for collisions with the interactors
      const queryMin = [particle.position.x - particle.radius,   particle.position.y - particle.radius];
      const queryMax = [particle.position.x + particle.radius, particle.position.y + particle.radius];
      const interactors = tree.query(queryMin, queryMax);
      for (const entity of interactors) {
        const interactor = entity.getComponent("interactor");
        interactor.process(entity, particle);
      }
      // Decrement the particle's lifetime
      particle.lifetime -= dt;

      // If the particle has reached the end of its lifetime, mark it for removal
      if (particle.lifetime <= 0) {
        particle.markedForDeletion = true;
      }
      if(this.particles.length > activeParticles*1.5){
		let i = this.particles.length-1
		for(;this.particles[i].markedForDeletion&& i > activeParticles; i--);
		this.particles.splice(i+1);
	  }
    }
  }
  defaultUpdate(particle, dt) {
    // Update the particle's position based on its velocity and acceleration
    particle.position.x += particle.velocity.x * dt;
    particle.position.y += particle.velocity.y * dt;
    particle.velocity.x += particle.acceleration.x * dt;
    particle.velocity.y += particle.acceleration.y * dt;
  }
}

export class Particle {
  constructor(position, velocity, acceleration, direction, color, size, lifetime, type, radius) {
    this.position = position || {x:0,y:0};
    this.velocity = velocity || {x:0,y:0}
    this.acceleration = acceleration|| {x:0,y:0}
    this.direction = direction|| {x:0,y:0}
    this.color = color || {r: 255, g:0, b:0};
    this.size = size || 2;
    this.lifetime = lifetime || 51200;
    this.type = type;
    this.radius = radius || 5;
    this.markedForDeletion = false;
  }
}

export class ParticleInteractorComponent extends Component {
  constructor(onCollisionFn, checkCollisionFn) {
    super("particleInteractor");
    this.checkCollision = checkCollisionFn || this.defaultCheckCollision;
    this.onCollision = onCollisionFn;
  }

  process(entity, particle) {
    if (this.checkCollision(entity, particle)) {
      this.onCollision(entity, particle);
    }
  }
  defaultCheckCollision(entity, particle){
    const transform = entity.getComponent("transform");
    const collision = entity.getComponent("collision");

    const minX = transform.x;
    const minY = transform.y;
    const maxX = transform.x + collision.width;
    const maxY = transform.y + collision.height;

    return particle.x >= minX && particle.x <= maxX && particle.y >= minY && particle.y <= maxY;
  };
}

export function makeParticleBounce(entity, particle) {
  // Get the collision component of the entity
  const collision = entity.getComponent("collision");
  const transform = entity.getComponent("transform");
  // Calculate the particle's new velocity based on the surface normal
  // of the collision component
  const surfaceNormal = collision.getSurfaceNormal(particle.position);
  particle.velocity = {
    x: -particle.velocity.x,
    y: -particle.velocity.y
  };

  // Move the particle out of the collision
  particle.position = collision.getDisplacement(particle.position);
}

export function deleteParticle(entity, particle) {
  // Remove the particle from the particle type's list of particles
  particle.type.particles = particle.type.particles.filter(
    p => p !== particle
  );
}



export class ParticleSystem {
  constructor() {
    this.particleTypes = [];//we need to get rid of this
    this.interactors = [];
    this.tree = new KDTree();
  }

  update(entities, dt) {
    // Update the arrays of particle types and interactors
    this.particleTypes = [];
    this.interactors = [];
    for (const entity of entities) {
      if (entity.hasComponent("particleType")) {
        this.particleTypes.push(entity.getComponent("particleType"));
      }
      if (entity.hasComponent("interactor")) {
        this.interactors.push(entity);
      }
    }

    // Insert the interactors into the k-d tree
    for (const entity of this.interactors) {
      const interactor = entity.getComponent("interactor");
      const transform = entity.getComponent("transform");
      const collision = entity.getComponent("collision");
      const min = [transform.x, transform.y];
      const max = [transform.x + collision.width, transform.y + collision.height];
      this.tree.insert(interactor, min, max);
    }

     // Process any particle emitters
    for (const entity of entities) {
      if (entity.hasComponent("particleEmitter")) {
        const emitter = entity.getComponent("particleEmitter");
          const transform = entity.getComponent("transform");
          const emittedParticles = emitter.emit(dt);
          const particleType = this.particleTypes.find(type => type.id === emitter.particle);
          const particlePool = particleType.particles;
          let p = 0;
          for (let particle of emittedParticles) {
            // Offset the particle position by the   transform of the entity
            particle.position.x += transform.x;
            particle.position.y += transform.y;
            
            // Add the particle to the appropriate particle type's particles array
            for(;p<particlePool.length && !particlePool[p].markedForDeletion;p++);
            particlePool[p] = particle;
		 
		 }
      }
    }

    // Update the particle types
    for (const particleType of this.particleTypes) {
      particleType.update(dt, this.tree);
    }
  }
}

class KDTree {
  constructor() {
    this.root = null;
  }

  insert(interactor, min, max) {
    // Create a new node for the interactor
    const node = {
      interactor: interactor,
      min: min,
      max: max,
      left: null,
      right: null
    };

    // Insert the node into the tree
    if (this.root === null) {
      this.root = node;
    } else {
      this._insert(this.root, node, 0);
    }
  }

  _insert(parent, node, depth) {
    // Choose the axis to split along
    const axis = depth % 2;

    // Insert the node into the left or right subtree
    if (node.min[axis] < parent.min[axis]) {
      if (parent.left === null) {
        parent.left = node;
      } else {
        this._insert(parent.left, node, depth + 1);
      }
    } else {
      if (parent.right === null) {
        parent.right = node;
      } else {
        this._insert(parent.right, node, depth + 1);
      }
    }
  }

  query(min, max) {
    // Create an array to store the query results
    const results = [];

    // Query the tree
    this._query(this.root, min, max, results);

    // Return the results
    return results;
  }

  _query(node, min, max, results) {
    // Check if the node is a leaf
    if (node === null) {
      return;
    }

    // Check if the bounding box of the node intersects the query box
    if (min[0] <= node.max[0] && max[0] >= node.min[0] &&
        min[1] <= node.max[1] && max[1] >= node.min[1]) {
      // Add the interactor to the results
      results.push(node.interactor);
    }

    // Recursively query the left and right subtrees
    this._query(node.left, min, max, results);
    this._query(node.right, min, max, results);
  }
}
//constructor(position, velocity, acceleration, direction, color, size, lifetime, type, radius)
export class ParticleEmitterComponent extends Component {
  constructor(emissionRate, particleTypeId, origin) {
    super("particleEmitter");
    this.emissionRate = emissionRate;
    this.particle = particleTypeId;
    this.origin = origin || { x: 0, y: 0 };
    this.lifetime = 1000;

  }

  emit(dt) {
    const particles = [];

    // Calculate the probability of emitting a particle based on the dt
    // and the emission rate
    
    const probability = this.emissionRate * dt;
    for (let i = 0; i < probability; i++){
	  if (Math.random() < probability) {
      // Emit a particle
        const particle = new Particle(
          // Position the particle at the origin of the emitter
          { x: this.origin.x, y: this.origin.y },
          // Give the particle a random velocity
          { x: (Math.random() * 2 - 1)*.2, y: (Math.random() * 2 - 1)*.2 },
          // Set the particle's acceleration to 0
          { x: 0, y: 0 },
          // Set the particle's direction to 0
          0,
          // Set the particle's color to white
          { r: 255, g: 0, b: 0 },
          // Set the particle's size to 1
          1,
          // Set the particle's lifetime to 1 second
          this.lifetime,
          // Set the particle's type
          this.particle,
          // Set the particle's radius to 1
          5
        );
        particles.push(particle);
      }
    }

    return particles;
  }
}

