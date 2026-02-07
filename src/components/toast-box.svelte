<script lang="ts">
	import { fade } from 'svelte/transition';

	interface Props {
		open?: boolean;
		message?: string;
		variant?: 'info' | 'success' | 'warning';
	}

	let { open = false, message = '', variant = 'info' }: Props = $props();

	const variantClasses = {
		info: 'bg-gray-900 text-white',
		success: 'bg-emerald-600 text-white',
		warning: 'bg-amber-500 text-white'
	};
</script>

{#if open}
	<div class="fixed bottom-6 left-1/2 z-50 -translate-x-1/2" transition:fade={{ duration: 150 }}>
		<div class="px-4 py-2 rounded-md shadow-lg text-sm font-medium {variantClasses[variant]}">
			{message}
		</div>
	</div>
{/if}
