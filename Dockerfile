FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src

RUN npm install
RUN npx prisma generate --schema=./src/db/prisma/schema.prisma
RUN npx tsc

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app .
EXPOSE 3000

CMD ["node", "dist/index.js"]
