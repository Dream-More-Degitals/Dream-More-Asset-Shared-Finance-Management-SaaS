'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  ChevronDown, 
  Plus, 
  Check,
  Calendar,
  TrendingUp,
  TrendingDown,
  Building2,
  Briefcase,
  Package,
  Users,
  DollarSign,
  BarChart3,
  PieChart,
  Bell,
  Search,
  Menu,
  LayoutDashboard,
  UserCog,
  Wallet,
  Landmark,
  Share2,
  TrendingUp as TrendingUpIcon,
  ShoppingCart,
  Scale,
  FileBarChart,
  Sparkles,
  X,
  ChevronLeft,
  ChevronRight,
  Settings as SettingsIcon,
  ArrowRight,
  Eye,
  MoreVertical,
  Clock,
  CheckCircle,
  AlertCircle,
  Download,
  FileText,
} from 'lucide-react'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from 'recharts'

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState('Last 12 Months')
  const [showTimeDropdown, setShowTimeDropdown] = useState(false)

  // Stats data
  const stats = [
    { label: 'TOTAL ASSETS', value: '1,248', change: '+12.5%', icon: Building2, color: 'blue', trend: 'up' },
    { label: 'TOTAL VALUE', value: '$482.4M', change: '+12.5%', icon: DollarSign, color: 'green', trend: 'up' },
    { label: 'MONTHLY REVENUE', value: '$1.24M', change: '+2.8%', icon: TrendingUp, color: 'blue', trend: 'up' },
    { label: 'MONTHLY EXPENSES', value: '$314.2K', change: '-1.5%', icon: TrendingDown, color: 'red', trend: 'down' },
    { label: 'CONSOLIDATED GROWTH', value: '+8.1%', change: '+12%', icon: BarChart3, color: 'green', trend: 'up' },
    { label: 'ACTIVE SHAREHOLDERS', value: '156', change: '+12%', icon: Users, color: 'blue', trend: 'up' },
    { label: 'INVESTMENTS', value: '42', change: 'Stable', icon: Briefcase, color: 'purple', trend: 'stable' },
    { label: 'PROCUREMENT REQUESTS', value: '14', change: 'Priority', icon: Package, color: 'orange', trend: 'priority' },
  ]

  // Income vs Expenses Data
  const incomeExpensesData = [
    { month: 'Jan', income: 320000, expenses: 180000 },
    { month: 'Feb', income: 350000, expenses: 190000 },
    { month: 'Mar', income: 380000, expenses: 200000 },
    { month: 'Apr', income: 420000, expenses: 210000 },
    { month: 'May', income: 400000, expenses: 220000 },
    { month: 'Jun', income: 450000, expenses: 230000 },
    { month: 'Jul', income: 480000, expenses: 250000 },
    { month: 'Aug', income: 520000, expenses: 260000 },
    { month: 'Sep', income: 560000, expenses: 280000 },
    { month: 'Oct', income: 600000, expenses: 290000 },
    { month: 'Nov', income: 580000, expenses: 300000 },
    { month: 'Dec', income: 620000, expenses: 310000 },
  ]

  // Asset Distribution Data
  const assetDistributionData = [
    { name: 'Real Estate', value: 45, color: '#f97316' },
    { name: 'Equity', value: 25, color: '#3b82f6' },
    { name: 'Commodities', value: 15, color: '#22c55e' },
    { name: 'Fixed Income', value: 10, color: '#8b5cf6' },
    { name: 'Cash', value: 5, color: '#f59e0b' },
  ]

  // Investment Growth Data
  const investmentGrowthData = [
    { year: '2019', value: 180000 },
    { year: '2020', value: 220000 },
    { year: '2021', value: 280000 },
    { year: '2022', value: 350000 },
    { year: '2023', value: 420000 },
    { year: '2024', value: 500000 },
  ]

  // Transactions data
  const transactions = [
    { id: 1, entity: 'Tech Plaza', type: 'Maintenance', date: 'Oct 22, 2024', amount: '-$4,200.00', status: 'COMPLETED' },
    { id: 2, entity: 'Johnathan Smith', type: 'Investment Exit', date: 'Oct 20, 2024', amount: '+$85,000.00', status: 'COMPLETED' },
    { id: 3, entity: 'Azure Heights', type: 'Monthly Rent', date: 'Oct 19, 2024', amount: '+$18,200.00', status: 'COMPLETED' },
  ]

  const timeRanges = ['Last 12 Months', 'Last 6 Months', 'Last 3 Months', 'Last Month', 'Year to Date']

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
          <p className="text-xs font-medium text-gray-500">{label}</p>
          {payload.map((item: any, index: number) => (
            <p key={index} className="text-sm font-semibold" style={{ color: item.color }}>
              {item.name}: ${item.value.toLocaleString()}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Welcome back, Admin</h2>
          <p className="text-sm text-gray-500">Thursday, Augest 13, 2026</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-medium rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/25">
            <Plus className="w-4 h-4" />
            New Investment
          </button>
        </div>
      </div>

      {/* Main Stats Grid - Only one set of stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.slice(0, 4).map((stat, index) => (
          <div 
            key={index} 
            className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-medium text-gray-400 tracking-wider">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className={`text-xs font-medium mt-1 inline-flex items-center gap-1 ${
                  stat.trend === 'up' ? 'text-green-600' : 
                  stat.trend === 'down' ? 'text-red-600' : 'text-gray-500'
                }`}>
                  {stat.trend === 'up' && <TrendingUp className="w-3 h-3" />}
                  {stat.trend === 'down' && <TrendingDown className="w-3 h-3" />}
                  {stat.change}
                </p>
              </div>
              <div className={`p-2.5 rounded-xl bg-${stat.color}-50`}>
                <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Second Row of Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.slice(4).map((stat, index) => (
          <div 
            key={index + 4} 
            className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-medium text-gray-400 tracking-wider">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className={`text-xs font-medium mt-1 inline-flex items-center gap-1 ${
                  stat.trend === 'up' ? 'text-green-600' : 
                  stat.trend === 'down' ? 'text-red-600' : 'text-gray-500'
                }`}>
                  {stat.trend === 'up' && <TrendingUp className="w-3 h-3" />}
                  {stat.trend === 'down' && <TrendingDown className="w-3 h-3" />}
                  {stat.change}
                </p>
              </div>
              <div className={`p-2.5 rounded-xl bg-${stat.color}-50`}>
                <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row - With Actual Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Income vs Expenses Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Income vs Expenses</h3>
              <p className="text-xs text-gray-500">Financial performance comparison for 2024</p>
            </div>
            <div className="relative">
              <button 
                onClick={() => setShowTimeDropdown(!showTimeDropdown)}
                className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
              >
                {timeRange}
                <ChevronDown className={`w-3 h-3 transition-transform ${showTimeDropdown ? 'rotate-180' : ''}`} />
              </button>
              {showTimeDropdown && (
                <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[140px] z-10">
                  {timeRanges.map((range) => (
                    <button
                      key={range}
                      onClick={() => {
                        setTimeRange(range)
                        setShowTimeDropdown(false)
                      }}
                      className={`w-full text-left px-4 py-1.5 text-xs hover:bg-gray-50 transition-colors ${
                        timeRange === range ? 'text-orange-600 font-medium' : 'text-gray-600'
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={incomeExpensesData}>
                <defs>
                  <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="expensesGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#6b7280' }} />
                <YAxis tick={{ fontSize: 10, fill: '#6b7280' }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="income" 
                  stroke="#22c55e" 
                  strokeWidth={2}
                  fill="url(#incomeGradient)"
                  name="Income"
                />
                <Area 
                  type="monotone" 
                  dataKey="expenses" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  fill="url(#expensesGradient)"
                  name="Expenses"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Asset Distribution - Pie Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Asset Distribution</h3>
              <p className="text-xs text-gray-500">Portfolio breakdown</p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={assetDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {assetDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Investment Growth Chart - Full Width */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Investment Growth</h3>
            <p className="text-xs text-gray-500">Year-over-year portfolio performance</p>
          </div>
        </div>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={investmentGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="year" tick={{ fontSize: 10, fill: '#6b7280' }} />
              <YAxis tick={{ fontSize: 10, fill: '#6b7280' }} />
              <Tooltip 
  content={({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
          <p className="text-xs font-medium text-gray-500">{label}</p>
          <p className="text-sm font-semibold text-orange-600">
            ${payload[0]?.value ? payload[0].value.toLocaleString() : '0'}
          </p>
        </div>
      )
    }
    return null
  }}
/>
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#f97316" 
                strokeWidth={3}
                dot={{ fill: '#f97316', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-900">Recent Transactions</h3>
            <button className="text-xs text-orange-600 hover:text-orange-700 font-medium flex items-center gap-1 transition-colors">
              View All 
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-3">
            {transactions.map((tx, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{tx.entity}</p>
                  <p className="text-xs text-gray-400">{tx.type} • {tx.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`text-sm font-medium ${tx.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {tx.amount}
                  </span>
                  <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-medium">
                    {tx.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 bg-orange-100 rounded-lg">
              <Sparkles className="w-4 h-4 text-orange-500" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900">AI INSIGHTS</h3>
          </div>
          <div className="bg-orange-50 rounded-xl p-4 mb-4 border border-orange-100">
            <p className="text-sm text-gray-700 font-medium">Optimization Opportunity</p>
            <p className="text-xs text-gray-600 mt-1 leading-relaxed">
              "Adjusting lease terms by 4.5% could increase annual yield by $120k."
            </p>
          </div>
          <button className="w-full text-center text-xs text-orange-600 hover:text-orange-700 font-medium py-2 border border-orange-200 rounded-xl hover:bg-orange-50 transition-colors">
            View Recommendations →
          </button>
        </div>
      </div>

      
    </div>
  )
}