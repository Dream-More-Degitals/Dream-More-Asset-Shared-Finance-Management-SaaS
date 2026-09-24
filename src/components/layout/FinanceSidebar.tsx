'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { 
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Wallet,
  Landmark,
  FileText,
  Search,
  Settings,
  Plus,
} from 'lucide-react'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Wallet, label: 'Assets', href: '/assets' },
  { icon: Landmark, label: 'Finance', href: '/finance' },
  { icon: FileText, label: 'Transactions', href: '/finance/transactions' },
  { icon: Search, label: 'Audits', href: '/finance/audits' },
  { icon: Settings, label: 'Settings', href: '/settings' },
]

export function FinanceSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const pathname = usePathname()

  return (
    <aside className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-50 ${
      sidebarOpen ? 'w-64' : 'w-20'
    }`}>
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center gap-2 px-4 h-16 border-b border-gray-200">
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
            <Image 
              src="/images/D_More logo.jpg" 
              alt="D-AssetPro" 
              width={28} 
              height={28}
              className="object-contain"
              priority
            />
          </div>
          <div className={sidebarOpen ? 'block' : 'hidden'}>
            <div className="text-sm font-bold text-gray-900 leading-tight">D-AssetPro</div>
            <div className="text-[10px] text-gray-500 font-medium tracking-wider">ENTERPRISE</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-orange-50 text-orange-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className="w-4 h-4 flex-shrink-0" />
                    {sidebarOpen && <span>{item.label}</span>}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Add New Asset Button */}
        <div className="border-t border-gray-200 p-4">
          <Link
            href="/assets/new"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-medium rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/25"
          >
            <Plus className="w-4 h-4" />
            {sidebarOpen && <span>Add New Asset</span>}
          </Link>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="border-t border-gray-200 p-3 text-gray-400 hover:text-gray-600 transition-colors flex items-center justify-center gap-2"
        >
          {sidebarOpen ? (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span className="text-xs">Collapse</span>
            </>
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>
      </div>
    </aside>
  )
}