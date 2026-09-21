import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export interface AuthRequest extends Request {
  user?: {
    userId: string
    email: string
    role: string
  }
}

export function authenticate(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const token = authHeader.split(' ')[1]
    const secret = process.env.JWT_SECRET || 'default-secret-key'
    
    const decoded = jwt.verify(token, secret) as {
      userId: string
      email: string
      role: string
    }

    req.user = decoded
    next()
  } catch (error) {
    console.error('Auth error:', error)
    return res.status(401).json({ message: 'Invalid or expired token' })
  }
}

export function requireRole(roles: string | string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const allowedRoles = Array.isArray(roles) ? roles : [roles]
    
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: 'Forbidden: Insufficient permissions' 
      })
    }

    next()
  }
}