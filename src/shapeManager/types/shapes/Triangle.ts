import { add, areaOfTrangle, degreesToRadians, round } from '../../utilities/helpers';
import { Line } from '../line';
import { Point } from '../point';
import { Shape } from '../shape';

export class Triangle extends Shape {
    constructor(a: Line, b: Line, c: Line, position: Point, vertices: Point[]) {
        super();
        this.sides = [a, b, c];
        this.position = position;
        this.vertices = vertices;

        this.area = areaOfTrangle(this.vertices[0], this.vertices[1], this.vertices[2]);
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
    public overlaps(a: Shape): boolean {
        let overlap = false;
        this.sides.map((x) => {
            a.sides.map((y) => {
                if (x.overlaps(y)) overlap = true;
            });
        });
        return overlap;
    }
    public containsPoint(a: Point): boolean {
        const A1 = this.area;
        const A2 = areaOfTrangle(a, this.vertices[1], this.vertices[2]);
        const A3 = areaOfTrangle(a, this.vertices[0], this.vertices[2]);
        const A4 = areaOfTrangle(a, this.vertices[0], this.vertices[1]);

        return A1 === A2 + A3 + A4;
    }

    public containsShape(a: Shape): boolean {
        let overlap = true;
        a.vertices.map((v) => {
            if (!this.containsPoint(v)) overlap = false;
        });
        return overlap;
    }

    public static createFromPoints(a: Point, b: Point, c: Point): Triangle {
        const center = new Point((a.x + b.x + c.x) / 3, (a.y + b.y + c.y) / 3);

        const x = new Line(a, b); //ab
        const y = new Line(b, c); //bc
        const z = new Line(a, c); //ac

        const returnVal: Point[] = [a, b, c];

        return new Triangle(x, y, z, center, returnVal);
    }

    public static createEqual(length: number, x: number, y: number): Triangle {
        const c = new Point(x, y);
        const a = new Point(length / 2, (Math.sqrt(3) / 2) * length);
        const b = new Point(c.x + length, c.y);

        const center = new Point((a.x + b.x + c.x) / 3, (a.y + b.y + c.y) / 3);

        const distance = center.distance(c);
        return new Triangle(new Line(a, b), new Line(b, c), new Line(a, c), center, [a, b, c]).move(
            round(-distance.x, 3),
            round(-distance.y, 3),
        );
    }
}
