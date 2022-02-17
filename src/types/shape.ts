import { Point } from './point';

export abstract class Shape {
  public sides!: number[];
  public vertices!: Point[];
  public position!: Point;

  public abstract rotateRadians(radians: number): Shape;
  public abstract rotateDegrees(degrees: number): Shape;
  public abstract transform(x: number, y: number): Shape;
}
