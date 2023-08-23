// eslint-disable-next-line no-undef
export default class cena1 extends Phaser.Scene {
  constructor () {
    super('cena1')
  }

  preload () {
    this.load.image('tela-abertura', '../assets/telaabertura.png')
  }

  create () {
    this.add.image(225, 400, 'tela-abertura')
  }

  update () { }
}
