<script lang="ts">
  let { value = $bindable(''), onInput } = $props();
</script>

<div class="w-full">
  <label class="mb-3 block text-lg font-semibold text-gray-700" for="input-textarea"> 입력 텍스트 </label>
  <textarea
    id="input-textarea"
    class="w-full resize-none rounded-lg border-2 border-gray-300 p-4 transition-colors focus:border-blue-500 focus:outline-none"
    oninput={(e) => {
      if (onInput) {
        onInput(e.currentTarget.value);
      }
    }}
    placeholder="변환할 텍스트를 입력하세요..."
    rows="6"
    bind:value
  ></textarea>
  <p class="mt-2 text-xs text-gray-500">
    {value.length} / 5000 자
  </p>
</div>
