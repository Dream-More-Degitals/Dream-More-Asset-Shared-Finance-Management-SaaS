export interface KPIData {
  title: string
  value: string
  description: string
  icon: any
  trend?: {
    value: number
    direction: 'up' | 'down'
  }
  color?: string
}

export interface ForecastData {
  month: string
  value: number
  predicted?: number
}

export interface Recommendation {
  id: string
  title: string
  description: string
  risk?: string
  action: string
  type: 'maintenance' | 'optimization' | 'investment'
}

export interface RiskData {
  label: string
  value: number
  color: string
  description: string
}

export interface ActivityItem {
  id: string
  action: string
  description: string
  time: string
  icon: any
}