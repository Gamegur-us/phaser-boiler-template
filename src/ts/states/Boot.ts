export class Boot extends Phaser.State {
  public preload() {
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    // load images for preloader
    this.load.image('preloaderBar', 'assets/images/preloader_bar.png');
  }

  public create() {

    this.game.state.start('Preload');
  }
};
