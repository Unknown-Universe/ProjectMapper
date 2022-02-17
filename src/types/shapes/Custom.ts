import { degreesToRadians } from '../../utilities/helpers';
import { Point } from '../point';
import { Shape } from '../shape';

export class Custom extends Shape {
    constructor(verticesReltiveToCenter: Point[], lines: number[], position: Point) {
        super();
        this.vertices = verticesReltiveToCenter;
        this.position = position;

        this.sides = this.vertices.map((point, i) => {
            return point.distanceTo(this.vertices[i + 1 < this.vertices.length ? i + 1 : 0]);
        });
    }
    public rotateRadians(radians: number): Shape {
        const vertices = this.vertices.map((point) => {
            const returnVal: Point = point.rotatePoint(radians);
            return returnVal;
        });
        const sides = this.vertices.map((point, i) =>
            point.distanceTo(this.vertices[i + 1 < this.vertices.length ? i + 1 : 0]),
        );

        this.vertices = vertices;
        this.sides = sides;
        return this;
    }

    public rotateDegrees(degrees: number): Shape {
        return this.rotateRadians(degreesToRadians(degrees));
    }
    public move(x: number, y: number): Shape {
        const vertices = this.vertices.map((point) => {
            const returnVal: Point = point.movePoint(new Point(x, y));
            return returnVal;
        });
        const sides = this.vertices.map((point, i) =>
            point.distanceTo(this.vertices[i + 1 < this.vertices.length ? i + 1 : 0]),
        );
        const center = new Point(this.position.x + x, this.position.y + y);

        this.position = center;
        this.sides = sides;
        this.vertices = vertices;
        return this;
    }
}
