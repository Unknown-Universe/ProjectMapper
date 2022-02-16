import { Mesurement, Point } from "../types/mesurements";
import { Rect } from "../types/shapes";
import { alignUnits, unitOf, valueOf } from "./helpers";

export function createRectangleFromSides(
    unitHeight: Mesurement,
    unitWidth: Mesurement,
    position: Point
): Rect {
    if (unitOf(unitHeight) !== unitOf(unitHeight)) {
        unitHeight = alignUnits(unitHeight, unitWidth);
    }
    const width = valueOf(unitWidth);
    const height = valueOf(unitHeight);

    const xOffset = width / 2 + position.x;
    const yOffset = height / 2 + position.y;

    const pointOne = new Point(xOffset, yOffset);
    const pointTwo = new Point(pointOne.x + width, pointOne.y);
    const pointThree = new Point(pointTwo.x, pointTwo.y + height);
    const pointFour = new Point(pointOne.x + height, pointTwo.y);
    const vertices: [Point, number][] = [
        [pointOne, 0],
        [pointTwo, 1],
        [pointThree, 2],
        [pointFour, 3],
    ];
    return new Rect(unitHeight, unitWidth, position, vertices);
}

export function createRectangleFromCorners(
    pointOne: Point,
    pointTwo: Point,
    mesurement: "cm" | "mm" | "m" | "in" | "ft" | "yd"
): Rect {
    const xOffset = pointOne.x - pointTwo.x;
    const yOffset = pointOne.y - pointTwo.y;

    const position = new Point(xOffset / 2, yOffset / 2);

    return createRectangleFromSides(
        `${xOffset}${mesurement}`,
        `${yOffset}${mesurement}`,
        position
    );
}
