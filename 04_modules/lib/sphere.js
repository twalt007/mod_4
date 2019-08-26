module.exports = class Sphere {
    constructor(radius){
        this.radius = radius;
    }

    volume(){
        return (4/3) * Math.PI * (this.radius ** 3);
    }

    surfaceArea(){
        return 4 * Math.PI * (this.radius ** 2);
    }
}
