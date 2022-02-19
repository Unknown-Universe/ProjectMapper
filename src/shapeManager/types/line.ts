import { Point } from './point';

export class Line {
    public startPoint: Point;
    public endPoint: Point;
    public distance: number;

    constructor(startPoint: Point, endPoint: Point) {
        this.startPoint = startPoint;
        this.endPoint = endPoint;
        this.distance = startPoint.distanceTo(endPoint);
    }

    public overlaps(line: Line): boolean {
        const a = this.startPoint.x;
        const b = this.startPoint.y;
        const c = this.endPoint.x;
        const d = this.endPoint.y;
        const p = line.startPoint.x;
        const q = line.startPoint.y;
        const r = line.endPoint.x;
        const s = line.endPoint.y;

        var det, gamma, lambda;
        det = (c - a) * (s - q) - (r - p) * (d - b);
        if (det === 0) {
            return false;
        } else {
            lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
            gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
            return 0 < lambda && lambda < 1 && 0 < gamma && gamma < 1;
        }
    }
}
