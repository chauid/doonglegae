<script lang="ts">
  import ToastBox from '$components/toast-box.svelte';
  import '../app.css';

  let { children } = $props();
</script>

<style lang="postcss">
  @reference "tailwindcss";
</style>

<main class="font-layout">
  {@render children()}
  <ToastBox />
</main>