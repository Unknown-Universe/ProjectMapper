// Imperial
type In = `${number}in`;
type Ft = `${number}ft`;
type Yd = `${number}yd`;

// Metric
type Mm = `${number}mm`;
type Cm = `${number}cm`;
type M = `${number}m`;

type Mesurement = In | Ft | Yd | Mm | Cm | M;

class Point {
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
}
