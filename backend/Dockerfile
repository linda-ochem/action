# Use an official Node.js runtime as the base image
FROM node:latest

# Set the working directory in the container
WORKDIR /app/backend

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --no-bin-links

# Copy the rest of the application code
COPY . .

# Expose port 5000 to the outside world
EXPOSE 4000

# Command to run the backend server
CMD ["npm", "dev"]
