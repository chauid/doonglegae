<script lang="ts">
  import Dropdown from '$components/dropdown.svelte';
  import Footer from '$components/footer.svelte';
  import Header from '$components/header.svelte';
  import InputForm from '$components/input-form.svelte';
  import ResultTextBox from '$components/result-text-box.svelte';
  import Slider from '$components/slider.svelte';
  import Toggle from '$components/toggle.svelte';
  import {
    getOptionDescription,
    getPresetOptions,
    getRequiredOpions,
    SPIRAL_TYPES,
    transformTextToSpiral,
    type InputOptions,
    type SpiralType,
  } from '$libs/spiral';
  import { cn } from '$libs/utils';

  const typelist = Object.values(SPIRAL_TYPES)
    .filter((type) => {
      return type !== 'fibonacci';
    })
    .map((type) => {
      return { label: type.charAt(0).toUpperCase() + type.slice(1), value: type };
    });

  let inputText = $state('');
  let detailedSettingsOpen = $state(false);
  let selectedOption: SpiralType = $state('archimedean');
  let inputOptions: InputOptions = $state(getPresetOptions('archimedean', 'text'));
  let inversed = $state(false);
  let includeSpaces = $state(false);

  let resultText = $derived(
    transformTextToSpiral(includeSpaces ? inputText : inputText.replace(/\s/g, ''), selectedOption, {
      mode: 'text',
      a: inputOptions.a,
      b: inputOptions.b,
      theta: inputOptions.initTheta,
      thetaStep: inputOptions.thetaStep,
      textYWidth: inputOptions.textYWidth,
      inversed,
    }),
  );

  function handleOnInput(text: string) {
    inputText = text;
  }

  function handleOnChangeSelect(value: SpiralType) {
    inputOptions = getPresetOptions(value, 'text');
    selectedOption = value;
  }

  function handleOnChangeToggle(type: 'inversed' | 'includeSpaces', value: boolean) {
    if (type === 'inversed') {
      inversed = value;
    } else if (type === 'includeSpaces') {
      includeSpaces = value;
    }
  }

  function handleOnChangeRange(type: keyof InputOptions, value: number) {
    inputOptions[type] = value;
  }
</script>

<Header />

<div class="flex min-h-screen flex-col bg-gray-100">
  <main class="mx-auto w-full max-w-6xl px-4 py-4">
    <div class="flex flex-col gap-4">
      <div class="flex flex-col rounded-lg bg-white p-6 shadow-md">
        <div class="flex">
          <div class="flex w-full flex-col justify-between">
            <InputForm onInput={handleOnInput} bind:value={inputText} />
            <div class="mt-2 flex">
              <button
                class="sticky bottom-0 cursor-pointer text-left text-sm text-gray-600"
                onclick={() => (detailedSettingsOpen = !detailedSettingsOpen)}
              >
                세부 설정 {detailedSettingsOpen ? '▲' : '▼'}
              </button>
            </div>
          </div>
          <div class="my-3 ml-4 flex w-64 flex-col gap-2">
            <Dropdown onChange={(v) => handleOnChangeSelect(v)} options={typelist} placeholder="스타일 선택" title="스타일" value={selectedOption} />
            <Toggle class="justify-between" label="말 순서 바꾸기" onChange={(v) => handleOnChangeToggle('inversed', v)} value={inversed} />
            <Toggle class="justify-between" label="띄어 쓰기 포함" onChange={(v) => handleOnChangeToggle('includeSpaces', v)} value={includeSpaces} />
            <div class="flex items-center justify-between">
              <label class="text-sm font-semibold text-gray-700" for="textYWidth">Y축 1칸당 텍스트 크기</label>
              <input
                id="textYWidth"
                class="h-6 w-12 rounded border border-gray-300 p-1 text-sm text-gray-700 focus:border-blue-500 focus:outline-none"
                max={inputOptions.maxTextYWidth}
                min={inputOptions.minTextYWidth}
                oninput={(e) => handleOnChangeRange('textYWidth', Number((e.target as HTMLInputElement).value))}
                step={inputOptions.textYWidthStep}
                type="number"
                value={inputOptions.textYWidth}
              />
            </div>
          </div>
        </div>
        <div class={cn('overflow-hidden transition-all duration-300', detailedSettingsOpen ? 'max-h-100' : 'max-h-0')}>
          <Slider
            class={getRequiredOpions(selectedOption).includes('a') ? 'block' : 'hidden'}
            isInputNumber={true}
            label={getOptionDescription(selectedOption).a}
            max={inputOptions.maxA}
            min={inputOptions.minA}
            onChange={(value) => handleOnChangeRange('a', value)}
            step={inputOptions.aStep}
            value={inputOptions.a}
          />
          <Slider
            class={getRequiredOpions(selectedOption).includes('b') ? 'block' : 'hidden'}
            isInputNumber={true}
            label={getOptionDescription(selectedOption).b}
            max={inputOptions.maxB}
            min={inputOptions.minB}
            onChange={(value) => handleOnChangeRange('b', value)}
            step={inputOptions.bStep}
            value={inputOptions.b}
          />
          <Slider
            class={getRequiredOpions(selectedOption).includes('theta') ? 'block' : 'hidden'}
            isInputNumber={true}
            label={getOptionDescription(selectedOption).theta}
            max={inputOptions.maxInitTheta}
            min={inputOptions.minInitTheta}
            onChange={(value) => handleOnChangeRange('initTheta', value)}
            step={inputOptions.initThetaStep}
            value={inputOptions.initTheta}
          />
          <Slider
            class={getRequiredOpions(selectedOption).includes('thetaStep') ? 'block' : 'hidden'}
            isInputNumber={true}
            label={getOptionDescription(selectedOption).thetaStep}
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
