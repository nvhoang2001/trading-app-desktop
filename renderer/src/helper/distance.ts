import { Point } from '@/@types/particles';

export default function distance(a: Point, b: Point) {
    const xDist = a.x - b.x;
    const yDist = a.y - b.y;

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}
