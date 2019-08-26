const Circle = require('./circle');

module.exports = class Cylinder {
    constructor(height, radius) {
        this.height = height;
        this.radius = radius;
        this.circle = new Circle(this.radius);
    }

    volume(){
        return this.circle.area() * this.height;
    }

    surfaceArea(){
        return (this.circle.circumference() * this.height) + (2 * this.circle.area());
    }
}
