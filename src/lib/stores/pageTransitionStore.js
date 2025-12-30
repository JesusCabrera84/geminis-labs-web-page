import { writable } from 'svelte/store';
import { goto as svelteGoto } from '$app/navigation';

/**
 * Store para manejar transiciones de página con efectos visuales
 */
function createPageTransitionStore() {
	const { subscribe, update } = writable({
		isTransitioning: false,
		transitionType: 'fade' // 'fade', 'slide', 'blur'
	});

	return {
		subscribe,

		/**
		 * Navega a una nueva página con efecto de transición
		 */
		async goto(url, options = {}) {
			const { transitionType = 'fade', duration = 300, replaceState = false } = options;

			// Iniciar transición
			update((state) => ({
				...state,
				isTransitioning: true,
				transitionType
			}));

			// Esperar la duración de la transición
			await new Promise((resolve) => setTimeout(resolve, duration));

			// Navegar
			await svelteGoto(url, { replaceState });

			// Finalizar transición
			update((state) => ({
				...state,
				isTransitioning: false
			}));
		},

		/**
		 * Inicia una transición manual
		 */
		startTransition(transitionType = 'fade') {
			update((state) => ({
				...state,
				isTransitioning: true,
				transitionType
			}));
		},

		/**
		 * Finaliza una transición manual
		 */
		endTransition() {
			update((state) => ({
				...state,
				isTransitioning: false
			}));
		}
	};
}

export const pageTransitionStore = createPageTransitionStore();
