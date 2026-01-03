# Módulo: Auth (Autenticación)

## 📌 Descripción

Módulo de autenticación y registro de usuarios.
Gestiona login, registro, recuperación de contraseña, verificación de email y aceptación de invitaciones.

---

## 👤 Actor

- Usuario no autenticado (login, registro, recuperación)
- Usuario con email no verificado (reenvío de verificación)

---

## 🔌 APIs Consumidas

### 🔹 Backend API (admin-api)

| Endpoint                           | Método | Uso                               |
| ---------------------------------- | ------ | --------------------------------- |
| `/api/v1/auth/login`               | POST   | Iniciar sesión con email/password |
| `/api/v1/auth/refresh`             | POST   | Refrescar access token            |
| `/api/v1/auth/forgot-password`     | POST   | Solicitar código de recuperación  |
| `/api/v1/auth/reset-password`      | POST   | Restablecer contraseña con código |
| `/api/v1/clients`                  | POST   | Registrar nuevo cliente           |
| `/api/v1/clients`                  | GET    | Obtener información del cliente   |
| `/api/v1/auth/resend-verification` | POST   | Reenviar email de verificación    |

---

## 🔁 Flujo funcional

### Login

1. Usuario ingresa email y password
2. Validación de formulario (frontend)
3. POST a `/api/v1/auth/login`
4. Si exitoso: almacenar tokens (access_token, id_token, refresh_token)
5. Redirección a home `/`
6. Si error 403 (email no verificado): mostrar banner con opción de reenvío

### Registro

1. Usuario ingresa nombre completo, email, password
2. Validación de password (8-72 chars, mayúscula, número, especial)
3. POST a `/api/v1/clients`
4. Mensaje de éxito: "Revisa tu correo para verificar"
5. Redirección a modo login

### Recuperación de contraseña

1. Usuario ingresa email
2. POST a `/api/v1/auth/forgot-password`
3. Backend envía código de 6 dígitos por email
4. Usuario ingresa código y nueva password
5. POST a `/api/v1/auth/reset-password`
6. Redirección a login

### Reenvío de verificación

1. Detectar error 403 en login
2. Mostrar banner con botón "Reenviar Correo"
3. POST a `/api/v1/auth/resend-verification` con email
4. Mensaje de confirmación

---

## 💾 Almacenamiento Local

| Clave                   | Storage        | Contenido                |
| ----------------------- | -------------- | ------------------------ |
| `geminis_access_token`  | sessionStorage | JWT access token         |
| `geminis_id_token`      | sessionStorage | JWT id token             |
| `geminis_refresh_token` | sessionStorage | JWT refresh token        |
| `geminis_user_data`     | sessionStorage | Datos del usuario (JSON) |

---

## ⚠️ Consideraciones

- Tokens se almacenan en `sessionStorage` (no persisten al cerrar navegador)
- Validación de password: 8-72 caracteres, 1 mayúscula, 1 número, 1 especial
- Error 403 puede indicar email no verificado
- Refresh token se usa automáticamente si access token expira

---

## 🧭 Relación C4

- **Container:** Web App (SvelteKit)
- **Component:** Auth Module
- **Consumes:** Backend API (admin-api)
- **Stores data in:** Browser sessionStorage
- **Related components:** authStore, authService, apiClient

---

## 📂 Archivos Relacionados

- [`src/routes/auth/+page.svelte`](file:///home/chch/Code/geminis-labs-web-page/src/routes/auth/+page.svelte) - Vista principal
- [`src/lib/services/authService.js`](file:///home/chch/Code/geminis-labs-web-page/src/lib/services/authService.js) - Lógica de negocio
- [`src/lib/stores/authStore.js`](file:///home/chch/Code/geminis-labs-web-page/src/lib/stores/authStore.js) - Estado global
- [`src/lib/config/api.js`](file:///home/chch/Code/geminis-labs-web-page/src/lib/config/api.js) - Configuración de endpoints
