// eslint-disable-next-line no-undef
export default class gameover extends Phaser.Scene {
  constructor () {
    super('gameover')
  }

  preload () {
    this.load.image('tela-gameover', '../assets/telagameover.png')
  }

  create () {
    this.imagem = this.add
      .image(225, 400, 'tela-gameover')
      .setInteractive()
      .on('pointerdown', () => {
        this.imagem.destroy()
        this.game.scene.stop('gameover')
        this.game.scene.start('menu')
      })
  }

  update () { }
}
