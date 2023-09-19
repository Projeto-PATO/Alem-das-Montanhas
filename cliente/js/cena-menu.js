// eslint-disable-next-line no-undef
export default class menu extends Phaser.Scene {
  constructor () {
    super('menu')
  }

  preload () {
    this.load.spritesheet('thiaguinho', '../assets/patos/thiaguinho/thiaguinho-default-idle.png', {
      frameWidth: 92,
      frameHeight: 108
    })
    this.load.spritesheet('cacique', '../assets/patos/cacique/cacique-default-idle.png', {
      frameWidth: 92,
      frameHeight: 108
    })
    this.load.spritesheet('isa', '../assets/patos/isa/isa-default-idle.png', {
      frameWidth: 92,
      frameHeight: 108
    })
    this.load.spritesheet('pam', '../assets/patos/pam/pam-default-idle.png', {
      frameWidth: 92,
      frameHeight: 108
    })
    this.load.spritesheet('tucano', '../assets/patos/tucano/tucano-default-idle.png', {
      frameWidth: 92,
      frameHeight: 108
    })

    this.load.audio('trilha-menu', '../assets/audios/trilha-menu.mp3')
  }

  create () {
    this.trilhaMenu = this.sound.add('trilha-menu')
    this.trilhaMenu.loop = true
    this.trilhaMenu.play()

    this.thiaguinho = this.add.sprite(64, 700, 'thiaguinho')
      .setInteractive()
      .on('pointerdown', () => {
        this.game.scene.stop('menu')
        this.game.estadoPersonagem = {
          spriteId: 0,
          spriteIdle: '/thiaguinho/thiaguinho-default-idle.png',
          spriteWalking: '/thiaguinho/thiaguinho-default-walking.png',
          frameEndIdle: 15,
          frameEndWalking: 21,
          frameRateIdle: 10,
          frameRateWalking: 40
        }
        this.game.scene.start('floresta')
        this.trilhaMenu.stop()
      })

    this.cacique = this.add.sprite(128, 700, 'cacique')
      .setInteractive()
      .on('pointerdown', () => {
        this.game.scene.stop('menu')
        this.game.estadoPersonagem = {
          spriteId: 1,
          spriteIdle: '/cacique/cacique-default-idle.png',
          spriteWalking: '/cacique/cacique-default-walking.png',
          frameEndIdle: 11,
          frameEndWalking: 21,
          frameRateIdle: 10,
          frameRateWalking: 40
        }
        this.trilhaMenu.stop()
        this.game.scene.start('floresta')
      })
    this.isa = this.add.sprite(192, 700, 'isa')
      .setInteractive()
      .on('pointerdown', () => {
        this.game.scene.stop('menu')
        this.game.estadoPersonagem = {
          spriteId: 2,
          spriteIdle: '/isa/isa-default-idle.png',
          spriteWalking: '/isa/isa-default-walking.png',
          frameEndIdle: 11,
          frameEndWalking: 21,
          frameRateIdle: 10,
          frameRateWalking: 40
        }
        this.trilhaMenu.stop()
        this.game.scene.start('floresta')
      })
    this.pam = this.add.sprite(256, 700, 'pam')
      .setInteractive()
      .on('pointerdown', () => {
        this.game.scene.stop('menu')
        this.game.estadoPersonagem = {
          spriteId: 3,
          spriteIdle: '/pam/pam-default-idle.png',
          spriteWalking: '/pam/pam-default-walking.png',
          frameEndIdle: 21,
          frameEndWalking: 21,
          frameRateIdle: 40,
          frameRateWalking: 40
        }
        this.trilhaMenu.stop()
        this.game.scene.start('floresta')
      })

    this.tucano = this.add.sprite(338, 700, 'tucano')
      .setInteractive()
      .on('pointerdown', () => {
        this.game.scene.stop('menu')
        this.game.estadoPersonagem = {
          spriteId: 4,
          spriteIdle: '/tucano/tucano-default-idle.png',
          spriteWalking: '/tucano/tucano-default-walking.png',
          frameEndIdle: 15,
          frameEndWalking: 21,
          frameRateIdle: 10,
          frameRateWalking: 40
        }
        this.trilhaMenu.stop()
        this.game.scene.start('floresta')
      })
  }

  update () { }
}
