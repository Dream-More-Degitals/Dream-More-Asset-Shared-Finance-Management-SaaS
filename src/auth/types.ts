export type UserRole = 'ADMIN' | 'FINANCE_OFFICER' | 'ASSET_MANAGER' | 'SHAREHOLDER' | 'PROCUREMENT_OFFICER'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  department?: string
  lastLogin?: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<User>
  logout: () => void
  hasPermission: (permission: string) => boolean
  hasRole: (roles: UserRole | UserRole[]) => boolean
}

export interface SidebarItem {
  icon: any
  label: string
  href: string
  permission?: string
  roles?: UserRole[]
}

export interface Permission {
  key: string
  description: string
  roles: UserRole[]
}