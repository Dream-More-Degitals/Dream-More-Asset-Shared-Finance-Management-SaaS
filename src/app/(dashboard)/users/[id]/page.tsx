'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { 
  ChevronLeft,
  User,
  Mail,
  Building2,
  Briefcase,
  Calendar,
  Clock,
  Shield,
  CheckCircle,
  AlertCircle,
  Users,
  FileText,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  TrendingDown,
  X,
  Check,
  Edit,
  Trash2,
  Key,
  RefreshCw,
  Lock,
  Eye,
  EyeOff,
} from 'lucide-react'

export default function UserProfilePage() {
  const params = useParams()
  const router = useRouter()
  const userId = params.id
  
  // State for user data
  const [userData, setUserData] = useState({
    id: 1,
    name: 'Sarah Miller',
    email: 'sarah.miller@company.com',
    role: 'Administrator',
    department: 'Finance',
    status: 'ACTIVE',
    lastLogin: '2 hours ago',
    joinDate: 'Jan 15, 2023',
    permissions: ['Full Access', 'User Management', 'Financial Reports'],
    avatar: '/images/D_More logo.jpg',
    recentActivity: [
      { action: 'Logged in', timestamp: '2 hours ago' },
      { action: 'Updated asset record', timestamp: '4 hours ago' },
      { action: 'Generated financial report', timestamp: '1 day ago' },
    ],
  })

  // Modal states
  const [showChangeRoleModal, setShowChangeRoleModal] = useState(false)
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error' | 'info', text: string } | null>(null)
  
  // Form states
  const [selectedRole, setSelectedRole] = useState(userData.role)
  const [passwordReset, setPasswordReset] = useState({
    newPassword: '',
    confirmPassword: '',
  })
  const [editForm, setEditForm] = useState({
    name: userData.name,
    email: userData.email,
    department: userData.department,
  })
  const [showPassword, setShowPassword] = useState(false)

  // User stats
  const userStats = [
    { label: 'Assets Managed', value: '24', change: '+3', icon: FileText },
    { label: 'Reports Generated', value: '18', change: '+5', icon: Activity },
    { label: 'Team Members', value: '6', change: '+1', icon: Users },
    { label: 'Approval Rate', value: '98%', change: '+2%', icon: TrendingUp },
  ]

  // Role options
  const roleOptions = ['User', 'Manager', 'Administrator', 'Auditor']

  // Show toast notification
  const showToast = (type: 'success' | 'error' | 'info', text: string) => {
    setToastMessage({ type, text })
    setTimeout(() => setToastMessage(null), 3000)
  }

  // Handle back navigation
  const handleBack = () => {
    router.push('/users')
  }

  // Change user role
  const handleChangeRole = () => {
    if (selectedRole === userData.role) {
      showToast('info', 'User already has this role')
      setShowChangeRoleModal(false)
      return
    }

    setUserData({ ...userData, role: selectedRole })
    setShowChangeRoleModal(false)
    showToast('success', `User role updated to ${selectedRole}`)
  }

  // Reset user password
  const handleResetPassword = () => {
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
    showToast('success', `Password reset for ${userData.name}. User will need to change on next login.`)
  }

  // Delete user
  const handleDeleteUser = () => {
    setShowDeleteModal(false)
    showToast('info', `User ${userData.name} has been deactivated`)
    setTimeout(() => router.push('/users'), 1500)
  }

  // Edit user details
  const handleEditUser = () => {
    if (!editForm.name || !editForm.email) {
      showToast('error', 'Name and email are required')
      return
    }

    setUserData({ 
      ...userData, 
      name: editForm.name, 
      email: editForm.email,
      department: editForm.department,
    })
    setShowEditModal(false)
    showToast('success', 'User information updated successfully')
  }

  // Toggle user status
  const handleToggleStatus = () => {
    const newStatus = userData.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
    setUserData({ ...userData, status: newStatus })
    showToast('success', `User status updated to ${newStatus}`)
  }

  // View reports
  const handleViewReports = () => {
    showToast('info', `Loading reports for ${userData.name}...`)
  }

  // View team activity
  const handleViewTeamActivity = () => {
    showToast('info', `Loading team activity for ${userData.name}...`)
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
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

      {/* Change Role Modal */}
      {showChangeRoleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Change User Role</h3>
              </div>
              <button 
                onClick={() => setShowChangeRoleModal(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Role</label>
                <p className="text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-lg">{userData.role}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Role</label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                >
                  {roleOptions.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
              <div className="bg-blue-50 rounded-lg p-3 text-xs text-blue-700">
                <p className="font-medium">Role Change Notice:</p>
                <p>Changing a user's role will update their permissions and access levels immediately.</p>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleChangeRole}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Update Role
                </button>
                <button
                  onClick={() => setShowChangeRoleModal(false)}
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
                <p className="font-medium">⚠️ Security Notice:</p>
                <p>This will generate a new password for {userData.name}. They will need to change it on next login.</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Password *</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={passwordReset.newPassword}
                    onChange={(e) => setPasswordReset({ ...passwordReset, newPassword: e.target.value })}
                    placeholder="Enter new password"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 pr-10"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
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
                  onClick={handleResetPassword}
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

      {/* Delete User Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Trash2 className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Delete User</h3>
              </div>
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Are you sure you want to delete <strong>{userData.name}</strong>? This action cannot be undone.
              </p>
              <div className="bg-red-50 rounded-lg p-3 text-xs text-red-700">
                <p className="font-medium">⚠️ Warning:</p>
                <p>This will permanently remove the user and all associated data from the system.</p>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleDeleteUser}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                >
                  Delete User
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Edit className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Edit User</h3>
              </div>
              <button 
                onClick={() => setShowEditModal(false)}
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
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <select
                  value={editForm.department}
                  onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                >
                  <option value="Finance">Finance</option>
                  <option value="Operations">Operations</option>
                  <option value="IT">IT</option>
                  <option value="HR">HR</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleEditUser}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <button 
            onClick={handleBack}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors mb-1"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to User Management
          </button>
          <h2 className="text-2xl font-bold text-gray-900">User Profile</h2>
          <p className="text-sm text-gray-500">View and manage user information</p>
        </div>
        <div className="flex items-center gap-3">
          <span className={`inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full ${
            userData.status === 'ACTIVE' 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-yellow-50 text-yellow-700 border border-yellow-200'
          }`}>
            <span className={`w-2 h-2 rounded-full ${
              userData.status === 'ACTIVE' ? 'bg-green-500' : 'bg-yellow-500'
            }`}></span>
            {userData.status}
          </span>
          <button 
            onClick={handleToggleStatus}
            className={`text-sm font-medium px-3 py-1.5 rounded-lg transition-colors ${
              userData.status === 'ACTIVE' 
                ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' 
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
          >
            {userData.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
          </button>
        </div>
      </div>

      {/* User Profile Card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row items-start gap-6">
          {/* Avatar */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                <Image 
                  src={userData.avatar} 
                  alt={userData.name} 
                  width={96} 
                  height={96}
                  className="object-contain brightness-0 invert"
                />
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500">
                ROLE: <span className="font-medium text-gray-700">{userData.role}</span>
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="flex-1">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{userData.name}</h3>
                <p className="text-sm text-gray-500">{userData.department}</p>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>Last active: {userData.lastLogin}</span>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700">{userData.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Briefcase className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700">Employee ID: EMP-{String(userData.id).padStart(5, '0')}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700">Joined: {userData.joinDate}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Shield className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700">Permissions: {userData.permissions.join(', ')}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-wrap gap-3">
              <button 
                onClick={() => setShowEditModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors rounded-lg text-sm font-medium"
              >
                <Edit className="w-4 h-4" />
                Edit Details
              </button>
              <button 
                onClick={() => setShowChangeRoleModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-600 hover:bg-purple-100 transition-colors rounded-lg text-sm font-medium"
              >
                <Shield className="w-4 h-4" />
                Change Role
              </button>
              <button 
                onClick={() => setShowResetPasswordModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-600 hover:bg-orange-100 transition-colors rounded-lg text-sm font-medium"
              >
                <Key className="w-4 h-4" />
                Reset Password
              </button>
              <button 
                onClick={() => setShowDeleteModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 transition-colors rounded-lg text-sm font-medium"
              >
                <Trash2 className="w-4 h-4" />
                Delete User
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* User Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {userStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-medium text-gray-400 tracking-wider">{stat.label}</p>
                <p className="text-xl font-bold text-gray-900 mt-1">{stat.value}</p>
                {stat.change && (
                  <p className="text-xs font-medium mt-1 text-green-600 inline-flex items-center gap-1">
                    <ArrowUpRight className="w-3 h-3" />
                    {stat.change}
                  </p>
                )}
              </div>
              <div className="p-2 rounded-xl bg-orange-50">
                <stat.icon className="w-4 h-4 text-orange-500" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {userData.recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-50 rounded-lg">
                  <Activity className="w-4 h-4 text-orange-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-400">{activity.timestamp}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Admin Actions */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Admin Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => setShowChangeRoleModal(true)}
            className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-left"
          >
            <Shield className="w-5 h-5 text-blue-500" />
            <div>
              <p className="text-sm font-medium text-gray-900">Change Role</p>
              <p className="text-xs text-gray-500">Update user permissions</p>
            </div>
          </button>
          <button 
            onClick={handleViewReports}
            className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-left"
          >
            <FileText className="w-5 h-5 text-green-500" />
            <div>
              <p className="text-sm font-medium text-gray-900">View Reports</p>
              <p className="text-xs text-gray-500">See user's generated reports</p>
            </div>
          </button>
          <button 
            onClick={handleViewTeamActivity}
            className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-left"
          >
            <Users className="w-5 h-5 text-purple-500" />
            <div>
              <p className="text-sm font-medium text-gray-900">Team Activity</p>
              <p className="text-xs text-gray-500">View team performance</p>
            </div>
          </button>
        </div>
        <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
          <p className="text-xs text-blue-700 flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <span><strong>Security Notice:</strong> Admin access to user data is logged and audited. All actions are recorded for compliance.</span>
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4 text-xs text-gray-400">
        <span>D-AssetPro Enterprise © 2026. All rights reserved.</span>
        <div className="flex items-center gap-6">
          <Link href="/privacy" className="hover:text-gray-600 transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-gray-600 transition-colors">Terms of Service</Link>
          <Link href="/security" className="hover:text-gray-600 transition-colors">Security</Link>
        </div>
      </div>
    </div>
  )
}