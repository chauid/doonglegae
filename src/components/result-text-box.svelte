<script lang="ts">
  import { ClipboardCopy } from '@lucide/svelte';

  import ToastBox from '$components/toast-box.svelte';
  import { cn } from '$utils/utils';

  interface Props {
    value?: string;
  }

  let { value = '' }: Props = $props();
  let toastOpen = $state(false);
  let toastMessage = $state('');
  let toastTimer: ReturnType<typeof setTimeout> | null = $state(null);

  function openToast(message: string) {
    toastMessage = message;
    toastOpen = true;
    if (toastTimer) {
      clearTimeout(toastTimer);
    }
    toastTimer = setTimeout(() => {
      toastOpen = false;
    }, 2000);
  }

  function copyToClipboard() {
    if (!value.trim()) {
      openToast('복사할 내용이 없습니다');
      return;
    }
    navigator.clipboard.writeText(value);
    openToast('복사 완료');
  }
</script>

<div class="w-full">
  <div class="mb-3 flex items-center justify-between">
    <p class="block text-lg font-semibold text-gray-700">결과 텍스트</p>
    <button
      class={cn(
        'cursor-pointer rounded bg-gray-200 px-3 py-1 text-sm text-white transition-colors ',
        'hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50',
      )}
      disabled={!value.trim()}
      onclick={copyToClipboard}
    >
      <ClipboardCopy />
      복사
    </button>
  </div>
  <div class="max-h-64 min-h-40 w-full overflow-auto rounded-lg border-2 border-gray-300 bg-gray-50 p-4 wrap-break-word whitespace-pre-wrap">
    {value}
  </div>
  <p class="mt-2 text-xs text-gray-500">
    {value.length} / 5000 자
  </p>
</div>

<ToastBox message={toastMessage} open={toastOpen} variant="success" />
