export class Boot extends Phaser.State {
  public preload() {
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    // load images for preloader
    this.load.image('preloaderBar', 'assets/images/preloader_bar.png');
    this.load.image('logo', 'assets/images/logo.png');

    // trigger resize event
    window.dispatchEvent(new Event('resize'));
  }

  public create() {
    this.game.state.start('Preload');
  }
};
