export default class lagoa extends Phaser.Scene {
  constructor () {
    super('lagoa')
  }

  preload () {
    this.load.image('tela-aberturav', '../assets/telaabertura.png')
  }

  create () {
    this.imagem = this.add
      .image(225, 400, 'tela-abertura')
      .setInteractive()
  }

  update () { }
}
