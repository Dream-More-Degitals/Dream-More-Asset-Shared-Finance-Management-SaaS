'use client'

import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-200 bg-white/80 backdrop-blur-sm mt-8">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-900">D-AssetPro</span>
            <span className="text-xs text-gray-400">|</span>
            <span className="text-xs text-gray-400">
              {currentYear} DreamMore Enterprises. All rights reserved.
            </span>
          </div>
          <div className="flex items-center gap-6 text-xs text-gray-400">
            <Link href="/privacy" className="hover:text-gray-600 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gray-600 transition-colors">
              Terms of Service
            </Link>
            <Link href="/support" className="hover:text-gray-600 transition-colors">
              Contact Support
            </Link>
            <span className="text-gray-300">|</span>
            <span className="text-gray-400">v1.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  )
}