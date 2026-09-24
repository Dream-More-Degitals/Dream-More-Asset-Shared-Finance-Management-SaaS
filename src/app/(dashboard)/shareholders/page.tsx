'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  ChevronDown,
  Plus,
  Search,
  Filter,
  Eye,
  MoreVertical,
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  PieChart,
  BarChart3,
  Download,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  X,
  Check,
  Clock,
  AlertCircle,
  Edit,
  Trash2,
  Mail,
  Phone,
  Building2,
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

export default function ShareholdersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)
  const [showAddShareholderModal, setShowAddShareholderModal] = useState(false)
  const [showShareholderMenu, setShowShareholderMenu] = useState<number | null>(null)
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error' | 'info', text: string } | null>(null)
  const [selectedStatus, setSelectedStatus] = useState('All Status')
  const [selectedType, setSelectedType] = useState('All Types')
  const [showStatusDropdown, setShowStatusDropdown] = useState(false)
  const [showTypeDropdown, setShowTypeDropdown] = useState(false)

  // New Shareholder Form State
  const [newShareholder, setNewShareholder] = useState({
    name: '',
    company: '',
    shares: '',
    ownership: '',
    investment: '',
    dividend: '',
    status: 'ACTIVE',
    email: '',
    phone: '',
  })

  // Stats data
  const stats = [
    { 
      label: 'Total Shareholders', 
      value: '156', 
      change: '+12 this month', 
      icon: Users,
      trend: 'up'
    },
    { 
      label: 'Total Shares', 
      value: '1.0M', 
      change: 'Fully Diluted', 
      icon: TrendingUp,
      trend: 'stable'
    },
    { 
      label: 'Dividend Paid', 
      value: '$4.2M', 
      change: 'Total YTD', 
      icon: DollarSign,
      trend: 'up'
    },
    { 
      label: 'Investment Value', 
      value: '$125.8M', 
      change: '+8.5% vs last Q', 
      icon: BarChart3,
      trend: 'up'
    },
  ]

  // Ownership data for pie chart
  const ownershipData = [
    { name: 'Institutional', value: 62, color: '#f97316' },
    { name: 'Private Equity', value: 28, color: '#3b82f6' },
    { name: 'Retail', value: 10, color: '#22c55e' },
  ]

  // Dividend payout history data
  const dividendData = [
    { year: '2020', paid: 320000, allocated: 180000 },
    { year: '2021', paid: 380000, allocated: 220000 },
    { year: '2022', paid: 450000, allocated: 280000 },
    { year: '2023', paid: 520000, allocated: 350000 },
    { year: '2024', paid: 580000, allocated: 420000 },
  ]

  // Shareholders data - with state for adding/deleting/editing
  const [shareholders, setShareholders] = useState([
    { 
      id: 1,
      name: 'Eleanor Vance', 
      company: 'Vance Capital LLC',
      shares: '450,000',
      ownership: '45.0%',
      investment: '$56.25M',
      dividend: '$1.89M',
      status: 'ACTIVE',
      email: 'eleanor@vancecapital.com',
      phone: '+1 (555) 123-4567',
    },
    { 
      id: 2,
      name: 'Marcus Sterling', 
      company: 'Sterling & Co.',
      shares: '220,000',
      ownership: '22.0%',
      investment: '$27.50M',
      dividend: 'PENDING',
      status: 'PENDING',
      email: 'marcus@sterlingco.com',
      phone: '+1 (555) 234-5678',
    },
    { 
      id: 3,
      name: 'Sarah Jenkins', 
      company: 'Private Holder',
      shares: '115,000',
      ownership: '11.5%',
      investment: '$14.37M',
      dividend: 'ACTIVE',
      status: 'ACTIVE',
      email: 'sarah.jenkins@private.com',
      phone: '+1 (555) 345-6789',
    },
    { 
      id: 4,
      name: 'Robert Chen', 
      company: 'Private Holder',
      shares: '85,000',
      ownership: '8.5%',
      investment: '$10.62M',
      dividend: 'INACTIVE',
      status: 'INACTIVE',
      email: 'robert.chen@private.com',
      phone: '+1 (555) 456-7890',
    },
  ])

  // Status options
  const statusOptions = ['All Status', 'ACTIVE', 'PENDING', 'INACTIVE']
  const typeOptions = ['All Types', 'Institutional', 'Private Equity', 'Retail']

  // Show toast notification
  const showToast = (type: 'success' | 'error' | 'info', text: string) => {
    setToastMessage({ type, text })
    setTimeout(() => setToastMessage(null), 3000)
  }

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  // Add new shareholder
  const handleAddShareholder = () => {
    if (!newShareholder.name || !newShareholder.company || !newShareholder.shares) {
      showToast('error', 'Please fill in all required fields')
      return
    }

    const newId = shareholders.length + 1
    const newShareholderData = {
      id: newId,
      name: newShareholder.name,
      company: newShareholder.company,
      shares: newShareholder.shares,
      ownership: newShareholder.ownership || '0%',
      investment: newShareholder.investment || '$0',
      dividend: newShareholder.dividend || 'PENDING',
      status: newShareholder.status,
      email: newShareholder.email || 'N/A',
      phone: newShareholder.phone || 'N/A',
    }
    
    setShareholders([...shareholders, newShareholderData])
    setShowAddShareholderModal(false)
    setNewShareholder({
      name: '',
      company: '',
      shares: '',
      ownership: '',
      investment: '',
      dividend: '',
      status: 'ACTIVE',
      email: '',
      phone: '',
    })
    showToast('success', `Shareholder ${newShareholder.name} added successfully!`)
  }

  // Delete shareholder
  const handleDeleteShareholder = (id: number) => {
    const shareholderToDelete = shareholders.find(s => s.id === id)
    setShareholders(shareholders.filter(s => s.id !== id))
    setShowShareholderMenu(null)
    showToast('info', `Shareholder ${shareholderToDelete?.name} deleted successfully`)
  }

  // Edit shareholder status
  const handleEditStatus = (id: number, newStatus: string) => {
    setShareholders(shareholders.map(s => 
      s.id === id ? { ...s, status: newStatus } : s
    ))
    setShowShareholderMenu(null)
    showToast('success', `Shareholder status updated to ${newStatus}`)
  }

  // Export shareholders
  const handleExportShareholders = () => {
    showToast('success', 'Shareholders exported successfully!')
  }

  // Reset filters
  const handleResetFilters = () => {
    setSearchQuery('')
    setSelectedStatus('All Status')
    setSelectedType('All Types')
    showToast('info', 'Filters reset successfully')
  }

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
          <p className="text-xs font-medium text-gray-500">{label}</p>
          {payload.map((item: any, index: number) => (
            <p key={index} className="text-sm font-semibold" style={{ color: item.color }}>
              {item.name}: ${typeof item.value === 'number' ? (item.value / 1000).toFixed(1) : item.value}K
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

      {/* Add Shareholder Modal */}
      {showAddShareholderModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Plus className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Add New Shareholder</h3>
              </div>
              <button 
                onClick={() => setShowAddShareholderModal(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleAddShareholder(); }} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    value={newShareholder.name}
                    onChange={(e) => setNewShareholder({ ...newShareholder, name: e.target.value })}
                    placeholder="Enter full name"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <input
                    type="text"
                    value={newShareholder.company}
                    onChange={(e) => setNewShareholder({ ...newShareholder, company: e.target.value })}
                    placeholder="Company name"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Shares *</label>
                  <input
                    type="text"
                    value={newShareholder.shares}
                    onChange={(e) => setNewShareholder({ ...newShareholder, shares: e.target.value })}
                    placeholder="e.g., 450,000"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ownership %</label>
                  <input
                    type="text"
                    value={newShareholder.ownership}
                    onChange={(e) => setNewShareholder({ ...newShareholder, ownership: e.target.value })}
                    placeholder="e.g., 45.0%"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Investment</label>
                  <input
                    type="text"
                    value={newShareholder.investment}
                    onChange={(e) => setNewShareholder({ ...newShareholder, investment: e.target.value })}
                    placeholder="e.g., $56.25M"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dividend</label>
                  <input
                    type="text"
                    value={newShareholder.dividend}
                    onChange={(e) => setNewShareholder({ ...newShareholder, dividend: e.target.value })}
                    placeholder="e.g., $1.89M or PENDING"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={newShareholder.email}
                    onChange={(e) => setNewShareholder({ ...newShareholder, email: e.target.value })}
                    placeholder="email@company.com"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="text"
                    value={newShareholder.phone}
                    onChange={(e) => setNewShareholder({ ...newShareholder, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={newShareholder.status}
                  onChange={(e) => setNewShareholder({ ...newShareholder, status: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                >
                  <option value="ACTIVE">Active</option>
                  <option value="PENDING">Pending</option>
                  <option value="INACTIVE">Inactive</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all text-sm font-medium shadow-lg shadow-orange-500/25"
                >
                  Add Shareholder
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddShareholderModal(false)}
                  className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Shareholder Management</h2>
          <p className="text-sm text-gray-500">Manage and track shareholder information</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleExportShareholders}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
          <button 
            onClick={() => setShowAddShareholderModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-medium rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/25"
          >
            <Plus className="w-4 h-4" />
            Add Shareholder
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className={`text-xs font-medium mt-1 inline-flex items-center gap-1 ${
                  stat.trend === 'up' ? 'text-green-600' : 
                  stat.trend === 'down' ? 'text-red-600' : 'text-gray-500'
                }`}>
                  {stat.trend === 'up' && <ArrowUpRight className="w-3 h-3" />}
                  {stat.trend === 'down' && <ArrowDownRight className="w-3 h-3" />}
                  {stat.change}
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-orange-50">
                <stat.icon className="w-5 h-5 text-orange-500" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ownership Pie Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Ownership</h3>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={ownershipData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {ownershipData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 flex justify-center gap-6">
            {ownershipData.map((item) => (
              <div key={item.name} className="flex items-center gap-2 text-xs">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                <span className="text-gray-600">{item.name}</span>
                <span className="font-medium text-gray-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dividend Payout History */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Dividend Payout History</h3>
              <p className="text-xs text-gray-500">Year-over-year quarterly analysis</p>
            </div>
            <button className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              Last 5 Years
            </button>
          </div>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dividendData}>
                <defs>
                  <linearGradient id="paidGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="allocatedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9ca3af" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#9ca3af" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="year" tick={{ fontSize: 10, fill: '#6b7280' }} />
                <YAxis tick={{ fontSize: 10, fill: '#6b7280' }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="paid" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  fill="url(#paidGradient)"
                  name="Paid Dividends"
                />
                <Area 
                  type="monotone" 
                  dataKey="allocated" 
                  stroke="#9ca3af" 
                  strokeWidth={2}
                  fill="url(#allocatedGradient)"
                  name="Allocated Funds"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Shareholders Table */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        {/* Table Header with Search and Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex-1 min-w-[200px] relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Filter by name, ID, or company..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 bg-white transition-all"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            {/* Status Filter */}
            <div className="relative">
              <button
                onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {selectedStatus}
                <ChevronDown className={`w-4 h-4 transition-transform ${showStatusDropdown ? 'rotate-180' : ''}`} />
              </button>
              {showStatusDropdown && (
                <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[140px] z-10">
                  {statusOptions.map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        setSelectedStatus(status)
                        setShowStatusDropdown(false)
                      }}
                      className={`w-full text-left px-4 py-1.5 text-sm hover:bg-gray-50 transition-colors ${
                        selectedStatus === status ? 'text-orange-600 font-medium' : 'text-gray-600'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Type Filter */}
            <div className="relative">
              <button
                onClick={() => setShowTypeDropdown(!showTypeDropdown)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {selectedType}
                <ChevronDown className={`w-4 h-4 transition-transform ${showTypeDropdown ? 'rotate-180' : ''}`} />
              </button>
              {showTypeDropdown && (
                <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[140px] z-10">
                  {typeOptions.map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setSelectedType(type)
                        setShowTypeDropdown(false)
                      }}
                      className={`w-full text-left px-4 py-1.5 text-sm hover:bg-gray-50 transition-colors ${
                        selectedType === type ? 'text-orange-600 font-medium' : 'text-gray-600'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button 
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
            <button 
              onClick={handleResetFilters}
              className="text-sm text-orange-600 hover:text-orange-700 font-medium transition-colors"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[10px] font-medium text-gray-400 uppercase tracking-wider border-b border-gray-100">
                <th className="pb-3 pr-4">ID</th>
                <th className="pb-3 pr-4">SHAREHOLDER NAME</th>
                <th className="pb-3 pr-4">SHARES</th>
                <th className="pb-3 pr-4">OWNERSHIP %</th>
                <th className="pb-3 pr-4">INVESTMENT</th>
                <th className="pb-3 pr-4">DIVIDEND</th>
                <th className="pb-3">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {shareholders.map((shareholder) => (
                <tr key={shareholder.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="py-3 pr-4 font-mono text-xs text-gray-700">#{shareholder.id.toString().padStart(3, '0')}</td>
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-semibold text-xs">
                        {shareholder.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{shareholder.name}</p>
                        <p className="text-xs text-gray-400">{shareholder.company}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-gray-700">{shareholder.shares}</td>
                  <td className="py-3 pr-4 font-medium text-gray-900">{shareholder.ownership}</td>
                  <td className="py-3 pr-4 font-medium text-gray-900">{shareholder.investment}</td>
                  <td className="py-3 pr-4">
                    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${
                      shareholder.status === 'ACTIVE' ? 'text-green-600 bg-green-50' : 
                      shareholder.status === 'PENDING' ? 'text-yellow-600 bg-yellow-50' : 
                      'text-gray-500 bg-gray-50'
                    }`}>
                      {shareholder.dividend}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="relative">
                      <button
                        onClick={() => setShowShareholderMenu(showShareholderMenu === shareholder.id ? null : shareholder.id)}
                        className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <MoreVertical className="w-4 h-4 text-gray-400" />
                      </button>
                      {showShareholderMenu === shareholder.id && (
                        <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[180px] z-10">
                          <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                            <Eye className="w-4 h-4" />
                            View Profile
                          </button>
                          <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                            <Edit className="w-4 h-4" />
                            Edit Details
                          </button>
                          <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                            <Mail className="w-4 h-4" />
                            Send Email
                          </button>
                          <div className="border-t border-gray-100 my-1"></div>
                          {shareholder.status === 'ACTIVE' && (
                            <button 
                              onClick={() => handleEditStatus(shareholder.id, 'PENDING')}
                              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-yellow-600 hover:bg-yellow-50 transition-colors"
                            >
                              <Clock className="w-4 h-4" />
                              Set Pending
                            </button>
                          )}
                          {shareholder.status === 'PENDING' && (
                            <button 
                              onClick={() => handleEditStatus(shareholder.id, 'ACTIVE')}
                              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-green-600 hover:bg-green-50 transition-colors"
                            >
                              <Check className="w-4 h-4" />
                              Activate
                            </button>
                          )}
                          <button 
                            onClick={() => handleDeleteShareholder(shareholder.id)}
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete Shareholder
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <span className="text-xs text-gray-500">Showing 1 to 4 of {shareholders.length} shareholders</span>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1 text-xs text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">Previous</button>
            <button className="px-3 py-1 text-xs bg-orange-500 text-white rounded-lg">1</button>
            <button className="px-3 py-1 text-xs text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">2</button>
            <button className="px-3 py-1 text-xs text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">3</button>
            <button className="px-3 py-1 text-xs text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">Next</button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4 text-xs text-gray-400">
        <span>Powered by DreamMore © 2026</span>
        <div className="flex items-center gap-6">
          <Link href="/privacy" className="hover:text-gray-600 transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-gray-600 transition-colors">Terms of Service</Link>
          <Link href="/support" className="hover:text-gray-600 transition-colors">Contact Support</Link>
        </div>
      </div>
    </div>
  )
}