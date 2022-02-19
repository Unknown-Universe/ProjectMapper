import { Line } from './line';
import { Point } from './point';

export abstract class Shape {
    public sides!: Line[];
    public vertices!: Point[];
    public position!: Point;
    public area!: number;

    public abstract rotateRadians(radians: number): Shape;
    public abstract rotateDegrees(degrees: number): Shape;
    public abstract move(x: number, y: number): Shape;
    public abstract overlaps(a: Shape): boolean;
    public abstract containsPoint(a: Point): boolean;
    public abstract containsShape(a: Shape): boolean;
}
