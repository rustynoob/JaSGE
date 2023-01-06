import {debug, Entity, Component, DeleteComponent, TransformComponent, CollisionComponent, Game} from './engine.js';

import { SoundEffectSystem, SoundEffectComponent } from "./soundEffects.js";

// Create a new game
const game = new Game();

// Create a new entity with a sound effect component
const e13 = new Entity();
e13.addComponent(new SoundEffectComponent("./sound/Fan.mp3", "loop"));
game.addEntity(e13);
// Create a new entity with a sound effect component
const e12 = new Entity();
e12.addComponent(new SoundEffectComponent("./sound/Motor 04.mp3", "loop"));
game.addEntity(e12);
// Create a new entity with a sound effect component
const e0 = new Entity();
e0.addComponent(new SoundEffectComponent("./sound/pop 01.mp3", "loop"));
game.addEntity(e0);
// Create a new entity with a sound effect component
const e1 = new Entity();
e1.addComponent(new SoundEffectComponent("./sound/Chirp.mp3", "loop"));
game.addEntity(e1);
// Create a new entity with a sound effect component
const e2 = new Entity();
e2.addComponent(new SoundEffectComponent("./sound/Click 03.mp3", "loop"));
game.addEntity(e2);
// Create a new entity with a sound effect component
const e3 = new Entity();
e3.addComponent(new SoundEffectComponent("./sound/Slime sound 02.mp3", "loop"));
game.addEntity(e3);
// Create a new entity with a sound effect component
const e4 = new Entity();
e4.addComponent(new SoundEffectComponent("./sound/Honk 02.mp3", "loop"));
game.addEntity(e4);
// Create a new entity with a sound effect component
const e5 = new Entity();
e5.addComponent(new SoundEffectComponent("./sound/Laser sound.mp3", "loop"));
game.addEntity(e5);
// Create a new entity with a sound effect component
const e6 = new Entity();
e6.addComponent(new SoundEffectComponent("./sound/Hello.mp3", "loop"));
game.addEntity(e6);
// Create a new entity with a sound effect component
const e7 = new Entity();
e7.addComponent(new SoundEffectComponent("./sound/Faucet on loop.mp3", "loop"));
game.addEntity(e7);
// Create a new entity with a sound effect component
const e8 = new Entity();
e8.addComponent(new SoundEffectComponent("./sound/Squeak 05.mp3", "loop"));
game.addEntity(e8);
// Create a new entity with a sound effect component
const e9 = new Entity();
e9.addComponent(new SoundEffectComponent("./sound/Water trickling down the drain loop.mp3", "loop"));
game.addEntity(e9);
// Create a new entity with a sound effect component
const e10 = new Entity();
e10.addComponent(new SoundEffectComponent("./sound/Whistle 01 Low.mp3", "loop"));
game.addEntity(e10);
// Create a new entity with a sound effect component
const e11 = new Entity();
e11.addComponent(new SoundEffectComponent("./sound/Click 03.mp3", "loop"));
game.addEntity(e11);


// Add the sound effect system to the game
game.addSystem(new SoundEffectSystem());

// Update the game to play the sound effect
game.update(5);

console.log("Sound effect played!");
