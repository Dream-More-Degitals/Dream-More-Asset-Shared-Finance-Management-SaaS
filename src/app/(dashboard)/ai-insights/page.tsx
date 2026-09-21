'use client'

import { 
  Sparkles,
  TrendingUp,
  TrendingDown,
  Building2,
  Activity,
  AlertTriangle,
  DollarSign,
  Wrench,
  Clock,
  FileText,
  Shield,
  Zap,
} from 'lucide-react'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ComposedChart,
} from 'recharts'
import Link from 'next/link'
import { ExecutiveSummary } from '../../../components/ai/ExecutiveSummary'
import { KPICard } from '../../../components/ai/KPICard'
import { ForecastChart } from '../../../components/ai/ForecastChart'
import { RecommendationCard } from '../../../components/ai/RecommendationCard'
import { RiskCard } from '../../../components/ai/RiskCard'
import { AIActivityTimeline } from '../../../components/ai/AIActivityTimeline'
import { KPIData, ForecastData, Recommendation, RiskData, ActivityItem } from '../../../types/ai'

export default function AIInsightsPage() {
  // Mock KPI Data
  const kpiData: KPIData[] = [
    {
      title: 'Total Asset Value',
      value: '$12.4M',
      description: 'Current portfolio value',
      icon: Building2,
      trend: { value: 12.5, direction: 'up' },
      color: 'orange',
    },
    {
      title: 'Asset Health Score',
      value: '92%',
      description: 'Overall asset condition',
      icon: Activity,
      trend: { value: 4.2, direction: 'up' },
      color: 'green',
    },
    {
      title: 'Maintenance Risk',
      value: '8 Assets',
      description: 'Require attention',
      icon: AlertTriangle,
      trend: { value: 2.1, direction: 'down' },
      color: 'red',
    },
    {
      title: 'Expected ROI',
      value: '14.5%',
      description: 'Predicted return',
      icon: TrendingUp,
      trend: { value: 8.3, direction: 'up' },
      color: 'blue',
    },
  ]

  // Mock Forecast Data
  const forecastData: ForecastData[] = [
    { month: 'Jan', value: 8.2, predicted: 8.5 },
    { month: 'Feb', value: 8.8, predicted: 9.1 },
    { month: 'Mar', value: 9.5, predicted: 9.8 },
    { month: 'Apr', value: 10.2, predicted: 10.5 },
    { month: 'May', value: 10.8, predicted: 11.2 },
    { month: 'Jun', value: 11.5, predicted: 12.0 },
  ]

  // Mock Maintenance Data
  const maintenanceData = [
    { month: 'Jan', cost: 12000 },
    { month: 'Feb', cost: 15000 },
    { month: 'Mar', cost: 11000 },
    { month: 'Apr', cost: 18000 },
    { month: 'May', cost: 14000 },
    { month: 'Jun', cost: 16000 },
  ]

  // Mock Investment Data
  const investmentData = [
    { month: 'Jan', roi: 12.5, projected: 13.0 },
    { month: 'Feb', roi: 13.2, projected: 13.8 },
    { month: 'Mar', roi: 14.0, projected: 14.5 },
    { month: 'Apr', roi: 14.8, projected: 15.2 },
    { month: 'May', roi: 15.5, projected: 16.0 },
    { month: 'Jun', roi: 16.2, projected: 16.8 },
  ]

  // Mock Recommendations
  const recommendations: Recommendation[] = [
    {
      id: '1',
      title: 'Industrial Generator #245',
      description: 'Failure probability within 30 days',
      risk: 'High',
      action: 'View Asset',
      type: 'maintenance',
    },
    {
      id: '2',
      title: 'Cost Optimization',
      description: 'Potential saving of $25,000/year',
      risk: 'Medium',
      action: 'Review',
      type: 'optimization',
    },
    {
      id: '3',
      title: 'Investment Opportunity',
      description: 'Expected return of 18%',
      risk: 'Low',
      action: 'Analyze',
      type: 'investment',
    },
  ]

  // Mock Risk Data
  const riskData: RiskData[] = [
    { label: 'Asset Risk', value: 75, color: '#f97316', description: 'Moderate exposure' },
    { label: 'Financial Risk', value: 22, color: '#22c55e', description: 'Low exposure' },
    { label: 'Investment Risk', value: 60, color: '#f59e0b', description: 'Medium exposure' },
    { label: 'Compliance Risk', value: 88, color: '#ef4444', description: 'High exposure' },
  ]

  // Mock Activity Data
  const activities: ActivityItem[] = [
    { id: '1', action: 'AI Analysis Completed', description: 'Full portfolio scan finished', time: '2 mins ago', icon: Sparkles },
    { id: '2', action: 'Asset Risk Detected', description: 'Industrial Generator #245 flagged', time: '15 mins ago', icon: AlertTriangle },
    { id: '3', action: 'Recommendation Generated', description: 'Cost optimization opportunity found', time: '1 hour ago', icon: TrendingUp },
    { id: '4', action: 'Report Created', description: 'Monthly AI insights report ready', time: '3 hours ago', icon: FileText },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">AI Insights Dashboard</h2>
          <p className="text-sm text-gray-500">Intelligent asset and finance analytics powered by machine learning</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <Sparkles className="w-4 h-4" />
            Run Analysis
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-medium rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/25">
            <FileText className="w-4 h-4" />
            Generate Report
          </button>
        </div>
      </div>

      {/* Executive Summary */}
      <ExecutiveSummary summary={[]} />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </div>

      {/* AI Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ForecastChart 
            data={forecastData}
            title="Asset Value Forecast"
            description="Historical and predicted values"
          />
        </div>
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 h-full">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Maintenance Cost Prediction</h3>
                <p className="text-xs text-gray-500">Monthly forecast</p>
              </div>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={maintenanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#6b7280' }} />
                  <YAxis tick={{ fontSize: 10, fill: '#6b7280' }} />
<Tooltip 
  content={({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-3">
          <p className="text-xs font-medium text-gray-500">{label}</p>
          {payload.map((item: any) => (
            <p key={item.name} className="text-sm font-semibold" style={{ color: item.color }}>
              {item.name}: {typeof item.value === 'number' ? item.value.toLocaleString() : item.value}
            </p>
          ))}
        </div>
      )
    }
    return null
  }}
/>
                  <Bar dataKey="cost" fill="#f97316" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 h-full">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Investment Performance</h3>
                <p className="text-xs text-gray-500">Expected ROI growth</p>
              </div>
              <span className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
                Projected
              </span>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={investmentData}>
                  <defs>
                    <linearGradient id="roiGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#6b7280' }} />
                  <YAxis tick={{ fontSize: 10, fill: '#6b7280' }} />
                  <Tooltip 
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-3">
                            <p className="text-xs font-medium text-gray-500">{label}</p>
                            {payload.map((item: any) => (
                              <p key={item.name} className="text-sm font-semibold" style={{ color: item.color }}>
                                {item.name}: {item.value}%
                              </p>
                            ))}
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="projected"
                    stroke="#f97316"
                    strokeWidth={2}
                    fill="url(#roiGradient)"
                    name="Projected ROI"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* AI Recommendations & Risk Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-sm font-semibold text-gray-900">AI Recommendations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendations.map((rec) => (
              <RecommendationCard key={rec.id} {...rec} />
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Risk Analysis</h3>
          <div className="grid grid-cols-2 gap-4">
            {riskData.map((risk, index) => (
              <RiskCard key={index} {...risk} />
            ))}
          </div>
        </div>
      </div>

      {/* AI Activity History */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <AIActivityTimeline activities={activities} />
        </div>
        <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white shadow-xl">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h3 className="text-lg font-semibold">AI Performance Summary</h3>
              <p className="text-sm text-slate-400">Last 30 days intelligence metrics</p>
            </div>
            <span className="text-xs bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full font-medium">Active</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-orange-400">1,284</p>
              <p className="text-xs text-slate-400">Analyses Run</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-green-400">92%</p>
              <p className="text-xs text-slate-400">Accuracy Rate</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-blue-400">156</p>
              <p className="text-xs text-slate-400">Insights Generated</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-yellow-400">8</p>
              <p className="text-xs text-slate-400">Active Alerts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}