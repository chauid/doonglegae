<script lang="ts">
  import { onMount } from 'svelte';
  import { MediaQuery } from 'svelte/reactivity';


  import type { Point2d } from '$libs/points';

  import CoordCanvas from '$components/coord-canvas.svelte';
  import Dropdown from '$components/dropdown.svelte';
  import Slider from '$components/slider.svelte';
  import {
    getPresetOptions,
    getRequiredOpions,
    SPIRAL_TYPES,
    spiralFunction,
    type InputOptions,
    type SpiralType,
  } from '$libs/spiral';
  import { cn } from '$libs/utils';

  const typelist = Object.values(SPIRAL_TYPES).map((type) => ({
    label: type.charAt(0).toUpperCase() + type.slice(1),
    value: type,
  }));

  let coords: Point2d[] = $state([]);
  let inputOptions: InputOptions = $state(getPresetOptions('archimedean', 'point'));
  let selectedOption: SpiralType = $state('archimedean');

  onMount(() => {
    updateSpiral();
  });

  function updateSpiral() {
    coords = [];
    const spiralResult = spiralFunction(selectedOption, {
      mode: 'point',
      a: inputOptions.a,
      b: inputOptions.b,
      theta: inputOptions.initTheta,
      thetaStep: inputOptions.thetaStep,
      n: inputOptions.n,
    });
    coords.push(...spiralResult);
  }

  function handleOnChangeSelect(value: SpiralType) {
    inputOptions = getPresetOptions(value, 'point');
    selectedOption = value;
    updateSpiral();
  }

  function handleOnChangeRange(type: keyof InputOptions, value: number) {
    inputOptions[type] = value;
    updateSpiral();
  }

  const mobile = new MediaQuery('max-width: 1000px');
</script>

<div class={cn('flex', mobile.current && 'flex-col')}>
  <div class="mx-4 my-2 flex w-64 flex-col gap-4">
    <Dropdown
      onChange={(v) => handleOnChangeSelect(v)}
      options={typelist}
      placeholder="Select a spiral type"
      title="Spiral Type"
      value={selectedOption}
    />
    <Slider
      class={getRequiredOpions(selectedOption).includes('a') ? 'block' : 'hidden'}
      isInputNumber={true}
      label="a"
      max={inputOptions.maxA}
      min={inputOptions.minA}
      onChange={(value) => handleOnChangeRange('a', value)}
      step={inputOptions.aStep}
      value={inputOptions.a}
    />
    <Slider
      class={getRequiredOpions(selectedOption).includes('b') ? 'block' : 'hidden'}
      isInputNumber={true}
      label="b"
      max={inputOptions.maxB}
      min={inputOptions.minB}
      onChange={(value) => handleOnChangeRange('b', value)}
      step={inputOptions.bStep}
      value={inputOptions.b}
    />
    <Slider
      class={getRequiredOpions(selectedOption).includes('theta') ? 'block' : 'hidden'}
      isInputNumber={true}
      label="θ"
      max={inputOptions.maxInitTheta}
      min={inputOptions.minInitTheta}
      onChange={(value) => handleOnChangeRange('initTheta', value)}
      step={inputOptions.initThetaStep}
      value={inputOptions.initTheta}
    />
    <Slider
      class={getRequiredOpions(selectedOption).includes('thetaStep') ? 'block' : 'hidden'}
      isInputNumber={true}
      label="θ step"
      max={inputOptions.maxThetaStep}
      min={inputOptions.minThetaStep}
      onChange={(value) => handleOnChangeRange('thetaStep', value)}
      step={inputOptions.thetaStepStep}
      value={inputOptions.thetaStep}
    />
    <Slider isInputNumber={true} label="n" max={2000} min={1} onChange={(value) => handleOnChangeRange('n', value)} step={1} value={inputOptions.n} />
  </div>
  <div class="m-1 w-full rounded-lg border border-gray-300 p-2">
    <CoordCanvas {coords} />
  </div>
</div>
