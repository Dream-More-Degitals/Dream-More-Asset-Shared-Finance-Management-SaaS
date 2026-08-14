'use client'

import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { ActivityItem } from '../../types/ai'

interface KPICardProps extends KPIData {
  className?: string
}

export function KPICard({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  trend, 
  color = 'orange',
  className = '' 
}: KPICardProps) {
  const colorClasses = {
    orange: 'bg-orange-50 text-orange-600',
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    red: 'bg-red-50 text-red-600',
  }

  const trendColor = trend?.direction === 'up' ? 'text-green-600' : 'text-red-600'
  const TrendIcon = trend?.direction === 'up' ? TrendingUp : trend?.direction === 'down' ? TrendingDown : Minus

  return (
    <div className={`bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1.5">{value}</p>
          <p className="text-xs text-gray-500 mt-0.5">{description}</p>
        </div>
        <div className={`p-2.5 rounded-xl ${colorClasses[color as keyof typeof colorClasses] || colorClasses.orange}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      {trend && (
        <div className="flex items-center gap-1.5 mt-3 text-xs font-medium">
          <TrendIcon className={`w-3.5 h-3.5 ${trendColor}`} />
          <span className={trendColor}>{trend.value}%</span>
          <span className="text-gray-400">vs last month</span>
        </div>
      )}
    </div>
  )
}