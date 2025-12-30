<script>
	import { onMount } from 'svelte';
	import { setTheme, getCurrentTheme, getAllThemes } from '$lib/theme.js';

	// Importar estilos específicos del componente
	import '$lib/styles/theme-selector.css';

	let isOpen = false;
	let currentTheme = 'default';
	let themes = {};

	onMount(() => {
		themes = getAllThemes();
		currentTheme = getCurrentTheme();

		// Escuchar cambios de tema
		document.addEventListener('themeChanged', (event) => {
			currentTheme = event.detail.theme;
		});
	});

	function handleThemeChange(themeName) {
		setTheme(themeName);
		currentTheme = themeName;
		isOpen = false;
	}

	function toggleSelector() {
		isOpen = !isOpen;
	}

	// Cerrar al hacer clic fuera
	function handleClickOutside(event) {
		if (!event.target.closest('.theme-selector')) {
			isOpen = false;
		}
	}

	onMount(() => {
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});
</script>

<!-- Selector de temas flotante -->
<div class="theme-selector" class:open={isOpen}>
	<!-- Botón activador -->
	<button class="theme-toggle-btn" on:click={toggleSelector} title="Cambiar tema">
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
			<circle cx="12" cy="12" r="5" />
			<path
				d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
			/>
		</svg>
		<span class="theme-name">{themes[currentTheme]?.name || 'Default'}</span>
	</button>

	<!-- Panel de opciones -->
	{#if isOpen}
		<div class="theme-dropdown">
			<div class="theme-header">
				<h3>🎨 Selector de Temas</h3>
				<p>Temporal para testing</p>
			</div>

			<div class="theme-options">
				{#each Object.entries(themes) as [key, config] (key)}
					<button
						class="theme-option"
						class:active={currentTheme === key}
						on:click={() => handleThemeChange(key)}
					>
						<div class="theme-preview">
							<div
								class="color-dot primary"
								style="background-color: {config.colors.primary}"
							></div>
							<div class="color-dot accent" style="background-color: {config.colors.accent}"></div>
							<div
								class="color-dot secondary"
								style="background-color: {config.colors.secondary}"
							></div>
						</div>
						<div class="theme-info">
							<span class="theme-title">{config.name}</span>
							<span class="theme-desc">{config.description}</span>
						</div>
						{#if currentTheme === key}
							<div class="active-indicator">✓</div>
						{/if}
					</button>
				{/each}
			</div>

			<div class="theme-footer">
				<small>💡 Usa <code>setTheme('nombre')</code> en consola</small>
			</div>
		</div>
	{/if}
</div>

<style>
	.theme-selector {
		display: none;
		position: fixed;
		top: 100px;
		right: 20px;
		z-index: 1002;
		font-family: var(--font-primary, 'Inter', sans-serif);
	}

	.theme-toggle-btn {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1rem;
		background: var(--color-glass-bg, rgba(34, 40, 49, 0.9));
		border: 1px solid var(--color-glass-border, rgba(216, 215, 204, 0.2));
		border-radius: 12px;
		color: var(--color-text-primary, #d8d7cc);
		cursor: pointer;
		transition: all 0.3s ease;
		backdrop-filter: blur(20px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
		font-size: 0.9rem;
		min-width: 140px;
	}

	.theme-toggle-btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
		border-color: var(--color-accent-primary, #00a6c0);
	}

	.theme-toggle-btn svg {
		width: 18px;
		height: 18px;
		color: var(--color-accent-primary, #00a6c0);
	}

	.theme-name {
		font-weight: 500;
	}

	.theme-dropdown {
		position: absolute;
		top: 60px;
		right: 0;
		min-width: 320px;
		background: var(--color-glass-bg, rgba(34, 40, 49, 0.95));
		border: 1px solid var(--color-glass-border, rgba(216, 215, 204, 0.2));
		border-radius: 16px;
		backdrop-filter: blur(20px);
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
		overflow: hidden;
		animation: slideDown 0.3s ease;
	}

	@keyframes slideDown {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.theme-header {
		padding: 1.5rem 1.5rem 1rem;
		border-bottom: 1px solid var(--color-glass-border, rgba(216, 215, 204, 0.1));
	}

	.theme-header h3 {
		margin: 0 0 0.25rem 0;
		color: var(--color-accent-primary, #00a6c0);
		font-size: 1.1rem;
		font-weight: 600;
	}

	.theme-header p {
		margin: 0;
		color: var(--color-text-muted, rgba(216, 215, 204, 0.6));
		font-size: 0.85rem;
	}

	.theme-options {
		padding: 0.5rem;
		max-height: 300px;
		overflow-y: auto;
	}

	.theme-option {
		display: flex;
		align-items: center;
		gap: 1rem;
		width: 100%;
		padding: 1rem;
		background: transparent;
		border: 1px solid transparent;
		border-radius: 12px;
		cursor: pointer;
		transition: all 0.3s ease;
		margin-bottom: 0.5rem;
		text-align: left;
	}

	.theme-option:hover {
		background: var(--color-glass-border, rgba(216, 215, 204, 0.1));
		border-color: var(--color-accent-primary, #00a6c0);
		transform: translateX(4px);
	}

	.theme-option.active {
		background: var(--color-accent-primary, #00a6c0);
		background: linear-gradient(
			135deg,
			var(--color-accent-primary, #00a6c0),
			var(--color-accent-hover, #0088a3)
		);
		color: white;
		border-color: var(--color-accent-primary, #00a6c0);
	}

	.theme-option.active .theme-desc {
		color: rgba(255, 255, 255, 0.8);
	}

	.theme-preview {
		display: flex;
		gap: 4px;
		flex-shrink: 0;
	}

	.color-dot {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

	.theme-info {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.theme-title {
		font-weight: 600;
		font-size: 0.95rem;
		color: var(--color-text-primary, #d8d7cc);
	}

	.theme-option.active .theme-title {
		color: white;
	}

	.theme-desc {
		font-size: 0.8rem;
		color: var(--color-text-muted, rgba(216, 215, 204, 0.6));
		line-height: 1.3;
	}

	.active-indicator {
		color: white;
		font-weight: bold;
		font-size: 1.1rem;
	}

	.theme-footer {
		padding: 1rem 1.5rem;
		border-top: 1px solid var(--color-glass-border, rgba(216, 215, 204, 0.1));
		background: var(--color-glass-border, rgba(216, 215, 204, 0.05));
	}

	.theme-footer small {
		color: var(--color-text-muted, rgba(216, 215, 204, 0.6));
		font-size: 0.75rem;
	}

	.theme-footer code {
		background: var(--color-glass-bg, rgba(34, 40, 49, 0.5));
		padding: 0.2rem 0.4rem;
		border-radius: 4px;
		font-family: 'Monaco', 'Consolas', monospace;
		color: var(--color-accent-primary, #00a6c0);
	}

	/* Responsive */
	@media (max-width: 768px) {
		.theme-selector {
			top: 80px;
			right: 10px;
		}

		.theme-dropdown {
			min-width: 280px;
			right: -10px;
		}

		.theme-toggle-btn {
			padding: 0.6rem 0.8rem;
			font-size: 0.85rem;
			min-width: 120px;
		}
	}
</style>
