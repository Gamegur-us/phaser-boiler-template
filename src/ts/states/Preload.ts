export class Preload extends Phaser.State {
  private preloadBar: Phaser.Sprite;
  private background: Phaser.Sprite;

  public preload() {
    // These are the assets we loaded in Boot.ts
    // A nice sparkly background and a loading progress bar
    this.background = this.add.sprite(this.game.width / 2 - 250, this.game.height / 2 - 70, 'preloaderBackground');
    this.preloadBar = this.add.sprite(this.game.width / 2 - 250, this.game.height / 2 - 70, 'preloaderBar');

    // This sets the preloadBar sprite as a loader sprite.
    // What that does is automatically crop the sprite from 0 to full-width
    // as the files below are loaded in.
    this.load.setPreloadSprite(this.preloadBar);

    // Here we load the rest of the assets our game needs.
    // this.load.image('stage01', 'assets/images/stage01.png');

    // This is how you load an atlas
    // this.load.atlas('playButton', 'assets/images/play_button.png', 'assets/images/play_button.json');

    // This is how you load fonts
    // this.load.bitmapFont('font', 'assets/fonts/font.png', 'assets/fonts/font.xml');

  }

  public update() {
    this.game.state.start('Stage');
  }
};
