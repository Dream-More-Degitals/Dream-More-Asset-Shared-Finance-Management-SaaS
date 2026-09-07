import { Response, NextFunction } from 'express'
import { AuthRequest } from './auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function requirePasswordChange(req: AuthRequest, res: Response, next: NextFunction) {
  if (!req.user) {
    return res.status(401).json({ 
      success: false, 
      message: 'Unauthorized' 
    })
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: { mustChangePassword: true }
    })

    if (user?.mustChangePassword) {
      return res.status(403).json({
        success: false,
        message: 'Password change required. Please update your password.',
        requiresPasswordChange: true
      })
    }

    next()
  } catch (error) {
    console.error('Password change check error:', error)
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    })
  }
}