// eslint-disable-next-line no-undef
export default class menu extends Phaser.Scene {
  constructor () {
    super('menu')
  }

  preload () {
    this.load.spritesheet('botao-cima', '../assets/botoes/cima.png', {
      frameWidth: 64,
      frameHeight: 64
    })
    this.load.spritesheet('botao-direita', '../assets/botoes/direita.png', {
      frameWidth: 64,
      frameHeight: 64
    })
    this.load.spritesheet('botao-esquerda', '../assets/botoes/esquerda.png', {
      frameWidth: 64,
      frameHeight: 64
    })
  }

  create () {
    this.cima = this.add.sprite(64, 700, 'botao-cima')
      .setInteractive()
      .on('pointerdown', () => {
        this.game.scene.stop('menu')
        this.game.scene.start('floresta', { id: 0, spriteidle: '/thiaguinho/thiaguinho-default-idle.png', spritewalking: '/thiaguinho/thiaguinho-default-walking.png' })
      })
    this.direita = this.add.sprite(386, 764, 'botao-direita')
      .setInteractive()
      .on('pointerdown', () => {
        this.game.scene.stop('menu')
        this.game.scene.start('floresta', { id: 1, spriteidle: '/isa/isa-default-idle.png', spritewalking: '/isa/isa-default-walking.png' })
      })
    this.esquerda = this.add.sprite(322, 764, 'botao-esquerda')
      .setInteractive()
      .on('pointerdown', () => {
        this.game.scene.stop('menu')
        this.game.scene.start('floresta', { id: 2, spriteidle: '/pam/pam-default-idle.png', spritewalking: '/pam/pam-default-walking.png' })
      })
  }

  update () { }
}
