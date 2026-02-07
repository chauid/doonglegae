<script lang="ts">
  import { SPIRAL_TYPES, type SpiralType } from '$utils/transform';

  interface Option {
    label: string;
    value: string;
  }

  interface Props {
    title?: string;
    options?: Option[];
    value?: string;
    onChange: (value: SpiralType) => void;
    placeholder?: string;
  }

  let { title = '드롭다운', options = [], value = $bindable(''), onChange, placeholder = '선택하세요' }: Props = $props();

  function handleChange(e: Event) {
    const val = (e.target as HTMLSelectElement).value;
    value = val;
    if (SPIRAL_TYPES.includes(val as SpiralType)) {
      onChange(val as SpiralType);
    }
  }
</script>

<div class="w-full">
  <p class="mb-2 block text-sm font-semibold text-gray-700">{title}</p>
  <select
    class="w-full rounded-lg border-2 border-gray-300 bg-white p-3 text-gray-800 transition-colors focus:border-blue-500 focus:outline-none"
    onchange={handleChange}
    bind:value
  >
    <option disabled hidden selected value="">{placeholder}</option>
    {#each options as opt}
      <option value={opt.value}>{opt.label}</option>
    {/each}
  </select>
</div>
