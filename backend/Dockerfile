# Dockerfile for Node Express Backend

FROM node:16.17.0

# Create App Directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install Dependencies
COPY package*.json ./

RUN npm install --production --silent

# Install nodemon globally
RUN npm install -g nodemon

# Copy app source code
COPY . .

# Expose the port that your application is listening on
EXPOSE 5000

# Start the application with nodemon
CMD ["nodemon", "app.js"]
