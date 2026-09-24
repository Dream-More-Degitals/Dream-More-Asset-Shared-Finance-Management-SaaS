'use client'

import { RiskData } from '@/types/ai'

interface RiskCardProps extends RiskData {
  className?: string
}

export function RiskCard({ label, value, color, description, className = '' }: RiskCardProps) {
  const radius = 40
  const circumference = 2 * Math.PI * radius
  const progress = (value / 100) * circumference
  const strokeColor = value > 80 ? '#ef4444' : value > 50 ? '#f59e0b' : '#22c55e'

  return (
    <div className={`bg-white rounded-2xl border border-gray-200 p-6 text-center hover:shadow-lg transition-all duration-300 ${className}`}>
      <div className="relative inline-flex items-center justify-center">
        <svg className="w-28 h-28 -rotate-90">
          <circle
            className="text-gray-100"
            strokeWidth="8"
            stroke="currentColor"
            fill="none"
            r={radius}
            cx="56"
            cy="56"
          />
          <circle
            className="transition-all duration-1000 ease-out"
            strokeWidth="8"
            stroke={strokeColor}
            fill="none"
            r={radius}
            cx="56"
            cy="56"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <span className="text-xl font-bold text-gray-900">{value}%</span>
        </div>
      </div>
      <h4 className="text-sm font-semibold text-gray-900 mt-2">{label}</h4>
      <p className="text-xs text-gray-500 mt-0.5">{description}</p>
    </div>
  )
}