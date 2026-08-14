'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Mail, Send } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Reset password for:', email)
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
            </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 text-center">D-AssetPro</h1>
          <p className="text-gray-500 text-center text-sm mt-1">
            The gold standard in enterprise finance and high-stakes asset auditing.
          </p>

          <div className="border-t border-gray-200 my-8"></div>

          {!submitted ? (
            <>
              <h2 className="text-xl font-bold text-gray-900 text-center">Forgotten Password?</h2>
              <p className="text-gray-500 text-sm text-center mt-2">
                Enter your corporate email address and we'll send you a link to reset your password.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Corporate Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all bg-gray-50/50"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-semibold py-3 px-4 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40"
                >
                  <span className="flex items-center justify-center gap-2">
                    Reset Password
                    <Send className="w-4 h-4" />
                  </span>
                </button>
              </form>

              <div className="text-center mt-6">
                <Link href="/login" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                  ← Back to Login
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900">Check Your Email</h2>
              <p className="text-gray-500 text-sm mt-2">
                We've sent a password reset link to <br />
                <span className="font-medium text-gray-900">{email}</span>
              </p>
              <Link
                href="/login"
                className="inline-block mt-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-semibold py-2.5 px-6 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/25"
              >
                Back to Login
              </Link>
            </div>
          )}

          {/* Footer */}
          <div className="border-t border-gray-200 mt-8 pt-6">
            <div className="text-sm text-gray-400 text-center">Powered by DreamMore © 2026</div>
          </div>
        </div>
      </div>
    </div>
  )
}