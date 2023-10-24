/* eslint-disable no-undef */
import config from './config.js'
import abertura from './cena-abertura.js'
import sala from './cena-sala.js'
import menu from './cena-menu.js'
import floresta from './cena-floresta.js'
import mundoMagico from './cena-mundo-magico.js'
class Game extends Phaser.Game {
  constructor () {
    super(config)

    let iceServers
    if (window.location.host === 'feira-de-jogos.sj.ifsc.edu.br') {
      iceServers = [
        {
          urls: 'stun:feira-de-jogos.sj.ifsc.edu.br'
        },
        {
          urls: 'turns:feira-de-jogos.sj.ifsc.edu.br',
          username: 'adcipt',
          credential: 'adcipt20232'
        }
      ]
    } else {
      iceServers = [
        {
          urls: 'stun:stun.l.google.com:19302'
        }
      ]
    }
    this.iceServers = { iceServers }
    this.audio = document.querySelector('audio')

    this.socket = io()
    this.socket.on('connect', () => {
      console.log('Conectado ao servidor!')
    })

    this.personagemEscolhido = 0
    this.acessorioEscolhido = 0
    this.estadoPersonagem = undefined
    this.estadoPersonagem2 = undefined

    this.vida = {
      frameCoracoes: 0
    }

    this.scoreMigalha = {
      score: 0
    }
    this.scene.add('abertura', abertura)
    this.scene.add('sala', sala)
    this.scene.add('menu', menu)
    this.scene.add('floresta', floresta)
    this.scene.add('mundo-magico', mundoMagico)

    this.scene.start('abertura')
  }
}

window.onload = () => {
  window.game = new Game()
}
