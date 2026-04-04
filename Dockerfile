# ─── Stage 1: Build ──────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Instalar dependencias primero (capa cacheable)
COPY package*.json ./
RUN npm ci

# Copiar el resto del código y compilar en modo producción
COPY . .
RUN npm run build -- --configuration production

# ─── Stage 2: Serve ───────────────────────────────────────────────────────────
FROM nginx:1.27-alpine

# Copiar el build de Angular al directorio de nginx
COPY --from=builder /app/dist/Life_OS_frontend/browser /usr/share/nginx/html

# Copiar configuración personalizada de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
