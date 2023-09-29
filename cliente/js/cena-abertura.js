// eslint-disable-next-line no-undef
export default class abertura extends Phaser.Scene {
  constructor () {
    super('abertura')
  }

  preload () {
    this.load.image('tela-aberturav3', '../assets/tela-abertura-v3.png')

    this.load.spritesheet('menu', '../assets/botoes/menu.png', {
      frameWidth: 108,
      frameHeight: 56
    })

    this.load.spritesheet('tela-cheia', '../assets/botoes/tela-cheia.png', {
      frameWidth: 56,
      frameHeight: 56
    })
  }

  create () {
    this.fundo = this.add.image(224, 400, 'tela-aberturav3')

    this.menu = this.add.sprite(224, 546, 'menu')
      .setInteractive()
      .on('pointerdown', () => {
        this.game.scene.stop('abertura')
        this.game.scene.start('sala')
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

  update () { }
}
