module.exports = class Rectangle {
    constructor(length, width) {
        this.length = length;
        this.width = width;
    }

    area() {
        return this.length * this.width;
    }

    perimeter() {
        return (this.length * 2) + (this.width * 2);
    }
}
