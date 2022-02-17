import { degreesToRadians, round } from '../../utilities/helpers';
import { Point } from '../point';
import { Shape } from '../shape';

export class Rectangle extends Shape {
    constructor(height: number, width: number, position: Point, vertices: Point[]) {
        super();
        this.sides = [width, height];
        this.position = position;
        this.vertices = vertices;
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
        const width = this.sides[0];
        const height = this.sides[1];

        const vertices = this.vertices.map((point) => {
            const returnVal: Point = point.movePoint(new Point(x, y));
            return returnVal;
        });
        this.vertices = vertices;
        this.position = position;
        return this;
    }

    public static createFromSides(height: number, width: number, position: Point): Rectangle {
        const xOffset = round(width / 2 + position.x, 2);
        const yOffset = round(height / 2 + position.y, 2);

        const pointOne = new Point(xOffset, yOffset);
        const pointTwo = new Point(pointOne.x + width, pointOne.y);
        const pointThree = new Point(pointTwo.x, pointTwo.y + height);
        const pointFour = new Point(pointOne.x + height, pointTwo.y);
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
}
