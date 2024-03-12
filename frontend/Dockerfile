# Use an official Node.js runtime as the base image
FROM node:latest as build

# Set the working directory in the container
WORKDIR /app/frontend

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Use NGINX for serving the built React app
FROM nginx:alpine

# Copy the build output to NGINX's default public directory
COPY --from=build /app/frontend/build /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 3000

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]
