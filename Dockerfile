# Usa una imagen de Node.js como base
FROM node:22-alpine

# Define el directorio de trabajo
WORKDIR /app

# Copia los archivos del proyecto
COPY package*.json ./

# Instala las dependencias (incluso las de desarrollo)
RUN npm install

# Copia el resto del código del proyecto
COPY . .

# Expón el puerto 3000
EXPOSE 3000