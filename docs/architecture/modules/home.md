# Módulo: Home (Página de Inicio)

## 📌 Descripción

Página de inicio (landing page) de Geminis Labs.
Presenta productos (Orion, Nexus), formulario de contacto, y secciones informativas.

---

## 👤 Actor

- Usuario público (no requiere autenticación)
- Visitante interesado en productos o contacto

---

## 🔌 APIs y Servicios Consumidos

### 🔹 Backend API (admin-api)

| Endpoint                       | Método | Uso                        |
| ------------------------------ | ------ | -------------------------- |
| `/api/v1/contact/send-message` | POST   | Enviar mensaje de contacto |

### 🔹 Google reCAPTCHA v3

| Servicio                                  | Uso                                             |
| ----------------------------------------- | ----------------------------------------------- |
| `https://www.google.com/recaptcha/api.js` | Verificación anti-bot en formulario de contacto |
| reCAPTCHA execute                         | Generar token de verificación                   |

---

## 🔁 Flujo funcional

### Navegación general

1. Usuario accede a `/` (home)
2. Renderizar secciones: Hero, Productos (Orion, Nexus), Contacto
3. Animaciones de scroll y efectos visuales
4. Navegación a productos específicos (`/products/nexus`)

### Formulario de contacto

1. Usuario completa formulario (nombre, email, teléfono, mensaje)
2. Validación de campos (frontend)
3. Ejecutar reCAPTCHA v3 para obtener token
4. POST a `/api/v1/contact/send-message` con datos + recaptcha_token
5. Mostrar mensaje de confirmación o error
6. Limpiar formulario si exitoso

---

## 🔐 Configuración reCAPTCHA

- **Variable de entorno**: `VITE_RECAPTCHA_SITE_KEY`
- **Carga dinámica**: Script de reCAPTCHA se carga en `onMount`
- **Acción**: `contact_form`
- **Validación**: Backend valida el token con Google

---

## 📤 Estructura de datos - Contacto

Request a `/api/v1/contact/send-message`:

```json
{
	"name": "Nombre del usuario",
	"email": "user@example.com",
	"phone": "+52 1234567890",
	"message": "Mensaje del usuario",
	"recaptcha_token": "token_generado_por_recaptcha"
}
```

---

## ⚠️ Consideraciones

- No requiere autenticación
- reCAPTCHA v3 es invisible (no requiere interacción del usuario)
- Formulario de contacto valida email y campos requeridos
- Animaciones de scroll pueden afectar rendimiento en dispositivos lentos

---

## 🧭 Relación C4

- **Container:** Web App (SvelteKit)
- **Component:** Home Module (Landing Page)
- **Consumes:**
  - Backend API (admin-api) - endpoint de contacto
  - Google reCAPTCHA v3 - verificación anti-bot
- **Uses components:** Navbar

---

## 📂 Archivos Relacionados

- [`src/routes/+page.svelte`](file:///home/chch/Code/geminis-labs-web-page/src/routes/+page.svelte) - Vista principal
- [`src/lib/config/api.js`](file:///home/chch/Code/geminis-labs-web-page/src/lib/config/api.js) - Configuración de endpoints
- [`src/lib/components/Navbar.svelte`](file:///home/chch/Code/geminis-labs-web-page/src/lib/components/Navbar.svelte) - Barra de navegación
