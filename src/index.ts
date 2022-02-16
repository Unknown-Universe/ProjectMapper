import { Point } from "./types/mesurements";
import { createRectangleFromCorners } from "./utilities/createShape";

const rectangle = createRectangleFromCorners(
    new Point(0, 10),
    new Point(-10, 0),
    "cm"
);

console.log(rectangle.rotateDegrees(45).vertices);
