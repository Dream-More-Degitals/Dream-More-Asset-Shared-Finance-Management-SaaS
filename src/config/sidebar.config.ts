import { SidebarItem, UserRole } from '../auth/types'
import {
  LayoutDashboard,
  UserCog,
  Wallet,
  Landmark,
  Share2,
  TrendingUp,
  ShoppingCart,
  Scale,
  FileBarChart,
  Sparkles,
  Bell,
  Settings,
} from 'lucide-react'

// Define all possible sidebar items with their permissions
export const ALL_SIDEBAR_ITEMS: SidebarItem[] = [
  { 
    icon: LayoutDashboard, 
    label: 'Dashboard', 
    href: '/dashboard',
    roles: ['ADMIN'], // Only admin sees Dashboard
  },
  { 
    icon: UserCog, 
    label: 'User Management', 
    href: '/users',
    roles: ['ADMIN'], // Only admin sees User Management
  },
  { 
    icon: Wallet, 
    label: 'Assets', 
    href: '/assets',
    roles: ['ADMIN', 'FINANCE_OFFICER', 'ASSET_MANAGER', 'PROCUREMENT_OFFICER'],
  },
  { 
    icon: Landmark, 
    label: 'Finance', 
    href: '/finance',
    roles: ['ADMIN', 'FINANCE_OFFICER'],
  },
  { 
    icon: Share2, 
    label: 'Shareholders', 
    href: '/shareholders',
    roles: ['ADMIN'],
  },
  { 
    icon: TrendingUp, 
    label: 'Investments', 
    href: '/investments',
    roles: ['ADMIN', 'SHAREHOLDER'],
  },
  { 
    icon: ShoppingCart, 
    label: 'Procurement', 
    href: '/procurement',
    roles: ['ADMIN', 'ASSET_MANAGER', 'PROCUREMENT_OFFICER'],
  },
  { 
    icon: Scale, 
    label: 'Governance', 
    href: '/governance',
    roles: ['ADMIN'],
  },
  { 
    icon: FileBarChart, 
    label: 'Reports', 
    href: '/reports',
    roles: ['ADMIN', 'FINANCE_OFFICER', 'ASSET_MANAGER', 'SHAREHOLDER', 'PROCUREMENT_OFFICER'],
  },
  { 
    icon: Sparkles, 
    label: 'AI Insights', 
    href: '/ai-insights',
    roles: ['ADMIN', 'FINANCE_OFFICER'],
  },
  { 
    icon: Bell, 
    label: 'Notifications', 
    href: '/notifications',
    roles: ['ADMIN', 'FINANCE_OFFICER', 'ASSET_MANAGER', 'SHAREHOLDER', 'PROCUREMENT_OFFICER'],
  },
  { 
    icon: Settings, 
    label: 'Settings', 
    href: '/settings',
    roles: ['ADMIN', 'FINANCE_OFFICER', 'ASSET_MANAGER', 'SHAREHOLDER', 'PROCUREMENT_OFFICER'],
  },
]

export const getSidebarItemsForRole = (role: UserRole | null): SidebarItem[] => {
  if (!role) return []
  return ALL_SIDEBAR_ITEMS.filter(item => 
    item.roles?.includes(role) ?? false
  )
}