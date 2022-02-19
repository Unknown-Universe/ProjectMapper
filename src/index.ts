import { Point } from './shapeManager/types/point';
import { Rectangle } from './shapeManager/types/shapes/Rectangle';

const rect1 = Rectangle.createSquare(10, new Point(0, 0));
const rect2 = Rectangle.createSquare(5, new Point(0, 0));

console.log(rect1.containsShape(rect2));
