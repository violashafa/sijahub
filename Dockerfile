FROM node:20-alpine
WORKDIR /app

# Copy package backend
COPY backend/package*.json ./
RUN npm install --production

# Copy isi backend
COPY backend/ .

# Copy folder frontend (yang sejajar tadi) ke dalam container
COPY frontend/ ./frontend

EXPOSE 5000
CMD ["node", "server.js"]