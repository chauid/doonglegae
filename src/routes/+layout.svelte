<script lang="ts">
  import '../app.css';

  let { children } = $props();
</script>

<style lang="postcss">
  @reference "tailwindcss";
</style>

<main class="font-layout">
  {@render children()}
</main>