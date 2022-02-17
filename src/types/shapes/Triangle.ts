import { add, degreesToRadians, round } from '../../utilities/helpers';
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
        const vertices = this.vertices.map((point) => {
            return point.rotatePoint(radians);
        });

        this.position = position;
        this.vertices = vertices;
        return this;
    }
    public rotateDegrees(degrees: number): Shape {
        return this.rotateRadians(degreesToRadians(degrees));
    }
    public move(x: number, y: number): Shape {
        const position = add(this.position, new Point(x, y));
        const vertices = this.vertices.map((point) => {
            return point.movePoint(new Point(x, y));
        });

        this.vertices = vertices;
        this.position = position;

        return this;
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
        const c = position;
        const a = new Point(length / 2, (Math.sqrt(3) / 2) * length);
        const b = new Point(c.x + length, c.y);

        const center = new Point((a.x + b.x + c.x) / 3, (a.y + b.y + c.y) / 3);

        const distance = center.distance(c);
        return new Triangle(length, length, length, center, [a, b, c]).move(
            round(-distance.x, 3),
            round(-distance.y, 3),
        );
    }
}
