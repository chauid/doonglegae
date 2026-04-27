<script lang="ts" module>
  let nextId = 0;
</script>

<script lang="ts">
  import type { ClassValue } from 'svelte/elements';

  import { cn } from '$libs/utils';

  interface Props {
    value?: boolean;
    label?: string;
    class?: ClassValue | undefined | null;
    onChange?: (value: boolean) => void;
  }

  let { value = $bindable(false), label = '', class: className, onChange }: Props = $props();

  const uniqueId = `toggle-${nextId++}`;

  function handleChange(e: Event) {
    const checked = (e.target as HTMLInputElement).checked;
    value = checked;
    if (onChange) onChange(checked);
  }
</script>

<div class={cn('flex items-center gap-3', className)}>
  {#if label}
    <span class="text-sm font-semibold text-gray-700">{label}</span>
  {/if}
  <input id={uniqueId} class="hidden" checked={value} onchange={handleChange} type="checkbox" />
  <label
    class={cn(
      'relative inline-block h-6 w-11 min-w-11 cursor-pointer rounded-full transition-colors',
      value ? 'bg-blue-600' : 'bg-gray-300',
      'before:absolute before:top-1 before:left-1 before:h-4 before:w-4 before:rounded-full before:bg-white before:transition-transform',
      value ? 'before:translate-x-5' : 'before:translate-x-0',
    )}
    for={uniqueId}
  ></label>
</div>
