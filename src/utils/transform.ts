export type Point2d = { x: number; y: number };
export function isPoint2d(obj: unknown): obj is Point2d {
  return typeof obj === 'object' && obj !== null && typeof (obj as Point2d).x === 'number' && typeof (obj as Point2d).y === 'number';
}

export function ArchimedeanSpiral(a: number, b: number, theta: number, thetaStep: number, n: number): Point2d[] {
  const points: Point2d[] = [];
  for (let i = 0; i < n; i++) {
    const angle = theta + i * thetaStep;
    const r = a + b * angle;
    const x = r * Math.cos(angle);
    const y = r * Math.sin(angle);
    points.push({ x, y });
  }
  return points;
}

export function LogSpiral(a: number, b: number, theta: number, thetaStep: number, n: number): Point2d[] {
  const points: Point2d[] = [];
  for (let i = 0; i < n; i++) {
    const angle = theta + i * thetaStep;
    const r = a * Math.exp(b * angle);
    const x = r * Math.cos(angle);
    const y = r * Math.sin(angle);
    points.push({ x, y });
  }
  return points;
}

export function FermatSpiral(a: number, theta: number, thetaStep: number, n: number): Point2d[] {
  const points: Point2d[] = [];
  for (let i = 0; i < n; i++) {
    const angle = theta + i * thetaStep;
    const r = a * Math.sqrt(angle);
    const x = r * Math.cos(angle);
    const y = r * Math.sin(angle);
    points.push({ x, y });
  }
  return points;
}

export function HyperbolicSpiral(a: number, theta: number, thetaStep: number, n: number): Point2d[] {
  const points: Point2d[] = [];
  for (let i = 0; i < n; i++) {
    const angle = theta + i * thetaStep;
    const r = a / angle;
    const x = r * Math.cos(angle);
    const y = r * Math.sin(angle);
    points.push({ x, y });
  }
  return points;
}

export function LituusSpiral(a: number, theta: number, thetaStep: number, n: number): Point2d[] {
  const points: Point2d[] = [];
  for (let i = 0; i < n; i++) {
    const angle = theta + i * thetaStep;
    const r = a / Math.sqrt(angle);
    const x = r * Math.cos(angle);
    const y = r * Math.sin(angle);
    points.push({ x, y });
  }
  return points;
}

export function SpiralOfTheodorus(n: number): Point2d[] {
  const points: Point2d[] = [];
  let x = 0;
  let y = 0;
  let angle = 0;
  for (let i = 1; i <= n; i++) {
    angle += Math.atan(1 / Math.sqrt(i));
    x += Math.cos(angle) * Math.sqrt(i);
    y += Math.sin(angle) * Math.sqrt(i);
    points.push({ x, y });
  }
  return points;
}

export function FibonacciSpiral(n: number): Point2d[] {
  const points: Point2d[] = [];
  let a = 0;
  let b = 1;
  let angle = 0;
  let x = 0;
  let y = 0;
  for (let i = 0; i < n; i++) {
    const temp = a;
    a = b;
    b = temp + b;
    angle += Math.PI / 2;
    x += b * Math.cos(angle);
    y += b * Math.sin(angle);
    points.push({ x, y });
  }
  return points;
}

export const SPIRAL_TYPES = ['archimedean', 'logarithmic', 'fermat', 'hyperbolic', 'lituus', 'theodorus', 'fibonacci'] as const;
export type SpiralType = (typeof SPIRAL_TYPES)[number];

export function spiralFunction(spiralType: SpiralType, options: { a?: number; b?: number; theta?: number; thetaStep?: number; n?: number } = {}) {
  {
    switch (spiralType) {
      case 'archimedean':
        return ArchimedeanSpiral(options.a ?? 1, options.b ?? 0.2, options.theta ?? 0.1, options.thetaStep ?? 0.1, options.n ?? 100);
      case 'logarithmic':
        return LogSpiral(options.a ?? 1, options.b ?? 0.2, options.theta ?? 0.1, options.thetaStep ?? 0.1, options.n ?? 100);
      case 'fermat':
        return FermatSpiral(options.a ?? 1, options.theta ?? 0.1, options.thetaStep ?? 0.1, options.n ?? 100);
      case 'hyperbolic':
        return HyperbolicSpiral(options.a ?? 1, options.theta ?? 0.1, options.thetaStep ?? 0.1, options.n ?? 100);
      case 'lituus':
        return LituusSpiral(options.a ?? 1, options.theta ?? 0.1, options.thetaStep ?? 0.1, options.n ?? 100);
      case 'theodorus':
        return SpiralOfTheodorus(options.n ?? 100);
      case 'fibonacci':
        return FibonacciSpiral(options.n ?? 100);
      default:
        return ArchimedeanSpiral(options.a ?? 1, options.b ?? 0.2, options.theta ?? 0.1, options.thetaStep ?? 0.1, options.n ?? 100);
    }
  }
}

export function transformTextToSpiral(
  text: string,
  spiralType: SpiralType,
  language: string,
  options: { a?: number; b?: number; theta?: number; thetaStep?: number; n?: number } = {},
): string {
  const a = options.a ?? 1;
  const b = options.b ?? 0.2;
  const n = options.n ?? 100;
  const thetaStep = options.thetaStep ?? 0.5;
  const result = '';
  let theta = 0;
  for (let i = 0; i < text.length; i++) {
    let x: number, y: number;
    switch (spiralType) {
      case 'archimedean':
        ArchimedeanSpiral(a, b, theta, thetaStep, n);
        break;
      case 'logarithmic':
        LogSpiral(a, b, theta, thetaStep, n);
        break;
      case 'fermat':
        FermatSpiral(a, theta, thetaStep, n);
        break;
      case 'hyperbolic':
        HyperbolicSpiral(a, theta, thetaStep, n);
        break;
      case 'lituus':
        LituusSpiral(a, theta, thetaStep, n);
        break;
      case 'theodorus': {
        const points = SpiralOfTheodorus(text.length);
        ({ x, y } = points[i]);
        break;
      }
      case 'fibonacci': {
        const fibPoints = FibonacciSpiral(text.length);
        ({ x, y } = fibPoints[i]);
        break;
      }
      default:
        ArchimedeanSpiral(a, b, theta, thetaStep, n);
    }
    // result += `<span style="position: absolute; left: ${x}px; top: ${y}px;">${text[i]}</span>\n`;
    theta += thetaStep;
  }
  return result;
}
