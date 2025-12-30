# Módulo: Profile (Perfil de Usuario)

## 📌 Descripción
Gestión del perfil de usuario autenticado.
Permite ver información personal, cambiar contraseña, y gestionar usuarios asociados (para usuarios maestro).

---

## 👤 Actor
- Usuario autenticado
- Rol: user (básico) o master (administrador principal)

---

## 🔌 APIs Consumidas

### 🔹 Backend API (admin-api)

| Endpoint | Método | Uso |
|--------|--------|-----|
| `/api/v1/users/me` | GET | Obtener información del usuario actual |
| `/api/v1/users` | GET | Listar usuarios asociados (solo master) |
| `/api/v1/auth/password` | PATCH | Cambiar contraseña del usuario |

---

## 🔁 Flujo funcional

### Carga inicial
1. Usuario accede a `/profile`
2. Verificación de autenticación
3. GET a `/api/v1/users/me` para obtener datos del perfil
4. Si es usuario master: GET a `/api/v1/users` para listar usuarios asociados
5. Renderizar vista de perfil

### Cambio de contraseña
1. Usuario ingresa contraseña actual y nueva contraseña
2. Validación de password (8-72 chars, mayúscula, número, especial)
3. PATCH a `/api/v1/auth/password` con old_password y new_password
4. Mensaje de confirmación

### Gestión de usuarios (solo master)
1. Mostrar lista de usuarios asociados
2. Información: nombre, email, rol, último acceso
3. Funcionalidad de invitación (futuro)

---

## 🔐 Autenticación

- **Requiere**: Token JWT válido (access_token)
- **Guard**: Verificación en `onMount`
- **Headers**: `Authorization: Bearer {access_token}`

---

## 💾 Datos del Usuario

Estructura de datos obtenida de `/api/v1/users/me`:
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "Nombre Completo",
  "is_master": true/false,
  "last_login_at": "2024-01-01T00:00:00Z",
  "created_at": "2024-01-01T00:00:00Z"
}
```

---

## ⚠️ Consideraciones
- Solo usuarios master pueden ver usuarios asociados
- Cambio de contraseña requiere contraseña actual
- Validación de password igual que en registro
- Tokens se pasan en headers de autorización

---

## 🧭 Relación C4

- **Container:** Web App (SvelteKit)
- **Component:** Profile Module
- **Consumes:** Backend API (admin-api)
- **Depends on:** authStore, userStore, userService
- **Uses components:** ProfileView, AccountSwitch

---

## 📂 Archivos Relacionados

- [`src/routes/profile/+page.svelte`](file:///home/chch/Code/geminis-labs-web-page/src/routes/profile/+page.svelte) - Vista principal
- [`src/lib/services/userService.js`](file:///home/chch/Code/geminis-labs-web-page/src/lib/services/userService.js) - Lógica de negocio
- [`src/lib/stores/userStore.js`](file:///home/chch/Code/geminis-labs-web-page/src/lib/stores/userStore.js) - Estado de usuario
- [`src/lib/components/ProfileView.svelte`](file:///home/chch/Code/geminis-labs-web-page/src/lib/components/ProfileView.svelte) - Vista de perfil
- [`src/lib/components/AccountSwitch.svelte`](file:///home/chch/Code/geminis-labs-web-page/src/lib/components/AccountSwitch.svelte) - Selector de cuenta
