export class Boot extends Phaser.State {
  public preload() {
    this.load.image('preloaderBackground', 'assets/images/progress_bar_background.png');
    this.load.image('preloaderBar', 'assets/images/progress_bar.png');
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

  }

  public create() {

    this.game.state.start('Preload');
  }
};
