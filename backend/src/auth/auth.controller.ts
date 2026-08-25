import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email, 
        role: user.role 
      },
      process.env.JWT_SECRET || 'default-secret-key',
      { expiresIn: '7d' } as jwt.SignOptions
    )

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() }
    })

    // Return user info (without password)
    const { password: _, ...userWithoutPassword } = user

    res.json({
      success: true,
      token,
      user: userWithoutPassword
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export async function getMe(req: Request, res: Response) {
  try {
    const userId = (req as any).user?.userId
    
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        department: true,
        status: true,
        lastLogin: true,
        createdAt: true,
        updatedAt: true,
      }
    })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json({ success: true, user })
  } catch (error) {
    console.error('Get me error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}