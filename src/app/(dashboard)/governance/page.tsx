"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  FileText,
  Plus,
  Shield,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  X,
  Check,
  Trash2,
  Pencil,
  CalendarDays,
  Filter,
  ChevronDown,
  Building2,
  FileCheck,
  Scale,
  BookOpen,
  Bell,
  TrendingUp,
} from "lucide-react";

type MeetingStatus = "Scheduled" | "Ongoing" | "Completed" | "Cancelled";
type PolicyStatus = "Updated" | "Stable" | "Revised" | "Pending";
type AuditStatus = "Success" | "Pending" | "Failed";

interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  attendees: number;
  status: MeetingStatus;
  department: string;
}

interface Policy {
  id: string;
  name: string;
  version: string;
  status: PolicyStatus;
  uploadedBy: string;
  date: string;
}

interface AuditLog {
  id: string;
  user: string;
  action: string;
  timestamp: string;
  status: AuditStatus;
}

interface BoardDecision {
  id: string;
  title: string;
  resolution: string;
  date: string;
  status: "Approved" | "Pending" | "Under Review";
}

export default function GovernancePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [showToast, setShowToast] = useState<{ type: 'success' | 'error' | 'info', message: string } | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);

  // Mock data
  const meetings: Meeting[] = [
    {
      id: "MTG-001",
      title: "Board of Directors Meeting",
      date: "Oct 25, 2024",
      time: "10:00 AM",
      attendees: 12,
      status: "Scheduled",
      department: "Executive",
    },
    {
      id: "MTG-002",
      title: "Audit Committee Review",
      date: "Oct 20, 2024",
      time: "2:30 PM",
      attendees: 8,
      status: "Completed",
      department: "Audit",
    },
  ];

  const policies: Policy[] = [
    {
      id: "POL-001",
      name: "Code of Conduct",
      version: "v4.1",
      status: "Updated",
      uploadedBy: "Administrator",
      date: "Oct 15, 2024",
    },
    {
      id: "POL-002",
      name: "Data Privacy Policy",
      version: "v3.2",
      status: "Stable",
      uploadedBy: "Legal Team",
      date: "Oct 10, 2024",
    },
    {
      id: "POL-003",
      name: "ESG Reporting Standard",
      version: "v2.0",
      status: "Revised",
      uploadedBy: "Compliance Officer",
      date: "Oct 05, 2024",
    },
  ];

  const auditLogs: AuditLog[] = [
    {
      id: "AUD-001",
      user: "Sarah Miller",
      action: "Updated Data Privacy Policy",
      timestamp: "Oct 12, 14:32",
      status: "Success",
    },
    {
      id: "AUD-002",
      user: "John Davis",
      action: "Asset Audit Q3 Submission",
      timestamp: "Oct 12, 09:15",
      status: "Pending",
    },
    {
      id: "AUD-003",
      user: "Emma Lowe",
      action: "Access Control Authorization",
      timestamp: "Oct 11, 16:50",
      status: "Success",
    },
  ];

  const boardDecisions: BoardDecision[] = [
    {
      id: "RES-882",
      title: "Capital Expenditure Q4",
      resolution: "Approved $2.4M allocation",
      date: "Oct 10, 2023",
      status: "Approved",
    },
    {
      id: "RES-881",
      title: "New Auditor Appointment",
      resolution: "PwC selected for 2024 cycle",
      date: "Oct 08, 2023",
      status: "Approved",
    },
    {
      id: "RES-883",
      title: "Share Buyback Program",
      resolution: "Under review by legal committee",
      date: "Oct 05, 2023",
      status: "Under Review",
    },
  ];

  // Stats
  const stats = [
    { label: "Upcoming Meetings", value: "8", badge: "Next: 2 hours", icon: Calendar, color: "orange" },
    { label: "Compliance Rate", value: "98.5%", badge: "Target: 99.0%", icon: Shield, color: "green" },
    { label: "Audit Records", value: "156", badge: "Active Q4 Audits", icon: FileCheck, color: "blue" },
    { label: "Pending Decisions", value: "4", badge: "Board level required", icon: AlertCircle, color: "red" },
  ];

  const showToastMessage = (type: 'success' | 'error' | 'info', message: string) => {
    setShowToast({ type, message });
    setTimeout(() => setShowToast(null), 3000);
  };

  // Navigation functions
  const goToCreateMeeting = () => {
    router.push("/governance/meetings/new");
  };

  const goToMeetingDetails = (id: string) => {
    router.push(`/governance/meetings/${id}`);
  };

  const handleExportReport = () => {
    showToastMessage('success', 'Report downloaded successfully!');
  };

  const handleRunDiagnostics = () => {
    showToastMessage('info', 'Diagnostics running...');
  };

  const handleViewAllPolicies = () => {
    router.push("/governance/policies");
  };

  const handleViewPolicy = (id: string) => {
    router.push(`/governance/policies/${id}`);
  };

  const handleDeletePolicy = (id: string) => {
    setShowDeleteModal(id);
  };

  const confirmDeletePolicy = () => {
    showToastMessage('success', 'Policy deleted successfully!');
    setShowDeleteModal(null);
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      "Scheduled": "bg-blue-50 text-blue-600 border-blue-200",
      "Ongoing": "bg-yellow-50 text-yellow-600 border-yellow-200",
      "Completed": "bg-green-50 text-green-600 border-green-200",
      "Cancelled": "bg-red-50 text-red-600 border-red-200",
      "Updated": "bg-green-50 text-green-600 border-green-200",
      "Stable": "bg-blue-50 text-blue-600 border-blue-200",
      "Revised": "bg-yellow-50 text-yellow-600 border-yellow-200",
      "Pending": "bg-yellow-50 text-yellow-600 border-yellow-200",
      "Success": "bg-green-50 text-green-600 border-green-200",
      "Failed": "bg-red-50 text-red-600 border-red-200",
      "Approved": "bg-green-50 text-green-600 border-green-200",
      "Under Review": "bg-yellow-50 text-yellow-600 border-yellow-200",
    };
    return colors[status] || "bg-gray-50 text-gray-600 border-gray-200";
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case "Success":
      case "Approved":
      case "Completed":
      case "Updated":
      case "Stable":
        return <CheckCircle className="w-3.5 h-3.5" />;
      case "Pending":
      case "Under Review":
      case "Revised":
      case "Ongoing":
        return <Clock className="w-3.5 h-3.5" />;
      default:
        return <AlertCircle className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] text-slate-800">
      {/* Toast Notification */}
      {showToast && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-slide-in max-w-md ${
          showToast.type === 'success' ? 'bg-green-50 border border-green-200 text-green-700' :
          showToast.type === 'error' ? 'bg-red-50 border border-red-200 text-red-700' :
          'bg-blue-50 border border-blue-200 text-blue-700'
        }`}>
          {showToast.type === 'success' && <Check className="w-4 h-4" />}
          {showToast.type === 'error' && <AlertCircle className="w-4 h-4" />}
          {showToast.type === 'info' && <AlertCircle className="w-4 h-4" />}
          <span className="text-sm font-medium">{showToast.message}</span>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <Trash2 className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Delete Policy</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to delete this policy? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(null)}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeletePolicy}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="mx-auto w-full max-w-[1200px] px-5 py-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Governance Dashboard</h1>
            <p className="text-sm text-slate-500">Manage corporate governance, policies, and compliance</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleRunDiagnostics}
              className="flex h-10 items-center gap-2 rounded-md border border-orange-200 bg-white px-4 text-sm font-medium text-slate-600 transition hover:bg-orange-50"
            >
              <TrendingUp className="h-4 w-4" />
              Run Diagnostics
            </button>
            <button
              onClick={goToCreateMeeting}
              className="flex h-10 items-center gap-2 rounded-md bg-orange-500 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
            >
              <Plus className="h-4 w-4" />
              Create Meeting
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="rounded-lg border border-orange-200 bg-white p-4 shadow-sm">
                <div className="flex items-start justify-between">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-md bg-${stat.color}-50`}>
                    <Icon className={`h-4 w-4 text-${stat.color}-600`} />
                  </div>
                  <span className="rounded-full bg-orange-50 px-2 py-1 text-[9px] font-semibold text-orange-600">
                    {stat.badge}
                  </span>
                </div>
                <p className="mt-3 text-[9px] font-medium uppercase tracking-wide text-slate-500">{stat.label}</p>
                <p className="mt-1 text-xl font-semibold tracking-tight text-slate-800">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Meeting Calendar and Stats Section */}
        <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Meeting Calendar */}
          <div className="rounded-lg border border-slate-100 bg-white p-5 shadow-sm lg:col-span-2">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-800">Meeting Calendar</h2>
              <button
                onClick={() => showToastMessage('info', 'Calendar view opened!')}
                className="text-xs text-orange-600 hover:text-orange-700 font-medium"
              >
                View All →
              </button>
            </div>
            <div className="mt-4">
              <div className="grid grid-cols-7 gap-1 text-center">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                  <div key={day} className="text-[8px] font-medium text-slate-400">{day}</div>
                ))}
                {[25, 26, 1, 2, 3, 4, 5].map((date, index) => (
                  <div key={index} className={`py-2 text-xs ${date === 1 ? 'bg-orange-500 text-white rounded-lg' : 'text-slate-600'}`}>
                    {date}
                  </div>
                ))}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-[9px] font-medium text-blue-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  Audit Kit Review
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-2.5 py-1 text-[9px] font-medium text-orange-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                  HR Policy Update
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-[9px] font-medium text-green-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  Board Sign-off
                </span>
              </div>
            </div>
          </div>

          {/* Compliance Rate */}
          <div className="rounded-lg border border-slate-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-800">Compliance Overview</h2>
              <button
                onClick={() => showToastMessage('info', 'Compliance report opened!')}
                className="text-xs text-orange-600 hover:text-orange-700 font-medium"
              >
                Details →
              </button>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-emerald-600">98.5%</p>
                <p className="text-xs text-slate-500">Target: 99.0%</p>
              </div>
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-emerald-500">
                <span className="text-sm font-bold text-emerald-600">98%</span>
              </div>
            </div>
            <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-emerald-500" style={{ width: "98.5%" }} />
            </div>
          </div>
        </div>

        {/* Detailed Audit Log */}
        <div className="mt-5 overflow-hidden rounded-lg border border-slate-100 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
            <h2 className="text-sm font-bold text-slate-800">Detailed Audit Log</h2>
            <button
              onClick={() => showToastMessage('info', 'All audit logs opened!')}
              className="text-xs text-orange-600 hover:text-orange-700 font-medium"
            >
              View All →
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse">
              <thead>
                <tr className="border-y border-orange-200 bg-slate-50">
                  <th className="px-5 py-3 text-left text-[9px] font-bold text-slate-700">User</th>
                  <th className="px-4 py-3 text-left text-[9px] font-bold text-slate-700">Action</th>
                  <th className="px-4 py-3 text-left text-[9px] font-bold text-slate-700">Timestamp</th>
                  <th className="px-4 py-3 text-left text-[9px] font-bold text-slate-700">Status</th>
                  <th className="px-4 py-3 text-center text-[9px] font-bold text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {auditLogs.map((log) => (
                  <tr key={log.id} className="border-b border-orange-100 last:border-b-0 hover:bg-slate-50">
                    <td className="px-5 py-3 text-[10px] font-medium text-slate-700">{log.user}</td>
                    <td className="px-4 py-3 text-[10px] text-slate-600">{log.action}</td>
                    <td className="px-4 py-3 text-[10px] text-slate-500">{log.timestamp}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[9px] font-semibold border ${getStatusColor(log.status)}`}>
                        {getStatusIcon(log.status)}
                        {log.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => showToastMessage('info', `Viewing audit: ${log.id}`)}
                          className="p-1 text-slate-400 hover:text-slate-600 transition"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => showToastMessage('success', `Downloading audit: ${log.id}`)}
                          className="p-1 text-slate-400 hover:text-slate-600 transition"
                        >
                          <Download className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col gap-3 border-t border-orange-100 px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[9px] text-slate-500">
              Showing <span className="font-semibold">1-3</span> of <span className="font-semibold">156</span> audits
            </p>
            <div className="flex items-center gap-1">
              <button className="flex h-7 w-7 items-center justify-center rounded-md border border-orange-200 text-slate-500 hover:bg-orange-50 transition">
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <button className="flex h-7 w-7 items-center justify-center rounded-md bg-orange-500 text-[9px] font-semibold text-white">1</button>
              <button className="flex h-7 w-7 items-center justify-center rounded-md text-[9px] text-slate-600 hover:bg-orange-50 transition">2</button>
              <button className="flex h-7 w-7 items-center justify-center rounded-md text-[9px] text-slate-600 hover:bg-orange-50 transition">3</button>
              <button className="flex h-7 w-7 items-center justify-center rounded-md border border-orange-200 text-slate-500 hover:bg-orange-50 transition">
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Recent Policies and Board Decisions */}
        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {/* Recent Policies */}
          <div className="rounded-lg border border-slate-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-800">Recent Policies</h2>
              <button
                onClick={handleViewAllPolicies}
                className="text-xs text-orange-600 hover:text-orange-700 font-medium"
              >
                View All Policies →
              </button>
            </div>
            <div className="mt-4 space-y-4">
              {policies.map((policy) => (
                <div key={policy.id} className="flex items-start justify-between border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                  <div>
                    <h3 className="text-xs font-semibold text-slate-700">{policy.name}</h3>
                    <p className="text-[10px] text-slate-500">{policy.version} • Uploaded by {policy.uploadedBy} {policy.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[8px] font-semibold border ${getStatusColor(policy.status)}`}>
                      {policy.status}
                    </span>
                    <button
                      onClick={() => handleViewPolicy(policy.id)}
                      className="p-1 text-slate-400 hover:text-slate-600 transition"
                    >
                      <Eye className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeletePolicy(policy.id)}
                      className="p-1 text-slate-400 hover:text-red-600 transition"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Board Decisions */}
          <div className="rounded-lg border border-slate-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-800">Board Decisions</h2>
              <button
                onClick={() => showToastMessage('info', 'All board decisions opened!')}
                className="text-xs text-orange-600 hover:text-orange-700 font-medium"
              >
                View All →
              </button>
            </div>
            <div className="mt-4 space-y-4">
              {boardDecisions.map((decision) => (
                <div key={decision.id} className="border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xs font-semibold text-slate-700">{decision.title}</h3>
                      <p className="text-[10px] text-slate-500">{decision.resolution}</p>
                      <p className="text-[9px] text-slate-400 mt-0.5">{decision.date}</p>
                    </div>
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[8px] font-semibold border ${getStatusColor(decision.status)}`}>
                      {getStatusIcon(decision.status)}
                      {decision.status === "Under Review" ? "Pending Review" : decision.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Download Report Section */}
        <div className="mt-5 rounded-lg border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-bold text-slate-800">Download Report</h2>
              <p className="text-[10px] text-slate-500">Export governance and compliance reports</p>
            </div>
            <button
              onClick={handleExportReport}
              className="flex h-9 items-center gap-2 rounded-md bg-orange-500 px-4 text-xs font-semibold text-white shadow-sm transition hover:bg-orange-600"
            >
              <Download className="h-4 w-4" />
              Download Report
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-3">
            {policies.map((policy) => (
              <div key={policy.id} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                <FileText className="h-4 w-4 text-slate-400" />
                <span className="text-xs font-medium text-slate-700">{policy.name}</span>
                <span className={`text-[8px] font-semibold px-1.5 py-0.5 rounded ${policy.status === "Updated" ? "bg-green-100 text-green-600" : policy.status === "Stable" ? "bg-blue-100 text-blue-600" : "bg-yellow-100 text-yellow-600"}`}>
                  {policy.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}