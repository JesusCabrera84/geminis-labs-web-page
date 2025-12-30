<script>
	import { page } from '$app/stores';

	// Estado de expansión de secciones
	let expandedSections = {
		organization: true,
		billing: false,
		products: false,
		nexus: false,
		orion: false,
		usage: false,
		settings: false
	};

	function toggleSection(section) {
		expandedSections[section] = !expandedSections[section];
	}

	// Determinar si un item está activo
	function isActive(path) {
		return $page.url.pathname === path;
	}
</script>

<aside class="sidebar">
	<div class="sidebar-content">
		<!-- Organización -->
		<div class="menu-section">
			<button
				class="section-header"
				class:expanded={expandedSections.organization}
				on:click={() => toggleSection('organization')}
			>
				<svg class="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
					/>
				</svg>
				<span class="section-title">Organización</span>
				<svg
					class="chevron"
					class:rotated={expandedSections.organization}
					width="16"
					height="16"
					viewBox="0 0 16 16"
					fill="none"
				>
					<path
						d="M4 6L8 10L12 6"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</button>
			{#if expandedSections.organization}
				<div class="menu-items">
					<a
						href="/control-panel/organization/info"
						class:active={isActive('/control-panel/organization/info')}
					>
						<span class="item-dot"></span>
						Información
					</a>
					<a
						href="/control-panel/organization/users"
						class:active={isActive('/control-panel/organization/users')}
					>
						<span class="item-dot"></span>
						Usuarios
					</a>
					<a
						href="/control-panel/organization/roles"
						class:active={isActive('/control-panel/organization/roles')}
					>
						<span class="item-dot"></span>
						Roles y permisos
					</a>
				</div>
			{/if}
		</div>

		<!-- Facturación -->
		<div class="menu-section">
			<button
				class="section-header"
				class:expanded={expandedSections.billing}
				on:click={() => toggleSection('billing')}
			>
				<svg class="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
					/>
				</svg>
				<span class="section-title">Facturación</span>
				<svg
					class="chevron"
					class:rotated={expandedSections.billing}
					width="16"
					height="16"
					viewBox="0 0 16 16"
					fill="none"
				>
					<path
						d="M4 6L8 10L12 6"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</button>
			{#if expandedSections.billing}
				<div class="menu-items">
					<a
						href="/control-panel/billing/summary"
						class:active={isActive('/control-panel/billing/summary')}
					>
						<span class="item-dot"></span>
						Resumen
					</a>
					<a
						href="/control-panel/billing/payment-methods"
						class:active={isActive('/control-panel/billing/payment-methods')}
					>
						<span class="item-dot"></span>
						Métodos de pago
					</a>
					<a
						href="/control-panel/billing/invoices"
						class:active={isActive('/control-panel/billing/invoices')}
					>
						<span class="item-dot"></span>
						Facturas
					</a>
				</div>
			{/if}
		</div>

		<!-- Productos -->
		<div class="menu-section">
			<button
				class="section-header"
				class:expanded={expandedSections.products}
				on:click={() => toggleSection('products')}
			>
				<svg class="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
					/>
				</svg>
				<span class="section-title">Productos</span>
				<svg
					class="chevron"
					class:rotated={expandedSections.products}
					width="16"
					height="16"
					viewBox="0 0 16 16"
					fill="none"
				>
					<path
						d="M4 6L8 10L12 6"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</button>
			{#if expandedSections.products}
				<div class="menu-items">
					<!-- Nexus Subsection -->
					<button
						class="subsection-header"
						class:expanded={expandedSections.nexus}
						on:click={() => toggleSection('nexus')}
					>
						<span class="item-dot"></span>
						<span>Nexus</span>
						<svg
							class="chevron-small"
							class:rotated={expandedSections.nexus}
							width="14"
							height="14"
							viewBox="0 0 16 16"
							fill="none"
						>
							<path
								d="M4 6L8 10L12 6"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</button>
					{#if expandedSections.nexus}
						<div class="sub-items">
							<a
								href="/control-panel/products/nexus/status"
								class:active={isActive('/control-panel/products/nexus/status')}
							>
								– Estado
							</a>
							<a
								href="/control-panel/products/nexus/devices"
								class:active={isActive('/control-panel/products/nexus/devices')}
							>
								– Dispositivos
							</a>
							<a
								href="/control-panel/products/nexus/consumption"
								class:active={isActive('/control-panel/products/nexus/consumption')}
							>
								– Consumo
							</a>
						</div>
					{/if}

					<!-- Orion Subsection -->
					<button
						class="subsection-header"
						class:expanded={expandedSections.orion}
						on:click={() => toggleSection('orion')}
					>
						<span class="item-dot"></span>
						<span>Orion</span>
						<svg
							class="chevron-small"
							class:rotated={expandedSections.orion}
							width="14"
							height="14"
							viewBox="0 0 16 16"
							fill="none"
						>
							<path
								d="M4 6L8 10L12 6"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</button>
					{#if expandedSections.orion}
						<div class="sub-items">
							<a
								href="/control-panel/products/orion/api-keys"
								class:active={isActive('/control-panel/products/orion/api-keys')}
							>
								– API Keys
							</a>
							<a
								href="/control-panel/products/orion/limits"
								class:active={isActive('/control-panel/products/orion/limits')}
							>
								– Límites
							</a>
							<a
								href="/control-panel/products/orion/logs"
								class:active={isActive('/control-panel/products/orion/logs')}
							>
								– Logs
							</a>
							<a
								href="/control-panel/products/orion/playground"
								class:active={isActive('/control-panel/products/orion/playground')}
							>
								– Playground
							</a>
						</div>
					{/if}
				</div>
			{/if}
		</div>

		<!-- Uso -->
		<div class="menu-section">
			<button
				class="section-header"
				class:expanded={expandedSections.usage}
				on:click={() => toggleSection('usage')}
			>
				<svg class="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
					/>
				</svg>
				<span class="section-title">Uso</span>
				<svg
					class="chevron"
					class:rotated={expandedSections.usage}
					width="16"
					height="16"
					viewBox="0 0 16 16"
					fill="none"
				>
					<path
						d="M4 6L8 10L12 6"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</button>
			{#if expandedSections.usage}
				<div class="menu-items">
					<a
						href="/control-panel/usage/metrics"
						class:active={isActive('/control-panel/usage/metrics')}
					>
						<span class="item-dot"></span>
						Métricas
					</a>
					<a
						href="/control-panel/usage/history"
						class:active={isActive('/control-panel/usage/history')}
					>
						<span class="item-dot"></span>
						Historial
					</a>
				</div>
			{/if}
		</div>

		<!-- Configuración -->
		<div class="menu-section">
			<button
				class="section-header"
				class:expanded={expandedSections.settings}
				on:click={() => toggleSection('settings')}
			>
				<svg class="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
					/>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
					/>
				</svg>
				<span class="section-title">Configuración</span>
				<svg
					class="chevron"
					class:rotated={expandedSections.settings}
					width="16"
					height="16"
					viewBox="0 0 16 16"
					fill="none"
				>
					<path
						d="M4 6L8 10L12 6"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</button>
			{#if expandedSections.settings}
				<div class="menu-items">
					<a
						href="/control-panel/settings/webhooks"
						class:active={isActive('/control-panel/settings/webhooks')}
					>
						<span class="item-dot"></span>
						Webhooks
					</a>
					<a
						href="/control-panel/settings/integrations"
						class:active={isActive('/control-panel/settings/integrations')}
					>
						<span class="item-dot"></span>
						Integraciones
					</a>
					<a
						href="/control-panel/settings/audit"
						class:active={isActive('/control-panel/settings/audit')}
					>
						<span class="item-dot"></span>
						Auditoría
					</a>
				</div>
			{/if}
		</div>
	</div>
</aside>

<style>
	.sidebar {
		position: fixed;
		left: 0;
		top: 70px; /* Debajo del navbar */
		bottom: 0;
		width: 260px;
		background: linear-gradient(
			90deg,
			rgba(31, 41, 53, 0.94) 0%,
			rgba(28, 36, 48, 0.93) 50%,
			rgba(28, 36, 48, 0.93) 100%
		);
		backdrop-filter: blur(20px);
		border-right: none;
		overflow-y: auto;
		overflow-x: hidden;
		z-index: 900;
		box-shadow: 4px 0 24px rgba(0, 0, 0, 0.3);
	}

	.sidebar-content {
		padding: 1.5rem 0;
	}

	/* Secciones del menú */
	.menu-section {
		margin-bottom: 0.5rem;
	}

	.section-header {
		width: 100%;
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.75rem 1.25rem;
		background: transparent;
		border: none;
		color: rgba(226, 232, 240, 0.9);
		font-size: 0.875rem !important;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease;
		text-align: left;
		letter-spacing: 0.3px;
		line-height: 1.2;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
	}

	.section-header:hover {
		background: rgba(71, 85, 105, 0.2);
		color: rgba(255, 255, 255, 1);
	}

	.section-icon {
		width: 1.25rem;
		height: 1.25rem;
		flex-shrink: 0;
		color: rgba(147, 197, 253, 0.6);
		stroke-width: 2;
	}

	.section-title {
		flex: 1;
		font-size: 0.875rem !important;
		line-height: 1.2;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
	}

	.chevron {
		flex-shrink: 0;
		color: rgba(148, 163, 184, 0.6);
		transition: transform 0.2s ease;
	}

	.chevron.rotated {
		transform: rotate(180deg);
	}

	.chevron-small {
		flex-shrink: 0;
		color: rgba(148, 163, 184, 0.5);
		transition: transform 0.2s ease;
	}

	.chevron-small.rotated {
		transform: rotate(180deg);
	}

	/* Items del menú */
	.menu-items {
		display: flex;
		flex-direction: column;
		gap: 0.125rem;
		padding: 0.25rem 0;
		animation: slideDown 0.2s ease;
	}

	@keyframes slideDown {
		from {
			opacity: 0;
			transform: translateY(-8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.menu-items a {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.625rem 1.25rem 0.625rem 3rem;
		color: rgba(203, 213, 225, 0.8);
		text-decoration: none;
		font-size: 0.8125rem !important;
		font-weight: 500;
		transition: all 0.2s ease;
		position: relative;
		line-height: 1.2;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
	}

	.menu-items a:hover {
		background: rgba(71, 85, 105, 0.15);
		color: rgba(255, 255, 255, 0.95);
		padding-left: 3.25rem;
	}

	.menu-items a.active {
		background: linear-gradient(90deg, rgba(99, 102, 241, 0.15) 0%, rgba(99, 102, 241, 0.05) 100%);
		color: rgba(167, 139, 250, 1);
		border-left: 3px solid rgba(139, 92, 246, 0.8);
		font-weight: 600;
	}

	.menu-items a.active::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		width: 3px;
		background: linear-gradient(180deg, rgba(139, 92, 246, 0.8) 0%, rgba(99, 102, 241, 0.6) 100%);
		box-shadow: 0 0 12px rgba(139, 92, 246, 0.5);
	}

	.item-dot {
		width: 4px;
		height: 4px;
		border-radius: 50%;
		background: rgba(148, 163, 184, 0.5);
		flex-shrink: 0;
	}

	.menu-items a:hover .item-dot {
		background: rgba(167, 139, 250, 0.8);
		box-shadow: 0 0 8px rgba(167, 139, 250, 0.6);
	}

	.menu-items a.active .item-dot {
		background: rgba(167, 139, 250, 1);
		box-shadow: 0 0 10px rgba(167, 139, 250, 0.8);
	}

	/* Subsecciones */
	.subsection-header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.625rem 1.25rem 0.625rem 3rem;
		background: transparent;
		border: none;
		color: rgba(203, 213, 225, 0.85);
		font-size: 0.8125rem !important;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease;
		text-align: left;
		width: 100%;
		line-height: 1.2;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
	}

	.subsection-header:hover {
		background: rgba(71, 85, 105, 0.15);
		color: rgba(255, 255, 255, 0.95);
		padding-left: 3.25rem;
	}

	.subsection-header span:nth-child(2) {
		flex: 1;
	}

	/* Sub-items (items dentro de subsecciones) */
	.sub-items {
		display: flex;
		flex-direction: column;
		gap: 0.125rem;
		padding: 0.25rem 0;
		animation: slideDown 0.2s ease;
	}

	.sub-items a {
		display: flex;
		align-items: center;
		padding: 0.5rem 1.25rem 0.5rem 4rem;
		color: rgba(186, 230, 253, 0.7);
		text-decoration: none;
		font-size: 0.75rem !important;
		font-weight: 500;
		transition: all 0.2s ease;
		position: relative;
		line-height: 1.2;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
	}

	.sub-items a:hover {
		background: rgba(71, 85, 105, 0.12);
		color: rgba(186, 230, 253, 0.95);
		padding-left: 4.25rem;
	}

	.sub-items a.active {
		background: linear-gradient(90deg, rgba(14, 165, 233, 0.15) 0%, rgba(14, 165, 233, 0.05) 100%);
		color: rgba(125, 211, 252, 1);
		border-left: 3px solid rgba(14, 165, 233, 0.7);
		font-weight: 600;
	}

	.sub-items a.active::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		width: 3px;
		background: linear-gradient(180deg, rgba(14, 165, 233, 0.8) 0%, rgba(6, 182, 212, 0.6) 100%);
		box-shadow: 0 0 12px rgba(14, 165, 233, 0.5);
	}

	/* Scrollbar personalizado */
	.sidebar::-webkit-scrollbar {
		width: 6px;
	}

	.sidebar::-webkit-scrollbar-track {
		background: rgba(15, 23, 42, 0.3);
	}

	.sidebar::-webkit-scrollbar-thumb {
		background: rgba(71, 85, 105, 0.5);
		border-radius: 3px;
	}

	.sidebar::-webkit-scrollbar-thumb:hover {
		background: rgba(71, 85, 105, 0.7);
	}

	/* Responsive */
	@media (max-width: 1024px) {
		.sidebar {
			width: 220px;
		}
	}

	@media (max-width: 768px) {
		.sidebar {
			transform: translateX(-100%);
			transition: transform 0.3s ease;
		}
	}
</style>
