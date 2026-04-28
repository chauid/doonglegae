import { absMaxPoint, type Point2d } from './points';

export const SPIRAL_TYPES = ['archimedean', 'logarithmic', 'fermat', 'hyperbolic', 'lituus', 'theodorus', 'fibonacci'] as const;
export type SpiralType = (typeof SPIRAL_TYPES)[number];

type SpiralParams = {
  mode: 'text' | 'point';
  a?: number;
  b?: number;
  theta?: number;
  thetaStep?: number;
  n?: number;
  textYWidth?: number;
  inversed?: boolean;
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
  textYWidth: number;
  textYWidthStep: number;
  maxTextYWidth: number;
  minTextYWidth: number;
};

export type OptionDescription = {
  a: string;
  b: string;
  theta: string;
  thetaStep: string;
};

type SampleArchimedeanSpiralParams = {
  mode: 'text' | 'point';
  a: number;
  b: number;
  thetaStep: number;
  n: number;
  textYWidth: number;
};

export function sampleArchimedeanSpiral(params: SampleArchimedeanSpiralParams): Point2d[] {
  const points: Point2d[] = [];
  let x = 0;
  let y = 0;
  let r = 0;
  let targetS = 0;
  let theta = 0;

  if (params.mode === 'point') {
    for (let i = 0; i < params.n; i++) {
      targetS = i * params.thetaStep;
      theta = targetS / Math.sqrt(params.a * params.a + params.b * params.b);

      // Newton iteration
      for (let j = 0; j < 1000; j++) {
        const t = params.a + params.b * theta;
        const sqrt = Math.sqrt(t * t + params.b * params.b);
        const log = Math.log(t + sqrt);
        const f = (t * sqrt + params.b * params.b * log) / (2 * params.b) - targetS;
        const fp = Math.sqrt(t * t + params.b * params.b);
        const next = theta - f / fp;

        if (Math.abs(next - theta) < 1e-6) {
          theta = next;
          break;
        }
        theta = next;
      }

      r = params.a + params.b * theta;
      x = r * Math.cos(theta);
      y = r * Math.sin(theta);
      points.push({ x, y });
    }
  }
  if (params.mode === 'text') {
    const limitN = params.n * 10;
    let moddedN = params.n;
    let moddedCounter = 0;
    let prevX = NaN;
    let prevY = NaN;
    for (let i = 0; i < moddedN; i++) {
      if (i > limitN) {
        for (let j = i; j < moddedN; j++) {
          points.push({ x: Math.round(x), y: Math.round(y / params.textYWidth) });
        }
        break;
      }
      if (moddedCounter > 10) {
        points.push({ x: Math.round(x), y: Math.round(y / params.textYWidth) });
        moddedCounter = 0;
        continue;
      }
      targetS = i * params.thetaStep;
      theta = targetS / Math.sqrt(params.a * params.a + params.b * params.b);
      for (let j = 0; j < 1000; j++) {
        const t = params.a + params.b * theta;
        const sqrt = Math.sqrt(t * t + params.b * params.b);
        const log = Math.log(t + sqrt);
        const f = (t * sqrt + params.b * params.b * log) / (2 * params.b) - targetS;
        const fp = Math.sqrt(t * t + params.b * params.b);
        const next = theta - f / fp;

        if (Math.abs(next - theta) < 1e-6) {
          theta = next;
          break;
        }
        theta = next;
      }

      r = params.a + params.b * theta;
      x = r * Math.cos(theta);
      y = r * Math.sin(theta);

      if (Math.round(x) === Math.round(prevX) && Math.round(y / params.textYWidth) === Math.round(prevY / params.textYWidth)) {
        moddedN++;
        moddedCounter++;
        continue;
      }
      prevX = x;
      prevY = y;
      points.push({ x: Math.round(x), y: Math.round(y / params.textYWidth) });
    }
  }

  return points;
}

type ArchimedeanSpiralParams = {
  mode: 'text' | 'point';
  a: number;
  b: number;
  theta: number;
  thetaStep: number;
  n: number;
  textYWidth: number;
};

export function ArchimedeanSpiral(params: ArchimedeanSpiralParams): Point2d[] {
  const points: Point2d[] = [];
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
    const limitN = params.n * 10;
    let moddedN = params.n;
    let moddedCounter = 0;
    let prevX = NaN;
    let prevY = NaN;
    for (let i = 0; i < moddedN; i++) {
      if (i > limitN) {
        // console.log('중복 한계:' + i);
        for (let j = i; j < moddedN; j++) {
          points.push({ x: Math.round(x), y: Math.round(y / params.textYWidth) }); // 중복 좌표에 대해 원본 문자열 길이의 10배 이상 시점부터는 이전과 동일한 값으로 채움
        }
        break;
      }
      if (moddedCounter > 10) {
        // console.log('중복 10회:' + i);
        points.push({ x: Math.round(x), y: Math.round(y / params.textYWidth) }); // 중복 좌표가 10번 이상 발생 시점부터는 이전과 동일한 값으로 push
        moddedCounter = 0;
        continue;
      }
      angle = params.theta + i * params.thetaStep;
      r = params.a + params.b * angle;
      x = r * Math.cos(angle);
      y = r * Math.sin(angle);
      if (Math.round(x) === Math.round(prevX) && Math.round(y / params.textYWidth) === Math.round(prevY / params.textYWidth)) {
        moddedN++;
        moddedCounter++;
        continue;
      }
      prevX = x;
      prevY = y;
      points.push({ x: Math.round(x), y: Math.round(y / params.textYWidth) });
    }
  }
  return points;
}

type LogarithmicSpiralParams = {
  mode: 'text' | 'point';
  a: number;
  b: number;
  theta: number;
  thetaStep: number;
  n: number;
  textYWidth: number;
};

export function LogarithmicSpiral(params: LogarithmicSpiralParams): Point2d[] {
  const points: Point2d[] = [];
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
    const limitN = params.n * 10;
    let moddedN = params.n;
    let moddedCounter = 0;
    let prevX = NaN;
    let prevY = NaN;
    for (let i = 0; i < moddedN; i++) {
      if (i > limitN) {
        for (let j = i; j < moddedN; j++) {
          points.push({ x: Math.round(x), y: Math.round(y / params.textYWidth) });
        }
        break;
      }
      if (moddedCounter > 10) {
        points.push({ x: Math.round(x), y: Math.round(y / params.textYWidth) });
        moddedCounter = 0;
        continue;
      }
      angle = params.theta + i * params.thetaStep;
      r = params.a * Math.exp(params.b * angle);
      x = r * Math.cos(angle);
      y = r * Math.sin(angle);
      if (Math.round(x) === Math.round(prevX) && Math.round(y / params.textYWidth) === Math.round(prevY / 4)) {
        moddedN++;
        moddedCounter++;
        continue;
      }
      prevX = x;
      prevY = y;
      points.push({ x: Math.round(x), y: Math.round(y / params.textYWidth) });
    }
  }
  return points;
}

type FermatSpiralParams = {
  mode: 'text' | 'point';
  a: number;
  theta: number;
  thetaStep: number;
  n: number;
  textYWidth: number;
};

export function FermatSpiral(params: FermatSpiralParams): Point2d[] {
  const points: Point2d[] = [];
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
    const limitN = params.n * 10;
    let moddedN = params.n;
    let moddedCounter = 0;
    let prevX = NaN;
    let prevY = NaN;
    for (let i = 0; i < moddedN; i++) {
      if (i > limitN) {
        for (let j = i; j < moddedN; j++) {
          points.push({ x: Math.round(x), y: Math.round(y / params.textYWidth) });
        }
        break;
      }
      if (moddedCounter > 10) {
        points.push({ x: Math.round(x), y: Math.round(y / params.textYWidth) });
        moddedCounter = 0;
        continue;
      }
      angle = params.theta + i * params.thetaStep;
      r = params.a * Math.sqrt(angle);
      x = r * Math.cos(angle);
      y = r * Math.sin(angle);
      if (Math.round(x) === Math.round(prevX) && Math.round(y / params.textYWidth) === Math.round(prevY / 4)) {
        moddedN++;
        moddedCounter++;
        continue;
      }
      prevX = x;
      prevY = y;
      points.push({ x: Math.round(x), y: Math.round(y / params.textYWidth) });
    }
  }
  return points;
}

type HyperbolicSpiralParams = {
  mode: 'text' | 'point';
  a: number;
  theta: number;
  thetaStep: number;
  n: number;
  textYWidth: number;
};

export function HyperbolicSpiral(params: HyperbolicSpiralParams): Point2d[] {
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
    const limitN = params.n * 10;
    let moddedN = params.n;
    let moddedCounter = 0;
    let prevX = NaN;
    let prevY = NaN;
    for (let i = 0; i < moddedN; i++) {
      if (i > limitN) {
        for (let j = i; j < moddedN; j++) {
          points.push({ x: Math.round(x), y: Math.round(y / params.textYWidth) });
        }
        break;
      }
      if (moddedCounter > 10) {
        points.push({ x: Math.round(x), y: Math.round(y / params.textYWidth) });
        moddedCounter = 0;
        continue;
      }
      angle = params.theta + i * params.thetaStep;
      r = params.a / angle;
      x = r * Math.cos(angle);
      y = r * Math.sin(angle);
      if (Math.round(x) === Math.round(prevX) && Math.round(y / params.textYWidth) === Math.round(prevY / 4)) {
        moddedN++;
        moddedCounter++;
        continue;
      }
      prevX = x;
      prevY = y;
      points.push({ x: Math.round(x), y: Math.round(y / params.textYWidth) });
    }
  }
  return points;
}

type LituusSpiralParams = {
  mode: 'text' | 'point';
  a: number;
  theta: number;
  thetaStep: number;
  n: number;
  textYWidth: number;
};

export function LituusSpiral(params: LituusSpiralParams): Point2d[] {
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
    const limitN = params.n * 10;
    let moddedN = params.n;
    let moddedCounter = 0;
    let prevX = NaN;
    let prevY = NaN;
    for (let i = 0; i < moddedN; i++) {
      if (i > limitN) {
        for (let j = i; j < moddedN; j++) {
          points.push({ x: Math.round(x), y: Math.round(y / params.textYWidth) });
        }
        break;
      }
      if (moddedCounter > 10) {
        points.push({ x: Math.round(x), y: Math.round(y / params.textYWidth) });
        moddedCounter = 0;
        continue;
      }
      angle = params.theta + i * params.thetaStep;
      r = params.a / Math.sqrt(angle);
      x = r * Math.cos(angle);
      y = r * Math.sin(angle);
      if (Math.round(x) === Math.round(prevX) && Math.round(y / params.textYWidth) === Math.round(prevY / 4)) {
        moddedN++;
        moddedCounter++;
        continue;
      }
      if (Number.isNaN(x) || Number.isNaN(y)) {
        if (Number.isNaN(prevX) || Number.isNaN(prevY)) {
          moddedN++;
          moddedCounter++;
          continue;
        } else {
          points.push({ x: Math.round(prevX), y: Math.round(prevY / 4) });
        }
      } else {
        points.push({ x: Math.round(x), y: Math.round(y / params.textYWidth) });
        prevX = x;
        prevY = y;
      }
    }
  }
  return points;
}

type SpiralOfTheodorusParams = {
  mode: 'text' | 'point';
  n: number;
  textYWidth: number;
};

export function SpiralOfTheodorus(params: SpiralOfTheodorusParams): Point2d[] {
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
    const limitN = params.n * 10;
    let moddedN = params.n;
    let moddedCounter = 0;
    let prevX = NaN;
    let prevY = NaN;
    for (let i = 1; i <= moddedN; i++) {
      if (i > limitN) {
        for (let j = i; j < moddedN; j++) {
          points.push({ x: Math.round(x), y: Math.round(y / params.textYWidth) });
        }
        break;
      }
      if (moddedCounter > 10) {
        points.push({ x: Math.round(x), y: Math.round(y / params.textYWidth) });
        moddedCounter = 0;
        continue;
      }
      angle += Math.atan(1 / Math.sqrt(i));
      x += Math.cos(angle) * Math.sqrt(i);
      y += Math.sin(angle) * Math.sqrt(i);
      if (Math.round(x) === Math.round(prevX) && Math.round(y / params.textYWidth) === Math.round(prevY / 4)) {
        moddedN++;
        moddedCounter++;
        continue;
      }
      prevX = x;
      prevY = y;
      points.push({ x: Math.round(x), y: Math.round(y / params.textYWidth) });
    }
  }
  return points;
}

type FibonacciSpiralParams = {
  mode: 'text' | 'point';
  n: number;
  textYWidth: number;
};

export function FibonacciSpiral(params: FibonacciSpiralParams): Point2d[] {
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
      return ['a', 'b', 'thetaStep', 'n'];
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
  const setOptions = {
    mode: options.mode,
    a: options.a ?? 1,
    b: options.b ?? 0.2,
    theta: options.theta ?? 0.1,
    thetaStep: options.thetaStep ?? 0.5,
    n: options.n ?? 100,
    textYWidth: options.textYWidth ?? 4,
    inversed: options.inversed ?? false,
  };
  switch (spiralType) {
    case 'archimedean':
      return sampleArchimedeanSpiral(setOptions);
    // return ArchimedeanSpiral(setOptions);
    case 'logarithmic':
      return LogarithmicSpiral(setOptions);
    case 'fermat':
      return FermatSpiral(setOptions);
    case 'hyperbolic':
      return HyperbolicSpiral(setOptions);
    case 'lituus':
      return LituusSpiral(setOptions);
    case 'theodorus':
      return SpiralOfTheodorus(setOptions);
    case 'fibonacci':
      return FibonacciSpiral(setOptions);
    default:
      return ArchimedeanSpiral(setOptions);
  }
}

export function transformTextToSpiral(text: string, spiralType: SpiralType, options: SpiralParams): string {
  let textYWidth = options.textYWidth ?? 4;
  if (textYWidth < 1) {
    textYWidth = 1;
  }
  const setOptions = {
    mode: options.mode,
    a: options.a ?? 1,
    b: options.b ?? 0.2,
    theta: options.theta ?? 0.1,
    thetaStep: options.thetaStep ?? 0.5,
    n: text.length,
    textYWidth: textYWidth,
    inversed: options.inversed ?? false,
  };

  let points: Point2d[] = [];
  const processingText: Array<Array<string>> = [];
  let result = '';
  switch (spiralType) {
    case 'archimedean':
      points = sampleArchimedeanSpiral(setOptions);
      break;
    case 'logarithmic':
      points = LogarithmicSpiral(setOptions);
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

  if (setOptions.inversed) {
    points = points.reverse();
  }

  points.forEach((point, index) => {
    if (!Number.isNaN(point.x) && !Number.isNaN(point.y)) {
      processingText[point.y][point.x] = text.charAt(index);
    }
  });

  const processingText2 = processingText.map((row) => row.join('').trimEnd());

  let minX = Infinity;
  for (let i = 0; i < processingText2.length; i++) {
    if (processingText2[i].trim() === '') {
      processingText2.splice(i, 1);
      i--;
    } else {
      for (let j = 0; j < processingText2[i].length; j++) {
        if (processingText2[i].charAt(j) !== ' ') {
          minX = Math.min(minX, j);
        }
      }
    }
  }

  result = processingText2.map((row) => row.substring(minX)).join('\n');

  return result;
}

export function getPresetOptions(spiralType: SpiralType, mode: 'point' | 'text'): InputOptions {
  if (mode === 'point') {
    switch (spiralType) {
      case 'archimedean':
        return {
          a: 0.5,
          aStep: 0.1,
          maxA: 100,
          minA: -100,
          b: 2.5,
          bStep: 0.1,
          maxB: 100,
          minB: -100,
          initTheta: 0,
          initThetaStep: 0,
          minInitTheta: 0,
          maxInitTheta: 0,
          thetaStep: 3,
          thetaStepStep: 0.01,
          maxThetaStep: 50,
          minThetaStep: -50,
          n: 100,
          textYWidth: 4,
          textYWidthStep: 1,
          maxTextYWidth: 8,
          minTextYWidth: 1,
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
          textYWidth: 4,
          textYWidthStep: 1,
          maxTextYWidth: 8,
          minTextYWidth: 1,
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
          textYWidth: 4,
          textYWidthStep: 1,
          maxTextYWidth: 8,
          minTextYWidth: 1,
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
          textYWidth: 4,
          textYWidthStep: 1,
          maxTextYWidth: 8,
          minTextYWidth: 1,
        };
      case 'lituus':
        return {
          a: 1,
          aStep: 0.1,
          maxA: 100,
          minA: -100,
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
          textYWidth: 4,
          textYWidthStep: 1,
          maxTextYWidth: 8,
          minTextYWidth: 1,
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
          textYWidth: 4,
          textYWidthStep: 1,
          maxTextYWidth: 8,
          minTextYWidth: 1,
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
          textYWidth: 4,
          textYWidthStep: 1,
          maxTextYWidth: 8,
          minTextYWidth: 1,
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
          textYWidth: 4,
          textYWidthStep: 1,
          maxTextYWidth: 8,
          minTextYWidth: 1,
        };
    }
    // if (mode === 'text')
  } else {
    switch (spiralType) {
      case 'archimedean':
        return {
          a: 0,
          aStep: 0.05,
          maxA: 20,
          minA: 0,
          b: 1.11,
          bStep: 0.01,
          maxB: 10,
          minB: -10,
          initTheta: 0,
          initThetaStep: 0.1,
          minInitTheta: -100,
          maxInitTheta: 100,
          thetaStep: -4,
          thetaStepStep: 0.01,
          maxThetaStep: 20,
          minThetaStep: -20,
          n: 100,
          textYWidth: 2.5,
          textYWidthStep: 0.1,
          maxTextYWidth: 8,
          minTextYWidth: 0.5,
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
          textYWidth: 4,
          textYWidthStep: 1,
          maxTextYWidth: 8,
          minTextYWidth: 1,
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
          textYWidth: 4,
          textYWidthStep: 1,
          maxTextYWidth: 8,
          minTextYWidth: 1,
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
          textYWidth: 4,
          textYWidthStep: 1,
          maxTextYWidth: 8,
          minTextYWidth: 1,
        };
      case 'lituus':
        return {
          a: 1,
          aStep: 0.1,
          maxA: 100,
          minA: -100,
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
          textYWidth: 4,
          textYWidthStep: 1,
          maxTextYWidth: 8,
          minTextYWidth: 1,
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
          textYWidth: 4,
          textYWidthStep: 1,
          maxTextYWidth: 8,
          minTextYWidth: 1,
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
          textYWidth: 4,
          textYWidthStep: 1,
          maxTextYWidth: 8,
          minTextYWidth: 1,
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
          textYWidth: 4,
          textYWidthStep: 1,
          maxTextYWidth: 8,
          minTextYWidth: 1,
        };
    }
  }
}

export function getOptionDescription(spiralType: SpiralType): OptionDescription {
  switch (spiralType) {
    case 'archimedean':
      return {
        a: '텍스트 시작 위치',
        b: '텍스트 회전 반경',
        theta: '',
        thetaStep: '텍스트 간격, 읽는 방향(음수: 시계방향, 양수: 반시계방향)',
      };
    case 'logarithmic':
      return { a: 'a', b: 'b', theta: 'initial angle', thetaStep: 'angle step' };
    case 'fermat':
      return { a: 'a', b: 'b', theta: 'initial angle', thetaStep: 'angle step' };
    case 'hyperbolic':
      return { a: 'a', b: 'b', theta: 'initial angle', thetaStep: 'angle step' };
    case 'lituus':
      return { a: 'a', b: 'b', theta: 'initial angle', thetaStep: 'angle step' };
    case 'theodorus':
      return { a: 'a', b: 'b', theta: 'initial angle', thetaStep: 'angle step' };
    case 'fibonacci':
      return { a: 'a', b: 'b', theta: 'initial angle', thetaStep: 'angle step' };
    default:
      return { a: 'a', b: 'b', theta: 'initial angle', thetaStep: 'angle step' };
  }
}
