import { alignUnits, degreesToRadians, unitOf } from "../utilities/helpers";
import { Mesurement, Point } from "./mesurements";

abstract class Shape {
    public sides!: Mesurement[];
    public vertices!: [Point, number][];
    public position!: Point;

    public abstract rotateRadians(radians: number): Shape;
    public abstract rotateDegrees(degrees: number): Shape;
    public abstract transform(x: number, y: number): Shape;
}

export class Rect extends Shape {
    constructor(
        height: Mesurement,
        width: Mesurement,
        position: Point,
        vertices: [Point, number][]
    ) {
        super();
        if (unitOf(height) !== unitOf(width)) {
            height = alignUnits(height, width);
        }
        this.sides = [width, height];
        this.position = position;
        this.vertices = vertices;
    }

    public rotateRadians(radians: number): Shape {
        const position = this.position;
        const width = this.sides[0];
        const height = this.sides[1];

        const vertices = this.vertices.map((point) => {
            const returnVal: [Point, number] = [
                point[0].rotatePoint(radians),
                point[1],
            ];
            return returnVal;
        });

        return new Rect(width, height, position, vertices);
    }

    public rotateDegrees(degrees: number): Shape {
        return this.rotateRadians(degreesToRadians(degrees));
    }

    public transform(x: number, y: number): Shape {
        const position = this.position;
        const width = this.sides[0];
        const height = this.sides[1];

        const vertices = this.vertices.map((point) => {
            const returnVal: [Point, number] = [
                point[0].movePoint(new Point(x, y)),
                point[1],
            ];
            return returnVal;
        });
        return new Rect(width, height, position, vertices);
    }
}
//[new Point(1, -1), 1],
// [new Point(-1, 1), 2],
// [new Point(-1, -1), 3]);
