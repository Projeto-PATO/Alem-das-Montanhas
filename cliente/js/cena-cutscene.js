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
    // this.dialogo = this.add.sprite(224, 400, 'dialogo')

    this.cutscene = this.add.sprite(224, 400, 'cutscene').setScrollFactor(0, 0)

    /* this.timerTroca = 1

    this.timerFim = 1

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

    this.time.addEvent({
      delay: 5000,
      callback: this.contagemTroca,
      callbackScope: this,
      loop: false
    })

    /* this.time.addEvent({
      delay: 10000,
      callback: this.contagemFim,
      callbackScope: this,
      loop: false
    }) */
  }

  contagemTroca () {
    this.timerTroca -= 1
    if (this.timerTroca <= 0) {
      this.cutscene.destroy()
      this.dialogo.anims.play('dialogo-anim', true)
    }
  }

  contagemFim () {
    this.timerFIm -= 1
    if (this.timerFim <= 0) {
      this.game.scene.stop('cutscene')
      this.game.scene.start('menu')
    }
  }

  update () { }
}
