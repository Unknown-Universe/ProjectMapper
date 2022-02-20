# ShapeManager

> Shape Manager is a simple way to create, move, and manage shapes.

## Easy to use!

Its quite simple to create new shapes:

```ts
const square = Rectangle.createSquare(sideLength: 10, x: 0, y: 0);
square.move(x: 10, x: 10);

console.log(square);
```

This creates a new shape at {0, 0}, moves it 10 units to the right and 10 units up, then prints it to the console as a object.

## Easy to customize!

Its simple to add custom shapes to the manager, its as simple as using the `createShape()` method.

```ts
const points: [number, number][] = [[0, 0], [1, 0], [0, 1]];
const shape = createShape(vertices: points, position: [0, 0]);
```

## Built in shapes!

This manager can easily create a list of commonly used shapes:

-   Square: `Rectangle.createSquare()`
-   Rectangle from oposing corners: `Rectangle.createFromCorners()`
-   Rectangle from the width and height: `Rectangle.createFromSides()`
-   Equallateral Triangle: `Triangle.createEqual()`

## Easy to add new shapes!

If you have a shape that your going to use often, you can quite easily add it to the manager using classes:

```ts
export class YourShape extends Shape {
    public youShapesProporties: type;

    constructer(thingYouNeedToPutIn: type, position: Point, vertices: Point[], sides: number[]) {
        super();
        //these are things that are required for the shape, from here
        this.sides = sides;
        this.vertices = vertices;
        this.position = position;
        // to here. Everything else is uniqe to your shape:
        this.youShapesProporties = thingYouNeedToPutIn;
    }
    //Required functions:
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
    public overlaps(a: Shape): boolean {
        //returns if two shapes sides are overlaping
    }

    public containsPoint(a: Point): boolean {
        //returns true if a point is inside the shape
    }
    public containsShape(a: Shape): boolean {
        //returns true if a shape is completely inside the shape
    }

    //Any other functions you want to add
    public function(thing: type): Shape {
        this.youShapesProporties = thing;
        return this;
    }
}
```

## Easy collision detection!

Its quite simple to check if:

-   Two shapes have a side overlaping: `Shape.overlaps(Shape)`
-   One shape compleatly contains another shape: `Shape.containsShape(Shape)`
-   A point is inside a shape: `Shape.containsPoint(Point)`
