/* eslint-disable indent */
// eslint-disable-next-line no-undef
export default class sala extends Phaser.Scene {
  constructor () {
    super('sala')
  }

  preload () {
    this.load.image('tela-abertura', '../assets/telaabertura.png')
  }

  create () {
    this.imagem = this.add.image(225, 400, 'tela-abertura').setTint(0x000000)
    this.mensagem = this.add.text(85, 100, 'Escolha uma sala para entrar:', {
      fontFamily: 'monospace',
      font: '16px Courier',
      fill: '#cccccc'
    })
    this.salas = [
      {
        numero: '0',
        x: 75,
        y: 150,
        botao: undefined
      },
      {
        numero: '1',
        x: 75,
        y: 200,
        botao: undefined
      },
      {
        numero: '2',
        x: 75,
        y: 250,
        botao: undefined
      },
      {
        numero: '3',
        x: 75,
        y: 300,
        botao: undefined
      },
      {
        numero: '4',
        x: 75,
        y: 350,
        botao: undefined
      },
      {
        numero: '5',
        x: 300,
        y: 150,
        botao: undefined
      },
      {
        numero: '6',
        x: 300,
        y: 200,
        botao: undefined
      },
      {
        numero: '7',
        x: 300,
        y: 250,
        botao: undefined
      },
      {
        numero: '8',
        x: 300,
        y: 300,
        botao: undefined
      },
      {
        numero: '9',
        x: 300,
        y: 350,
        botao: undefined
      }
    ]

    this.salas.forEach((item) => {
      item.botao = this.add
        .text(item.x, item.y, '[Sala ' + item.numero + ']', {
          fontFamily: 'monospace',
          font: '16px Courier',
          fill: '#cccccc'
        })
        .setInteractive()
        .on('pointerdown', () => {
          this.salas.forEach((item) => {
            item.botao.destroy()
          this.game.scene.stop('sala')
          this.game.scene.start('floresta')
          })
        })
    })
  }
}
