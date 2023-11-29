/* eslint-disable no-return-assign */
/* eslint-disable no-undef */
// eslint-disable-next-line no-template-curly-in-string
export default class mundoMagico extends Phaser.Scene {
  constructor () {
    super('mundo-magico')
  }

  preload () {
    this.load.tilemapTiledJSON('mapa', '../assets/mapa/mapa-full.json')

    this.load.image('tileset-geral', '../assets/mapa/tileset-geral.png')

    this.load.image('tileset-mundomagico', '../assets/mapa/tileset-mundomagico.png')

    this.load.image('tileset-floresta', '../assets/mapa/tileset-floresta.png')

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
    this.load.spritesheet('isa-idle', '../assets/patos/isa/isa-mago.png', {
      frameWidth: 92,
      frameHeight: 108
    })
    this.load.spritesheet('fantasma', '../assets/inimigos/fantasma.png', {
      frameWidth: 60,
      frameHeight: 72
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

    this.load.spritesheet('caldeirao-mm', '../assets/caldeirao-mm.png', {
      frameWidth: 64,
      frameHeight: 64
    })

    this.load.audio('audio-migalha', '../assets/audios/migalha.mp3')

    this.load.audio('audio-dano', '../assets/audios/dano.mp3')

    this.load.audio('audio-gameover', './assets/audios/gameover.mp3')
  }

  create () {
    this.game.cenaCorrente = 'mundo-magico'

    // Áudio //

    this.audioMigalha = this.sound.add('audio-migalha')
    this.audioDano = this.sound.add('audio-dano')
    this.audioGameover = this.sound.add('audio-gameover')

    // Criação de mapa e objetos //

    this.tilemapMapa = this.make.tilemap({
      key: 'mapa'
    })

    this.tilesetGeral = this.tilemapMapa.addTilesetImage('tileset-geral')
    this.tilesetFloresta = this.tilemapMapa.addTilesetImage('tileset-floresta')
    this.tilesetMundoMagico = this.tilemapMapa.addTilesetImage('tileset-mundomagico')

    this.layerChao = this.tilemapMapa.createLayer('chao', [this.tilesetGeral])

    this.area0 = this.add.rectangle(224, 19000, 448, 20, 0xFFFFFF, 0)
    this.physics.world.enable(this.area0)
    this.area0.body.setAllowGravity(false)
    this.area0.body.setImmovable(true)

    this.area1 = this.add.rectangle(-60, 18860, 1, 6246, 0xFFFFFF, 0)
    this.physics.world.enable(this.area1)
    this.area1.body.setAllowGravity(false)
    this.area1.body.setImmovable(true)

    this.area2 = this.add.rectangle(508, 18860, 1, 6246, 0xFFFFFF, 0)
    this.physics.world.enable(this.area2)
    this.area2.body.setAllowGravity(false)
    this.area2.body.setImmovable(true)

    this.layerSombra = this.tilemapMapa.createLayer('sombra', [this.tilesetGeral])
    this.layerTronco01 = this.tilemapMapa.createLayer('tronco-01', [this.tilesetGeral])
    this.layerPedra = this.tilemapMapa.createLayer('pedra', [this.tilesetGeral])
    this.layerNaFrente03 = this.tilemapMapa.createLayer('naFrente-03', [this.tilesetGeral])
    this.layerLapideF04 = this.tilemapMapa.createLayer('lapideF-04', [this.tilesetGeral])
    this.layerOssos1 = this.tilemapMapa.createLayer('ossos1', [this.tilesetGeral])
    this.layerOssos2 = this.tilemapMapa.createLayer('ossos2', [this.tilesetGeral])
    this.layerCercaF = this.tilemapMapa.createLayer('cercaF', [this.tilesetGeral])
    this.layerCasteloF = this.tilemapMapa.createLayer('casteloF', [this.tilesetGeral])

    console.log(this.cache.tilemap.get('mapa').data)

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

    // Animação fantsama

    this.anims.create({
      key: 'fantasma',
      frames: this.anims.generateFrameNumbers('fantasma', {
        start: 0,
        end: 5
      }),
      frameRate: 10,
      repeat: -1
    })

    // Colisões //

    this.layerChao.setCollisionByProperty({ canCollide: true })
    this.layerSombra.setCollisionByProperty({ canCollide: true })
    this.layerTronco01.setCollisionByProperty({ canCollide: true })
    this.layerPedra.setCollisionByProperty({ canCollide: true })
    this.layerNaFrente03.setCollisionByProperty({ canCollide: true })
    this.layerLapideF04.setCollisionByProperty({ canCollide: true })
    this.layerOssos1.setCollisionByProperty({ canCollide: true })
    this.layerOssos2.setCollisionByProperty({ canCollide: true })
    this.layerCercaF.setCollisionByProperty({ canCollide: true })
    this.layerCasteloF.setCollisionByProperty({ canCollide: true })

    // Migalha //

    this.migalhas = [
      {
        x: 328,
        y: 18768
      },
      {
        x: 400,
        y: 18480
      },
      {
        x: 208,
        y: 18144
      },
      {
        x: 384,
        y: 17848
      },
      {
        x: 304,
        y: 17552
      },
      {
        x: 104,
        y: 17248
      },
      {
        x: 312,
        y: 16992
      },
      {
        x: 168,
        y: 16696
      },
      {
        x: 288,
        y: 16368
      },
      {
        x: 120,
        y: 16112
      },
      {
        x: 144,
        y: 15816
      },
      {
        x: 352,
        y: 15536
      },
      {
        x: 296,
        y: 15288
      },
      {
        x: 104,
        y: 15160
      },
      {
        x: 240,
        y: 14848
      },
      {
        x: 72,
        y: 14544
      },
      {
        x: 200,
        y: 14248
      },
      {
        x: 360,
        y: 13968
      },
      {
        x: 88,
        y: 13528
      },
      {
        x: 192,
        y: 13104
      }
    ]

    this.migalhas.forEach((migalha) => {
      migalha.objeto = this.physics.add.sprite(migalha.x, migalha.y, 'migalha')
        .setImmovable()
      migalha.objeto.anims.play('migalha-girando', true)
    })

    // Fantasma //

    this.fantasmasD = [
      {
        x: 224,
        y: 18436
      },
      {
        x: 508,
        y: 17945
      },
      {
        x: 508,
        y: 15260
      },
      {
        x: 508,
        y: 13120
      }
    ]

    this.fantasmasD.forEach((fantasmaD) => {
      fantasmaD.objeto = this.physics.add.sprite(fantasmaD.x, fantasmaD.y, 'fantasma')
        .setImmovable()
        .setSize(48, 36)
        .setOffset(4, 20)
        .setVelocityX(-150)
      fantasmaD.objeto.anims.play('fantasma', true)
      this.time.addEvent({
        callback: () => { this.fantasmaInvisivel() },
        delay: 3000,
        callbackScope: this,
        loop: true
      })
    })

    this.fantasmasE = [
      {
        x: 30,
        y: 17268
      },
      {
        x: 30,
        y: 14218
      },
      {
        x: 30,
        y: 13490
      }
    ]

    this.fantasmasE.forEach((fantasmaE) => {
      fantasmaE.objeto = this.physics.add.sprite(fantasmaE.x, fantasmaE.y, 'fantasma')
        .setImmovable()
        .setSize(48, 36)
        .setOffset(4, 20)
        .setVelocityX(150)
        .setFlipX(true)
      fantasmaE.objeto.anims.play('fantasma', true)
      this.time.addEvent({
        callback: () => { this.fantasmaInvisivel() },
        delay: 3000,
        callbackScope: this,
        loop: true
      })
    })

    // Caldeirões //

    this.caldeirao1 = this.physics.add.sprite(224, 18928, 'caldeirao-mm')
      .setImmovable()
      .setBounce(0)
      .setSize(60, 48)
      .setOffset(2, 10)

    this.caldeirao2 = this.physics.add.sprite(224, 12824, 'caldeirao-mm')
      .setImmovable()
      .setBounce(0)
      .setSize(60, 48)
      .setOffset(2, 10)

    // Isa //

    this.isa = this.physics.add.sprite(73, 12884, 'isa-idle')
      .setSize(52, 40)
      .setOffset(20, 64)
      .setImmovable()
      .setBounce(0)

    // Personagem //

    if (this.game.jogadores.primeiro === this.game.socket.id) {
      this.local = `sprite-${this.game.estadoPersonagem.spriteId}`
      this.remoto = `sprite-${this.game.estadoPersonagemRemoto.spriteId}`
      this.personagemLocal = this.physics.add.sprite(140, 18860, this.local)
        .setSize(52, 40)
        .setOffset(20, 64)
        .setImmovable(false)
        .setBounce(1, 1)
      this.personagemRemoto = this.add.sprite(324, 18860, this.remoto)
      if (this.game.estadoPersonagem.spritePato === this.game.estadoPersonagemRemoto.spritePato) {
        this.personagemRemoto.setTint(0x808080)
      }
    } else if (this.game.jogadores.segundo === this.game.socket.id) {
      this.local = `sprite-${this.game.estadoPersonagem.spriteId}`
      this.remoto = `sprite-${this.game.estadoPersonagemRemoto.spriteId}`
      this.personagemLocal = this.physics.add.sprite(324, 18860, this.local)
        .setSize(52, 40)
        .setOffset(20, 64)
        .setImmovable(false)
        .setBounce(1, 1)
      this.personagemRemoto = this.add.sprite(140, 18860, this.remoto)
      if (this.game.estadoPersonagem.spritePato === this.game.estadoPersonagemRemoto.spritePato) {
        this.personagemRemoto.setTint(0x808080)
      }
    }
    this.layerAtras03 = this.tilemapMapa.createLayer('atras-03', [this.tilesetGeral])
    this.layerCopaT01 = this.tilemapMapa.createLayer('copaT-01', [this.tilesetGeral])
    this.layerCopaF01 = this.tilemapMapa.createLayer('copaF-01', [this.tilesetGeral])
    this.layerLapideT04 = this.tilemapMapa.createLayer('lapideT-04', [this.tilesetGeral])
    this.layerCercaT = this.tilemapMapa.createLayer('cercaT', [this.tilesetGeral])
    this.layerCasteloT = this.tilemapMapa.createLayer('casteloT', [this.tilesetGeral])

    this.layerAtras03.setCollisionByProperty({ canCollide: true })
    this.layerCopaT01.setCollisionByProperty({ canCollide: true })
    this.layerCopaF01.setCollisionByProperty({ canCollide: true })
    this.layerLapideT04.setCollisionByProperty({ canCollide: true })
    this.layerCercaT.setCollisionByProperty({ canCollide: true })
    this.layerCasteloT.setCollisionByProperty({ canCollide: true })

    // Collider //

    this.physics.add.collider(this.personagemLocal, this.layerChao)
    this.physics.add.collider(this.personagemLocal, this.layerLapideF04, this.danoCenario, null, this)
    this.physics.add.collider(this.personagemLocal, this.layerOssos1, this.danoCenario, null, this)
    this.physics.add.collider(this.personagemLocal, this.layerOssos2, this.danoCenario, null, this)

    this.physics.add.collider(this.isa, this.layerChao)
    this.physics.add.collider(this.isa, this.layerLapideF04)
    this.physics.add.collider(this.isa, this.layerOssos1)
    this.physics.add.collider(this.isa, this.layerOssos2)

    this.physics.add.collider(this.personagemLocal, this.isa, this.forcarPointerOut, null, this)

    this.physics.add.collider(this.area0, this.layerChao)
    this.physics.add.collider(this.area0, this.layerPedra)
    this.physics.add.collider(this.area0, this.layerTronco01)
    this.physics.add.collider(this.area0, this.layerNaFrente03)
    this.physics.add.collider(this.personagemLocal, this.area0)

    this.physics.add.collider(this.caldeirao1, this.layerChao)
    this.physics.add.collider(this.caldeirao1, this.layerLapideF04)
    this.physics.add.collider(this.caldeirao1, this.layerOssos1)
    this.physics.add.collider(this.caldeirao1, this.layerOssos2)

    this.physics.add.collider(this.personagemLocal, this.caldeirao1, this.forcarPointerOut, null, this)

    this.physics.add.collider(this.caldeirao2, this.layerChao)
    this.physics.add.collider(this.caldeirao2, this.layerPedra)
    this.physics.add.collider(this.caldeirao2, this.layerTronco01)
    this.physics.add.collider(this.caldeirao2, this.layerNaFrente03)

    this.fantasmasD.forEach((fantasmaD) => {
      this.physics.add.collider(this.personagemLocal, fantasmaD.objeto, this.danoFantasmasD, null, this)
      this.physics.add.collider(fantasmaD.objeto, this.area1, this.voltarFantasmasD, null, this)
    })
    this.fantasmasD.forEach((fantasmaE) => {
      this.physics.add.collider(this.personagemLocal, fantasmaE.objeto, this.danoFantasmasE, null, this)
      this.physics.add.collider(fantasmaE.objeto, this.area2, this.voltarFantasmasE, null, this)
    })

    this.physics.add.collider(this.personagemLocal, this.caldeirao2, this.entrarCaldeirao, null, this)

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

    this.anims.create({
      key: 'isa-idle',
      frames: this.anims.generateFrameNumbers('isa-idle', {
        start: 0,
        end: 43
      }),
      frameRate: 40,
      repeat: -1
    })

    // Animações automáticas //

    this.isa.anims.play('isa-idle', true)

    // Corações //

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

    this.personagemLocal.setCollideWorldBounds(true, 0, 0)
    this.physics.world.setBounds(0, 12770, 448, 0, true, true, true, false)
    this.cameras.main.setBounds(0, 12760, 448, 6246)
    this.cameras.main.startFollow(this.personagemLocal)

    // Estado notificar //

    this.game.socket.on('estado-notificar', ({ cena, x, y, frame, flipx }) => {
      this.personagemRemoto.x = x
      this.personagemRemoto.y = y
      this.personagemRemoto.setFrame(frame)
      this.personagemRemoto.setFlipX(flipx)
    })

    // Artefatos notificar //

    this.game.socket.on('artefatos-notificar', (artefatos) => {
      if (artefatos.migalhas) {
        for (let i = 0; i < artefatos.migalhas.length; i++) {
          if (!artefatos.migalhas[i]) {
            this.migalhas[i].objeto.disableBody(true, true)
          }
        }
      }
    })

    // Dano notificar //

    this.game.socket.on('dano-notificar', () => {
      this.personagemRemoto.setTint(0xFF0000)
      this.time.addEvent({
        callback: () => { this.corNormalRemoto() },
        delay: 200,
        callbackScope: this,
        loop: false
      })
    })
  }

  update () {
    try {
      this.game.socket.emit('estado-publicar', this.game.sala, {
        cena: 'mundo-magico',
        x: this.personagemLocal.x,
        y: this.personagemLocal.y,
        frame: this.personagemLocal.frame.name,
        flipx: this.personagemLocal.flipX
      })
    } catch (error) {
      console.error(error)
    }

    try {
      if (!this.personagemRemoto) {
        this.personagem = this.add.sprite(this.personagem.x, this.personagem.y, this.personagem.frame.name)
      }
    } catch (error) {
      console.error(error)
    }
  }

  entrarCaldeirao (personagemLocal) {
    this.personagemLocal.setVelocityX(0)
    this.personagemLocal.setVelocityY(0)
    this.personagemLocal.setImmovable()
    this.personagemLocal.anims.play('pato-idle', true)
    this.game.socket.emit('cena-publicar', this.game.sala, 'campo')
    this.game.scene.stop(this.game.cenaCorrente)
    this.game.scene.start('campo')
  }

  morrer (personagemLocal) {
    const centrox = this.cameras.main.worldView.x + this.cameras.main.width / 2
    const centroy = this.cameras.main.worldView.y + this.cameras.main.height / 2
    this.imagem = this.add.image(centrox, centroy, 'fundo-preto')
    this.imagem = this.add.image(centrox, centroy, 'tela-gameover')
      .setInteractive()
      .on('pointerdown', () => {
        this.game.scene.stop('mundo-magico')
        this.game.scene.start('gameover-mundo-magico')
      })
    this.personagemLocal.setImmovable()
    this.personagemLocal.setVelocityX(0)
    this.personagemLocal.setVelocityY(0)
    this.personagemLocal.anims.play('pato-idle', true)
    this.cima.emit('pointerout')
    this.baixo.emit('pointerout')
    this.direita.emit('pointerout')
    this.esquerda.emit('pointerout')
    this.cima.setInteractive(false)
    this.baixo.setInteractive(false)
    this.direita.setInteractive(false)
    this.esquerda.setInteractive(false)
    this.game.migalhasGuardadas += this.game.scoreMigalha.score
    this.game.scoreMigalha.score = 0
    this.game.vida.frameCoracoes = 0
    this.texto.setText(`Migalhas: ${this.game.scoreMigalha.score}`)
    this.audioGameover.play()
  }

  coletarMigalha (personagemLocal, migalha) {
    migalha.disableBody(true, true)
    this.game.scoreMigalha.score++
    this.texto.setText(`Migalhas: ${this.game.scoreMigalha.score}`)
    this.audioMigalha.play()
    this.game.socket.emit('artefatos-publicar', this.game.sala, {
      migalhas: this.migalhas.map((migalha) => migalha.objeto.visible)
    })
  }

  corNormalLocal () {
    this.personagemLocal.setTint(0xFFFFFF)
  }

  corNormalRemoto () {
    if (this.game.estadoPersonagem.spritePato === this.game.estadoPersonagemRemoto.spritePato) {
      this.personagemRemoto.setTint(0x808080)
    } else {
      this.personagemRemoto.setTint(0xFFFFFF)
    }
  }

  danoFantasmasD (fantasmasD) {
    for (let i = 0; i < this.fantasmasD.length; i++) {
      if (!fantasmasD[i]) {
        this.ultimoFantasmaD = this.fantasmasD[i].objeto
        this.ultimoFantasmaD.setSize(1, 1).setOffset(100000000, 100000000)
        this.time.addEvent({
          callback: () => {
            this.fantasmasD[i].objeto
              .setSize(48, 36)
              .setOffset(4, 20)
            this.personagemLocal.setAlpha(1)
          },
          delay: 1500,
          callbackScope: this,
          loop: false
        })
      }
    }
    this.audioDano.play()
    this.personagemLocal.setAlpha(0.75)
    this.personagemLocal.setTint(0xFF0000)
    this.time.addEvent({
      callback: () => { this.corNormalLocal() },
      delay: 200,
      callbackScope: this,
      loop: false
    })
    this.time.addEvent({
      callback: () => { this.forcarPointerOut() },
      delay: 350,
      callbackScope: this,
      loop: false
    })
    this.game.socket.emit('dano-publicar', this.game.sala)
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

  danoFantasmasE (fantasmasE) {
    for (let i = 0; i < this.fantasmasE.length; i++) {
      if (!fantasmasE[i]) {
        this.ultimoFantasmaD = this.fantasmasE[i].objeto
        this.ultimoFantasmaE.setSize(1, 1).setOffset(100000000, 100000000)
        this.time.addEvent({
          callback: () => {
            this.fantasmasE[i].objeto
              .setSize(48, 36)
              .setOffset(4, 20)
            this.personagemLocal.setAlpha(1)
          },
          delay: 1500,
          callbackScope: this,
          loop: false
        })
      }
    }
    this.audioDano.play()
    this.personagemLocal.setAlpha(0.75)
    this.personagemLocal.setTint(0xFF0000)
    this.time.addEvent({
      callback: () => { this.corNormalLocal() },
      delay: 200,
      callbackScope: this,
      loop: false
    })
    this.time.addEvent({
      callback: () => { this.forcarPointerOut() },
      delay: 350,
      callbackScope: this,
      loop: false
    })
    this.game.socket.emit('dano-publicar', this.game.sala)
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

  danoCenario () {
    this.audioDano.play()
    this.personagemLocal.setTint(0xFF0000)
    this.time.addEvent({
      callback: () => { this.corNormalLocal() },
      delay: 500,
      callbackScope: this,
      loop: false
    })
    this.time.addEvent({
      callback: () => { this.forcarPointerOut() },
      delay: 500,
      callbackScope: this,
      loop: false
    })
    this.game.socket.emit('dano-publicar', this.game.sala)
    this.game.vida.frameCoracoes += 1
    this.coracoes.setFrame(`${this.game.vida.frameCoracoes}`)
    if (this.coracoes.frame.name === 6) {
      this.morrer()
    }
  }

  forcarPointerOut () {
    if (this.cima.frame.name === 1) {
      this.cima.emit('pointerout')
      this.cima.emit('pointerover')
    }
    if (this.baixo.frame.name === 1) {
      this.baixo.emit('pointerout')
      this.baixo.emit('pointerover')
    }
    if (this.direita.frame.name === 1) {
      this.direita.emit('pointerout')
      this.direita.emit('pointerover')
    }
    if (this.esquerda.frame.name === 1) {
      this.esquerda.emit('pointerout')
      this.esquerda.emit('pointerover')
    }
  }

  voltarFantasmasD () {
    this.fantasmasD.forEach((fantasmaD) => {
      fantasmaD.objeto.setX(508)
    })
  }

  voltarFantasmasE () {
    this.fantasmasE.forEach((fantasmaE) => {
      fantasmaE.objeto.setX(-60)
    })
  }

  fantasmaInvisivel () {
    this.fantasmasD.forEach((fantasmaD) => {
      fantasmaD.objeto.setAlpha(0.25)
      this.time.addEvent({
        callback: () => { this.fantasmaVisivel() },
        delay: 2000,
        callbackScope: this,
        loop: false
      })
    })
  }

  fantasmaVisivel () {
    this.fantasmasD.forEach((fantasmaD) => {
      fantasmaD.objeto.setAlpha(1)
    })
  }
}
