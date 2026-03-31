FROM node:20-alpine

WORKDIR /app

# Copy package files duluan biar installnya cepat
COPY backend/package*.json ./

# Install SEMUA library termasuk helmet
RUN npm install

# Copy semua file backend
COPY backend/ .

# Copy folder frontend juga kalau memang disatukan
COPY frontend/ ./frontend

EXPOSE 5000

# Jalankan server.js (Pastikan file ini ada di root folder backend kamu)
CMD ["node", "server.js"]