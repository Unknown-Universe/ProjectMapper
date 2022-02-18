import { Point } from '../types/point';
import { Custom } from '../types/shapes/Custom';

export function degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
}

export function round(value: number, precision: number = 0): number {
    const multiplier = Math.pow(10, precision);
    return Math.round(value * multiplier) / multiplier;
}

export function createShape(vertices: [number, number][], position: [number, number]): Custom {
    const points = vertices.map((point) => new Point(point[0], point[1]));
    const pointPosition = new Point(position[0], position[1]);

    const sides = points.map((point, i) => point.distanceTo(points[i + 1 < points.length ? i + 1 : 0]));

    return new Custom(points, sides, pointPosition);
}

export function add(a: Point, b: Point): Point {
    return new Point(a.x + b.x, a.y + b.y);
}
export function subtract(a: Point, b: Point): Point {
    return new Point(a.x - b.x, a.y - b.y);
}
