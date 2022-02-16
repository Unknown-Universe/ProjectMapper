import { Point } from "./types/mesurements";
import { Rectangle } from "./types/shapes/Rectangle";
import { Triangle } from "./types/shapes/Triangle";

const square = Rectangle.createSquare("10ft", new Point(10, 10));

console.log("square:", square);

console.log(
    "square.rotateDegrees(45).transform(10, 5):",
    square.rotateDegrees(45).transform(10, 5)
);

const triangle = Triangle.createFromPoints(
    new Point(10, 10),
    new Point(5, 10),
    new Point(10, 5),
    "ft"
);

console.log("triangle:", triangle);

console.log(
    "triangle.rotateDegrees(45).transform(10, 5): ",
    triangle.rotateDegrees(45).transform(10, 5)
);
