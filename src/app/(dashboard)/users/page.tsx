'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { RoleGuard } from '../../../components/auth/RoleGuard'
import { 
  ChevronDown,
  Plus,
  Search,
  Filter,
  Eye,
  MoreVertical,
  TrendingUp,
  TrendingDown,
  Users,
  UserCheck,
  UserPlus,
  Shield,
  Clock,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Mail,
  Phone,
  Building2,
  Briefcase,
  BarChart3,
  PieChart,
  X,
  Check,
  User,
  Edit,
  Trash2,
  Key,
  Lock,
  RefreshCw,
} from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from 'recharts'

export default function UsersPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRole, setSelectedRole] = useState('All Roles')
  const [selectedStatus, setSelectedStatus] = useState('Status')
  const [selectedDepartment, setSelectedDepartment] = useState('Department')
  const [showRoleDropdown, setShowRoleDropdown] = useState(false)
  const [showStatusDropdown, setShowStatusDropdown] = useState(false)
  const [showDeptDropdown, setShowDeptDropdown] = useState(false)
  const [showAddUserModal, setShowAddUserModal] = useState(false)
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState<number | null>(null)
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error' | 'info', text: string } | null>(null)
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false)

  // Form state for adding user
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'User',
    department: 'Finance',
    status: 'ACTIVE',
  })

  // Password reset form
  const [passwordReset, setPasswordReset] = useState({
    newPassword: '',
    confirmPassword: '',
  })

  // Stats data
  const stats = [
    { 
      label: 'TOTAL USERS', 
      value: '1,284', 
      change: '+12% from last month', 
      icon: Users,
      trend: 'up'
    },
    { 
      label: 'ACTIVE USERS', 
      value: '1,240', 
      change: '98.5% Activity rate', 
      icon: UserCheck,
      trend: 'up'
    },
    { 
      label: 'PENDING INVITES', 
      value: '12', 
      change: '', 
      icon: UserPlus,
      trend: 'stable'
    },
    { 
      label: 'ADMINISTRATORS', 
      value: '32', 
      change: '2.5% of total base', 
      icon: Shield,
      trend: 'stable'
    },
  ]

  // Users data
  const [users, setUsers] = useState([
    { 
      id: 1,
      name: 'Sarah Miller', 
      email: 'sarah.miller@company.com',
      role: 'Administrator', 
      department: 'Finance',
      status: 'ACTIVE',
      lastLogin: '2h ago',
      permissions: ['Full Access', 'User Management', 'Financial Reports'],
    },
    { 
      id: 2,
      name: 'John Davis', 
      email: 'john.davis@company.com',
      role: 'Manager', 
      department: 'Operations',
      status: 'ACTIVE',
      lastLogin: '5h ago',
      permissions: ['View Reports', 'Team Management'],
    },
    { 
      id: 3,
      name: 'Emma Lowe', 
      email: 'emma.lowe@company.com',
      role: 'User', 
      department: 'IT',
      status: 'PENDING',
      lastLogin: 'Never',
      permissions: ['Basic Access'],
    },
  ])

  // Role distribution data
  const roleData = [
    { name: 'Administrators', value: 45, color: '#f97316' },
    { name: 'Managers', value: 38, color: '#3b82f6' },
    { name: 'Auditors', value: 17, color: '#22c55e' },
  ]

  // Activity data
  const [activities, setActivities] = useState([
    { 
      id: 1,
      action: 'New User Invited', 
      description: 'Line Zhao (Operators)', 
      time: '15 minutes ago',
    },
    { 
      id: 2,
      action: 'Role Updated', 
      description: 'Alan Morgan shifted to Admin', 
      time: '1 hour ago',
    },
  ])

  const roles = ['All Roles', 'Administrator', 'Manager', 'User', 'Auditor']
  const statuses = ['Status', 'Active', 'Pending', 'Inactive']
  const departments = ['Department', 'Finance', 'Operations', 'IT', 'HR', 'Marketing']

  // Show toast notification
  const showToast = (type: 'success' | 'error' | 'info', text: string) => {
    setToastMessage({ type, text })
    setTimeout(() => setToastMessage(null), 3000)
  }

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  // Handle user click - Navigate to user profile
  const handleViewUserProfile = (userId: number) => {
    router.push(`/users/${userId}`)
  }

  // Add new user
  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) {
      showToast('error', 'Please fill in all required fields')
      return
    }

    const newUserData = {
      id: users.length + 1,
      ...newUser,
      lastLogin: 'Never',
      permissions: ['Basic Access'],
    }
    
    setUsers([...users, newUserData])
    setShowAddUserModal(false)
    setNewUser({ name: '', email: '', role: 'User', department: 'Finance', status: 'ACTIVE' })
    showToast('success', `User ${newUser.name} added successfully!`)
  }

  // Reset user password
  const handleResetPassword = (userId: number) => {
    const user = users.find(u => u.id === userId)
    setSelectedUserId(userId)
    setPasswordReset({ newPassword: '', confirmPassword: '' })
    setShowResetPasswordModal(true)
    setShowUserMenu(null)
  }

  // Confirm password reset
  const handleConfirmResetPassword = () => {
    if (!passwordReset.newPassword || !passwordReset.confirmPassword) {
      showToast('error', 'Please fill in both password fields')
      return
    }
    if (passwordReset.newPassword !== passwordReset.confirmPassword) {
      showToast('error', 'Passwords do not match')
      return
    }
    if (passwordReset.newPassword.length < 8) {
      showToast('error', 'Password must be at least 8 characters')
      return
    }

    setShowResetPasswordModal(false)
    setPasswordReset({ newPassword: '', confirmPassword: '' })
    showToast('success', `Password reset successful. User will need to change on next login.`)
  }

  // Delete user
  const handleDeleteUser = (id: number) => {
    const userToDelete = users.find(u => u.id === id)
    setUsers(users.filter(u => u.id !== id))
    setShowUserMenu(null)
    showToast('info', `User ${userToDelete?.name} deleted successfully`)
  }

  // Edit user role
  const handleEditRole = (id: number, newRole: string) => {
    setUsers(users.map(u => 
      u.id === id ? { ...u, role: newRole } : u
    ))
    setShowUserMenu(null)
    showToast('success', 'User role updated successfully')
  }

  // Edit user status
  const handleEditStatus = (id: number, newStatus: string) => {
    setUsers(users.map(u => 
      u.id === id ? { ...u, status: newStatus } : u
    ))
    setShowUserMenu(null)
    showToast('success', `User status updated to ${newStatus}`)
  }

  // Export users
  const handleExportUsers = () => {
    showToast('success', 'Users exported successfully!')
  }

  // Reset filters
  const handleResetFilters = () => {
    setSearchQuery('')
    setSelectedRole('All Roles')
    setSelectedStatus('Status')
    setSelectedDepartment('Department')
    showToast('info', 'Filters reset successfully')
  }

  return (
    <RoleGuard allowedRoles={['ADMIN']}>
      <div className="space-y-6">
        {/* Toast Notification */}
        {toastMessage && (
          <div className={`fixed top-20 right-4 z-50 px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-slide-in ${
            toastMessage.type === 'success' ? 'bg-green-50 border border-green-200 text-green-700' :
            toastMessage.type === 'error' ? 'bg-red-50 border border-red-200 text-red-700' :
            'bg-blue-50 border border-blue-200 text-blue-700'
          }`}>
            {toastMessage.type === 'success' && <Check className="w-4 h-4" />}
            {toastMessage.type === 'error' && <X className="w-4 h-4" />}
            {toastMessage.type === 'info' && <Clock className="w-4 h-4" />}
            <span className="text-sm font-medium">{toastMessage.text}</span>
          </div>
        )}

        {/* Add User Modal */}
        {showAddUserModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Add New User</h3>
                <button 
                  onClick={() => setShowAddUserModal(false)}
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    placeholder="Enter full name"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    placeholder="Enter email address"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  >
                    <option value="User">User</option>
                    <option value="Manager">Manager</option>
                    <option value="Administrator">Administrator</option>
                    <option value="Auditor">Auditor</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <select
                    value={newUser.department}
                    onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  >
                    <option value="Finance">Finance</option>
                    <option value="Operations">Operations</option>
                    <option value="IT">IT</option>
                    <option value="HR">HR</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>
                <div className="bg-blue-50 rounded-lg p-3 text-xs text-blue-700">
                  <p className="font-medium">Security Notice:</p>
                  <p>A temporary password will be securely generated and sent to the user's email. The user will be required to change it on first login.</p>
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={handleAddUser}
                    className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium"
                  >
                    Add User
                  </button>
                  <button
                    onClick={() => setShowAddUserModal(false)}
                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reset Password Modal */}
        {showResetPasswordModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Key className="w-5 h-5 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Reset Password</h3>
                </div>
                <button 
                  onClick={() => setShowResetPasswordModal(false)}
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="space-y-4">
                <div className="bg-yellow-50 rounded-lg p-3 text-xs text-yellow-700">
                  <p className="font-medium">⚠️ Security Alert:</p>
                  <p>This action will reset the user's password. The user will receive a secure email with a temporary password.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Password *</label>
                  <input
                    type="password"
                    value={passwordReset.newPassword}
                    onChange={(e) => setPasswordReset({ ...passwordReset, newPassword: e.target.value })}
                    placeholder="Enter new password"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                    required
                    minLength={8}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password *</label>
                  <input
                    type="password"
                    value={passwordReset.confirmPassword}
                    onChange={(e) => setPasswordReset({ ...passwordReset, confirmPassword: e.target.value })}
                    placeholder="Confirm new password"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                    required
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={handleConfirmResetPassword}
                    className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium"
                  >
                    Reset Password
                  </button>
                  <button
                    onClick={() => setShowResetPasswordModal(false)}
                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filter Modal */}
        {showFilterModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Advanced Filters</h3>
                <button 
                  onClick={() => setShowFilterModal(false)}
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  >
                    {roles.map((role) => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  >
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => {
                      setShowFilterModal(false)
                      showToast('info', 'Filters applied successfully')
                    }}
                    className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium"
                  >
                    Apply Filters
                  </button>
                  <button
                    onClick={handleResetFilters}
                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Page Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
            <p className="text-sm text-gray-500">Manage organization roles, departments, and security profiles.</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleExportUsers}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
            <button 
              onClick={() => setShowAddUserModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-medium rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/25"
            >
              <Plus className="w-4 h-4" />
              Add User
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-medium text-gray-400 tracking-wider">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  {stat.change && (
                    <p className={`text-xs font-medium mt-1 inline-flex items-center gap-1 ${
                      stat.trend === 'up' ? 'text-green-600' : 
                      stat.trend === 'down' ? 'text-red-600' : 'text-gray-500'
                    }`}>
                      {stat.trend === 'up' && <ArrowUpRight className="w-3 h-3" />}
                      {stat.trend === 'down' && <ArrowDownRight className="w-3 h-3" />}
                      {stat.change}
                    </p>
                  )}
                </div>
                <div className="p-2.5 rounded-xl bg-orange-50">
                  <stat.icon className="w-5 h-5 text-orange-500" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="flex flex-wrap items-center gap-4 bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex-1 min-w-[200px] relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search user name or email..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 bg-white transition-all"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>

          {/* Role Filter */}
          <div className="relative">
            <button
              onClick={() => setShowRoleDropdown(!showRoleDropdown)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {selectedRole}
              <ChevronDown className={`w-4 h-4 transition-transform ${showRoleDropdown ? 'rotate-180' : ''}`} />
            </button>
            {showRoleDropdown && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[140px] z-10">
                {roles.map((role) => (
                  <button
                    key={role}
                    onClick={() => {
                      setSelectedRole(role)
                      setShowRoleDropdown(false)
                    }}
                    className={`w-full text-left px-4 py-1.5 text-sm hover:bg-gray-50 transition-colors ${
                      selectedRole === role ? 'text-orange-600 font-medium' : 'text-gray-600'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Status Filter */}
          <div className="relative">
            <button
              onClick={() => setShowStatusDropdown(!showStatusDropdown)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {selectedStatus}
              <ChevronDown className={`w-4 h-4 transition-transform ${showStatusDropdown ? 'rotate-180' : ''}`} />
            </button>
            {showStatusDropdown && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[140px] z-10">
                {statuses.map((status) => (
                  <button
                    key={status}
                    onClick={() => {
                      setSelectedStatus(status)
                      setShowStatusDropdown(false)
                    }}
                    className={`w-full text-left px-4 py-1.5 text-sm hover:bg-gray-50 transition-colors ${
                      selectedStatus === status ? 'text-orange-600 font-medium' : 'text-gray-600'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Department Filter */}
          <div className="relative">
            <button
              onClick={() => setShowDeptDropdown(!showDeptDropdown)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {selectedDepartment}
              <ChevronDown className={`w-4 h-4 transition-transform ${showDeptDropdown ? 'rotate-180' : ''}`} />
            </button>
            {showDeptDropdown && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[160px] z-10">
                {departments.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => {
                      setSelectedDepartment(dept)
                      setShowDeptDropdown(false)
                    }}
                    className={`w-full text-left px-4 py-1.5 text-sm hover:bg-gray-50 transition-colors ${
                      selectedDepartment === dept ? 'text-orange-600 font-medium' : 'text-gray-600'
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button 
            onClick={() => setShowFilterModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors ml-auto"
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>
          <button 
            onClick={handleResetFilters}
            className="flex items-center gap-2 px-4 py-2 text-sm text-orange-600 hover:text-orange-700 transition-colors"
          >
            Reset
          </button>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[10px] font-medium text-gray-400 uppercase tracking-wider border-b border-gray-100">
                  <th className="pb-3 pr-4">USER</th>
                  <th className="pb-3 pr-4">ROLE</th>
                  <th className="pb-3 pr-4">DEPARTMENT</th>
                  <th className="pb-3 pr-4">STATUS</th>
                  <th className="pb-3 pr-4">LAST LOGIN</th>
                  <th className="pb-3">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="py-3 pr-4">
                      <button 
                        onClick={() => handleViewUserProfile(user.id)}
                        className="flex items-center gap-3 hover:bg-gray-50 rounded-lg p-1 transition-colors w-full text-left"
                      >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-semibold text-xs">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 hover:text-orange-600 transition-colors">
                            {user.name}
                          </p>
                          <p className="text-xs text-gray-400">{user.email}</p>
                        </div>
                      </button>
                    </td>
                    <td className="py-3 pr-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                        user.role === 'Administrator' ? 'bg-orange-50 text-orange-600' :
                        user.role === 'Manager' ? 'bg-blue-50 text-blue-600' :
                        'bg-gray-50 text-gray-600'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-gray-600 text-xs">{user.department}</td>
                    <td className="py-3 pr-4">
                      <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${
                        user.status === 'ACTIVE' ? 'text-green-600 bg-green-50' : 'text-yellow-600 bg-yellow-50'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          user.status === 'ACTIVE' ? 'bg-green-500' : 'bg-yellow-500'
                        }`}></span>
                        {user.status}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-gray-500 text-xs">{user.lastLogin}</td>
                    <td className="py-3">
                      <div className="relative">
                        <button
                          onClick={() => setShowUserMenu(showUserMenu === user.id ? null : user.id)}
                          className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <MoreVertical className="w-4 h-4 text-gray-400" />
                        </button>
                        {showUserMenu === user.id && (
                          <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[180px] z-10">
                            <button 
                              onClick={() => handleViewUserProfile(user.id)}
                              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                              View Profile
                            </button>
                            <button 
                              onClick={() => handleEditRole(user.id, user.role === 'Administrator' ? 'Manager' : 'Administrator')}
                              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 transition-colors"
                            >
                              <Shield className="w-4 h-4" />
                              {user.role === 'Administrator' ? 'Demote to Manager' : 'Make Admin'}
                            </button>
                            <button 
                              onClick={() => handleResetPassword(user.id)}
                              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-orange-600 hover:bg-orange-50 transition-colors"
                            >
                              <Key className="w-4 h-4" />
                              Reset Password
                            </button>
                            <div className="border-t border-gray-100 my-1"></div>
                            <button 
                              onClick={() => handleDeleteUser(user.id)}
                              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete User
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <span className="text-xs text-gray-500">Showing 1 to 3 of 1,284 users</span>
            <div className="flex items-center gap-1">
              <button className="px-3 py-1 text-xs text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">Previous</button>
              <button className="px-3 py-1 text-xs bg-orange-500 text-white rounded-lg">1</button>
              <button className="px-3 py-1 text-xs text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">2</button>
              <button className="px-3 py-1 text-xs text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">3</button>
              <button className="px-3 py-1 text-xs text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">Next</button>
            </div>
          </div>
        </div>

        {/* Charts and Activity Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Users by Role - Pie Chart */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Users by Role</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={roleData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {roleData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 flex justify-center gap-6">
              {roleData.map((item) => (
                <div key={item.name} className="flex items-center gap-2 text-xs">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span className="text-gray-600">{item.name}</span>
                  <span className="font-medium text-gray-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-900">Recent Activity</h3>
              <button className="text-xs text-orange-600 hover:text-orange-700 font-medium flex items-center gap-1 transition-colors">
                View All
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="p-2 bg-orange-50 rounded-lg">
                    <Clock className="w-4 h-4 text-orange-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.description}</p>
                  </div>
                  <span className="text-xs text-gray-400 flex-shrink-0">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4 text-xs text-gray-400">
          <span>Powered by DreamMore © 2026</span>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-gray-600 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-600 transition-colors">Terms of Service</Link>
            <Link href="/support" className="hover:text-gray-600 transition-colors">Contact Support</Link>
          </div>
        </div>
      </div>
    </RoleGuard>
  )
}