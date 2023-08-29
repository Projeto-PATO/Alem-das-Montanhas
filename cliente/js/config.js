/* eslint-disable no-undef */
/* Configuração do objeto Game */

export default {
  type: Phaser.AUTO,
  width: 450,
  height: 800,
  parent: 'game-container',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: true
    }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    parent: 'game-container',
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 450,
    height: 800
  }
}
