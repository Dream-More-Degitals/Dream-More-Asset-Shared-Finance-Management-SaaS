'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Eye, EyeOff, Check, Lock } from 'lucide-react'

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const hasMinLength = password.length >= 8
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
  const hasNumbers = /\d/.test(password)
  const hasMixedCase = /[a-z]/.test(password) && /[A-Z]/.test(password)
  
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

  const passwordsMatch = password === confirmPassword && password.length > 0

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!passwordsMatch || strengthScore < 3) return
    console.log('Password reset successfully')
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 p-8 lg:p-10">
          {/* Logo - Circular */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden shadow-md mb-3">
              <Image 
                src="/images/D-AssetPro logo.png" 
                alt="D-AssetPro logo" 
              width={65}
              height={65}
                className="object-contain"
              />
            </div>
            <span className="text-xl font-bold text-gray-900">DreamMore</span>
          </div>

          {/* PRECISION AT SCALE badge */}
          <div className="text-center">
            <div className="inline-block bg-orange-50 text-orange-600 text-xs font-semibold px-3 py-1.5 rounded-full border border-orange-200">
              ✦ PRECISION AT SCALE
            </div>
          </div>

          <h1 className="text-lg font-bold text-gray-900 text-center mt-4">
            Enterprise-grade security and asset oversight for high-stakes financial operations.
          </h1>

          <div className="border-t border-gray-200 my-8"></div>

          {!submitted ? (
            <>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Reset Your Password</h2>
                  <p className="text-sm text-gray-500">Choose a strong password to protect your account.</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* New Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter at least 8 characters"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all bg-gray-50/50 pr-11"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  
                  {/* Security Level */}
                  <div className="mt-3 bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-600 font-medium">Security Level:</span>
                      <span className={`text-sm font-semibold ${getStrengthColor()}`}>
                        {getStrengthText()}
                      </span>
                    </div>
                    
                    {/* Password Requirements */}
                    <div className="space-y-2">
                      <div className={`flex items-center gap-2.5 text-sm ${hasMinLength ? 'text-green-600' : 'text-gray-400'}`}>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${hasMinLength ? 'border-green-500 bg-green-500' : 'border-gray-300'}`}>
                          {hasMinLength && <Check className="w-3 h-3 text-white" />}
                        </div>
                        8+ Characters
                      </div>
                      <div className={`flex items-center gap-2.5 text-sm ${hasSpecialChar ? 'text-green-600' : 'text-gray-400'}`}>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${hasSpecialChar ? 'border-green-500 bg-green-500' : 'border-gray-300'}`}>
                          {hasSpecialChar && <Check className="w-3 h-3 text-white" />}
                        </div>
                        Special Sign
                      </div>
                      <div className={`flex items-center gap-2.5 text-sm ${hasNumbers ? 'text-green-600' : 'text-gray-400'}`}>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${hasNumbers ? 'border-green-500 bg-green-500' : 'border-gray-300'}`}>
                          {hasNumbers && <Check className="w-3 h-3 text-white" />}
                        </div>
                        Include Numbers
                      </div>
                      <div className={`flex items-center gap-2.5 text-sm ${hasMixedCase ? 'text-green-600' : 'text-gray-400'}`}>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${hasMixedCase ? 'border-green-500 bg-green-500' : 'border-gray-300'}`}>
                          {hasMixedCase && <Check className="w-3 h-3 text-white" />}
                        </div>
                        Mix Upper/Lower
                      </div>
                    </div>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter password"
                      className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 bg-gray-50/50 pr-11 transition-all ${
                        confirmPassword && !passwordsMatch
                          ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500'
                          : confirmPassword && passwordsMatch
                          ? 'border-green-300 focus:ring-green-500/20 focus:border-green-500'
                          : 'border-gray-200 focus:ring-orange-500/20 focus:border-orange-500'
                      }`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {confirmPassword && !passwordsMatch && (
                    <p className="mt-1.5 text-xs text-red-500 font-medium">Passwords do not match</p>
                  )}
                  {confirmPassword && passwordsMatch && (
                    <p className="mt-1.5 text-xs text-green-600 font-medium">✓ Passwords match</p>
                  )}
                </div>

                <div className="border-t border-gray-200 pt-6 flex items-center gap-4">
                  <button
                    type="submit"
                    disabled={!passwordsMatch || strengthScore < 3}
                    className={`flex-1 py-3 rounded-xl text-sm font-semibold text-white transition-all ${
                      passwordsMatch && strengthScore >= 3
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:from-orange-600 hover:to-orange-700'
                        : 'bg-gray-300 cursor-not-allowed'
                    }`}
                  >
                    Save Password
                  </button>
                  <Link href="/login" className="text-sm text-gray-500 hover:text-gray-700 transition-colors font-medium">
                    Cancel
                  </Link>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900">Password Reset Successfully!</h2>
              <p className="text-gray-500 text-sm mt-2">
                Your password has been updated. You can now log in with your new password.
              </p>
              <Link
                href="/login"
                className="inline-block mt-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-semibold py-2.5 px-6 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/25"
              >
                Login Now
              </Link>
            </div>
          )}

          {/* Footer */}
          <div className="border-t border-gray-200 mt-8 pt-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">
                Need help? <Link href="/support" className="text-orange-600 hover:underline">Contact Support</Link>
              </span>
              <span className="text-gray-400">Powered by DreamMore © 2024</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}