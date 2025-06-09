FROM node:22-alpine AS builder

WORKDIR /user/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


FROM node:22-alpine AS runner

WORKDIR /user/src/app

COPY --from=builder  /user/src/app/node_modules ./node_modules
COPY --from=builder  /user/src/app/dist ./dist


EXPOSE 8080

CMD ["node", "dist/main"]
