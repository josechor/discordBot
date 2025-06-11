# Usa una imagen de Node.js como base
FROM node:22-alpine

# Define el directorio de trabajo
WORKDIR /app

COPY . .

# Instala las dependencias (incluso las de desarrollo)
RUN npm install

# Expón el puerto 3000
EXPOSE 3000