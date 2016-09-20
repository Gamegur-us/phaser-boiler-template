import { Boot, Preload, Stage } from './states/index.ts';

export class Game extends Phaser.Game {
  constructor() {
    super({
      enableDebug: false,
      forceSetTimeOut: true,
      height: 720,
      parent: 'game',
      renderer: Phaser.CANVAS,
      transparent: false,
      width: 480,
      // state: Boot,
    });

    this.state.add('Boot', Boot);
    this.state.add('Preload', Preload);
    this.state.add('Stage', Stage);

    this.state.start('Boot');
  }
}
