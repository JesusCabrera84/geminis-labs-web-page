<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { isAuthenticated } from '$lib/stores/authStore.js';
	import Navbar from '$lib/components/Navbar.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';

	// Verificar autenticación
	onMount(() => {
		if (!$isAuthenticated) {
			goto('/auth');
		}
	});
</script>

<svelte:head>
	<title>Panel de Control - Geminis Labs</title>
	<meta name="description" content="Panel de control de administración de Geminis Labs" />
</svelte:head>

<!-- Navbar -->
<Navbar />

<!-- Sidebar -->
<Sidebar />

<!-- Contenedor principal -->
<main class="control-panel-main">
	<div class="control-panel-content">
		<!-- Header -->
		<div class="dashboard-header">
			<h1>Panel de Control</h1>
			<p class="welcome-message">Bienvenido a tu panel de administración</p>
		</div>

		<!-- Grid de secciones -->
		<div class="dashboard-grid">
			<!-- Sección de Productos -->
			<section class="dashboard-card">
				<h2 class="card-title">
					<span class="card-icon">📦</span>
					Productos
				</h2>
				<div class="card-content">
					<p class="placeholder-text">Contenido próximamente...</p>
				</div>
			</section>

			<!-- Sección de Planes -->
			<section class="dashboard-card">
				<h2 class="card-title">
					<span class="card-icon">💎</span>
					Planes
				</h2>
				<div class="card-content">
					<p class="placeholder-text">Contenido próximamente...</p>
				</div>
			</section>
		</div>
	</div>
</main>

<style>
	/* ===================================================================
	   CONTENEDOR PRINCIPAL
	   ================================================================== */
	.control-panel-main {
		min-height: calc(100vh - 70px);
		background: linear-gradient(
			270deg,
			rgba(31, 41, 55, 0.95) 0%,
			rgba(28, 36, 48, 0.95) 50%,
			rgba(24, 31, 42, 0.95) 100%
		);
		padding: 2rem;
		margin-top: 70px; /* Espacio para el navbar fijo */
		margin-left: 260px; /* Espacio para el sidebar */
		transition: margin-left 0.3s ease;
		position: relative;
	}

	.control-panel-main::after {
		content: '';
		position: fixed;
		top: 70px;
		left: 260px;
		right: 0;
		bottom: 0;
		background-image: url('/img/noise.png');
		background-repeat: repeat;
		opacity: 0.03;
		pointer-events: none;
		z-index: 1;
	}

	.control-panel-content {
		max-width: 1400px;
		margin: 0 auto;
		position: relative;
		z-index: 2;
	}

	/* ===================================================================
	   DASHBOARD HEADER
	   ================================================================== */
	.dashboard-header {
		margin-bottom: 2.5rem;
		padding-bottom: 1.5rem;
	}

	.dashboard-header h1 {
		color: rgba(226, 232, 240, 1);
		font-size: 2.5rem;
		margin-bottom: 0.5rem;
		font-weight: 700;
		letter-spacing: -0.5px;
	}

	.welcome-message {
		color: rgba(148, 163, 184, 0.9);
		font-size: 1.125rem;
		line-height: 1.6;
		margin: 0;
	}

	/* ===================================================================
	   DASHBOARD GRID
	   ================================================================== */
	.dashboard-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
		gap: 2rem;
		margin-top: 2rem;
	}

	/* ===================================================================
	   DASHBOARD CARDS
	   ================================================================== */
	.dashboard-card {
		border-radius: 12px;
		padding: 0;
		overflow: hidden;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
		transition: all 0.3s ease;
	}

	.card-title {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 1.5rem 2rem;
		margin: 0;
		background: rgba(28, 36, 48, 1);
		color: rgba(226, 232, 240, 1);
		font-size: 1.25rem;
		font-weight: 600;
	}

	.card-icon {
		font-size: 1.5rem;
		filter: drop-shadow(0 0 8px rgba(99, 102, 241, 0.3));
	}

	.card-content {
		padding: 2rem;
		min-height: 200px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.placeholder-text {
		color: rgba(148, 163, 184, 0.7);
		font-size: 0.9375rem;
		font-style: italic;
		margin: 0;
	}

	/* ===================================================================
	   RESPONSIVE
	   ================================================================== */
	@media (max-width: 1024px) {
		.control-panel-main {
			margin-left: 220px;
		}

		.dashboard-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 768px) {
		.control-panel-main {
			padding: 1rem;
			margin-left: 0;
		}

		.dashboard-header h1 {
			font-size: 2rem;
		}

		.dashboard-grid {
			gap: 1.5rem;
			grid-template-columns: 1fr;
		}

		.card-title {
			padding: 1.25rem 1.5rem;
			font-size: 1.125rem;
		}

		.card-content {
			padding: 1.5rem;
			min-height: 150px;
		}
	}
</style>
