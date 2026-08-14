'use client'

import Link from 'next/link'
import { ChevronLeft, Shield, Check, Clock, Database, Users, Lock, Server } from 'lucide-react'

export default function PrivacyPolicyPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      

      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="p-3 bg-orange-100 rounded-xl">
          <Shield className="w-6 h-6 text-orange-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Privacy Policy</h1>
          <p className="text-sm text-gray-500">Last updated: August 2026</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-6">
        {/* Section 1: Introduction */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">1. Introduction</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            At D-AssetPro, we understand the importance of protecting organizational and personal information.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed mt-2">
            This Privacy Policy explains how we collect, use, protect, and manage information when organizations and users access our Asset and Shared Finance Management platform.
          </p>
        </div>

        {/* Section 2: Information We Collect */}
        <div className="border-t border-gray-100 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">2. Information We Collect</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            We collect different types of information including:
          </p>

          <h3 className="text-md font-semibold text-gray-800 mt-4 mb-2">Account Information</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Name</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Email address</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Contact information</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Organization details</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>User roles and permissions</span>
            </li>
          </ul>

          <h3 className="text-md font-semibold text-gray-800 mt-4 mb-2">Business Information</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Asset records</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Asset values</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Financial transactions</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Investment information</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Shareholder records</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Procurement information</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Reports and analytics data</span>
            </li>
          </ul>

          <h3 className="text-md font-semibold text-gray-800 mt-4 mb-2">Technical Information</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Login activity</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Device information</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Browser information</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Platform usage information</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Security logs</span>
            </li>
          </ul>
        </div>

        {/* Section 3: How We Use Information */}
        <div className="border-t border-gray-100 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">3. How We Use Information</h2>
          <p className="text-sm text-gray-600 leading-relaxed">We use collected information to:</p>
          <ul className="mt-3 space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Provide and maintain D-AssetPro services</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Manage user access and permissions</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Generate business reports</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Improve asset tracking and financial operations</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Provide AI-powered insights</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Detect security risks</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Improve platform performance</span>
            </li>
          </ul>
        </div>

        {/* Section 4: AI and Analytics Processing */}
        <div className="border-t border-gray-100 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">4. AI and Analytics Processing</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            D-AssetPro uses AI and analytics technologies to analyze organizational data and provide:
          </p>
          <ul className="mt-3 space-y-2 text-sm text-gray-600 list-disc list-inside">
            <li>Asset performance insights</li>
            <li>Predictive maintenance recommendations</li>
            <li>Financial analysis</li>
            <li>Risk identification</li>
            <li>Business recommendations</li>
          </ul>
          <p className="text-sm text-gray-600 leading-relaxed mt-2">
            AI-generated results are provided as decision-support information.
          </p>
        </div>

        {/* Section 5: Data Security */}
        <div className="border-t border-gray-100 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">5. Data Security</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            We use security practices designed to protect user information, including:
          </p>
          <ul className="mt-3 space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-3">
              <Lock className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
              <span><strong>Secure authentication</strong> - Multi-factor authentication and secure login protocols</span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
              <span><strong>Role-based access control</strong> - Granular permissions for data access</span>
            </li>
            <li className="flex items-start gap-3">
              <Server className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
              <span><strong>Data encryption</strong> - Encryption for data in transit and at rest</span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
              <span><strong>Access monitoring</strong> - Continuous monitoring of system access</span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
              <span><strong>Security reviews</strong> - Regular security assessments and updates</span>
            </li>
          </ul>
          <p className="text-sm text-gray-600 leading-relaxed mt-2">
            We continuously improve security practices to protect organizational information.
          </p>
        </div>

        {/* Section 6: Data Sharing */}
        <div className="border-t border-gray-100 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">6. Data Sharing</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            D-AssetPro does not sell personal or organizational data.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed mt-2">
            Information may only be shared:
          </p>
          <ul className="mt-3 space-y-2 text-sm text-gray-600 list-disc list-inside">
            <li>With authorized users within an organization</li>
            <li>With trusted service providers required to operate the platform</li>
            <li>When required by legal obligations</li>
            <li>With explicit user authorization</li>
          </ul>
        </div>

        {/* Section 7: User Rights */}
        <div className="border-t border-gray-100 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">7. User Rights</h2>
          <p className="text-sm text-gray-600 leading-relaxed">Users may have the right to:</p>
          <ul className="mt-3 space-y-2 text-sm text-gray-600 list-disc list-inside">
            <li>Access their personal information</li>
            <li>Update inaccurate information</li>
            <li>Request account assistance</li>
            <li>Manage communication preferences</li>
            <li>Request information about data usage</li>
          </ul>
        </div>

        {/* Section 8: Data Retention */}
        <div className="border-t border-gray-100 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">8. Data Retention</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            We retain information only as long as necessary to:
          </p>
          <ul className="mt-3 space-y-2 text-sm text-gray-600 list-disc list-inside">
            <li>Provide services</li>
            <li>Maintain business records</li>
            <li>Improve platform functionality</li>
            <li>Meet legal and operational requirements</li>
          </ul>
        </div>

        {/* Section 9: Cookies and Usage Tracking */}
        <div className="border-t border-gray-100 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">9. Cookies and Usage Tracking</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            D-AssetPro may use cookies and similar technologies to:
          </p>
          <ul className="mt-3 space-y-2 text-sm text-gray-600 list-disc list-inside">
            <li>Maintain user sessions</li>
            <li>Improve user experience</li>
            <li>Analyze platform performance</li>
            <li>Enhance security</li>
          </ul>
        </div>

        {/* Section 10: Privacy Contact */}
        <div className="border-t border-gray-100 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">10. Privacy Contact</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            For privacy-related questions or concerns:
          </p>
          <p className="mt-2 text-sm text-gray-700">
            <strong>Email:</strong> privacy@dreammore.com
          </p>
        </div>
      </div>
    </div>
  )
}