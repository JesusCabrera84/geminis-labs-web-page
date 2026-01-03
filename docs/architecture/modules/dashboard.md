# Módulo: Dashboard (Panel de Control)

## 📌 Descripción

Vista principal del panel de control del usuario autenticado.
Actualmente muestra estructura base con secciones de Productos y Planes (contenido próximamente).

---

## 👤 Actor

- Usuario autenticado
- Rol: cualquier usuario con sesión válida

---

## 🔌 APIs Consumidas

### 🔹 Backend API (admin-api)

| Endpoint           | Método | Uso                                 |
| ------------------ | ------ | ----------------------------------- |
| `/api/v1/users/me` | GET    | Obtener perfil del usuario (futuro) |

> **Nota**: Actualmente el dashboard no consume APIs directamente, pero está preparado para integrar datos del usuario y métricas.

---

## 🔁 Flujo funcional

1. Usuario accede a `/control-panel`
2. Verificación de autenticación (authStore)
3. Si no autenticado: redirección a `/auth`
4. Si autenticado: renderizar dashboard
5. Mostrar Navbar y Sidebar
6. Mostrar secciones placeholder (Productos, Planes)

---

## 🔐 Autenticación

- **Requiere**: Token JWT válido en sessionStorage
- **Guard**: `onMount` verifica `$isAuthenticated`
- **Redirección**: `/auth` si no autenticado

---

## ⚠️ Consideraciones

- Dashboard requiere sesión activa
- Actualmente es una vista placeholder
- Preparado para futuras integraciones con APIs de datos operativos
- Usa Navbar y Sidebar compartidos

---

## 🧭 Relación C4

- **Container:** Web App (SvelteKit)
- **Component:** Dashboard Module
- **Consumes:** Backend API (admin-api) - preparado para futuro
- **Depends on:** authStore (verificación de sesión)
- **Uses components:** Navbar, Sidebar

---

## 📂 Archivos Relacionados

- [`src/routes/control-panel/+page.svelte`](file:///home/chch/Code/geminis-labs-web-page/src/routes/control-panel/+page.svelte) - Vista principal
- [`src/lib/components/Navbar.svelte`](file:///home/chch/Code/geminis-labs-web-page/src/lib/components/Navbar.svelte) - Barra de navegación
- [`src/lib/components/Sidebar.svelte`](file:///home/chch/Code/geminis-labs-web-page/src/lib/components/Sidebar.svelte) - Menú lateral
- [`src/lib/stores/authStore.js`](file:///home/chch/Code/geminis-labs-web-page/src/lib/stores/authStore.js) - Estado de autenticación
