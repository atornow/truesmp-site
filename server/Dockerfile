# Use the official Node.js 16 image as a parent image
FROM node:16-alpine as build-stage

# Install build dependencies for bcrypt
RUN apk add --no-cache make gcc g++ python3

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of your application's code
COPY . .

# TEMPORARY for one hot updating backend.
RUN npm install -g nodemon

# Make port 3001 available to the world outside this container
EXPOSE 3001

# Define the command to run your app
CMD ["nodemon", "server.js"]