export class Preload extends Phaser.State {
  private preloadBar: Phaser.Sprite;
  // private background: Phaser.Sprite;

  public preload() {
    // this.load.image('preloaderBackground', 'assets/images/progress_bar_background.png');
    this.stage.backgroundColor = '#444';

    // These are the assets we loaded in Boot.ts
    // A nice sparkly background and a loading progress bar
    // this.background = this.add.sprite(this.world.centerX, this.world.centerY, 'preloaderBackground');
    // this.background.anchor.set(0.5)

    this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloaderBar');
    this.preloadBar.anchor.set(0.5);

    // This sets the preloadBar sprite as a loader sprite.
    // What that does is automatically crop the sprite from 0 to full-width
    // as the files below are loaded in.
    this.load.setPreloadSprite(this.preloadBar);

    // Here we load the rest of the assets our game needs.

    this.load.spritesheet('phaser', 'assets/images/phaser.png', 70, 90);
    this.load.image('starfield', 'assets/images/starfield.jpg');

  }

  public update() {
    this.game.state.start('Stage');
  }
};
