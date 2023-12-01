/* eslint-disable no-return-assign */
/* eslint-disable no-undef */
// eslint-disable-next-line no-template-curly-in-string
export default class praia extends Phaser.Scene {
  constructor () {
    super('praia')
  }

  preload () {
    this.load.tilemapTiledJSON('mapa', '../assets/mapa/mapa-full.json')

    this.load.image('tileset-geral', '../assets/mapa/tileset-geral.png')

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
    this.load.spritesheet('tucano-idle', '../assets/patos/tucano/tucano-oculos.png', {
      frameWidth: 92,
      frameHeight: 108
    })
    this.load.spritesheet('caranguejo', '../assets/inimigos/caranguejo.png', {
      frameWidth: 34,
      frameHeight: 18
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

    this.load.spritesheet('caixa-de-som', '../assets/caixa-de-som.png', {
      frameWidth: 60,
      frameHeight: 60
    })

    this.load.audio('trilha-praia', '../assets/audios/trilha-praia.mp3')

    this.load.audio('audio-migalha', '../assets/audios/migalha.mp3')

    this.load.audio('audio-dano', '../assets/audios/dano.mp3')

    this.load.audio('audio-vitoria', '../assets/audios/vitoria.mp3')

    this.load.audio('audio-gameover', './assets/audios/gameover.mp3')
  }

  create () {
    // Cena corrente //

    this.game.cenaCorrente = 'praia'

    // Áudio //

    this.trilhaPraia = this.sound.add('trilha-praia')
    this.trilhaPraia.loop = true
    this.trilhaPraia.play()

    this.audioMigalha = this.sound.add('audio-migalha')
    this.audioDano = this.sound.add('audio-dano')
    this.audioVitoria = this.sound.add('audio-vitoria')
    this.audioGameover = this.sound.add('audio-gameover')

    // Criação de mapa e objetos //

    this.tilemapMapa = this.make.tilemap({
      key: 'mapa'
    })

    this.tilesetGeral = this.tilemapMapa.addTilesetImage('tileset-geral')

    this.layerChao = this.tilemapMapa.createLayer('chao', [this.tilesetGeral])

    // Área começo //

    this.area0 = this.add.rectangle(224, 6500, 448, 20, 0xFFFFFF, 0)
    this.physics.world.enable(this.area0)
    this.area0.body.setAllowGravity(false)
    this.area0.body.setImmovable(true)

    // Áreas laterais //

    this.area1 = this.add.rectangle(-220, 5500, 1, 6700, 0xFFFFFF, 0)
    this.physics.world.enable(this.area1)
    this.area1.body.setAllowGravity(false)
    this.area1.body.setImmovable(true)

    this.area2 = this.add.rectangle(720, 6500, 1, 6700, 0xFFFFFF, 0)
    this.physics.world.enable(this.area2)
    this.area2.body.setAllowGravity(false)
    this.area2.body.setImmovable(true)

    // Áreas trigger caranguejosCB //

    this.area3 = this.add.rectangle(224, 4595, 448, 20, 0xFFFFFF, 0)
    this.physics.world.enable(this.area3)
    this.area3.body.setAllowGravity(false)
    this.area3.body.setImmovable(true)

    this.area4 = this.add.rectangle(224, 1990, 448, 20, 0xFFFFFF, 0)
    this.physics.world.enable(this.area4)
    this.area4.body.setAllowGravity(false)
    this.area4.body.setImmovable(true)

    // Área trigger caranguejosBC //

    this.area5 = this.add.rectangle(224, 6076, 448, 20, 0xFFFFFF, 0)
    this.physics.world.enable(this.area5)
    this.area5.body.setAllowGravity(false)
    this.area5.body.setImmovable(true)

    this.layerSombra = this.tilemapMapa.createLayer('sombra', [this.tilesetGeral])
    this.layerTronco01 = this.tilemapMapa.createLayer('tronco-01', [this.tilesetGeral])
    this.layerPedra = this.tilemapMapa.createLayer('pedra', [this.tilesetGeral])
    this.layerNaFrente03 = this.tilemapMapa.createLayer('naFrente-03', [this.tilesetGeral])
    this.layerLapideF04 = this.tilemapMapa.createLayer('lapideF-04', [this.tilesetGeral])
    this.layerOssos1 = this.tilemapMapa.createLayer('ossos1', [this.tilesetGeral])
    this.layerOssos2 = this.tilemapMapa.createLayer('ossos2', [this.tilesetGeral])
    this.layerCercaF = this.tilemapMapa.createLayer('cercaF', [this.tilesetGeral])
    this.layerCasteloF = this.tilemapMapa.createLayer('casteloF', [this.tilesetGeral])

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

    // Animação fantsama //

    this.anims.create({
      key: 'caranguejo',
      frames: this.anims.generateFrameNumbers('caranguejo', {
        start: 0,
        end: 11
      }),
      frameRate: 8,
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
        x: 240,
        y: 6192
      },
      {
        x: 248,
        y: 5816
      },
      {
        x: 80,
        y: 5600
      },
      {
        x: 168,
        y: 5224
      },
      {
        x: 312,
        y: 4880
      },
      {
        x: 256,
        y: 4624
      },
      {
        x: 88,
        y: 4384
      },
      {
        x: 112,
        y: 4032
      },
      {
        x: 248,
        y: 3816
      },
      {
        x: 360,
        y: 3600
      },
      {
        x: 184,
        y: 3328
      },
      {
        x: 224,
        y: 3032
      },
      {
        x: 80,
        y: 2784
      },
      {
        x: 216,
        y: 2496
      },
      {
        x: 216,
        y: 2160
      },
      {
        x: 88,
        y: 1896
      },
      {
        x: 312,
        y: 1576
      },
      {
        x: 96,
        y: 1280
      },
      {
        x: 208,
        y: 1008
      },
      {
        x: 320,
        y: 672
      }
    ]

    this.migalhas.forEach((migalha) => {
      migalha.objeto = this.physics.add.sprite(migalha.x, migalha.y, 'migalha')
        .setImmovable()
      migalha.objeto.anims.play('migalha-girando', true)
    })

    // Caranguejos //

    this.caranguejosD = [
      {
        x: 720,
        y: 2816
      },
      {
        x: 720,
        y: 613
      }
    ]

    this.caranguejosD.forEach((caranguejoD) => {
      caranguejoD.objeto = this.physics.add.sprite(caranguejoD.x, caranguejoD.y, 'caranguejo')
        .setImmovable(true)
        .setVelocityX(-350)
      caranguejoD.objeto.anims.play('caranguejo', true)
    })

    this.caranguejosE = [
      {
        x: -220,
        y: 5206
      }
    ]

    this.caranguejosE.forEach((caranguejoE) => {
      caranguejoE.objeto = this.physics.add.sprite(caranguejoE.x, caranguejoE.y, 'caranguejo')
        .setImmovable(true)
        .setVelocityX(350)
      caranguejoE.objeto.anims.play('caranguejo', true)
    })

    this.caranguejosCB = [
      {
        x: 140,
        y: 4278
      },
      {
        x: 142,
        y: 1741
      }
    ]

    this.caranguejosCB.forEach((caranguejoCB) => {
      caranguejoCB.objeto = this.physics.add.sprite(caranguejoCB.x, caranguejoCB.y, 'caranguejo')
        .setImmovable(true)
        .setVisible(false)
      caranguejoCB.objeto.anims.play('caranguejo', true)
    })

    this.caranguejosBC = [
      {
        x: 103,
        y: 6200
      }
    ]

    this.caranguejosBC.forEach((caranguejoBC) => {
      caranguejoBC.objeto = this.physics.add.sprite(caranguejoBC.x, caranguejoBC.y, 'caranguejo')
        .setImmovable(true)
        .disableBody(true, true)
      caranguejoBC.objeto.anims.play('caranguejo', true)
    })

    // Tucano //

    this.tucano = this.physics.add.sprite(84, 176, 'tucano-idle')
      .setSize(52, 40)
      .setOffset(20, 64)
      .setImmovable()
      .setBounce(0)

    // Caixa de som //

    this.caixaDeSom = this.physics.add.sprite(20, 212, 'caixa-de-som')
      .setImmovable()
      .setBounce(0)
      .setSize(40, 50)

    this.caixaDeSom2 = this.physics.add.sprite(146, 212, 'caixa-de-som')
      .setImmovable()
      .setBounce(0)
      .setSize(40, 50)
      .setFlipX(true)

    // Personagens //

    if (this.game.jogadores.primeiro === this.game.socket.id) {
      this.local = `sprite-${this.game.estadoPersonagem.spriteId}`
      this.remoto = `sprite-${this.game.estadoPersonagemRemoto.spriteId}`
      this.personagemLocal = this.physics.add.sprite(140, 6344, this.local)
        .setSize(52, 40)
        .setOffset(20, 64)
        .setImmovable(false)
        .setBounce(1, 1)
      this.personagemRemoto = this.add.sprite(324, 6344, this.remoto)
      if (this.game.estadoPersonagem.spritePato === this.game.estadoPersonagemRemoto.spritePato) {
        this.personagemRemoto.setTint(0x808080)
      }
    } else if (this.game.jogadores.segundo === this.game.socket.id) {
      this.local = `sprite-${this.game.estadoPersonagem.spriteId}`
      this.remoto = `sprite-${this.game.estadoPersonagemRemoto.spriteId}`
      this.personagemLocal = this.physics.add.sprite(324, 6344, this.local)
        .setSize(52, 40)
        .setOffset(20, 64)
        .setImmovable(false)
        .setBounce(1, 1)
      this.personagemRemoto = this.add.sprite(140, 6344, this.remoto)
      if (this.game.estadoPersonagem.spritePato === this.game.estadoPersonagemRemoto.spritePato) {
        this.personagemRemoto.setTint(0x808080)
      }
    }

    // Restante das camadas //

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
    this.physics.add.collider(this.personagemLocal, this.area0)
    this.physics.add.collider(this.personagemLocal, this.layerCasteloF, this.danoCenario, null, this)
    this.physics.add.collider(this.personagemLocal, this.layerCasteloT, this.danoCenario, null, this)
    this.physics.add.collider(this.personagemLocal, this.caixaDeSom, this.forcarPointerOut, null, this)
    this.physics.add.collider(this.personagemLocal, this.caixaDeSom2, this.forcarPointerOut, null, this)

    this.physics.add.overlap(this.personagemLocal, this.area3, this.area3F, null, this)
    this.physics.add.overlap(this.personagemLocal, this.area4, this.area4F, null, this)
    this.physics.add.overlap(this.personagemLocal, this.area5, this.area5F, null, this)

    this.physics.add.collider(this.tucano, this.layerChao)
    this.physics.add.collider(this.tucano, this.layerCasteloF)
    this.physics.add.collider(this.tucano, this.layerCasteloF)

    this.physics.add.collider(this.personagemLocal, this.tucano, this.encontrarTucano, null, this)

    this.migalhas.forEach((migalha) => {
      this.physics.add.collider(migalha.objeto, this.layerChao)
      this.physics.add.overlap(this.personagemLocal, migalha.objeto, this.coletarMigalha, null, this)
    })

    this.caranguejosD.forEach((caranguejoD) => {
      this.physics.add.collider(this.personagemLocal, caranguejoD.objeto, this.danoCaranguejosD, null, this)
      this.physics.add.collider(caranguejoD.objeto, this.area1, this.voltarCaranguejosD, null, this)
    })

    this.caranguejosE.forEach((caranguejoE) => {
      this.physics.add.collider(this.personagemLocal, caranguejoE.objeto, this.danoCaranguejosE, null, this)
      this.physics.add.collider(caranguejoE.objeto, this.area1, this.voltarCaranguejosE, null, this)
    })

    this.caranguejosCB.forEach((caranguejoCB) => {
      this.physics.add.collider(this.personagemLocal, caranguejoCB.objeto, this.danoCaranguejosCB, null, this)
      this.physics.add.collider(caranguejoCB.objeto, this.layerCasteloF)
    })

    this.caranguejosBC.forEach((caranguejoBC) => {
      this.physics.add.collider(this.personagemLocal, caranguejoBC.objeto, this.danoCaranguejosBC, null, this)
      this.physics.add.collider(caranguejoBC.objeto, this.layerCasteloF)
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
      key: 'tucano-idle',
      frames: this.anims.generateFrameNumbers('tucano-idle', {
        start: 0,
        end: 43
      }),
      frameRate: 40,
      repeat: -1
    })

    // Animações automáticas //

    this.tucano.anims.play('tucano-idle', true)

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
    this.physics.world.setBounds(0, 0, 448, 0, true, true, true, false)
    this.cameras.main.setBounds(0, 0, 448, 6500)
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

    // Inimigos notificar //

    this.game.socket.on('inimigos-notificar', () => {
      if (this.personagemRemoto.y < 4795 && this.personagemRemoto.y > 4395) {
        this.game.caranguejosCBLiberados = 1
      }
      if (this.personagemRemoto.y < 2190 && this.personagemRemoto.y > 1790) {
        this.game.caranguejosCBLiberados = 2
      }
      if (this.personagemRemoto.y < 6276 && this.personagemRemoto.y > 5876) {
        this.game.caranguejosBCLiberados = 1
      }
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

    if (this.game.caranguejosCBLiberados === 1) {
      this.caranguejosCB[0].objeto
        .setVisible(true)
        .setVelocityY(200)
    }
    if (this.game.caranguejosCBLiberados === 2) {
      this.caranguejosCB[1].objeto
        .setVisible(true)
        .setVelocityY(200)
    }
    if (this.game.caranguejosBCLiberados === 1) {
      this.caranguejosBC[0].objeto
        .enableBody(false, 103, 6183, true, true)
        .setVelocityY(-200)
    }
  }

  encontrarTucano (personagemLocal) {
    this.trilhaPraia.loop = false
    this.trilhaPraia.stop()
    this.audioVitoria.play()
    this.personagemLocal.setVelocityX(0)
    this.personagemLocal.setVelocityY(0)
    this.personagemLocal.setImmovable(true)
    this.cima.emit('pointerout')
    this.baixo.emit('pointerout')
    this.direita.emit('pointerout')
    this.esquerda.emit('pointerout')
    this.cima.setInteractive(false)
    this.baixo.setInteractive(false)
    this.direita.setInteractive(false)
    this.esquerda.setInteractive(false)
    this.personagemLocal.anims.play('pato-idle', true)
    this.game.migalhasGuardadas += this.game.scoreMigalha.score
    this.game.scoreMigalha.score = 0
    const centrox = this.cameras.main.worldView.x + this.cameras.main.width / 2
    const centroy = this.cameras.main.worldView.y + this.cameras.main.height / 2
    this.imagem = this.add.image(centrox, centroy, 'fundo-preto')
    this.imagem = this.add.image(centrox, centroy, 'tela-vitoria')
      .setInteractive()
      .on('pointerdown', () => {
        if (this.game.migalhasGuardadas >= 40) {
          setTimeout(() => {
            this.game.scene.stop(this.game.cenaCorrente)
            this.game.scene.start('vitoria-migalhas')
          }, 1)
        } else {
          setTimeout(() => {
            this.game.scene.stop(this.game.cenaCorrente)
            this.game.scene.start('vitoria')
          }, 1)
        }
      })
  }

  morrer (personagemLocal) {
    const centrox = this.cameras.main.worldView.x + this.cameras.main.width / 2
    const centroy = this.cameras.main.worldView.y + this.cameras.main.height / 2
    this.imagem = this.add.image(centrox, centroy, 'fundo-preto')
    this.imagem = this.add.image(centrox, centroy, 'tela-gameover')
      .setInteractive()
      .on('pointerdown', () => {
        this.game.scene.stop('praia')
        this.game.scene.start('gameover-praia')
      })
    this.trilhaPraia.loop = false
    this.trilhaPraia.stop()
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

  danoCaranguejosD (caranguejosD) {
    for (let i = 0; i < this.caranguejosD.length; i++) {
      if (!caranguejosD[i]) {
        this.ultimoCaranguejoD = this.caranguejosD[i].objeto
        this.ultimoCaranguejoD.setSize(1, 1).setOffset(100000000, 100000000)
        this.time.addEvent({
          callback: () => {
            this.caranguejosD[i].objeto
              .setSize(34, 18)
              .setOffset(0, 0)
            this.personagemLocal.setAlpha(1)
          },
          delay: 750,
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

  danoCaranguejosE (caranguejosE) {
    for (let i = 0; i < this.caranguejosE.length; i++) {
      if (!caranguejosE[i]) {
        this.ultimoCaranguejoE = this.caranguejosE[i].objeto
        this.ultimoCaranguejoE.setSize(1, 1).setOffset(100000000, 100000000)
        this.time.addEvent({
          callback: () => {
            this.caranguejosE[i].objeto
              .setSize(34, 18)
              .setOffset(0, 0)
            this.personagemLocal.setAlpha(1)
          },
          delay: 750,
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

  danoCaranguejosCB (caranguejosCB) {
    for (let i = 0; i < this.caranguejosCB.length; i++) {
      if (!caranguejosCB[i]) {
        this.ultimoCaranguejoCB = this.caranguejosCB[i].objeto
        this.ultimoCaranguejoCB.setSize(1, 1).setOffset(100000000, 100000000)
        this.time.addEvent({
          callback: () => {
            this.caranguejosCB[i].objeto
              .setSize(34, 18)
              .setOffset(0, 0)
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

  danoCaranguejosBC (caranguejosBC) {
    for (let i = 0; i < this.caranguejosBC.length; i++) {
      if (!caranguejosBC[i]) {
        this.ultimoCaranguejoBC = this.caranguejosBC[i].objeto
        this.ultimoCaranguejoBC.setSize(1, 1).setOffset(100000000, 100000000)
        this.time.addEvent({
          callback: () => {
            this.caranguejosBC[i].objeto
              .setSize(34, 18)
              .setOffset(0, 0)
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

  voltarCaranguejosD () {
    this.caranguejosD.forEach((caranguejoD) => {
      caranguejoD.objeto.setX(720)
    })
  }

  voltarCaranguejosE () {
    this.caranguejosE.forEach((caranguejoE) => {
      caranguejoE.objeto.setX(-220)
    })
  }

  area3F () {
    this.physics.world.disable(this.area3)
    this.game.socket.emit('inimigos-publicar', this.game.sala)
    if (this.game.caranguejosCBLiberados === 0) {
      this.game.caranguejosCBLiberados++
    }
  }

  area4F () {
    this.physics.world.disable(this.area4)
    this.game.socket.emit('inimigos-publicar', this.game.sala)
    if (this.game.caranguejosCBLiberados === 1) {
      this.game.caranguejosCBLiberados++
    }
  }

  area5F () {
    this.physics.world.disable(this.area5)
    this.game.socket.emit('inimigos-publicar', this.game.sala)
    if (this.game.caranguejosBCLiberados === 0) {
      this.game.caranguejosBCLiberados++
    }
  }
}
