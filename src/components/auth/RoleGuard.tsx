'use client'

import { ReactNode } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { UserRole } from '../../auth/types'

interface RoleGuardProps {
  children: ReactNode
  allowedRoles: UserRole | UserRole[]
  fallback?: ReactNode
}

export function RoleGuard({ children, allowedRoles, fallback = null }: RoleGuardProps) {
  const { hasRole, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="w-6 h-6 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (hasRole(allowedRoles)) {
    return <>{children}</>
  }

  return <>{fallback}</>
}