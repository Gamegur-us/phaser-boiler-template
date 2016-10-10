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
    // window.innerHeight
    // window.innerWidth
    gameDiv.style.height = window.innerHeight + 'px';
/*    gameDiv.scrollIntoView(false);
    gameDiv.requestFullscreen(); // standard

    window.scrollTo(0,1);*/
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
      w = gameAspectRatio * h;
    } else {
      w = Math.min(window.innerWidth, gameWidth);
      h = w / gameAspectRatio;
    }
    setTimeout(() => {
      game.width = Math.round(w);
      game.height = Math.round(h);
    }, 100);
    game.width = Math.round(w);
    game.height = Math.round(h);
    try {
      game.scale.refresh();
    } catch (e) {
      // empty
    }
  };

  window.onresize = resize;
  resize();
};
