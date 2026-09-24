import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/auth/AuthContext'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'D-AssetPro',
    template: '%s | D-AssetPro',
  },
  description: 'Professional Asset and Shared Finance Management System',
  icons: {
    icon: '/images/D-AssetPro logo.png',
    apple: '/images/D-AssetPro logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}