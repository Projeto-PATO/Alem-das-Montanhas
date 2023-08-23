// eslint-disable-next-line no-undef
export default class cena0 extends Phaser.Scene {
  constructor () {
    super('cena0')
  }

  preload () {
    this.load.image('tela-aberturav2', '../assets/telaaberturav2.png')
  }

  create () {
    this.imagem = this.add
      .image(225, 400, 'tela-aberturav2')
      .setInteractive()
      .on('pointerdown', () => {
        this.imagem.destroy()
        this.game.scene.start('cena1')
      })
  }

  update () { }
}
