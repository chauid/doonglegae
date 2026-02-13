<script lang="ts">
  import { ClipboardCopy, Expand } from '@lucide/svelte';

  import type { ClassValue } from 'svelte/elements';

  import { toast } from '$libs/toast';
  import { cn } from '$libs/utils';

  interface Props {
    value?: string;
    class?: ClassValue | undefined | null;
  }

  let { value = '', class: className }: Props = $props();

  function copyToClipboard() {
    if (!value.trim()) {
      toast.info('복사할 내용이 없습니다');
      return;
    }
    navigator.clipboard.writeText(value);
    toast.success('복사 완료');
  }
</script>

<div class="flex w-full flex-col {cn(className)}">
  <div class="mb-3 flex items-center justify-between">
    <p class="block text-lg font-semibold text-gray-700">결과 텍스트</p>
    <div class="flex gap-2">
      <button class="flex cursor-pointer flex-col items-center rounded bg-gray-200 px-3 py-1 text-xs text-black transition-colors hover:bg-gray-300">
        <Expand />
        <span>크게 보기</span>
      </button>
      <button
        class={cn(
          'flex cursor-pointer flex-col items-center rounded bg-gray-200 px-3 py-1 text-xs text-black transition-colors ',
          'hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50',
        )}
        disabled={!value.trim()}
        onclick={copyToClipboard}
      >
        <ClipboardCopy />
        <span>복사</span>
      </button>
    </div>
  </div>
  <div class="h-full w-full overflow-auto rounded-lg border-2 border-gray-300 bg-gray-50 p-4 wrap-break-word whitespace-pre-wrap">
    {value}
  </div>
  <p class="mt-2 text-xs text-gray-500">
    {value.length}자 {new TextEncoder().encode(value).length}(byte)
  </p>
</div>
