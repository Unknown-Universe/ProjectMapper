import { createShape } from "./utilities/helpers";

const positions: [number, number][] = [];

for (let i = 10; i > 0; i--) {
    positions.push([i, i]);
}
const shape = createShape(positions, [0, 0], "mm");

console.log(shape);

console.log(shape.transform(5, 3));
