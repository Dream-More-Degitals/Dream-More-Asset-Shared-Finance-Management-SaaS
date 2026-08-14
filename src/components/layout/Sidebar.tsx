'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
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
  Settings,
  Bell,
  LogOut,
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { getSidebarItemsForRole } from '@/config/sidebar.config'
import { UserRole } from '@/auth/types'

interface SidebarProps {
  sidebarOpen: boolean
}

export function Sidebar({ sidebarOpen }: SidebarProps) {
  const { user, logout } = useAuth()
  const pathname = usePathname()

  // Get sidebar items based on user role
  const sidebarItems = getSidebarItemsForRole(user?.role as UserRole || null)

  const handleLogout = () => {
    logout()
    window.location.href = '/login'
  }

  // If no user, show a minimal sidebar
  if (!user) {
    return (
      <aside className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-50 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center px-4 h-16 border-b border-gray-200">
            <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white font-bold text-sm">
              D
            </div>
            {sidebarOpen && <span className="ml-2 text-sm font-bold">D-AssetPro</span>}
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="w-6 h-6 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </aside>
    )
  }

  return (
    <aside className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-50 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
      <div className="flex flex-col h-full">
        {/* Logo Section - Larger Logo */}
        <div className="flex items-center px-4 h-16 border-b border-gray-200 flex-shrink-0">
          <Link href="/dashboard" className="flex items-center gap-3 min-w-0">
            <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center flex-shrink-0 overflow-hidden">
              <Image 
                src="/images/D-AssetPro logo.png" 
                alt="D-AssetPro" 
                width={50} 
                height={50}
                className="object-contain"
                priority
              />
            </div>
            <div className={sidebarOpen ? 'block' : 'hidden'}>
              <div className="text-sm font-bold text-gray-900 leading-tight">D-AssetPro</div>
              <div className="text-[10px] text-gray-400 font-medium tracking-wider">ENTERPRISE MANAGEMENT</div>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-orange-50 text-orange-600 shadow-sm'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    } ${!sidebarOpen ? 'justify-center' : ''}`}
                  >
                    <item.icon className={`w-5 h-5 flex-shrink-0 ${
                      isActive ? 'text-orange-500' : 'text-gray-400 group-hover:text-gray-600'
                    }`} />
                    {sidebarOpen && <span>{item.label}</span>}
                    {isActive && sidebarOpen && (
                      <span className="ml-auto w-1.5 h-6 rounded-full bg-orange-500"></span>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Bottom Section - Logout */}
        <div className="border-t border-gray-200 p-4 flex-shrink-0">
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors w-full ${
              !sidebarOpen ? 'justify-center' : ''
            }`}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>
    </aside>
  )
}