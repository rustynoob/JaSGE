import {debug, Entity, Component, DeleteComponent, TransformComponent, CollisionComponent, Game} from './engine.js';

import { CollisionSystem } from './collision.js';

// Create a new game
const game = new Game();

// Create two entities with collision components
const entityA = new Entity();
const collisionA = new CollisionComponent([
  { x: 0, y: 0 },
  { x: 100, y: 0 },
  { x: 100, y: 100 },
  { x: 0, y: 100 }
]);
entityA.addComponent(collisionA);

const entityB = new Entity();
const collisionB = new CollisionComponent([
  { x: 50, y: 50 },
  { x: 150, y: 50 },
  { x: 150, y: 150 },
  { x: 50, y: 150 }
]);
entityB.addComponent(collisionB);

// Add the entities to the game
game.addEntity(entityA);
game.addEntity(entityB);

// Add the collision system to the game
game.addSystem(new CollisionSystem());

// Update the game
game.update(0.016);

// Check if the collision system detected a collision
if (collisionA.collisionDetected() && collisionB.collisionDetected()) {
  console.log('Collision detected!');
} else {
  console.log('No collision detected.');
}
