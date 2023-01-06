import {debug, Entity, Component, DeleteComponent, TransformComponent, CollisionComponent, Game} from './engine.js';
import {MusicComponent, MusicSystem, RequiredTagsComponent,BlacklistedTagsComponent} from './music.js';

const game = new Game();
game.addSystem(new MusicSystem());

// Create an entity with a music component
const entity = new Entity();

const requiredTagsComponent = new RequiredTagsComponent(['happy']);
const blacklistedTagsComponent = new BlacklistedTagsComponent(['high', 'phrase', 'F']);
entity.addComponent(requiredTagsComponent);
entity.addComponent(blacklistedTagsComponent);

// Add a music component to the entity
const music = new MusicComponent("./game music/Music 01 Happy phrase HighBflat.mp3",["happy", "phrase", "high", "F"]);
entity.addComponent(music);

game.addEntity(entity);

const musicData = [  {    url: "./game music/Music 01 Happy phrase HighBflat.mp3",    tags: ["happy", "phrase", "high", "Bflat"],
  },
  {
    url: "./game music/Music 01 Happy phrase HighF.mp3",
    tags: ["happy", "phrase", "high", "F"],
  },
  {
    url: "./game music/Music 01 Happy phrase LowBflat.mp3",
    tags: ["happy", "phrase", "low", "Bflat"],
  },
  {
    url: "./game music/Music 01 Happy phrase LowF.mp3",
    tags: ["happy", "phrase", "low", "F"],
  },
];

for (const music of musicData) {
  const musicComponent = new MusicComponent(music.url, music.tags);
  const entity = new Entity();
  entity.addComponent(musicComponent);
  game.addEntity(entity);
}

const testTracks2 = [  {    url: "./game music/Music 01 Happy phrase HighBflat.mp3",    tags: ["happy", "phrase", "high", "Bflat"],
  },
  {
    url: "./game music/Music 01 Happy phrase HighF.mp3",
    tags: ["happy", "phrase", "high", "F"],
  },
  {
    url: "./game music/Music 01 Happy phrase LowBflat.mp3",
    tags: ["happy", "phrase", "low", "Bflat"],
  },
  {
    url: "./game music/Music 01 Happy phrase LowF.mp3",
    tags: ["happy", "phrase", "low", "F"],
  },
  {
    url: "./game music/Music 02Happy phrase HighBflat.mp3",
    tags: ["happy", "phrase", "high", "Bflat"],
  },
  {
    url: "./game music/Music 02 Happy phrase HighF.mp3",
    tags: ["happy", "phrase", "high", "F"],
  },
  {
    url: "./game music/Music 02 Happy phrase LowBflat.mp3",
    tags: ["happy", "phrase", "low", "Bflat"],
  },
  {
    url: "./game music/Music 02 Happy phrase LowF.mp3",
    tags: ["happy", "phrase", "low", "F"],
  },
];
for (const music of musicData) {
  const musicComponent = new MusicComponent(music.url, music.tags);
  const entity = new Entity();
  entity.addComponent(musicComponent);
  game.addEntity(entity);
}

const musicData2 = [  {    url: "./game music/Music 03 loop end.mp3",    tags: ["loop", "end"],
  },
  {
    url: "./game music/Music 03 Loop.mp3",
    tags: ["loop"],
  },
  {
    url: "./game music/Music 03 phrase 01 B flat.mp3",
    tags: ["phrase", "Bflat"],
  },
  {
    url: "./game music/Music 03 phrase 02 in B flat.mp3",
    tags: ["phrase", "Bflat"],
  },
  {
    url: "./game music/Music 03 phrase 03 in F.mp3",
    tags: ["phrase", "F"],
  },
];

for (const music of musicData2) {
  const musicComponent = new MusicComponent(music.url, music.tags);
  const entity = new Entity();
  entity.addComponent(musicComponent);
  game.addEntity(entity);
}


const musicDatas = [  {    url: "./game music/Music 04 loop Bflat and F.mp3",    tags: ["loop", "Bflat", "F"],
  },
  {
    url: "./game music/Music 04 Phrase 01 in B flat.mp3",
    tags: ["phrase", "Bflat"],
  },
  {
    url: "./game music/Music 04 Phrase 02 in B flat.mp3",
    tags: ["phrase", "Bflat"],
  },
  {
    url: "./game music/Music 05 Phrase in F.mp3",
    tags: ["phrase", "F"],
  },
  {
    url: "./game music/Music 06 Phrase in B flat.mp3",
    tags: ["phrase", "Bflat"],
  },
  {
    url: "./game music/Music 07 Phrase in F.mp3",
    tags: ["phrase", "F"],
  },
  {
    url: "./game music/Music 08 Loop.mp3",
    tags: ["loop"],
  },
  {
    url: "./game music/Music 08 Phrase 01 moving to F.mp3",
    tags: ["phrase", "moving", "F"],
  },
  {
    url: "./game music/Music 08 Phrase 02 moving from B flat.mp3",
    tags: ["phrase", "moving", "Bflat"],
  },
  {
    url: "./game music/Music 08 Phrase 03 moving to B flat.mp3",
    tags: ["phrase", "moving", "Bflat"],
  },
  {
    url: "./game music/Music End Section Low B flat.mp3",
    tags: ["end", "section", "low", "Bflat"],
  },
  {
    url: "./game music/Noctave.wav",
    tags: ["Noctave"],
  },
  {
    url: "./game music/Ominous background sound or engine.mp3",
    tags: ["ominous", "background", "sound", "engine"],
  },
  {
    url: "./game music/Ominous background sound or engine room.mp3",
    tags: ["ominous", "background", "sound", "engine", "room"],
  },
  {
    url: "./game music/Rhythmic Bass Loop Low B-flat.mp3",
    tags: ["rhythmic", "bass", "loop", "low", "Bflat"],
  },
  {
    url: "./game music/Tense loop 01slow.mp3",
    tags: ["tense", "loop", "slow"],
  },
  {
    url: "./game music/Tense loop 02medium.mp3",
    tags: ["tense", "loop", "medium"],
  },
  {
    url: "./game music/Tense loop 03medium fast.mp3",
    tags: ["tense", "loop", "medium", "fast"],
  },
  {
    url: "./game music/Tense loop 04speeding up.mp3",
    tags: ["tense", "loop", "speeding"],
  },
  {
    url: "./game music/Tense music 01.mp3",
    tags: ["tense", "music"],
  },
  {
    url: "./game music/Tense music 02.mp3",
    tags: ["tense", "music"],
  },
  {
    url: "./game music/Tense music 03.mp3",
    tags: ["tense", "music"],
  },
  {
    url: "./game music/Tense music.mp3",
    tags: ["tense", "music"],
  },
  {
    url: "./game music/Tense single tritone.mp3",
    tags: ["tense", "single", "tritone"],
  },
  {
    url: "./game music/Transitional Note B flat.mp3",
    tags: ["transitional", "note", "Bflat"],
  },
  {
    url: "./game music/Transitional Note F over B flat.mp3",
    tags: ["transitional", "note", "F", "over", "Bflat"],
  },
  {
   url: "./game music/Transition F 2Xs.mp3",
    tags: ["transition", "F", "2Xs"],
  },
];
for (const music of musicDatas) {
  const musicComponent = new MusicComponent(music.url, music.tags);
  const entity = new Entity();
  entity.addComponent(musicComponent);
  game.addEntity(entity);
}

let lastTime = 0;
function gameLoop(timestamp) {
  const dt = timestamp - lastTime;
  lastTime = timestamp;
  game.update(dt);

  requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);
