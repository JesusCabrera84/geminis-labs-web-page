<script>
	import '../app.css';
	import favicon from '$lib/assets/favicon.png';
	import { onMount } from 'svelte';
	import { initializeTheme } from '$lib/theme.js';
	import ThemeSelector from '$lib/components/ThemeSelector.svelte';
	import ToastContainer from '$lib/components/ToastContainer.svelte';
	import PageTransition from '$lib/components/PageTransition.svelte';
	import { authStore } from '$lib/stores/authStore.js';
	import { SHOW_THEME_SELECTOR } from '$lib/config.js';

	let { children } = $props();

	// Inicializar el sistema de temas y autenticación al cargar la aplicación
	onMount(() => {
		initializeTheme();
		authStore.init();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</svelte:head>

<!-- Selector de temas temporal -->
{#if SHOW_THEME_SELECTOR}
	<ThemeSelector />
{/if}

<!-- Contenedor de notificaciones -->
<ToastContainer />

<!-- Transiciones de página -->
<PageTransition />

{@render children?.()}
