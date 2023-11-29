/* eslint-disable no-undef */
export default class gameoverFloresta extends Phaser.Scene {
  constructor () {
    super('gameover-floresta')
  }

  preload () {
    this.load.audio('clique', './assets/audios/clique.mp3')
    this.load.audio('credito', './assets/audios/credito.mp3')
    this.load.audio('erro', './assets/audios/erro.mp3')
  }

  create () {
    this.clique = this.sound.add('clique')
    this.credito = this.sound.add('credito')
    this.erro = this.sound.add('erro')

    this.posicao = ''

    this.informacoes = this.add.text(36, 20, 'DIGITE SUAS \nINFORMAÇÕES', {
      fontFamily: 'Silkscreen',
      fontSize: '36px',
      fill: '#ffffff'
    })

    this.usuarioTextoBase = 'Usuário: '
    this.usuarioDigitado = ''
    this.usuario = this.add.text(36, 164, this.usuarioTextoBase, {
      fontFamily: 'Silkscreen',
      fontSize: '32px',
      fill: '#cccccc'
    })
      .setInteractive()
      .on('pointerdown', () => {
        this.clique.play()
        this.posicao = 'usuário'
        this.usuario.setFill('#ffffff')
        this.senha.setFill('#cccccc')
        this.voltar.x = 392
        this.voltar.y = this.usuario.y
      })

    this.senhaTextoBase = 'Senha: '
    this.senhaDigitada = ''
    this.senha = this.add.text(36, 240, this.senhaTextoBase, {
      fontFamily: 'Silkscreen',
      fontSize: '32px',
      fill: '#cccccc'
    })
      .setInteractive()
      .on('pointerdown', () => {
        this.clique.play()
        this.posicao = 'senha'
        this.usuario.setFill('#cccccc')
        this.senha.setFill('#ffffff')
        this.voltar.x = 392
        this.voltar.y = this.senha.y
      })

    const teclado = [...Array(10).keys()]
    teclado.forEach(digito => {
      const valor = (digito + 1) % 10
      this.textoTeclado = this.add.text(108 * ((digito % 3) + 1), 80 * (Math.floor(digito / 3) + 4.5), valor, {
        fontFamily: 'Silkscreen',
        fontSize: '32px',
        fill: '#ffffff'
      })
        .setInteractive()
        .on('pointerdown', () => {
          this.clique.play()
          if (this.posicao === 'usuário') {
            if (this.usuarioDigitado.length < 4) {
              this.usuarioDigitado += valor
              this.usuario.text = this.usuarioTextoBase + this.usuarioDigitado
            }
          } else if (this.posicao === 'senha') {
            if (this.senhaDigitada.length < 4) {
              this.senhaDigitada += valor
              let senhaOculta = ''
              Array.from(this.senhaDigitada).forEach(numero => {
                senhaOculta += '*'
              })
              this.senha.text = this.senhaTextoBase + senhaOculta
            }
          }
          if (this.usuarioDigitado.length === 4 && this.senhaDigitada.length === 4) {
            this.enviar = this.add.text(142, 684, '[ENVIAR]', {
              fontFamily: 'Silkscreen',
              fontSize: '32px',
              fill: '#ffffff'
            })
              .setInteractive()
              .on('pointerdown', () => {
                axios.post('https://feira-de-jogos.sj.ifsc.edu.br/api/v1/credito', {
                  id: this.usuarioDigitado,
                  senha: this.senhaDigitada,
                  jogo: this.game.id,
                  valor: this.game.valor
                })
                  .then((response) => {
                    if (response.status === 200) {
                      this.credito.play()
                      this.enviar.destroy()
                      this.tempo = 2
                      this.relogio = this.time.addEvent({
                        delay: 1000,
                        callback: () => {
                          this.tempo--
                          if (this.tempo === 0) {
                            this.relogio.destroy()
                            this.scene.stop('gameover-floresta')
                            this.scene.start('abertura')
                          }
                        },
                        callbackScope: this,
                        loop: true
                      })
                    }
                  })
                  .catch((error) => {
                    if (error.response.status === 401) {
                      this.erro.play()
                      this.enviar.text = '[401]'
                      this.tempo = 2
                      this.relogio = this.time.addEvent({
                        delay: 1000,
                        callback: () => {
                          this.tempo--
                          if (this.tempo === 0) {
                            this.relogio.destroy()
                            this.enviar.destroy()
                          }
                        },
                        callbackScope: this,
                        loop: true
                      })
                    }
                    console.error(error)
                  })
              })
          }
        })
    })

    this.voltar = this.add.text(800, 100, '<', {
      fontFamily: 'Silkscreen',
      fontSize: '32px',
      fill: '#ffffff'
    })
      .setInteractive()
      .on('pointerdown', () => {
        this.clique.play()
        if (this.posicao === 'usuário') {
          if (this.usuarioDigitado.length > 0) {
            this.usuarioDigitado = this.usuarioDigitado.slice(0, -1)
            this.usuario.text = this.usuarioTextoBase + this.usuarioDigitado
          }
        } else if (this.posicao === 'senha') {
          if (this.senhaDigitada.length > 0) {
            this.senhaDigitada = this.senhaDigitada.slice(0, -1)
            let senhaOculta = ''
            Array.from(this.senhaDigitada).forEach(numero => {
              senhaOculta += '*'
            })
            this.senha.text = this.senhaTextoBase + senhaOculta
          }
        }

        if (this.usuarioDigitado.length !== 4 || this.senhaDigitada.length !== 4) {
          try {
            this.enviar.destroy()
          } catch (error) {
            console.error(error)
          }
        }
      })
  }

  update () { }
}
