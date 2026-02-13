export type Point2d = { x: number; y: number };
export function isPoint2d(obj: unknown): obj is Point2d {
  return typeof obj === 'object' && obj !== null && typeof (obj as Point2d).x === 'number' && typeof (obj as Point2d).y === 'number';
}

export function absMaxPoint(points: Point2d[]): { x: number; y: number } {
  let maxX = -Infinity;
  let maxY = -Infinity;
  points.forEach((point) => {
    if (Math.abs(point.x) > maxX) maxX = Math.abs(point.x);
    if (Math.abs(point.y) > maxY) maxY = Math.abs(point.y);
  });
  return { x: maxX, y: maxY };
}