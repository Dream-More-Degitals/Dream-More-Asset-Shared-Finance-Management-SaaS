import { Permission, UserRole } from '../auth/types'

export const PERMISSIONS: Record<string, Permission> = {
  VIEW_DASHBOARD: {
    key: 'VIEW_DASHBOARD',
    description: 'View dashboard',
    roles: ['ADMIN', 'FINANCE_OFFICER', 'ASSET_MANAGER', 'SHAREHOLDER', 'PROCUREMENT_OFFICER'],
  },
  VIEW_USERS: {
    key: 'VIEW_USERS',
    description: 'View user management',
    roles: ['ADMIN'],
  },
  MANAGE_USERS: {
    key: 'MANAGE_USERS',
    description: 'Manage users',
    roles: ['ADMIN'],
  },
  VIEW_ASSETS: {
    key: 'VIEW_ASSETS',
    description: 'View assets',
    roles: ['ADMIN', 'FINANCE_OFFICER', 'ASSET_MANAGER', 'PROCUREMENT_OFFICER'],
  },
  VIEW_FINANCE: {
    key: 'VIEW_FINANCE',
    description: 'View finance',
    roles: ['ADMIN', 'FINANCE_OFFICER'],
  },
  VIEW_SHAREHOLDERS: {
    key: 'VIEW_SHAREHOLDERS',
    description: 'View shareholders',
    roles: ['ADMIN'],
  },
  VIEW_INVESTMENTS: {
    key: 'VIEW_INVESTMENTS',
    description: 'View investments',
    roles: ['ADMIN', 'SHAREHOLDER'],
  },
  VIEW_PROCUREMENT: {
    key: 'VIEW_PROCUREMENT',
    description: 'View procurement',
    roles: ['ADMIN', 'ASSET_MANAGER', 'PROCUREMENT_OFFICER'],
  },
  VIEW_GOVERNANCE: {
    key: 'VIEW_GOVERNANCE',
    description: 'View governance',
    roles: ['ADMIN'],
  },
  VIEW_REPORTS: {
    key: 'VIEW_REPORTS',
    description: 'View reports',
    roles: ['ADMIN', 'FINANCE_OFFICER', 'ASSET_MANAGER', 'SHAREHOLDER', 'PROCUREMENT_OFFICER'],
  },
  VIEW_AI_INSIGHTS: {
    key: 'VIEW_AI_INSIGHTS',
    description: 'View AI insights',
    roles: ['ADMIN', 'FINANCE_OFFICER'],
  },
  VIEW_NOTIFICATIONS: {
    key: 'VIEW_NOTIFICATIONS',
    description: 'View notifications',
    roles: ['ADMIN', 'FINANCE_OFFICER', 'ASSET_MANAGER', 'SHAREHOLDER', 'PROCUREMENT_OFFICER'],
  },
  VIEW_SETTINGS: {
    key: 'VIEW_SETTINGS',
    description: 'View settings',
    roles: ['ADMIN', 'FINANCE_OFFICER', 'ASSET_MANAGER', 'SHAREHOLDER', 'PROCUREMENT_OFFICER'],
  },
}

export const hasPermission = (userRole: UserRole, permissionKey: string): boolean => {
  const permission = PERMISSIONS[permissionKey]
  if (!permission) return false
  return permission.roles.includes(userRole)
}