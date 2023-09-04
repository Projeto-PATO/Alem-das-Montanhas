/* eslint-disable no-undef */
import config from './config.js'
import abertura from './cena-abertura.js'
import sala from './cena-sala.js'
import menu from './cena-menu.js'
import floresta from './cena-floresta.js'
import vitoria from './cena-vitoria.js'
class Game extends Phaser.Game {
  constructor () {
    super(config)

    this.scene.add('abertura', abertura)
    this.scene.add('sala', sala)
    this.scene.add('menu', menu)
    this.scene.add('floresta', floresta)
    this.scene.add('vitoria', vitoria)

    this.scene.start('abertura')
  }
}

window.onload = () => {
  window.game = new Game()
}
