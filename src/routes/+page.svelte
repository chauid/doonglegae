<script lang="ts">
  import Footer from '$components/footer.svelte';
  import Header from '$components/header.svelte';
  import InputForm from '$components/input-form.svelte';
  import ResultTextBox from '$components/result-text-box.svelte';

  let inputText = $state('');
  let resultText = $state('');

  function handleInput(text: string) {
    inputText = text;
    // 현재는 입력값을 그대로 출력
    resultText = text;
  }
</script>

<div class="flex min-h-screen flex-col bg-gray-100">
  <Header />

  <main class="mx-auto w-full max-w-4xl grow px-4 py-8">
    <div class="flex flex-col gap-6">
      <!-- 입력 폼 -->
      <div class="rounded-lg bg-white p-6 shadow-md">
        <InputForm onInput={handleInput} bind:value={inputText} />
      </div>

      <!-- 결과 박스 -->
      <div class="rounded-lg bg-white p-6 shadow-md">
        <ResultTextBox value={resultText} />
      </div>
    </div>
  </main>

  <Footer />
</div>
