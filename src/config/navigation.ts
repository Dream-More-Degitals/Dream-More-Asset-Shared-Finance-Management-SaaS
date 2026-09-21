import {
  LayoutDashboard,
  Users,
  Wallet,
  Landmark,
  Share2,
  TrendingUp,
  ShoppingCart,
  Scale,
  FileText,
  Bell,
  Settings,
} from 'lucide-react'

export interface NavItem {
  title: string
  href: string
  icon: any
  label?: string
  disabled?: boolean
}

export const navigationItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Users',
    href: '/users',
    icon: Users,
  },
  {
    title: 'Assets',
    href: '/assets',
    icon: Wallet,
  },
  {
    title: 'Finance',
    href: '/finance',
    icon: Landmark,
  },
  {
    title: 'Shareholders',
    href: '/shareholders',
    icon: Share2,
  },
  {
    title: 'Investments',
    href: '/investments',
    icon: TrendingUp,
  },
  {
    title: 'Procurement',
    href: '/procurement',
    icon: ShoppingCart,
  },
  {
    title: 'Governance',
    href: '/governance',
    icon: Scale,
  },
  {
    title: 'Reports',
    href: '/reports',
    icon: FileText,
  },
  {
    title: 'Notifications',
    href: '/notifications',
    icon: Bell,
    label: '3',
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
  },
]