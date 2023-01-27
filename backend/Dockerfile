# Base image
FROM node

# Make folder to put our files in
WORKDIR /usr/src/app/backend

# Set working directory so that all subsequent command runs in this folder
WORKDIR /usr/src/app/backend

# Copy package json and install dependencies
COPY package*.json ./
COPY prisma ./prisma
RUN npm install

# Copy our app
COPY . .

# Expose port to access server
EXPOSE 8080

ENTRYPOINT [ "bash", "setup.sh" ]

# Command to run our app
CMD [ "npm", "run", "start"]