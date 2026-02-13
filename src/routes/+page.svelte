<script lang="ts">
  import Dropdown from '$components/dropdown.svelte';
  import Footer from '$components/footer.svelte';
  import Header from '$components/header.svelte';
  import InputForm from '$components/input-form.svelte';
  import ResultTextBox from '$components/result-text-box.svelte';
  import Slider from '$components/slider.svelte';
  import { getPresetOptions, getRequiredOpions, SPIRAL_TYPES, transformTextToSpiral, type InputOptions, type SpiralType } from '$libs/spiral';

  const typelist = Object.values(SPIRAL_TYPES)
    .filter((type) => {
      return type !== 'fibonacci';
    })
    .map((type) => {
      return { label: type.charAt(0).toUpperCase() + type.slice(1), value: type };
    });

  let inputText = $state('');
  let selectedOption: SpiralType = $state('archimedean');
  let inputOptions: InputOptions = $state(getPresetOptions('archimedean', 'text'));

  let resultText = $derived(
    transformTextToSpiral(inputText, selectedOption, 'ko', {
      mode: 'text',
      a: inputOptions.a,
      b: inputOptions.b,
      theta: inputOptions.initTheta,
      thetaStep: inputOptions.thetaStep,
    }),
  );

  function handleOnInput(text: string) {
    inputText = text;
  }

  function handleOnChangeSelect(value: SpiralType) {
    inputOptions = getPresetOptions(value, 'text');
    selectedOption = value;
  }

  function handleOnChangeRange(type: keyof InputOptions, value: number) {
    inputOptions[type] = value;
  }
</script>

<Header />

<div class="flex min-h-screen flex-col bg-gray-100">
  <main class="mx-auto w-full max-w-6xl grow px-4 py-4">
    <div class="flex flex-col gap-6">
      <div class="flex rounded-lg bg-white p-6 shadow-md">
        <InputForm onInput={handleOnInput} bind:value={inputText} />
        <div class="mx-4 my-2 flex w-64 flex-col gap-1">
          <Dropdown onChange={(v) => handleOnChangeSelect(v)} options={typelist} placeholder="스타일 선택" title="스타일" value={selectedOption} />
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
        </div>
      </div>
      <div class="rounded-lg bg-white p-6 shadow-md">
        <ResultTextBox class="h-120" value={resultText} />
      </div>
    </div>
  </main>
</div>

<Footer />