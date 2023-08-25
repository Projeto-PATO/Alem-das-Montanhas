/* eslint-disable no-undef */
export default class lagoa extends Phaser.Scene {
  constructor () {
    super('lagoa')
  }

  preload () {
    this.load.image('grama', '../assets/cenarios/grama_floresta.png')
    this.load.spritesheet('thiaguinho', '../assets/patos/thiaguinho/thiaguinho-default-walking.png', {
      frameWidth: 64,
      frameHeight: 68
    })
  }

  create () {
    this.imagem = this.add
      .image(400, 400, 'grama')
    this.personagem = this.physics.add.sprite(225, 400, 'thiaguinho')
      .setInteractive()
      .on('pointerdown', () => {
        this.personagem.anims.play('pato-direita')
        this.personagem.setVelocityX(50)
        this.personagem.setVelocityY(50)
      })

    this.anims.create({
      key: 'pato-direita',
      frames: this.anims.generateFrameNumbers('thiaguinho', {
        start: 0,
        end: 21
      }),
      frameRate: 32,
      repeat: -1
    })
  }

  update () { }
}
