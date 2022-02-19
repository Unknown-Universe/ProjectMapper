import { degreesToRadians, round } from '../../utilities/helpers';
import { Line } from '../line';
import { Point } from '../point';
import { Shape } from '../shape';

export class Rectangle extends Shape {
    constructor(height: number, width: number, position: Point, vertices: Point[]) {
        super();
        this.position = position;
        this.vertices = vertices;

        this.sides = this.vertices.map(
            (point, i) => new Line(point, this.vertices[i + 1 < this.vertices.length ? i + 1 : 0]),
        );
    }

    public rotateRadians(radians: number): Shape {
        const vertices = this.vertices.map((point) => {
            const returnVal: Point = point.rotatePoint(radians);
            return returnVal;
        });
        this.vertices = vertices;

        return this;
    }

    public rotateDegrees(degrees: number): Shape {
        return this.rotateRadians(degreesToRadians(degrees));
    }

    public move(x: number, y: number): Shape {
        const position = this.position;

        const vertices = this.vertices.map((point) => {
            const returnVal: Point = point.movePoint(new Point(x, y));
            return returnVal;
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

    public containsShape(a: Shape): boolean {
        let overlap = true;
        a.vertices.map((v) => {
            if (!this.containsPoint(v)) overlap = false;
        });
        return overlap;
    }

    public static createFromSides(height: number, width: number, position: Point): Rectangle {
        const xOffset = round(width / 2 + position.x, 2);
        const yOffset = round(height / 2 + position.y, 2);
        const pointOne = new Point(xOffset, yOffset);
        const pointTwo = new Point(pointOne.x - width, pointOne.y);
        const pointThree = new Point(pointTwo.x, pointTwo.y - height);
        const pointFour = new Point(pointOne.x - height, pointTwo.y);
        const vertices: Point[] = [pointOne, pointTwo, pointThree, pointFour];
        return new Rectangle(height, width, position, vertices);
    }

    public static createFromCorners(pointOne: Point, pointTwo: Point): Rectangle {
        const xOffset = round(pointOne.x - pointTwo.x, 2);
        const yOffset = round(pointOne.y - pointTwo.y, 2);

        const position = new Point(xOffset / 2, yOffset / 2);

        return this.createFromSides(xOffset, yOffset, position);
    }

    public static createSquare(size: number, position: Point): Rectangle {
        return this.createFromSides(size, size, position);
    }

    public containsPoint(a: Point): boolean {
        if (
            a.x > this.vertices[2].x &&
            a.x < this.vertices[0].x &&
            a.y > this.vertices[2].y &&
            a.y < this.vertices[0].y
        )
            return true;
        return false;
    }
}
