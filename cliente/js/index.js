/* eslint-disable no-undef */
import config from './config.js'
import abertura from './cena-abertura.js'
import sala from './cena-sala.js'
import cutscene from './cena-cutscene.js'
import menu from './cena-menu.js'
import floresta from './cena-floresta.js'
import mundoMagico from './cena-mundo-magico.js'
import campo from './cena-campo.js'
import praia from './cena-praia.js'
import gameoverFloresta from './cena-gameover-floresta.js'
import gameoverMundoMagico from './cena-gameover-mundo-magico.js'
import gameoverCampo from './cena-gameover-campo.js'
import gameoverPraia from './cena-gameover-praia.js'
import vitoria from './cena-vitoria.js'
import vitoriaMigalhas from './cena-vitoria-migalhas.js'

class Game extends Phaser.Game {
  constructor () {
    super(config)

    this.id = 2
    this.valor = 100

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

      this.socket.on('escolha-notificar', (personagem) => {
        this.estadoPersonagemRemoto = personagem
      })

      this.cenaCorrente = ''
      this.socket.on('cena-notificar', (cena) => {
        this.sound.stopByKey('trilha-floresta')
        this.sound.stopByKey('trilha-mm')
        this.sound.stopByKey('trilha-campo')
        this.sound.stopByKey('trilha-praia')
        this.scene.stop(this.cenaCorrente)
        this.scene.start(cena)
      })
    })

    this.personagemEscolhido = 0
    this.acessorioEscolhido = 0
    this.estadoPersonagem = undefined
    this.estadoPersonagem2 = undefined
    this.cobrasLiberadas = 0
    this.tratoresDLiberados = 0
    this.tratoresELiberados = 0
    this.caranguejosCBLiberados = 0
    this.caranguejosBCLiberados = 0

    this.vida = {
      frameCoracoes: 0
    }

    this.scoreMigalha = {
      score: 0
    }

    this.migalhasGuardadas = 0

    this.scene.add('abertura', abertura)
    this.scene.add('sala', sala)
    this.scene.add('cutscene', cutscene)
    this.scene.add('menu', menu)
    this.scene.add('floresta', floresta)
    this.scene.add('mundo-magico', mundoMagico)
    this.scene.add('campo', campo)
    this.scene.add('praia', praia)
    this.scene.add('gameover-floresta', gameoverFloresta)
    this.scene.add('gameover-mundo-magico', gameoverMundoMagico)
    this.scene.add('gameover-campo', gameoverCampo)
    this.scene.add('gameover-praia', gameoverPraia)
    this.scene.add('vitoria', vitoria)
    this.scene.add('vitoria-migalhas', vitoriaMigalhas)

    this.scene.start('abertura')
  }
}

window.onload = () => {
  window.game = new Game()
}
