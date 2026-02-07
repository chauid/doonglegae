<script lang="ts">
  import { ScanSearch } from '@lucide/svelte';
  import { onMount } from 'svelte';

  import type { Point2d } from '$utils/transform';

  import { cn } from '$utils/utils';

  interface Props {
    coords?: Point2d[];
  }

  let { coords = [] }: Props = $props();
  let canvasRef: HTMLCanvasElement;
  let offsetX = 0;
  let offsetY = 0;
  let isDrawingLine = $state(false);
  let isDragging = $state(false);
  let dragStartX = 0;
  let dragStartY = 0;
  let scale = 5;

  const CANVAS_WIDTH = 3840;
  const CANVAS_HEIGHT = 1935;
  const GRID_SIZE = 10;
  const ZOOM_FACTOR = 0.1;
  const MIN_SCALE = 0.2;
  const MAX_SCALE = 100;

  onMount(() => {
    render();
  });

  $effect(() => {
    render();
  });

  function render() {
    if (!canvasRef) return;
    const ctx = canvasRef.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio;
    const width = canvasRef.width;
    const height = canvasRef.height;

    ctx.scale(dpr, dpr);

    // 배경
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // 그리드
    drawGrid(ctx, width, height);

    // 축
    drawAxes(ctx, width, height);

    // 좌표 표시
    if (isDrawingLine) {
      drawLine(ctx, width, height);
    } else {
      drawPoints(ctx, width, height);
    }
  }

  function drawGrid(ctx: CanvasRenderingContext2D, width: number, height: number) {
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = Math.pow(scale, -1) / 2 + 2 * Math.log(1 + scale);

    const xRange = Math.ceil(width / scale / GRID_SIZE) * GRID_SIZE;
    const yRange = Math.ceil(height / scale / GRID_SIZE) * GRID_SIZE;

    for (let x = -xRange; x < xRange; x += GRID_SIZE) {
      const screenX = width / 2 + (x + offsetX) * scale;
      if (screenX < 0 || screenX > width) continue;
      if (scale < 10 && scale >= 5 && x % (GRID_SIZE * 2) !== 0) continue;
      if (scale < 5 && scale >= 2 && x % (GRID_SIZE * 5) !== 0) continue;
      if (scale < 2 && scale >= 1 && x % (GRID_SIZE * 10) !== 0) continue;
      if (scale < 1 && scale >= 0 && x % (GRID_SIZE * 20) !== 0) continue;
      if (scale < 0.5 && scale >= 0.25 && x % (GRID_SIZE * 40) !== 0) continue;
      if (scale < 0.25 && scale >= 0 && x % (GRID_SIZE * 80) !== 0) continue;
      ctx.beginPath();
      ctx.moveTo(screenX, 0);
      ctx.lineTo(screenX, height);
      ctx.stroke();
    }

    for (let y = -yRange; y < yRange; y += GRID_SIZE) {
      const screenY = height / 2 - (y + offsetY) * scale;
      if (screenY < 0 || screenY > height) continue;
      if (scale < 10 && scale >= 5 && y % (GRID_SIZE * 2) !== 0) continue;
      if (scale < 5 && scale >= 2 && y % (GRID_SIZE * 5) !== 0) continue;
      if (scale < 2 && scale >= 1 && y % (GRID_SIZE * 10) !== 0) continue;
      if (scale < 1 && scale >= 0 && y % (GRID_SIZE * 20) !== 0) continue;
      if (scale < 0.5 && scale >= 0.25 && y % (GRID_SIZE * 40) !== 0) continue;
      if (scale < 0.25 && scale >= 0 && y % (GRID_SIZE * 80) !== 0) continue;
      ctx.beginPath();
      ctx.moveTo(0, screenY);
      ctx.lineTo(width, screenY);
      ctx.stroke();
    }
  }

  function drawAxes(ctx: CanvasRenderingContext2D, width: number, height: number) {
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = Math.pow(scale, -1) / 2 + 2 * Math.log(1 + scale);

    // X축
    const xAxisY = height / 2 - offsetY * scale;
    ctx.beginPath();
    ctx.moveTo(0, xAxisY);
    ctx.lineTo(width, xAxisY);
    ctx.stroke();

    // Y축
    const yAxisX = width / 2 + offsetX * scale;
    ctx.beginPath();
    ctx.moveTo(yAxisX, 0);
    ctx.lineTo(yAxisX, height);
    ctx.stroke();

    // 좌표값 표시
    drawAxisLabels(ctx, width, height, xAxisY, yAxisX);
  }

  function drawAxisLabels(ctx: CanvasRenderingContext2D, width: number, height: number, xAxisY: number, yAxisX: number) {
    ctx.fillStyle = '#333333';
    ctx.font = '2.2rem sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    const xRange = Math.ceil(width / scale / GRID_SIZE) * GRID_SIZE;
    const yRange = Math.ceil(height / scale / GRID_SIZE) * GRID_SIZE;

    // X축 값 표시
    for (let x = -xRange; x < xRange; x += GRID_SIZE) {
      if (x === 0) continue;
      const screenX = width / 2 + (x + offsetX) * scale;
      if (screenX < 0 || screenX > width) continue;
      if (xAxisY < 0 || xAxisY > height) continue;
      if (scale < 10 && scale >= 5 && x % (GRID_SIZE * 2) !== 0) continue;
      if (scale < 5 && scale >= 2 && x % (GRID_SIZE * 5) !== 0) continue;
      if (scale < 2 && scale >= 1 && x % (GRID_SIZE * 10) !== 0) continue;
      if (scale < 1 && scale >= 0.5 && x % (GRID_SIZE * 20) !== 0) continue;
      if (scale < 0.5 && scale >= 0.25 && x % (GRID_SIZE * 40) !== 0) continue;
      if (scale < 0.25 && scale >= 0 && x % (GRID_SIZE * 80) !== 0) continue;
      ctx.fillText(x.toString(), screenX, xAxisY + 5);
    }

    // Y축 값 표시
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    for (let y = -yRange; y < yRange; y += GRID_SIZE) {
      if (y === 0) continue;
      const screenY = height / 2 - (y + offsetY) * scale;
      if (screenY < 0 || screenY > height) continue;
      if (yAxisX < 0 || yAxisX > width) continue;
      if (scale < 10 && scale >= 5 && y % (GRID_SIZE * 2) !== 0) continue;
      if (scale < 5 && scale >= 2 && y % (GRID_SIZE * 5) !== 0) continue;
      if (scale < 2 && scale >= 1 && y % (GRID_SIZE * 10) !== 0) continue;
      if (scale < 1 && scale >= 0 && y % (GRID_SIZE * 20) !== 0) continue;
      if (scale < 0.5 && scale >= 0.25 && y % (GRID_SIZE * 40) !== 0) continue;
      if (scale < 0.25 && scale >= 0 && y % (GRID_SIZE * 80) !== 0) continue;
      ctx.fillText(y.toString(), yAxisX - 5, screenY);
    }

    // 원점 표시
    if (xAxisY >= 0 && xAxisY <= height && yAxisX >= 0 && yAxisX <= width) {
      ctx.textAlign = 'right';
      ctx.textBaseline = 'top';
      ctx.fillText('0', yAxisX - 5, xAxisY + 5);
    }
  }

  function drawPoints(ctx: CanvasRenderingContext2D, width: number, height: number) {
    ctx.fillStyle = '#ff0000';
    coords.forEach((point) => {
      const screenX = width / 2 + (point.x + offsetX) * scale;
      const screenY = height / 2 - (point.y + offsetY) * scale;
      ctx.beginPath();
      ctx.arc(screenX, screenY, (2 * Math.pow(scale, -1)) / 2 + 2 * Math.log(1 + scale), 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function drawLine(ctx: CanvasRenderingContext2D, width: number, height: number) {
    if (coords.length < 2) return;

    ctx.strokeStyle = '#0000ff';
    ctx.lineWidth = Math.pow(scale, -1) / 2 + 2 * Math.log(1 + scale);
    ctx.beginPath();

    const firstPoint = coords[0];
    ctx.moveTo(width / 2 + (firstPoint.x + offsetX) * scale, height / 2 - (firstPoint.y + offsetY) * scale);

    coords.forEach((point) => {
      const screenX = width / 2 + (point.x + offsetX) * scale;
      const screenY = height / 2 - (point.y + offsetY) * scale;
      ctx.lineTo(screenX, screenY);
    });

    ctx.stroke();
  }

  function handleCanvasMouseDown(e: MouseEvent) {
    isDragging = true;
    dragStartX = e.clientX;
    dragStartY = e.clientY;
  }

  function handleCanvasMouseMove(e: MouseEvent) {
    if (!isDragging) return;

    const deltaX = e.clientX - dragStartX;
    const deltaY = e.clientY - dragStartY;

    offsetX += (deltaX / scale) * 1.05;
    offsetY -= (deltaY / scale) * 1.05;

    dragStartX = e.clientX;
    dragStartY = e.clientY;

    render();
  }

  function handleCanvasMouseUp() {
    isDragging = false;
  }

  function handleCanvasWheel(e: WheelEvent) {
    e.preventDefault();

    const direction = e.deltaY > 0 ? -1 : 1;
    const newScale = scale + direction * ZOOM_FACTOR * scale;

    if (newScale >= MIN_SCALE && newScale <= MAX_SCALE) {
      scale = newScale;
      render();
    }
  }

  function toggleDrawMode() {
    isDrawingLine = !isDrawingLine;
    render();
  }
</script>

<div class="flex flex-col gap-2 p-2">
  <div class="flex gap-2">
    <button
      class="cursor-pointer rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
      onclick={toggleDrawMode}
    >
      {isDrawingLine ? '점으로 보기' : '선으로 보기'}
    </button>
    <button
      class={cn(
        'flex cursor-pointer items-center gap-1 rounded bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors ',
        'hover:bg-gray-300',
      )}
      onclick={() => {
        scale = 5;
        render();
      }}
    >
      <ScanSearch />
      <span>초기화</span>
    </button>
  </div>

  <canvas
    bind:this={canvasRef}
    class="h-full w-full cursor-grab border border-gray-300 bg-white active:cursor-grabbing"
    height={CANVAS_HEIGHT}
    onmousedown={handleCanvasMouseDown}
    onmouseleave={handleCanvasMouseUp}
    onmousemove={handleCanvasMouseMove}
    onmouseup={handleCanvasMouseUp}
    onwheel={handleCanvasWheel}
    width={CANVAS_WIDTH}
  ></canvas>
</div>
