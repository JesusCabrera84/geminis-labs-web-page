# Usar imagen base de Node.js
FROM node:20-alpine AS builder

# Argumentos para variables de entorno de build
ARG VITE_API_BASE_URL
ARG VITE_RECAPTCHA_SITE_KEY

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar todas las dependencias (incluyendo devDependencies para el build)
RUN npm ci --ignore-scripts

# Copiar el código fuente
COPY . .

# Pasar las variables de entorno durante el build
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}
ENV VITE_RECAPTCHA_SITE_KEY=${VITE_RECAPTCHA_SITE_KEY}

# Construir la aplicación
RUN npm run build

# Instalar solo dependencias de producción para la etapa final
RUN npm ci --only=production --ignore-scripts

# Etapa de producción
FROM node:20-alpine AS runner

# Instalar dumb-init para manejo de señales
RUN apk add --no-cache dumb-init

# Crear usuario no-root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 sveltekit

# Establecer directorio de trabajo
WORKDIR /app

# Cambiar propietario del directorio
RUN chown sveltekit:nodejs /app
USER sveltekit

# Copiar archivos necesarios desde el builder
COPY --from=builder --chown=sveltekit:nodejs /app/build ./build
COPY --from=builder --chown=sveltekit:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=sveltekit:nodejs /app/package.json ./package.json
COPY --from=builder --chown=sveltekit:nodejs /app/static ./static

# Exponer puerto
EXPOSE 3330

# Variables de entorno
ENV NODE_ENV=production
ENV PORT=3330
ENV HOST=0.0.0.0

# Comando de inicio
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "build"]
