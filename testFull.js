import {debug, Entity, Component, DeleteComponent, TransformComponent, Game} from './engine.js';
//import {ParticleTypeComponent, ParticleEmitterComponent, ParticleInteractorComponent, ParticleSystem,  makeParticleBounce, deleteParticle} from './newparticles.js';
import { CollisionSystem, CollisionComponent } from './collision.js';
import {PhysicsComponent, PhysicsSystem} from './physics.js';
import {SoundEffectComponent, SoundEffectSystem } from './soundEffects.js';
import {SpriteComponent, ShapeComponent, RenderSystem, PolygonComponent} from './graphics.js';
import {MusicComponent, MusicSystem, RequiredTagsComponent,BlacklistedTagsComponent} from './music.js';
import {generatePolygon} from './vector.js';



const game = new Game();
const physicsSystem = new PhysicsSystem();
const soundEffectSystem = new SoundEffectSystem();
const renderSystem = new RenderSystem();

game.addSystem(new CollisionSystem());
game.addSystem(physicsSystem);
game.addSystem(soundEffectSystem);
game.addSystem(renderSystem);
function makeBalls(number){
  // Create the ball entity
  for (let i = 0; i < number; i++){
    const ball = new Entity();
    ball.addComponent(new Component("ball"));
    ball.addComponent(new TransformComponent(Math.random()*700+50, Math.random()*300+50));
    ball.addComponent(new  PhysicsComponent({x:Math.random()*80-40,y:Math.random()*80-40},{x:0,y:0},{x:0,y:0},.5));
    const wallSoundEntity = new Entity();
    const ballSoundEntity = new Entity();
    let wallsound = new SoundEffectComponent('./sound/Beep 06 Mid.mp3',"noop");

    let ballsound = new SoundEffectComponent('./sound/Splat01.mp3',"noop");
    ballSoundEntity.addComponent(ballsound);
    wallSoundEntity.addComponent(wallsound);
    let ballCollider = new CollisionComponent(generatePolygon(i+3,20));
    function playball(entity,collision){
      ballsound.instruction = "play";
    }
    function playwall(entity,collision){
      wallsound.instruction = "play";
    }
    ballCollider.registerCallback("wall",playwall);
    ballCollider.registerCallback("ball",playball);

    ball.addComponent(ballCollider);

    ball.addComponent(new PolygonComponent(generatePolygon(i+3,20), "red"));
    game.addEntity(ball);
    game.addEntity(ballSoundEntity);
    game.addEntity(wallSoundEntity);
    physicsSystem.applyForce(ball, {x:0,y:10});
  }
}
// Create the left wall entity
const leftWall = new Entity();
leftWall.addComponent(new Component("wall"));
//leftWall.addComponent(new PhysicsComponent({x:0,y:0},{x:0,y:0},{x:0,y:0},10));
leftWall.addComponent(new TransformComponent(10, 0));
leftWall.addComponent(new CollisionComponent([{x:0, y:0},{x:10,y:0},{x:10,y:400},{x:0, y:400}]));
leftWall.addComponent(new PolygonComponent([{x:0, y:0},{x:10,y:0},{x:10,y:400},{x:0, y:400}], "black"));
game.addEntity(leftWall);

// Create the right wall entity
const rightWall = new Entity();
rightWall.addComponent(new Component("wall"));
//rightWall.addComponent(new PhysicsComponent({x:0,y:0},{x:0,y:0},{x:0,y:0},10));
rightWall.addComponent(new TransformComponent(780, 0));
rightWall.addComponent(new CollisionComponent([{x:0, y:0},{x:10,y:0},{x:10,y:400},{x:0, y:400}]));
rightWall.addComponent(new PolygonComponent([{x:0, y:0},{x:10,y:0},{x:10,y:400},{x:0, y:400}], "black",));
game.addEntity(rightWall);

// Create the top wall entity
const topWall = new Entity();
topWall.addComponent(new Component("wall"));
//topWall.addComponent(new PhysicsComponent({x:0,y:0},{x:0,y:0},{x:0,y:0},10));
topWall.addComponent(new TransformComponent(0, 10));
topWall.addComponent(new CollisionComponent([{x:0, y:0},{x:800,y:0},{x:800, y:10},{x:0,y:10}]));
topWall.addComponent(new PolygonComponent([{x:0, y:0},{x:800,y:0},{x:800, y:10},{x:0,y:10}], "black"));
game.addEntity(topWall);

// Create the bottom wall entity
const bottomWall = new Entity();
bottomWall.addComponent(new Component("wall"));
//bottomWall.addComponent(new PhysicsComponent({x:0,y:0},{x:0,y:0},{x:0,y:0},10));
bottomWall.addComponent(new TransformComponent(0, 380));
bottomWall.addComponent(new CollisionComponent([{x:0, y:0},{x:800,y:0},{x:800, y:100},{x:0,y:100}]));
bottomWall.addComponent(new PolygonComponent([{x:0, y:0},{x:800,y:0},{x:800, y:100},{x:0,y:100}], "black"));
game.addEntity(bottomWall);


makeBalls(5);

let lastFrameTimeMs = 0;
function update(timeStamp) {
const timeDelta = timeStamp - lastFrameTimeMs;
lastFrameTimeMs = timeStamp;
game.update(timeDelta);
requestAnimationFrame(update);
}

requestAnimationFrame(update);
