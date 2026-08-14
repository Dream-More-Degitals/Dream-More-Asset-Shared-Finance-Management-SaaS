'use client'

import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../hooks/useAuth'
import { UserRole } from '../../auth/types'
import { Shield, Lock } from 'lucide-react'

interface ProtectedRouteProps {
  children: ReactNode
  allowedRoles?: UserRole | UserRole[]
  redirectTo?: string
}

export function ProtectedRoute({ 
  children, 
  allowedRoles, 
  redirectTo = '/login' 
}: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading, hasRole } = useAuth()
  const router = useRouter()

  // Get role-based default redirect
  const getRoleRedirect = (role: string): string => {
    const redirectMap: Record<string, string> = {
      'ADMIN': '/dashboard',
      'FINANCE_OFFICER': '/finance',
      'ASSET_MANAGER': '/assets',
      'SHAREHOLDER': '/investments',
      'PROCUREMENT_OFFICER': '/procurement',
    }
    return redirectMap[role] || '/dashboard'
  }

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(redirectTo)
      return
    }

    if (!isLoading && isAuthenticated && allowedRoles) {
      const hasAccess = hasRole(allowedRoles)
      if (!hasAccess) {
        // Redirect to user's default page instead of dashboard
        const defaultRedirect = user ? getRoleRedirect(user.role) : '/dashboard'
        router.push(defaultRedirect)
      }
    }
  }, [isLoading, isAuthenticated, router, redirectTo, allowedRoles, hasRole, user])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-gray-500">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  // Check role-based access
  if (allowedRoles && !hasRole(allowedRoles)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center mb-4">
          <Shield className="w-10 h-10 text-orange-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Access Restricted</h2>
        <p className="text-gray-500 mt-2 max-w-md">
          You do not have permission to access this resource. Please contact your administrator for assistance.
        </p>
        <div className="flex items-center gap-2 mt-4 text-sm text-gray-400">
          <Lock className="w-4 h-4" />
          <span>Requires: {Array.isArray(allowedRoles) ? allowedRoles.join(', ') : allowedRoles}</span>
        </div>
      </div>
    )
  }

  return <>{children}</>
}