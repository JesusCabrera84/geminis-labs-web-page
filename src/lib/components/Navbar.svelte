<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import AccountSwitch from '$lib/components/AccountSwitch.svelte';

	let mobileMenuOpen = false;
	let innerWidth;
	let scrollY;

	// Funciones para el menú móvil
	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}

	onMount(() => {
		// Cerrar menú móvil al hacer clic fuera de él
		const handleClickOutside = (event) => {
			const navbar = document.querySelector('.navbar');
			if (mobileMenuOpen && navbar && !navbar.contains(event.target)) {
				closeMobileMenu();
			}
		};

		document.addEventListener('click', handleClickOutside);

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});

	// Helper function for hash links
	function getLinkHref(hash) {
		if ($page.url.pathname === '/') {
			return hash;
		}
		return `/${hash}`;
	}
</script>

<svelte:window bind:scrollY bind:innerWidth />

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
			<li><a href={getLinkHref('#inicio')} on:click={closeMobileMenu}>Inicio</a></li>
			<li><a href={getLinkHref('#servicios')} on:click={closeMobileMenu}>Servicios</a></li>
			<li><a href={getLinkHref('#productos')} on:click={closeMobileMenu}>Productos</a></li>
			<li><a href={getLinkHref('#nosotros')} on:click={closeMobileMenu}>Nosotros</a></li>
			<li><a href={getLinkHref('#contacto')} on:click={closeMobileMenu}>Contacto</a></li>
		</ul>

		<!-- Switch de cuenta y botón hamburguesa -->
		<div class="nav-actions flex items-center gap-4">
			<!-- Switch de cuenta moderno -->
			<AccountSwitch />

			<!-- Botón hamburguesa para móvil -->
			<button class="mobile-menu-button" on:click={toggleMobileMenu} aria-label="Toggle menu">
				<span class="hamburger-line" class:active={mobileMenuOpen}></span>
				<span class="hamburger-line" class:active={mobileMenuOpen}></span>
				<span class="hamburger-line" class:active={mobileMenuOpen}></span>
			</button>
		</div>
	</div>

	<!-- Menú móvil -->
	{#if mobileMenuOpen}
		<div class="mobile-menu" class:active={mobileMenuOpen}>
			<ul class="mobile-nav-menu">
				<li><a href={getLinkHref('#inicio')} on:click={closeMobileMenu}>Inicio</a></li>
				<li><a href={getLinkHref('#servicios')} on:click={closeMobileMenu}>Servicios</a></li>
				<li><a href={getLinkHref('#productos')} on:click={closeMobileMenu}>Productos</a></li>
				<li><a href={getLinkHref('#nosotros')} on:click={closeMobileMenu}>Nosotros</a></li>
				<li><a href={getLinkHref('#contacto')} on:click={closeMobileMenu}>Contacto</a></li>
			</ul>
		</div>
	{/if}
</nav>

<style>
	/* Navbar Styles */
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
		gap: 3rem;
		text-decoration: none;
	}

	.nav-logo img {
		height: 50px;
		width: 50px;
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
		font-weight: 400;
		color: var(--color-accent-primary);
		text-shadow: 0 0 20px rgba(0, 166, 192, 0.5);
		margin: 0;
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

	.hamburger-line.active:nth-child(1) {
		transform: translateY(9px) rotate(45deg);
	}

	.hamburger-line.active:nth-child(2) {
		opacity: 0;
	}

	.hamburger-line.active:nth-child(3) {
		transform: translateY(-9px) rotate(-45deg);
	}

	.mobile-menu {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		background: rgba(15, 22, 32, 0.98);
		backdrop-filter: blur(20px);
		z-index: 999;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		animation: menuFadeIn 0.3s ease;
	}

	.mobile-nav-menu {
		list-style: none;
		padding: 0;
		margin: 0;
		text-align: center;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.mobile-nav-menu li a {
		color: #ffffff;
		text-decoration: none;
		font-size: 1.5rem;
		font-weight: 600;
		transition: all 0.3s ease;
		display: inline-block;
	}

	.mobile-nav-menu li a:hover {
		color: #00a6c0;
		transform: scale(1.1);
	}

	@keyframes menuFadeIn {
		from {
			opacity: 0;
			transform: translateX(100%);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	/* Responsive */
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
</style>
