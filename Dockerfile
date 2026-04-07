# Stage 1: Build React frontend
FROM node:20-alpine AS frontend-builder

WORKDIR /frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# Stage 2: Backend with built frontend
FROM node:20-alpine

WORKDIR /app

COPY backend/package*.json ./
RUN npm install --production

COPY backend/ .

# Copy built frontend into backend/public
COPY --from=frontend-builder /frontend/dist ./public

RUN mkdir -p /mnt/uploads

EXPOSE 8080

CMD ["node", "server.js"]
