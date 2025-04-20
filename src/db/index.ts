import { PrismaClient, status } from "@prisma/client"

const db = new PrismaClient()

export { status, db }
