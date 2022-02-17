import { degreesToRadians } from '../../utilities/helpers';
import { Point } from '../point';
import { Shape } from '../shape';

export class Triangle extends Shape {
  constructor(height: number, base: number, hypotenuse: number, position: Point, vertices: Point[]) {
    super();
    this.sides = [height, base, hypotenuse];
    this.position = position;
    this.vertices = vertices;
  }

  public rotateRadians(radians: number): Shape {
    const position = this.position;
    const base = this.sides[0];
    const height = this.sides[1];
    const hypotenuse = this.sides[2];

    const vertices = this.vertices.map((point) => {
      return point.rotatePoint(radians);
    });
    return new Triangle(height, base, hypotenuse, position, vertices);
  }
  public rotateDegrees(degrees: number): Shape {
    return this.rotateRadians(degreesToRadians(degrees));
  }
  public transform(x: number, y: number): Shape {
    const position = new Point(this.position.x + x, this.position.y + y);
    const base = this.sides[0];
    const height = this.sides[1];
    const hypotenuse = this.sides[2];

    const vertices = this.vertices.map((point) => {
      return point.movePoint(new Point(x, y));
    });
    return new Triangle(height, base, hypotenuse, position, vertices);
  }

  public static createFromPoints(a: Point, b: Point, c: Point): Triangle {
    const center = new Point((a.x + b.x + c.x) / 3, (a.y + b.y + c.y) / 3);

    const height = Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2); //ab
    const base = Math.sqrt((b.x - c.x) ** 2 + (b.y - c.y) ** 2); //bc
    const hypotenuse = Math.sqrt((a.x - c.x) ** 2 + (a.y - c.y) ** 2); //ac

    const returnVal: Point[] = [a, b, c];

    return new Triangle(height, base, hypotenuse, center, returnVal);
  }
  public static createEqual(length: number, position: Point): Triangle {
    const a = new Point(position.x, position.y + length / Math.sqrt(3));
    const b = new Point(position.x + length / Math.sqrt(3) / 2, position.y - length / Math.sqrt(3) / 2);
    const c = new Point(position.x - length / Math.sqrt(3) / 2, position.y - length / Math.sqrt(3) / 2);

    return new Triangle(length, length, length, position, [a, b, c]);
  }
}
