/* eslint-disable no-return-assign */
/* eslint-disable no-undef */
// eslint-disable-next-line no-template-curly-in-string
export default class mundoMagico extends Phaser.Scene {
  constructor () {
    super('mundo-magico')
  }

  preload () {
    this.load.tilemapTiledJSON('mapa2', '../assets/mapa/mapa-full.json')

    this.load.image('tileset-floresta', '../assets/mapa/tileset-floresta.png')

    this.load.image('tileset-mundomagico', '../assets/mapa/tileset-mundomagico.png')

    this.load.image('tileset-campo', '../assets/mapa/tileset-campo.png')

    this.load.image('tileset-praia', '../assets/mapa/tileset-praia.png')

    this.load.image('fundo-preto', '../assets/fundo-preto.png')

    this.load.image('tela-gameover', '../assets/tela-gameover.png')

    this.load.image('tela-vitoria', '../assets/tela-vitoria.png')

    this.load.spritesheet('migalha', '../assets/migalha-pao.png', {
      frameWidth: 26,
      frameHeight: 24
    })
    this.load.spritesheet(`sprite-${this.game.estadoPersonagem.spriteId}`, `../assets/patos/${this.game.estadoPersonagem.spritePato}`, {
      frameWidth: 92,
      frameHeight: 108
    })
    this.load.spritesheet(`sprite-${this.game.estadoPersonagemRemoto.spriteId}`, `../assets/patos/${this.game.estadoPersonagemRemoto.spritePato}`, {
      frameWidth: 92,
      frameHeight: 108
    })
    this.load.spritesheet('botao-cima', '../assets/botoes/cima.png', {
      frameWidth: 96,
      frameHeight: 102
    })
    this.load.spritesheet('botao-baixo', '../assets/botoes/baixo.png', {
      frameWidth: 96,
      frameHeight: 102
    })
    this.load.spritesheet('botao-direita', '../assets/botoes/direita.png', {
      frameWidth: 96,
      frameHeight: 102
    })
    this.load.spritesheet('botao-esquerda', '../assets/botoes/esquerda.png', {
      frameWidth: 96,
      frameHeight: 102
    })
    this.load.spritesheet('tela-cheia', '../assets/botoes/tela-cheia.png', {
      frameWidth: 56,
      frameHeight: 56
    })

    this.load.spritesheet('coracoes', '../assets/hud/vida.png', {
      frameWidth: 115,
      frameHeight: 40
    })

    this.load.spritesheet('caldeirao', '../assets/caldeirao.png', {
      frameWidth: 64,
      frameHeight: 64
    })

    this.load.audio('audio-migalha', '../assets/audios/migalha.mp3')

    this.load.audio('audio-gameover', './assets/audios/gameover.mp3')
  }

  create () {
    // Áudio //

    this.audioMigalha = this.sound.add('audio-migalha')
    this.audioGameover = this.sound.add('audio-gameover')

    // Criação de mapa e objetos //

    this.tilemapMundoMagico = this.make.tilemap({
      key: 'mapa2'
    })

    this.tilesetMundoMagico = this.tilemapMundoMagico.addTilesetImage('tileset-mundomagico')

    this.layerChao = this.tilemapMundoMagico.createLayer('chao', [this.tilesetMundoMagico])
    // this.layerLapideF04 = this.tilemapMundoMagico.createLayer('lapideF-04', [this.tilesetMundoMagico])
    // this.layerOssos1 = this.tilemapMundoMagico.createLayer('ossos1', [this.tilesetMundoMagico])
    // this.layerOssos2 = this.tilemapMundoMagico.createLayer('ossos2', [this.tilesetMundoMagico])

    // Animação migalha //
    this.anims.create({
      key: 'migalha-girando',
      frames: this.anims.generateFrameNumbers('migalha', {
        start: 0,
        end: 3
      }),
      frameRate: 5,
      repeat: -1
    })

    // Colisões //

    /*  this.layerChao.setCollisionByProperty({ canCollide: true })
    this.layerLapideF04.setCollisionByProperty({ canCollide: true })
    this.layerOssos1.setCollisionByProperty({ canCollide: true })
    this.layerOssos2.setCollisionByProperty({ canCollide: true })
*/

    // Migalha //
    this.migalhas = [
      {
        x: 224,
        y: 5832
      },
      {
        x: 224,
        y: 5632
      },
      {
        x: 320,
        y: -600
      },
      {
        x: -330,
        y: -600
      },
      {
        x: 1920,
        y: -600
      },
      {
        x: -195,
        y: 100
      },
      {
        x: 1535,
        y: 100
      },
      {
        x: 575,
        y: 100
      }

    ]

    this.migalhas.forEach((migalha) => {
      migalha.objeto = this.physics.add.sprite(migalha.x, migalha.y, 'migalha')
        .setImmovable()
      migalha.objeto.anims.play('migalha-girando', true)
    })

    // Fantasma //

    // Caldeirão //

    this.caldeirao2 = this.physics.add.sprite(224, 19130, 'caldeirao')

    // Isa //

    // Personagem //

    if (this.game.jogadores.primeiro === this.game.socket.id) {
      this.local = `sprite-${this.game.estadoPersonagem.spriteId}`
      this.remoto = `sprite-${this.game.estadoPersonagemRemoto.spriteId}`
      this.personagemLocal = this.physics.add.sprite(140, 18800, this.local)
        .setSize(52, 40)
        .setOffset(20, 64)
        .setImmovable()
      this.personagemRemoto = this.add.sprite(324, 18960, this.remoto)
    } else if (this.game.jogadores.segundo === this.game.socket.id) {
      this.local = `sprite-${this.game.estadoPersonagem.spriteId}`
      this.remoto = `sprite-${this.game.estadoPersonagemRemoto.spriteId}`
      this.personagemLocal = this.physics.add.sprite(324, 18800, this.local)
        .setSize(52, 40)
        .setOffset(20, 64)
        .setImmovable()
      this.personagemRemoto = this.add.sprite(140, 18960, this.remoto)

      // this.layerLapideT04 = this.tilemapMundoMagico.createLayer('lapideT-04', [this.tilesetMundoMagico])

      //  this.layerLapideT04.setCollisionByProperty({ canCollide: true })

      // Collider //

      /* this.physics.add.collider(this.personagemLocal, this.layerChao)
      this.physics.add.collider(this.personagemLocal, this.layerLapideF04, this.danoCenario, null, this)
      this.physics.add.collider(this.personagemLocal, this.layerOssos1, this.danoCenario, null, this)
      this.physics.add.collider(this.personagemLocal, this.layerOssos2, this.danoCenario, null, this)

      this.physics.add.collider(this.personagemLocal, this.caldeirao2, this.entrarCaldeirao, null, this)
*/
      this.migalhas.forEach((migalha) => {
        this.physics.add.collider(migalha.objeto, this.layerChao)
        this.physics.add.collider(migalha.objeto, this.layerLapideF04)
        this.physics.add.collider(migalha.objeto, this.layerOssos1)
        this.physics.add.collider(migalha.objeto, this.layerOssos2)
        this.physics.add.overlap(this.personagemLocal, migalha.objeto, this.coletarMigalha, null, this)
      })

      // Score //

      this.texto = this.add.text(26, 68, `Migalhas: ${this.game.scoreMigalha.score}`, {
        fontFamily: 'Silkscreen',
        fontSize: '20px',
        stroke: '#000000',
        strokeThickness: 4,
        fill: '#ffffff'
      })
      this.texto.setScrollFactor(0)

      // Animações //

      this.anims.create({
        key: 'pato-walk',
        frames: this.anims.generateFrameNumbers(this.local, {
          start: 44,
          end: 65
        }),
        frameRate: 40,
        repeat: -1
      })

      this.anims.create({
        key: 'pato-idle',
        frames: this.anims.generateFrameNumbers(this.local, {
          start: 0,
          end: 43
        }),
        frameRate: 40,
        repeat: -1
      })

      // Animações automáticas //

      this.coracoes = this.add.sprite(100, 42, 'coracoes')
        .setScale(1.5)
        .setScrollFactor(0, 0)

      // Botões //

      this.cima = this.add.sprite(64, 632, 'botao-cima')
        .setInteractive()
        .on('pointerover', () => {
          this.cima.setFrame(1)
          this.personagemLocal.setVelocityY(-100)
          this.personagemLocal.anims.play('pato-walk', true)
        })
        .on('pointerout', () => {
          this.cima.setFrame(0)
          if (this.cima.frame.name === 0 && this.baixo.frame.name === 0 && this.direita.frame.name === 0 && this.esquerda.frame.name === 0) {
            this.personagemLocal.anims.play('pato-idle', true)
          }
          this.personagemLocal.setVelocityY(0)
        })
        .setScrollFactor(0, 0)

      this.baixo = this.add.sprite(64, 736, 'botao-baixo')
        .setInteractive()
        .on('pointerover', () => {
          this.baixo.setFrame(1)
          this.personagemLocal.setVelocityY(100)
          this.personagemLocal.anims.play('pato-walk', true)
        })
        .on('pointerout', () => {
          this.baixo.setFrame(0)
          if (this.cima.frame.name === 0 && this.baixo.frame.name === 0 && this.direita.frame.name === 0 && this.esquerda.frame.name === 0) {
            this.personagemLocal.anims.play('pato-idle', true)
          }
          this.personagemLocal.setVelocityY(0)
        })
        .setScrollFactor(0, 0)

      this.direita = this.add.sprite(384, 736, 'botao-direita')
        .setInteractive()
        .on('pointerover', () => {
          this.direita.setFrame(1)
          this.personagemLocal.setVelocityX(100)
          this.personagemLocal.setFlipX(true)
          this.personagemLocal.anims.play('pato-walk', true)
        })
        .on('pointerout', () => {
          this.direita.setFrame(0)
          if (this.cima.frame.name === 0 && this.baixo.frame.name === 0 && this.direita.frame.name === 0 && this.esquerda.frame.name === 0) {
            this.personagemLocal.anims.play('pato-idle', true)
          }
          this.personagemLocal.setVelocityX(0)
        })
        .setScrollFactor(0, 0)

      this.esquerda = this.add.sprite(284, 736, 'botao-esquerda')
        .setInteractive()
        .on('pointerover', () => {
          this.esquerda.setFrame(1)
          this.personagemLocal.setVelocityX(-100)
          this.personagemLocal.setFlipX(false)
          this.personagemLocal.anims.play('pato-walk', true)
        })
        .on('pointerout', () => {
          this.esquerda.setFrame(0)
          if (this.cima.frame.name === 0 && this.baixo.frame.name === 0 && this.direita.frame.name === 0 && this.esquerda.frame.name === 0) {
            this.personagemLocal.anims.play('pato-idle', true)
          }
          this.personagemLocal.setVelocityX(0)
        })
        .setScrollFactor(0, 0)

      this.telaCheia = this.add.sprite(406, 40, 'tela-cheia', 0)
        .setInteractive()
        .on('pointerover', () => {
          if (this.scale.isFullscreen) {
            this.telaCheia.setFrame(0)
            this.scale.stopFullscreen()
          } else {
            this.telaCheia.setFrame(1)
            this.scale.startFullscreen()
          }
        })
        .setScrollFactor(0)

      // Criação de limites e câmera //

      this.personagemLocal.setCollideWorldBounds(true)
      // this.physics.world.setBounds(0, 19064, 448, 0, true, true, true, false)
      // this.cameras.main.setBounds(0, 19074, 448, 6530)
      this.cameras.main.startFollow(this.personagemLocal)

      // Estado notificar //

      this.game.socket.on('estado-notificar', ({ cena, x, y, frame, flipx }) => {
        this.personagemRemoto.x = x
        this.personagemRemoto.y = y
        this.personagemRemoto.setFrame(frame)
        this.personagemRemoto.setFlipX(flipx)
      })
    }
  }

  update () {
    try {
      this.game.socket.emit('estado-publicar', this.game.sala, {
        x: this.personagemLocal.x,
        y: this.personagemLocal.y,
        frame: this.personagemLocal.frame.name,
        flipx: this.personagemLocal.flipX
      })
    } catch (error) {
      console.error(error)
    }
  }

  entrarCaldeirao (personagemLocal) {
    this.personagemLocal.setVelocityX(0)
    this.personagemLocal.setVelocityY(0)
    this.personagemLocal.setImmovable()
    this.personagemLocal.anims.play('pato-idle', true)
    this.trilhaFloresta.stop()
    this.game.scene.stop('floresta')
    this.game.scene.start('mundo-magico')
  }

  morrer (personagemLocal) {
    const centrox = this.cameras.main.worldView.x + this.cameras.main.width / 2
    const centroy = this.cameras.main.worldView.y + this.cameras.main.height / 2
    this.imagem = this.add.image(centrox, centroy, 'fundo-preto')
    this.imagem = this.add.image(centrox, centroy, 'tela-gameover')
      .setInteractive()
      .on('pointerdown', () => {
        this.game.scene.stop('floresta')
        this.game.scene.start('menu')
      })
    this.personagemLocal.setImmovable()
    this.personagemLocal.setVelocityX(0)
    this.personagemLocal.setVelocityY(0)
    this.personagemLocal.anims.play('pato-idle', true)
    this.cobra.setVelocityY(0)
    this.cobra.disableBody(true, false)
    this.game.scoreMigalha.score = 0
    this.game.vida.frameCoracoes = 0
    this.texto.setText(`Migalhas: ${this.game.scoreMigalha.score}`)
    this.trilhaFloresta.stop()
    this.audioGameover.play()
  }

  coletarMigalha (migalha) {
    migalha.disableBody(true, true)
    this.game.scoreMigalha.score++
    this.texto.setText(`Migalhas: ${this.game.scoreMigalha.score}`)
    this.audioMigalha.play()
    return false
  }

  colisaoCobra () {
    this.cobra
      .setSize(72, 33)
      .setOffset(21, 54)
  }

  danoCobra (coracoes) {
    this.cobra
      .setSize(1, 1)
      .setOffset(1000000, 10000000000000)
    this.time.addEvent({
      callback: () => { this.colisaoCobra() },
      delay: 1000,
      callbackScope: this,
      loop: false
    })
    if (this.coracoes.frame.name === 5) {
      this.coracoes.setFrame(6)
    } else {
      this.game.vida.frameCoracoes += 2
      this.coracoes.setFrame(`${this.game.vida.frameCoracoes}`)
    }
    if (this.coracoes.frame.name === 6) {
      this.morrer()
    }
  }

  danoCenario (coracoes) {
    this.game.vida.frameCoracoes += 1
    this.coracoes.setFrame(`${this.game.vida.frameCoracoes}`)
    if (this.coracoes.frame.name === 6) {
      this.morrer()
    }
  }
}
