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
  const [assetFilter, setAssetFilter] = useState('Total')
  const [showTimeDropdown, setShowTimeDropdown] = useState(false)
  const [showAssetDropdown, setShowAssetDropdown] = useState(false)
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Review Q3 Audit Report', due: 'Due in 2 hours', completed: false },
    { id: 2, text: 'Shareholder Meeting Prep', due: 'Scheduled for 3:00 PM', completed: false },
    { id: 3, text: 'Approve Petty-Cash', due: 'Completed at 9:15 AM', completed: true },
  ])
  const [newTask, setNewTask] = useState('')
  const [showAddTask, setShowAddTask] = useState(false)
  const [hoveredStat, setHoveredStat] = useState<number | null>(null)

  // Stats data with colors
  const stats = [
    { label: 'TOTAL ASSETS', value: '482.4M', change: '+12.5%', icon: Building2, color: 'blue', trend: 'up' },
    { label: 'TOTAL ASSET VALUE', value: '$482.4M', change: '+12.5%', icon: DollarSign, color: 'green', trend: 'up' },
    { label: 'MONTHLY REVENUE', value: '$1.24M', change: '+2.8%', icon: TrendingUp, color: 'blue', trend: 'up' },
    { label: 'MONTHLY EXPENSES', value: '$314.2K', change: '-1.5%', icon: TrendingDown, color: 'red', trend: 'down' },
    { label: 'CONSOLIDATED GROWTH SINCE Q1', value: '+8.1%', change: '+12%', icon: BarChart3, color: 'green', trend: 'up' },
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
  const [transactions] = useState([
    { id: 1, entity: 'Tech Plaza', type: 'Maintenance', date: 'Oct 22, 2024', amount: '-$4,200.00', status: 'COMPLETED' },
    { id: 2, entity: 'Johnathan Smith', type: 'Growth Fund Investment Exit', date: 'Oct 20, 2024', amount: '+$85,000.00', status: 'COMPLETED' },
    { id: 3, entity: 'Azure Heights Monthly Rent', type: 'Revenue', date: 'Oct 19, 2024', amount: '+$18,200.00', status: 'COMPLETED' },
    { id: 4, entity: 'Sunset Plaza', type: 'Maintenance', date: 'Oct 18, 2024', amount: '-$3,800.00', status: 'PENDING' },
    { id: 5, entity: 'Green Energy Fund', type: 'Investment Return', date: 'Oct 17, 2024', amount: '+$45,000.00', status: 'COMPLETED' },
  ])

  // Time range options
  const timeRanges = ['Last 12 Months', 'Last 6 Months', 'Last 3 Months', 'Last Month', 'Year to Date']

  // Asset filter options
  const assetFilters = ['Total', 'Real Estate', 'Equity', 'Commodities', 'Fixed Income', 'Cash']

  // Toggle task completion
  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  // Add new task
  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { 
        id: Date.now(), 
        text: newTask, 
        due: 'New task', 
        completed: false 
      }])
      setNewTask('')
      setShowAddTask(false)
    }
  }

  // Delete task
  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
          <p className="text-xs font-medium text-gray-500">{label}</p>
          {payload.map((item: any, index: number) => (
            <p key={index} className="text-sm font-semibold" style={{ color: item.color, margin: '2px 0' }}>
              {item.name}: ${typeof item.value === 'number' ? item.value.toLocaleString() : item.value}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="p-6">
      {/* Welcome Section - Removed New Investment Button */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Welcome back, Admin</h2>
          <p className="text-sm text-gray-500">Thursday, October 24, 2024</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
          
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-default"
            onMouseEnter={() => setHoveredStat(index)}
            onMouseLeave={() => setHoveredStat(null)}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-medium text-gray-400 tracking-wider">{stat.label}</p>
                <p className="text-xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className={`text-xs font-medium mt-1 inline-flex items-center gap-1 ${
                  stat.trend === 'up' ? 'text-green-600' : 
                  stat.trend === 'down' ? 'text-red-600' : 'text-gray-500'
                }`}>
                  {stat.trend === 'up' && <TrendingUp className="w-3 h-3" />}
                  {stat.trend === 'down' && <TrendingDown className="w-3 h-3" />}
                  {stat.change}
                </p>
              </div>
              <div className={`p-2 rounded-lg bg-${stat.color}-50`}>
                <stat.icon className={`w-4 h-4 text-${stat.color}-600`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Income vs Expenses Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
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

        {/* Asset Distribution */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Asset Distribution</h3>
              <p className="text-xs text-gray-500">Portfolio breakdown</p>
            </div>
            <div className="relative">
              <button 
                onClick={() => setShowAssetDropdown(!showAssetDropdown)}
                className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
              >
                {assetFilter}
                <ChevronDown className={`w-3 h-3 transition-transform ${showAssetDropdown ? 'rotate-180' : ''}`} />
              </button>
              {showAssetDropdown && (
                <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[140px] z-10">
                  {assetFilters.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => {
                        setAssetFilter(filter)
                        setShowAssetDropdown(false)
                      }}
                      className={`w-full text-left px-4 py-1.5 text-xs hover:bg-gray-50 transition-colors ${
                        assetFilter === filter ? 'text-orange-600 font-medium' : 'text-gray-600'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={assetDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
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
      <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow mt-6">
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Recent Transactions */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-900">Recent Transactions</h3>
            <button className="text-xs text-orange-600 hover:text-orange-700 font-medium flex items-center gap-1 transition-colors">
              View All 
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[10px] font-medium text-gray-400 uppercase tracking-wider border-b border-gray-100">
                  <th className="pb-3 pr-4">ENTITY/ASSET</th>
                  <th className="pb-3 pr-4">TYPE</th>
                  <th className="pb-3 pr-4">DATE</th>
                  <th className="pb-3 pr-4">AMOUNT</th>
                  <th className="pb-3">STA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 pr-4 font-medium text-gray-900">{tx.entity}</td>
                    <td className="py-3 pr-4 text-gray-600 text-xs">{tx.type}</td>
                    <td className="py-3 pr-4 text-gray-500 text-xs">{tx.date}</td>
                    <td className={`py-3 pr-4 font-medium ${
                      tx.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {tx.amount}
                    </td>
                    <td className="py-3">
                      <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded ${
                        tx.status === 'COMPLETED' 
                          ? 'text-green-600 bg-green-50' 
                          : 'text-yellow-600 bg-yellow-50'
                      }`}>
                        <Check className={`w-3 h-3 ${tx.status === 'COMPLETED' ? '' : 'opacity-50'}`} />
                        {tx.status === 'COMPLETED' ? 'COMP' : 'PEND'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 bg-orange-100 rounded-lg">
              <Sparkles className="w-4 h-4 text-orange-500" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900">AI INSIGHTS</h3>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-lg p-4 mb-4 border border-orange-200/50">
            <p className="text-sm text-gray-700 font-medium">Optimization Opportunity</p>
            <p className="text-xs text-gray-600 mt-1 leading-relaxed">
              "Based on current occupancy trends at Tech Plaza, adjusting lease terms by 4.5% could increase annual yield by $120k without increasing vacancy risks."
            </p>
          </div>
          <button className="w-full text-center text-xs text-orange-600 hover:text-orange-700 font-medium py-2 border border-orange-200 rounded-lg hover:bg-orange-50 transition-colors flex items-center justify-center gap-1">
            View Recommendations 
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Tasks Section */}
      <div className="mt-6 bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-900">TODAY'S TASKS</h3>
          <button 
            onClick={() => setShowAddTask(!showAddTask)}
            className="flex items-center gap-1 text-xs text-orange-600 hover:text-orange-700 font-medium transition-colors"
          >
            <Plus className="w-3 h-3" />
            Add Task
          </button>
        </div>
        
        {showAddTask && (
          <div className="flex items-center gap-2 mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Enter task description..."
              className="flex-1 px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
            />
            <button
              onClick={addTask}
              className="px-3 py-1.5 bg-orange-500 text-white text-xs font-medium rounded-lg hover:bg-orange-600 transition-colors"
            >
              Add
            </button>
            <button
              onClick={() => {
                setShowAddTask(false)
                setNewTask('')
              }}
              className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        )}

        <div className="space-y-3">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500 focus:ring-2 cursor-pointer"
              />
              <div className="flex-1">
                <p className={`text-sm ${task.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                  {task.text}
                </p>
                <p className="text-xs text-gray-400">{task.due}</p>
              </div>
              <button
                onClick={() => deleteTask(task.id)}
                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-50 rounded-lg transition-all"
              >
                <X className="w-3 h-3 text-red-400 hover:text-red-600" />
              </button>
            </div>
          ))}
        </div>

        {tasks.length === 0 && (
          <div className="text-center py-6 text-gray-400 text-sm">
            No tasks for today. Click "Add Task" to create one.
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-gray-200 flex-wrap flex items-center justify-between gap-4 text-xs text-gray-400">
        <span>Powered by DreamMore</span>
        <div className="flex items-center gap-6">
          <Link href="/privacy" className="hover:text-gray-600 transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-gray-600 transition-colors">Terms of Service</Link>
          <Link href="/support" className="hover:text-gray-600 transition-colors">Contact Support</Link>
        </div>
      </div>
    </div>
  )
}