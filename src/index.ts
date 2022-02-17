import { Point } from './types/point';
import { Rectangle } from './types/shapes/Rectangle';
import { Triangle } from './types/shapes/Triangle';

const square = Rectangle.createSquare(10, new Point(0, 0));

const triangle = Triangle.createEqual(10, new Point(0, 0));
console.log(triangle);
