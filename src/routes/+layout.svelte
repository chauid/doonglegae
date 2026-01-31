<script lang="ts">
  import '../app.css';

  let { children } = $props();
</script>

<main class="font-layout">
  {@render children()}
</main>