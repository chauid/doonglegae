<script lang="ts">
	import { fade } from 'svelte/transition';

	import { toastStore, type Toast } from '$libs/toast';

	let toasts: Toast[] = $state([]);

	toastStore.subscribe((value) => {
		toasts = value;
	});

	const variantClasses = {
		info: 'bg-gray-900 text-white',
		success: 'bg-emerald-600 text-white',
		warning: 'bg-amber-500 text-white',
		error: 'bg-red-600 text-white'
	};
</script>

<div class="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 flex flex-col gap-2">
	{#each toasts as toast (toast.id)}
		<div transition:fade={{ duration: 150 }}>
			<div class="px-4 py-2 rounded-md shadow-lg text-sm font-medium {variantClasses[toast.variant]}">
				{toast.message}
			</div>
		</div>
	{/each}
</div>
