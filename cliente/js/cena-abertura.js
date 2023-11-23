// eslint-disable-next-line no-undef
export default class abertura extends Phaser.Scene {
  constructor () {
    super('abertura')
  }

  preload () {
    this.load.image('tela-aberturav3', '../assets/tela-abertura-v3.png')

    this.load.spritesheet('sala', '../assets/botoes/sala.png', {
      frameWidth: 104,
      frameHeight: 56
    })

    this.load.spritesheet('tela-cheia', '../assets/botoes/tela-cheia.png', {
      frameWidth: 56,
      frameHeight: 56
    })
  }

  create () {
    this.fundo = this.add.image(224, 400, 'tela-aberturav3')

    this.timer = 2

    this.sala = this.add.sprite(224, 546, 'sala')
      .setInteractive()
      .on('pointerdown', () => {
        this.sala.setFrame(1)
        this.time.addEvent({
          delay: 100,
          callback: this.contagem,
          callbackScope: this,
          loop: true
        })
      })
      .on('pointerup', () => {
        this.sala.setFrame(0)
      })

    this.telaCheia = this.add.sprite(406, 40, 'tela-cheia', 0)
      .setInteractive()
      .on('pointerdown', () => {
        if (this.scale.isFullscreen) {
          this.telaCheia.setFrame(0)
          this.scale.stopFullscreen()
        } else {
          this.telaCheia.setFrame(1)
          this.scale.startFullscreen()
        }
      })
  }

  contagem () {
    this.timer -= 1
    if (this.timer <= 0) {
      this.game.scene.stop('abertura')
      this.game.scene.start('vitoria')
    }
  }

  update () { }
}
