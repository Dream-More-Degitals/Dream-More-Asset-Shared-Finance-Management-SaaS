// import { Router } from 'express'
// import {
//   getAll,
//   getById,
//   create,
//   update,
//   remove,
//   submit,
//   approve,
//   complete,
//   reject,
// } from './procurement.controller'

// const router = Router()

// // CRUD
// router.get('/', getAll)
// router.get('/:id', getById)
// router.post('/', create)
// router.put('/:id', update)
// router.delete('/:id', remove)

// // Status workflow
// router.put('/:id/submit', submit)
// router.put('/:id/approve', approve)
// router.put('/:id/complete', complete)
// router.put('/:id/reject', reject)

// export default router
import { Router } from 'express'

import {
  getAll,
  getById,
  create,
  update,
  remove,
  submit,
  approve,
  complete,
  reject,
} from './procurement.controller'

import {
  authenticate,
  requireRole,
} from '../middleware/auth'

const router = Router()

// ==========================================
// PROCUREMENT REQUESTS
// ==========================================

// Get all procurement requests
router.get(
  '/',
  authenticate,
  getAll
)

// Get procurement request by ID
router.get(
  '/:id',
  authenticate,
  getById
)

// Create procurement request
router.post(
  '/',
  authenticate,
  requireRole([
    'ADMIN',
    'PROCUREMENT_OFFICER',
  ]),
  create
)

// Update draft procurement request
router.put(
  '/:id',
  authenticate,
  requireRole([
    'ADMIN',
    'PROCUREMENT_OFFICER',
  ]),
  update
)

// Delete procurement request
router.delete(
  '/:id',
  authenticate,
  requireRole([
    'ADMIN',
    'PROCUREMENT_OFFICER',
  ]),
  remove
)

// Submit DRAFT -> PENDING
router.patch(
  '/:id/submit',
  authenticate,
  requireRole([
    'ADMIN',
    'PROCUREMENT_OFFICER',
  ]),
  submit
)

// Approve PENDING -> APPROVED
router.patch(
  '/:id/approve',
  authenticate,
  requireRole([
    'ADMIN',
    'PROCUREMENT_OFFICER',
  ]),
  approve
)

// Complete APPROVED -> COMPLETED
router.patch(
  '/:id/complete',
  authenticate,
  requireRole([
    'ADMIN',
    'PROCUREMENT_OFFICER',
  ]),
  complete
)

// Cancel PENDING/APPROVED -> CANCELLED
router.patch(
  '/:id/reject',
  authenticate,
  requireRole([
    'ADMIN',
    'PROCUREMENT_OFFICER',
  ]),
  reject
)

export default router