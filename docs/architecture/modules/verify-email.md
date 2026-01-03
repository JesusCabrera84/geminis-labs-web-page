# Módulo: Verify Email (Verificación de Email)

## 📌 Descripción

Módulo para verificar el correo electrónico del usuario.
Procesa el token de verificación enviado por email y activa la cuenta.

---

## 👤 Actor

- Usuario recién registrado
- Usuario que recibió email de verificación

---

## 🔌 APIs Consumidas

### 🔹 Backend API (admin-api)

| Endpoint                    | Método | Uso                       |
| --------------------------- | ------ | ------------------------- |
| `/api/v1/auth/verify-email` | POST   | Verificar email con token |

---

## 🔁 Flujo funcional

1. Usuario hace clic en link de verificación del email
2. Redirección a `/verify-email?token={verification_token}`
3. Extracción del token de URL query params
4. POST a `/api/v1/auth/verify-email?token={token}`
5. Si exitoso:
   - Mostrar mensaje de confirmación
   - Redirección automática a `/auth` (login) después de 3 segundos
6. Si error:
   - Mostrar mensaje de error (token inválido, expirado, etc.)
   - Opción de solicitar nuevo código

---

## 🔗 Formato de URL

```
https://example.com/verify-email?token=abc123def456
```

El token es generado por el backend y enviado por email al usuario.

---

## ⚠️ Consideraciones

- Token de verificación tiene tiempo de expiración
- Token de un solo uso (no se puede reutilizar)
- Si el token ya fue usado, mostrar error apropiado
- Redirección automática a login después de verificación exitosa

---

## 🧭 Relación C4

- **Container:** Web App (SvelteKit)
- **Component:** Verify Email Module
- **Consumes:** Backend API (admin-api)
- **Depends on:** authStore (para confirmEmail)
- **Triggers:** Redirección a Auth Module después de éxito

---

## 📂 Archivos Relacionados

- [`src/routes/verify-email/+page.svelte`](file:///home/chch/Code/geminis-labs-web-page/src/routes/verify-email/+page.svelte) - Vista principal
- [`src/lib/services/authService.js`](file:///home/chch/Code/geminis-labs-web-page/src/lib/services/authService.js) - Lógica de verificación
- [`src/lib/stores/authStore.js`](file:///home/chch/Code/geminis-labs-web-page/src/lib/stores/authStore.js) - Estado de autenticación
