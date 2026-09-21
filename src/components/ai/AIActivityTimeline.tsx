'use client'

import { ActivityItem } from '../../types/ai'
import { Clock } from 'lucide-react'

interface AIActivityTimelineProps {
  activities: ActivityItem[]
  className?: string
}

export function AIActivityTimeline({ activities, className = '' }: AIActivityTimelineProps) {
  return (
    <div className={`bg-white rounded-2xl border border-gray-200 p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-900">AI Activity History</h3>
        <span className="text-xs text-gray-400">Last 24 hours</span>
      </div>
      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = activity.icon
          return (
            <div key={activity.id} className="flex items-start gap-3 relative">
              {index < activities.length - 1 && (
                <div className="absolute left-4 top-8 bottom-0 w-px bg-gray-200"></div>
              )}
              <div className="p-2 rounded-lg bg-orange-50 flex-shrink-0">
                <Icon className="w-4 h-4 text-orange-500" />
              </div>
              <div className="flex-1 min-w-0 pt-0.5">
                <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                <p className="text-xs text-gray-500">{activity.description}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <Clock className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-400">{activity.time}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}