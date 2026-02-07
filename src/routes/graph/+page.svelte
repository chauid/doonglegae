<script lang="ts">
  import CoordCanvas from '$components/coord-canvas.svelte';
  import Dropdown from '$components/dropdown.svelte';
  import Slider from '$components/slider.svelte';
  import { SPIRAL_TYPES, spiralFunction, type Point2d, type SpiralType } from '$utils/transform';

  let coords: Point2d[] = $state([]);
  let maxA = 100;
  let maxB = 100;
  let maxTheta = 100;
  let maxThetaStep = 20;
  let a: number = $state(10);
  let b: number = $state(5);
  let theta: number = $state(0.1);
  let thetaStep: number = $state(0.1);
  let n: number = $state(100);
  let selectedOption: SpiralType = 'archimedean';
  let typelist = Object.values(SPIRAL_TYPES).map((type) => ({
    label: type.charAt(0).toUpperCase() + type.slice(1),
    value: type,
  }));

  function updateSpiral() {
    coords = [];
    const spiralResult = spiralFunction(selectedOption, { a, b, theta, thetaStep, n });
    coords.push(...spiralResult);
  }

  function handleOnChangeSelect(value: SpiralType) {
    switch (value) {
      case 'archimedean':
        a = 10;
        b = 5;
        theta = 0.1;
        thetaStep = 0.1;
        n = 100;
        break;
      case 'logarithmic':
        a = 10;
        b = 0.2;
        theta = 0.1;
        thetaStep = 0.05;
        n = 200;
        break;
      case 'fermat':
        a = 10;
        b = 0;
        theta = 0;
        thetaStep = 0.2;
        n = 150;
        break;
      case 'hyperbolic':
        a = 50;
        b = 0;
        theta = 0.1;
        break;
      case 'lituus':
        a = 100;
        b = 0;
        theta = 0.1;
        break;
      case 'fibonacci':
        a = 0;
        b = 0;
        theta = 0.1;
        break;
      case 'theodorus':
        a = 0;
        b = 0;
        theta = 0.1;
        break;
    }
    selectedOption = value;
    updateSpiral();
  }

  function handleOnChangeRangeA(value: number) {
    a = value;
    updateSpiral();
  }

  function handleOnChangeRangeB(value: number) {
    b = value;
    updateSpiral();
  }

  function handleOnChangeRangeTheta(value: number) {
    theta = value;
    updateSpiral();
  }

  function handleOnChangeRangeN(value: number) {
    n = value;
    updateSpiral();
  }

  function handleOnChangeRangeThetaStep(value: number) {
    thetaStep = value;
    updateSpiral();
  }
</script>

<div class="flex">
  <div class="mx-4 my-2 flex w-64 flex-col gap-4">
    <Dropdown onChange={(v) => handleOnChangeSelect(v)} options={typelist} placeholder="Select a spiral type" title="Spiral Type" />
    <Slider isInputNumber={true} label="a" max={maxA} min={0} onChange={handleOnChangeRangeA} step={0.1} value={a} />
    <Slider isInputNumber={true} label="b" max={maxB} min={0} onChange={handleOnChangeRangeB} step={0.1} value={b} />
    <Slider isInputNumber={true} label="θ" max={maxTheta} min={0} onChange={handleOnChangeRangeTheta} step={0.1} value={theta} />
    <Slider isInputNumber={true} label="θ step" max={maxThetaStep} min={0} onChange={handleOnChangeRangeThetaStep} step={0.01} value={thetaStep} />
    <Slider isInputNumber={true} label="n" max={2000} min={1} onChange={handleOnChangeRangeN} step={1} value={n} />
  </div>
  <div class="m-1 w-full rounded-lg border border-gray-300 p-2">
    <CoordCanvas {coords} />
  </div>
</div>
