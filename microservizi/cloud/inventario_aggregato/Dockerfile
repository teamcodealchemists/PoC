FROM node:22-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN rm -rf ./src

EXPOSE 3010

CMD ["npm", "run", "start:dev"]
