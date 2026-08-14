import { User, UserRole } from './types'

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@dassetpro.com',
    role: 'ADMIN',
    avatar: '/images/D_More logo.jpg',
    department: 'Executive',
    lastLogin: '2026-08-14T10:30:00Z',
  },
  {
    id: '2',
    name: 'Finance Officer',
    email: 'finance@dassetpro.com',
    role: 'FINANCE_OFFICER',
    avatar: '/images/D_More logo.jpg',
    department: 'Finance',
    lastLogin: '2026-08-14T09:15:00Z',
  },
  {
    id: '3',
    name: 'Asset Manager',
    email: 'asset@dassetpro.com',
    role: 'ASSET_MANAGER',
    avatar: '/images/D_More logo.jpg',
    department: 'Asset Management',
    lastLogin: '2026-08-13T16:45:00Z',
  },
  {
    id: '4',
    name: 'Shareholder',
    email: 'shareholder@dassetpro.com',
    role: 'SHAREHOLDER',
    avatar: '/images/D_More logo.jpg',
    department: 'Investments',
    lastLogin: '2026-08-13T11:20:00Z',
  },
  {
    id: '5',
    name: 'Procurement Officer',
    email: 'procurement@dassetpro.com',
    role: 'PROCUREMENT_OFFICER',
    avatar: '/images/D_More logo.jpg',
    department: 'Procurement',
    lastLogin: '2026-08-12T14:30:00Z',
  },
]

// For login validation - store passwords separately (in real app, these would be hashed)
export const mockCredentials: Record<string, string> = {
  'admin@dassetpro.com': '123456',
  'finance@dassetpro.com': '123456',
  'asset@dassetpro.com': '123456',
  'shareholder@dassetpro.com': '123456',
  'procurement@dassetpro.com': '123456',
}

export const findUserByEmail = (email: string): User | undefined => {
  return mockUsers.find(user => user.email === email)
}

export const validateCredentials = (email: string, password: string): boolean => {
  return mockCredentials[email] === password
}