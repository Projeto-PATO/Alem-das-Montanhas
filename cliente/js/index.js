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

    this.socket = io()

    this.estadoPersonagem = {}

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
