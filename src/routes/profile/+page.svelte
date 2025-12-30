<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import {
		userStore,
		currentUser,
		associatedUsers,
		userLoading,
		userError,
		isMasterUser
	} from '$lib/stores/userStore.js';
	import { isAuthenticated } from '$lib/stores/authStore.js';
	import { toastStore } from '$lib/stores/toastStore.js';
	import { userService } from '$lib/services/userService.js';
	import ProfileView from '$lib/components/ProfileView.svelte';
	import AccountSwitch from '$lib/components/AccountSwitch.svelte';

	// Estado del componente
	let mounted = false; // eslint-disable-line no-unused-vars
	let pageLoading = true;

	// Verificar autenticación y cargar datos
	onMount(async () => {
		// Verificar si el usuario está autenticado
		if (!$isAuthenticated) {
			goto('/auth');
			return;
		}

		mounted = true;

		// Cargar datos del perfil
		try {
			const result = await userStore.loadProfileData();
			if (!result.success) {
				if (result.message?.includes('401') || result.message?.includes('Sesión expirada')) {
					toastStore.add('Sesión expirada. Por favor, inicia sesión nuevamente.', 'error');
					goto('/auth');
					return;
				}
				toastStore.add(result.message || 'Error al cargar el perfil', 'error');
			}
		} catch {
			toastStore.add('Error al cargar el perfil', 'error');
		} finally {
			pageLoading = false;
		}
	});

	// Manejar cambio de contraseña
	async function handleChangePassword(event) {
		const { oldPassword, newPassword, onSuccess, onError, onComplete } = event.detail;

		try {
			const result = await userService.changePassword(oldPassword, newPassword);

			if (result.success) {
				toastStore.success(result.message || 'Contraseña actualizada correctamente.');
				onSuccess();
			} else {
				onError(result.error || { message: result.message });
			}
		} catch (error) {
			onError(error);
		} finally {
			onComplete();
		}
	}
</script>

<svelte:head>
	<title>Mi Perfil - Geminis Labs</title>
	<meta name="description" content="Gestiona tu perfil y configuración de cuenta en Geminis Labs" />
</svelte:head>

<!-- Navbar igual que la página principal -->
<nav class="navbar">
	<div class="nav-container">
		<div class="nav-logo">
			<a href="/">
				<picture>
					<img src="/img/geminis-labs-logo-short.png" alt="Geminis Labs Logo" />
				</picture>
				<h1>Geminis Labs</h1>
			</a>
		</div>

		<!-- Menú de escritorio -->
		<ul class="nav-menu desktop-menu">
			<li><a href="/#inicio">Inicio</a></li>
			<li><a href="/#servicios">Servicios</a></li>
			<li><a href="/#productos">Productos</a></li>
			<li><a href="/#nosotros">Nosotros</a></li>
			<li><a href="/#contacto">Contacto</a></li>
		</ul>

		<!-- Switch de cuenta y botón hamburguesa -->
		<div class="nav-actions flex items-center gap-4">
			<!-- Switch de cuenta moderno -->
			<AccountSwitch />

			<!-- Botón hamburguesa para móvil -->
			<button class="mobile-menu-button" aria-label="Toggle menu">
				<span class="hamburger-line"></span>
				<span class="hamburger-line"></span>
				<span class="hamburger-line"></span>
			</button>
		</div>
	</div>
</nav>

<!-- Contenedor principal simple -->
<main class="profile-main">
	{#if pageLoading}
		<!-- Loading simple -->
		<div class="loading-container">
			<div class="loading-spinner"></div>
			<p>Cargando perfil...</p>
		</div>
	{:else}
		<!-- Vista unificada de perfil -->
		<div class="profile-content">
			<ProfileView
				user={$currentUser}
				users={$associatedUsers}
				loading={$userLoading}
				error={$userError}
				isMaster={$isMasterUser}
				on:changePassword={handleChangePassword}
			/>
		</div>
	{/if}
</main>

<style>
	/* ===================================================================
	   NAVBAR STYLES (exactos de la página principal)
	   ================================================================== */
	.navbar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 1000;
		background: var(--color-bg-primary);
		backdrop-filter: blur(20px);
		border-bottom: 1px solid var(--glass-border);
		transition: all 0.3s ease;
	}

	.nav-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 1rem 2rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.nav-logo {
		display: flex;
		align-items: center;
		gap: 3rem;
	}

	.nav-logo a {
		display: flex;
		align-items: center;
		gap: 1rem;
		text-decoration: none;
	}

	.nav-logo img {
		height: 40px;
		width: auto;
	}

	.nav-logo h1 {
		font-family:
			'Dune Rise',
			'Inter',
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			sans-serif;
		font-size: 1.8rem;
		font-weight: normal;
		color: var(--color-accent-primary);
		text-shadow: 0 0 20px rgba(0, 166, 192, 0.5);
		margin: 0;
		text-transform: uppercase;
		letter-spacing: 1px;
	}

	.nav-menu {
		display: flex;
		list-style: none;
		margin: 0;
		padding: 0;
		gap: 2rem;
	}

	.nav-menu li a {
		color: rgba(255, 255, 255, 0.8);
		text-decoration: none;
		font-size: 0.95rem;
		font-weight: 500;
		transition: all 0.3s ease;
		position: relative;
		padding: 0.5rem 0;
	}

	.nav-menu li a::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 0;
		height: 2px;
		background: #00a6c0;
		transition: width 0.3s ease;
	}

	.nav-menu li a:hover {
		color: #ffffff;
	}

	.nav-menu li a:hover::after {
		width: 100%;
	}

	.nav-actions {
		display: flex;
		align-items: center;
	}

	.mobile-menu-button {
		display: none;
		flex-direction: column;
		justify-content: space-between;
		width: 30px;
		height: 20px;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		z-index: 1001;
	}

	.hamburger-line {
		width: 100%;
		height: 2px;
		background: #ffffff;
		transition: all 0.3s ease;
	}

	@media (max-width: 900px) {
		.desktop-menu {
			display: none;
		}

		.mobile-menu-button {
			display: flex;
		}

		.navbar {
			padding: 1rem;
		}

		.nav-logo h1 {
			font-size: 1.2rem;
		}

		.nav-logo img {
			height: 32px;
		}
	}

	/* ===================================================================
	   CONTENEDOR PRINCIPAL
	   ================================================================== */
	.profile-main {
		min-height: calc(100vh - 80px);
		background: linear-gradient(135deg, #0f1620 0%, #1a2332 50%, #0f1620 100%);
		padding: 2rem;
		margin-top: 70px; /* Espacio para el navbar fijo */
	}

	.profile-content {
		max-width: 1200px;
		margin: 0 auto;
	}

	/* ===================================================================
	   LOADING STATE
	   ================================================================== */
	.loading-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 60vh;
		gap: 1.5rem;
	}

	.loading-spinner {
		width: 48px;
		height: 48px;
		border: 3px solid rgba(0, 166, 192, 0.1);
		border-top-color: #00a6c0;
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.loading-container p {
		color: var(--color-text-muted);
		font-size: 0.875rem;
	}

	/* ===================================================================
	   RESPONSIVE
	   ================================================================== */
	@media (max-width: 768px) {
		.profile-main {
			padding: 1rem;
		}
	}
</style>
