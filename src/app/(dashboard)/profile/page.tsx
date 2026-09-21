'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useAuth } from '../../../hooks/useAuth'
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
  Edit,
  Save,
  X,
  Eye,
  EyeOff,
  Camera,
  Settings,
  LogOut,
  Key,
  Lock,
  Check,
} from 'lucide-react'

export default function ProfilePage() {
  const router = useRouter()
  const { user, logout } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error' | 'info', text: string } | null>(null)
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false)

  // Password change form
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [passwordErrors, setPasswordErrors] = useState<{ [key: string]: string }>({})

  // Check if user is admin
  const isAdmin = user?.role === 'ADMIN'

  // User data
  const [userData, setUserData] = useState({
    name: user?.name || 'User',
    role: user?.role || 'User',
    department: user?.department || 'N/A',
    email: user?.email || 'user@dassetpro.com',
    employeeId: 'EMP-99420',
    status: 'Active',
    avatar: '/images/D_More logo.jpg',
    phone: '+1 (555) 012-3456',
    location: 'New York, US',
    joinDate: 'Jan 15, 2023',
    lastActive: '2 hours ago',
    twoFactorEnabled: true,
  })

  // Password strength checks
  const hasMinLength = passwordForm.newPassword.length >= 8
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(passwordForm.newPassword)
  const hasNumbers = /\d/.test(passwordForm.newPassword)
  const hasMixedCase = /[a-z]/.test(passwordForm.newPassword) && /[A-Z]/.test(passwordForm.newPassword)
  
  const strengthScore = [hasMinLength, hasSpecialChar, hasNumbers, hasMixedCase].filter(Boolean).length
  
  const getStrengthText = () => {
    if (strengthScore === 0) return 'None'
    if (strengthScore === 1) return 'Weak'
    if (strengthScore === 2) return 'Fair'
    if (strengthScore === 3) return 'Good'
    return 'Strong'
  }
  
  const getStrengthColor = () => {
    if (strengthScore === 0) return 'text-red-500'
    if (strengthScore === 1) return 'text-red-500'
    if (strengthScore === 2) return 'text-yellow-500'
    if (strengthScore === 3) return 'text-blue-500'
    return 'text-green-500'
  }

  const getStrengthBarColor = (index: number) => {
    if (strengthScore >= 4) return 'bg-green-500'
    if (strengthScore >= 3) return 'bg-blue-500'
    if (strengthScore >= 2) return 'bg-yellow-500'
    if (strengthScore >= 1) return 'bg-red-500'
    return 'bg-gray-200'
  }

  const passwordsMatch = passwordForm.newPassword === passwordForm.confirmPassword && passwordForm.newPassword.length > 0

  // Show toast notification
  const showToast = (type: 'success' | 'error' | 'info', text: string) => {
    setToastMessage({ type, text })
    setTimeout(() => setToastMessage(null), 3000)
  }

  // Validate password form
  const validatePasswordForm = () => {
    const errors: { [key: string]: string } = {}
    
    if (!passwordForm.currentPassword) {
      errors.currentPassword = 'Current password is required'
    }
    if (!passwordForm.newPassword) {
      errors.newPassword = 'New password is required'
    } else if (passwordForm.newPassword.length < 8) {
      errors.newPassword = 'Password must be at least 8 characters'
    }
    if (!passwordForm.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password'
    } else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match'
    }
    if (passwordForm.currentPassword && passwordForm.currentPassword !== '123456') {
      errors.currentPassword = 'Current password is incorrect'
    }

    setPasswordErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Handle password change
  const handleChangePassword = () => {
    if (!validatePasswordForm()) return

    // In a real app, this would call an API to update the password
    // For demo, we'll just show success
    setShowChangePasswordModal(false)
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    })
    setPasswordErrors({})
    showToast('success', 'Password changed successfully!')
  }

  const handleSave = () => {
    setIsEditing(false)
    showToast('success', 'Profile updated successfully!')
  }

  const handleCancel = () => {
    setIsEditing(false)
    showToast('info', 'Changes discarded')
  }

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  // Get user initials
  const getUserInitials = () => {
    if (!user) return 'JD'
    return user.name.split(' ').map(n => n[0]).join('')
  }

  // Get role display name
  const getRoleDisplay = (role: string) => {
    const roleMap: Record<string, string> = {
      'ADMIN': 'Global Administrator',
      'FINANCE_OFFICER': 'Finance Officer',
      'ASSET_MANAGER': 'Asset Manager',
      'SHAREHOLDER': 'Shareholder',
      'PROCUREMENT_OFFICER': 'Procurement Officer',
    }
    return roleMap[role] || role
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
          {toastMessage.type === 'success' && <CheckCircle className="w-4 h-4" />}
          {toastMessage.type === 'error' && <AlertCircle className="w-4 h-4" />}
          {toastMessage.type === 'info' && <Clock className="w-4 h-4" />}
          <span className="text-sm font-medium">{toastMessage.text}</span>
        </div>
      )}

      {/* Change Password Modal */}
      {showChangePasswordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Key className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Change Password</h3>
              </div>
              <button 
                onClick={() => {
                  setShowChangePasswordModal(false)
                  setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
                  setPasswordErrors({})
                }}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleChangePassword(); }} className="space-y-4">
              {/* Current Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                    placeholder="Enter your current password"
                    className={`w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 pr-10 ${
                      passwordErrors.currentPassword ? 'border-red-500' : 'border-gray-200'
                    }`}
                    required
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
                {passwordErrors.currentPassword && (
                  <p className="mt-1 text-xs text-red-500">{passwordErrors.currentPassword}</p>
                )}
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password *
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    placeholder="Enter new password"
                    className={`w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 pr-10 ${
                      passwordErrors.newPassword ? 'border-red-500' : 'border-gray-200'
                    }`}
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showNewPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {passwordErrors.newPassword && (
                  <p className="mt-1 text-xs text-red-500">{passwordErrors.newPassword}</p>
                )}

                {/* Password Strength Indicator */}
                {passwordForm.newPassword.length > 0 && (
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 font-medium">
                        Password Strength:
                      </span>
                      <span className={`text-xs font-semibold ${getStrengthColor()}`}>
                        {getStrengthText()}
                      </span>
                    </div>
                    
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map((level) => (
                        <div
                          key={level}
                          className={`h-1.5 flex-1 rounded-full transition-all ${
                            level <= strengthScore
                              ? getStrengthBarColor(level)
                              : 'bg-gray-200'
                          }`}
                        />
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-1 text-xs">
                      <div className={`flex items-center gap-1.5 ${hasMinLength ? 'text-green-600' : 'text-gray-400'}`}>
                        {hasMinLength ? <Check className="w-3 h-3" /> : <div className="w-3 h-3" />}
                        8+ Characters
                      </div>
                      <div className={`flex items-center gap-1.5 ${hasSpecialChar ? 'text-green-600' : 'text-gray-400'}`}>
                        {hasSpecialChar ? <Check className="w-3 h-3" /> : <div className="w-3 h-3" />}
                        Special Sign
                      </div>
                      <div className={`flex items-center gap-1.5 ${hasNumbers ? 'text-green-600' : 'text-gray-400'}`}>
                        {hasNumbers ? <Check className="w-3 h-3" /> : <div className="w-3 h-3" />}
                        Include Numbers
                      </div>
                      <div className={`flex items-center gap-1.5 ${hasMixedCase ? 'text-green-600' : 'text-gray-400'}`}>
                        {hasMixedCase ? <Check className="w-3 h-3" /> : <div className="w-3 h-3" />}
                        Mix Upper/Lower
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password *
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                    placeholder="Confirm new password"
                    className={`w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 pr-10 ${
                      passwordErrors.confirmPassword ? 'border-red-500' : 
                      passwordForm.confirmPassword && passwordsMatch ? 'border-green-500' : 'border-gray-200'
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {passwordErrors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-500">{passwordErrors.confirmPassword}</p>
                )}
                {passwordForm.confirmPassword && passwordsMatch && (
                  <p className="mt-1 text-xs text-green-600">✓ Passwords match</p>
                )}
              </div>

              {/* Security Notice */}
              <div className="bg-blue-50 rounded-lg p-3 text-xs text-blue-700 flex items-start gap-2">
                <Shield className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Security Best Practice:</p>
                  <p>Use a strong password with at least 8 characters, including uppercase, lowercase, numbers, and special characters.</p>
                </div>
              </div>

              <div className="flex gap-3 pt-2 border-t border-gray-100">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all text-sm font-medium shadow-lg shadow-orange-500/25"
                >
                  Change Password
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowChangePasswordModal(false)
                    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
                    setPasswordErrors({})
                  }}
                  className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => router.back()}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              ← Back
            </button>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mt-1">My Profile</h2>
        </div>
        <div className="flex items-center gap-3">
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <X className="w-4 h-4" />
                Cancel Changes
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-medium rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/25"
              >
                <Save className="w-4 h-4" />
                Save Profile
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Edit className="w-4 h-4" />
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* User Profile Card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row items-start gap-6">
          {/* Avatar */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                <span className="text-3xl font-bold text-white">
                  {getUserInitials()}
                </span>
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 p-1.5 bg-orange-500 rounded-full text-white hover:bg-orange-600 transition-colors shadow-lg">
                  <Camera className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="text-center">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500">STATUS:</span>
                <span className="inline-flex items-center gap-1.5 text-green-600 font-medium">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  {userData.status}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                ROLE: <span className="font-medium text-gray-700">{getRoleDisplay(userData.role)}</span>
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="flex-1">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                {isEditing ? (
                  <input
                    type="text"
                    value={userData.name}
                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                    className="text-xl font-bold text-gray-900 border border-gray-200 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                ) : (
                  <h3 className="text-xl font-bold text-gray-900">{userData.name}</h3>
                )}
                <p className="text-sm text-gray-500">{userData.department}</p>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>Last active: {userData.lastActive}</span>
                </div>
                {userData.twoFactorEnabled && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-green-50 text-green-600 border border-green-200">
                    <Shield className="w-3 h-3" />
                    ENHANCED
                  </span>
                )}
              </div>
            </div>

            {/* Personal Information */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-gray-400" />
                {isEditing ? (
                  <input
                    type="email"
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    className="flex-1 border border-gray-200 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                ) : (
                  <span className="text-gray-700">{userData.email}</span>
                )}
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Briefcase className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700">{userData.employeeId}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Building2 className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700">{userData.department}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700">Joined: {userData.joinDate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security & Access */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Security & Access</h3>
        <div className="space-y-4">
          {/* Change Password Section - Now with working button */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-900">Password</p>
                <p className="text-xs text-gray-500">Last changed 4 months ago. We recommend changing it every 6 months.</p>
              </div>
            </div>
            <button 
              onClick={() => setShowChangePasswordModal(true)}
              className="text-sm text-orange-600 hover:text-orange-700 font-medium transition-colors flex items-center gap-1"
            >
              Change Password →
            </button>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-900">Two-Factor Authentication (2FA)</p>
                <p className="text-xs text-gray-500">Add an extra layer of security to your account</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-green-50 text-green-600 border border-green-200">
                <Shield className="w-3 h-3" />
                ENHANCED
              </span>
              <button className="text-sm text-orange-600 hover:text-orange-700 font-medium">
                Manage 2FA →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-6 py-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors text-sm font-medium"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
        <p className="text-xs text-gray-400 mt-2">You will be redirected to the login page.</p>
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