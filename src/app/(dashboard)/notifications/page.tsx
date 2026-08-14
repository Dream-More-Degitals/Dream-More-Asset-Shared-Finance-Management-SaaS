'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image' 
import { 
  Bell,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  Check,
  X,
  Clock,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  ShoppingCart,
  Users,
  FileText,
  Sparkles,
  Building2,
  Landmark,
  Settings,
  Eye,
  MoreVertical,
  Mail,
  Trash2,
} from 'lucide-react'

export default function NotificationsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error' | 'info', text: string } | null>(null)


  // Notifications data with state
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'AI detected unusual expenses',
      description: 'Unexpected 15% spike in department overhead detected in Singapore office.',
      time: '2 mins ago',
      category: 'AI Insights',
      type: 'alert',
      read: false,
    },
    {
      id: 2,
      title: 'Procurement Request Approved',
      description: 'Your request for 10x Dell Monitors has been approved by Finance.',
      time: '1 hour ago',
      category: 'Procurement',
      type: 'success',
      read: false,
    },
    {
      id: 3,
      title: 'Investment ROI Increased',
      description: 'Quarterly ROI for EMEA Portfolio has increased to 8.4%.',
      time: '3 hours ago',
      category: 'Finance',
      type: 'success',
      read: false,
    },
    {
      id: 4,
      title: 'Board Meeting Scheduled',
      description: 'Q4 Strategic Review scheduled for Nov 15th, 10:00 AM.',
      time: '6 hours ago',
      category: 'Governance',
      type: 'info',
      read: true,
    },
  ])

  const [showNotificationMenu, setShowNotificationMenu] = useState<number | null>(null)

  // Show toast notification
  const showToast = (type: 'success' | 'error' | 'info', text: string) => {
    setToastMessage({ type, text })
    setTimeout(() => setToastMessage(null), 3000)
  }

  // Mark all as read
  const handleMarkAllRead = () => {
    const unreadCount = notifications.filter(n => !n.read).length
    
    if (unreadCount === 0) {
      showToast('info', 'All notifications are already read')
      return
    }

    setNotifications(notifications.map(n => ({ ...n, read: true })))
    showToast('success', `Marked ${unreadCount} notifications as read`)
  }

  // Mark single notification as read
  const handleMarkAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ))
    setShowNotificationMenu(null)
    showToast('success', 'Notification marked as read')
  }

  // Delete notification
  const handleDeleteNotification = (id: number) => {
    const notificationToDelete = notifications.find(n => n.id === id)
    setNotifications(notifications.filter(n => n.id !== id))
    setShowNotificationMenu(null)
    showToast('info', `Notification "${notificationToDelete?.title}" deleted`)
  }

  // Mark as unread
  const handleMarkAsUnread = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: false } : n
    ))
    setShowNotificationMenu(null)
    showToast('info', 'Notification marked as unread')
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }


  const getTypeStyles = (type: string) => {
    switch(type) {
      case 'alert':
        return 'bg-red-50 text-red-600 border-red-200'
      case 'success':
        return 'bg-green-50 text-green-600 border-green-200'
      case 'info':
        return 'bg-blue-50 text-blue-600 border-blue-200'
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200'
    }
  }

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'alert':
        return <AlertCircle className="w-4 h-4" />
      case 'success':
        return <CheckCircle className="w-4 h-4" />
      case 'info':
        return <Clock className="w-4 h-4" />
      default:
        return <Bell className="w-4 h-4" />
    }
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className={`fixed top-20 right-4 z-50 px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-slide-in ${
          toastMessage.type === 'success' ? 'bg-green-50 border border-green-200 text-green-700' :
          toastMessage.type === 'error' ? 'bg-red-50 border border-red-200 text-red-700' :
          'bg-blue-50 border border-blue-200 text-blue-700'
        }`}>
          {toastMessage.type === 'success' && <Check className="w-4 h-4" />}
          {toastMessage.type === 'error' && <AlertCircle className="w-4 h-4" />}
          {toastMessage.type === 'info' && <Clock className="w-4 h-4" />}
          <span className="text-sm font-medium">{toastMessage.text}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
          </div>
          <p className="text-sm text-gray-500">Manage your alerts, reports, and real-time AI insights.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleMarkAllRead}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Check className="w-4 h-4" />
            Mark All Read
            {unreadCount > 0 && (
              <span className="ml-1 text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </button>
          
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Global search..."
          className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 bg-white transition-all"
        />
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      </div>

      {/* Categories and Notifications Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* Notifications List */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            {/* Today Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-900">Today</h3>
              <span className="text-xs text-gray-400">{unreadCount} unread</span>
            </div>

            {/* Notifications */}
            <div className="space-y-4">
              {notifications.length === 0 ? (
                <div className="text-center py-8">
                  <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 font-medium">No notifications</p>
                  <p className="text-xs text-gray-400">You're all caught up!</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <div 
                    key={notification.id}
                    className={`p-4 rounded-xl border transition-all hover:shadow-md ${
                      notification.read 
                        ? 'bg-white border-gray-100' 
                        : 'bg-orange-50/30 border-orange-100'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Icon */}
                      <div className={`p-2 rounded-lg ${getTypeStyles(notification.type)}`}>
                        {getTypeIcon(notification.type)}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="text-sm font-semibold text-gray-900">
                              {notification.title}
                            </h4>
                            <p className="text-sm text-gray-600 mt-0.5">
                              {notification.description}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            {!notification.read && (
                              <span className="w-2 h-2 rounded-full bg-orange-500 flex-shrink-0 mt-1.5"></span>
                            )}
                            <div className="relative">
                              <button
                                onClick={() => setShowNotificationMenu(showNotificationMenu === notification.id ? null : notification.id)}
                                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                              >
                                <MoreVertical className="w-4 h-4 text-gray-400" />
                              </button>
                              {showNotificationMenu === notification.id && (
                                <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[180px] z-10">
                                  <button 
                                    onClick={() => handleMarkAsRead(notification.id)}
                                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                  >
                                    <Check className="w-4 h-4" />
                                    Mark as Read
                                  </button>
                                  <button 
                                    onClick={() => handleMarkAsUnread(notification.id)}
                                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                  >
                                    <Clock className="w-4 h-4" />
                                    Mark as Unread
                                  </button>
                                  <button 
                                    onClick={() => handleDeleteNotification(notification.id)}
                                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                    Delete
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {notification.time}
                          </span>
                          <span className="text-xs text-gray-400">•</span>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Pagination */}
            {notifications.length > 0 && (
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                <span className="text-xs text-gray-500">Showing 1 to 4 of {notifications.length} notifications</span>
                <div className="flex items-center gap-1">
                  <button className="px-3 py-1 text-xs text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
                    <ChevronLeft className="w-3 h-3" />
                  </button>
                  <button className="px-3 py-1 text-xs bg-orange-500 text-white rounded-lg">1</button>
                  <button className="px-3 py-1 text-xs text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">2</button>
                  <button className="px-3 py-1 text-xs text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">3</button>
                  <button className="px-3 py-1 text-xs text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">...</button>
                  <button className="px-3 py-1 text-xs text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">12</button>
                  <button className="px-3 py-1 text-xs text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4 text-xs text-gray-400">
        <div className="flex items-center gap-3">
          <span>© 2026 D-AssetPro Enterprise. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/privacy" className="hover:text-gray-600 transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-gray-600 transition-colors">Terms of Service</Link>
          <Link href="/support" className="hover:text-gray-600 transition-colors">Contact Support</Link>
        </div>
      </div>
    </div>
  )
}