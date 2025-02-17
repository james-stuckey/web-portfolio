FROM node:22 AS base
WORKDIR /app
COPY package*.json ./
COPY . ./
RUN npm install

