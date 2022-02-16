import { alignUnits, degreesToRadians, unitOf } from "../../utilities/helpers";
import { Mesurement, Point } from "../mesurements";
import { Shape } from "../shape";

export class Triangle extends Shape {
    constructor(
        height: Mesurement,
        base: Mesurement,
        hypotenuse: Mesurement,
        position: Point,
        vertices: Point[]
    ) {
        super();
        if (
            unitOf(height) !== unitOf(base) ||
            unitOf(base) !== unitOf(hypotenuse)
        ) {
            height = alignUnits(height, base);
            hypotenuse = alignUnits(hypotenuse, base);
        }

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

    public static createFromPoints(
        a: Point,
        b: Point,
        c: Point,
        mesurement: "cm" | "mm" | "m" | "in" | "ft" | "yd"
    ): Triangle {
        const center = new Point((a.x + b.x + c.x) / 3, (a.y + b.y + c.y) / 3);

        const height = Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2); //ab
        const base = Math.sqrt((b.x - c.x) ** 2 + (b.y - c.y) ** 2); //bc
        const hypotenuse = Math.sqrt((a.x - c.x) ** 2 + (a.y - c.y) ** 2); //ac

        const returnVal: Point[] = [a, b, c];

        return new Triangle(
            `${height}${mesurement}`,
            `${base}${mesurement}`,
            `${hypotenuse}${mesurement}`,
            center,
            returnVal
        );
    }
}
