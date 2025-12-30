import { describe, it, expect, vi, beforeEach } from 'vitest';
import { get } from 'svelte/store';
import { authStore } from './authStore.js';

// Mock de los servicios
vi.mock('../services/authService.js', () => ({
	authService: {
		login: vi.fn(),
		logout: vi.fn(),
		isAuthenticated: vi.fn(),
		getUserData: vi.fn(),
		register: vi.fn(),
		confirmEmail: vi.fn(),
		getCurrentClient: vi.fn(),
		resendVerification: vi.fn(),
		forgotPassword: vi.fn(),
		resetPassword: vi.fn()
	}
}));

// Mock del browser environment
vi.mock('$app/environment', () => ({
	browser: true
}));

describe('AuthStore', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe('estado inicial', () => {
		it('debería tener estado inicial correcto', () => {
			const state = get(authStore);

			expect(state).toEqual({
				isAuthenticated: false,
				user: null,
				loading: false,
				error: null
			});
		});
	});

	describe('init', () => {
		it('debería inicializar con usuario autenticado', async () => {
			const mockUser = { id: 1, email: 'test@example.com' };
			const { authService } = await import('../services/authService.js');

			authService.isAuthenticated.mockReturnValueOnce(true);
			authService.getUserData.mockReturnValueOnce(mockUser);

			authStore.init();

			const state = get(authStore);
			expect(state.isAuthenticated).toBe(true);
			expect(state.user).toEqual(mockUser);
			expect(state.loading).toBe(false);
		});

		it('debería inicializar sin usuario autenticado', async () => {
			const { authService } = await import('../services/authService.js');

			authService.isAuthenticated.mockReturnValueOnce(false);
			authService.getUserData.mockReturnValueOnce(null);

			authStore.init();

			const state = get(authStore);
			expect(state.isAuthenticated).toBe(false);
			expect(state.user).toBe(null);
			expect(state.loading).toBe(false);
		});
	});

	describe('login', () => {
		it('debería actualizar estado durante login exitoso', async () => {
			const mockUser = { id: 1, email: 'test@example.com' };
			const { authService } = await import('../services/authService.js');

			authService.login.mockResolvedValueOnce({
				success: true,
				message: 'Login exitoso'
			});
			authService.getUserData.mockReturnValueOnce(mockUser);

			const result = await authStore.login({
				email: 'test@example.com',
				password: 'password'
			});

			expect(result.success).toBe(true);

			const state = get(authStore);
			expect(state.isAuthenticated).toBe(true);
			expect(state.user).toEqual(mockUser);
			expect(state.loading).toBe(false);
			expect(state.error).toBe(null);
		});

		it('debería manejar errores de login', async () => {
			const { authService } = await import('../services/authService.js');

			authService.login.mockResolvedValueOnce({
				success: false,
				message: 'Credenciales inválidas'
			});

			const result = await authStore.login({
				email: 'test@example.com',
				password: 'wrong-password'
			});

			expect(result.success).toBe(false);

			const state = get(authStore);
			expect(state.isAuthenticated).toBe(false);
			expect(state.user).toBe(null);
			expect(state.loading).toBe(false);
			expect(state.error).toBe('Credenciales inválidas');
		});
	});

	describe('logout', () => {
		it('debería limpiar estado al hacer logout', async () => {
			const { authService } = await import('../services/authService.js');

			authService.logout.mockResolvedValueOnce({
				success: true
			});

			const result = await authStore.logout();

			expect(result.success).toBe(true);

			const state = get(authStore);
			expect(state.isAuthenticated).toBe(false);
			expect(state.user).toBe(null);
			expect(state.loading).toBe(false);
			expect(state.error).toBe(null);
		});
	});

	describe('register', () => {
		it('debería registrar usuario exitosamente', async () => {
			const { authService } = await import('../services/authService.js');

			authService.register.mockResolvedValueOnce({
				success: true,
				message: 'Usuario registrado'
			});

			const result = await authStore.register({
				fullName: 'Test User',
				email: 'test@example.com',
				password: 'password'
			});

			expect(result.success).toBe(true);

			const state = get(authStore);
			expect(state.loading).toBe(false);
			expect(state.error).toBe(null);
		});
	});

	describe('utility methods', () => {
		it('clearError debería limpiar errores', () => {
			// Simular un error
			authStore.login({ email: 'test', password: 'wrong' });

			authStore.clearError();

			const state = get(authStore);
			expect(state.error).toBe(null);
		});

		it('updateUser debería actualizar datos del usuario', () => {
			const newUserData = { name: 'Updated Name' };

			authStore.updateUser(newUserData);

			const state = get(authStore);
			expect(state.user).toEqual(expect.objectContaining(newUserData));
		});
	});
});
