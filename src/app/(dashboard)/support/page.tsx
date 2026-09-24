'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, Mail, Phone, MessageSquare, Clock, Send, CheckCircle, HelpCircle, FileText, Users } from 'lucide-react'

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    priority: 'normal'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  if (isSubmitted) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        

        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Support Request Sent!</h2>
          <p className="text-gray-500 mt-2">
            Thank you for contacting us. Our team will respond within 24 hours.
          </p>
          <Link 
            href="/dashboard"
            className="inline-block mt-6 px-6 py-2.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Back Button */}
      <Link 
        href="/dashboard" 
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>

      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="p-3 bg-orange-100 rounded-xl">
          <HelpCircle className="w-6 h-6 text-orange-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contact Support</h1>
          <p className="text-sm text-gray-500">We're here to help you 24/7</p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-4 text-center hover:shadow-lg transition-shadow">
          <Mail className="w-8 h-8 text-orange-500 mx-auto mb-2" />
          <h4 className="text-sm font-semibold text-gray-900">Email Support</h4>
          <p className="text-xs text-gray-500">support@dreammore.com</p>
          <p className="text-xs text-gray-400 mt-1">Response within 24 hours</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-4 text-center hover:shadow-lg transition-shadow">
          <Phone className="w-8 h-8 text-orange-500 mx-auto mb-2" />
          <h4 className="text-sm font-semibold text-gray-900">Phone Support</h4>
          <p className="text-xs text-gray-500">+1 (555) 012-3456</p>
          <p className="text-xs text-gray-400 mt-1">Mon-Fri, 9AM-6PM EST</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-4 text-center hover:shadow-lg transition-shadow">
          <Clock className="w-8 h-8 text-orange-500 mx-auto mb-2" />
          <h4 className="text-sm font-semibold text-gray-900">Knowledge Base</h4>
          <p className="text-xs text-gray-500">Browse our help center</p>
          <p className="text-xs text-gray-400 mt-1">Available 24/7</p>
        </div>
      </div>

      {/* Support Form */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Send us a message</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@company.com"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Subject *
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Brief description of your issue"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Priority
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            >
              <option value="normal">Normal</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Message *
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              placeholder="Please describe your issue in detail..."
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 resize-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Send Message
              </>
            )}
          </button>
        </form>
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-gray-100 rounded-xl hover:border-orange-200 transition-colors">
            <FileText className="w-5 h-5 text-orange-500 mb-2" />
            <h4 className="text-sm font-semibold text-gray-900">How do I reset my password?</h4>
            <p className="text-xs text-gray-500 mt-1">Go to login page and click &quot;Forgot Password&quot;</p>
          </div>
          <div className="p-4 border border-gray-100 rounded-xl hover:border-orange-200 transition-colors">
            <Users className="w-5 h-5 text-orange-500 mb-2" />
            <h4 className="text-sm font-semibold text-gray-900">How do I add a new shareholder?</h4>
            <p className="text-xs text-gray-500 mt-1">Navigate to Shareholders &gt; Add Shareholder</p>
          </div>
          <div className="p-4 border border-gray-100 rounded-xl hover:border-orange-200 transition-colors">
            <FileText className="w-5 h-5 text-orange-500 mb-2" />
            <h4 className="text-sm font-semibold text-gray-900">How do I generate reports?</h4>
            <p className="text-xs text-gray-500 mt-1">Go to Reports &gt; Generate Report</p>
          </div>
          <div className="p-4 border border-gray-100 rounded-xl hover:border-orange-200 transition-colors">
            <FileText className="w-5 h-5 text-orange-500 mb-2" />
            <h4 className="text-sm font-semibold text-gray-900">How do I export data?</h4>
            <p className="text-xs text-gray-500 mt-1">Click the Export button on any page</p>
          </div>
        </div>
      </div>
    </div>
  )
}