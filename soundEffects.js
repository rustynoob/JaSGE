import {debug, Entity, Component, DeleteComponent, TransformComponent,  Game} from './engine.js';

import {AudioElementPool} from './music.js';

export class SoundEffectComponent extends Component {
  constructor(url, instruction) {
    super("soundEffect");
    this.url = url;
    this.audioElement = null;
    this.instruction = instruction;
  }


  cleanUp() {
    // Stop the audio element from playing
    this.audioElement.pause();
    this.audioElementPool.releaseAudioElement(this.audioElement);

  }
}

export class SoundEffectSystem {
  constructor() {
    this.audioElementPool = new AudioElementPool(10);
  }

  update(entities, dt) {
    for (const entity of entities) {
      let soundEffects = entity.getComponents("soundEffect");
      if(soundEffects){
        for (let soundEffect of soundEffects){
          if (soundEffect.instruction === "play") {
            let audioElement = null;
            if(soundEffect.audioElement == null){
              soundEffect.audioElement = audioElement =      this.audioElementPool.getAudioElement();
              audioElement.src = soundEffect.url;
            }else{
              audioElement = soundEffect.audioElement;
            }
            audioElement.currentTime = 0;
            audioElement.play();
            soundEffect.instruction = "noop";
            audioElement.isPlaying = true;

            // Set processBeforeDeleting to 0
            soundEffect.processBeforeDeleting = 0;
          } else if (soundEffect.instruction === "loop") {
            const audioElement = this.audioElementPool.getAudioElement();
            audioElement.src = soundEffect.url;
            audioElement.loop = true;
            audioElement.play();
            soundEffect.instruction = "noop";
            audioElement.isPlaying = true;
            soundEffect.audioElement = audioElement;
            // Set processBeforeDeleting to a large number
            soundEffect.processBeforeDeleting = 1000;
          }
        /*
        if (!soundEffect.audioElement.ended) {
          // Audio element is still playing, do nothing
          continue;
       }
         //Audio element has finished playing, remove it from the system
        this.audioElementPool.releaseAudioElement(soundEffect.audioElement);
        */
        }
      }
    }
  }
}
