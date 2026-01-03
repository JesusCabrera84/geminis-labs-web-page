import { apiClient } from './apiClient.js';
import { API_CONFIG } from '$lib/config/api.js';

/**
 * Servicio para manejar operaciones relacionadas con organizaciones
 */
class OrganizationService {
	/**
	 * Obtiene la lista de todas las organizaciones del usuario
	 */
	async getOrganizations() {
		const token = this.getAccessToken();
		return apiClient.get(API_CONFIG.ENDPOINTS.ORGANIZATIONS, {}, token);
	}

	/**
	 * Obtiene una organización específica por su ID
	 */
	async getOrganizationById(id) {
		const token = this.getAccessToken();
		return apiClient.get(`${API_CONFIG.ENDPOINTS.ORGANIZATIONS}/${id}`, {}, token);
	}

	/**
	 * Actualiza los datos de una organización
	 */
	async updateOrganization(id, data) {
		const token = this.getAccessToken();
		return apiClient.patch(`${API_CONFIG.ENDPOINTS.ORGANIZATIONS}/${id}`, data, token);
	}

	/**
	 * Lista los usuarios de una organización
	 */
	async getOrganizationUsers(orgId) {
		const token = this.getAccessToken();
		return apiClient.get(`${API_CONFIG.ENDPOINTS.ORGANIZATIONS}/${orgId}/users`, {}, token);
	}

	/**
	 * Agrega un usuario a una organización
	 */
	async addOrganizationUser(orgId, userData) {
		const token = this.getAccessToken();
		return apiClient.post(`${API_CONFIG.ENDPOINTS.ORGANIZATIONS}/${orgId}/users`, userData, token);
	}

	/**
	 * Cambia el rol de un usuario en la organización
	 */
	async updateOrganizationUserRole(orgId, userId, role) {
		const token = this.getAccessToken();
		return apiClient.patch(
			`${API_CONFIG.ENDPOINTS.ORGANIZATIONS}/${orgId}/users/${userId}`,
			{ role },
			token
		);
	}

	/**
	 * Elimina un usuario de la organización
	 */
	async removeOrganizationUser(orgId, userId) {
		const token = this.getAccessToken();
		return apiClient.delete(
			`${API_CONFIG.ENDPOINTS.ORGANIZATIONS}/${orgId}/users/${userId}`,
			{},
			token
		);
	}

	/**
	 * Obtiene el total de organizaciones que tiene el usuario
	 */
	async getTotalOrganizations() {
		const organizations = await this.getOrganizations();
		return organizations.length;
	}

	/**
	 * Obtiene el token de acceso (Cognito ID Token) del almacenamiento
	 */
	getAccessToken() {
		if (typeof window === 'undefined') return null;
		return sessionStorage.getItem('geminis_id_token');
	}
}

export const organizationService = new OrganizationService();
