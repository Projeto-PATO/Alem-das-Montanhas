// eslint-disable-next-line no-undef
export default class menu extends Phaser.Scene {
  constructor () {
    super('menu')
  }

  preload () {
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

    this.load.audio('trilha-menu', '../assets/audios/trilha-menu.mp3')
  }

  create () {
    this.trilhaMenu = this.sound.add('trilha-menu')
    this.trilhaMenu.loop = true
    this.trilhaMenu.play()

    this.personagens = [
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
        id: 'thiaguinho',
        spriteId: 0,
        frameEndIdle: 15,
        frameEndWalking: 21,
        frameRateIdle: 10,
        frameRateWalking: 40
      },
      {
        id: 'tucano',
        spriteId: 4,
        frameEndIdle: 15,
        frameEndWalking: 21,
        frameRateIdle: 10,
        frameRateWalking: 40
      }
    ]
    this.personagemEscolhido = 0
    this.personagem = this.add.text(50, 50, this.personagens[this.personagemEscolhido].id)
      .setInteractive()
      .on('pointerdown', () => {
        if (this.personagemEscolhido === this.personagens.length - 1) {
          this.personagemEscolhido = 0
        } else {
          this.personagemEscolhido += 1
        }
        this.personagem.setText(this.personagens[this.personagemEscolhido].id)

        /* Atualizar o personagem */
        this.atualizarPersonagem()
      })

    this.acessorios = [
      'default',
      'cocar',
      'mago',
      'oculos',
      'palha'
    ]
    this.acessorioEscolhido = 0
    this.acessorio = this.add.text(50, 100, this.acessorios[this.acessorioEscolhido])
      .setInteractive()
      .on('pointerdown', () => {
        if (this.acessorioEscolhido === this.acessorios.length - 1) {
          this.acessorioEscolhido = 0
        } else {
          this.acessorioEscolhido += 1
        }
        this.acessorio.setText(this.acessorios[this.acessorioEscolhido])

        /* Atualizar o personagem */
        this.atualizarPersonagem()
      })

    /* Mostrar o primeiro personagem na tela */
    this.atualizarPersonagem()
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
    this.personagemFinal = this.add.sprite(this.game.config.width / 2, this.game.config.height / 2, this.personagens[this.personagemEscolhido].id + '-' + this.acessorios[this.acessorioEscolhido])
      .setInteractive()
      .on('pointerdown', () => {
        this.trilhaMenu.stop()
        this.game.scene.stop('menu')
        this.game.scene.start('floresta')
      })
  }
}
