/* eslint-disable no-undef */
import config from './config.js'
import cena0 from './cena0.js'
import cena1 from './cena1.js'
class Game extends Phaser.Game {
  constructor () {
    super(config)

    this.scene.add('cena0', cena0)
    this.scene.add('cena1', cena1)

    this.scene.start('cena0')
  }
}

window.onload = () => {
  window.game = new Game()
}
