/* eslint-disable no-undef */
export default class lagoa extends Phaser.Scene {
  constructor () {
    super('lagoa')
  }

  preload () {
    this.load.image('grama', '../assets/cenarios/grama_floresta.png')

    this.load.image('fundo', '../assets/telaabertura.png')

    this.load.spritesheet('thiaguinho-walk', '../assets/patos/thiaguinho/thiaguinho-default-walking.png', {
      frameWidth: 64,
      frameHeight: 68
    })
    this.load.spritesheet('thiaguinho-idle', '../assets/patos/thiaguinho/thiaguinho-default-idle.png', {
      frameWidth: 64,
      frameHeight: 64
    })
    this.load.spritesheet('botao-cima', '../assets/botoes/cima.png', {
      frameWidth: 64,
      frameHeight: 64
    })
    this.load.spritesheet('botao-baixo', '../assets/botoes/baixo.png', {
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
    this.imagem = this.add
      .image(225, 400, 'fundo')

    this.imagem = this.add
      .image(400, 400, 'grama')

    this.personagem = this.physics.add.sprite(225, 400, 'thiaguinho-idle')

    this.cima = this.add.sprite(64, 700, 'botao-cima')
      .setInteractive()
      .on('pointerdown', () => {
        this.cima.setFrame(1)
        this.personagem.setVelocityY(-100)
        this.personagem.anims.play('pato-walk', true)
      })
      .on('pointerup', () => {
        this.cima.setFrame(0)
        this.personagem.setVelocityY(0)
        this.personagem.anims.play('pato-idle', true)
      })
      .setScrollFactor(0, 0)

    this.baixo = this.add.sprite(64, 764, 'botao-baixo')
      .setInteractive()
      .on('pointerdown', () => {
        this.baixo.setFrame(1)
        this.personagem.setVelocityY(100)
        this.personagem.anims.play('pato-walk', true)
      })
      .on('pointerup', () => {
        this.baixo.setFrame(0)
        this.personagem.setVelocityY(0)
        this.personagem.anims.play('pato-idle', true)
      })
      .setScrollFactor(0, 0)

    this.direita = this.add.sprite(386, 764, 'botao-direita')
      .setInteractive()
      .on('pointerdown', () => {
        this.direita.setFrame(1)
        this.personagem.setVelocityX(100)
        this.personagem.setFlipX(true)
        this.personagem.anims.play('pato-walk', true)
      })
      .on('pointerup', () => {
        this.direita.setFrame(0)
        this.personagem.setVelocityX(0)
        this.personagem.anims.play('pato-idle', true)
      })
      .setScrollFactor(0, 0)

    this.esquerda = this.add.sprite(322, 764, 'botao-esquerda')
      .setInteractive()
      .on('pointerdown', () => {
        this.esquerda.setFrame(1)
        this.personagem.setVelocityX(-100)
        this.personagem.setFlipX(false)
        this.personagem.anims.play('pato-walk', true)
      })
      .on('pointerup', () => {
        this.esquerda.setFrame(0)
        this.personagem.setVelocityX(0)
        this.personagem.anims.play('pato-idle', true)
      })
      .setScrollFactor(0, 0)

    this.personagem.setCollideWorldBounds(true)
    this.physics.world.setBounds(0, 0, 450, 800, true, true, false, true)
    this.cameras.main.startFollow(this.personagem)

    this.physics.add.collider(
      this.personagem)

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
  }
}
