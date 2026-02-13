<script lang="ts">
  import Footer from '$components/footer.svelte';
  import Header from '$components/header.svelte';

  let { children } = $props();
</script>

<main class="font-layout">
   <Header />
  {@render children()}
  <Footer />
</main>