// Use the instructions at:
//      http://lfzprototypes.com/module-four/exercises/modules
// to refactor your file structure so you can require all 
// the shapes by using require('shapes')
// Once you have refactored your file structure 
// refactor all the below require statements into a
// single require statement.
const Circle = require('./lib/circle');
const Cone = require('./lib/cone');
const Cube = require('./lib/cube');
const Cylinder = require('./lib/cylinder');
const Rectangle = require('./lib/rectangle');
const Sphere = require('./lib/sphere');
const Square = require('./lib/square');
const Triangle = require('./lib/triangle');

// Circle Test
try {
    const circleSize = { r: 3.5 };
    const cir = new Circle(circleSize.r);

    console.log(`\nGiven a Circle with a radius of ${circleSize.r}:`);
    console.log(`\tArea: ${cir.area()}`);
    console.log(`\tCircumference: ${cir.circumference()}`);
} catch (err) {
    printError('Circle', err);
}

// Cone Test
try {
    const coneSize = { r: 2, h: 9 };
    const cone = new Cone(coneSize.h, coneSize.r);

    console.log(`\nGiven a Cone with a height of ${coneSize.h} and a radius of ${coneSize.r}:`);
    console.log(`\tVolume: ${cone.volume()}`);
    console.log(`\tSurface Area: ${cone.surfaceArea()}`);
} catch(err) {
    printError('Cone', err);
}

// Cube Test
try {
    const cubeSize = { s:7 };
    const cube = new Cube(cubeSize.s);

    console.log(`\nGiven a Cube with a side of ${cubeSize.s}:`);
    console.log(`\tVolume: ${cube.volume()}`);
    console.log(`\tSurface Area: ${cube.surfaceArea()}`);
} catch (err) {
    printError('Cube', err);
}

// Cylinder Test
try {
    const cylinderSize = { h: 12, r: 4 };
    const cylinder = new Cylinder(cylinderSize.h, cylinderSize.r);

    console.log(`\nGiven a Cylinder with a height of ${cylinderSize.h} and a radius of ${cylinderSize.r}:`);
    console.log(`\tVolume: ${cylinder.volume()}`);
    console.log(`\tSurface Area: ${cylinder.surfaceArea()}`);
} catch (err) {
    printError('Cylinder', err);
}

// Rectangle Test
try {
    const recSize = { l: 15, w: 9 };
    const rec = new Rectangle(recSize.l, recSize.w);

    console.log(`\nGiven a Rectangle with a length of ${recSize.l} and a width of ${recSize.w}:`);
    console.log(`\tArea: ${rec.area()}`);
    console.log(`\tPerimeter: ${rec.perimeter()}`);
} catch (err) {
    printError('Rectangle', err);
}

// Sphere Test
try {
    const sphereSize = { r: 3.5 };
    const sphere = new Sphere(sphereSize.r)

    console.log(`\nGiven a Sphere with a radius of ${sphereSize.r}:`);
    console.log(`\tVolume: ${sphere.volume()}`);
    console.log(`\tSurface Area: ${sphere.surfaceArea()}`);
} catch (err) {
    printError('Sphere', err);
}

// Square Test
try {
    const squareSize = { s: 5 };
    const sq = new Square(squareSize.s);

    console.log(`\nGiven a Square with a side of ${squareSize.s}:`);
    console.log(`\tArea: ${sq.area()}`);
    console.log(`\tPerimeter: ${sq.perimeter()}`);
} catch (err) {
    printError('Square', err);
}

// Triangle Test
try {
    const triangleSize = { a: 3, b: 3, c: 3 };
    const tri = new Triangle(triangleSize.a, triangleSize.b, triangleSize.c);

    console.log(`\nGiven a Triangle with the following sides: A: ${triangleSize.a}, B: ${triangleSize.b}, and C: ${triangleSize.c}`);
    console.log(`\tArea: ${tri.area()}`);
    console.log(`\tPerimeter: ${tri.perimeter()}\n`);
} catch (err) {
    printError('Triangle', err, '\n');
}

function printError(test, error, post = ''){
    console.log(`\n\u001b[1m\u001b[31;1mError in ${test} test: ${error.message}\u001b[0m${post}`);
}
