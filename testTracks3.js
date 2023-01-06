import {debug, Entity, Component, DeleteComponent, TransformComponent, CollisionComponent, Game} from './engine.js';
import {MusicComponent, MusicSystem, MusicData} from './music.js';

const musicData = [  {    url: "./game music/Music 03 loop end.mp3",    tags: ["loop", "end"],
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

for (const music of musicData) {
  const musicComponent = new MusicComponent(music.url, music.tags);
  const entity = new Entity();
  entity.addComponent(musicComponent);
  game.addEntity(entity);
}
