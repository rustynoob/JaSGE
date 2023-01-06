import {debug, Entity, Component, DeleteComponent, TransformComponent, CollisionComponent, Game} from './engine.js';
import {MusicComponent, MusicSystem, MusicData} from './music.js';

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
