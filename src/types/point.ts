export class Point {
    x: number;
    y: number;

    constructor(constructX: number, constructY: number) {
        this.x = constructX;
        this.y = constructY;
    }

    public rotatePoint(radians: number) {
        const newX = this.x * Math.cos(radians) - this.y * Math.sin(radians);
        const newY = this.x * Math.sin(radians) - this.y * Math.cos(radians);

        return new Point(newX, newY);
    }

    public movePoint(distance: Point) {
        const newX = (this.x += distance.x);
        const newY = (this.y += distance.y);

        return new Point(newX, newY);
    }

    public distanceTo(a: Point): number {
        return Math.sqrt((this.x - a.x) ** 2 + (this.y - a.y) ** 2);
    }
    public distance(a: Point): Point {
        return new Point(Math.sqrt(this.x - a.x) ** 2, Math.sqrt(this.y - a.y) ** 2);
    }
}
