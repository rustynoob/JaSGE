import {debug, Entity, Component, DeleteComponent, TransformComponent, CollisionComponent, Game} from './engine.js';
import {MusicComponent, MusicSystem, MusicData} from './music.js';

const musicData = [  {    url: "./game music/Music 04 loop Bflat and F.mp3",    tags: ["loop", "Bflat", "F"],
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
for (const music of musicData) {
  const musicComponent = new MusicComponent(music.url, music.tags);
  const entity = new Entity();
  entity.addComponent(musicComponent);
  game.addEntity(entity);
}
