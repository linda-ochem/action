# Stage 1: Build the frontend (React) application
FROM node:alpine AS frontend-builder
WORKDIR /app
COPY frontend/package.json frontend/package-lock.json ./
# COPY frontend/yarn.lock ./
RUN yarn install

# Copy the frontend source code into the container
COPY frontend/ ./

# Build the frontend 
RUN yarn build

# RUN npm install
# COPY frontend ./
# RUN npm run build

# Stage 2: Build the backend (Node.js) application
FROM node:alpine AS backend-builder
WORKDIR /app
COPY backend/package.json backend/package-lock.json ./
RUN npm install -g nodemon
RUN npm install
COPY backend ./

# Stage 3: Create the final image
FROM node:alpine
WORKDIR /app

# Copy the built frontend and backend applications from previous stages
COPY --from=frontend-builder /app/build ./frontend
COPY --from=backend-builder /app/ ./backend


# Expose ports for frontend and backend
EXPOSE 3000
EXPOSE 4000

# Run the backend and frontend applications
CMD ["npm", "run", "dev"]




# # Stage 1: Build the Frontend
# FROM node:14 as frontend-builder

# # Set the working directory for the frontend
# WORKDIR /app/frontend


# # Copy the frontend application files to the container
# COPY frontend ./app/
# # COPY frontend/yarn.lock ./
# RUN yarn install

# # Copy the frontend source code into the container
# # COPY frontend/ ./

# # Build the frontend application
# RUN yarn build

# # Stage 2: Build the Backend
# FROM node:14 as backend-builder

# # Set the working directory for the backend
# WORKDIR /app/backend

# # Copy the backend application files to the container
# COPY backend ./app/

# # COPY backend/yarn.lock ./
# RUN npm install

# # Copy the backend source code into the container
# # COPY backend/ ./

# # Stage 3: Create the Production Image
# FROM node:14

# # Set the working directory for the combined application
# WORKDIR /app

# # Copy the built frontend files from the frontend-builder stage
# COPY --from=frontend-builder /app/frontend/build ./frontend

# # Copy the built backend files from the backend-builder stage
# COPY --from=backend-builder /app/backend ./

# # Expose the ports used by your backend and frontend (adjust as needed)
# EXPOSE 3000 
# EXPOSE 4000 

# # Define the entry point for the backend
# CMD ["node", "server.js"]
