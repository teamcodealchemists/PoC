ARG IMAGE=node:22-alpine

#COMMON BASE IMAGE
FROM $IMAGE AS builder
WORKDIR /usr/src/app
COPY . .
RUN npm install
EXPOSE 3000