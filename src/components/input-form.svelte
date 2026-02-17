<script lang="ts">
  import type { ClassValue } from 'svelte/elements';

  import { cn } from '$libs/utils';

  interface Props {
    value?: string;
    class?: ClassValue | undefined | null;
    onInput?: (value: string) => void;
  }
  let { value = $bindable(''), onInput, class: className }: Props = $props();
</script>

<div class={cn('max-h-100 w-full', className)}>
  <label class="mb-3 block text-lg font-semibold text-gray-700" for="input-textarea"> 입력 텍스트 </label>
  <textarea
    id="input-textarea"
    class="max-h-80 min-h-20 w-full resize-y rounded-lg border-2 border-gray-300 p-4 transition-colors focus:border-blue-500 focus:outline-none"
    oninput={(e) => {
      if (onInput) {
        onInput(e.currentTarget.value);
      }
    }}
    placeholder="변환할 텍스트를 입력하세요..."
    rows={3}
    bind:value
  ></textarea>
  <p class="text-xs text-gray-500">
    {value.length}자 {new TextEncoder().encode(value).length}(byte)
  </p>
</div>
