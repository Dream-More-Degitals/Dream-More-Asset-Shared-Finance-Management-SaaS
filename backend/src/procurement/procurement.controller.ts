import { Request, Response } from 'express'
import {
  createProcurementRequest,
  deleteProcurementRequest,
  getAllProcurementRequests,
  getProcurementRequestById,
  updateProcurementRequest,
  submitProcurementRequest,
  approveProcurementRequest,
  completeProcurementRequest,
  rejectProcurementRequest,
} from './procurement.service'

export async function getAll(req: Request, res: Response) {
  try {
    const requests = await getAllProcurementRequests()

    res.status(200).json({
      success: true,
      data: requests,
    })
  } catch (error) {
    console.error('Get procurement requests error:', error)

    res.status(500).json({
      success: false,
      message: 'Failed to fetch procurement requests',
    })
  }
}

export async function getById(req: Request, res: Response) {
  try {
    const request = await getProcurementRequestById(req.params.id)

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Procurement request not found',
      })
    }

    res.status(200).json({
      success: true,
      data: request,
    })
  } catch (error) {
    console.error('Get procurement request error:', error)

    res.status(500).json({
      success: false,
      message: 'Failed to fetch procurement request',
    })
  }
}

export async function create(req: Request, res: Response) {
  try {
    const {
      title,
      category,
      department,
      requestedBy,
      amount,
      priority,
      description,
      vendor,
      deliveryDate,
      justification,
    } = req.body

    if (
      !title ||
      !category ||
      !department ||
      !requestedBy ||
      amount === undefined
    ) {
      return res.status(400).json({
        success: false,
        message:
          'title, category, department, requestedBy, and amount are required',
      })
    }

    if (Number(amount) <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be greater than zero',
      })
    }

    const request = await createProcurementRequest({
      title,
      category,
      department,
      requestedBy,
      amount: Number(amount),
      priority,
      description,
      vendor,
      deliveryDate,
      justification,
    })

    res.status(201).json({
      success: true,
      message: 'Procurement request created successfully',
      data: request,
    })
  } catch (error) {
    console.error('Create procurement request error:', error)

    res.status(500).json({
      success: false,
      message: 'Failed to create procurement request',
    })
  }
}

export async function update(req: Request, res: Response) {
  try {
    const existing = await getProcurementRequestById(req.params.id)

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: 'Procurement request not found',
      })
    }

    if (
      existing.status !== 'DRAFT'
    ) {
      return res.status(400).json({
        success: false,
        message: 'Only draft requests can be updated',
      })
    }

    const request = await updateProcurementRequest(
      req.params.id,
      req.body
    )

    res.status(200).json({
      success: true,
      message: 'Procurement request updated successfully',
      data: request,
    })
  } catch (error) {
    console.error('Update procurement request error:', error)

    res.status(500).json({
      success: false,
      message: 'Failed to update procurement request',
    })
  }
}

export async function remove(req: Request, res: Response) {
  try {
    const existing = await getProcurementRequestById(req.params.id)

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: 'Procurement request not found',
      })
    }

    await deleteProcurementRequest(req.params.id)

    res.status(200).json({
      success: true,
      message: 'Procurement request deleted successfully',
    })
  } catch (error) {
    console.error('Delete procurement request error:', error)

    res.status(500).json({
      success: false,
      message: 'Failed to delete procurement request',
    })
  }
}

export async function submit(req: Request, res: Response) {
  try {
    const request = await submitProcurementRequest(req.params.id)

    res.status(200).json({
      success: true,
      message: 'Procurement request submitted successfully',
      data: request,
    })
  } catch (error) {
    console.error('Submit procurement request error:', error)

    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'Failed to submit procurement request',
    })
  }
}

export async function approve(req: Request, res: Response) {
  try {
    const request = await approveProcurementRequest(req.params.id)

    res.status(200).json({
      success: true,
      message: 'Procurement request approved successfully',
      data: request,
    })
  } catch (error) {
    console.error('Approve procurement request error:', error)

    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'Failed to approve procurement request',
    })
  }
}

export async function complete(req: Request, res: Response) {
  try {
    const request = await completeProcurementRequest(req.params.id)

    res.status(200).json({
      success: true,
      message: 'Procurement request completed successfully',
      data: request,
    })
  } catch (error) {
    console.error('Complete procurement request error:', error)

    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'Failed to complete procurement request',
    })
  }
}

export async function reject(req: Request, res: Response) {
  try {
    const request = await rejectProcurementRequest(req.params.id)

    res.status(200).json({
      success: true,
      message: 'Procurement request rejected successfully',
      data: request,
    })
  } catch (error) {
    console.error('Reject procurement request error:', error)

    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'Failed to reject procurement request',
    })
  }
}