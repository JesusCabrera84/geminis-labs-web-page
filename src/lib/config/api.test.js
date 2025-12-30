import { describe, it, expect } from 'vitest';
import { API_CONFIG, buildApiUrl, getAuthHeaders } from './api.js';

describe('API Configuration', () => {
	describe('API_CONFIG', () => {
		it('debería tener configuración base definida', () => {
			expect(API_CONFIG).toBeDefined();
			expect(typeof API_CONFIG).toBe('object');
		});

		it('debería tener BASE_URL definida', () => {
			expect(API_CONFIG.BASE_URL).toBeDefined();
			expect(typeof API_CONFIG.BASE_URL).toBe('string');
		});

		it('debería tener endpoints definidos', () => {
			expect(API_CONFIG.ENDPOINTS).toBeDefined();
			expect(typeof API_CONFIG.ENDPOINTS).toBe('object');
		});

		it('debería tener endpoints de autenticación', () => {
			expect(API_CONFIG.ENDPOINTS.LOGIN).toBeDefined();
			expect(API_CONFIG.ENDPOINTS.REFRESH_TOKEN).toBeDefined();
			expect(typeof API_CONFIG.ENDPOINTS.LOGIN).toBe('string');
		});

		it('debería tener endpoints de usuarios', () => {
			expect(API_CONFIG.ENDPOINTS.GET_USER_ME).toBeDefined();
			expect(API_CONFIG.ENDPOINTS.GET_USERS).toBeDefined();
			expect(typeof API_CONFIG.ENDPOINTS.GET_USER_ME).toBe('string');
		});

		it('debería tener headers por defecto', () => {
			expect(API_CONFIG.DEFAULT_HEADERS).toBeDefined();
			expect(API_CONFIG.DEFAULT_HEADERS['Content-Type']).toBe('application/json');
			expect(API_CONFIG.DEFAULT_HEADERS.Accept).toBe('application/json');
		});
	});

	describe('buildApiUrl', () => {
		it('debería construir URLs correctamente', () => {
			const endpoint = '/api/v1/test';
			const fullUrl = buildApiUrl(endpoint);

			expect(fullUrl).toContain(API_CONFIG.BASE_URL);
			expect(fullUrl).toContain(endpoint);
		});
	});

	describe('getAuthHeaders', () => {
		it('debería retornar headers por defecto sin token', () => {
			const headers = getAuthHeaders();

			expect(headers['Content-Type']).toBe('application/json');
			expect(headers.Accept).toBe('application/json');
			expect(headers.Authorization).toBeUndefined();
		});

		it('debería incluir Authorization header con token', () => {
			const token = 'test-token';
			const headers = getAuthHeaders(token);

			expect(headers.Authorization).toBe(`Bearer ${token}`);
		});
	});
});
