<script lang="ts">
  import type { ClassValue } from 'svelte/elements';

  import { cn } from '$libs/utils';

  interface Props {
    value?: number;
    min?: number;
    max?: number;
    step?: number;
    label?: string;
    isInputNumber?: boolean;
    class?: ClassValue | undefined | null;
    onChange?: (value: number) => void;
  }

  let { value = $bindable(0), min = 0, max = 100, step = 1, label = '슬라이더', isInputNumber = false, class: className, onChange }: Props = $props();
  function handleChange(e: Event) {
    const val = Number((e.target as HTMLInputElement).value);
    value = val;
    if (onChange) onChange(val);
  }
</script>

<div class={cn('w-full', className)}>
  <div class="flex items-center justify-between">
    <p class="text-sm font-semibold text-gray-700">{label}</p>
    {#if isInputNumber}
      <input
        class="w-16 rounded border border-gray-300 p-1 text-sm text-gray-700 focus:border-blue-500 focus:outline-none"
        {max}
        {min}
        oninput={handleChange}
        {step}
        type="number"
        bind:value
      />
    {:else}
      <span class="text-sm text-gray-700">{value}</span>
    {/if}
  </div>
  <input
    class="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-blue-600"
    {max}
    {min}
    oninput={handleChange}
    {step}
    type="range"
    bind:value
  />
  <div class="mt-1 flex justify-between text-xs text-gray-500">
    <span>{min}</span>
    <span>{max}</span>
  </div>
</div>
