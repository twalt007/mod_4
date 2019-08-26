module.exports = class Cone {
    constructor(height, radius) {
        this.height = height;
        this.radius = radius;
    }

    volume(){
        return Math.PI * this.radius * (this.radius + Math.sqrt((this.height ** 2) + (this.radius ** 2)));
    }

    surfaceArea(){
        return Math.PI * (this.radius ** 2) * (this.height/3);
    }
}
