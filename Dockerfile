# Stage 1: Build the Frontend
FROM node:14 as frontend-builder

# Set the working directory for the frontend
WORKDIR /app/frontend

# Copy the frontend application files to the container
COPY frontend ./
# COPY frontend/yarn.lock ./
RUN yarn install

# Copy the frontend source code into the container
# COPY frontend/ ./

# Build the frontend application
RUN yarn build

# Stage 2: Build the Backend
FROM node:14 as backend-builder

# Set the working directory for the backend
WORKDIR /app/backend

# Copy the backend application files to the container
COPY backend ./

# COPY backend/yarn.lock ./
RUN npm install

# Copy the backend source code into the container
# COPY backend/ ./

# Stage 3: Create the Production Image
FROM node:14

# Set the working directory for the combined application
WORKDIR /app

# Copy the built frontend files from the frontend-builder stage
COPY --from=frontend-builder /app/frontend/build ./frontend

# Copy the built backend files from the backend-builder stage
COPY --from=backend-builder /app/backend/build ./backend

# Expose the ports used by your backend and frontend (adjust as needed)
EXPOSE 3000 
EXPOSE 4000 

# Define the entry point for the backend
CMD ["node", "server.js"]
