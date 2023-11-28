/* eslint-disable no-return-assign */
/* eslint-disable no-undef */
// eslint-disable-next-line no-template-curly-in-string
export default class campo extends Phaser.Scene {
  constructor () {
    super('campo')
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
    this.load.spritesheet('pam-idle', '../assets/patos/pam/pam-palha.png', {
      frameWidth: 92,
      frameHeight: 108
    })
    this.load.spritesheet('vaca', '../assets/inimigos/vaca.png', {
      frameWidth: 128,
      frameHeight: 88
    })
    this.load.spritesheet('trator', '../assets/inimigos/trator.png', {
      frameWidth: 152,
      frameHeight: 96
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

    this.tilemapMapa = this.make.tilemap({
      key: 'mapa'
    })

    this.tilesetGeral = this.tilemapMapa.addTilesetImage('tileset-geral')

    this.layerChao = this.tilemapMapa.createLayer('chao', [this.tilesetGeral])

    // Área começo //

    this.area0 = this.add.rectangle(224, 12680, 448, 20, 0xFFFFFF, 1)
    this.physics.world.enable(this.area0)
    this.area0.body.setAllowGravity(false)
    this.area0.body.setImmovable(true)

    // Área lateral //

    this.area1 = this.add.rectangle(-200, 11720, 1, 6246, 0xFFFFFF, 1)
    this.physics.world.enable(this.area1)
    this.area1.body.setAllowGravity(false)
    this.area1.body.setImmovable(true)

    // Áreas trigger tratoresD //

    this.area2 = this.add.rectangle(100, 12700, 52, 40, 0xFFFFFF, 1)
    this.physics.world.enable(this.area2)
    this.area2.body.setAllowGravity(false)
    this.area2.body.setImmovable(true)

    this.area3 = this.add.rectangle(224, 9814, 448, 20, 0xFFFFFF, 1)
    this.physics.world.enable(this.area3)
    this.area3.body.setAllowGravity(false)
    this.area3.body.setImmovable(true)

    this.area4 = this.add.rectangle(224, 8024, 448, 20, 0xFFFFFF, 1)
    this.physics.world.enable(this.area4)
    this.area4.body.setAllowGravity(false)
    this.area4.body.setImmovable(true)

    this.area5 = this.add.rectangle(224, 7490, 448, 20, 0xFFFFFF, 1)
    this.physics.world.enable(this.area5)
    this.area5.body.setAllowGravity(false)
    this.area5.body.setImmovable(true)

    // Áreas trigger tratoresE //

    this.area6 = this.add.rectangle(224, 11196, 448, 20, 0xFFFFFF, 1)
    this.physics.world.enable(this.area6)
    this.area6.body.setAllowGravity(false)
    this.area6.body.setImmovable(true)

    this.area7 = this.add.rectangle(109, 8456, 52, 40, 0xFFFFFF, 1)
    this.physics.world.enable(this.area7)
    this.area7.body.setAllowGravity(false)
    this.area7.body.setImmovable(true)

    this.area8 = this.add.rectangle(224, 7103, 448, 20, 0xFFFFFF, 1)
    this.physics.world.enable(this.area8)
    this.area8.body.setAllowGravity(false)
    this.area8.body.setImmovable(true)

    // Áreas parar tratoresD //

    this.areaP0 = this.add.rectangle(117, 11558, 52, 40, 0xFFFFFF, 1)
    this.physics.world.enable(this.areaP0)
    this.areaP0.body.setAllowGravity(false)
    this.areaP0.body.setImmovable(true)

    this.areaP1 = this.add.rectangle(132, 9700, 52, 40, 0xFFFFFF, 1)
    this.physics.world.enable(this.areaP1)
    this.areaP1.body.setAllowGravity(false)
    this.areaP1.body.setImmovable(true)

    this.areaP2 = this.add.rectangle(116, 7838, 52, 40, 0xFFFFFF, 1)
    this.physics.world.enable(this.areaP2)
    this.areaP2.body.setAllowGravity(false)
    this.areaP2.body.setImmovable(true)

    this.areaP3 = this.add.rectangle(26, 7415, 52, 40, 0xFFFFFF, 1)
    this.physics.world.enable(this.areaP3)
    this.areaP3.body.setAllowGravity(false)
    this.areaP3.body.setImmovable(true)

    // Áreas parar tratoresE //

    this.areaP4 = this.add.rectangle(212, 11063, 52, 40, 0xFFFFFF, 1)
    this.physics.world.enable(this.areaP4)
    this.areaP4.body.setAllowGravity(false)
    this.areaP4.body.setImmovable(true)

    this.areaP5 = this.add.rectangle(212, 8346, 52, 40, 0xFFFFFF, 1)
    this.physics.world.enable(this.areaP5)
    this.areaP5.body.setAllowGravity(false)
    this.areaP5.body.setImmovable(true)

    this.areaP6 = this.add.rectangle(142, 7045, 52, 40, 0xFFFFFF, 1)
    this.physics.world.enable(this.areaP6)
    this.areaP6.body.setAllowGravity(false)
    this.areaP6.body.setImmovable(true)

    this.layerTronco01 = this.tilemapMapa.createLayer('tronco-01', [this.tilesetGeral])
    this.layerPedra = this.tilemapMapa.createLayer('pedra', [this.tilesetGeral])
    this.layerNaFrente03 = this.tilemapMapa.createLayer('naFrente-03', [this.tilesetGeral])
    this.layerLapideF04 = this.tilemapMapa.createLayer('lapideF-04', [this.tilesetGeral])
    this.layerOssos1 = this.tilemapMapa.createLayer('ossos1', [this.tilesetGeral])
    this.layerOssos2 = this.tilemapMapa.createLayer('ossos2', [this.tilesetGeral])
    this.layerCercaF = this.tilemapMapa.createLayer('cercaF', [this.tilesetGeral])

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

    // Animação vaca //

    this.anims.create({
      key: 'vaca',
      frames: this.anims.generateFrameNumbers('vaca', {
        start: 0,
        end: 7
      }),
      frameRate: 10,
      repeat: -1
    })

    // Animação trator //

    this.anims.create({
      key: 'trator',
      frames: this.anims.generateFrameNumbers('trator', {
        start: 0,
        end: 2
      }),
      frameRate: 10,
      repeat: -1
    })

    // Colisões //

    this.layerChao.setCollisionByProperty({ canCollide: true })
    this.layerTronco01.setCollisionByProperty({ canCollide: true })
    this.layerPedra.setCollisionByProperty({ canCollide: true })
    this.layerNaFrente03.setCollisionByProperty({ canCollide: true })
    this.layerLapideF04.setCollisionByProperty({ canCollide: true })
    this.layerOssos1.setCollisionByProperty({ canCollide: true })
    this.layerOssos2.setCollisionByProperty({ canCollide: true })
    this.layerCercaF.setCollisionByProperty({ canCollide: true })

    // Migalha //

    this.migalhas = [
      {
        x: 144,
        y: 12440
      },
      {
        x: 344,
        y: 12168
      },
      {
        x: 312,
        y: 11872
      },
      {
        x: 104,
        y: 11768
      },
      {
        x: 344,
        y: 11488
      },
      {
        x: 248,
        y: 11368
      },
      {
        x: 424,
        y: 11136
      },
      {
        x: 392,
        y: 10848
      },
      {
        x: 272,
        y: 10448
      },
      {
        x: 104,
        y: 10128
      },
      {
        x: 64,
        y: 9744
      },
      {
        x: 344,
        y: 9488
      },
      {
        x: 224,
        y: 9016
      },
      {
        x: 328,
        y: 8728
      },
      {
        x: 104,
        y: 8496
      },
      {
        x: 160,
        y: 8120
      },
      {
        x: 248,
        y: 7760
      },
      {
        x: 48,
        y: 7328
      },
      {
        x: 248,
        y: 6984
      },
      {
        x: 232,
        y: 6664
      }
    ]

    this.migalhas.forEach((migalha) => {
      migalha.objeto = this.physics.add.sprite(migalha.x, migalha.y, 'migalha')
        .setImmovable()
      migalha.objeto.anims.play('migalha-girando', true)
    })

    // Vacas //

    this.vacas = [
      {
        x: 80,
        y: 9933
      },
      {
        x: 120,
        y: 8672
      },
      {
        x: 74,
        y: 6564
      }
    ]

    this.vacas.forEach((vaca) => {
      vaca.objeto = this.physics.add.sprite(vaca.x, vaca.y, 'vaca')
        .setSize(90, 78)
        .setOffset(4, 0)
        .setImmovable()
      vaca.objeto.anims.play('vaca', true)
    })

    // Tratores //

    this.tratoresL = [
      {
        x: 648,
        y: 12227
      },
      {
        x: 648,
        y: 10420
      },
      {
        x: 648,
        y: 9013
      },
      {
        x: 648,
        y: 6746
      }
    ]

    this.tratoresL.forEach((tratorL) => {
      tratorL.objeto = this.physics.add.sprite(tratorL.x, tratorL.y, 'trator')
        .setImmovable()
        .setVelocityX(-250)
      tratorL.objeto.anims.play('trator', true)
    })

    this.tratoresD = [
      {
        x: 224,
        y: 11558
      },
      {
        x: 224,
        y: 9700
      },
      {
        x: 224,
        y: 7838
      },
      {
        x: 224,
        y: 7415
      }
    ]

    this.tratoresD.forEach((tratorD) => {
      tratorD.objeto = this.physics.add.sprite(tratorD.x, tratorD.y, 'trator')
        .setImmovable()
      tratorD.objeto.anims.play('trator', true)
    })

    this.tratoresE = [
      {
        x: 224,
        y: 11063
      },
      {
        x: 224,
        y: 8346
      },
      {
        x: 224,
        y: 7045
      }
    ]

    this.tratoresE.forEach((tratorE) => {
      tratorE.objeto = this.physics.add.sprite(tratorE.x, tratorE.y, 'trator')
        .setImmovable()
      tratorE.objeto.anims.play('trator', true)
    })

    // Caldeirões //

    this.caldeirao = this.physics.add.sprite(224, 18928, 'caldeirao')
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
      this.personagemLocal = this.physics.add.sprite(140, 12486, this.local)
        .setSize(52, 40)
        .setOffset(20, 64)
        .setImmovable(false)
        .setBounce(1, 1)
      this.personagemRemoto = this.add.sprite(324, 12486, this.remoto)
    } else if (this.game.jogadores.segundo === this.game.socket.id) {
      this.local = `sprite-${this.game.estadoPersonagem.spriteId}`
      this.remoto = `sprite-${this.game.estadoPersonagemRemoto.spriteId}`
      this.personagemLocal = this.physics.add.sprite(324, 12486, this.local)
        .setSize(52, 40)
        .setOffset(20, 64)
        .setImmovable(false)
        .setBounce(1, 1)
      this.personagemRemoto = this.add.sprite(140, 12486, this.remoto)
    }
    this.layerAtras03 = this.tilemapMapa.createLayer('atras-03', [this.tilesetGeral])
    this.layerCopaT01 = this.tilemapMapa.createLayer('copaT-01', [this.tilesetGeral])
    this.layerCopaF01 = this.tilemapMapa.createLayer('copaF-01', [this.tilesetGeral])
    this.layerLapideT04 = this.tilemapMapa.createLayer('lapideT-04', [this.tilesetGeral])
    this.layerCercaT = this.tilemapMapa.createLayer('cercaT', [this.tilesetGeral])

    this.layerAtras03.setCollisionByProperty({ canCollide: true })
    this.layerCopaT01.setCollisionByProperty({ canCollide: true })
    this.layerCopaF01.setCollisionByProperty({ canCollide: true })
    this.layerLapideT04.setCollisionByProperty({ canCollide: true })
    this.layerCercaT.setCollisionByProperty({ canCollide: true })

    // Collider //

    this.physics.add.collider(this.personagemLocal, this.layerChao)
    this.physics.add.collider(this.personagemLocal, this.layerCercaF, this.danoCenario, null, this)

    this.physics.add.collider(this.personagemLocal, this.area2, this.area2F, null, this)
    this.physics.add.collider(this.personagemLocal, this.area3, this.area3F, null, this)
    this.physics.add.collider(this.personagemLocal, this.area4, this.area4F, null, this)
    this.physics.add.collider(this.personagemLocal, this.area5, this.area5F, null, this)

    this.physics.add.collider(this.personagemLocal, this.area6, this.area6F, null, this)
    this.physics.add.collider(this.personagemLocal, this.area7, this.area7F, null, this)
    this.physics.add.collider(this.personagemLocal, this.area8, this.area8F, null, this)

    this.vacas.forEach((vaca) => {
      this.physics.add.collider(vaca.objeto, this.layerChao)
      this.physics.add.collider(vaca.objeto, this.layerCercaF)
      this.physics.add.collider(vaca.objeto, this.layerCercaT)
      this.physics.add.collider(this.personagemLocal, vaca.objeto, this.danoVaca, null, this)
    })

    this.tratoresL.forEach((tratorL) => {
      this.physics.add.collider(this.personagemLocal, tratorL.objeto, this.danoTratorL, null, this)
      this.physics.add.collider(tratorL.objeto, this.area1, this.voltarTratoresL, null, this)
    })

    this.tratoresD.forEach((tratorD) => {
      this.physics.add.collider(this.personagemLocal, tratorD.objeto, this.danoTratorD, null, this)
      this.physics.add.collider(tratorD.objeto, this.areaP0, this.areaP0F, null, this)
      this.physics.add.collider(tratorD.objeto, this.areaP1, this.areaP1F, null, this)
      this.physics.add.collider(tratorD.objeto, this.areaP2, this.areaP2F, null, this)
      this.physics.add.collider(tratorD.objeto, this.areaP3, this.areaP3F, null, this)
    })

    this.tratoresE.forEach((tratorE) => {
      this.physics.add.collider(tratorE.objeto, this.areaP4, this.areaP4F, null, this)
      this.physics.add.collider(tratorE.objeto, this.areaP5, this.areaP5F, null, this)
      this.physics.add.collider(tratorE.objeto, this.areaP6, this.areaP6F, null, this)
    })

    this.physics.add.collider(this.isa, this.layerChao)
    this.physics.add.collider(this.isa, this.layerCercaF)

    this.physics.add.collider(this.personagemLocal, this.area0)

    this.physics.add.collider(this.personagemLocal, this.isa, this.forcarPointerOut, null, this)

    this.physics.add.collider(this.caldeirao, this.layerChao)
    this.physics.add.collider(this.caldeirao, this.layerCercaF)

    this.physics.add.collider(this.personagemLocal, this.caldeirao, this.forcarPointerOut, null, this)

    this.migalhas.forEach((migalha) => {
      this.physics.add.collider(migalha.objeto, this.layerChao)
      this.physics.add.collider(migalha.objeto, this.layerCercaF)
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
    this.physics.world.setBounds(0, 6390, 448, 0, true, true, true, false)
    this.cameras.main.setBounds(0, 6426, 448, 6246)
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

    // Cena notificar //

    this.game.socket.on('cena-notificar', () => {
      this.game.scene.stop('mundo-magico')
      this.game.socket.emit('vitoria', this.game.sala, 'vitoria')
      this.game.scene.start('vitoria')
      this.personagemLocal.setVelocityX(0)
      this.personagemLocal.setVelocityY(0)
      this.personagemLocal.setImmovable()
      this.personagemLocal.anims.play('pato-idle', true)
    })
  }

  update () {
    try {
      this.game.socket.emit('estado-publicar', this.game.sala, {
        cena: 'floresta',
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
    if (this.game.tratoresDLiberados === 1) {
      this.tratoresD[0].objeto
        .setVelocityY(-250)
    }
    if (this.game.tratoresDLiberados === 2) {
      this.tratoresD[1].objeto
        .setVelocityY(-250)
    }
    if (this.game.tratoresDLiberados === 3) {
      this.tratoresD[2].objeto
        .setVelocityY(-250)
    }
    if (this.game.tratoresDLiberados === 4) {
      this.tratoresD[3].objeto
        .setVelocityY(-250)
    }
    if (this.game.tratoresELiberados === 1) {
      this.tratoresE[0].objeto
        .setVelocityY(250)
    }
    if (this.game.tratoresELiberados === 2) {
      this.tratoresE[1].objeto
        .setVelocityY(250)
    }
    if (this.game.tratoresELiberados === 3) {
      this.tratoresE[2].objeto
        .setVelocityX(250)
    }
  }

  chegarPraia (personagemLocal) {
    this.personagemLocal.setVelocityX(0)
    this.personagemLocal.setVelocityY(0)
    this.personagemLocal.setImmovable()
    this.personagemLocal.anims.play('pato-idle', true)
    this.game.scene.stop('campo')
    this.game.socket.emit('cena-publicar', this.game.sala, 'vitoria')
    this.game.scene.start('vitoria')
  }

  morrer (personagemLocal) {
    const centrox = this.cameras.main.worldView.x + this.cameras.main.width / 2
    const centroy = this.cameras.main.worldView.y + this.cameras.main.height / 2
    this.imagem = this.add.image(centrox, centroy, 'fundo-preto')
    this.imagem = this.add.image(centrox, centroy, 'tela-gameover')
      .setInteractive()
      .on('pointerdown', () => {
        this.game.scene.stop('campo')
        this.game.scene.start('menu')
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
    this.personagemRemoto.setTint(0x808080)
  }

  danoVaca (vacas) {
    for (let i = 0; i < this.vacas.length; i++) {
      if (!vacas[i]) {
        this.ultimaVaca = this.vacas[i].objeto
        this.ultimaVaca.setSize(1, 1).setOffset(100000000, 100000000)
        this.time.addEvent({
          callback: () => {
            this.vacas[i].objeto.setSize(90, 78).setOffset(4, 0)
            this.personagemLocal.setAlpha(1)
          },
          delay: 1500,
          callbackScope: this,
          loop: false
        })
      }
    }
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

  danoTratorL (tratoresL) {
    for (let i = 0; i < this.tratoresL.length; i++) {
      if (!tratoresL[i]) {
        this.ultimoTratorL = this.tratoresL[i].objeto
        this.ultimoTratorL.setSize(1, 1).setOffset(100000000, 100000000)
        this.time.addEvent({
          callback: () => {
            this.tratoresL[i].objeto.setSize(152, 96).setOffset(0, 0)
            this.personagemLocal.setAlpha(1)
          },
          delay: 1500,
          callbackScope: this,
          loop: false
        })
      }
    }
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
    if (this.coracoes.frame.name >= 3) {
      this.coracoes.setFrame(6)
    } else {
      this.game.vida.frameCoracoes += 4
      this.coracoes.setFrame(`${this.game.vida.frameCoracoes}`)
    }
    if (this.coracoes.frame.name === 6) {
      this.morrer()
    }
  }

  danoTratorD (tratoresD) {
    for (let i = 0; i < this.tratoresD.length; i++) {
      if (!tratoresD[i]) {
        this.ultimoTratorD = this.tratoresD[i].objeto
        this.ultimoTratorD.setSize(1, 1).setOffset(100000000, 100000000)
        this.time.addEvent({
          callback: () => {
            this.tratoresD[i].objeto.setSize(152, 96).setOffset(0, 0)
            this.personagemLocal.setAlpha(1)
          },
          delay: 1500,
          callbackScope: this,
          loop: false
        })
      }
    }
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
    if (this.coracoes.frame.name >= 3) {
      this.coracoes.setFrame(6)
    } else {
      this.game.vida.frameCoracoes += 4
      this.coracoes.setFrame(`${this.game.vida.frameCoracoes}`)
    }
    if (this.coracoes.frame.name === 6) {
      this.morrer()
    }
  }

  danoTratorE (tratoresE) {
    for (let i = 0; i < this.tratoresE.length; i++) {
      if (!tratoresE[i]) {
        this.ultimoTratorE = this.tratoresE[i].objeto
        this.ultimoTratorE.setSize(1, 1).setOffset(100000000, 100000000)
        this.time.addEvent({
          callback: () => {
            this.tratoresE[i].objeto.setSize(152, 96).setOffset(0, 0)
            this.personagemLocal.setAlpha(1)
          },
          delay: 1500,
          callbackScope: this,
          loop: false
        })
      }
    }
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
    if (this.coracoes.frame.name >= 3) {
      this.coracoes.setFrame(6)
    } else {
      this.game.vida.frameCoracoes += 4
      this.coracoes.setFrame(`${this.game.vida.frameCoracoes}`)
    }
    if (this.coracoes.frame.name === 6) {
      this.morrer()
    }
  }

  danoCenario () {
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

  voltarTratoresL () {
    this.tratoresL.forEach((tratorL) => {
      tratorL.objeto.setX(528)
    })
  }

  voltarFantasmasE () {
    this.fantasmasE.forEach((fantasmaE) => {
      fantasmaE.objeto.setX(-60)
    })
  }

  area2F () {
    this.physics.world.disable(this.area2)
    this.tratoresD[0].objeto.setVelocityX(-250)
  }

  area3F () {
    this.physics.world.disable(this.area3)
    this.tratoresD[1].objeto.setVelocityX(-250)
  }

  area4F () {
    this.physics.world.disable(this.area4)
    this.tratoresD[2].objeto.setVelocityX(-250)
  }

  area5F () {
    this.physics.world.disable(this.area5)
    this.tratoresD[3].objeto.setVelocityX(-250)
  }

  area6F () {
    this.physics.world.disable(this.area6)
    this.tratoresE[1].objeto.setVelocityX(250)
  }

  area7F () {
    this.physics.world.disable(this.area7)
    this.tratoresE[2].objeto.setVelocityX(250)
  }

  area8F () {
    this.physics.world.disable(this.area8)
    this.tratoresE[3].objeto.setVelocityX(250)
  }

  areaP0F () {
    this.physics.world.disable(this.areaP0)
    this.tratoresD[0].objeto.setVelocityX(0)
  }

  areaP1F () {
    this.physics.world.disable(this.areaP1)
    this.tratoresD[1].objeto.setVelocityX(0)
  }

  areaP2F () {
    this.physics.world.disable(this.areaP2)
    this.tratoresD[2].objeto.setVelocityX(0)
  }

  areaP3F () {
    this.physics.world.disable(this.areaP3)
    this.tratoresD[3].objeto.setVelocityX(0)
  }

  areaP4F () {
    this.physics.world.disable(this.areaP4)
    this.tratoresE[0].objeto.setVelocityX(0)
  }

  areaP5F () {
    this.physics.world.disable(this.areaP5)
    this.tratoresE[1].objeto.setVelocityX(0)
  }

  areaP6F () {
    this.physics.world.disable(this.areaP6)
    this.tratoresE[2].objeto.setVelocityX(0)
  }
}
