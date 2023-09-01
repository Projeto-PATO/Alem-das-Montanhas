// eslint-disable-next-line no-undef
export default class vitoria extends Phaser.Scene {
  constructor () {
    super('vitoria')
  }

  preload () {
    this.load.image('tela-vitoria', '../assets/telavitoria.png')
  }

  create () {
    this.imagem = this.add
      .image(225, 400, 'tela-vitoria')
      .setInteractive()
      .on('pointerdown', () => {
        this.imagem.destroy()
        this.game.scene.stop('vitoria')
        this.game.scene.start('menu')
      })
  }

  update () { }
}
