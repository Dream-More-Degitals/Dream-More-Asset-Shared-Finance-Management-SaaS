'use client'

import { Recommendation } from '@/types/ai'
import { Wrench, DollarSign, TrendingUp, ArrowRight } from 'lucide-react'

interface RecommendationCardProps extends Recommendation {
  className?: string
}

const iconMap: Record<string, any> = {
  maintenance: Wrench,
  optimization: DollarSign,
  investment: TrendingUp,
}

const colorMap: Record<string, string> = {
  maintenance: 'from-red-500 to-orange-500',
  optimization: 'from-green-500 to-emerald-500',
  investment: 'from-blue-500 to-purple-500',
}

export function RecommendationCard({ 
  id,
  title, 
  description, 
  risk, 
  action, 
  type,
  className = '' 
}: RecommendationCardProps) {
  const Icon = iconMap[type] || Wrench
  const gradient = colorMap[type] || 'from-orange-500 to-orange-600'

  return (
    <div className={`bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${className}`}>
      <div className="flex items-start gap-4">
        <div className={`p-2.5 rounded-xl bg-gradient-to-br ${gradient} shadow-lg`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
            {risk && (
              <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                risk === 'High' ? 'bg-red-50 text-red-600' :
                risk === 'Medium' ? 'bg-yellow-50 text-yellow-600' :
                'bg-green-50 text-green-600'
              }`}>
                {risk}
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-1">{description}</p>
          <button className="flex items-center gap-1.5 mt-3 text-xs font-medium text-orange-600 hover:text-orange-700 transition-colors group">
            {action}
            <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  )
}