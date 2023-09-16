/* eslint-disable no-undef */
// eslint-disable-next-line no-template-curly-in-string
export default class floresta extends Phaser.Scene {
  constructor () {
    super('floresta')
  }

  preload () {
    this.load.tilemapTiledJSON('mapa-floresta', '../assets/mapa/mapa-floresta.json')

    this.load.image('tileset-floresta', '../assets/mapa/floresta.png')

    this.load.image('fundo-preto', '../assets/fundo-preto.png')

    this.load.image('tela-gameover', '../assets/tela-gameover.png')

    this.load.image('tela-vitoria', '../assets/tela-vitoria.png')

    this.load.script(
      'webfont',
      'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js')

    this.load.spritesheet('migalha', '../assets/migalha-pao.png', {
      frameWidth: 26,
      frameHeight: 24
    })
    this.load.spritesheet('cobra', '../assets/inimigos/cobra.png', {
      frameWidth: 64,
      frameHeight: 60
    })
    this.load.spritesheet(`sprite-walking${this.game.estadoPersonagem.spriteId}`, `../assets/patos/${this.game.estadoPersonagem.spriteWalking}`, {
      frameWidth: 92,
      frameHeight: 108
    })
    this.load.spritesheet(`sprite-idle${this.game.estadoPersonagem.spriteId}`, `../assets/patos/${this.game.estadoPersonagem.spriteIdle}`, {
      frameWidth: 92,
      frameHeight: 108
    })
    this.load.spritesheet('cacique-idle', '../assets/patos/cacique/cacique-cocar-idle.png', {
      frameWidth: 64,
      frameHeight: 80
    })
    this.load.spritesheet('mamae-pato', '../assets/patos/mamae-pato/mamae-pato.png', {
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
      frameWidth: 56,
      frameHeight: 56
    })
  }

  create () {
    console.log(this.game.estadoPersonagem)
    try {
      this.anims.get('pato-idle').destroy()
      this.anims.get('pato-walk').destroy()
    } catch (err) {
      console.log(err)
    }

    // Criação de mapa e objetos //

    this.tilemapFloresta = this.make.tilemap({
      key: 'mapa-floresta'
    })

    this.tilesetFloresta = this.tilemapFloresta.addTilesetImage('tileset-floresta')

    this.layerChao = this.tilemapFloresta.createLayer('chao', [this.tilesetFloresta])
    this.layerPedra = this.tilemapFloresta.createLayer('pedra', [this.tilesetFloresta])
    this.layerTronco = this.tilemapFloresta.createLayer('tronco', [this.tilesetFloresta])

    this.migalha = this.physics.add.sprite(224, 2700, 'migalha')
      .setImmovable()

    this.cobra = this.physics.add.sprite(224, 2200, 'cobra')
      .setSize(54, 30)
      .setOffset(10, 30)
      .setImmovable()

    this.personagem = this.physics.add.sprite(224, 2918, `sprite-idle${this.game.estadoPersonagem.spriteId}`)
      .setSize(52, 40)
      .setOffset(20, 64)
      .setImmovable()

    this.cacique = this.physics.add.sprite(225, 150, 'cacique-idle')
      .setSize(52, 40)
      .setOffset(12, 42)
      .setImmovable()
      .setBounce(0)

    this.layerCopa = this.tilemapFloresta.createLayer('copa', [this.tilesetFloresta])

    this.mamae = this.physics.add.sprite(225, 3100, 'mamae-pato')

    WebFont.load({
      custom: {
        families: ['Silkscreen'],
        urls: ['../style.css']
      }
    })

    this.texto = this.add.text(20, 30, `Migalhas: ${this.game.scoreMigalha.score}`, {
      fontSize: '25px',
      fill: '#ffffff'
    })
    this.texto.setScrollFactor(0)

    // Animações //

    this.anims.create({
      key: 'migalha-girando',
      frames: this.anims.generateFrameNumbers('migalha', {
        start: 0,
        end: 3
      }),
      frameRate: 5,
      repeat: -1
    })

    this.anims.create({
      key: 'pato-walk',
      frames: this.anims.generateFrameNumbers(`sprite-walking${this.game.estadoPersonagem.spriteId}`, {
        start: 0,
        end: (`frame-walking${this.game.estadoPersonagem.spriteId}`, `${this.game.estadoPersonagem.frameEndWalking}`)
      }),
      frameRate: (`frame-rate-w${this.game.estadoPersonagem.spriteId}`, `${this.game.estadoPersonagem.frameRateWalking}`),
      repeat: -1
    })

    this.anims.create({
      key: 'pato-idle',
      frames: this.anims.generateFrameNumbers(`sprite-idle${this.game.estadoPersonagem.spriteId}`, {
        start: 0,
        end: (`frame-idle${this.game.estadoPersonagem.spriteId}`, `${this.game.estadoPersonagem.frameEndIdle}`)
      }),
      frameRate: (`frame-rate-i${this.game.estadoPersonagem.spriteId}`, `${this.game.estadoPersonagem.frameRateIdle}`),
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

    this.anims.create({
      key: 'cobra',
      frames: this.anims.generateFrameNumbers('cobra', {
        start: 0,
        end: 14
      }),
      frameRate: 8,
      repeat: -1
    })

    // Animações automáticas //
    this.migalha.anims.play('migalha-girando', true)

    this.mamae.anims.play('mamae-pato', true)

    this.cobra.anims.play('cobra', true)
    this.cobra.setVelocityY(100)

    // Botões //

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

    this.tela_cheia = this.add.sprite(406, 40, 'tela-cheia', 0)
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

    // Criação de limites e câmera //

    this.personagem.setCollideWorldBounds(true)
    this.physics.world.setBounds(0, 0, 448, 3171, true, true, true, false)
    this.cameras.main.setBounds(0, 0, 448, 3171)
    this.cameras.main.startFollow(this.personagem)

    // Colisões //

    this.layerChao.setCollisionByProperty({ canCollide: true })
    this.layerPedra.setCollisionByProperty({ canCollide: true })
    this.layerTronco.setCollisionByProperty({ canCollide: true })
    this.layerCopa.setCollisionByProperty({ canCollide: true })

    this.physics.add.collider(this.personagem, this.layerChao)
    this.physics.add.collider(this.personagem, this.layerPedra)
    this.physics.add.collider(this.personagem, this.layerTronco)
    this.physics.add.collider(this.personagem, this.layerCopa)

    this.physics.add.collider(this.cobra, this.layerChao)
    this.physics.add.collider(this.cobra, this.layerPedra)
    this.physics.add.collider(this.cobra, this.layerTronco)
    this.physics.add.collider(this.cobra, this.layerCopa)

    this.physics.add.collider(this.personagem, this.cacique, this.acharcacique, null, this)

    this.physics.add.collider(this.personagem, this.cobra, this.morrer, null, this)

    this.physics.add.overlap(this.personagem, this.migalha, this.coletarmigalha, null, this)
  }

  update () {
  }

  acharcacique (personagem) {
    const centrox = this.cameras.main.worldView.x + this.cameras.main.width / 2
    const centroy = this.cameras.main.worldView.y + this.cameras.main.height / 2
    this.imagem = this.add.image(centrox, centroy, 'fundo-preto')
    this.imagem = this.add.image(centrox, centroy, 'tela-vitoria')
      .setInteractive()
      .on('pointerdown', () => {
        this.game.scene.stop('floresta')
        this.game.scene.start('menu')
      })
    this.personagem.setVelocityX(0)
    this.personagem.setVelocityY(0)
    this.personagem.setImmovable()
    this.personagem.anims.play('pato-idle', true)
    this.game.scoreMigalha.score = 0
    this.texto.setText(`Migalhas: ${this.game.scoreMigalha.score}`)
  }

  morrer (personagem) {
    const centrox = this.cameras.main.worldView.x + this.cameras.main.width / 2
    const centroy = this.cameras.main.worldView.y + this.cameras.main.height / 2
    this.imagem = this.add.image(centrox, centroy, 'fundo-preto')
    this.imagem = this.add.image(centrox, centroy, 'tela-gameover')
      .setInteractive()
      .on('pointerdown', () => {
        this.game.scene.stop('floresta')
        this.game.scene.start('menu')
      })
    this.personagem.setImmovable()
    this.personagem.setVelocityX(0)
    this.personagem.setVelocityY(0)
    this.personagem.anims.play('pato-idle', true)
    this.cobra.setVelocityY(0)
    this.game.scoreMigalha.score = 0
    this.texto.setText(`Migalhas: ${this.game.scoreMigalha.score}`)
  }

  coletarmigalha (personagem) {
    this.migalha.disableBody(true, true)
    this.game.scoreMigalha.score++
    this.texto.setText(`Migalhas: ${this.game.scoreMigalha.score}`)
    return false
  }
}
