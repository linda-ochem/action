# Frontend Dockerfile
FROM node:latest as frontend-builder
WORKDIR /app
COPY frontend/ /app
RUN npm install
RUN npm run build

# Backend Dockerfile
FROM node:latest as backend-builder
WORKDIR /app
COPY backend/ /app
RUN npm install

# Final image
FROM node:latest
WORKDIR /app
COPY --from=frontend-builder /app/build /app/frontend
COPY --from=backend-builder /app /app/backend
WORKDIR /app/backend
CMD ["npm", "run", "dev"]
