import { writable } from 'svelte/store';

/**
 * Store para manejar notificaciones toast
 */
function createToastStore() {
	const { subscribe, update } = writable([]);

	return {
		subscribe,

		/**
		 * Agrega una nueva notificación
		 */
		add(message, type = 'info', duration = 5000) {
			// Soporte para ambos formatos: add(message, type) y add(toastObject)
			let toastData;
			if (typeof message === 'string') {
				toastData = { message, type, duration };
			} else {
				toastData = { type: 'info', duration: 5000, ...message };
			}

			const id = Date.now() + Math.random();
			const newToast = {
				id,
				...toastData
			};

			update((toasts) => [...toasts, newToast]);

			// Auto-remover después de la duración especificada
			if (newToast.duration > 0) {
				setTimeout(() => {
					this.remove(id);
				}, newToast.duration);
			}

			return id;
		},

		/**
		 * Remueve una notificación por ID
		 */
		remove(id) {
			update((toasts) => toasts.filter((toast) => toast.id !== id));
		},

		/**
		 * Limpia todas las notificaciones
		 */
		clear() {
			update(() => []);
		},

		/**
		 * Métodos de conveniencia para diferentes tipos
		 */
		success(message, duration = 5000) {
			return this.add({ type: 'success', message, duration });
		},

		error(message, duration = 7000) {
			return this.add({ type: 'error', message, duration });
		},

		warning(message, duration = 6000) {
			return this.add({ type: 'warning', message, duration });
		},

		info(message, duration = 5000) {
			return this.add({ type: 'info', message, duration });
		}
	};
}

export const toastStore = createToastStore();
