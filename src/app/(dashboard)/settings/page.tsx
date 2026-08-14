'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  ChevronDown,
  Plus,
  Save,
  RefreshCw,
  X,
  Check,
  Shield,
  Bell,
  Database,
  Globe,
  Lock,
  Mail,
  Phone,
  MapPin,
  Camera,
  Moon,
  Sun,
  Clock,
  Calendar,
  AlertCircle,
  Settings as SettingsIcon,
  Building2,
  Users,
  FileText,
  BarChart3,
  TrendingUp,
  Sparkles,
  Smartphone,
  Cloud,
  Server,
  Key,
  Eye,
  EyeOff,
} from 'lucide-react'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general')
  const [showPassword, setShowPassword] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true)
  const [offlineMode, setOfflineMode] = useState(false)
  const [autoInstall, setAutoInstall] = useState(false)
  const [emailAlerts, setEmailAlerts] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [theme, setTheme] = useState('light')
  const [language, setLanguage] = useState('English (US)')
  const [timezone, setTimezone] = useState('UTC-08:00 Pacific Time (US & C)')
  const [dateFormat, setDateFormat] = useState('MM/DD/YYYY')
  const [sessionTimeout, setSessionTimeout] = useState('30')
  const [maxLoginAttempts, setMaxLoginAttempts] = useState('5')
  const [aiConfidenceThreshold, setAiConfidenceThreshold] = useState('85')
  const [companyName, setCompanyName] = useState('DreamMore Enterprises')
  const [businessEmail, setBusinessEmail] = useState('ops@dreammore.corp')
  const [phoneNumber, setPhoneNumber] = useState('+1 (555) 012-3456')
  const [officeAddress, setOfficeAddress] = useState('789 Innovation Way, Palo Alto, CA')

  // Tabs
  const tabs = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'ai', label: 'AI & Intelligence', icon: Sparkles },
    { id: 'backup', label: 'Backup & Recovery', icon: Database },
    { id: 'appearance', label: 'Appearance', icon: Globe },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">System Configuration</h2>
          <p className="text-sm text-gray-500">Manage your organization's settings and preferences</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <RefreshCw className="w-4 h-4" />
            Reset to Default
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <X className="w-4 h-4" />
            Cancel
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-medium rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/25">
            <Save className="w-4 h-4" />
            Save All Changes
          </button>
        </div>
      </div>

      {/* Unsaved Changes Alert */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600" />
          <span className="text-sm text-yellow-800">Unsaved changes detected. Remember to save before exiting.</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 pb-4 px-1 text-sm font-medium transition-colors border-b-2 ${
                activeTab === tab.id
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content Area */}
      <div className="space-y-6">
        {/* General Section */}
        {activeTab === 'general' && (
          <div className="space-y-6">
            {/* Company Information */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Company Information</h3>
              <p className="text-sm text-gray-500 mb-6">Global identity and contact details for your organization.</p>
              
              <div className="space-y-6">
                {/* Company Logo */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Logo</label>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-200">
                      <Image 
                        src="/images/D_More logo.jpg" 
                        alt="Company Logo" 
                        width={48} 
                        height={48}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                        Change Logo
                      </button>
                      <p className="text-xs text-gray-400 mt-1">Max size 2MB. Format: SVG, PNG, JPG</p>
                    </div>
                  </div>
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Company Name</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full max-w-md px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>

                {/* Business Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Business Email</label>
                  <div className="relative max-w-md">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      value={businessEmail}
                      onChange={(e) => setBusinessEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
                  <div className="relative max-w-md">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                    />
                  </div>
                </div>

                {/* Office Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Office Address</label>
                  <div className="relative max-w-md">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <textarea
                      value={officeAddress}
                      onChange={(e) => setOfficeAddress(e.target.value)}
                      rows={2}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Security Settings Preview */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">Security Settings</h4>
                  <p className="text-xs text-gray-500">Configure authentication and access control policies.</p>
                </div>
                <button 
                  onClick={() => setActiveTab('security')}
                  className="text-sm text-orange-600 hover:text-orange-700 font-medium"
                >
                  Configure →
                </button>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-700">Two-Factor Authentication (2FA)</span>
                <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-medium">Enabled</span>
              </div>
            </div>
          </div>
        )}

        {/* Security Section */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Security Settings</h3>
              <p className="text-sm text-gray-500 mb-6">Configure authentication and access control policies.</p>

              {/* Two-Factor Authentication */}
              <div className="flex items-center justify-between py-4 border-b border-gray-100">
                <div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-900">Two-Factor Authentication (2FA)</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">Require a second verification step for all admins.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={twoFactorEnabled}
                    onChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-orange-500/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                </label>
              </div>

              {/* Session Timeout */}
              <div className="flex items-center justify-between py-4 border-b border-gray-100">
                <div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-900">Session Timeout</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">Auto-logout after inactivity</p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={sessionTimeout}
                    onChange={(e) => setSessionTimeout(e.target.value)}
                    className="w-20 px-3 py-1.5 border border-gray-200 rounded-xl text-sm text-center focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                  <span className="text-sm text-gray-500">Minutes</span>
                </div>
              </div>

              {/* Max Login Attempts */}
              <div className="flex items-center justify-between py-4 border-b border-gray-100">
                <div>
                  <div className="flex items-center gap-2">
                    <Key className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-900">Max Login Attempts</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">Failed attempts before lockout</p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={maxLoginAttempts}
                    onChange={(e) => setMaxLoginAttempts(e.target.value)}
                    className="w-20 px-3 py-1.5 border border-gray-200 rounded-xl text-sm text-center focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                  <span className="text-sm text-gray-500">Attempts</span>
                </div>
              </div>

              {/* Security Audit Logs */}
              <div className="mt-4">
                <button className="text-sm text-orange-600 hover:text-orange-700 font-medium flex items-center gap-1">
                  View Security Audit Logs
                  <ChevronDown className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Notifications Section */}
        {activeTab === 'notifications' && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Notification Channels</h3>
            <p className="text-sm text-gray-500 mb-6">Decide how the system communicates critical alerts.</p>

            <div className="space-y-4">
              {/* Email Alerts */}
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={() => setEmailAlerts(!emailAlerts)}
                  className="mt-1 w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                />
                <div>
                  <label className="text-sm font-medium text-gray-900">Email Alerts</label>
                  <p className="text-xs text-gray-500">Summaries and high-priority system events.</p>
                </div>
              </div>

              {/* Push Notifications */}
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                <input
                  type="checkbox"
                  checked={pushNotifications}
                  onChange={() => setPushNotifications(!pushNotifications)}
                  className="mt-1 w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                />
                <div>
                  <label className="text-sm font-medium text-gray-900">Push Notifications</label>
                  <p className="text-xs text-gray-500">Immediate updates via browser or mobile app.</p>
                </div>
              </div>

              {/* SMS Notifications */}
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                <input
                  type="checkbox"
                  checked={smsNotifications}
                  onChange={() => setSmsNotifications(!smsNotifications)}
                  className="mt-1 w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                />
                <div>
                  <label className="text-sm font-medium text-gray-900">SMS Notifications</label>
                  <p className="text-xs text-gray-500">Critical outage and urgent security alerts.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AI & Intelligence Section */}
        {activeTab === 'ai' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI & Intelligence Engines</h3>
              <p className="text-sm text-gray-500 mb-6">Power your asset management with machine learning.</p>

              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-orange-500" />
                    <span className="text-sm font-medium text-gray-900">AI Assistant</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">Natural language queries for asset data.</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-orange-500" />
                    <span className="text-sm font-medium text-gray-900">Predictive Analytics</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">Forecast asset depreciation and ROI.</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-orange-500" />
                    <span className="text-sm font-medium text-gray-900">Smart Recommendations</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">Optimization suggestions for portfolio.</p>
                </div>

                {/* AI Confidence Threshold */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <label className="block text-sm font-medium text-gray-900 mb-1.5">AI Confidence Threshold</label>
                  <p className="text-xs text-gray-500 mb-3">Higher thresholds result in fewer, but more accurate AI suggestions.</p>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="50"
                      max="100"
                      value={aiConfidenceThreshold}
                      onChange={(e) => setAiConfidenceThreshold(e.target.value)}
                      className="w-48 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                    />
                    <span className="text-sm font-medium text-gray-900">{aiConfidenceThreshold}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* PWA & Offline Capabilities */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">PWA & Offline Capabilities</h3>
              <p className="text-sm text-gray-500 mb-6">Enhance the mobile experience and connectivity resilience.</p>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-900">Enable Offline Mode</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">Background Data Sync</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={offlineMode}
                      onChange={() => setOfflineMode(!offlineMode)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-orange-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <div className="flex items-center gap-2">
                      <Cloud className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-900">Automatic Install Prompt</span>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={autoInstall}
                      onChange={() => setAutoInstall(!autoInstall)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-orange-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Backup & Recovery Section */}
        {activeTab === 'backup' && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Data Backup & Recovery</h3>
            <p className="text-sm text-gray-500 mb-6">Protect your data with scheduled snapshots and manual controls.</p>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200">
                <div>
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-gray-900">Automatic Daily Backups</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">Backups are performed at 02:00 AM UTC daily.</p>
                </div>
                <span className="text-xs text-green-600 bg-green-100 px-2.5 py-1 rounded-full font-medium">Active</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  <Cloud className="w-4 h-4" />
                  Manual Backup Now
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  <RefreshCw className="w-4 h-4" />
                  Restore Previous Backup
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Appearance Section */}
        {activeTab === 'appearance' && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Global Appearance</h3>
            <p className="text-sm text-gray-500 mb-6">Customize the interface look and locale settings.</p>

            <div className="space-y-6">
              {/* Interface Theme */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Interface Theme</label>
                <div className="flex gap-4">
                  <button
                    onClick={() => setTheme('light')}
                    className={`flex items-center gap-2 px-4 py-2 border rounded-xl text-sm transition-colors ${
                      theme === 'light' 
                        ? 'border-orange-500 bg-orange-50 text-orange-600' 
                        : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <Sun className="w-4 h-4" />
                    Light Mode
                  </button>
                  <button
                    onClick={() => setTheme('dark')}
                    className={`flex items-center gap-2 px-4 py-2 border rounded-xl text-sm transition-colors ${
                      theme === 'dark' 
                        ? 'border-orange-500 bg-orange-50 text-orange-600' 
                        : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <Moon className="w-4 h-4" />
                    Dark Mode
                  </button>
                </div>
              </div>

              {/* Primary Language */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Primary Language</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full max-w-xs px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 bg-white"
                >
                  <option>English (US)</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                  <option>Chinese</option>
                </select>
              </div>

              {/* Time Zone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Time Zone</label>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full max-w-xs px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 bg-white"
                >
                  <option>UTC-08:00 Pacific Time (US & C)</option>
                  <option>UTC-05:00 Eastern Time</option>
                  <option>UTC+00:00 GMT</option>
                  <option>UTC+01:00 Central European</option>
                </select>
              </div>

              {/* Date Format */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Date Format</label>
                <select
                  value={dateFormat}
                  onChange={(e) => setDateFormat(e.target.value)}
                  className="w-full max-w-xs px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 bg-white"
                >
                  <option>MM/DD/YYYY</option>
                  <option>DD/MM/YYYY</option>
                  <option>YYYY-MM-DD</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      
    </div>
  )
}