import { PrismaClient } from '@prisma/client'

// Prevent creating multiple PrismaClient instances in development (hot reload).
// eslint-disable-next-line no-underscore-dangle
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

