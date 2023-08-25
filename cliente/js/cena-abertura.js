// eslint-disable-next-line no-undef
export default class abertura extends Phaser.Scene {
  constructor () {
    super('abertura')
  }

  preload () {
    this.load.image('tela-aberturav3', '../assets/telaaberturav3.png')
  }

  create () {
    this.imagem = this.add
      .image(225, 400, 'tela-aberturav3')
      .setInteractive()
      .on('pointerdown', () => {
        this.imagem.destroy()
        this.game.scene.stop('abertura')
        this.game.scene.start('sala')
      })
  }

  update () { }
}
