import {debug, Entity, Component, DeleteComponent, TransformComponent, CollisionComponent, Game} from './engine.js';
import {ParticleTypeComponent, ParticleEmitterComponent, ParticleInteractorComponent, ParticleSystem,  makeParticleBounce, deleteParticle} from './newparticles.js';
import {RenderSystem} from './graphics.js';

const game = new Game();
game.addSystem(new ParticleSystem());
game.addSystem(new RenderSystem());

// Create an entity with the particle component
const entity = new Entity();

// Add a particle type component to the entity
const particleType = new ParticleTypeComponent("red");
entity.addComponent(particleType);

// Add a particle emitter component to the entity
const particleEmitter = new ParticleEmitterComponent(.3, "red");
entity.addComponent(particleEmitter);

// Add a particle interactor component to the entity
const particleInteractor = new ParticleInteractorComponent( deleteParticle);
entity.addComponent(particleInteractor);

// Add a transform component to the entity
entity.addComponent(new TransformComponent(400, 300, 9));

// Add a collision component to the entity
entity.addComponent(new CollisionComponent(50, 50));

game.addEntity(entity);

let lastTime = 0;
function gameLoop(timestamp) {
  const dt = timestamp - lastTime;
  lastTime = timestamp;
  game.update(dt);

  requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);
