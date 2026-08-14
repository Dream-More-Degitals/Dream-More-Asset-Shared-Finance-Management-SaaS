'use client'

import { ReactNode, useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Sidebar } from '../../components/layout/Sidebar'
import { useAuth } from '../../hooks/useAuth'
import { Footer } from '../../components/layout/Footer'
import { 
  Bell, 
  Search, 
  Menu, 
  LogOut, 
  User, 
  Settings, 
  HelpCircle,
  ChevronDown,
} from 'lucide-react'
import Link from 'next/link'

export default function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, isAuthenticated, isLoading, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Public routes that don't require authentication
  const publicRoutes = ['/login', '/register', '/forgot-password', '/reset-password']
  const isPublicRoute = publicRoutes.some(route => pathname?.startsWith(route))

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated && !isPublicRoute) {
      router.push('/login')
    }
  }, [isLoading, isAuthenticated, isPublicRoute, router])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user) return 'JD'
    return user.name.split(' ').map(n => n[0]).join('')
  }

  // Get user role display name
  const getRoleDisplay = (role: string) => {
    const roleMap: Record<string, string> = {
      'ADMIN': 'GLOBAL ADMIN',
      'FINANCE_OFFICER': 'FINANCE OFFICER',
      'ASSET_MANAGER': 'ASSET MANAGER',
      'SHAREHOLDER': 'SHAREHOLDER',
      'PROCUREMENT_OFFICER': 'PROCUREMENT OFFICER',
    }
    return roleMap[role] || role
  }

  // Toggle sidebar function for the hamburger menu
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  if (isPublicRoute) {
    return <>{children}</>
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Sidebar sidebarOpen={sidebarOpen} />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Top Navbar */}
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between px-6 h-16">
            <div className="flex items-center gap-4">
              {/* Only the hamburger menu (3 lines) for toggling sidebar */}
              <button 
                onClick={toggleSidebar}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Toggle sidebar"
              >
                <Menu className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  {pathname === '/dashboard' ? 'Dashboard' :
                   pathname === '/finance' ? 'Finance' :
                   pathname === '/assets' ? 'Assets' :
                   pathname === '/investments' ? 'Investments' :
                   pathname === '/procurement' ? 'Procurement' :
                   pathname?.replace('/', '').charAt(0).toUpperCase() + pathname?.replace('/', '').slice(1) || 'Dashboard'}
                </h1>
                <p className="text-xs text-gray-400 hidden sm:block">
                  Welcome back, {user?.name?.split(' ')[0] || 'User'}
                </p>
              </div>
            </div>

            <div className="hidden md:flex flex-1 max-w-md mx-4">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder="Search across the platform..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 bg-gray-50/50 transition-all"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link 
                href="/notifications" 
                className="relative p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white animate-pulse"></span>
              </Link>

              {/* Profile Dropdown - Shows logged-in user */}
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-3 pl-3 border-l border-gray-200 hover:bg-gray-50 rounded-xl transition-colors py-1.5 pr-2"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-semibold text-sm shadow-md shadow-orange-500/20">
                      {getUserInitials()}
                    </div>
                    <div className="hidden sm:block text-left">
                      <p className="text-sm font-medium text-gray-900 leading-tight">
                        {user?.name || 'User'}
                      </p>
                      <p className="text-[10px] text-gray-400 font-medium tracking-wide">
                        {user?.role ? getRoleDisplay(user.role) : 'USER'}
                      </p>
                    </div>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl border border-gray-200 shadow-xl py-1.5 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user?.name || 'User'}</p>
                      <p className="text-xs text-gray-400">{user?.email || 'user@dassetpro.com'}</p>
                      <p className="text-[10px] text-orange-600 font-medium mt-0.5">
                        {user?.role ? getRoleDisplay(user.role) : 'User'}
                      </p>
                    </div>
                    <Link href="/profile" className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      <User className="w-4 h-4 text-gray-400" />
                      My Profile
                    </Link>
                    <Link href="/settings" className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      <Settings className="w-4 h-4 text-gray-400" />
                      Preferences
                    </Link>
                    <Link href="/support" className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      <HelpCircle className="w-4 h-4 text-gray-400" />
                      Support
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}