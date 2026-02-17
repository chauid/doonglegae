<script lang="ts">
  import { ClipboardCopy, Copy, Expand, X } from '@lucide/svelte';

  import type { ClassValue } from 'svelte/elements';

  import { toast } from '$libs/toast';
  import { cn } from '$libs/utils';

  interface Props {
    value?: string;
    class?: ClassValue | undefined | null;
  }

  let { value = '', class: className }: Props = $props();

  let lines = $derived(value.split('\n'));

  let resultDialog: HTMLDialogElement;

  function openDialog() {
    if (!value.trim()) {
      toast.info('내용이 없습니다');
      return;
    }
    resultDialog.showModal();
  }

  function copyToClipboard() {
    if (!value.trim()) {
      toast.info('복사할 내용이 없습니다');
      return;
    }
    navigator.clipboard.writeText(value);
    toast.success('복사 완료');
  }

  function selectLine(lineNumber: number) {
    const lineElement = document.getElementById(`line-${lineNumber}`);
    if (!lineElement) return;

    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(lineElement);
    selection?.removeAllRanges();
    selection?.addRange(range);
  }

  function selectDialogLine(lineNumber: number) {
    const lineElement = document.getElementById(`dialog-line-${lineNumber}`);
    if (!lineElement) return;

    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(lineElement);
    selection?.removeAllRanges();
    selection?.addRange(range);
  }
</script>

<div class="flex w-full flex-col {cn(className)}">
  <div class="mb-3 flex items-center justify-between">
    <p class="block text-lg font-semibold text-gray-700">결과 텍스트</p>
    <div class="flex gap-2">
      <button
        class="flex cursor-pointer flex-col items-center rounded bg-gray-200 px-3 py-1 text-xs text-black transition-colors hover:bg-gray-300"
        onclick={openDialog}
      >
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
  <div class="h-full w-full overflow-auto rounded-lg border-2 border-gray-300 bg-gray-50">
    <div class="flex font-mono text-sm">
      <div class="flex flex-col border-r border-gray-300 bg-gray-100 py-2 text-gray-500 select-none">
        {#each lines as _, i}
          <button class="block cursor-pointer pr-2 pl-3 leading-6 hover:bg-gray-200" onclick={() => selectLine(i)}>
            {i + 1}
          </button>
        {/each}
      </div>
      <div class="overflow-x-auto p-2">
        {#each lines as line, i}
          <div id="line-{i}" class="leading-6 whitespace-pre">
            {line || ' '}
          </div>
        {/each}
      </div>
    </div>
  </div>
  <p class="mt-1 text-xs text-gray-500">
    {value.length}자 {new TextEncoder().encode(value).length}(byte)
  </p>
</div>

<dialog bind:this={resultDialog} class="m-auto max-h-[90vh] min-h-[30vh] max-w-[80vw] min-w-[30vw] rounded-lg p-4">
  <div class="flex items-center justify-end">
    <button class="top-1 right-1 cursor-pointer rounded bg-white p-1.5 hover:bg-gray-100" onclick={() => resultDialog.close()} title="ESC">
      <X />
    </button>
  </div>
  <div class="relative mt-2">
    <button class="absolute top-1 right-1 cursor-pointer rounded bg-white p-1.5 hover:bg-gray-300" onclick={copyToClipboard}>
      <Copy size={16} />
    </button>
    <div class="h-full w-full overflow-auto rounded-lg border-2 border-gray-300 bg-gray-50">
      <div class="flex font-mono text-sm">
        <div class="shrink-0 border-r border-gray-300 bg-gray-100 px-1 py-2 text-right text-gray-500 select-none">
          {#each lines as _, i}
            <button class="block cursor-pointer px-3 leading-6 hover:bg-gray-200" onclick={() => selectDialogLine(i)}>
              {i + 1}
            </button>
          {/each}
        </div>
        <div class="overflow-x-auto p-2">
          {#each lines as line, i}
            <div id="dialog-line-{i}" class="leading-6 whitespace-pre">
              {line || ' '}
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
  <div class="mt-2 flex items-center justify-center gap-4 border-gray-300">
    <button
      class="cursor-pointer rounded bg-gray-200 px-3 py-2 text-xs text-black transition-colors hover:bg-gray-300"
      onclick={() => resultDialog.close()}
    >
      닫기
    </button>
  </div>
</dialog>
