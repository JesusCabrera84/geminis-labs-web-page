import { writable, derived } from 'svelte/store';
import { userService } from '$lib/services/userService.js';
import { browser } from '$app/environment';

/**
 * Store para manejar el estado de usuarios y perfil
 */
function createUserStore() {
	// Estado inicial
	const initialState = {
		currentUser: null,
		associatedUsers: [],
		loading: false,
		error: null,
		lastUpdated: null
	};

	const { subscribe, set, update } = writable(initialState);

	return {
		subscribe,

		/**
		 * Obtiene la información del usuario actual
		 */
		async getCurrentUser() {
			if (!browser) return;

			update((state) => ({ ...state, loading: true, error: null }));

			try {
				const result = await userService.getCurrentUser();

				if (result.success) {
					update((state) => ({
						...state,
						currentUser: result.data,
						loading: false,
						error: null,
						lastUpdated: new Date()
					}));
				} else {
					update((state) => ({
						...state,
						loading: false,
						error: result.message
					}));
				}

				return result;
			} catch {
				const errorMessage = 'Error al obtener información del usuario';
				update((state) => ({
					...state,
					loading: false,
					error: errorMessage
				}));
				return { success: false, message: errorMessage };
			}
		},

		/**
		 * Obtiene los usuarios asociados (solo para usuarios maestro)
		 */
		async getAssociatedUsers() {
			if (!browser) return;

			update((state) => ({ ...state, loading: true, error: null }));

			try {
				const result = await userService.getUsers();

				if (result.success) {
					update((state) => ({
						...state,
						associatedUsers: result.data || [],
						loading: false,
						error: null,
						lastUpdated: new Date()
					}));
				} else {
					update((state) => ({
						...state,
						loading: false,
						error: result.message
					}));
				}

				return result;
			} catch {
				const errorMessage = 'Error al obtener usuarios asociados';
				update((state) => ({
					...state,
					loading: false,
					error: errorMessage
				}));
				return { success: false, message: errorMessage };
			}
		},

		/**
		 * Cambia la contraseña del usuario
		 */
		async changePassword(oldPassword, newPassword) {
			if (!browser) return;

			update((state) => ({ ...state, loading: true, error: null }));

			try {
				const result = await userService.changePassword(oldPassword, newPassword);

				update((state) => ({
					...state,
					loading: false,
					error: result.success ? null : result.message
				}));

				return result;
			} catch {
				const errorMessage = 'Error al cambiar la contraseña';
				update((state) => ({
					...state,
					loading: false,
					error: errorMessage
				}));
				return { success: false, message: errorMessage };
			}
		},

		/**
		 * Carga todos los datos necesarios para el perfil
		 */
		async loadProfileData() {
			if (!browser) return;

			update((state) => ({ ...state, loading: true, error: null }));

			try {
				// Obtener información del usuario actual
				const userResult = await userService.getCurrentUser();

				if (!userResult.success) {
					update((state) => ({
						...state,
						loading: false,
						error: userResult.message
					}));
					return userResult;
				}

				// Si es usuario maestro, obtener usuarios asociados
				let associatedUsers = [];
				if (userResult.data?.is_master) {
					const usersResult = await userService.getUsers();
					if (usersResult.success) {
						associatedUsers = usersResult.data || [];
					}
				}

				update((state) => ({
					...state,
					currentUser: userResult.data,
					associatedUsers,
					loading: false,
					error: null,
					lastUpdated: new Date()
				}));

				return { success: true, data: { user: userResult.data, users: associatedUsers } };
			} catch {
				const errorMessage = 'Error al cargar datos del perfil';
				update((state) => ({
					...state,
					loading: false,
					error: errorMessage
				}));
				return { success: false, message: errorMessage };
			}
		},

		/**
		 * Limpia errores
		 */
		clearError() {
			update((state) => ({ ...state, error: null }));
		},

		/**
		 * Limpia todos los datos
		 */
		clear() {
			set(initialState);
		},

		/**
		 * Actualiza los datos del usuario actual
		 */
		updateCurrentUser(userData) {
			update((state) => ({
				...state,
				currentUser: { ...state.currentUser, ...userData }
			}));
		}
	};
}

// Crear el store
export const userStore = createUserStore();

// Stores derivados para facilitar el uso
export const currentUser = derived(userStore, ($user) => $user.currentUser);
export const associatedUsers = derived(userStore, ($user) => $user.associatedUsers);
export const userLoading = derived(userStore, ($user) => $user.loading);
export const userError = derived(userStore, ($user) => $user.error);
export const isMasterUser = derived(userStore, ($user) => $user.currentUser?.is_master || false);
