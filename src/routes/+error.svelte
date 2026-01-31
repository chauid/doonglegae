<script lang="ts">
  import { page } from '$app/state';
</script>

<div class="flex h-screen w-screen flex-col flex-wrap items-center justify-center bg-gray-200">
  <h1 class="m-2 text-3xl font-bold">{page.status} : {page.error?.message}</h1>
</div>
