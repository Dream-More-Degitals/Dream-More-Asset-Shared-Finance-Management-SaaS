import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { sendWelcomeEmail } from '../services/email.service'

const prisma = new PrismaClient()

export class UserService {
  // Get all users (Admin only)
  async getAllUsers() {
    return await prisma.user.findMany({
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
      },
      orderBy: { createdAt: 'desc' }
    })
  }

  // Get user by ID
  async getUserById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
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
      throw new Error('User not found')
    }

    return user
  }

  // Update user
  async updateUser(id: string, data: any) {
    await this.getUserById(id)

    const { password, ...updateData } = data

    return await prisma.user.update({
      where: { id },
      data: updateData,
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
  }

  // Delete user (soft delete - set status to INACTIVE)
  async deleteUser(id: string) {
    await this.getUserById(id)

    return await prisma.user.update({
      where: { id },
      data: { status: 'INACTIVE' },
      select: {
        id: true,
        name: true,
        email: true,
        status: true,
      }
    })
  }

  // Change user role (Admin only)
  async changeRole(id: string, role: string) {
    await this.getUserById(id)

    return await prisma.user.update({
      where: { id },
      data: { role: role as any },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      }
    })
  }

  // Update user profile
  async updateProfile(userId: string, data: any) {
    const { password, ...updateData } = data

    return await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        department: true,
        updatedAt: true,
      }
    })
  }

  // Change password
  async changePassword(userId: string, currentPassword: string, newPassword: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      throw new Error('User not found')
    }

    const isValid = await bcrypt.compare(currentPassword, user.password)
    if (!isValid) {
      throw new Error('Current password is incorrect')
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    return await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword }
    })
  }
  // Admin creates user with email notification
  async createUserByAdmin(data: {
    name: string
    email: string
    role: string
    department?: string
  }) {
    // Generate temporary password (12 characters)
    const tempPassword = this.generateTempPassword()
    const hashedPassword = await bcrypt.hash(tempPassword, 10)

    // Create user with mustChangePassword flag
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: data.role as any,
        department: data.department,
        status: 'ACTIVE',
        mustChangePassword: true, // Force password change on first login
      }
    })

    // Send welcome email with temporary password
    try {
      await sendWelcomeEmail({
        to: data.email,
        name: data.name,
        role: data.role,
        tempPassword,
      })
    } catch (error) {
      console.error('Failed to send welcome email:', error)
      // Don't throw - user is created, but email failed
      // You might want to handle this differently in production
    }

    // Return user without password
    const { password, ...userWithoutPassword } = user
    return userWithoutPassword
  }

  // Generate temporary password
  private generateTempPassword(): string {
    const length = 12
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%'
    let password = ''
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return password
  }

  // Change password and clear mustChangePassword flag
  async changePasswordAndClearFlag(userId: string, currentPassword: string, newPassword: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      throw new Error('User not found')
    }

    // Verify current password
    const isValid = await bcrypt.compare(currentPassword, user.password)
    if (!isValid) {
      throw new Error('Current password is incorrect')
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    // Update password and clear the flag
    return await prisma.user.update({
      where: { id: userId },
      data: { 
        password: hashedPassword,
        mustChangePassword: false,
      }
    })
  }

}

export const userService = new UserService()