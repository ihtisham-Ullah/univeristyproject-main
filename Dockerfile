# Use the node:16.17.0 base image
FROM node:16.17.0

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install --silent

# Copy the rest of the app's source code to the container
COPY . .

# Build the React.js app
RUN npm run build

# Expose the desired port (e.g., 3000) for the application
EXPOSE 3000

# Specify the command to run when the container starts
CMD ["npm", "start"]
