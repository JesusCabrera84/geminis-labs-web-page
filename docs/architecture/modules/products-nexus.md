# Módulo: Products - Nexus

## 📌 Descripción

Página de producto Nexus (plataforma de rastreo GPS).
Presenta características, planes, comparativas y llamados a la acción.

---

## 👤 Actor

- Usuario público (visitante interesado en Nexus)
- Cliente potencial

---

## 🔌 APIs y Recursos Consumidos

### 🔹 Recursos Estáticos

| Recurso                     | Tipo     | Uso                         |
| --------------------------- | -------- | --------------------------- |
| `/img/nexus-logo.png`       | Imagen   | Logo de Nexus               |
| `/img/nexus-carousel/*.jpg` | Imágenes | Carrusel de características |
| `/vid/map-back.mp4`         | Video    | Fondo animado de mapa       |

> **Nota**: Esta página es principalmente informativa y no consume APIs backend. Es una landing page de producto.

---

## 🔁 Flujo funcional

1. Usuario accede a `/products/nexus`
2. Renderizar secciones:
   - Hero con logo y animación
   - Características principales
   - Carrusel de imágenes (auto-play cada 3 segundos)
   - Comparativa de productos (TrackGo, FleetGuard, Nexus Core)
   - Planes y precios
   - FAQ
   - Call-to-action para crear cuenta
3. Efectos de scroll (sticky logo, fade transitions)
4. Navegación a registro: redirección a `/auth?mode=register`

---

## 🎨 Características Visuales

- **Sticky Logo**: Logo de Nexus permanece visible durante scroll
- **Carrusel automático**: Cambio de imágenes cada 3 segundos con fade
- **Animaciones de scroll**: Efectos parallax y fade
- **Video de fondo**: Mapa animado en sección hero
- **Productos expandibles**: Cards de TrackGo, FleetGuard, Nexus Core

---

## ⚠️ Consideraciones

- Página completamente estática (no requiere autenticación)
- Carrusel de imágenes usa JavaScript para auto-play
- Efectos de scroll pueden afectar rendimiento en móviles
- CTA redirige a `/auth?mode=register` para crear cuenta

---

## 🧭 Relación C4

- **Container:** Web App (SvelteKit)
- **Component:** Nexus Product Page
- **Consumes:** Recursos estáticos (imágenes, videos)
- **Uses components:** Navbar, Footer
- **Triggers:** Redirección a Auth Module para registro

---

## 📂 Archivos Relacionados

- [`src/routes/products/nexus/+page.svelte`](file:///home/chch/Code/geminis-labs-web-page/src/routes/products/nexus/+page.svelte) - Vista principal
- [`src/lib/components/Navbar.svelte`](file:///home/chch/Code/geminis-labs-web-page/src/lib/components/Navbar.svelte) - Barra de navegación
- [`src/lib/components/Footer.svelte`](file:///home/chch/Code/geminis-labs-web-page/src/lib/components/Footer.svelte) - Pie de página
