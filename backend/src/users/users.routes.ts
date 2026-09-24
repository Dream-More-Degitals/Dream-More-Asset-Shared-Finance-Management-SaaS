import { Router } from 'express'
import { 
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  changeUserRole,
  getProfile,
  updateProfile,
  changePassword,
  createUserByAdmin, // ← Add this
} from './users.controller'
import { authenticate, requireRole } from '../middleware/auth'
import { requirePasswordChange } from '../middleware/force-password-change'

const router = Router()

// Protected routes (authenticated users)
// These require password change if mustChangePassword is true
router.get('/profile', authenticate, requirePasswordChange, getProfile)
router.put('/profile', authenticate, requirePasswordChange, updateProfile)
router.put('/profile/password', authenticate, changePassword) // No requirePasswordChange here

// Admin only routes
router.get('/', authenticate, requireRole('ADMIN'), getUsers)
router.post('/', authenticate, requireRole('ADMIN'), createUserByAdmin)
router.get('/:id', authenticate, requireRole('ADMIN'), getUserById)
router.put('/:id', authenticate, requireRole('ADMIN'), updateUser)
router.delete('/:id', authenticate, requireRole('ADMIN'), deleteUser)
router.put('/:id/role', authenticate, requireRole('ADMIN'), changeUserRole)

export default router