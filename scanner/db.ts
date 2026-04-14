import { PrismaClient } from '@prisma/client'
import { ScannedPostInput } from './types'

const prisma = new PrismaClient()

export async function isAlreadyProcessed(emailMessageId: string): Promise<boolean> {
  const existing = await prisma.scannedPost.findUnique({
    where: { emailMessageId },
  })
  return existing !== null
}

export async function saveScannedPost(data: ScannedPostInput) {
  return prisma.scannedPost.create({ data })
}

export async function disconnect() {
  await prisma.$disconnect()
}
