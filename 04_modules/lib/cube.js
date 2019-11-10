module.exports = class Cube {
    constructor(side){
        this.side = side;
    }

    volume(){
        return this.side ** 3;
    }

    surfaceArea(){
        return 6 * (this.side ** 2);
    }
}
