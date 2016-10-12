import { Boot, Preload, Stage } from './states/index.ts';

const gameWidth = 480;
const gameHeight = 720;

export class Game extends Phaser.Game {
  constructor() {
    super({
      enableDebug: false,
      forceSetTimeOut: true,
      height: gameHeight,
      parent: 'game',
      renderer: Phaser.CANVAS,
      transparent: false,
      width: gameWidth,
      // state: Boot,
    });

    this.state.add('Boot', Boot);
    this.state.add('Preload', Preload);
    this.state.add('Stage', Stage);

    this.state.start('Boot');

  }
}

const gameDiv = document.getElementById('game');

window.onload = () => {
  const game = new Game();
  const resize = () => {
    function goFull() {
      (window as any).screenfull.request(document.body);
    }

    document.addEventListener('touchstart', goFull, false);
    document.addEventListener('touchend', goFull, false);
    document.addEventListener('touchcancel', goFull, false);
    document.addEventListener('touchmove', goFull, false);

    const currentAspect = window.innerWidth / window.innerHeight;
    const gameAspectRatio = gameWidth / gameHeight;
    let w: number;
    let h: number;

    if (currentAspect > gameAspectRatio) {
      h = Math.min(window.innerHeight, gameHeight);
      w = Math.round(gameAspectRatio * h);
    } else {
      w = Math.min(window.innerWidth, gameWidth);
      h = Math.round(w / gameAspectRatio);
    }
    game.scale.setMinMax(w, h, w, h);
  };

  window.onresize = resize;
};
