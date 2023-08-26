/* eslint-disable no-undef */
export default class lagoa extends Phaser.Scene {
  constructor () {
    super('lagoa')
  }

  preload () {
    this.load.image('grama', '../assets/cenarios/grama_floresta.png')
    this.load.spritesheet('thiaguinho-walk', '../assets/patos/thiaguinho/thiaguinho-default-walking.png', {
      frameWidth: 64,
      frameHeight: 68
    })
    this.load.spritesheet('thiaguinho-idle', '../assets/patos/thiaguinho/thiaguinho-default-idle.png', {
      frameWidth: 64,
      frameHeight: 64
    })
  }

  create () {
    this.imagem = this.add
      .image(400, 400, 'grama')
    this.personagem = this.physics.add.sprite(225, 400, 'thiaguinho-idle')

    this.cursors = this.input.keyboard.createCursorKeys()

    this.anims.create({
      key: 'pato-walk',
      frames: this.anims.generateFrameNumbers('thiaguinho-walk', {
        start: 0,
        end: 21
      }),
      frameRate: 32,
      repeat: -1
    })
    this.anims.create({
      key: 'pato-idle',
      frames: this.anims.generateFrameNumbers('thiaguinho-idle', {
        start: 0,
        end: 15
      }),
      frameRate: 10,
      repeat: -1
    })
  }

  /* seta pra esquerda, direita, cima e baixo do pc */
  update () {
    if (this.cursors.left.isDown) {
      this.personagem.anims.play('pato-walk', true)
      this.personagem.setVelocityX(-100)
      this.personagem.setFlipX(false)
    } else if (this.cursors.right.isDown) {
      this.personagem.anims.play('pato-walk', true)
      this.personagem.setVelocityX(100)
      this.personagem.setFlipX(true)
    } else if (this.cursors.up.isDown) {
      this.personagem.anims.play('pato-walk', true)
      this.personagem.setVelocityY(-100)
      this.personagem.setFlipX(true)
    } else if (this.cursors.down.isDown) {
      this.personagem.anims.play('pato-walk', true)
      this.personagem.setVelocityY(100)
      this.personagem.setFlipX(false)
    } else {
      this.personagem.anims.play('pato-idle', true)
      this.personagem.setVelocityX(0)
      this.personagem.setVelocityY(0)
    }
  }
}
