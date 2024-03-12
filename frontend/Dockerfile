# Use an official Node.js runtime as the base image
FROM node:latest as build

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY ./package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 80 to the outside world
EXPOSE 3000

# Start NGINX server
CMD ["npm", "run", "start"]
