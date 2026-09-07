import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export interface AuthRequest extends Request {
  user?: {
    userId: string
    email: string
    role: string
  }
}

export async function authenticate(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false, 
        message: 'Unauthorized - No token provided' 
      })
    }

    const token = authHeader.split(' ')[1]
    const secret = process.env.JWT_SECRET || 'default-secret-key'
    
    const decoded = jwt.verify(token, secret) as {
      userId: string
      email: string
      role: string
    }

    // Verify user still exists
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true, role: true, status: true }
    })

    if (!user || user.status !== 'ACTIVE') {
      return res.status(401).json({ 
        success: false, 
        message: 'Unauthorized - User not found or inactive' 
      })
    }

    req.user = {
      userId: user.id,
      email: user.email,
      role: user.role
    }
    
    next()
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ 
        success: false, 
        message: 'Token expired' 
      })
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid token' 
      })
    }
    
    console.error('Auth error:', error)
    return res.status(401).json({ 
      success: false, 
      message: 'Unauthorized' 
    })
  }
}

export function requireRole(roles: string | string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Unauthorized' 
      })
    }

    const allowedRoles = Array.isArray(roles) ? roles : [roles]
    
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        message: 'Forbidden - Insufficient permissions' 
      })
    }

    next()
  }
}