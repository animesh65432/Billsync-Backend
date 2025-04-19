FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src
COPY .env ./

RUN npm install
RUN npx prisma generate --schema=./src/db/prisma/schema.prisma
RUN npx tsc

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app .
COPY .env ./
EXPOSE 3000

CMD ["node", "dist/index.js"]
