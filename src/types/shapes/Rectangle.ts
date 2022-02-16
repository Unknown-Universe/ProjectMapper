import {
    alignUnits,
    degreesToRadians,
    round,
    unitOf,
    valueOf,
} from "../../utilities/helpers";
import { Mesurement, Point } from "../mesurements";
import { Shape } from "../shape";

export class Rectangle extends Shape {
    constructor(
        height: Mesurement,
        width: Mesurement,
        position: Point,
        vertices: Point[]
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
            const returnVal: Point = point.rotatePoint(radians);
            return returnVal;
        });

        return new Rectangle(width, height, position, vertices);
    }

    public rotateDegrees(degrees: number): Shape {
        return this.rotateRadians(degreesToRadians(degrees));
    }

    public transform(x: number, y: number): Shape {
        const position = this.position;
        const width = this.sides[0];
        const height = this.sides[1];

        const vertices = this.vertices.map((point) => {
            const returnVal: Point = point.movePoint(new Point(x, y));
            return returnVal;
        });
        return new Rectangle(width, height, position, vertices);
    }

    public static createFromSides(
        unitHeight: Mesurement,
        unitWidth: Mesurement,
        position: Point
    ): Rectangle {
        if (unitOf(unitHeight) !== unitOf(unitHeight)) {
            unitHeight = alignUnits(unitHeight, unitWidth);
        }
        const width = valueOf(unitWidth);
        const height = valueOf(unitHeight);

        const xOffset = round(width / 2 + position.x, 2);
        const yOffset = round(height / 2 + position.y, 2);

        const pointOne = new Point(xOffset, yOffset);
        const pointTwo = new Point(pointOne.x + width, pointOne.y);
        const pointThree = new Point(pointTwo.x, pointTwo.y + height);
        const pointFour = new Point(pointOne.x + height, pointTwo.y);
        const vertices: Point[] = [pointOne, pointTwo, pointThree, pointFour];
        return new Rectangle(unitHeight, unitWidth, position, vertices);
    }

    public static createFromCorners(
        pointOne: Point,
        pointTwo: Point,
        mesurement: "cm" | "mm" | "m" | "in" | "ft" | "yd"
    ): Rectangle {
        const xOffset = round(pointOne.x - pointTwo.x, 2);
        const yOffset = round(pointOne.y - pointTwo.y, 2);

        const position = new Point(xOffset / 2, yOffset / 2);

        return this.createFromSides(
            `${xOffset}${mesurement}`,
            `${yOffset}${mesurement}`,
            position
        );
    }

    public static createSquare(size: Mesurement, position: Point): Rectangle {
        return this.createFromSides(size, size, position);
    }
}
