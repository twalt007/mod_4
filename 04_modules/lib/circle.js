module.exports = class Circle {
    constructor(radius) {
        this.radius = radius;
    }

    area() {
        return Math.PI * (this.radius ** 2);
    }

    circumference() {
        return 2 * Math.PI * this.radius;
    }
}
