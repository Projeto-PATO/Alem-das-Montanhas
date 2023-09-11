// eslint-disable-next-line no-undef
export default class menu extends Phaser.Scene {
  constructor () {
    super('menu')
  }

  preload () {
    this.load.spritesheet('thiaguinho', '../assets/patos/thiaguinho/thiaguinho-default-idle.png', {
      frameWidth: 76,
      frameHeight: 72
    })
    this.load.spritesheet('cacique', '../assets/patos/cacique/cacique-default-idle.png', {
      frameWidth: 76,
      frameHeight: 72
    })
    this.load.spritesheet('isa', '../assets/patos/isa/isa-default-idle.png', {
      frameWidth: 76,
      frameHeight: 72
    })
    this.load.spritesheet('pam', '../assets/patos/pam/pam-default-idle.png', {
      frameWidth: 76,
      frameHeight: 72
    })
    this.load.spritesheet('tucano', '../assets/patos/tucano/tucano-default-idle.png', {
      frameWidth: 92,
      frameHeight: 92
    })
  }

  create () {
    this.thiaguinho = this.add.sprite(64, 700, 'thiaguinho')
      .setInteractive()
      .on('pointerdown', () => {
        this.game.scene.stop('menu')
        this.game.scene.start('floresta',
          {
            id: 0,
            spriteidle: '/thiaguinho/thiaguinho-default-idle.png',
            spritewalking: '/thiaguinho/thiaguinho-default-walking.png',
            frameendidle: 15,
            frameendwalking: 21,
            framerateidle: 10,
            frameratewalking: 40
          })
      })

    this.cacique = this.add.sprite(128, 700, 'cacique')
      .setInteractive()
      .on('pointerdown', () => {
        this.game.scene.stop('menu')
        this.game.scene.start('floresta',
          {
            id: 1,
            spriteidle: '/cacique/cacique-default-idle.png',
            spritewalking: '/cacique/cacique-default-walking.png',
            frameendidle: 11,
            frameendwalking: 21,
            framerateidle: 10,
            frameratewalking: 40
          })
      })
    this.isa = this.add.sprite(192, 700, 'isa')
      .setInteractive()
      .on('pointerdown', () => {
        this.game.scene.stop('menu')
        this.game.scene.start('floresta',
          {
            id: 2,
            spriteidle: '/isa/isa-default-idle.png',
            spritewalking: '/isa/isa-default-walking.png',
            frameendidle: 11,
            frameendwalking: 21,
            framerateidle: 10,
            frameratewalking: 40
          })
      })
    this.pam = this.add.sprite(256, 700, 'pam')
      .setInteractive()
      .on('pointerdown', () => {
        this.game.scene.stop('menu')
        this.game.scene.start('floresta',
          {
            id: 3,
            spriteidle: '/pam/pam-default-idle.png',
            spritewalking: '/pam/pam-default-walking.png',
            frameendidle: 21,
            frameendwalking: 21,
            framerateidle: 40,
            frameratewalking: 40
          })
      })

    this.tucano = this.add.sprite(338, 700, 'tucano')
      .setInteractive()
      .on('pointerdown', () => {
        this.game.scene.stop('menu')
        this.game.scene.start('floresta',
          {
            id: 4,
            spriteidle: '/tucano/tucano-default-idle.png',
            spritewalking: '/tucano/tucano-default-walking.png',
            frameendidle: 15,
            frameendwalking: 21,
            framerateidle: 10,
            frameratewalking: 40
          })
      })
  }

  update () { }
}
