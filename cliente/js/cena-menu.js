// eslint-disable-next-line no-undef
export default class menu extends Phaser.Scene {
  constructor () {
    super('menu')
  }

  preload () {
    this.load.image('fundo', '../assets/menu-selecao.png')

    this.load.spritesheet('thiaguinho-cocar', '../assets/patos/thiaguinho/thiaguinho-cocar.png', {
      frameWidth: 92,
      frameHeight: 108
    })
    this.load.spritesheet('thiaguinho-default', '../assets/patos/thiaguinho/thiaguinho-default.png', {
      frameWidth: 92,
      frameHeight: 108
    })
    this.load.spritesheet('thiaguinho-mago', '../assets/patos/thiaguinho/thiaguinho-mago.png', {
      frameWidth: 92,
      frameHeight: 108
    })
    this.load.spritesheet('thiaguinho-oculos', '../assets/patos/thiaguinho/thiaguinho-oculos.png', {
      frameWidth: 92,
      frameHeight: 108
    })
    this.load.spritesheet('thiaguinho-palha', '../assets/patos/thiaguinho/thiaguinho-palha.png', {
      frameWidth: 92,
      frameHeight: 108
    })

    this.load.spritesheet('cacique-cocar', '../assets/patos/cacique/cacique-cocar.png', {
      frameWidth: 92,
      frameHeight: 108
    })
    this.load.spritesheet('cacique-default', '../assets/patos/cacique/cacique-default.png', {
      frameWidth: 92,
      frameHeight: 108
    })
    this.load.spritesheet('cacique-mago', '../assets/patos/cacique/cacique-mago.png', {
      frameWidth: 92,
      frameHeight: 108
    })
    this.load.spritesheet('cacique-oculos', '../assets/patos/cacique/cacique-oculos.png', {
      frameWidth: 92,
      frameHeight: 108
    })
    this.load.spritesheet('cacique-palha', '../assets/patos/cacique/cacique-palha.png', {
      frameWidth: 92,
      frameHeight: 108
    })

    this.load.spritesheet('isa-cocar', '../assets/patos/isa/isa-cocar.png', {
      frameWidth: 92,
      frameHeight: 108
    })
    this.load.spritesheet('isa-default', '../assets/patos/isa/isa-default.png', {
      frameWidth: 92,
      frameHeight: 108
    })
    this.load.spritesheet('isa-mago', '../assets/patos/isa/isa-mago.png', {
      frameWidth: 92,
      frameHeight: 108
    })
    this.load.spritesheet('isa-oculos', '../assets/patos/isa/isa-oculos.png', {
      frameWidth: 92,
      frameHeight: 108
    })
    this.load.spritesheet('isa-palha', '../assets/patos/isa/isa-palha.png', {
      frameWidth: 92,
      frameHeight: 108
    })

    this.load.spritesheet('pam-cocar', '../assets/patos/pam/pam-cocar.png', {
      frameWidth: 92,
      frameHeight: 108
    })
    this.load.spritesheet('pam-default', '../assets/patos/pam/pam-default.png', {
      frameWidth: 92,
      frameHeight: 108
    })
    this.load.spritesheet('pam-mago', '../assets/patos/pam/pam-mago.png', {
      frameWidth: 92,
      frameHeight: 108
    })
    this.load.spritesheet('pam-oculos', '../assets/patos/pam/pam-oculos.png', {
      frameWidth: 92,
      frameHeight: 108
    })
    this.load.spritesheet('pam-palha', '../assets/patos/pam/pam-palha.png', {
      frameWidth: 92,
      frameHeight: 108
    })

    this.load.spritesheet('tucano-cocar', '../assets/patos/tucano/tucano-cocar.png', {
      frameWidth: 92,
      frameHeight: 108
    })
    this.load.spritesheet('tucano-default', '../assets/patos/tucano/tucano-default.png', {
      frameWidth: 92,
      frameHeight: 108
    })
    this.load.spritesheet('tucano-mago', '../assets/patos/tucano/tucano-mago.png', {
      frameWidth: 92,
      frameHeight: 108
    })
    this.load.spritesheet('tucano-oculos', '../assets/patos/tucano/tucano-oculos.png', {
      frameWidth: 92,
      frameHeight: 108
    })
    this.load.spritesheet('tucano-palha', '../assets/patos/tucano/tucano-palha.png', {
      frameWidth: 92,
      frameHeight: 108
    })

    this.load.spritesheet('botao-voltar', '../assets/botoes/esquerda.png', {
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

    this.timer = 1

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

    this.barra = this.add.sprite(411, 520, 'barra')

    this.personagens = [
      {
        id: 'thiaguinho',
        personagemId: 0,
        frameRateIdle: 10,
        frameRateWalking: 40,
        textoX: 114,
        texto1: 'O mais amarelo dos patinhos, Thi\naguinho é um pato comum mas is\nso de jeito algum tira seu brilho. \nO pato do meio foi o único que a\ntendeu ao chamado de sua mãe, \npois estava perto o suficiente pa\nra ouvir. A fim de tranquilizar a',
        texto2: 'Mamãe Pato, Thiaguinho sai cora\njosamente em busca de seus ir\nmãos.'
      },
      {
        id: 'cacique',
        personagemId: 1,
        frameRateIdle: 10,
        frameRateWalking: 40,
        textoX: 146,
        texto1: 'Brincando no meio de um mata\ngal, Cacique foi encontrado por \nThiaguinho e agora junta-se a \nele na busca de seus irmãos. Sen\ndo o caçula do grupo, Cacique \ntem menos noção do perigo e aca\nba se metendo em meio de animais',
        texto2: 'mortais na floresta onde brin\ncava.'
      },
      {
        id: 'isa',
        personagemId: 2,
        frameRateIdle: 10,
        frameRateWalking: 40,
        textoX: 192,
        texto1: 'Isa, a patinha mais velha e curio\nsa, acaba viajando acidentalmen\nte para um mundo mágico onde as \nregras do nosso cotidiano não \nse aplicam. A magia é volátil e a\npenas os mais sábios conseguem \nutilizá-la ao seu favor. Felizmen',
        texto2: 'te, dominar a arte da magia não \nfoi um desafio para a pata bran\nca, que aproveitou de seu alto \nintelecto para tirar proveito da \nmagia.'
      },
      {
        id: 'pam',
        personagemId: 3,
        frameRateIdle: 40,
        frameRateWalking: 40,
        textoX: 184,
        texto1: 'Pâm, um marreco-selvagem, é \numa patinha que adora a brisa \ndo campo. As vastas terras ver\ndejantes têm espaço de sobra pa\nra Pâm praticar seu hobby favo\nrito: futebol. Essa escandalosa \npatinha pode ser considerada um',
        texto2: 'prodígio entre os patos quando \no assunto é jogar bola.'
      },
      {
        id: 'tucano',
        personagemId: 4,
        frameRateIdle: 12,
        frameRateWalking: 40,
        textoX: 150,
        texto1: 'Tucano, que tem nome de pás\nsaro, vive com patos mas na ver\ndade é um ganso, foi encontrado \nna beira do mar, fazendo sabe-se \nlá o que. Tucano é um mistério en\ntre os patinhos e é de longe o pa\ntinho mais distante da familia,',
        texto2: 'tanto em aparência quanto em \ndistância. Ele não é dos mais in\nteligentes, mas consegue compen\nsar isso com seu incrível vigor \nfísico.'
      }
    ]

    this.setaBarraCima = this.physics.add.sprite(411, 502, 'seta-barra')
      .setScale(0.6)
      .setImmovable()
      .setInteractive()
      .on('pointerover', () => {
        this.setaBarraCima.setFrame(0)
        this.barra.setY(520)
        this.textoDescricao.setText(this.personagens[this.game.personagemEscolhido].texto1)
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
        this.textoDescricao.setText(this.personagens[this.game.personagemEscolhido].texto2)
      })
      .on('pointerout', () => {
        this.setaBarraBaixo.setFrame(0)
      })

    this.personagemDireita = this.add.sprite(331, 395, 'botao-selecionar')
      .setInteractive()
      .on('pointerdown', () => {
        if (this.game.personagemEscolhido === this.personagens.length - 1) {
          this.game.personagemEscolhido = 0
        } else {
          this.game.personagemEscolhido += 1
        }
        this.textoDescricao.destroy()

        /* Atualizar o personagem */
        this.atualizarPersonagem()
      })

    this.personagemEsquerda = this.add.sprite(116, 395, 'botao-selecionar')
      .setFlipX(true)
      .setInteractive()
      .on('pointerdown', () => {
        if (this.game.personagemEscolhido === 0) {
          this.game.personagemEscolhido = 4
        } else {
          this.game.personagemEscolhido -= 1
        }
        this.textoDescricao.destroy()

        /* Atualizar o personagem */
        this.atualizarPersonagem()
      })

    this.acessorios = [
      {
        id: 'default',
        acessorioId: 0
      },
      {
        id: 'cocar',
        acessorioId: 1
      },
      {
        id: 'mago',
        acessorioId: 2
      },
      {
        id: 'palha',
        acessorioId: 3
      },
      {
        id: 'oculos',
        acessorioId: 4
      }
    ]

    this.acessorioDireita = this.add.sprite(331, 305, 'botao-selecionar')
      .setInteractive()
      .on('pointerdown', () => {
        if (this.game.acessorioEscolhido === this.acessorios.length - 1) {
          this.game.acessorioEscolhido = 0
        } else {
          this.game.acessorioEscolhido += 1
        }

        /* Atualizar o personagem */
        this.atualizarPersonagem()
      })

    this.acessorioEsquerda = this.add.sprite(116, 305, 'botao-selecionar')
      .setFlipX(true)
      .setInteractive()
      .on('pointerdown', () => {
        if (this.game.acessorioEscolhido === 0) {
          this.game.acessorioEscolhido = 4
        } else {
          this.game.acessorioEscolhido -= 1
        }

        /* Atualizar o personagem */
        this.atualizarPersonagem()
      })

    this.iniciar = this.add.sprite(226, 740, 'botao-iniciar')
      .setInteractive()
      .on('pointerdown', () => {
        this.trilhaMenu.stop()
        this.iniciar.setFrame(1)
        this.time.addEvent({
          delay: 1000,
          callback: this.contagemIniciar,
          callbackScope: this,
          loop: true
        })
      })
      .on('pointerup', () => {
        this.iniciar.setFrame(0)
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

    if (this.textoPersonagem) {
      this.textoPersonagem.destroy()
    }

    if (this.textoDescricao) {
      this.textoDescricao.destroy()
    }

    this.game.estadoPersonagem = {
      spriteId: this.personagens[this.game.personagemEscolhido].personagemId + '-' + this.acessorios[this.game.acessorioEscolhido].acessorioId,
      spritePato: '/' + this.personagens[this.game.personagemEscolhido].id + '/' + this.personagens[this.game.personagemEscolhido].id + '-' + this.acessorios[this.game.acessorioEscolhido].id + '.png'
    }

    this.game.socket.emit('escolha-publicar', this.game.sala, this.game.estadoPersonagem, {
      escolha: this.escolhaRemoto
    })

    this.personagemFinal = this.add.sprite(239, 315, this.personagens[this.game.personagemEscolhido].id + '-' + this.acessorios[this.game.acessorioEscolhido].id)
      .setScale(2.5)

    this.textoPersonagem = this.add.text(this.personagens[this.game.personagemEscolhido].textoX, 452, this.personagens[this.game.personagemEscolhido].id, {
      fontFamily: 'Silkscreen',
      fontSize: '32px',
      stroke: '#000000',
      strokeThickness: 4,
      fill: '#ffffff'
    })

    this.textoDescricao = this.add.text(34, 492, this.personagens[this.game.personagemEscolhido].texto1, {
      fontFamily: 'Silkscreen',
      fontSize: '17px',
      stroke: '#000000',
      strokeThickness: 2,
      fill: '#ffffff'
    })

    if (this.idle) { this.idle.destroy() }
    this.idle = this.anims.create({
      key: 'pato-idle',
      frames: this.anims.generateFrameNumbers(this.personagens[this.game.personagemEscolhido].id + '-' + this.acessorios[this.game.acessorioEscolhido].id, {
        start: 0,
        end: 43
      }),
      frameRate: 40,
      repeat: -1
    })
    this.textoPersonagem.setText(this.personagens[this.game.personagemEscolhido].id)
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
      this.trilhaMenu.stop()
      this.game.scene.stop('menu')
      this.game.scene.start('floresta')
    }
  }
}
