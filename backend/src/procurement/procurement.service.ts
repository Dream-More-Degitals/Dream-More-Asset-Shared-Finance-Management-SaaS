import { PrismaClient, ProcurementStatus, Priority } from '@prisma/client'

const prisma = new PrismaClient()

export interface CreateProcurementData {
  title: string
  category: string
  department: string
  requestedBy: string
  amount: number
  priority?: Priority
  description?: string
  vendor?: string
  deliveryDate?: string
  justification?: string
}

export interface UpdateProcurementData {
  title?: string
  category?: string
  department?: string
  requestedBy?: string
  amount?: number
  priority?: Priority
  description?: string
  vendor?: string
  deliveryDate?: string
  justification?: string
}

export async function getAllProcurementRequests() {
  return prisma.procurementRequest.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export async function getProcurementRequestById(id: string) {
  return prisma.procurementRequest.findUnique({
    where: { id },
  })
}

export async function createProcurementRequest(data: CreateProcurementData) {
  return prisma.procurementRequest.create({
    data: {
      title: data.title,
      category: data.category,
      department: data.department,
      requestedBy: data.requestedBy,
      amount: data.amount,
      priority: data.priority ?? Priority.MEDIUM,
      description: data.description,
      vendor: data.vendor,
      deliveryDate: data.deliveryDate
        ? new Date(data.deliveryDate)
        : undefined,
      justification: data.justification,
      status: ProcurementStatus.DRAFT,
    },
  })
}

export async function updateProcurementRequest(
  id: string,
  data: UpdateProcurementData
) {
  return prisma.procurementRequest.update({
    where: { id },
    data: {
      title: data.title,
      category: data.category,
      department: data.department,
      requestedBy: data.requestedBy,
      amount: data.amount,
      priority: data.priority,
      description: data.description,
      vendor: data.vendor,
      deliveryDate: data.deliveryDate
        ? new Date(data.deliveryDate)
        : undefined,
      justification: data.justification,
    },
  })
}

export async function deleteProcurementRequest(id: string) {
  return prisma.procurementRequest.delete({
    where: { id },
  })
}

export async function submitProcurementRequest(id: string) {
  const request = await prisma.procurementRequest.findUnique({
    where: { id },
  })

  if (!request) {
    throw new Error('Procurement request not found')
  }

  if (request.status !== ProcurementStatus.DRAFT) {
    throw new Error('Only draft requests can be submitted')
  }

  return prisma.procurementRequest.update({
    where: { id },
    data: {
      status: ProcurementStatus.PENDING,
    },
  })
}

export async function approveProcurementRequest(id: string) {
  const request = await prisma.procurementRequest.findUnique({
    where: { id },
  })

  if (!request) {
    throw new Error('Procurement request not found')
  }

  if (request.status !== ProcurementStatus.PENDING) {
    throw new Error('Only pending requests can be approved')
  }

  return prisma.procurementRequest.update({
    where: { id },
    data: {
      status: ProcurementStatus.APPROVED,
    },
  })
}

export async function completeProcurementRequest(id: string) {
  const request = await prisma.procurementRequest.findUnique({
    where: { id },
  })

  if (!request) {
    throw new Error('Procurement request not found')
  }

  if (request.status !== ProcurementStatus.APPROVED) {
    throw new Error('Only approved requests can be completed')
  }

  return prisma.procurementRequest.update({
    where: { id },
    data: {
      status: ProcurementStatus.COMPLETED,
    },
  })
}

export async function rejectProcurementRequest(id: string) {
  const request = await prisma.procurementRequest.findUnique({
    where: { id },
  })

  if (!request) {
    throw new Error('Procurement request not found')
  }

  if (
    request.status !== ProcurementStatus.PENDING &&
    request.status !== ProcurementStatus.APPROVED
  ) {
    throw new Error('Only pending or approved requests can be rejected')
  }

  return prisma.procurementRequest.update({
    where: { id },
    data: {
      status: ProcurementStatus.CANCELLED,
    },
  })
}