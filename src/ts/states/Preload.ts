export class Preload extends Phaser.State {
  private preloadBar: Phaser.Sprite;
  private logo: Phaser.Sprite;
  // private background: Phaser.Sprite;

  public preload() {
    // this.load.image('preloaderBackground', 'assets/images/progress_bar_background.png');
    this.stage.backgroundColor = '#444';
    this.logo = this.add.sprite(this.world.centerX, this.world.centerY - 50, 'logo');
    this.logo.anchor.set(0.5);
    // logo.alpha = 0.4;
    if (this.world.width < this.logo.width) {
      this.logo.scale.setTo(this.world.width / (this.logo.width + 50));
    }

    // These are the assets we loaded in Boot.ts
    // A nice sparkly background and a loading progress bar
    // this.background = this.add.sprite(this.world.centerX, this.world.centerY, 'preloaderBackground');
    // this.background.anchor.set(0.5)

    this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloaderBar');
    if (this.world.width < this.preloadBar.width) {
      this.preloadBar.scale.setTo(this.world.width / (this.preloadBar.width + 50));
    }
    this.preloadBar.x = this.preloadBar.x - (this.preloadBar.width / 2);

    this.load.setPreloadSprite(this.preloadBar);

    // This sets the preloadBar sprite as a loader sprite.
    // What that does is automatically crop the sprite from 0 to full-width
    // as the files below are loaded in.

    // Here we load the rest of the assets our game needs.

    this.load.spritesheet('phaser', 'assets/images/phaser.png', 70, 90);
    this.load.image('starfield', 'assets/images/starfield.jpg');
  }

  public create() {
    this.game.state.start('Stage');
  }
};
