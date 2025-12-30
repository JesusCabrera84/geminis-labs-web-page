/**
 * ===================================================================
 * SISTEMA DE GESTIÓN DE TEMAS - GEMINIS LABS
 * Configuración y funciones para cambiar temas por código
 * ===================================================================
 */

/**
 * Configuración de temas disponibles
 */
export const THEMES = {
	default: {
		name: 'Default',
		description: 'Tema original de Geminis Labs',
		colors: {
			primary: '#222831',
			secondary: '#283b48',
			accent: '#00a6c0',
			text: '#d8d7cc'
		}
	},
	'dual-tech-human': {
		name: 'Dual Tech Human',
		description: 'Moderno, equilibrado y con calidez humana',
		colors: {
			primary: '#0D1B2A',
			secondary: '#142A3B',
			accent: '#2DD4BF',
			text: '#F8FAFC'
		}
	},
	vibrant: {
		name: 'Vibrant',
		description: 'Experimental para marketing con colores vibrantes',
		colors: {
			primary: '#111827',
			secondary: '#1F2937',
			accent: '#14F4C8',
			text: '#E5E7EB'
		}
	},
	'warm-tech': {
		name: 'Warm Tech',
		description: 'Alternativa con tono humano y cálido',
		colors: {
			primary: '#1C1A1A',
			secondary: '#302E2E',
			accent: '#FFB347',
			text: '#F8FAFC'
		}
	},
	'light-elegance': {
		name: 'Light Elegance',
		description: 'Matices blancos elegantes y profesionales',
		colors: {
			primary: '#FAFBFC',
			secondary: '#F4F6F8',
			accent: '#2563EB',
			text: '#1F2937'
		}
	},
	'neural-connect': {
		name: 'Neural Connect',
		description: 'Conexión neuronal humano-tecnológica',
		colors: {
			primary: '#0F0F23',
			secondary: '#1A1A2E',
			accent: '#8B5CF6',
			text: '#E2E8F0'
		}
	},
	'human-pulse': {
		name: 'Human Pulse',
		description: 'Latido humano con tecnología orgánica',
		colors: {
			primary: '#1A1B1E',
			secondary: '#2D2E33',
			accent: '#FF6B6B',
			text: '#F5F5F5'
		}
	},
	'celestial-core': {
		name: 'Celestial Core',
		description: 'Inspirado en energía cósmica y precisión orbital',
		colors: {
			primary: '#090E1A', // fondo oscuro profundo tipo espacio
			secondary: '#1E2A44', // azul galáctico, contraste sutil
			accent: '#00C6FF', // cian brillante, energía de datos
			text: '#E0E8FF' // blanco azulado para sensación etérea
		}
	},
	'quantum-veins': {
		name: 'Quantum Veins',
		description: 'Energía en movimiento y redes de datos vivas',
		colors: {
			primary: '#0C0B1D', // violeta oscuro profundo
			secondary: '#1C1A3A', // azul-violeta intermedio
			accent: '#7F5AF0', // púrpura brillante, color neuronal
			text: '#EAE9FF' // blanco suave con tinte violeta
		}
	},
	'digital-life': {
		name: 'Digital Life',
		description: 'Vida digital con pulsaciones orgánicas',
		colors: {
			primary: '#1A1B1E',
			secondary: '#2D2E33',
			accent: '#FF6B6B',
			text: '#F5F5F5'
		}
	},
	'cosmic-nebula': {
		name: 'Cosmic Nebula',
		description: 'Nebulosa cósmica con pulsaciones orgánicas',
		colors: {
			primary: '#090E1A',
			secondary: '#1E2A44',
			accent: '#00C6FF',
			text: '#E0E8FF'
		}
	},
	'terra-nexus': {
		name: 'Terra Nexus',
		description: 'Conexión entre tecnología, territorio y sostenibilidad',
		colors: {
			primary: '#1E1C16', // marrón oscuro metálico
			secondary: '#2F3027', // verde oliva apagado
			accent: '#A3E635', // verde-lima tecnológico
			text: '#F5F5DC' // beige claro legible
		}
	},
	'urban-vibes': {
		name: 'Urban Vibes',
		description: 'Vibración urbana con colores vibrantes',
		colors: {
			primary: '#111827',
			secondary: '#1F2937',
			accent: '#14F4C8',
			text: '#E5E7EB'
		}
	},
	'neon-pulse': {
		name: 'Neon Pulse',
		description: 'Pulsaciones neon con colores vibrantes',
		colors: {
			primary: '#0C0B1D',
			secondary: '#1C1A3A',
			accent: '#7F5AF0',
			text: '#EAE9FF'
		}
	},
	'retro-future': {
		name: 'Retro Future',
		description: 'Futuro retro con colores vibrantes',
		colors: {
			primary: '#111827',
			secondary: '#1F2937',
			accent: '#14F4C8',
			text: '#E5E7EB'
		}
	},
	'monochrome-light': {
		name: 'Monochrome Light',
		description: 'Elegancia monocromática clara con acentos vibrantes',
		colors: {
			primary: '#FFFFFF',
			secondary: '#F8FAFC',
			accent: '#EF4444',
			text: '#1F2937'
		}
	},
	'steel-contrast': {
		name: 'Steel Contrast',
		description: 'Grises metálicos con acentos de alto contraste',
		colors: {
			primary: '#374151',
			secondary: '#4B5563',
			accent: '#F59E0B',
			text: '#F9FAFB'
		}
	},
	'forest-tech': {
		name: 'Forest Tech',
		description: 'Tecnología orgánica con tonos verdes naturales',
		colors: {
			primary: '#064E3B', // verde bosque profundo
			secondary: '#065F46', // verde esmeralda oscuro
			accent: '#10B981', // verde tecnológico brillante
			text: '#ECFDF5' // verde muy claro, casi blanco
		}
	},
	'slate-professional': {
		name: 'Slate Professional',
		description: 'Elegancia profesional con grises pizarra',
		colors: {
			primary: '#1E293B', // gris pizarra oscuro
			secondary: '#334155', // gris pizarra medio
			accent: '#0EA5E9', // azul cielo vibrante
			text: '#F1F5F9' // gris muy claro
		}
	},
	'ocean-depth': {
		name: 'Ocean Depth',
		description: 'Profundidades oceánicas con azules intensos',
		colors: {
			primary: '#0C4A6E', // azul océano profundo
			secondary: '#0369A1', // azul océano medio
			accent: '#0284C7', // azul cielo brillante
			text: '#E0F2FE' // azul muy claro, casi blanco
		}
	}
};

/**
 * Tema activo actual (configurable)
 * Cambiar esta variable para alternar temas por código
 */
export let activeTheme = 'default';

/**
 * Función para cambiar el tema activo
 * @param {string} themeName - Nombre del tema a activar
 * @returns {boolean} - true si el tema se cambió exitosamente
 */
export function setTheme(themeName) {
	// Validar que el tema existe
	if (!THEMES[themeName]) {
		return false;
	}

	// Actualizar variable global
	activeTheme = themeName;

	// Aplicar el tema al DOM
	if (typeof document !== 'undefined') {
		document.documentElement.setAttribute('data-theme', themeName);

		// Disparar evento personalizado para notificar el cambio
		document.dispatchEvent(
			new CustomEvent('themeChanged', {
				detail: {
					theme: themeName,
					config: THEMES[themeName]
				}
			})
		);
	}

	return true;
}

/**
 * Función para obtener el tema actual
 * @returns {string} - Nombre del tema activo
 */
export function getCurrentTheme() {
	return activeTheme;
}

/**
 * Función para obtener la configuración de un tema
 * @param {string} themeName - Nombre del tema (opcional, usa el activo si no se especifica)
 * @returns {object} - Configuración del tema
 */
export function getThemeConfig(themeName = activeTheme) {
	return THEMES[themeName] || THEMES.default;
}

/**
 * Función para obtener todos los temas disponibles
 * @returns {object} - Objeto con todos los temas
 */
export function getAllThemes() {
	return THEMES;
}

/**
 * Función para inicializar el sistema de temas
 * Debe llamarse al cargar la aplicación
 */
export function initializeTheme() {
	if (typeof document !== 'undefined') {
		// Aplicar el tema inicial
		document.documentElement.setAttribute('data-theme', activeTheme);

		// Agregar clase de transición suave a elementos principales
		const elementsToTransition = [
			'body',
			'.navbar',
			'.hero-section',
			'.services-section',
			'.about-section',
			'.contact-section',
			'.footer'
		];

		elementsToTransition.forEach((selector) => {
			const elements = document.querySelectorAll(selector);
			elements.forEach((el) => {
				if (el) {
					el.classList.add('theme-transition');
				}
			});
		});
	}
}

/**
 * Función para cambiar al siguiente tema (útil para testing)
 * @returns {string} - Nombre del nuevo tema activo
 */
export function nextTheme() {
	const themeNames = Object.keys(THEMES);
	const currentIndex = themeNames.indexOf(activeTheme);
	const nextIndex = (currentIndex + 1) % themeNames.length;
	const nextThemeName = themeNames[nextIndex];

	setTheme(nextThemeName);
	return nextThemeName;
}

/**
 * Función para cambiar al tema anterior (útil para testing)
 * @returns {string} - Nombre del nuevo tema activo
 */
export function previousTheme() {
	const themeNames = Object.keys(THEMES);
	const currentIndex = themeNames.indexOf(activeTheme);
	const prevIndex = currentIndex === 0 ? themeNames.length - 1 : currentIndex - 1;
	const prevThemeName = themeNames[prevIndex];

	setTheme(prevThemeName);
	return prevThemeName;
}

/**
 * ===================================================================
 * EJEMPLOS DE USO:
 *
 * // Cambiar tema por código:
 * import { setTheme } from '$lib/theme.js';
 * setTheme('dual-tech-human');
 *
 * // Obtener tema actual:
 * import { getCurrentTheme } from '$lib/theme.js';
 * getCurrentTheme(); // 'dual-tech-human'
 *
 * // Cambiar al siguiente tema (para testing):
 * import { nextTheme } from '$lib/theme.js';
 * nextTheme();
 *
 * // Inicializar sistema de temas (en app.js o +layout.svelte):
 * import { initializeTheme } from '$lib/theme.js';
 * initializeTheme();
 * ===================================================================
 */
