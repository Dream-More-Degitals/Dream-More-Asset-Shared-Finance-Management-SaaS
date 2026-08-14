'use client'

import { useAuth as useAuthContext } from '../auth/AuthContext'

// Re-export the auth hook for cleaner imports
export const useAuth = useAuthContext