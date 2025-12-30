<script>
	import { createEventDispatcher } from 'svelte';

	export let isAuthenticated = false;
	export let user = null;

	const dispatch = createEventDispatcher();

	function handleLogin() {
		dispatch('close');
		dispatch('register'); // Reutilizamos el evento register para login también
	}

	function handleRegister() {
		dispatch('close');
		dispatch('register');
	}

	function handleProfile() {
		dispatch('close');
		dispatch('profile');
	}

	function handleControlPanel() {
		dispatch('close');
		dispatch('controlpanel');
	}

	function handleLogout() {
		dispatch('logout');
	}
</script>

<div class="account-menu-container">
	{#if isAuthenticated}
		<!-- Estado 2: Usuario con sesión activa -->
		<div
			class="authenticated-menu bg-gray-800/80 backdrop-blur-md shadow-lg border
					rounded-xl overflow-hidden min-w-48 animate-in slide-in-from-top-2 duration-150"
		>
			<!-- Header del usuario -->
			<div class="user-header p-3 border-b border-gray-700/40">
				<div class="flex items-center gap-3">
					<div class="user-info flex-1 min-w-0">
						<p class="user-name text-white font-medium text-sm truncate text-center">
							{user?.full_name || 'Usuario'}
						</p>
					</div>
				</div>
			</div>

			<!-- Opciones del menú autenticado -->
			<div class="menu-options py-2">
				<button
					class="menu-item w-full px-4 py-2.5 text-left text-white hover:bg-gray-700/40
						   transition-all duration-150 flex items-center gap-3 text-sm group"
					on:click={handleProfile}
				>
					<svg
						class="w-4 h-4 text-gray-400 group-hover:text-white transition-colors"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
						/>
					</svg>
					Mi perfil
				</button>

				<button
					class="menu-item w-full px-4 py-2.5 text-left text-white hover:bg-gray-700/40
						   transition-all duration-150 flex items-center gap-3 text-sm group"
					on:click={handleControlPanel}
				>
					<svg
						class="w-4 h-4 text-gray-400 group-hover:text-white transition-colors"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 13a1 1 0 011-1h4a1 1 0 011 1v6a1 1 0 01-1 1h-4a1 1 0 01-1-1v-6z"
						/>
					</svg>
					Panel de control
				</button>

				<hr class="border-gray-700/40 my-4 mx-2" />

				<button
					class="menu-item w-full px-4 py-2.5 text-left text-red-300 hover:bg-red-500/15 hover:text-red-200
						   transition-all duration-150 flex items-center gap-3 text-sm group"
					on:click={handleLogout}
				>
					<svg
						class="w-4 h-4 group-hover:text-red-200 transition-colors"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
						/>
					</svg>
					Cerrar sesión
				</button>
			</div>
		</div>
	{:else}
		<!-- Estado 1: Usuario sin sesión -->
		<div
			class="unauthenticated-menu bg-gray-800/80 backdrop-blur-md shadow-lg border border-gray-700/50
					rounded-xl overflow-hidden min-w-44 animate-in slide-in-from-top-2 duration-150"
		>
			<!-- Opciones del menú no autenticado -->
			<div class="menu-options py-2">
				<button
					class="menu-item w-full px-4 py-3 text-left text-white hover:bg-gray-700/40
						   transition-all duration-150 flex items-center gap-3 text-sm group"
					on:click={handleLogin}
				>
					<svg
						class="w-4 h-4 text-gray-400 group-hover:text-white transition-colors"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
						/>
					</svg>
					Iniciar sesión
				</button>

				<button
					class="menu-item w-full px-4 py-3 text-left text-white hover:bg-gray-700/40
						   transition-all duration-150 flex items-center gap-3 text-sm group"
					on:click={handleRegister}
				>
					<svg
						class="w-4 h-4 text-gray-400 group-hover:text-white transition-colors"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
						/>
					</svg>
					Crear cuenta
				</button>
			</div>
		</div>
	{/if}
</div>

<style>
	.authenticated-menu {
		box-shadow:
			0 0 0 2px rgba(0, 168, 120, 0.4),
			0 0 0 4px rgba(255, 255, 255, 0.1);
		padding: 0.5rem;
	}

	.unauthenticated-menu {
		padding: 0.5rem;
	}

	.account-menu-container {
		/* Animación de entrada suave con escala y opacidad */
		animation: menuSlideIn 0.15s ease-out;
	}

	.menu-item:hover {
		/* Efecto sutil de deslizamiento al hacer hover */
		transform: translateX(2px);
	}

	@keyframes menuSlideIn {
		from {
			opacity: 0;
			transform: translateY(-4px) scale(0.98);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	/* Responsive adjustments */
	@media (max-width: 640px) {
		.unauthenticated-menu {
			min-width: 10rem;
		}

		.authenticated-menu {
			min-width: 11rem;
		}
	}
</style>
