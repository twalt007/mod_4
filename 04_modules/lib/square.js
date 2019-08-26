module.exports = class Square {
    constructor(side) {
        this.side = side;
    }

    area(){
        return this.side ** 2;
    }

    perimeter(){
        return this.side * 4;
    }
}
