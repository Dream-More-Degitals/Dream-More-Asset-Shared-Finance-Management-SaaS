"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  FileText,
  Filter,
  Package,
  Pencil,
  Plus,
  ShoppingCart,
  Trash2,
  Upload,
  Wrench,
  X,
  Check,
  AlertCircle,
  Truck,
  Clock,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

type ProcurementStatus = "Draft" | "Pending" | "Approved" | "Completed" | "Cancelled";

type ProcurementRequest = {
  id: string;
  title: string;
  category: string;
  department: string;
  requestedBy: string;
  date: string;
  amount: string;
  status: ProcurementStatus;
  priority: "Low" | "Medium" | "High";
  icon: React.ReactNode;
};

const initialRequests: ProcurementRequest[] = [
  {
    id: "PR-2024-001",
    title: "Office Laptops (15 units)",
    category: "IT Equipment",
    department: "Engineering",
    requestedBy: "Sarah Johnson",
    date: "Oct 15, 2024",
    amount: "$22,500.00",
    status: "Pending",
    priority: "High",
    icon: <Package className="h-4 w-4" />,
  },
  {
    id: "PR-2024-002",
    title: "Office Furniture - Meeting Room",
    category: "Furniture",
    department: "Operations",
    requestedBy: "Mike Chen",
    date: "Oct 12, 2024",
    amount: "$8,750.00",
    status: "Approved",
    priority: "Medium",
    icon: <ShoppingCart className="h-4 w-4" />,
  },
  {
    id: "PR-2024-003",
    title: "Software Licenses - Annual",
    category: "Software",
    department: "IT",
    requestedBy: "Lisa Park",
    date: "Oct 08, 2024",
    amount: "$45,000.00",
    status: "Completed",
    priority: "High",
    icon: <FileText className="h-4 w-4" />,
  },
  {
    id: "PR-2024-004",
    title: "Industrial Equipment Parts",
    category: "Equipment",
    department: "Production",
    requestedBy: "Robert Diaz",
    date: "Oct 05, 2024",
    amount: "$12,300.00",
    status: "Draft",
    priority: "Low",
    icon: <Wrench className="h-4 w-4" />,
  },
  {
    id: "PR-2024-005",
    title: "Marketing Materials - Q4",
    category: "Marketing",
    department: "Marketing",
    requestedBy: "Emma Wilson",
    date: "Oct 01, 2024",
    amount: "$15,200.00",
    status: "Cancelled",
    priority: "Medium",
    icon: <FileText className="h-4 w-4" />,
  },
];

const statusStyles: Record<ProcurementStatus, string> = {
  Draft: "bg-slate-50 text-slate-600 border border-slate-200",
  Pending: "bg-yellow-50 text-yellow-700 border border-yellow-100",
  Approved: "bg-blue-50 text-blue-700 border border-blue-100",
  Completed: "bg-emerald-50 text-emerald-700 border border-emerald-100",
  Cancelled: "bg-red-50 text-red-700 border border-red-100",
};

const statusIcons: Record<ProcurementStatus, React.ReactNode> = {
  Draft: <FileText className="h-3 w-3" />,
  Pending: <Clock className="h-3 w-3" />,
  Approved: <CheckCircle className="h-3 w-3" />,
  Completed: <CheckCircle className="h-3 w-3" />,
  Cancelled: <AlertTriangle className="h-3 w-3" />,
};

export default function ProcurementPage() {
  const router = useRouter();
  const [requests, setRequests] = useState<ProcurementRequest[]>(initialRequests);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedStatus, setSelectedStatus] = useState("Status: All");
  const [showToast, setShowToast] = useState<{ type: 'success' | 'error' | 'info', message: string } | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);

  // Navigation functions
  const goToCreateRequest = () => {
    router.push("/procurement/new");
  };

  const goToRequestDetails = (id: string) => {
    router.push(`/procurement/${id}`);
  };

  // Show toast notification
  const showToastMessage = (type: 'success' | 'error' | 'info', message: string) => {
    setShowToast({ type, message });
    setTimeout(() => setShowToast(null), 3000);
  };

  // Export requests
  const handleExport = () => {
    showToastMessage('success', 'Procurement requests exported successfully!');
  };

  // Import requests
  const handleImport = () => {
    showToastMessage('info', 'Import dialog opened!');
  };

  // Delete request
  const handleDeleteRequest = (id: string) => {
    setRequests(requests.filter(req => req.id !== id));
    setShowDeleteModal(null);
    showToastMessage('success', 'Request deleted successfully!');
  };

  // Edit request
  const handleEditRequest = (id: string) => {
    showToastMessage('info', `Editing request ${id}`);
  };

  // View request
  const handleViewRequest = (id: string) => {
    goToRequestDetails(id);
  };

  // Approve request
  const handleApproveRequest = (id: string) => {
    setRequests(requests.map(req => 
      req.id === id && req.status === 'Pending' 
        ? { ...req, status: 'Approved' } 
        : req
    ));
    showToastMessage('success', 'Request approved successfully!');
  };

  // Complete request
  const handleCompleteRequest = (id: string) => {
    setRequests(requests.map(req => 
      req.id === id && req.status === 'Approved' 
        ? { ...req, status: 'Completed' } 
        : req
    ));
    showToastMessage('success', 'Request marked as completed!');
  };

  // Filter functions
  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    showToastMessage('info', `Filtered by: ${category}`);
  };

  const handleStatusFilter = (status: string) => {
    setSelectedStatus(status);
    showToastMessage('info', `Filtered by: ${status}`);
  };

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 12;

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      showToastMessage('info', `Page ${page}`);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'High': return 'bg-red-50 text-red-600 border border-red-200';
      case 'Medium': return 'bg-yellow-50 text-yellow-600 border border-yellow-200';
      case 'Low': return 'bg-green-50 text-green-600 border border-green-200';
      default: return 'bg-gray-50 text-gray-600 border border-gray-200';
    }
  };

  const StatusBadge = ({ status }: { status: ProcurementStatus }) => {
    return (
      <span
        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusStyles[status]}`}
      >
        {statusIcons[status]}
        {status}
      </span>
    );
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
              <h3 className="text-lg font-bold text-gray-900">Delete Request</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to delete this procurement request? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(null)}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteRequest(showDeleteModal)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="mx-auto w-full max-w-[1200px] px-5 py-6 lg:px-8">
        {/* Page Header - Removed breadcrumb */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Procurement Management</h1>
            <p className="text-sm text-slate-500">Manage purchase requests and vendor procurement</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleExport}
              className="flex h-10 items-center gap-2 rounded-md border border-orange-200 bg-white px-4 text-sm font-medium text-slate-600 transition hover:bg-orange-50"
            >
              <Download className="h-4 w-4" />
              Export
            </button>
            <button
              onClick={goToCreateRequest}
              className="flex h-10 items-center gap-2 rounded-md bg-orange-500 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
            >
              <Plus className="h-4 w-4" />
              Create Purchase Request
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={<ShoppingCart className="h-4 w-4 text-orange-600" />}
            iconClass="bg-orange-50"
            title="Total Requests"
            value="1,248"
            badge="+12.4%"
            progress={100}
          />
          <StatCard
            icon={<Clock className="h-4 w-4 text-yellow-600" />}
            iconClass="bg-yellow-50"
            title="Pending Approval"
            value="42"
            badge="8 High Priority"
            progress={34}
          />
          <StatCard
            icon={<CheckCircle className="h-4 w-4 text-emerald-600" />}
            iconClass="bg-emerald-50"
            title="Completed"
            value="1,102"
            badge="88%"
            progress={88}
          />
          <StatCard
            icon={<AlertTriangle className="h-4 w-4 text-red-600" />}
            iconClass="bg-red-50"
            title="Urgent Requests"
            value="15"
            badge="Requires Action"
            progress={12}
          />
        </section>

        {/* Filters */}
        <section className="mt-4 rounded-lg border border-orange-200 bg-white p-3 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <FilterButton
                icon={<Filter className="h-3.5 w-3.5 text-slate-400" />}
                onClick={() => handleCategoryFilter("All Categories")}
              >
                All Categories
              </FilterButton>
              <FilterButton onClick={() => handleStatusFilter("Status: All")}>
                Status: All
              </FilterButton>
              <button
                onClick={() => showToastMessage('info', 'Date range picker opened!')}
                className="flex h-9 items-center gap-2 rounded-md border border-orange-200 bg-white px-3 text-xs font-medium text-slate-600 transition hover:bg-orange-50"
              >
                <CalendarDays className="h-3.5 w-3.5 text-slate-400" />
                Date Range
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleImport}
                className="flex h-9 items-center gap-2 rounded-md border border-orange-200 bg-white px-3 text-xs font-medium text-slate-600 transition hover:bg-orange-50"
              >
                <Upload className="h-3.5 w-3.5" />
                Import
              </button>
            </div>
          </div>
        </section>

        {/* Procurement Table */}
        <section className="mt-4 overflow-hidden rounded-lg border border-orange-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] border-collapse">
              <thead>
                <tr className="border-b border-orange-200 bg-slate-50">
                  <th className="px-3 py-4 text-left text-[10px] font-bold uppercase tracking-wide text-slate-600">
                    Request ID
                  </th>
                  <th className="px-3 py-4 text-left text-[10px] font-bold uppercase tracking-wide text-slate-600">
                    Title
                  </th>
                  <th className="px-3 py-4 text-left text-[10px] font-bold uppercase tracking-wide text-slate-600">
                    Category
                  </th>
                  <th className="px-3 py-4 text-left text-[10px] font-bold uppercase tracking-wide text-slate-600">
                    Department
                  </th>
                  <th className="px-3 py-4 text-left text-[10px] font-bold uppercase tracking-wide text-slate-600">
                    Amount
                  </th>
                  <th className="px-3 py-4 text-left text-[10px] font-bold uppercase tracking-wide text-slate-600">
                    Status
                  </th>
                  <th className="px-3 py-4 text-left text-[10px] font-bold uppercase tracking-wide text-slate-600">
                    Priority
                  </th>
                  <th className="px-3 py-4 text-center text-[10px] font-bold uppercase tracking-wide text-slate-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr
                    key={req.id}
                    className="border-b border-orange-100 last:border-b-0 hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-3 py-4 align-middle">
                      <span className="text-[11px] font-semibold text-orange-700">
                        {req.id}
                      </span>
                    </td>
                    <td className="px-3 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-slate-100 text-slate-500">
                          {req.icon}
                        </div>
                        <span className="max-w-[150px] text-xs font-medium text-slate-700">
                          {req.title}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-4 text-xs text-slate-600">
                      {req.category}
                    </td>
                    <td className="px-3 py-4 text-xs text-slate-600">
                      {req.department}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-xs font-semibold text-slate-700">
                      {req.amount}
                    </td>
                    <td className="px-3 py-4">
                      <StatusBadge status={req.status} />
                    </td>
                    <td className="px-3 py-4">
                      <span className={`inline-flex rounded-full px-2 py-1 text-[10px] font-semibold ${getPriorityColor(req.priority)}`}>
                        {req.priority}
                      </span>
                    </td>
                    <td className="px-3 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleViewRequest(req.id)}
                          title="View details"
                          className="p-1 text-slate-500 transition hover:text-slate-800 rounded hover:bg-gray-100"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                        {req.status === 'Pending' && (
                          <button
                            onClick={() => handleApproveRequest(req.id)}
                            title="Approve request"
                            className="p-1 text-emerald-500 transition hover:text-emerald-700 rounded hover:bg-emerald-50"
                          >
                            <CheckCircle className="h-3.5 w-3.5" />
                          </button>
                        )}
                        {req.status === 'Approved' && (
                          <button
                            onClick={() => handleCompleteRequest(req.id)}
                            title="Mark as completed"
                            className="p-1 text-blue-500 transition hover:text-blue-700 rounded hover:bg-blue-50"
                          >
                            <Check className="h-3.5 w-3.5" />
                          </button>
                        )}
                        <button
                          onClick={() => handleEditRequest(req.id)}
                          title="Edit request"
                          className="p-1 text-slate-500 transition hover:text-blue-600 rounded hover:bg-blue-50"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        {req.status === 'Draft' && (
                          <button
                            onClick={() => setShowDeleteModal(req.id)}
                            title="Delete request"
                            className="p-1 text-slate-500 transition hover:text-red-600 rounded hover:bg-red-50"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="flex flex-col gap-3 border-t border-orange-100 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[10px] text-slate-500">
              Showing <span className="font-semibold">1-5</span> of{" "}
              <span className="font-semibold">1,248</span> requests
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`flex h-7 w-7 items-center justify-center rounded text-slate-400 ${
                  currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-100'
                }`}
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              {[1, 2, 3, 12].map((page) => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`flex h-7 w-7 items-center justify-center rounded text-[10px] ${
                    currentPage === page
                      ? 'bg-orange-500 text-white font-semibold'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`flex h-7 w-7 items-center justify-center rounded text-slate-400 ${
                  currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-100'
                }`}
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

// Helper Components
function StatCard({
  icon,
  iconClass,
  title,
  value,
  badge,
  progress,
}: {
  icon: React.ReactNode;
  iconClass: string;
  title: string;
  value: string;
  badge: string;
  progress: number;
}) {
  return (
    <div className="rounded-lg border border-orange-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-start justify-between">
        <div className={`flex h-8 w-8 items-center justify-center rounded-md ${iconClass}`}>
          {icon}
        </div>
        <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-medium text-emerald-600">
          {badge}
        </span>
      </div>
      <p className="text-xs font-medium text-slate-500">{title}</p>
      <p className="mt-1 text-2xl font-semibold tracking-tight text-slate-800">{value}</p>
      <div className="mt-3 h-1 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-slate-700" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

function FilterButton({
  children,
  icon,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`flex h-9 items-center gap-2 rounded-md border border-orange-200 bg-white px-3 text-xs font-medium text-slate-600 transition hover:bg-orange-50 ${className}`}
    >
      {icon}
      <span>{children}</span>
      <ChevronDown className="ml-auto h-3.5 w-3.5 text-slate-400" />
    </button>
  );
}