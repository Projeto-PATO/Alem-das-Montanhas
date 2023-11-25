/* eslint-disable indent */
// eslint-disable-next-line no-undef
export default class sala extends Phaser.Scene {
  constructor () {
    super('sala')
  }

  preload () {
    this.load.spritesheet('fundo-sala', '../assets/menu-sala.png', {
      frameWidth: 448,
      frameHeight: 800
    })

    this.load.spritesheet('0', '../assets/botoes/sala0.png', {
      frameWidth: 155,
      frameHeight: 60
    })
    this.load.spritesheet('1', '../assets/botoes/sala1.png', {
      frameWidth: 155,
      frameHeight: 60
    })
    this.load.spritesheet('2', '../assets/botoes/sala2.png', {
      frameWidth: 155,
      frameHeight: 60
    })
    this.load.spritesheet('3', '../assets/botoes/sala3.png', {
      frameWidth: 155,
      frameHeight: 60
    })
    this.load.spritesheet('4', '../assets/botoes/sala4.png', {
      frameWidth: 155,
      frameHeight: 60
    })
    this.load.spritesheet('5', '../assets/botoes/sala5.png', {
      frameWidth: 155,
      frameHeight: 60
    })
    this.load.spritesheet('6', '../assets/botoes/sala6.png', {
      frameWidth: 155,
      frameHeight: 60
    })
    this.load.spritesheet('7', '../assets/botoes/sala7.png', {
      frameWidth: 155,
      frameHeight: 60
    })
    this.load.spritesheet('8', '../assets/botoes/sala8.png', {
      frameWidth: 155,
      frameHeight: 60
    })
    this.load.spritesheet('9', '../assets/botoes/sala9.png', {
      frameWidth: 155,
      frameHeight: 60
    })
  }

  create () {
    this.fundo = this.add.sprite(224, 400, 'fundo-sala')

    this.timer = 2

    this.salas = [
      {
        numero: '0',
        x: 108,
        y: 240,
        botao: undefined
      },
      {
        numero: '1',
        x: 108,
        y: 335,
        botao: undefined
      },
      {
        numero: '2',
        x: 108,
        y: 430,
        botao: undefined
      },
      {
        numero: '3',
        x: 108,
        y: 525,
        botao: undefined
      },
      {
        numero: '4',
        x: 108,
        y: 620,
        botao: undefined
      },
      {
        numero: '5',
        x: 342,
        y: 240,
        botao: undefined
      },
      {
        numero: '6',
        x: 342,
        y: 335,
        botao: undefined
      },
      {
        numero: '7',
        x: 342,
        y: 430,
        botao: undefined
      },
      {
        numero: '8',
        x: 342,
        y: 525,
        botao: undefined
      },
      {
        numero: '9',
        x: 342,
        y: 620,
        botao: undefined
      }
    ]

    this.salas.forEach((item) => {
      item.botao = this.add.sprite(item.x, item.y, item.numero)
        .setInteractive()
        .on('pointerdown', () => {
          item.botao.setFrame(1)
          this.fundo.setFrame(1)
          this.salas.forEach((item) => {
            item.botao.destroy()
          })
          this.game.sala = item.numero
          this.game.socket.emit('entrar-na-sala', this.game.sala)
        })
        .on('pointerup', () => {
          this.item.botao.setFrame(0)
        })
      this.game.socket.on('jogadores', (jogadores) => {
        console.log(jogadores)
        if (jogadores.segundo) {
          this.game.jogadores = jogadores
          this.game.scene.stop('sala')
          this.game.scene.start('menu')
        } else if (jogadores.primeiro) {
          navigator.mediaDevices
            .getUserMedia({ video: false, audio: true })
            .then((stream) => {
              this.game.midias = stream
            })
            .catch((error) => console.error(error))
        }
      })
    })
  }
}
