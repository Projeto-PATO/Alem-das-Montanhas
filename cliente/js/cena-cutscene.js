// eslint-disable-next-line no-undef
export default class cutscene extends Phaser.Scene {
  constructor () {
    super('cutscene')
  }

  preload () {
    this.load.spritesheet('cutscene', '../assets/cutscene.png', {
      frameWidth: 448,
      frameHeight: 800
    })

    this.load.spritesheet('dialogo', '../assets/dialogo.png', {
      frameWidth: 448,
      frameHeight: 800
    })
  }

  create () {
    this.cutscene = this.add.sprite(224, 400, 'cutscene')

    this.dialogo = this.add.sprite(224, 400, 'dialogo')

    this.anims.create({
      key: 'cutscene-anim',
      frames: this.anims.generateFrameNumbers('cutscene', {
        start: 0,
        end: 79
      }),
      frameRate: 40,
      repeat: 0
    })

    this.anims.create({
      key: 'dialogo-anim',
      frames: this.anims.generateFrameNumbers('dialogo', {
        start: 0,
        end: 53
      }),
      frameRate: 40,
      repeat: 0
    })

    this.cutscene.anims.play('cutscene-anim', true)

    this.cutscene.anims.play('dialogo-anim', true)
  }

  update () { }
}
