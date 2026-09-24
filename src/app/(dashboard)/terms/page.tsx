'use client'

import Link from 'next/link'
import { ChevronLeft, FileText, Check, AlertCircle, Shield, Users, Clock, Database, Lock, Server, Globe } from 'lucide-react'

export default function TermsPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      

      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="p-3 bg-orange-100 rounded-xl">
          <FileText className="w-6 h-6 text-orange-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Terms of Service</h1>
          <p className="text-sm text-gray-500">Last updated: August 2026</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-6">
        {/* Section 1: Acceptance of Terms */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">1. Acceptance of Terms</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            By accessing or using D-AssetPro, you agree to comply with and be bound by these Terms of Service. These terms establish the rules and responsibilities for using our asset and financial management platform.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed mt-2">
            If you do not agree with these terms, you should not access or use D-AssetPro.
          </p>
        </div>

        {/* Section 2: Description of Service */}
        <div className="border-t border-gray-100 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">2. Description of Service</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            D-AssetPro is an enterprise Asset and Shared Finance Management SaaS platform designed to help organizations manage and optimize their business operations.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed mt-2">
            The platform provides:
          </p>
          <ul className="mt-3 space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Asset management and lifecycle tracking</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Financial management and transaction monitoring</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Shareholder and investment management</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Procurement management</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Reporting and analytics</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>AI-powered insights and recommendations</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Compliance monitoring capabilities</span>
            </li>
          </ul>
        </div>

        {/* Section 3: User Accounts and Access */}
        <div className="border-t border-gray-100 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">3. User Accounts and Access</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Users are responsible for maintaining the confidentiality of their account credentials and ensuring that account information remains accurate.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed mt-2">
            Each organization administrator is responsible for:
          </p>
          <ul className="mt-3 space-y-2 text-sm text-gray-600 list-disc list-inside">
            <li>Creating and managing user accounts</li>
            <li>Assigning appropriate user roles and permissions</li>
            <li>Controlling access to organizational data</li>
          </ul>
          <p className="text-sm text-gray-600 leading-relaxed mt-2">
            D-AssetPro uses Role-Based Access Control (RBAC), meaning users can only access features and information permitted by their assigned role.
          </p>
        </div>

        {/* Section 4: User Responsibilities */}
        <div className="border-t border-gray-100 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">4. User Responsibilities</h2>
          <p className="text-sm text-gray-600 leading-relaxed">By using D-AssetPro, users agree to:</p>
          <ul className="mt-3 space-y-2 text-sm text-gray-600 list-disc list-inside">
            <li>Provide accurate and complete information</li>
            <li>Use the platform according to applicable laws and regulations</li>
            <li>Protect account credentials</li>
            <li>Maintain confidentiality of organizational information</li>
            <li>Avoid unauthorized access or misuse of the platform</li>
            <li>Respect intellectual property rights</li>
          </ul>
          <p className="text-sm text-gray-600 leading-relaxed mt-2">Users must not:</p>
          <ul className="mt-3 space-y-2 text-sm text-gray-600 list-disc list-inside">
            <li>Attempt to compromise system security</li>
            <li>Use the platform for illegal activities</li>
            <li>Copy, modify, or distribute platform technology without authorization</li>
          </ul>
        </div>

        {/* Section 5: Intellectual Property */}
        <div className="border-t border-gray-100 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">5. Intellectual Property</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            All D-AssetPro technology, including:
          </p>
          <ul className="mt-3 space-y-2 text-sm text-gray-600 list-disc list-inside">
            <li>Software</li>
            <li>Source code</li>
            <li>User interface design</li>
            <li>Platform features</li>
            <li>Analytics systems</li>
            <li>AI models and functionality</li>
          </ul>
          <p className="text-sm text-gray-600 leading-relaxed mt-2">
            are owned by DreamMore and protected by applicable intellectual property laws.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed mt-2">
            Users retain ownership of their own organizational data.
          </p>
        </div>

        {/* Section 6: Data Ownership and Privacy */}
        <div className="border-t border-gray-100 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">6. Data Ownership and Privacy</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Organizations maintain ownership of the data they store within D-AssetPro.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed mt-2">
            We process information only to:
          </p>
          <ul className="mt-3 space-y-2 text-sm text-gray-600 list-disc list-inside">
            <li>Provide platform services</li>
            <li>Generate reports and analytics</li>
            <li>Improve system performance</li>
            <li>Deliver AI-powered insights</li>
            <li>Maintain security and reliability</li>
          </ul>
          <p className="text-sm text-gray-600 leading-relaxed mt-2">
            Data handling practices are described in our Privacy Policy.
          </p>
        </div>

        {/* Section 7: AI-Generated Insights */}
        <div className="border-t border-gray-100 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">7. AI-Generated Insights</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            D-AssetPro may provide AI-powered recommendations, predictions, and analytics.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed mt-2">
            AI insights are designed to support business decision-making but should not replace professional judgment or independent analysis.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed mt-2">
            Organizations remain responsible for final business decisions.
          </p>
        </div>

        {/* Section 8: Offline and System Availability */}
        <div className="border-t border-gray-100 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">8. Offline and System Availability</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Some D-AssetPro features may be available through Progressive Web App (PWA) offline capabilities.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed mt-2">
            Offline functionality depends on:
          </p>
          <ul className="mt-3 space-y-2 text-sm text-gray-600 list-disc list-inside">
            <li>Device availability</li>
            <li>Local storage capacity</li>
            <li>Synchronization status</li>
            <li>Network connection availability</li>
          </ul>
        </div>

        {/* Section 9: Service Termination */}
        <div className="border-t border-gray-100 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">9. Service Termination</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            DreamMore may suspend or terminate access to D-AssetPro if:
          </p>
          <ul className="mt-3 space-y-2 text-sm text-gray-600 list-disc list-inside">
            <li>Users violate these terms</li>
            <li>Unauthorized activities are detected</li>
            <li>Security risks are identified</li>
            <li>Required by applicable laws</li>
          </ul>
          <p className="text-sm text-gray-600 leading-relaxed mt-2">
            Upon termination, access rights to the platform will end.
          </p>
        </div>

        {/* Section 10: Disclaimer */}
        <div className="border-t border-gray-100 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">10. Disclaimer</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            D-AssetPro is provided on an "as available" basis.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed mt-2">
            While we work to maintain reliable services, we do not guarantee that:
          </p>
          <ul className="mt-3 space-y-2 text-sm text-gray-600 list-disc list-inside">
            <li>The platform will always operate without interruption</li>
            <li>All AI-generated recommendations will be completely accurate</li>
            <li>The system will meet every organization's specific requirements</li>
          </ul>
        </div>

        {/* Section 11: Limitation of Liability */}
        <div className="border-t border-gray-100 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">11. Limitation of Liability</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            To the maximum extent permitted by law, DreamMore is not responsible for indirect, incidental, or consequential damages resulting from the use of D-AssetPro.
          </p>
        </div>

        {/* Section 12: Changes to Terms */}
        <div className="border-t border-gray-100 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">12. Changes to Terms</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            DreamMore may update these Terms of Service when necessary.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed mt-2">
            Users will be notified of significant changes, and continued use of D-AssetPro after updates indicates acceptance of the revised terms.
          </p>
        </div>

        {/* Section 13: Contact Information */}
        <div className="border-t border-gray-100 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">13. Contact Information</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            For questions regarding these Terms of Service:
          </p>
          <p className="mt-2 text-sm text-gray-700">
            <strong>Email:</strong> legal@dreammore.com
          </p>
        </div>
      </div>
    </div>
  )
}