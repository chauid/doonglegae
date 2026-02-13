import { absMaxPoint, type Point2d } from './points';

export const SPIRAL_TYPES = ['archimedean', 'logarithmic', 'fermat', 'hyperbolic', 'lituus', 'theodorus', 'fibonacci'] as const;
export type SpiralType = (typeof SPIRAL_TYPES)[number];

export type SpiralParams = {
  mode: 'text' | 'point';
  a?: number;
  b?: number;
  theta?: number;
  thetaStep?: number;
  n?: number;
};

export type InputOptions = {
  a: number;
  aStep: number;
  maxA: number;
  minA: number;
  b: number;
  bStep: number;
  maxB: number;
  minB: number;
  initTheta: number;
  initThetaStep: number;
  maxInitTheta: number;
  minInitTheta: number;
  thetaStep: number;
  thetaStepStep: number;
  maxThetaStep: number;
  minThetaStep: number;
  n: number;
};

export function ArchimedeanSpiral(params: SpiralParams): Point2d[] {
  const points: Point2d[] = [];
  if (
    params.a === null ||
    params.a === undefined ||
    params.b === null ||
    params.b === undefined ||
    params.theta === null ||
    params.theta === undefined ||
    params.thetaStep === null ||
    params.thetaStep === undefined ||
    params.n === null ||
    params.n === undefined
  ) {
    return points;
  }

  let x = 0;
  let y = 0;
  let r = 0;
  let angle = 0;
  if (params.mode === 'point') {
    for (let i = 0; i < params.n; i++) {
      angle = params.theta + i * params.thetaStep;
      r = params.a + params.b * angle;
      x = r * Math.cos(angle);
      y = r * Math.sin(angle);
      points.push({ x, y });
    }
  }
  if (params.mode === 'text') {
    let moddedN = params.n;
    let moddedCounter = 0;
    let prevX = 0;
    let prevY = 0;
    for (let i = 0; i < moddedN; i++) {
      if (moddedCounter > 1000) break;
      angle = params.theta + i * params.thetaStep;
      r = params.a + params.b * angle;
      x = r * Math.cos(angle);
      y = r * Math.sin(angle);
      if (Math.round(x) === Math.round(prevX) && Math.round(y / 4) === Math.round(prevY / 4)) {
        moddedN++;
        moddedCounter++;
        continue;
      }
      prevX = x;
      prevY = y;
      points.push({ x: Math.round(x), y: Math.round(y / 4) });
    }
  }
  return points;
}

export function LogSpiral(params: SpiralParams): Point2d[] {
  const points: Point2d[] = [];
  if (
    params.a === null ||
    params.a === undefined ||
    params.b === null ||
    params.b === undefined ||
    params.theta === null ||
    params.theta === undefined ||
    params.thetaStep === null ||
    params.thetaStep === undefined ||
    params.n === null ||
    params.n === undefined
  ) {
    return points;
  }

  let x = 0;
  let y = 0;
  let r = 0;
  let angle = 0;
  if (params.mode === 'point') {
    for (let i = 0; i < params.n; i++) {
      angle = params.theta + i * params.thetaStep;
      r = params.a * Math.exp(params.b * angle);
      x = r * Math.cos(angle);
      y = r * Math.sin(angle);
      points.push({ x, y });
    }
  }
  if (params.mode === 'text') {
    let moddedN = params.n;
    let moddedCounter = 0;
    let prevX = 0;
    let prevY = 0;
    for (let i = 0; i < moddedN; i++) {
      if (moddedCounter > 1000) break;
      angle = params.theta + i * params.thetaStep;
      r = params.a * Math.exp(params.b * angle);
      x = r * Math.cos(angle);
      y = r * Math.sin(angle);
      if (Math.round(x) === Math.round(prevX) && Math.round(y / 4) === Math.round(prevY / 4)) {
        moddedN++;
        moddedCounter++;
        continue;
      }
      prevX = x;
      prevY = y;
      points.push({ x: Math.round(x), y: Math.round(y / 4) });
    }
  }
  return points;
}

export function FermatSpiral(params: SpiralParams): Point2d[] {
  const points: Point2d[] = [];
  if (!params.a || !params.theta || !params.thetaStep || !params.n) {
    return points;
  }

  let x = 0;
  let y = 0;
  let r = 0;
  let angle = 0;
  if (params.mode === 'point') {
    for (let i = 0; i < params.n; i++) {
      angle = params.theta + i * params.thetaStep;
      r = params.a * Math.sqrt(angle);
      x = r * Math.cos(angle);
      y = r * Math.sin(angle);
      points.push({ x, y });
    }
  }
  if (params.mode === 'text') {
    let moddedN = params.n;
    let moddedCounter = 0;
    let prevX = 0;
    let prevY = 0;
    for (let i = 0; i < moddedN; i++) {
      if (moddedCounter > 1000) break;
      angle = params.theta + i * params.thetaStep;
      r = params.a * Math.sqrt(angle);
      x = r * Math.cos(angle);
      y = r * Math.sin(angle);
      if (Math.round(x) === Math.round(prevX) && Math.round(y / 4) === Math.round(prevY / 4)) {
        moddedN++;
        moddedCounter++;
        continue;
      }
      prevX = x;
      prevY = y;
      points.push({ x: Math.round(x), y: Math.round(y / 4) });
    }
  }
  return points;
}

export function HyperbolicSpiral(params: SpiralParams): Point2d[] {
  const points: Point2d[] = [];
  if (!params.a || !params.theta || !params.thetaStep || !params.n) {
    return points;
  }

  let x = 0;
  let y = 0;
  let r = 0;
  let angle = 0;
  if (params.mode === 'point') {
    for (let i = 0; i < params.n; i++) {
      angle = params.theta + i * params.thetaStep;
      r = params.a / angle;
      x = r * Math.cos(angle);
      y = r * Math.sin(angle);
      points.push({ x, y });
    }
  }
  if (params.mode === 'text') {
    let moddedN = params.n;
    let moddedCounter = 0;
    let prevX = 0;
    let prevY = 0;
    for (let i = 0; i < moddedN; i++) {
      if (moddedCounter > 1000) break;
      angle = params.theta + i * params.thetaStep;
      r = params.a / angle;
      x = r * Math.cos(angle);
      y = r * Math.sin(angle);
      if (Math.round(x) === Math.round(prevX) && Math.round(y / 4) === Math.round(prevY / 4)) {
        moddedN++;
        moddedCounter++;
        continue;
      }
      prevX = x;
      prevY = y;
      points.push({ x: Math.round(x), y: Math.round(y / 4) });
    }
  }
  return points;
}

export function LituusSpiral(params: SpiralParams): Point2d[] {
  const points: Point2d[] = [];
  if (!params.a || !params.theta || !params.thetaStep || !params.n) {
    return points;
  }

  let x = 0;
  let y = 0;
  let r = 0;
  let angle = 0;
  if (params.mode === 'point') {
    for (let i = 0; i < params.n; i++) {
      angle = params.theta + i * params.thetaStep;
      r = params.a / Math.sqrt(angle);
      x = r * Math.cos(angle);
      y = r * Math.sin(angle);
      points.push({ x, y });
    }
  }
  if (params.mode === 'text') {
    let moddedN = params.n;
    let moddedCounter = 0;
    let prevX = 0;
    let prevY = 0;
    for (let i = 0; i < moddedN; i++) {
      if (moddedCounter > 1000) break;
      angle = params.theta + i * params.thetaStep;
      r = params.a / Math.sqrt(angle);
      x = r * Math.cos(angle);
      y = r * Math.sin(angle);
      if (Math.round(x) === Math.round(prevX) && Math.round(y / 4) === Math.round(prevY / 4)) {
        moddedN++;
        moddedCounter++;
        continue;
      }
      prevX = x;
      prevY = y;
      points.push({ x: Math.round(x), y: Math.round(y / 4) });
    }
  }
  return points;
}

export function SpiralOfTheodorus(params: SpiralParams): Point2d[] {
  const points: Point2d[] = [];
  if (!params.n) {
    return points;
  }

  let x = 0;
  let y = 0;
  let angle = 0;
  if (params.mode === 'point') {
    for (let i = 1; i <= params.n; i++) {
      angle += Math.atan(1 / Math.sqrt(i));
      x += Math.cos(angle) * Math.sqrt(i);
      y += Math.sin(angle) * Math.sqrt(i);
      points.push({ x, y });
    }
  }
  if (params.mode === 'text') {
    let moddedN = params.n;
    let moddedCounter = 0;
    let prevX = 0;
    let prevY = 0;
    for (let i = 1; i <= moddedN; i++) {
      if (moddedCounter > 1000) break;
      angle += Math.atan(1 / Math.sqrt(i));
      x += Math.cos(angle) * Math.sqrt(i);
      y += Math.sin(angle) * Math.sqrt(i);
      if (Math.round(x) === Math.round(prevX) && Math.round(y / 4) === Math.round(prevY / 4)) {
        moddedN++;
        moddedCounter++;
        continue;
      }
      prevX = x;
      prevY = y;
      points.push({ x: Math.round(x), y: Math.round(y / 4) });
    }
  }
  return points;
}

export function FibonacciSpiral(params: SpiralParams): Point2d[] {
  const points: Point2d[] = [];
  if (!params.n) {
    return points;
  }

  let a = 0;
  let b = 1;
  let x = 0;
  let y = 0;
  let angle = 0;
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

  points = points.map((point) => {
    return { x: point.x + centerPoint.x, y: point.y + centerPoint.y };
  });

  for (let i = 0; i < maxHeight; i++) {
    const row = new Array(maxWidth).fill(' ');
    processingText.push(row);
  }

  points.forEach((point, index) => {
    processingText[point.y][point.x] = text.charAt(index);
  });

  result = processingText.map((row) => row.join('')).join('\n');

  return result;
}

export function getPresetOptions(spiralType: SpiralType, mode: 'point' | 'text'): InputOptions {
  switch (spiralType) {
    case 'archimedean':
      return {
        a: 5,
        aStep: 0.1,
        maxA: 100,
        minA: -100,
        b: 2,
        bStep: 0.1,
        maxB: 100,
        minB: -100,
        initTheta: 0,
        initThetaStep: 0.1,
        minInitTheta: -100,
        maxInitTheta: 100,
        thetaStep: 0.15,
        thetaStepStep: 0.01,
        maxThetaStep: 50,
        minThetaStep: -50,
        n: 100,
      };
    case 'logarithmic':
      return {
        a: 1,
        aStep: 0.1,
        maxA: 10,
        minA: -10,
        b: 0.2,
        bStep: 0.1,
        maxB: 5,
        minB: -5,
        initTheta: 0.1,
        initThetaStep: 0.1,
        maxInitTheta: 10,
        minInitTheta: -10,
        thetaStep: 0.5,
        thetaStepStep: 0.1,
        maxThetaStep: 5,
        minThetaStep: -5,
        n: 100,
      };
    case 'fermat':
      return {
        a: 1,
        aStep: 0.1,
        maxA: 10,
        minA: -10,
        b: 0,
        bStep: 0,
        maxB: 0,
        minB: 0,
        initTheta: 0.1,
        initThetaStep: 0.1,
        maxInitTheta: 10,
        minInitTheta: -10,
        thetaStep: 0.5,
        thetaStepStep: 0.1,
        maxThetaStep: 5,
        minThetaStep: -5,
        n: 100,
      };
    case 'hyperbolic':
      return {
        a: 1,
        aStep: 0.1,
        maxA: 10,
        minA: -10,
        b: 0,
        bStep: 0,
        maxB: 0,
        minB: 0,
        initTheta: 0.1,
        initThetaStep: 0.1,
        maxInitTheta: 10,
        minInitTheta: -10,
        thetaStep: 0.5,
        thetaStepStep: 0.1,
        maxThetaStep: 5,
        minThetaStep: -5,
        n: 100,
      };
    case 'lituus':
      return {
        a: 1,
        aStep: 0.1,
        maxA: 10,
        minA: -10,
        b: 0,
        bStep: 0,
        maxB: 0,
        minB: 0,
        initTheta: 0.1,
        initThetaStep: 0.1,
        maxInitTheta: 10,
        minInitTheta: -10,
        thetaStep: 0.5,
        thetaStepStep: 0.1,
        maxThetaStep: 5,
        minThetaStep: -5,
        n: 100,
      };
    case 'theodorus':
      return {
        a: 0,
        aStep: 0,
        maxA: 0,
        minA: 0,
        b: 0,
        bStep: 0,
        maxB: 0,
        minB: 0,
        initTheta: 0,
        initThetaStep: 0,
        maxInitTheta: 0,
        minInitTheta: 0,
        thetaStep: 0,
        thetaStepStep: 0,
        maxThetaStep: 0,
        minThetaStep: 0,
        n: 100,
      };
    case 'fibonacci':
      return {
        a: 0,
        aStep: 0,
        maxA: 0,
        minA: 0,
        b: 0,
        bStep: 0,
        maxB: 0,
        minB: 0,
        initTheta: 0,
        initThetaStep: 0,
        maxInitTheta: 0,
        minInitTheta: 0,
        thetaStep: 0,
        thetaStepStep: 0,
        maxThetaStep: 0,
        minThetaStep: 0,
        n: 100,
      };
    default:
      return {
        a: 1,
        aStep: 0.1,
        maxA: 10,
        minA: -10,
        b: 0.2,
        bStep: 0.1,
        maxB: 5,
        minB: -5,
        initTheta: 0.1,
        initThetaStep: 0.1,
        maxInitTheta: 10,
        minInitTheta: -10,
        thetaStep: 0.5,
        thetaStepStep: 0.1,
        maxThetaStep: 5,
        minThetaStep: -5,
        n: 100,
      };
  }
}
