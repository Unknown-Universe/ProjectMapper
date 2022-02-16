import { degreesToRadians } from "../../utilities/helpers";
import { Mesurement, Point, Unit } from "../mesurements";
import { Shape } from "../shape";

export class Custom extends Shape {
    unit: Unit;
    constructor(
        verticesReltiveToCenter: Point[],
        lines: Mesurement[],
        position: Point,
        unit: Unit
    ) {
        super();
        this.vertices = verticesReltiveToCenter;
        this.position = position;
        this.unit = unit;

        this.sides = this.vertices.map(
            (point, i) =>
                `${point.distanceTo(
                    this.vertices[i + 1 < this.vertices.length ? i + 1 : 0]
                )}${unit}` as Mesurement
        );
    }
    public rotateRadians(radians: number): Shape {
        const vertices = this.vertices.map((point) => {
            const returnVal: Point = point.rotatePoint(radians);
            return returnVal;
        });
        const sides = this.vertices.map(
            (point, i) =>
                `${point.distanceTo(
                    this.vertices[i + 1 < this.vertices.length ? i + 1 : 0]
                )}${this.unit}` as Mesurement
        );

        return new Custom(vertices, sides, this.position, this.unit);
    }

    public rotateDegrees(degrees: number): Shape {
        return this.rotateRadians(degreesToRadians(degrees));
    }
    public transform(x: number, y: number): Shape {
        const vertices = this.vertices.map((point) => {
            const returnVal: Point = point.movePoint(new Point(x, y));
            return returnVal;
        });
        const sides = this.vertices.map(
            (point, i) =>
                `${point.distanceTo(
                    this.vertices[i + 1 < this.vertices.length ? i + 1 : 0]
                )}${this.unit}` as Mesurement
        );
        const center = new Point(this.position.x + x, this.position.y + y);
        return new Custom(vertices, sides, center, this.unit);
    }
}
