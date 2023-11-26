/* eslint-disable no-return-assign */
/* eslint-disable no-undef */
// eslint-disable-next-line no-template-curly-in-string
export default class floresta extends Phaser.Scene {
  constructor () {
    super('floresta')
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
    this.load.spritesheet('cobra', '../assets/inimigos/cobra.png', {
      frameWidth: 96,
      frameHeight: 90
    })
    this.load.spritesheet(`sprite-${this.game.estadoPersonagem.spriteId}`, `../assets/patos/${this.game.estadoPersonagem.spritePato}`, {
      frameWidth: 92,
      frameHeight: 108
    })
    this.load.spritesheet(`sprite-${this.game.estadoPersonagemRemoto.spriteId}`, `../assets/patos/${this.game.estadoPersonagemRemoto.spritePato}`, {
      frameWidth: 92,
      frameHeight: 108
    })
    this.load.spritesheet('cacique-idle', '../assets/patos/cacique/cacique-cocar.png', {
      frameWidth: 92,
      frameHeight: 108
    })
    this.load.spritesheet('mamae-pato', '../assets/patos/mamae-pato/mamae-pato.png', {
      frameWidth: 76,
      frameHeight: 76
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
    this.load.audio('trilha-floresta', '../assets/audios/trilha-floresta.mp3')

    this.load.audio('audio-migalha', '../assets/audios/migalha.mp3')

    this.load.audio('audio-gameover', './assets/audios/gameover.mp3')
  }

  create () {
    // Áudio //

    this.trilhaFloresta = this.sound.add('trilha-floresta')
    this.trilhaFloresta.loop = true
    this.trilhaFloresta.play()

    this.audioMigalha = this.sound.add('audio-migalha')
    this.audioGameover = this.sound.add('audio-gameover')

    // Criação de mapa e de camadas de fundo //
    this.tilemapMapa = this.make.tilemap({
      key: 'mapa'
    })

    this.tilesetGeral = this.tilemapMapa.addTilesetImage('tileset-geral')
    this.tilesetFloresta = this.tilemapMapa.addTilesetImage('tileset-floresta')
    this.tilesetMundoMagico = this.tilemapMapa.addTilesetImage('tileset-mundomagico')

    this.layerChao = this.tilemapMapa.createLayer('chao', [this.tilesetGeral])

    this.area1 = this.add.rectangle(224, 24988, 448, 20, 0xFFFFFF, 1)
    this.physics.world.enable(this.area1)
    this.area1.body.setAllowGravity(false)

    this.area2 = this.add.rectangle(224, 24293, 448, 20, 0xFFFFFF, 1)
    this.physics.world.enable(this.area2)
    this.area1.body.setAllowGravity(false)

    this.area3 = this.add.rectangle(224, 22043, 448, 20, 0xFFFFFF, 1)
    this.physics.world.enable(this.area3)
    this.area1.body.setAllowGravity(false)

    this.area4 = this.add.rectangle(224, 21155, 448, 20, 0xFFFFFF, 1)
    this.physics.world.enable(this.area4)
    this.area1.body.setAllowGravity(false)

    this.area5 = this.add.rectangle(224, 19936, 448, 20, 0xFFFFFF, 1)
    this.physics.world.enable(this.area5)
    this.area1.body.setAllowGravity(false)

    this.layerTronco01 = this.tilemapMapa.createLayer('tronco-01', [this.tilesetGeral])
    this.layerPedra = this.tilemapMapa.createLayer('pedra', [this.tilesetGeral])
    this.layerNaFrente03 = this.tilemapMapa.createLayer('naFrente-03', [this.tilesetGeral])
    this.layerLapideF04 = this.tilemapMapa.createLayer('lapideF-04', [this.tilesetGeral])
    this.layerOssos1 = this.tilemapMapa.createLayer('ossos1', [this.tilesetGeral])
    this.layerOssos2 = this.tilemapMapa.createLayer('ossos2', [this.tilesetGeral])

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

    // Animação cobra //
    this.anims.create({
      key: 'cobra',
      frames: this.anims.generateFrameNumbers('cobra', {
        start: 0,
        end: 14
      }),
      frameRate: 8,
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

    // Migalha //
    this.migalhas = [
      {
        x: 224,
        y: 25240
      },
      {
        x: 360,
        y: 25152
      },
      {
        x: 176,
        y: 24792
      },
      {
        x: 312,
        y: 24456
      },
      {
        x: 216,
        y: 24056
      },
      {
        x: 40,
        y: 23672
      },
      {
        x: 352,
        y: 23464
      },
      {
        x: 368,
        y: 23168
      },
      {
        x: 152,
        y: 22864
      },
      {
        x: 96,
        y: 22400
      },
      {
        x: 192,
        y: 22056
      },
      {
        x: 288,
        y: 21752
      },
      {
        x: 376,
        y: 21456
      },
      {
        x: 136,
        y: 21080
      },
      {
        x: 64,
        y: 20640
      },
      {
        x: 296,
        y: 20352
      },
      {
        x: 384,
        y: 20000
      },
      {
        x: 104,
        y: 19608
      },
      {
        x: 376,
        y: 19336
      },
      {
        x: 208,
        y: 19192
      }
    ]

    this.migalhas.forEach((migalha) => {
      migalha.objeto = this.physics.add.sprite(migalha.x, migalha.y, 'migalha')
        .setImmovable()
      migalha.objeto.anims.play('migalha-girando', true)
    })

    // Cobra //

    this.cobras = [
      {
        x: 68,
        y: 24300
      },
      {
        x: 224,
        y: 23701
      },
      {
        x: 232,
        y: 21550
      },
      {
        x: 218,
        y: 20508
      },
      {
        x: 57,
        y: 19456
      }
    ]

    this.cobras.forEach((cobra) => {
      cobra.objeto = this.physics.add.sprite(cobra.x, cobra.y, 'cobra')
        .setSize(72, 33)
        .setOffset(21, 54)
        .setImmovable()
        .setVisible(false)
      cobra.objeto.anims.play('cobra', true)
    })

    // Caldeirão //

    this.caldeirao = this.physics.add.sprite(224, 19130, 'caldeirao')

    // Cacique //

    this.cacique = this.physics.add.sprite(403, 19285, 'cacique-idle')
      .setSize(52, 40)
      .setOffset(20, 64)
      .setImmovable()
      .setBounce(0)

    // Personagem //

    console.log(this.game.estadoPersonagem)
    try {
      this.anims.get('pato-idle').destroy()
      this.anims.get('pato-walk').destroy()
    } catch (err) {
      console.log(err)
    }

    if (this.game.jogadores.primeiro === this.game.socket.id) {
      this.local = `sprite-${this.game.estadoPersonagem.spriteId}`
      this.remoto = `sprite-${this.game.estadoPersonagemRemoto.spriteId}`
      this.personagemLocal = this.physics.add.sprite(140, 25300, this.local)
        .setSize(52, 40)
        .setOffset(20, 64)
        .setImmovable(false)
        .setBounce(1, 1)
      this.personagemRemoto = this.add.sprite(324, 6050, this.remoto)
      if (this.game.estadoPersonagem.spritePato === this.game.estadoPersonagemRemoto.spritePato) {
        this.personagemRemoto.setTint(0x808080)
      }
    } else if (this.game.jogadores.segundo === this.game.socket.id) {
      this.local = `sprite-${this.game.estadoPersonagem.spriteId}`
      this.remoto = `sprite-${this.game.estadoPersonagemRemoto.spriteId}`
      this.personagemLocal = this.physics.add.sprite(308, 25300, this.local)
        .setSize(52, 40)
        .setOffset(20, 64)
        .setImmovable(false)
        .setBounce(1, 1)
      this.personagemRemoto = this.add.sprite(124, 6050, this.remoto)
      if (this.game.estadoPersonagem.spritePato === this.game.estadoPersonagemRemoto.spritePato) {
        this.personagemRemoto.setTint(0x808080)
      }

      navigator.mediaDevices.getUserMedia({ video: false, audio: true })
        .then((stream) => {
          this.game.localConnection = new RTCPeerConnection(this.game.ice_servers)

          this.game.localConnection.onicecandidate = ({ candidate }) =>
            candidate && this.game.socket.emit('candidate', this.game.sala, candidate)

          this.game.localConnection.ontrack = ({ streams: [stream] }) =>
            this.game.audio.srcObject = stream

          stream.getTracks()
            .forEach((track) => this.game.localConnection.addTrack(track, stream))

          this.game.localConnection.createOffer()
            .then((offer) => this.game.localConnection.setLocalDescription(offer))
            .then(() => this.game.socket.emit('offer', this.game.sala, this.game.localConnection.localDescription))

          this.game.midias = stream
        })
        .catch((error) => console.error(error))
    }

    this.game.socket.on('offer', (description) => {
      this.game.remoteConnection = new RTCPeerConnection(this.game.ice_servers)

      this.game.remoteConnection.onicecandidate = ({ candidate }) =>
        candidate && this.game.socket.emit('candidate', this.game.sala, candidate)

      this.game.remoteConnection.ontrack = ({ streams: [midia] }) =>
        this.game.audio.srcObject = midia

      this.game.midias.getTracks()
        .forEach((track) => this.game.remoteConnection.addTrack(track, this.game.midias))

      this.game.remoteConnection.setRemoteDescription(description)
        .then(() => this.game.remoteConnection.createAnswer())
        .then((answer) => this.game.remoteConnection.setLocalDescription(answer))
        .then(() => this.game.socket.emit('answer', this.game.sala, this.game.remoteConnection.localDescription))
    })

    this.game.socket.on('answer', (description) =>
      this.game.localConnection.setRemoteDescription(description)
    )

    this.game.socket.on('candidate', (candidate) => {
      const conn = this.game.localConnection || this.game.remoteConnection
      conn.addIceCandidate(new RTCIceCandidate(candidate))
    })

    // Camadas de frente //

    this.layerAtras03 = this.tilemapMapa.createLayer('atras-03', [this.tilesetGeral])
    this.layerCopaT01 = this.tilemapMapa.createLayer('copaT-01', [this.tilesetGeral])
    this.layerCopaF01 = this.tilemapMapa.createLayer('copaF-01', [this.tilesetGeral])
    this.layerLapideT04 = this.tilemapMapa.createLayer('lapideT-04', [this.tilesetGeral])

    this.layerAtras03.setCollisionByProperty({ canCollide: true })
    this.layerCopaT01.setCollisionByProperty({ canCollide: true })
    this.layerCopaF01.setCollisionByProperty({ canCollide: true })
    this.layerLapideT04.setCollisionByProperty({ canCollide: true })

    this.mamae = this.physics.add.sprite(225, 25480, 'mamae-pato')

    // Collider //

    this.physics.add.collider(this.personagemLocal, this.layerChao)
    this.physics.add.collider(this.personagemLocal, this.layerPedra, this.danoCenario, null, this)
    this.physics.add.collider(this.personagemLocal, this.layerTronco01, this.danoCenario, null, this)
    this.physics.add.collider(this.personagemLocal, this.layerNaFrente03, this.danoCenario, null, this)

    this.cobras.forEach((cobra) => {
      this.physics.add.collider(cobra.objeto, this.layerChao)
      this.physics.add.collider(cobra.objeto, this.layerPedra)
      this.physics.add.collider(cobra.objeto, this.layerTronco01)
      this.physics.add.collider(cobra.objeto, this.layerNaFrente03)
      this.physics.add.collider(this.personagemLocal, cobra.objeto, this.danoCobra, null, this)
    })

    this.physics.add.collider(this.cacique, this.layerChao)
    this.physics.add.collider(this.cacique, this.layerPedra)
    this.physics.add.collider(this.cacique, this.layerTronco01)
    this.physics.add.collider(this.cacique, this.layerNaFrente03)

    this.physics.add.collider(this.personagemLocal, this.cacique)

    this.physics.add.collider(this.area1, this.layerChao)
    this.physics.add.collider(this.area1, this.layerPedra)
    this.physics.add.collider(this.area1, this.layerTronco01)
    this.physics.add.collider(this.area1, this.layerNaFrente03)
    this.physics.add.overlap(this.personagemLocal, this.area1, this.primeiraArea, null, this)

    this.physics.add.collider(this.area2, this.layerChao)
    this.physics.add.collider(this.area2, this.layerPedra)
    this.physics.add.collider(this.area2, this.layerTronco01)
    this.physics.add.collider(this.area2, this.layerNaFrente03)
    this.physics.add.overlap(this.personagemLocal, this.area2, this.segundaArea, null, this)

    this.physics.add.collider(this.area3, this.layerChao)
    this.physics.add.collider(this.area3, this.layerPedra)
    this.physics.add.collider(this.area3, this.layerTronco01)
    this.physics.add.collider(this.area3, this.layerNaFrente03)
    this.physics.add.overlap(this.personagemLocal, this.area4, this.terceiraArea, null, this)

    this.physics.add.collider(this.area4, this.layerChao)
    this.physics.add.collider(this.area4, this.layerPedra)
    this.physics.add.collider(this.area5, this.layerTronco01)
    this.physics.add.collider(this.area5, this.layerNaFrente03)
    this.physics.add.overlap(this.personagemLocal, this.area4, this.quartaArea, null, this)

    this.physics.add.collider(this.area5, this.layerChao)
    this.physics.add.collider(this.area5, this.layerPedra)
    this.physics.add.collider(this.area5, this.layerTronco01)
    this.physics.add.collider(this.area5, this.layerNaFrente03)
    this.physics.add.overlap(this.personagemLocal, this.area5, this.quintaArea, null, this)

    this.physics.add.collider(this.personagemLocal, this.caldeirao, this.entrarCaldeirao, null, this)

    this.migalhas.forEach((migalha) => {
      this.physics.add.collider(migalha.objeto, this.layerChao)
      this.physics.add.collider(migalha.objeto, this.layerPedra)
      this.physics.add.collider(migalha.objeto, this.layerTronco01)
      this.physics.add.collider(migalha.objeto, this.layerNaFrente03)
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
      key: 'mamae-pato',
      frames: this.anims.generateFrameNumbers('mamae-pato', {
        start: 0,
        end: 15
      }),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'cacique-idle',
      frames: this.anims.generateFrameNumbers('cacique-idle', {
        start: 0,
        end: 11
      }),
      frameRate: 10,
      repeat: -1
    })

    // Animações automáticas /

    this.mamae.anims.play('mamae-pato', true)

    this.cacique.anims.play('cacique-idle', true)

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
    this.physics.world.setBounds(0, 19064, 448, 0, true, true, true, false)
    this.cameras.main.setBounds(0, 19074, 448, 6530)
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
      this.game.scene.stop('floresta')
      this.game.socket.emit('mundo-magico', this.game.sala, 'mundo-magico')
      this.game.scene.start('mundo-magico')
      this.personagemLocal.setVelocityX(0)
      this.personagemLocal.setVelocityY(0)
      this.personagemLocal.setImmovable()
      this.personagemLocal.anims.play('pato-idle', true)
      this.trilhaFloresta.stop()
    })

    // Inimigos notificar //

    this.game.socket.on('inimigos-notificar', ({ areaN }) => {
      this.game.areaMsg = areaN
      if ((this.game.nArea < this.game.areaMsg) === true) {
        this.game.cobrasLiberadas++
      }
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

    if (this.game.cobrasLiberadas === 1) {
      this.cobras[0].objeto
        .setVisible(true)
        .setVelocityY(100)
    }
    if (this.game.cobrasLiberadas === 2) {
      this.cobras[1].objeto
        .setVisible(true)
        .setVelocityY(100)
    }
    if (this.game.cobrasLiberadas === 3) {
      this.cobras[2].objeto
        .setVisible(true)
        .setVelocityY(100)
    }
    if (this.game.cobrasLiberadas === 4) {
      this.cobras[3].objeto
        .setVisible(true)
        .setVelocityY(100)
    }
    if (this.game.cobrasLiberadas === 5) {
      this.cobras[4].objeto
        .setVisible(true)
        .setVelocityY(100)
    }
  }

  entrarCaldeirao (personagemLocal) {
    this.personagemLocal.setVelocityX(0)
    this.personagemLocal.setVelocityY(0)
    this.personagemLocal.setImmovable()
    this.personagemLocal.anims.play('pato-idle', true)
    this.trilhaFloresta.stop()
    this.game.scene.stop('floresta')
    this.game.socket.emit('cena-publicar', this.game.sala, 'mundo-magico')
    this.game.scene.start('mundo-magico')
  }

  morrer (cobra) {
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
    this.cima.emit('pointerout')
    this.baixo.emit('pointerout')
    this.direita.emit('pointerout')
    this.esquerda.emit('pointerout')
    this.cima.setInteractive(false)
    this.baixo.setInteractive(false)
    this.direita.setInteractive(false)
    this.esquerda.setInteractive(false)
    this.utlimaCobra.setVelocityY(0)
    this.utlimaCobra.disableBody(true, false)
    this.game.migalhasGuardadas += this.game.scoreMigalha.score
    this.game.scoreMigalha.score = 0
    this.game.vida.frameCoracoes = 0
    this.texto.setText(`Migalhas: ${this.game.scoreMigalha.score}`)
    this.trilhaFloresta.stop()
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

  colisaoCobra (cobras) {
    this.utlimaCobra
      .setSize(72, 33)
      .setOffset(21, 54)
    this.personagemLocal.setAlpha(1)
  }

  danoCobra (cobras) {
    for (let i = 0; i < this.cobras.length; i++) {
      if (!cobras[i]) {
        this.utlimaCobra = this.cobras[i].objeto
        this.utlimaCobra.setSize(1, 1).setOffset(100000000, 100000000)
        this.time.addEvent({
          callback: () => {
            this.cobras[i].objeto.setSize(72, 33).setOffset(21, 54)
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
      delay: 200,
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

  primeiraArea () {
    this.physics.world.disable(this.area1)
    this.game.nArea = 1
    this.game.socket.emit('inimigos-publicar', this.game.sala, {
      areaN: this.game.nArea
    })
    if (this.game.cobrasLiberadas === 0) {
      this.game.cobrasLiberadas++
    }
  }

  segundaArea () {
    this.physics.world.disable(this.area2)
    this.game.nArea = 2
    this.game.socket.emit('inimigos-publicar', this.game.sala, {
      areaN: this.game.nArea
    })
    if (this.game.cobrasLiberadas === 1) {
      this.game.cobrasLiberadas++
    }
  }

  terceiraArea () {
    this.physics.world.disable(this.area3)
    this.game.nArea = 3
    this.game.socket.emit('inimigos-publicar', this.game.sala, {
      areaN: this.game.nArea
    })
    if (this.game.cobrasLiberadas === 2) {
      this.game.cobrasLiberadas++
    }
  }

  quartaArea () {
    this.physics.world.disable(this.area4)
    this.game.nArea = 4
    this.game.socket.emit('inimigos-publicar', this.game.sala, {
      areaN: this.game.nArea
    })
    if (this.game.cobrasLiberadas === 3) {
      this.game.cobrasLiberadas++
    }
  }

  quintaArea () {
    this.physics.world.disable(this.area5)
    this.game.nArea = 5
    this.game.socket.emit('inimigos-publicar', this.game.sala, {
      areaN: this.game.nArea
    })
    if (this.game.cobrasLiberadas === 4) {
      this.game.cobrasLiberadas++
    }
  }
}
