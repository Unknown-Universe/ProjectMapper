import { alignUnits, unitOf } from "../utilities/helpers";

abstract class Shape {
    public sides!: Mesurement[];
    public relitiveTo!: [Point, number];
    public vertices!: [Point, number][];
    public position!: Point;

    public abstract rotate(radians: number): Shape;
    public abstract transform(x: number, y: number): Shape;
}

class Rect extends Shape {
    constructor(
        height: Mesurement,
        width: Mesurement,
        position: Point,
        pivot: number,
        vertices: [Point, number][]
    ) {
        super();
        if (unitOf(height) !== unitOf(width)) {
            height = alignUnits(height, width);
        }
        this.sides = [width, height];
        this.position = position;
        this.vertices = vertices;
        this.relitiveTo = this.vertices[pivot];
    }

    public rotate(radians: number): Shape {
        const position = this.position;
        const width = this.sides[0];
        const height = this.sides[1];
        const relitiveTo = this.relitiveTo[1];

        const vertices = this.vertices.map((point) => {
            const returnVal: [Point, number] = [
                point[0].rotatePoint(radians),
                point[1],
            ];
            return returnVal;
        });

        return new Rect(width, height, position, relitiveTo, vertices);
    }
    public transform(x: number, y: number): Shape {
        const position = this.position;
        const width = this.sides[0];
        const height = this.sides[1];
        const relitiveTo = this.relitiveTo[1];

        const vertices = this.vertices.map((point) => {
            const returnVal: [Point, number] = [
                point[0].movePoint(new Point(x, y)),
                point[1],
            ];
            return returnVal;
        });
        return new Rect(width, height, position, relitiveTo, vertices);
    }
}
//[new Point(1, -1), 1],
// [new Point(-1, 1), 2],
// [new Point(-1, -1), 3]);
