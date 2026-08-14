'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  Download,
  FileSpreadsheet,
  Bell,
  Search,
  Filter,
  Eye,
  Clock,
  CheckCircle,
  Plus,
  X,
  Calendar,
  Users,
  Building2,
  Tag,
  FileText,
  AlertCircle,
  Check,
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
  PieChart,
  Pie,
  Cell,
} from 'recharts'

export default function FinancePage() {
  const [selectedTransaction, setSelectedTransaction] = useState<number | null>(null)
  const [timeRange, setTimeRange] = useState('Last 30 Days')
  const [department, setDepartment] = useState('All Departments')
  const [showTimeDropdown, setShowTimeDropdown] = useState(false)
  const [showDeptDropdown, setShowDeptDropdown] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddTransactionModal, setShowAddTransactionModal] = useState(false)
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error' | 'info', text: string } | null>(null)

  // New Transaction Form State
  const [newTransaction, setNewTransaction] = useState({
    type: 'expense',
    category: 'Rent & Utilities',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    department: 'Operations',
    description: '',
    status: 'PENDING',
  })

  // Financial Stats
  const financialStats = [
    { 
      label: 'Monthly Revenue', 
      value: '$482,900', 
      change: '+12.4%', 
      subLabel: 'vs last month',
      icon: TrendingUp, 
      trend: 'up',
    },
    { 
      label: 'Monthly Expenses', 
      value: '$124,500', 
      change: '-4.2%', 
      subLabel: 'vs last month',
      icon: TrendingDown, 
      trend: 'down',
    },
    { 
      label: 'Net Profit', 
      value: '$358,400', 
      change: '+8.1%', 
      subLabel: 'Margin Growth',
      icon: DollarSign, 
      trend: 'up',
    },
    { 
      label: 'Cash Flow', 
      value: '$1.2M', 
      change: 'STABLE', 
      subLabel: '',
      icon: Activity, 
      trend: 'stable',
    },
  ]

  // Revenue vs Expenses Data
  const revenueExpensesData = [
    { month: 'JAN', revenue: 320000, expenses: 180000 },
    { month: 'FEB', revenue: 350000, expenses: 190000 },
    { month: 'MAR', revenue: 380000, expenses: 200000 },
    { month: 'APR', revenue: 420000, expenses: 210000 },
    { month: 'MAY', revenue: 450000, expenses: 220000 },
    { month: 'JUN', revenue: 480000, expenses: 230000 },
    { month: 'JUL', revenue: 500000, expenses: 240000 },
  ]

  // Monthly Profit Trend Data
  const profitTrendData = [
    { month: 'JAN', profit: 140000 },
    { month: 'FEB', profit: 160000 },
    { month: 'MAR', profit: 180000 },
    { month: 'APR', profit: 210000 },
    { month: 'MAY', profit: 230000 },
    { month: 'JUN', profit: 250000 },
    { month: 'JUL', profit: 260000 },
  ]

  // Cash Flow Data
  const cashFlowData = [
    { month: 'JAN', inflow: 320000, outflow: 180000 },
    { month: 'FEB', inflow: 350000, outflow: 190000 },
    { month: 'MAR', inflow: 380000, outflow: 200000 },
    { month: 'APR', inflow: 420000, outflow: 210000 },
    { month: 'MAY', inflow: 450000, outflow: 220000 },
    { month: 'JUN', inflow: 480000, outflow: 230000 },
    { month: 'JUL', inflow: 500000, outflow: 240000 },
  ]

  // Expense Categories for Pie Chart
  const expenseCategoriesData = [
    { name: 'IT & Infra', value: 40, color: '#f97316' },
    { name: 'Operations', value: 30, color: '#3b82f6' },
    { name: 'Marketing', value: 20, color: '#22c55e' },
  ]

  // Transactions Data - Now with state for adding new transactions
  const [transactions, setTransactions] = useState([
    { id: 'TX-82918', date: 'Jun 14, 2023', category: 'Rent & Utilities', amount: '-$24,500.00', department: 'Operations', status: 'SUCCESS' },
    { id: 'TX-82985', date: 'Jun 12, 2023', category: 'SaaS/Software', amount: '-$1,250.00', department: 'IT & Infra', status: 'SUCCESS' },
    { id: 'TX-82998', date: 'Jun 10, 2023', category: 'Revenue/Services', amount: '+$142,000.00', department: 'Sales', status: 'SUCCESS' },
    { id: 'TX-82994', date: 'Jun 08, 2023', category: 'Hardware Asset', amount: '-$18,000.00', department: 'IT & Infra', status: 'PENDING' },
  ])

  // Department options
  const departments = ['All Departments', 'Operations', 'IT & Infra', 'Sales', 'Marketing', 'Finance', 'HR']

  // Transaction categories
  const categories = [
    'Rent & Utilities',
    'SaaS/Software',
    'Revenue/Services',
    'Hardware Asset',
    'Office Supplies',
    'Travel & Entertainment',
    'Professional Services',
    'Marketing & Advertising',
    'IT & Infrastructure',
    'Payroll & Benefits',
  ]

  // Time range options
  const timeRanges = ['Last 30 Days', 'Last 60 Days', 'Last 90 Days', 'Last 6 Months', 'Last 12 Months']

  // Show toast notification
  const showToast = (type: 'success' | 'error' | 'info', text: string) => {
    setToastMessage({ type, text })
    setTimeout(() => setToastMessage(null), 3000)
  }

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  // Add new transaction
  const handleAddTransaction = () => {
    // Validate form
    if (!newTransaction.amount || parseFloat(newTransaction.amount) <= 0) {
      showToast('error', 'Please enter a valid amount')
      return
    }

    // Generate transaction ID
    const newId = `TX-${Math.floor(Math.random() * 90000) + 10000}`
    
    // Format amount with sign
    const formattedAmount = newTransaction.type === 'income' 
      ? `+$${parseFloat(newTransaction.amount).toLocaleString()}`
      : `-$${parseFloat(newTransaction.amount).toLocaleString()}`

    // Create new transaction
    const newTx = {
      id: newId,
      date: new Date(newTransaction.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      category: newTransaction.category,
      amount: formattedAmount,
      department: newTransaction.department,
      status: newTransaction.status,
    }

    // Add to transactions list
    setTransactions([newTx, ...transactions])
    
    // Reset form and close modal
    setNewTransaction({
      type: 'expense',
      category: 'Rent & Utilities',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      department: 'Operations',
      description: '',
      status: 'PENDING',
    })
    setShowAddTransactionModal(false)
    showToast('success', `Transaction ${newId} added successfully!`)
  }

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
          <p className="text-xs font-medium text-gray-500">{label}</p>
          {payload.map((item: any, index: number) => (
            <p key={index} className="text-sm font-semibold" style={{ color: item.color }}>
              {item.name}: ${typeof item.value === 'number' ? item.value.toLocaleString() : item.value}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className={`fixed top-20 right-4 z-50 px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-slide-in ${
          toastMessage.type === 'success' ? 'bg-green-50 border border-green-200 text-green-700' :
          toastMessage.type === 'error' ? 'bg-red-50 border border-red-200 text-red-700' :
          'bg-blue-50 border border-blue-200 text-blue-700'
        }`}>
          {toastMessage.type === 'success' && <Check className="w-4 h-4" />}
          {toastMessage.type === 'error' && <AlertCircle className="w-4 h-4" />}
          {toastMessage.type === 'info' && <Clock className="w-4 h-4" />}
          <span className="text-sm font-medium">{toastMessage.text}</span>
        </div>
      )}

      {/* Add Transaction Modal */}
      {showAddTransactionModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Plus className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Add New Transaction</h3>
              </div>
              <button 
                onClick={() => setShowAddTransactionModal(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleAddTransaction(); }} className="space-y-4">
              {/* Transaction Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Transaction Type</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewTransaction({ ...newTransaction, type: 'expense' })}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      newTransaction.type === 'expense'
                        ? 'bg-red-50 text-red-600 border-2 border-red-200'
                        : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    Expense
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewTransaction({ ...newTransaction, type: 'income' })}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      newTransaction.type === 'income'
                        ? 'bg-green-50 text-green-600 border-2 border-green-200'
                        : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    Income
                  </button>
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={newTransaction.category}
                  onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount ($)</label>
                <input
                  type="number"
                  value={newTransaction.amount}
                  onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                  placeholder="0.00"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  required
                  min="0.01"
                  step="0.01"
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  value={newTransaction.date}
                  onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  required
                />
              </div>

              {/* Department */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <select
                  value={newTransaction.department}
                  onChange={(e) => setNewTransaction({ ...newTransaction, department: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                >
                  {departments.filter(d => d !== 'All Departments').map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newTransaction.description}
                  onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
                  placeholder="Enter transaction description..."
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 resize-none"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={newTransaction.status}
                  onChange={(e) => setNewTransaction({ ...newTransaction, status: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                >
                  <option value="PENDING">Pending</option>
                  <option value="SUCCESS">Success</option>
                  <option value="FAILED">Failed</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all text-sm font-medium shadow-lg shadow-orange-500/25"
                >
                  Add Transaction
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddTransactionModal(false)}
                  className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Top Row: Search Bar + Export Buttons + Add New Asset */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[200px] relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search transactions, departments, or IDs..."
            className="w-full px-4 py-2.5 pl-11 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 bg-white transition-all"
          />
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
        
        <div className="flex items-center gap-3 flex-wrap">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            Export PDF
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <FileSpreadsheet className="w-4 h-4" />
            Export Excel
          </button>
          <button 
            onClick={() => setShowAddTransactionModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-medium rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/25"
          >
            <Plus className="w-4 h-4" />
            Add Transaction
          </button>
        </div>
      </div>

      {/* Financial Management Header */}
      <div className="mb-2">
        <h1 className="text-2xl font-bold text-gray-900">Financial Management</h1>
      </div>

      {/* Financial Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {financialStats.map((stat, index) => (
          <div 
            key={index}
            className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-default"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500">{stat.label}</p>
                <p className="text-xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className={`text-xs font-medium mt-1 inline-flex items-center gap-1 ${
                  stat.trend === 'up' ? 'text-green-600' : 
                  stat.trend === 'down' ? 'text-red-600' : 'text-purple-600'
                }`}>
                  {stat.trend === 'up' && <ArrowUpRight className="w-3 h-3" />}
                  {stat.trend === 'down' && <ArrowDownRight className="w-3 h-3" />}
                  {stat.change}
                  {stat.subLabel && <span className="text-gray-400 font-normal ml-1">{stat.subLabel}</span>}
                </p>
              </div>
              <div className={`p-2 rounded-lg ${
                stat.trend === 'up' ? 'bg-green-50' : 
                stat.trend === 'down' ? 'bg-red-50' : 'bg-purple-50'
              }`}>
                <stat.icon className={`w-4 h-4 ${
                  stat.trend === 'up' ? 'text-green-600' : 
                  stat.trend === 'down' ? 'text-red-600' : 'text-purple-600'
                }`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue vs Expenses Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Revenue vs Expenses</h3>
            <p className="text-xs text-gray-500">Performance over the last 6 months</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
              REVENUE
            </span>
            <span className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
              <span className="w-3 h-3 rounded-full bg-red-500"></span>
              EXPENSES
            </span>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueExpensesData}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
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
                dataKey="revenue" 
                stroke="#22c55e" 
                strokeWidth={2}
                fill="url(#revenueGradient)"
                name="Revenue"
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

      {/* Expense Categories, Monthly Profit Trend, Cash Flow Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Expense Categories - Pie Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Expense Categories</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseCategoriesData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {expenseCategoriesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 space-y-1">
            {expenseCategoriesData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                  {item.name}
                </span>
                <span className="font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Profit Trend */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Monthly Profit Trend</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={profitTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 8, fill: '#6b7280' }} />
                <YAxis tick={{ fontSize: 8, fill: '#6b7280' }} />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="profit" 
                  stroke="#f97316" 
                  strokeWidth={2}
                  dot={{ fill: '#f97316', r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cash Flow Analysis */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Cash Flow Analysis</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={cashFlowData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 8, fill: '#6b7280' }} />
                <YAxis tick={{ fontSize: 8, fill: '#6b7280' }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="inflow" fill="#22c55e" name="Inflow" />
                <Bar dataKey="outflow" fill="#ef4444" name="Outflow" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Transactions Table */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Recent Transactions</h3>
            <p className="text-xs text-gray-500">Search by ID, description or amount...</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {/* Time Range Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowTimeDropdown(!showTimeDropdown)}
                className="text-xs text-gray-600 hover:text-gray-800 flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors bg-white"
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

            {/* Department Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowDeptDropdown(!showDeptDropdown)}
                className="text-xs text-gray-600 hover:text-gray-800 flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors bg-white"
              >
                {department}
                <ChevronDown className={`w-3 h-3 transition-transform ${showDeptDropdown ? 'rotate-180' : ''}`} />
              </button>
              {showDeptDropdown && (
                <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[160px] z-10">
                  {departments.map((dept) => (
                    <button
                      key={dept}
                      onClick={() => {
                        setDepartment(dept)
                        setShowDeptDropdown(false)
                      }}
                      className={`w-full text-left px-4 py-1.5 text-xs hover:bg-gray-50 transition-colors ${
                        department === dept ? 'text-orange-600 font-medium' : 'text-gray-600'
                      }`}
                    >
                      {dept}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button className="text-xs text-gray-600 hover:text-gray-800 flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors bg-white">
              <Filter className="w-3 h-3" />
              Filters
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[10px] font-medium text-gray-400 uppercase tracking-wider border-b border-gray-100">
                <th className="pb-3 pr-4">TRANSACTION ID</th>
                <th className="pb-3 pr-4">DATE</th>
                <th className="pb-3 pr-4">CATEGORY</th>
                <th className="pb-3 pr-4">AMOUNT</th>
                <th className="pb-3 pr-4">DEPARTMENT</th>
                <th className="pb-3">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {transactions.map((tx) => (
                <tr 
                  key={tx.id} 
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => setSelectedTransaction(selectedTransaction === parseInt(tx.id) ? null : parseInt(tx.id))}
                >
                  <td className="py-3 pr-4 font-mono text-xs text-gray-700">{tx.id}</td>
                  <td className="py-3 pr-4 text-gray-700">{tx.date}</td>
                  <td className="py-3 pr-4 text-gray-700">{tx.category}</td>
                  <td className={`py-3 pr-4 font-medium ${
                    tx.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {tx.amount}
                  </td>
                  <td className="py-3 pr-4 text-gray-600 text-xs">{tx.department}</td>
                  <td className="py-3">
                    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded ${
                      tx.status === 'SUCCESS' 
                        ? 'text-green-600 bg-green-50' 
                        : tx.status === 'PENDING'
                        ? 'text-yellow-600 bg-yellow-50'
                        : 'text-red-600 bg-red-50'
                    }`}>
                      {tx.status === 'SUCCESS' ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        <Clock className="w-3 h-3" />
                      )}
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <span className="text-xs text-gray-500">Showing 1 to 4 of {transactions.length} transactions</span>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1 text-xs text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">Previous</button>
            <button className="px-3 py-1 text-xs bg-orange-500 text-white rounded-lg">1</button>
            <button className="px-3 py-1 text-xs text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">2</button>
            <button className="px-3 py-1 text-xs text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">3</button>
            <button className="px-3 py-1 text-xs text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">Next</button>
          </div>
        </div>
      </div>

     
    </div>
  )
}