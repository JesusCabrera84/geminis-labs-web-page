<script>
	import { pageTransitionStore } from '$lib/stores/pageTransitionStore.js';

	// Suscribirse al store de transiciones
	$: ({ isTransitioning, transitionType } = $pageTransitionStore);
</script>

<!-- Overlay de transición -->
{#if isTransitioning}
	<div class="page-transition-overlay {transitionType}"></div>
{/if}

<style>
	.page-transition-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 9999;
		pointer-events: none;
	}

	/* Transición de desvanecimiento */
	.fade {
		background: linear-gradient(
			135deg,
			rgba(34, 40, 49, 0.95) 0%,
			rgba(40, 59, 72, 0.95) 50%,
			rgba(34, 40, 49, 0.95) 100%
		);
		backdrop-filter: blur(10px);
		animation: fadeInOverlay 0.3s ease-out;
	}

	/* Transición de deslizamiento */
	.slide {
		background: linear-gradient(
			90deg,
			transparent 0%,
			rgba(34, 40, 49, 0.98) 50%,
			transparent 100%
		);
		backdrop-filter: blur(15px);
		animation: slideInOverlay 0.4s ease-out;
	}

	/* Transición de blur */
	.blur {
		background: rgba(34, 40, 49, 0.8);
		backdrop-filter: blur(20px);
		animation: blurInOverlay 0.35s ease-out;
	}

	@keyframes fadeInOverlay {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes slideInOverlay {
		from {
			opacity: 0;
			transform: translateX(-100%);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	@keyframes blurInOverlay {
		from {
			opacity: 0;
			backdrop-filter: blur(0px);
		}
		to {
			opacity: 1;
			backdrop-filter: blur(20px);
		}
	}
</style>
