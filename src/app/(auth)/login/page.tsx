'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Eye, EyeOff, ArrowRight, Check, Shield, Zap } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../../hooks/useAuth'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const router = useRouter()
  const { login } = useAuth()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsLoading(true)
  setError('')

  try {
    const user = await login({ email, password })
    // Redirect based on user role
    const redirectMap: Record<string, string> = {
      'ADMIN': '/dashboard',
      'FINANCE_OFFICER': '/finance',
      'ASSET_MANAGER': '/assets',
      'SHAREHOLDER': '/investments',
      'PROCUREMENT_OFFICER': '/procurement',
    }
    const redirectPath = redirectMap[user.role] || '/dashboard'
    router.push(redirectPath)
  } catch (err: any) {
    setError(err.message || 'Invalid credentials. Please try again.')
  } finally {
    setIsLoading(false)
  }
}
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-5xl">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="grid lg:grid-cols-2">
            {/* Left Side - Brand Section */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-10 lg:p-14 text-white flex flex-col justify-between">
              <div>
                {/* Logo - Circular */}
                <div className="flex items-center gap-3 mb-12">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
                    <Image 
                      src="/images/D-AssetPro logo.png" 
                      alt="D-AssetPro logo" 
                      width={65} 
                      height={65}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <div className="text-xl font-bold tracking-tight">D-AssetPro</div>
                   </div>
                </div>

                {/* Tagline */}
                <div className="space-y-6">
                  <div className="inline-block bg-orange-500/20 text-orange-300 text-xs font-semibold px-3 py-1.5 rounded-full border border-orange-500/30">
                    ✦ PRECISION. INTELLIGENCE. CONTROL.
                  </div>
                  <h1 className="text-3xl font-bold leading-tight tracking-tight">
                     Enterprise asset management, powered by intelligence.
                  </h1>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    D-AssetPro helps organizations manage assets, optimize finances, and make confident decisions through real-time insights and automation.
                  </p>
                </div>

                {/* Features */}
                <div className="mt-8 space-y-2.5">
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <div className="w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center">
                      <Shield className="w-3 h-3 text-orange-400" />
                    </div>
                     Secure by design
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <div className="w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center">
                      <Zap className="w-3 h-3 text-orange-400" />
                    </div>
                     AI-powered analytics
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <div className="w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center">
                      <Check className="w-3 h-3 text-orange-400" />
                    </div>
                     Compliance made simple
                  </div>
                </div>
              </div>

              <div className="text-xs text-gray-500 mt-8">
                © 2026. Managed by DreamMore.
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="p-10 lg:p-14 flex flex-col justify-center">
              <div className="max-w-sm mx-auto w-full">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
                  <p className="text-gray-500 text-sm mt-1">Access your enterprise dashboard</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Corporate Email
                    </label>
                    {error && (
  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
    {error}
  </div>
)}
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all bg-gray-50/50"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••"
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
                    <div className="text-right mt-2">
                      <Link href="/forgot-password" className="text-sm text-orange-600 hover:text-orange-700 font-medium transition-colors">
                        Forgot Password?
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <label className="flex items-center gap-2.5 text-sm text-gray-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500 focus:ring-2"
                      />
                      Remember this device for 30 days
                    </label>
                  </div>

                  <button
  type="submit"
  disabled={isLoading}
  className="w-full rounded-lg bg-orange-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
>
  {isLoading ? (
    <span className="flex items-center justify-center gap-2">
      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Logging in...
    </span>
  ) : (
    'Login'
  )}
</button>
                </form>
                <footer>
                  <div className="flex justify-center gap-6 mt-6 text-xs text-gray-400">
                  <Link href="/privacy" className="hover:text-gray-600 transition-colors">Privacy Policy</Link>
                  <Link href="/support" className="hover:text-gray-600 transition-colors">Contact Support</Link>
                </div>
                </footer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}