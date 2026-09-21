import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Get all shareholders
export async function getAllShareholders() {
  return prisma.shareholder.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })
}

// Get shareholder by ID
export async function getShareholderById(id: string) {
  return prisma.shareholder.findUnique({
    where: { id },
  })
}

// Create shareholder
export async function createShareholder(data: {
  name: string
  company: string
  shares: number
  ownership: number
  investment: number
  dividend?: number
  status?: 'ACTIVE' | 'PENDING' | 'INACTIVE'
  email?: string
  phone?: string
}) {
  return prisma.shareholder.create({
    data,
  })
}

// Update shareholder
export async function updateShareholder(
  id: string,
  data: {
    name?: string
    company?: string
    shares?: number
    ownership?: number
    investment?: number
    dividend?: number
    status?: 'ACTIVE' | 'PENDING' | 'INACTIVE'
    email?: string
    phone?: string
  }
) {
  return prisma.shareholder.update({
    where: { id },
    data,
  })
}

// Delete shareholder
export async function deleteShareholder(id: string) {
  return prisma.shareholder.delete({
    where: { id },
  })
}

// Get shareholder statistics
export async function getShareholderStats() {
  const [count, totals] = await Promise.all([
    prisma.shareholder.count(),

    prisma.shareholder.aggregate({
      _sum: {
        shares: true,
        investment: true,
        dividend: true,
      },
    }),
  ])

  return {
    totalShareholders: count,
    totalShares: totals._sum.shares ?? 0,
    totalInvestment: totals._sum.investment ?? 0,
    totalDividends: totals._sum.dividend ?? 0,
  }
}