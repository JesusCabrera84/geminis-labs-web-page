# Documentación Técnica - Geminis Labs Web Page

## Descripción General

Sistema de seguimiento GPS en tiempo real construido con SvelteKit, que incluye autenticación completa, sistema de temas avanzado y interfaz de usuario moderna.

## Arquitectura del Proyecto

### Tecnologías Principales

- **SvelteKit**: Framework web principal
- **Tailwind CSS**: Sistema de estilos
- **Google Maps JavaScript API**: Mapas interactivos
- **Vite**: Build tool y servidor de desarrollo

### Estructura de Directorios

```
src/
├── lib/
│   ├── components/          # Componentes Svelte reutilizables
│   │   ├── AccountMenu.svelte
│   │   ├── AccountSwitch.svelte
│   │   ├── ProfileView.svelte
│   │   ├── ThemeSelector.svelte
│   │   └── Toast.svelte
│   ├── config/
│   │   └── api.js          # Configuración de API
│   ├── services/           # Servicios de negocio
│   │   ├── apiClient.js    # Cliente HTTP
│   │   ├── authService.js  # Autenticación
│   │   └── userService.js  # Gestión de usuarios
│   ├── stores/             # Stores de Svelte
│   │   ├── authStore.js    # Estado de autenticación
│   │   ├── userStore.js    # Datos de usuario
│   │   └── toastStore.js   # Notificaciones
│   ├── styles/             # Estilos CSS modulares
│   │   ├── base.css        # Estilos base
│   │   ├── themes.css      # Sistema de temas
│   │   ├── components.css  # Estilos de componentes
│   │   └── [component].css # Estilos específicos
│   └── theme.js           # Lógica del sistema de temas
├── routes/                # Rutas de la aplicación
│   ├── +layout.svelte     # Layout principal
│   ├── +page.svelte       # Página de login
│   ├── auth/              # Páginas de autenticación
│   ├── profile/           # Perfil de usuario
│   └── verify-email/      # Verificación de email
└── static/               # Archivos estáticos
    ├── fonts/            # Fuentes personalizadas
    ├── img/              # Imágenes
    └── vid/              # Videos de fondo
```

## Sistema de Autenticación

### Configuración

- **Backend API**: FastAPI (`siscom-admin-api`)
- **Almacenamiento**: SessionStorage para tokens
- **Endpoints principales**:
  - `POST /api/v1/auth/login` - Inicio de sesión
  - `POST /api/v1/clients/` - Registro de usuarios
  - `POST /api/v1/clients/verify-email` - Verificación de email

### Flujo de Autenticación

1. **Registro**: Usuario completa formulario → API crea cuenta → Email de verificación
2. **Verificación**: Click en enlace → Confirmación automática → Cuenta activada
3. **Login**: Credenciales → Tokens guardados → Redirección a dashboard
4. **Sesión**: Tokens en sessionStorage → Validación automática → Renovación

### Componentes de Autenticación

- `AccountMenu.svelte`: Menú desplegable con opciones de usuario
- `AccountSwitch.svelte`: Selector de cuentas múltiples
- `authStore.js`: Gestión de estado de autenticación
- `authService.js`: Comunicación con API de auth

## Sistema de Temas

### Características

- **20+ temas predefinidos**: Desde clásicos hasta futuristas
- **Persistencia**: Configuración guardada en localStorage
- **Aplicación dinámica**: Cambio instantáneo sin recarga
- **Variables CSS**: Sistema consistente de colores y espaciado

### Temas Disponibles

- **Clásicos**: Default, Dark, Light, Blue, Green
- **Vibrantes**: Neon, Cyberpunk, Sunset, Ocean
- **Especializados**: Matrix, Retro, Minimal, Corporate
- **Futuristas**: Holographic, Quantum, Neural

### Implementación Técnica

```javascript
// theme.js - Aplicación de tema
export function applyTheme(themeName) {
	const theme = themes[themeName];
	if (theme) {
		Object.entries(theme).forEach(([property, value]) => {
			document.documentElement.style.setProperty(property, value);
		});
	}
}
```

### Variables CSS Principales

```css
:root {
	--primary-color: #3b82f6;
	--secondary-color: #64748b;
	--background-color: #ffffff;
	--text-color: #1f2937;
	--border-color: #e5e7eb;
	--accent-color: #10b981;
}
```

## Sistema de Estilos

### Arquitectura CSS

- **Modular**: Cada componente tiene su archivo CSS
- **Reutilizable**: Clases compartidas en `shared-components.css`
- **Temático**: Integración completa con sistema de temas
- **Responsive**: Diseño adaptativo para todos los dispositivos

### Archivos de Estilos

- `base.css`: Configuración de Tailwind y estilos base
- `themes.css`: Definiciones de todos los temas
- `components.css`: Estilos generales de componentes
- `[component].css`: Estilos específicos por componente

### Página de Login

- **Video de fondo**: Pantalla completa con overlay
- **Círculos animados**: Elementos decorativos dinámicos
- **Formulario cristal**: Efecto glassmorphism
- **Autenticación social**: Botones para Google, Facebook, X

## Componentes Principales

### AccountMenu.svelte

- Menú desplegable de usuario
- Estados: autenticado/no autenticado
- Opciones: perfil, configuración, logout
- Integración con sistema de auth

### AccountSwitch.svelte

- Selector de múltiples cuentas
- Gestión de perfiles de usuario
- Cambio rápido entre cuentas
- Persistencia de selección

### ThemeSelector.svelte

- Selector visual de temas
- Preview en tiempo real
- Categorización por tipo
- Persistencia de preferencias

### ProfileView.svelte

- Vista completa del perfil
- Edición de datos personales
- Gestión de configuraciones
- Integración con backend

## Servicios y Stores

### authService.js

```javascript
// Funciones principales
login(email, password); // Autenticación
register(userData); // Registro
logout(); // Cierre de sesión
refreshToken(); // Renovación de token
```

### authStore.js

```javascript
// Estado reactivo
$authStore = {
	isAuthenticated: boolean,
	user: object,
	token: string,
	loading: boolean
};
```

### apiClient.js

- Cliente HTTP configurado
- Interceptors para tokens
- Manejo de errores centralizado
- Timeout y retry automático

## Configuración de Desarrollo

### Variables de Entorno

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
VITE_GOOGLE_MAPS_API_KEY=tu_api_key
VITE_APP_NAME=Geminis Labs
VITE_APP_VERSION=1.0.0
```

### Comandos de Desarrollo

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run preview      # Preview de producción
npm run lint         # Verificación de código
npm run format       # Formateo de código
```

### Estructura de Build

```
build/
├── client/          # Archivos del cliente
├── server/          # Archivos del servidor
└── static/          # Recursos estáticos
```

## Funcionalidades Principales

### Seguimiento GPS

- Mapa de Google Maps a pantalla completa
- Marcadores en tiempo real
- Actualización automática cada 5 segundos
- Filtros por grupos y estados

### Gestión de Usuarios

- Registro con verificación de email
- Login con múltiples métodos
- Perfiles de usuario editables
- Sistema de roles (preparado)

### Interfaz de Usuario

- Diseño responsive
- Animaciones suaves
- Notificaciones toast
- Navegación intuitiva

## Seguridad

### Autenticación

- Tokens JWT en sessionStorage
- Validación en frontend y backend
- Limpieza automática de sesiones
- Manejo seguro de errores

### Validaciones

- Sanitización de inputs
- Validación de formularios
- Protección CSRF (preparada)
- Rate limiting (backend)

## Performance

### Optimizaciones

- Code splitting automático
- Lazy loading de componentes
- Compresión de assets
- Caching de recursos estáticos

### Métricas

- First Contentful Paint < 1.5s
- Largest Contentful Paint < 2.5s
- Cumulative Layout Shift < 0.1
- First Input Delay < 100ms

## Deployment

### Producción

```bash
npm run build
node build/index.js
```

### Docker

```dockerfile
FROM node:18-alpine
COPY . .
RUN npm ci --production
RUN npm run build
EXPOSE 3000
CMD ["node", "build"]
```

### Variables de Producción

```env
VITE_API_BASE_URL=https://api.production.com
NODE_ENV=production
PORT=3000
```

## Mantenimiento

### Logs

- Errores centralizados en consola
- Tracking de eventos de usuario
- Monitoreo de performance
- Alertas automáticas

### Actualizaciones

- Versionado semántico
- Changelog automatizado
- Testing antes de deploy
- Rollback automático

## Próximas Funcionalidades

1. **Notificaciones Push**: Alertas en tiempo real
2. **Reportes**: Generación de informes automáticos
3. **Geofencing**: Zonas de alerta geográficas
4. **API Mobile**: Endpoints para app móvil
5. **Analytics**: Dashboard de métricas de uso

## Contacto y Soporte

Para dudas técnicas o reportes de bugs, contactar al equipo de desarrollo a través de los canales establecidos en el proyecto.
