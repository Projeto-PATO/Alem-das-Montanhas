export default class cena0 extends Phaser.Scene {
    constructor () {
        super('cena0')
    }

    preload () {
        this.load.image('patos-na-grama', './patograma.png')

    }

    create () {
        this.add.image(225, 400, 'patos-na-grama')
    }

    update () {}
    
}