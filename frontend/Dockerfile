# syntax=docker/dockerfile:1

# Pull official base image
FROM node:20.10.0-alpine

# Declare env
ENV NODE_ENV development

# Set working directory
WORKDIR /frontend

# Install app dependencies
COPY ./package*.json /frontend

RUN npm install

# Copy the source code into the container
COPY . .

# Start app
EXPOSE 3000
CMD ["npm", "start"]