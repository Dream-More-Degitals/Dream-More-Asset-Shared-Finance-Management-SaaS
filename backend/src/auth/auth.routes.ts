import { Router } from 'express'
import { login, register, getMe } from './auth.controller'
import { authenticate } from '../middleware/auth'

const router = Router()

router.post('/login', login)
router.get('/me', authenticate, getMe)

export default router