# Módulo: Accept Invitation (Aceptar Invitación)

## 📌 Descripción

Módulo para que usuarios invitados acepten su invitación y establezcan su contraseña.
Permite a usuarios maestro invitar a otros usuarios a su cuenta.

---

## 👤 Actor

- Usuario invitado (recibió email de invitación)
- Futuro usuario vinculado a cuenta master

---

## 🔌 APIs Consumidas

### 🔹 Backend API (admin-api)

| Endpoint                          | Método | Uso                                        |
| --------------------------------- | ------ | ------------------------------------------ |
| `/api/v1/users/accept-invitation` | POST   | Aceptar invitación y establecer contraseña |

---

## 🔁 Flujo funcional

1. Usuario invitado recibe email con link de invitación
2. Clic en link: redirección a `/accept-invitation?token={invitation_token}`
3. Extracción del token de URL query params
4. Usuario ingresa nueva contraseña
5. Validación de password (8-72 chars, mayúscula, número, especial)
6. POST a `/api/v1/users/accept-invitation` con:
   ```json
   {
   	"token": "invitation_token",
   	"password": "nueva_contraseña"
   }
   ```
7. Si exitoso:
   - Mensaje de confirmación
   - Redirección a `/auth` para iniciar sesión
8. Si error:
   - Mostrar mensaje de error (token inválido, expirado, ya usado)

---

## 🔗 Formato de URL

```
https://example.com/accept-invitation?token=inv_abc123def456
```

El token es generado por el backend cuando un usuario master invita a otro usuario.

---

## 🔐 Validación de Contraseña

- Mínimo 8 caracteres, máximo 72
- Al menos 1 letra mayúscula
- Al menos 1 número
- Al menos 1 carácter especial (!@#$%^&\*(),.?":{}|<>\_-+=[];)

---

## ⚠️ Consideraciones

- Token de invitación tiene tiempo de expiración
- Token de un solo uso (no se puede reutilizar)
- Usuario invitado no tiene cuenta previa
- Después de aceptar, el usuario debe hacer login normal
- Usuario invitado quedará vinculado al usuario master que lo invitó

---

## 🧭 Relación C4

- **Container:** Web App (SvelteKit)
- **Component:** Accept Invitation Module
- **Consumes:** Backend API (admin-api)
- **Depends on:** authStore (para acceptInvitation)
- **Triggers:** Redirección a Auth Module después de éxito

---

## 📂 Archivos Relacionados

- [`src/routes/accept-invitation/+page.svelte`](file:///home/chch/Code/geminis-labs-web-page/src/routes/accept-invitation/+page.svelte) - Vista principal
- [`src/lib/services/authService.js`](file:///home/chch/Code/geminis-labs-web-page/src/lib/services/authService.js) - Lógica de aceptación
- [`src/lib/stores/authStore.js`](file:///home/chch/Code/geminis-labs-web-page/src/lib/stores/authStore.js) - Estado de autenticación
