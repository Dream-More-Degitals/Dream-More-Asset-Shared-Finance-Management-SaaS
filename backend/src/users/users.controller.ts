import { Request, Response } from 'express'
import { userService } from './users.service'
import { AuthRequest } from '../middleware/auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
// Get all users (Admin only)
export async function getUsers(req: Request, res: Response) {
  try {
    const users = await userService.getAllUsers()
    res.json({ success: true, data: users })
  } catch (error) {
    console.error('Get users error:', error)
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    })
  }
}

// Get user by ID
export async function getUserById(req: Request, res: Response) {
  try {
    const { id } = req.params
    const user = await userService.getUserById(id)
    res.json({ success: true, data: user })
  } catch (error: any) {
    if (error.message === 'User not found') {
      return res.status(404).json({ 
        success: false, 
        message: error.message 
      })
    }
    console.error('Get user error:', error)
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    })
  }
}

// Update user
export async function updateUser(req: Request, res: Response) {
  try {
    const { id } = req.params
    const user = await userService.updateUser(id, req.body)
    res.json({ success: true, data: user })
  } catch (error: any) {
    if (error.message === 'User not found') {
      return res.status(404).json({ 
        success: false, 
        message: error.message 
      })
    }
    console.error('Update user error:', error)
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    })
  }
}

// Delete user
export async function deleteUser(req: Request, res: Response) {
  try {
    const { id } = req.params
    const user = await userService.deleteUser(id)
    res.json({ 
      success: true, 
      message: 'User deactivated successfully', 
      data: user 
    })
  } catch (error: any) {
    if (error.message === 'User not found') {
      return res.status(404).json({ 
        success: false, 
        message: error.message 
      })
    }
    console.error('Delete user error:', error)
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    })
  }
}

// Change user role (Admin only)
export async function changeUserRole(req: Request, res: Response) {
  try {
    const { id } = req.params
    const { role } = req.body

    if (!role) {
      return res.status(400).json({ 
        success: false, 
        message: 'Role is required' 
      })
    }

    const user = await userService.changeRole(id, role)
    res.json({ 
      success: true, 
      message: `User role updated to ${role}`, 
      data: user 
    })
  } catch (error: any) {
    if (error.message === 'User not found') {
      return res.status(404).json({ 
        success: false, 
        message: error.message 
      })
    }
    console.error('Change role error:', error)
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    })
  }
}

// Get current user profile
export async function getProfile(req: AuthRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Unauthorized' 
      })
    }

    const user = await userService.getUserById(req.user.userId)
    res.json({ success: true, data: user })
  } catch (error: any) {
    if (error.message === 'User not found') {
      return res.status(404).json({ 
        success: false, 
        message: error.message 
      })
    }
    console.error('Get profile error:', error)
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    })
  }
}

// Update profile
export async function updateProfile(req: AuthRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Unauthorized' 
      })
    }

    const user = await userService.updateProfile(req.user.userId, req.body)
    res.json({ 
      success: true, 
      message: 'Profile updated successfully', 
      data: user 
    })
  } catch (error) {
    console.error('Update profile error:', error)
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    })
  }
}

// Admin creates user (with email notification)
export async function createUserByAdmin(req: Request, res: Response) {
  try {
    const { name, email, role, department } = req.body

    // Validate input
    if (!name || !email || !role) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, and role are required' 
      })
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return res.status(409).json({ 
        success: false, 
        message: 'User with this email already exists' 
      })
    }

    const user = await userService.createUserByAdmin({
      name,
      email,
      role,
      department,
    })

    res.status(201).json({
      success: true,
      message: `User created successfully. Welcome email sent to ${email}`,
      data: user
    })
  } catch (error) {
    console.error('Create user error:', error)
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    })
  }
}

// Change password (with mustChangePassword flag)
export async function changePassword(req: AuthRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Unauthorized' 
      })
    }

    const { currentPassword, newPassword } = req.body

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ 
        success: false, 
        message: 'Current password and new password are required' 
      })
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ 
        success: false, 
        message: 'New password must be at least 8 characters' 
      })
    }

    await userService.changePasswordAndClearFlag(req.user.userId, currentPassword, newPassword)
    
    res.json({ 
      success: true, 
      message: 'Password changed successfully' 
    })
  } catch (error: any) {
    if (error.message === 'Current password is incorrect') {
      return res.status(400).json({ 
        success: false, 
        message: error.message 
      })
    }
    console.error('Change password error:', error)
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    })
  }
}