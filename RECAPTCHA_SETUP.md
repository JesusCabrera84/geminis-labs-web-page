# Configuración de reCAPTCHA v3

Este documento explica cómo configurar reCAPTCHA v3 en diferentes entornos.

## 📋 Requisitos Previos

1. Obtén tus claves de reCAPTCHA v3:
   - Ve a: https://www.google.com/recaptcha/admin
   - Crea un nuevo sitio seleccionando **reCAPTCHA v3**
   - Anota tu **Clave del sitio (Site Key)** y **Clave secreta (Secret Key)**

## 🔧 Configuración por Entorno

### 1. Desarrollo Local

Crea un archivo `.env` en la raíz del proyecto:

```bash
# .env
VITE_RECAPTCHA_SITE_KEY=tu_site_key_aqui
```

Luego inicia el servidor de desarrollo:

```bash
npm run dev
```

### 2. Docker y Docker Compose

#### Opción A: Usando variables de entorno

```bash
# Construir con variables de entorno
docker build \
  --build-arg VITE_API_BASE_URL=http://localhost:8080 \
  --build-arg VITE_RECAPTCHA_SITE_KEY=tu_site_key_aqui \
  -t tracker-web:latest .

# Ejecutar el contenedor
docker run -d \
  --name tracker-web \
  -p 3330:3330 \
  tracker-web:latest
```

#### Opción B: Usando Docker Compose

1. Crea un archivo `.env.docker` basado en `.env.docker.example`:

```bash
cp .env.docker.example .env.docker
```

2. Edita `.env.docker` con tus valores:

```env
VITE_API_BASE_URL=http://localhost:8080
VITE_RECAPTCHA_SITE_KEY=tu_site_key_aqui
```

3. Ejecuta con Docker Compose:

```bash
# Construir y ejecutar
docker-compose --env-file .env.docker up -d

# Ver logs
docker-compose logs -f

# Detener
docker-compose down
```

### 3. GitHub Actions

La variable `VITE_RECAPTCHA_SITE_KEY` ya está configurada en el workflow de GitHub Actions.

#### Configurar la variable en GitHub:

1. Ve a tu repositorio en GitHub
2. Settings → Secrets and variables → Actions
3. En la pestaña **Variables**, haz clic en "New repository variable"
4. Nombre: `VITE_RECAPTCHA_SITE_KEY`
5. Valor: Tu site key de reCAPTCHA
6. Haz clic en "Add variable"

**Nota:** Se usa como **variable** (no secret) porque la site key de reCAPTCHA v3 es pública y se expone en el cliente.

## 🔒 Validación en el Backend

**IMPORTANTE:** La site key es pública, pero debes validar el token en tu backend usando la **secret key**.

Ejemplo de validación en el backend:

```javascript
// Backend - Validar token de reCAPTCHA
async function validateRecaptcha(token) {
	const secretKey = process.env.RECAPTCHA_SECRET_KEY; // Esta SÍ debe ser secreta

	const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: `secret=${secretKey}&response=${token}`
	});

	const data = await response.json();

	// Verificar que el score sea mayor a un umbral (ej: 0.5)
	return data.success && data.score >= 0.5;
}
```

## 📝 Estructura del Payload

El formulario de contacto enviará los datos con el siguiente formato:

```json
{
	"nombre": "Juan Pérez",
	"correo_electronico": "juan@example.com",
	"telefono": "+52 123 456 7890",
	"mensaje": "Estoy interesado en sus servicios",
	"recaptcha_token": "03AGdBq24PBCd9QF..."
}
```

## 🧪 Pruebas

Para probar en local sin reCAPTCHA configurado, la aplicación funcionará normalmente pero no enviará el token. Si necesitas probar con reCAPTCHA, usa las claves de prueba de Google:

- **Site Key de prueba:** `6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI`
- **Secret Key de prueba:** `6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe`

**Nota:** Las claves de prueba siempre devolverán éxito, úsalas solo para desarrollo.

## 🔍 Verificación

Para verificar que reCAPTCHA está funcionando:

1. Abre las DevTools del navegador
2. Ve a la pestaña Network
3. Envía el formulario
4. Busca la petición al endpoint de contacto
5. Verifica que el payload incluya `recaptcha_token`

## 📚 Recursos

- [Documentación de reCAPTCHA v3](https://developers.google.com/recaptcha/docs/v3)
- [Admin Console de reCAPTCHA](https://www.google.com/recaptcha/admin)
- [Interpretación de scores](https://developers.google.com/recaptcha/docs/v3#interpreting_the_score)
