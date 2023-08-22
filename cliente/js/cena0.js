export default class cena0 extends Phaser.Scene {
    constructor () {
        super('cena0')
    }

    preload() {
        this.load.image('tela-abertura', '../assets/telaabertura.png')

    }

    create() {
        this.add.image(225, 400, 'tela-abertura')
    }

    update() { }

}