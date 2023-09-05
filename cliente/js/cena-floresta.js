/* eslint-disable no-undef */
export default class floresta extends Phaser.Scene {
  constructor () {
    super('floresta')
  }

  preload () {
    this.load.image('fundo', '../assets/cenarios/mapa-floresta.png')

    this.load.image('tela-gameover', '../assets/telagameover.png')

    this.load.image('tela-vitoria', '../assets/telavitoria.png')

    this.load.spritesheet('thiaguinho-walk', '../assets/patos/thiaguinho/thiaguinho-default-walking.png', {
      frameWidth: 64,
      frameHeight: 72
    })
    this.load.spritesheet('thiaguinho-idle', '../assets/patos/thiaguinho/thiaguinho-default-idle.png', {
      frameWidth: 64,
      frameHeight: 72
    })
    this.load.spritesheet('cacique-idle', '../assets/patos/cacique/cacique-cocar-idle.png', {
      frameWidth: 64,
      frameHeight: 80
    })
    this.load.spritesheet('mamae-pato', '../assets/patos/mamae-pato/mamaepato.png', {
      frameWidth: 76,
      frameHeight: 76
    })
    this.load.spritesheet('botao-cima', '../assets/botoes/cima.png', {
      frameWidth: 64,
      frameHeight: 68
    })
    this.load.spritesheet('botao-baixo', '../assets/botoes/baixo.png', {
      frameWidth: 64,
      frameHeight: 68
    })
    this.load.spritesheet('botao-direita', '../assets/botoes/direita.png', {
      frameWidth: 64,
      frameHeight: 68
    })
    this.load.spritesheet('botao-esquerda', '../assets/botoes/esquerda.png', {
      frameWidth: 64,
      frameHeight: 68
    })
    this.load.spritesheet('tela-cheia', '../assets/botoes/tela-cheia.png', {
      frameWidth: 64,
      frameHeight: 64
    })
  }

  create () {
    // Criação de objetos //

    this.fundo = this.add.image(225, -160, 'fundo')

    this.obstaculo = this.physics.add.sprite(225, 100, 'botao-baixo')

    this.mamae = this.physics.add.sprite(225, 700, 'mamae-pato')

    this.cacique = this.physics.add.sprite(225, 0, 'cacique-idle')

    this.personagem = this.physics.add.sprite(225, 400, 'thiaguinho-idle')
      .setSize(52, 40)
      .setOffset(12, 24)

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
        this.personagem.setOffset(0, 20)
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
        this.personagem.setOffset(12, 24)
        this.personagem.anims.play('pato-walk', true)
      })
      .on('pointerup', () => {
        this.esquerda.setFrame(0)
        this.personagem.setVelocityX(0)
        this.personagem.anims.play('pato-idle', true)
      })
      .setScrollFactor(0, 0)

    this.tela_cheia = this.add
      .sprite(396, 40, 'tela-cheia', 0)
      .setInteractive()
      .on('pointerdown', () => {
        if (this.scale.isFullscreen) {
          this.tela_cheia.setFrame(0)
          this.scale.stopFullscreen()
        } else {
          this.tela_cheia.setFrame(1)
          this.scale.startFullscreen()
        }
      })
      .setScrollFactor(0)

    // Criação de limites //

    this.personagem.setCollideWorldBounds(true)
    this.physics.world.setBounds(0, 0, 450, 800, true, true, false, true)
    this.cameras.main.setBounds(0, -10000000, 450, 10000800)
    this.cameras.main.startFollow(this.personagem)

    this.physics.add.collider(this.personagem)

    // Animações //

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

    this.anims.create({
      key: 'mamae-pato',
      frames: this.anims.generateFrameNumbers('mamae-pato', {
        start: 0,
        end: 15
      }),
      frameRate: 10,
      repeat: -1
    })

    // Colisões //

    this.physics.add.overlap(
      this.personagem,
      this.cacique,
      this.acharcacique,
      null,
      this
    )

    this.physics.add.overlap(
      this.personagem,
      this.obstaculo,
      this.morrer,
      null,
      this
    )

    // Animações automáticas
    this.mamae.anims.play('mamae-pato', true)
  }

  update () {
  }

  acharcacique (personagem) {
    const centrox = this.cameras.main.worldView.x + this.cameras.main.width / 2
    const centroy = this.cameras.main.worldView.y + this.cameras.main.height / 2
    this.imagem = this.add
      .image(centrox, centroy, 'tela-vitoria')
      .setAlpha(0.2)
      .setInteractive()
      .on('pointerdown', () => {
        this.game.scene.stop('floresta')
        this.game.scene.start('menu')
      })
    this.personagem.setVelocityX(0)
    this.personagem.setVelocityY(0)
    this.personagem.anims.play('pato-idle', true)
  }

  morrer (personagem) {
    const centrox = this.cameras.main.worldView.x + this.cameras.main.width / 2
    const centroy = this.cameras.main.worldView.y + this.cameras.main.height / 2
    this.imagem = this.add
      .image(centrox, centroy, 'tela-gameover')
      .setAlpha(0.3)
      .setInteractive()
      .on('pointerdown', () => {
        this.game.scene.stop('floresta')
        this.game.scene.start('menu')
      })
    this.personagem.setVelocityX(0)
    this.personagem.setVelocityY(0)
    this.personagem.anims.play('pato-idle', true)
  }
}
