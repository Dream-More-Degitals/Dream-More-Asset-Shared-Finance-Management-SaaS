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
  FileText,
  DollarSign,
  PieChart,
  BarChart3,
  Download,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  FileSpreadsheet,
  Clock,
  CheckCircle,
  AlertCircle,
  Settings,
  Users,
  Building2,
  Briefcase,
  X,
  Check,
  Edit,
  Trash2,
  Printer,
  Mail,
  Share2,
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

export default function ReportsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [timeRange, setTimeRange] = useState('Last 30 Days')
  const [showTimeDropdown, setShowTimeDropdown] = useState(false)
  const [activeTab, setActiveTab] = useState('all')
  const [showAddReportModal, setShowAddReportModal] = useState(false)
  const [showReportMenu, setShowReportMenu] = useState<number | null>(null)
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error' | 'info', text: string } | null>(null)
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments')
  const [selectedType, setSelectedType] = useState('All Report Types')
  const [showDeptDropdown, setShowDeptDropdown] = useState(false)
  const [showTypeDropdown, setShowTypeDropdown] = useState(false)

  // New Report Form State
  const [newReport, setNewReport] = useState({
    name: '',
    category: 'Assets',
    description: '',
    type: 'PDF',
    schedule: 'One-time',
    department: 'Finance',
  })

  // Stats data
  const stats = [
    { 
      label: 'TOTAL REPORTS', 
      value: '1,284', 
      change: '+12.5%', 
      icon: FileText,
      trend: 'up'
    },
    { 
      label: 'SCHEDULED REPORTS', 
      value: '42', 
      change: '+8%', 
      icon: Clock,
      trend: 'up'
    },
    { 
      label: 'ACTIVE ANALYTICS', 
      value: '15', 
      change: '+3', 
      icon: BarChart3,
      trend: 'up'
    },
    { 
      label: 'DATA EFFICIENCY SCORE', 
      value: '99.8%', 
      change: '+0.5%', 
      icon: TrendingUp,
      trend: 'up'
    },
  ]

  // Revenue vs Budget Data
  const revenueData = [
    { month: 'JAN', actual: 320000, projected: 280000 },
    { month: 'FEB', actual: 350000, projected: 300000 },
    { month: 'MAR', actual: 380000, projected: 340000 },
    { month: 'APR', actual: 420000, projected: 380000 },
    { month: 'MAY', actual: 450000, projected: 420000 },
    { month: 'JUN', actual: 480000, projected: 450000 },
  ]

  // Asset Distribution Data
  const assetDistributionData = [
    { name: 'Real Estate', value: 52, color: '#f97316' },
    { name: 'Equity', value: 28, color: '#3b82f6' },
    { name: 'Infrastructure', value: 15, color: '#22c55e' },
    { name: 'Others', value: 5, color: '#8b5cf6' },
  ]

  // Portfolio ROI Trend Data
  const portfolioData = [
    { year: '2020', actual: 0.4, projected: 0.35 },
    { year: '2021', actual: 0.6, projected: 0.55 },
    { year: '2022', actual: 0.8, projected: 0.75 },
    { year: 'Current', actual: 1.0, projected: 0.95 },
  ]

  // Dividend Payout Data
  const dividendData = [
    { name: 'Preferred Shares A', value: 98, color: '#22c55e' },
    { name: 'Institutional Group', value: 85, color: '#3b82f6' },
    { name: 'Equity Partners B', value: 42, color: '#f97316' },
  ]

  // Recent Reports with state for adding/deleting
  const [reports, setReports] = useState([
    { 
      id: 1,
      name: 'Q3 Asset Performance Review', 
      category: 'Assets', 
      generatedBy: 'M. Kaplan',
      date: 'Oct 12, 2023',
      status: 'Completed',
      type: 'PDF',
      size: '2.4 MB',
    },
    { 
      id: 2,
      name: 'Dividend Payout Summary Oct', 
      category: 'Shareholder', 
      generatedBy: 'System Generated',
      date: 'Oct 11, 2023',
      status: 'Pending',
      type: 'Excel',
      size: '1.8 MB',
    },
    { 
      id: 3,
      name: 'Annual ROI Compliance Audit', 
      category: 'Financials', 
      generatedBy: 'J. Rodriguez',
      date: 'Oct 10, 2023',
      status: 'Completed',
      type: 'PDF',
      size: '3.1 MB',
    },
    { 
      id: 4,
      name: 'Monthly Asset Performance', 
      category: 'Assets', 
      generatedBy: 'System Generated',
      date: 'Oct 08, 2023',
      status: 'Draft',
      type: 'Word',
      size: '1.2 MB',
    },
  ])

  const timeRanges = ['Last 30 Days', 'Last 60 Days', 'Last 90 Days', 'Last 6 Months', 'Last 12 Months']
  const departments = ['All Departments', 'Finance', 'Operations', 'IT', 'HR', 'Marketing', 'Sales']
  const reportTypes = ['All Report Types', 'Assets', 'Financials', 'Shareholder', 'Compliance', 'Audit']

  // Show toast notification
  const showToast = (type: 'success' | 'error' | 'info', text: string) => {
    setToastMessage({ type, text })
    setTimeout(() => setToastMessage(null), 3000)
  }

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  // Generate new report
  const handleGenerateReport = () => {
    if (!newReport.name || !newReport.category) {
      showToast('error', 'Please fill in all required fields')
      return
    }

    const newId = reports.length + 1
    const newReportData = {
      id: newId,
      name: newReport.name,
      category: newReport.category,
      generatedBy: 'System Generated',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Pending',
      type: newReport.type,
      size: '0.5 MB',
    }
    
    setReports([newReportData, ...reports])
    setShowAddReportModal(false)
    setNewReport({
      name: '',
      category: 'Assets',
      description: '',
      type: 'PDF',
      schedule: 'One-time',
      department: 'Finance',
    })
    showToast('success', `Report "${newReport.name}" generated successfully!`)
  }

  // Delete report
  const handleDeleteReport = (id: number) => {
    const reportToDelete = reports.find(r => r.id === id)
    setReports(reports.filter(r => r.id !== id))
    setShowReportMenu(null)
    showToast('info', `Report "${reportToDelete?.name}" deleted successfully`)
  }

  // Download report
  const handleDownloadReport = (id: number) => {
    const report = reports.find(r => r.id === id)
    showToast('success', `Downloading "${report?.name}"...`)
    setShowReportMenu(null)
  }

  // Email report
  const handleEmailReport = (id: number) => {
    const report = reports.find(r => r.id === id)
    showToast('info', `Emailing "${report?.name}"...`)
    setShowReportMenu(null)
  }

  // Export all reports
  const handleExportAll = () => {
    showToast('success', 'All reports exported successfully!')
  }

  // Reset filters
  const handleResetFilters = () => {
    setSearchQuery('')
    setSelectedDepartment('All Departments')
    setSelectedType('All Report Types')
    setTimeRange('Last 30 Days')
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

      {/* Generate Report Modal */}
      {showAddReportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <FileText className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Generate New Report</h3>
              </div>
              <button 
                onClick={() => setShowAddReportModal(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleGenerateReport(); }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Report Name *</label>
                <input
                  type="text"
                  value={newReport.name}
                  onChange={(e) => setNewReport({ ...newReport, name: e.target.value })}
                  placeholder="Enter report name"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                <select
                  value={newReport.category}
                  onChange={(e) => setNewReport({ ...newReport, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                >
                  <option value="Assets">Assets</option>
                  <option value="Financials">Financials</option>
                  <option value="Shareholder">Shareholder</option>
                  <option value="Compliance">Compliance</option>
                  <option value="Audit">Audit</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newReport.description}
                  onChange={(e) => setNewReport({ ...newReport, description: e.target.value })}
                  placeholder="Brief description..."
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
                  <select
                    value={newReport.type}
                    onChange={(e) => setNewReport({ ...newReport, type: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  >
                    <option value="PDF">PDF</option>
                    <option value="Excel">Excel</option>
                    <option value="Word">Word</option>
                    <option value="CSV">CSV</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Schedule</label>
                  <select
                    value={newReport.schedule}
                    onChange={(e) => setNewReport({ ...newReport, schedule: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  >
                    <option value="One-time">One-time</option>
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Quarterly">Quarterly</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <select
                  value={newReport.department}
                  onChange={(e) => setNewReport({ ...newReport, department: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                >
                  <option value="Finance">Finance</option>
                  <option value="Operations">Operations</option>
                  <option value="IT">IT</option>
                  <option value="HR">HR</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all text-sm font-medium shadow-lg shadow-orange-500/25"
                >
                  Generate Report
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddReportModal(false)}
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
          <h2 className="text-2xl font-bold text-gray-900">Reports</h2>
          <p className="text-sm text-gray-500">Manage and generate high-precision asset performance analytics.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleExportAll}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export All
          </button>
          <button 
            onClick={() => setShowAddReportModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-medium rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/25"
          >
            <Plus className="w-4 h-4" />
            Generate Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-medium text-gray-400 tracking-wider">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className={`text-xs font-medium mt-1 inline-flex items-center gap-1 ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
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

      {/* Filters Row */}
      <div className="flex flex-wrap items-center gap-4 bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">{timeRange}</span>
          <div className="relative">
            <button
              onClick={() => setShowTimeDropdown(!showTimeDropdown)}
              className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1 px-2 py-1"
            >
              <ChevronDown className={`w-3 h-3 transition-transform ${showTimeDropdown ? 'rotate-180' : ''}`} />
            </button>
            {showTimeDropdown && (
              <div className="absolute left-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[140px] z-10">
                {timeRanges.map((range) => (
                  <button
                    key={range}
                    onClick={() => { setTimeRange(range); setShowTimeDropdown(false) }}
                    className="w-full text-left px-4 py-1.5 text-xs hover:bg-gray-50 transition-colors text-gray-600"
                  >
                    {range}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="w-px h-6 bg-gray-200"></div>

        {/* Department Filter */}
        <div className="relative">
          <button
            onClick={() => setShowDeptDropdown(!showDeptDropdown)}
            className="flex items-center gap-1 px-3 py-1.5 text-xs text-gray-500 hover:text-gray-700 transition-colors"
          >
            {selectedDepartment}
            <ChevronDown className={`w-3 h-3 transition-transform ${showDeptDropdown ? 'rotate-180' : ''}`} />
          </button>
          {showDeptDropdown && (
            <div className="absolute left-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[160px] z-10">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => {
                    setSelectedDepartment(dept)
                    setShowDeptDropdown(false)
                  }}
                  className={`w-full text-left px-4 py-1.5 text-xs hover:bg-gray-50 transition-colors ${
                    selectedDepartment === dept ? 'text-orange-600 font-medium' : 'text-gray-600'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Report Type Filter */}
        <div className="relative">
          <button
            onClick={() => setShowTypeDropdown(!showTypeDropdown)}
            className="flex items-center gap-1 px-3 py-1.5 text-xs text-gray-500 hover:text-gray-700 transition-colors"
          >
            {selectedType}
            <ChevronDown className={`w-3 h-3 transition-transform ${showTypeDropdown ? 'rotate-180' : ''}`} />
          </button>
          {showTypeDropdown && (
            <div className="absolute left-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[160px] z-10">
              {reportTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setSelectedType(type)
                    setShowTypeDropdown(false)
                  }}
                  className={`w-full text-left px-4 py-1.5 text-xs hover:bg-gray-50 transition-colors ${
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
          onClick={handleResetFilters}
          className="text-xs text-orange-600 hover:text-orange-700 ml-auto"
        >
          Reset Filters
        </button>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Financial Reports - Revenue vs Budget */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Financial Reports</h3>
              <p className="text-xs text-gray-500">Revenue vs Budget (USD)</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                Actual Revenue
              </span>
              <span className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                Projected Budget
              </span>
            </div>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="projectedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#6b7280' }} />
                <YAxis tick={{ fontSize: 10, fill: '#6b7280' }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#22c55e" 
                  strokeWidth={2}
                  fill="url(#actualGradient)"
                  name="Actual Revenue"
                />
                <Area 
                  type="monotone" 
                  dataKey="projected" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  fill="url(#projectedGradient)"
                  name="Projected Budget"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Asset Distribution */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Asset Distribution</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={assetDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {assetDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 flex justify-center gap-6">
            {assetDistributionData.map((item) => (
              <div key={item.name} className="flex items-center gap-2 text-xs">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                <span className="text-gray-600">{item.name}</span>
                <span className="font-medium text-gray-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Portfolio ROI Trend */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Portfolio ROI Trend</h3>
            <p className="text-xs text-gray-500">Actual Revenue vs Projected Budget</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
              Actual Revenue
            </span>
            <span className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
              <span className="w-3 h-3 rounded-full bg-blue-500"></span>
              Projected Budget
            </span>
          </div>
        </div>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={portfolioData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="year" tick={{ fontSize: 10, fill: '#6b7280' }} />
              <YAxis tick={{ fontSize: 10, fill: '#6b7280' }} />
              <Tooltip 
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
                        <p className="text-xs font-medium text-gray-500">{label}</p>
                        {payload.map((item: any, index: number) => (
                          <p key={index} className="text-sm font-semibold" style={{ color: item.color }}>
                            {item.name}: {item.value}%
                          </p>
                        ))}
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke="#22c55e" 
                strokeWidth={2}
                dot={{ fill: '#22c55e', r: 4 }}
                name="Actual Revenue"
              />
              <Line 
                type="monotone" 
                dataKey="projected" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ fill: '#3b82f6', r: 4 }}
                name="Projected Budget"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Dividend Payout Completion */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-900">Dividend Payout Completion</h3>
          <button className="text-xs text-orange-600 hover:text-orange-700 font-medium flex items-center gap-1">
            View Detailed Ledger
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dividendData.map((item) => (
            <div key={item.name} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-700">{item.name}</span>
                <span className="font-medium text-gray-900">{item.value}%</span>
              </div>
              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-1000"
                  style={{ 
                    width: `${item.value}%`,
                    backgroundColor: item.color
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Reports Table */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
          <h3 className="text-sm font-semibold text-gray-900">Recent Reports</h3>
          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search reports..."
                className="pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 bg-white transition-all w-48"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            <button 
              onClick={() => showToast('info', 'Filters opened')}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <Filter className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[10px] font-medium text-gray-400 uppercase tracking-wider border-b border-gray-100">
                <th className="pb-3 pr-4">REPORT NAME</th>
                <th className="pb-3 pr-4">CATEGORY</th>
                <th className="pb-3 pr-4">GENERATED BY</th>
                <th className="pb-3 pr-4">DATE</th>
                <th className="pb-3 pr-4">STATUS</th>
                <th className="pb-3">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-900">{report.name}</span>
                    </div>
                  </td>
                  <td className="py-3 pr-4">
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">
                      {report.category}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-gray-600 text-xs">{report.generatedBy}</td>
                  <td className="py-3 pr-4 text-gray-500 text-xs">{report.date}</td>
                  <td className="py-3 pr-4">
                    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${
                      report.status === 'Completed' ? 'text-green-600 bg-green-50' : 
                      report.status === 'Pending' ? 'text-yellow-600 bg-yellow-50' :
                      'text-gray-600 bg-gray-50'
                    }`}>
                      {report.status === 'Completed' ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : report.status === 'Pending' ? (
                        <Clock className="w-3 h-3" />
                      ) : (
                        <FileText className="w-3 h-3" />
                      )}
                      {report.status}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="relative">
                      <button
                        onClick={() => setShowReportMenu(showReportMenu === report.id ? null : report.id)}
                        className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <MoreVertical className="w-4 h-4 text-gray-400" />
                      </button>
                      {showReportMenu === report.id && (
                        <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[170px] z-10">
                          <button 
                            onClick={() => {
                              setShowReportMenu(null)
                              showToast('info', `Viewing "${report.name}"`)
                            }}
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                            View Report
                          </button>
                          <button 
                            onClick={() => handleDownloadReport(report.id)}
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <Download className="w-4 h-4" />
                            Download
                          </button>
                          <button 
                            onClick={() => handleEmailReport(report.id)}
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <Mail className="w-4 h-4" />
                            Email
                          </button>
                          <button 
                            onClick={() => {
                              setShowReportMenu(null)
                              showToast('info', 'Print dialog opened')
                            }}
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <Printer className="w-4 h-4" />
                            Print
                          </button>
                          <div className="border-t border-gray-100 my-1"></div>
                          <button 
                            onClick={() => handleDeleteReport(report.id)}
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
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
          <span className="text-xs text-gray-500">Showing 1 to 4 of {reports.length} reports</span>
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