# Use the official Node.js image as the base image
FROM --platform=linux/amd64 node:16-slim

# Create and change to the app directory
WORKDIR /app

# Copy the package.json and package-lock.json files to the app directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the app directory
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app
CMD ["node", "app.js"]
