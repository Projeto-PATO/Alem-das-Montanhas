// eslint-disable-next-line no-undef
export default class menu extends Phaser.Scene {
  constructor () {
    super('menu')
  }

  preload () {
    this.load.image('fundo', '../assets/menu-selecao.png')

    this.load.spritesheet('thiaguinho-cocar', '../assets/patos/thiaguinho/thiaguinho-cocar-idle.png', {
      frameWidth: 92,
      frameHeight: 108
    })
    this.load.spritesheet('thiaguinho-default', '../assets/patos/thiaguinho/thiaguinho-default-idle.png', {
      frameWidth: 92,
      frameHeight: 108
    })
    this.load.spritesheet('thiaguinho-mago', '../assets/patos/thiaguinho/thiaguinho-mago-idle.png', {
      frameWidth: 92,
      frameHeight: 108
    })
    this.load.spritesheet('thiaguinho-oculos', '../assets/patos/thiaguinho/thiaguinho-oculos-idle.png', {
      frameWidth: 92,
      frameHeight: 108
    })
    this.load.spritesheet('thiaguinho-palha', '../assets/patos/thiaguinho/thiaguinho-palha-idle.png', {
      frameWidth: 92,
      frameHeight: 108
    })

    this.load.spritesheet('cacique-cocar', '../assets/patos/cacique/cacique-cocar-idle.png', {
      frameWidth: 92,
      frameHeight: 108
    })
    this.load.spritesheet('cacique-default', '../assets/patos/cacique/cacique-default-idle.png', {
      frameWidth: 92,
      frameHeight: 108
    })
    this.load.spritesheet('cacique-mago', '../assets/patos/cacique/cacique-mago-idle.png', {
      frameWidth: 92,
      frameHeight: 108
    })
    this.load.spritesheet('cacique-oculos', '../assets/patos/cacique/cacique-oculos-idle.png', {
      frameWidth: 92,
      frameHeight: 108
    })
    this.load.spritesheet('cacique-palha', '../assets/patos/cacique/cacique-palha-idle.png', {
      frameWidth: 92,
      frameHeight: 108
    })

    this.load.spritesheet('isa-cocar', '../assets/patos/isa/isa-cocar-idle.png', {
      frameWidth: 92,
      frameHeight: 108
    })
    this.load.spritesheet('isa-default', '../assets/patos/isa/isa-default-idle.png', {
      frameWidth: 92,
      frameHeight: 108
    })
    this.load.spritesheet('isa-mago', '../assets/patos/isa/isa-mago-idle.png', {
      frameWidth: 92,
      frameHeight: 108
    })
    this.load.spritesheet('isa-oculos', '../assets/patos/isa/isa-oculos-idle.png', {
      frameWidth: 92,
      frameHeight: 108
    })
    this.load.spritesheet('isa-palha', '../assets/patos/isa/isa-palha-idle.png', {
      frameWidth: 92,
      frameHeight: 108
    })

    this.load.spritesheet('pam-cocar', '../assets/patos/pam/pam-cocar-idle.png', {
      frameWidth: 92,
      frameHeight: 108
    })
    this.load.spritesheet('pam-default', '../assets/patos/pam/pam-default-idle.png', {
      frameWidth: 92,
      frameHeight: 108
    })
    this.load.spritesheet('pam-mago', '../assets/patos/pam/pam-mago-idle.png', {
      frameWidth: 92,
      frameHeight: 108
    })
    this.load.spritesheet('pam-oculos', '../assets/patos/pam/pam-oculos-idle.png', {
      frameWidth: 92,
      frameHeight: 108
    })
    this.load.spritesheet('pam-palha', '../assets/patos/pam/pam-palha-idle.png', {
      frameWidth: 92,
      frameHeight: 108
    })

    this.load.spritesheet('tucano-cocar', '../assets/patos/tucano/tucano-cocar-idle.png', {
      frameWidth: 92,
      frameHeight: 108
    })
    this.load.spritesheet('tucano-default', '../assets/patos/tucano/tucano-default-idle.png', {
      frameWidth: 92,
      frameHeight: 108
    })
    this.load.spritesheet('tucano-mago', '../assets/patos/tucano/tucano-mago-idle.png', {
      frameWidth: 92,
      frameHeight: 108
    })
    this.load.spritesheet('tucano-oculos', '../assets/patos/tucano/tucano-oculos-idle.png', {
      frameWidth: 92,
      frameHeight: 108
    })
    this.load.spritesheet('tucano-palha', '../assets/patos/tucano/tucano-palha-idle.png', {
      frameWidth: 92,
      frameHeight: 108
    })

    this.load.spritesheet('botao-voltar', '../assets/botoes/esquerda.png', {
      frameWidth: 96,
      frameHeight: 102
    })
    this.load.spritesheet('botao-config', '../assets/botoes/config.png', {
      frameWidth: 96,
      frameHeight: 102
    })
    this.load.spritesheet('botao-selecionar', '../assets/botoes/selecionar.png', {
      frameWidth: 35,
      frameHeight: 50
    })
    this.load.spritesheet('botao-iniciar', '../assets/botoes/iniciar.png', {
      frameWidth: 155,
      frameHeight: 60
    })
    this.load.spritesheet('seta-barra', '../assets/botoes/seta-barra.png', {
      frameWidth: 25,
      frameHeight: 25
    })
    this.load.spritesheet('barra', '../assets/botoes/barra.png', {
      frameWidth: 15,
      frameHeight: 50
    })

    this.load.audio('trilha-menu', '../assets/audios/trilha-menu.mp3')
  }

  create () {
    this.trilhaMenu = this.sound.add('trilha-menu')
    this.trilhaMenu.loop = true
    this.trilhaMenu.play()

    this.fundo = this.add.image(224, 400, 'fundo')

    this.timer = 2

    this.voltar = this.add.sprite(58, 62, 'botao-voltar')
      .setScale(0.85)
      .setInteractive()
      .on('pointerdown', () => {
        this.trilhaMenu.stop()
        this.voltar.setFrame(1)
        this.time.addEvent({
          delay: 100,
          callback: this.contagemVoltar,
          callbackScope: this,
          loop: true
        })
      })
      .on('pointerup', () => {
        this.voltar.setFrame(0)
      })

    this.botaoConfig = this.add.sprite(390, 62, 'botao-config')
      .setScale(0.85)
      .setInteractive()
      .on('pointerdown', () => {
        this.botaoConfig.setFrame(1)
      })
      .on('pointerup', () => {
        this.botaoConfig.setFrame(0)
      })

    this.barra = this.add.sprite(411, 520, 'barra')

    this.setaBarraCima = this.physics.add.sprite(411, 502, 'seta-barra')
      .setScale(0.6)
      .setImmovable()
      .setInteractive()
      .on('pointerover', () => {
        this.setaBarraCima.setFrame(0)
        this.barra.setY(520)
      })
      .on('pointerout', () => {
        this.setaBarraCima.setFrame(0)
      })

    this.setaBarraBaixo = this.physics.add.sprite(411, 652, 'seta-barra')
      .setScale(0.6)
      .setFlipY(true)
      .setImmovable()
      .setInteractive()
      .on('pointerover', () => {
        this.setaBarraBaixo.setFrame(0)
        this.barra.setY(635)
      })
      .on('pointerout', () => {
        this.setaBarraBaixo.setFrame(0)
      })

    this.personagens = [
      {
        id: 'thiaguinho',
        spriteId: 0,
        frameEndIdle: 15,
        frameEndWalking: 21,
        frameRateIdle: 10,
        frameRateWalking: 40
      },
      {
        id: 'cacique',
        spriteId: 1,
        frameEndIdle: 11,
        frameEndWalking: 21,
        frameRateIdle: 10,
        frameRateWalking: 40
      },
      {
        id: 'isa',
        spriteId: 2,
        frameEndIdle: 11,
        frameEndWalking: 21,
        frameRateIdle: 10,
        frameRateWalking: 40
      },
      {
        id: 'pam',
        spriteId: 3,
        frameEndIdle: 21,
        frameEndWalking: 21,
        frameRateIdle: 40,
        frameRateWalking: 40
      },
      {
        id: 'tucano',
        spriteId: 4,
        frameEndIdle: 15,
        frameEndWalking: 21,
        frameRateIdle: 12,
        frameRateWalking: 40
      }
    ]
    this.personagemEscolhido = 0

    this.textoPersonagem = this.add.text(108, 452, this.personagens[this.personagemEscolhido].id, {
      fontFamily: 'Silkscreen',
      fontSize: '32px',
      stroke: '#000000',
      strokeThickness: 4,
      fill: '#ffffff'
    })

    this.personagemDireita = this.add.sprite(331, 395, 'botao-selecionar')
      .setInteractive()
      .on('pointerdown', () => {
        if (this.personagemEscolhido === this.personagens.length - 1) {
          this.personagemEscolhido = 0
        } else {
          this.personagemEscolhido += 1
        }
        this.personagemDireita.setFrame(1)

        /* Atualizar o personagem */
        this.atualizarPersonagem()

        this.textoPersonagem.setText(this.personagens[this.personagemEscolhido].id)
      })
      .on('pointerup', () => {
        this.personagemDireita.setFrame(0)
      })

    this.personagemEsquerda = this.add.sprite(116, 395, 'botao-selecionar')
      .setFlipX(true)
      .setInteractive()
      .on('pointerdown', () => {
        if (this.personagemEscolhido === 0) {
          this.personagemEscolhido = 4
        } else {
          this.personagemEscolhido -= 1
        }
        this.personagemEsquerda.setFrame(1)

        /* Atualizar o personagem */
        this.atualizarPersonagem()

        this.textoPersonagem.setText(this.personagens[this.personagemEscolhido].id)
      })
      .on('pointerup', () => {
        this.personagemEsquerda.setFrame(0)
      })

    this.acessorios = [
      'default',
      'cocar',
      'mago',
      'palha',
      'oculos'
    ]
    this.acessorioEscolhido = 0

    this.textoAcessorio = this.add.text(172, 582, this.acessorios[this.acessorioEscolhido].id)

    this.acessorioDireita = this.add.sprite(331, 305, 'botao-selecionar')
      .setInteractive()
      .on('pointerdown', () => {
        if (this.acessorioEscolhido === this.acessorios.length - 1) {
          this.acessorioEscolhido = 0
        } else {
          this.acessorioEscolhido += 1
        }

        this.acessorioDireita.setFrame(1)

        /* Atualizar o personagem */
        this.atualizarPersonagem()
      })
      .on('pointerup', () => {
        this.acessorioDireita.setFrame(0)
      })

    this.acessorioEsquerda = this.add.sprite(116, 305, 'botao-selecionar')
      .setFlipX(true)
      .setInteractive()
      .on('pointerdown', () => {
        if (this.acessorioEscolhido === 0) {
          this.acessorioEscolhido = 4
        } else {
          this.acessorioEscolhido -= 1
        }

        this.acessorioEsquerda.setFrame(1)

        /* Atualizar o personagem */
        this.atualizarPersonagem()
      })
      .on('pointerup', () => {
        this.acessorioEsquerda.setFrame(0)
      })
    /* Mostrar o primeiro personagem na tela */
    this.atualizarPersonagem()

    this.game.socket.on('personagem-notificar', (personagem) => {
      this.game.estadoPersonagemRemoto = {
        spriteId: personagem.spriteId,
        spriteIdle: personagem.spriteIdle,
        spriteWalking: personagem.spriteWalking,
        frameEndIdle: personagem.frameEndIdle,
        frameEndWalking: personagem.frameEndWalking,
        frameRateIdle: personagem.frameRateIdle,
        frameRateWalking: personagem.frameRateWalking
      }
    })
  }

  update () { }

  atualizarPersonagem () {
    /* Remover personagem anterior, se houver */
    if (this.personagemFinal) {
      this.personagemFinal.destroy()
    }
    this.game.estadoPersonagem = {
      spriteId: this.personagens[this.personagemEscolhido].spriteId,
      spriteIdle: '/' + this.personagens[this.personagemEscolhido].id + '/' + this.personagens[this.personagemEscolhido].id + '-' + this.acessorios[this.acessorioEscolhido] + '-idle.png',
      spriteWalking: '/' + this.personagens[this.personagemEscolhido].id + '/' + this.personagens[this.personagemEscolhido].id + '-' + this.acessorios[this.acessorioEscolhido] + '-walking.png',
      frameEndIdle: this.personagens[this.personagemEscolhido].frameEndIdle,
      frameEndWalking: this.personagens[this.personagemEscolhido].frameEndWalking,
      frameRateIdle: this.personagens[this.personagemEscolhido].frameRateIdle,
      frameRateWalking: this.personagens[this.personagemEscolhido].frameRateWalking
    }
    this.personagemFinal = this.add.sprite(239, 315, this.personagens[this.personagemEscolhido].id + '-' + this.acessorios[this.acessorioEscolhido])
      .setScale(2.5)

    this.iniciar = this.add.sprite(226, 740, 'botao-iniciar')
      .setInteractive()
      .on('pointerdown', () => {
        this.trilhaMenu.stop()
        this.iniciar.setFrame(1)
        this.time.addEvent({
          delay: 100,
          callback: this.contagemIniciar,
          callbackScope: this,
          loop: true
        })
      })
      .on('pointerup', () => {
        this.iniciar.setFrame(0)
      })
    if (this.idle) { this.idle.destroy() }
    this.idle = this.anims.create({
      key: 'pato-idle',
      frames: this.anims.generateFrameNumbers(this.personagens[this.personagemEscolhido].id + '-' + this.acessorios[this.acessorioEscolhido], {
        start: 0,
        end: this.game.estadoPersonagem.frameEndIdle
      }),
      frameRate: this.game.estadoPersonagem.frameRateIdle,
      repeat: -1
    })

    this.personagemFinal.anims.play('pato-idle', true)
  }

  contagemVoltar () {
    this.timer -= 1
    if (this.timer <= 0) {
      this.trilhaMenu.stop()
      this.game.scene.stop('menu')
      this.game.scene.start('abertura')
    }
  }

  contagemIniciar () {
    this.timer -= 1
    if (this.timer <= 0) {
      this.game.socket.emit('personagem-publicar', this.game.sala, this.game.estadoPersonagem)
      this.trilhaMenu.stop()
      this.game.scene.stop('menu')
      this.game.scene.start('floresta')
    }
  }
}
