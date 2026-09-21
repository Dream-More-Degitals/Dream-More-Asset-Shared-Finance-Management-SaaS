const API_URL = 'http://localhost:5000/api/shareholders'

export interface Shareholder {
  id: string
  name: string
  company: string
  shares: number
  ownership: number
  investment: number
  dividend: number
  status: 'ACTIVE' | 'PENDING' | 'INACTIVE'
  email?: string
  phone?: string
  createdAt?: string
  updatedAt?: string
}

export interface ShareholderStats {
  totalShareholders: number
  totalShares: number
  totalInvestment: number
  totalDividends: number
}

interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

function getAuthHeaders() {
  const token = localStorage.getItem('token')

  if (!token) {
    throw new Error('Authentication token not found')
  }

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }
}

// GET all shareholders
export async function getShareholders(): Promise<Shareholder[]> {
  const response = await fetch(API_URL, {
    method: 'GET',
    headers: getAuthHeaders(),
  })

  const result: ApiResponse<Shareholder[]> = await response.json()

  if (!response.ok) {
    throw new Error(result.message || 'Failed to fetch shareholders')
  }

  return result.data
}

// GET one shareholder
export async function getShareholder(
  id: string
): Promise<Shareholder> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'GET',
    headers: getAuthHeaders(),
  })

  const result: ApiResponse<Shareholder> = await response.json()

  if (!response.ok) {
    throw new Error(result.message || 'Failed to fetch shareholder')
  }

  return result.data
}

// GET statistics
export async function getShareholderStats(): Promise<ShareholderStats> {
  const response = await fetch(`${API_URL}/stats`, {
    method: 'GET',
    headers: getAuthHeaders(),
  })

  const result: ApiResponse<ShareholderStats> = await response.json()

  if (!response.ok) {
    throw new Error(
      result.message || 'Failed to fetch shareholder statistics'
    )
  }

  return result.data
}

// POST create shareholder
export async function createShareholder(
  data: Omit<Shareholder, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Shareholder> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  })

  const result: ApiResponse<Shareholder> = await response.json()

  if (!response.ok) {
    throw new Error(
      result.message || 'Failed to create shareholder'
    )
  }

  return result.data
}

// PUT update shareholder
export async function updateShareholder(
  id: string,
  data: Partial<Omit<Shareholder, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<Shareholder> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  })

  const result: ApiResponse<Shareholder> = await response.json()

  if (!response.ok) {
    throw new Error(
      result.message || 'Failed to update shareholder'
    )
  }

  return result.data
}

// DELETE shareholder
export async function deleteShareholder(
  id: string
): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  })

  const result: ApiResponse<null> = await response.json()

  if (!response.ok) {
    throw new Error(
      result.message || 'Failed to delete shareholder'
    )
  }
}