'use client'

import { Sparkles, TrendingUp, AlertTriangle, Shield, CheckCircle } from 'lucide-react'

interface ExecutiveSummaryProps {
  summary: string[]
  className?: string
}

export function ExecutiveSummary({ summary, className = '' }: ExecutiveSummaryProps) {
  const insights = [
    { icon: TrendingUp, label: 'Asset utilization increased by 12%', color: 'text-green-600' },
    { icon: AlertTriangle, label: '5 assets require maintenance attention', color: 'text-yellow-600' },
    { icon: TrendingUp, label: 'Expected ROI improvement detected', color: 'text-blue-600' },
    { icon: Shield, label: 'Financial risk reduced', color: 'text-green-600' },
  ]

  return (
    <div className={`bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-6 md:p-8 text-white shadow-xl ${className}`}>
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-orange-500/20 rounded-xl">
            <Sparkles className="w-6 h-6 text-orange-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">AI Executive Summary</h3>
            <p className="text-sm text-slate-400">Real-time business intelligence insights</p>
          </div>
        </div>
        <span className="text-xs bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full font-medium">
          Updated just now
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
        {insights.map((item, index) => {
          const Icon = item.icon
          return (
            <div key={index} className="flex items-center gap-2.5 bg-white/5 rounded-xl px-4 py-3 hover:bg-white/10 transition-colors">
              <Icon className={`w-4 h-4 ${item.color}`} />
              <span className="text-sm text-slate-200">{item.label}</span>
              <CheckCircle className="w-4 h-4 text-green-400 ml-auto" />
            </div>
          )
        })}
      </div>
    </div>
  )
}