'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User, AuthContextType, LoginCredentials, UserRole } from './types'
import { authService } from './auth.service'
import { hasPermission as checkPermission } from '@/config/permissions'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check for existing session on mount
  useEffect(() => {
    try {
      const currentUser = authService.getCurrentUser()
      if (currentUser) {
        setUser(currentUser)
        setIsAuthenticated(true)
      }
    } catch (error) {
      console.error('Auth init error:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Login function
  const login = async (credentials: LoginCredentials): Promise<User> => {
    setIsLoading(true)
    try {
      const loggedInUser = await authService.login(credentials)
      setUser(loggedInUser)
      setIsAuthenticated(true)
      return loggedInUser
    } catch (error: any) {
      console.error('Login error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Logout function
  const logout = () => {
    authService.logout()
    setUser(null)
    setIsAuthenticated(false)
  }

  // Check if user has permission
  const hasPermission = (permission: string): boolean => {
    if (!user) return false
    return checkPermission(user.role, permission)
  }

  // Check if user has specific role
  const hasRole = (roles: UserRole | UserRole[]): boolean => {
    if (!user) return false
    if (Array.isArray(roles)) {
      return roles.includes(user.role)
    }
    return user.role === roles
  }

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    hasPermission,
    hasRole,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook to use auth context
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}