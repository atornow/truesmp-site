# Use the official Node.js 16 image as a parent image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application's code
COPY . .

# Make port 3001 available to the world outside this container
EXPOSE 3000

# Define the command to run your app
CMD ["node", "server.js"]
