import { defineConfig } from '@tailwindcss/vite';

export default defineConfig({
	theme: {
		extend: {
			colors: {
				// Color personalizado del logo/marca
				'brand-green': '#00a878',
				'brand-green-light': '#00c896',
				'brand-green-dark': '#008a65',

				// Colores del sistema de temas existente
				'accent-cyan': '#00a6c0',
				'accent-secondary': '#21e68c',
				'light-cream': '#d8d7cc',

				// Grises personalizados para el switch
				'switch-gray': '#3b3b3b'
			},
			boxShadow: {
				// Sombras personalizadas para el glow effect
				'green-glow': '0 0 20px rgba(0, 168, 120, 0.4)',
				'green-glow-lg': '0 0 30px rgba(0, 168, 120, 0.6)'
			}
		}
	}
});
