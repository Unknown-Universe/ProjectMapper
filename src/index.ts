import { Point } from './types/point';
import { Triangle } from './types/shapes/Triangle';

const triangle = Triangle.createEqual(10, new Point(0, 0));
console.log(triangle.position);
