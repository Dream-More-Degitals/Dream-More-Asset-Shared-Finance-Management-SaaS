// import { User, LoginCredentials } from './types'
// import { findUserByEmail, validateCredentials, mockUsers } from './mockUsers'

// const SESSION_KEY = 'dassetpro_session'

// export class AuthService {
//     getDefaultRedirect(role: string): string {
//   const redirectMap: Record<string, string> = {
//     'ADMIN': '/dashboard',
//     'FINANCE_OFFICER': '/finance',
//     'ASSET_MANAGER': '/assets',
//     'SHAREHOLDER': '/investments',
//     'PROCUREMENT_OFFICER': '/procurement',
//   }
//   return redirectMap[role] || '/dashboard'
// }
//   private static instance: AuthService
  
//   public static getInstance(): AuthService {
//     if (!AuthService.instance) {
//       AuthService.instance = new AuthService()
//     }
//     return AuthService.instance
//   }

//   // Login user
//   async login(credentials: LoginCredentials): Promise<User> {
//     const { email, password } = credentials

//     console.log('Login attempt:', { email, password }) // Debug log

//     // Simulate API call delay
//     await new Promise(resolve => setTimeout(resolve, 800))

//     // Validate credentials
//     if (!validateCredentials(email, password)) {
//       console.log('Invalid credentials') // Debug log
//       throw new Error('Invalid email or password')
//     }

//     // Find user
//     const user = findUserByEmail(email)
//     if (!user) {
//       console.log('User not found') // Debug log
//       throw new Error('User not found')
//     }

//     console.log('User found:', user) // Debug log

//     // Create session
//     this.createSession(user)
//     console.log('Session created') // Debug log

//     return user
//   }

//   // Logout user
//   logout(): void {
//     localStorage.removeItem(SESSION_KEY)
//     console.log('Session removed') // Debug log
//   }

//   // Get current user from session
//   getCurrentUser(): User | null {
//     try {
//       const session = localStorage.getItem(SESSION_KEY)
//       console.log('Session data:', session) // Debug log
//       if (!session) return null

//       const userData = JSON.parse(session)
//       // Verify user still exists in mock data
//       const user = mockUsers.find(u => u.id === userData.id)
//       return user || null
//     } catch (error) {
//       console.error('Error getting session:', error)
//       return null
//     }
//   }

//   // Check if user is authenticated
//   isAuthenticated(): boolean {
//     return !!this.getCurrentUser()
//   }

//   // Create session
//   private createSession(user: User): void {
//     // In real app, this would store a JWT token
//     localStorage.setItem(SESSION_KEY, JSON.stringify({
//       id: user.id,
//       email: user.email,
//       role: user.role,
//       name: user.name,
//     }))
//     console.log('Session saved to localStorage') // Debug log
//   }

//   // Get user role
//   getUserRole(): string | null {
//     const user = this.getCurrentUser()
//     return user?.role || null
//   }

//   // Check if user has specific role
//   hasRole(roles: string | string[]): boolean {
//     const user = this.getCurrentUser()
//     if (!user) return false

//     const userRole = user.role
//     if (Array.isArray(roles)) {
//       return roles.includes(userRole)
//     }
//     return userRole === roles
//   }
// }

// // Export singleton instance
// export const authService = AuthService.getInstance()

import { User, LoginCredentials } from './types'

const SESSION_KEY = 'dassetpro_session'

const API_URL = 'http://localhost:5000/api'

export class AuthService {
  private static instance: AuthService

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }

    return AuthService.instance
  }

  getDefaultRedirect(role: string): string {
    const redirectMap: Record<string, string> = {
      ADMIN: '/dashboard',
      FINANCE_OFFICER: '/finance',
      ASSET_MANAGER: '/assets',
      SHAREHOLDER: '/investments',
      PROCUREMENT_OFFICER: '/procurement',
    }

    return redirectMap[role] || '/dashboard'
  }

  // ==========================================
  // LOGIN
  // ==========================================

  async login(credentials: LoginCredentials): Promise<User> {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    })

    const result = await response.json()

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Invalid email or password')
    }

    /*
     * Backend returns:
     *
     * {
     *   success: true,
     *   token: "...",
     *   user: {...}
     * }
     *
     * Store both the JWT and user information.
     */

    const token = result.token
    const backendUser = result.user

    if (!token) {
      throw new Error('Login successful but no authentication token was returned')
    }

    if (!backendUser) {
      throw new Error('Login successful but no user information was returned')
    }

    const user: User = {
      id: backendUser.id,
      name: backendUser.name,
      email: backendUser.email,
      role: backendUser.role,
    }

    this.createSession(user, token)

    return user
  }

  // ==========================================
  // LOGOUT
  // ==========================================

  logout(): void {
    localStorage.removeItem(SESSION_KEY)
  }

  // ==========================================
  // GET CURRENT USER
  // ==========================================

  getCurrentUser(): User | null {
    try {
      const session = localStorage.getItem(SESSION_KEY)

      if (!session) {
        return null
      }

      const sessionData = JSON.parse(session)

      return sessionData.user || null
    } catch (error) {
      console.error('Error getting session:', error)
      return null
    }
  }

  // ==========================================
  // GET TOKEN
  // ==========================================

  getToken(): string | null {
    try {
      const session = localStorage.getItem(SESSION_KEY)

      if (!session) {
        return null
      }

      const sessionData = JSON.parse(session)

      return sessionData.token || null
    } catch (error) {
      console.error('Error getting token:', error)
      return null
    }
  }

  // ==========================================
  // AUTHENTICATION CHECK
  // ==========================================

  isAuthenticated(): boolean {
    return !!this.getToken()
  }

  // ==========================================
  // CREATE SESSION
  // ==========================================

  private createSession(user: User, token: string): void {
    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify({
        user,
        token,
      })
    )
  }

  // ==========================================
  // GET USER ROLE
  // ==========================================

  getUserRole(): string | null {
    const user = this.getCurrentUser()

    return user?.role || null
  }

  // ==========================================
  // CHECK ROLE
  // ==========================================

  hasRole(roles: string | string[]): boolean {
    const user = this.getCurrentUser()

    if (!user) {
      return false
    }

    const userRole = user.role

    if (Array.isArray(roles)) {
      return roles.includes(userRole)
    }

    return userRole === roles
  }
}

export const authService = AuthService.getInstance()