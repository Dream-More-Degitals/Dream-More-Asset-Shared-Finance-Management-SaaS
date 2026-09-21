import { Router } from 'express'
import {
  getShareholders,
  getShareholder,
  createNewShareholder,
  updateExistingShareholder,
  removeShareholder,
  getStats,
} from './shareholders.controller'

import { authenticate } from '../middleware/auth'

const router = Router()

// All shareholder routes require authentication
router.use(authenticate)

// IMPORTANT:
// Put /stats BEFORE /:id
router.get('/stats', getStats)

router.get('/', getShareholders)

router.get('/:id', getShareholder)

router.post('/', createNewShareholder)

router.put('/:id', updateExistingShareholder)

router.delete('/:id', removeShareholder)

export default router