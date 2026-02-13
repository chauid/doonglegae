import { writable } from 'svelte/store';

export type ToastVariant = 'info' | 'success' | 'warning' | 'error';

export interface Toast {
	id: number;
	message: string;
	variant: ToastVariant;
	duration: number;
}

function createToastStore() {
	const { subscribe, update } = writable<Toast[]>([]);

	let nextId = 0;

	return {
		subscribe,
		show: (message: string, variant: ToastVariant = 'info', duration: number = 2000) => {
			const id = nextId++;
			const toast: Toast = { id, message, variant, duration };

			update((toasts) => [...toasts, toast]);

			setTimeout(() => {
				update((toasts) => toasts.filter((t) => t.id !== id));
			}, duration);
		},
		remove: (id: number) => {
			update((toasts) => toasts.filter((t) => t.id !== id));
		}
	};
}

export const toastStore = createToastStore();

export const toast = {
	info: (message: string, duration?: number) => toastStore.show(message, 'info', duration),
	success: (message: string, duration?: number) => toastStore.show(message, 'success', duration),
	warning: (message: string, duration?: number) => toastStore.show(message, 'warning', duration),
	error: (message: string, duration?: number) => toastStore.show(message, 'error', duration)
};