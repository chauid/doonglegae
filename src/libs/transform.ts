import { absMaxPoint, type Point2d } from './points';

export const SPIRAL_TYPES = ['archimedean', 'logarithmic', 'fermat', 'hyperbolic', 'lituus', 'theodorus', 'fibonacci'] as const;
export type SpiralType = (typeof SPIRAL_TYPES)[number];

export type SpiralParams = {
  mode: 'text' | 'point';
  a?: number;
  b?: number;
  theta?: number;
  thetaStep?: number;
  n: number;
};

export type InputOptions = {
  a: number;
  aStep: number;
  maxA: number;
  b: number;
  bStep: number;
  maxB: number;
  initTheta: number;
  initThetaStep: number;
  maxInitTheta: number;
  thetaStep: number;
  thetaStepStep: number;
  maxThetaStep: number;
  n: number;
};

export function ArchimedeanSpiral(params: SpiralParams): Point2d[] {
  const points: Point2d[] = [];
  if (!params.a || !params.b || !params.theta || !params.thetaStep) return points;

  if (params.mode === 'point') {
    for (let i = 0; i < params.n; i++) {
      const angle = params.theta + i * params.thetaStep;
      const r = params.a + params.b * angle;
      const x = r * Math.cos(angle);
      const y = r * Math.sin(angle);
      points.push({ x, y });
    }
  }
  if (params.mode === 'text') {
    for (let i = 0; i < params.n; i++) {
      const angle = params.theta + i * params.thetaStep;
      const r = params.a + params.b * angle;
      const x = r * Math.cos(angle);
      const y = r * Math.sin(angle);
      points.push({ x, y });
    }
  }
  return points;
}

export function LogSpiral(params: SpiralParams): Point2d[] {
  const points: Point2d[] = [];
  if (!params.a || !params.b || !params.theta || !params.thetaStep) return points;
  for (let i = 0; i < params.n; i++) {
    const angle = params.theta + i * params.thetaStep;
    const r = params.a * Math.exp(params.b * angle);
    const x = r * Math.cos(angle);
    const y = r * Math.sin(angle);
    points.push({ x, y });
  }
  return points;
}

export function FermatSpiral(params: SpiralParams): Point2d[] {
  const points: Point2d[] = [];
  if (!params.a || !params.theta || !params.thetaStep) return points;
  for (let i = 0; i < params.n; i++) {
    const angle = params.theta + i * params.thetaStep;
    const r = params.a * Math.sqrt(angle);
    const x = r * Math.cos(angle);
    const y = r * Math.sin(angle);
    points.push({ x, y });
  }
  return points;
}

export function HyperbolicSpiral(params: SpiralParams): Point2d[] {
  const points: Point2d[] = [];
  if (!params.a || !params.theta || !params.thetaStep) return points;
  for (let i = 0; i < params.n; i++) {
    const angle = params.theta + i * params.thetaStep;
    const r = params.a / angle;
    const x = r * Math.cos(angle);
    const y = r * Math.sin(angle);
    points.push({ x, y });
  }
  return points;
}

export function LituusSpiral(params: SpiralParams): Point2d[] {
  const points: Point2d[] = [];
  if (!params.a || !params.theta || !params.thetaStep) return points;
  for (let i = 0; i < params.n; i++) {
    const angle = params.theta + i * params.thetaStep;
    const r = params.a / Math.sqrt(angle);
    const x = r * Math.cos(angle);
    const y = r * Math.sin(angle);
    points.push({ x, y });
  }
  return points;
}

export function SpiralOfTheodorus(params: SpiralParams): Point2d[] {
  const points: Point2d[] = [];
  let x = 0;
  let y = 0;
  let angle = 0;
  for (let i = 1; i <= params.n; i++) {
    angle += Math.atan(1 / Math.sqrt(i));
    x += Math.cos(angle) * Math.sqrt(i);
    y += Math.sin(angle) * Math.sqrt(i);
    points.push({ x, y });
  }
  return points;
}

export function FibonacciSpiral(params: SpiralParams): Point2d[] {
  const points: Point2d[] = [];
  let a = 0;
  let b = 1;
  let angle = 0;
  let x = 0;
  let y = 0;
  for (let i = 0; i < params.n; i++) {
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

export function getRequiredOpions(spiralType: SpiralType): string[] {
  switch (spiralType) {
    case 'archimedean':
    case 'logarithmic':
      return ['a', 'b', 'theta', 'thetaStep', 'n'];
    case 'fermat':
    case 'hyperbolic':
    case 'lituus':
      return ['a', 'theta', 'thetaStep', 'n'];
    case 'theodorus':
    case 'fibonacci':
      return ['n'];
    default:
      return ['a', 'b', 'theta', 'thetaStep', 'n'];
  }
}

export function getPresetOptions(spiralType: SpiralType): InputOptions {
  switch (spiralType) {
    case 'archimedean':
      return {
        a: 5,
        aStep: 0.1,
        maxA: 100,
        b: 2,
        bStep: 0.1,
        maxB: 100,
        initTheta: 0,
        initThetaStep: 0.1,
        maxInitTheta: 100,
        thetaStep: 0.15,
        thetaStepStep: 0.01,
        maxThetaStep: 50,
        n: 100,
      };
    case 'logarithmic':
      return {
        a: 1,
        aStep: 0.1,
        maxA: 10,
        b: 0.2,
        bStep: 0.1,
        maxB: 5,
        initTheta: 0.1,
        initThetaStep: 0.1,
        maxInitTheta: 10,
        thetaStep: 0.5,
        thetaStepStep: 0.1,
        maxThetaStep: 5,
        n: 100,
      };
    case 'fermat':
      return {
        a: 1,
        aStep: 0.1,
        maxA: 10,
        b: 0,
        bStep: 0,
        maxB: 0,
        initTheta: 0.1,
        initThetaStep: 0.1,
        maxInitTheta: 10,
        thetaStep: 0.5,
        thetaStepStep: 0.1,
        maxThetaStep: 5,
        n: 100,
      };
    case 'hyperbolic':
      return {
        a: 1,
        aStep: 0.1,
        maxA: 10,
        b: 0,
        bStep: 0,
        maxB: 0,
        initTheta: 0.1,
        initThetaStep: 0.1,
        maxInitTheta: 10,
        thetaStep: 0.5,
        thetaStepStep: 0.1,
        maxThetaStep: 5,
        n: 100,
      };
    case 'lituus':
      return {
        a: 1,
        aStep: 0.1,
        maxA: 10,
        b: 0,
        bStep: 0,
        maxB: 0,
        initTheta: 0.1,
        initThetaStep: 0.1,
        maxInitTheta: 10,
        thetaStep: 0.5,
        thetaStepStep: 0.1,
        maxThetaStep: 5,
        n: 100,
      };
    case 'theodorus':
      return {
        a: 0,
        aStep: 0,
        maxA: 0,
        b: 0,
        bStep: 0,
        maxB: 0,
        initTheta: 0,
        initThetaStep: 0,
        maxInitTheta: 0,
        thetaStep: 0,
        thetaStepStep: 0,
        maxThetaStep: 0,
        n: 100,
      };
    case 'fibonacci':
      return {
        a: 0,
        aStep: 0,
        maxA: 0,
        b: 0,
        bStep: 0,
        maxB: 0,
        initTheta: 0,
        initThetaStep: 0,
        maxInitTheta: 0,
        thetaStep: 0,
        thetaStepStep: 0,
        maxThetaStep: 0,
        n: 100,
      };
    default:
      return {
        a: 1,
        aStep: 0.1,
        maxA: 10,
        b: 0.2,
        bStep: 0.1,
        maxB: 5,
        initTheta: 0.1,
        initThetaStep: 0.1,
        maxInitTheta: 10,
        thetaStep: 0.5,
        thetaStepStep: 0.1,
        maxThetaStep: 5,
        n: 100,
      };
  }
}

export function spiralFunction(spiralType: SpiralType, options: SpiralParams) {
  {
    switch (spiralType) {
      case 'archimedean':
        return ArchimedeanSpiral({
          mode: options.mode,
          a: options.a ?? 1,
          b: options.b ?? 0.2,
          theta: options.theta ?? 0.1,
          thetaStep: options.thetaStep ?? 0.1,
          n: options.n ?? 100,
        });
      case 'logarithmic':
        return LogSpiral({
          mode: options.mode,
          a: options.a ?? 1,
          b: options.b ?? 0.2,
          theta: options.theta ?? 0.1,
          thetaStep: options.thetaStep ?? 0.1,
          n: options.n ?? 100,
        });
      case 'fermat':
        return FermatSpiral({
          mode: options.mode,
          a: options.a ?? 1,
          theta: options.theta ?? 0.1,
          thetaStep: options.thetaStep ?? 0.1,
          n: options.n ?? 100,
        });
      case 'hyperbolic':
        return HyperbolicSpiral({
          mode: options.mode,
          a: options.a ?? 1,
          theta: options.theta ?? 0.1,
          thetaStep: options.thetaStep ?? 0.1,
          n: options.n ?? 100,
        });
      case 'lituus':
        return LituusSpiral({
          mode: options.mode,
          a: options.a ?? 1,
          theta: options.theta ?? 0.1,
          thetaStep: options.thetaStep ?? 0.1,
          n: options.n ?? 100,
        });
      case 'theodorus':
        return SpiralOfTheodorus({ mode: options.mode, n: options.n ?? 100 });
      case 'fibonacci':
        return FibonacciSpiral({ mode: options.mode, n: options.n ?? 100 });
      default:
        return ArchimedeanSpiral({
          mode: options.mode,
          a: options.a ?? 1,
          b: options.b ?? 0.2,
          theta: options.theta ?? 0.1,
          thetaStep: options.thetaStep ?? 0.1,
          n: options.n ?? 100,
        });
    }
  }
}

export function transformTextToSpiral(text: string, spiralType: SpiralType, language: string, options: SpiralParams): string {
  const setOptions: SpiralParams = {
    mode: options.mode,
    a: options.a ?? 1,
    b: options.b ?? 0.2,
    theta: options.theta ?? 0.1,
    thetaStep: options.thetaStep ?? 0.5,
    n: text.length,
  };

  let points: Point2d[] = [];
  const prePoint: Point2d = { x: 0, y: 0 };
  const processingText: Array<Array<string>> = [];
  let result = '';
  switch (spiralType) {
    case 'archimedean':
      points = ArchimedeanSpiral(setOptions);
      break;
    case 'logarithmic':
      points = LogSpiral(setOptions);
      break;
    case 'fermat':
      points = FermatSpiral(setOptions);
      break;
    case 'hyperbolic':
      points = HyperbolicSpiral(setOptions);
      break;
    case 'lituus':
      points = LituusSpiral(setOptions);
      break;
    case 'theodorus':
      points = SpiralOfTheodorus(setOptions);
      break;
    case 'fibonacci':
      points = FibonacciSpiral(setOptions);
      break;
    default:
      points = ArchimedeanSpiral(setOptions);
  }

  const maxPoint = absMaxPoint(points);
  const maxWidth = Math.round(maxPoint.x) * 2 + 1;
  const maxHeight = Math.round(maxPoint.y) * 2 + 1;
  const centerPoint = { x: Math.round(maxPoint.x), y: Math.round(maxPoint.y) };
  // console.log(maxPoint, maxWidth, maxHeight, centerPoint);

  points = points.map((point) => {
    return { x: point.x + centerPoint.x, y: point.y + centerPoint.y };
  });

  for (let i = 0; i < maxHeight; i++) {
    const row = new Array(maxWidth).fill(' ');
    processingText.push(row);
  }

  points.forEach((point) => {
    const x = Math.round(point.x);
    const y = Math.round(point.y / 4);
    if (prePoint.x === x && prePoint.y === y) {
      // console.log('duplicate point', point, prePoint);
      return;
    }
    prePoint.x = x;
    prePoint.y = y;
    processingText[y][x] = text.charAt(points.indexOf(point));
  });

  result = processingText.map((row) => row.join('')).join('\n');

  return result;
}
