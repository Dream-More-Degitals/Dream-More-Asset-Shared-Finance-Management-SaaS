import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AuthProvider } from '../auth/AuthContext'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'D-AssetPro - Asset Management',
  description: 'Professional Asset and Shared Finance Management System',
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