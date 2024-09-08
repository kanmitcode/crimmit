# Base image
FROM node:16

# Set working directory
WORKDIR /dist

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies (including dev dependencies)
RUN npm install

RUN chmod -R 755 /dist

# RUN npm install ../shared-proto

# Copy the rest of the application code
COPY . .

# Copy shared-proto into the container
# COPY ../shared-proto ./shared-proto

# Expose the port the app runs on
EXPOSE 3003

# Command to run the application in development mode
CMD ["npm", "run", "start:dev"]
