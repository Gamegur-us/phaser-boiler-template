export class Stage extends Phaser.State {
  public preload() {
    this.load.spritesheet('phaser', 'assets/images/phaser.png', 70, 90);
    this.load.image('starfield', 'assets/images/starfield.jpg');
  }

  public create() {
    this.add.tileSprite(0, 0, this.world.width, this.world.height, 'starfield');

    for (let i = 0; i < 6; i++) {
      let item = this.add.sprite(this.world.centerX - (69 * 3) + (69 * i), -90, 'phaser', i);

      // Add a simple bounce tween to each character's position.
      this.add.tween(item).to({y: 240}, 2400, Phaser.Easing.Bounce.Out, true, 1000 + 400 * i);
    }
  }
}
