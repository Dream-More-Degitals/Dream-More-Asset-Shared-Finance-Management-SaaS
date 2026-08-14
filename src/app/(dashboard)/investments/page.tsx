"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  BarChart3,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  Download,
  Eye,
  Pencil,
  Plus,
  ShieldAlert,
  Trash2,
  X,
  Check,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Building2,
  Briefcase,
  DollarSign,
  Clock,
} from "lucide-react";

type InvestmentStatus = "Active" | "Exited";
type RiskLevel = "Low" | "Medium" | "High";
type AssetClass = "Real Estate" | "Private Equity" | "Infrastructure" | "Energy" | "Technology" | "Healthcare";

type Investment = {
  id: string;
  name: string;
  assetClass: AssetClass;
  amountInvested: string;
  currentValue: string;
  roi: string;
  risk: RiskLevel;
  status: InvestmentStatus;
  icon: React.ReactNode;
  iconClass: string;
  description?: string;
  dateAdded: string;
};

const initialInvestments: Investment[] = [
  {
    id: "INV-001",
    name: "Pacific Heights Plaza",
    assetClass: "Real Estate",
    amountInvested: "$24,500,000",
    currentValue: "$31,200,000",
    roi: "+27.3%",
    risk: "Low",
    status: "Active",
    icon: <Building2 className="h-4 w-4" />,
    iconClass: "bg-orange-50 text-orange-600",
    description: "Commercial real estate portfolio",
    dateAdded: "Jan 15, 2023",
  },
  {
    id: "INV-002",
    name: "Venture Tech III",
    assetClass: "Private Equity",
    amountInvested: "$15,000,000",
    currentValue: "$18,450,000",
    roi: "+23.0%",
    risk: "High",
    status: "Active",
    icon: <Briefcase className="h-4 w-4" />,
    iconClass: "bg-blue-50 text-blue-600",
    description: "Tech startup venture fund",
    dateAdded: "Mar 10, 2023",
  },
  {
    id: "INV-003",
    name: "Global Logistics Hub",
    assetClass: "Infrastructure",
    amountInvested: "$40,000,000",
    currentValue: "$42,100,000",
    roi: "+5.2%",
    risk: "Medium",
    status: "Exited",
    icon: <Building2 className="h-4 w-4" />,
    iconClass: "bg-slate-100 text-slate-600",
    description: "Logistics infrastructure",
    dateAdded: "Jun 05, 2022",
  },
  {
    id: "INV-004",
    name: "Azure Wind Farm",
    assetClass: "Energy",
    amountInvested: "$12,000,000",
    currentValue: "$14,200,000",
    roi: "+18.3%",
    risk: "Low",
    status: "Active",
    icon: <TrendingUp className="h-4 w-4" />,
    iconClass: "bg-emerald-50 text-emerald-600",
    description: "Renewable energy project",
    dateAdded: "Aug 20, 2023",
  },
];

const chartValues = [42, 46, 44, 55, 62, 67, 64, 76, 82, 87, 94, 100];

const riskStyles: Record<RiskLevel, string> = {
  Low: "border border-emerald-200 bg-emerald-50 text-emerald-600",
  Medium: "border border-yellow-200 bg-yellow-50 text-yellow-600",
  High: "border border-orange-200 bg-orange-50 text-orange-600",
};

const statusStyles: Record<InvestmentStatus, string> = {
  Active: "bg-blue-50 text-blue-600",
  Exited: "bg-slate-100 text-slate-500",
};

const assetClasses: AssetClass[] = [
  "Real Estate",
  "Private Equity",
  "Infrastructure",
  "Energy",
  "Technology",
  "Healthcare",
];

export default function InvestmentsPage() {
  const router = useRouter();
  const [investments, setInvestments] = useState<Investment[]>(initialInvestments);
  const [selectedAssetClass, setSelectedAssetClass] = useState("All Asset Classes");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [showToast, setShowToast] = useState<{ type: 'success' | 'error' | 'info', message: string } | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 6;

  // Navigation functions
  const goToAddInvestment = () => {
    router.push("/investments/new");
  };

  const goToInvestmentDetails = (id: string) => {
    router.push(`/investments/${id}`);
  };

  // Show toast notification
  const showToastMessage = (type: 'success' | 'error' | 'info', message: string) => {
    setShowToast({ type, message });
    setTimeout(() => setShowToast(null), 3000);
  };

  // Export investments
  const handleExport = () => {
    showToastMessage('success', 'Investments exported successfully!');
  };

  // Delete investment
  const handleDeleteInvestment = (id: string) => {
    setInvestments(investments.filter(inv => inv.id !== id));
    setShowDeleteModal(null);
    showToastMessage('success', 'Investment deleted successfully!');
  };

  // Edit investment
  const handleEditInvestment = (id: string) => {
    showToastMessage('info', `Editing investment ${id}`);
  };

  // View investment
  const handleViewInvestment = (id: string) => {
    goToInvestmentDetails(id);
  };

  // Filter functions
  const handleAssetClassFilter = (assetClass: string) => {
    setSelectedAssetClass(assetClass);
    showToastMessage('info', `Filtered by: ${assetClass}`);
  };

  const handleStatusFilter = (status: string) => {
    setSelectedStatus(status);
    showToastMessage('info', `Filtered by: ${status}`);
  };

  // Pagination
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      showToastMessage('info', `Page ${page}`);
    }
  };

  // Get risk badge
  const RiskBadge = ({ risk }: { risk: RiskLevel }) => {
    return (
      <span className={`inline-flex rounded px-2 py-0.5 text-[10px] font-semibold uppercase ${riskStyles[risk]}`}>
        {risk}
      </span>
    );
  };

  // Get status badge
  const StatusBadge = ({ status }: { status: InvestmentStatus }) => {
    return (
      <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusStyles[status]}`}>
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
              <h3 className="text-lg font-bold text-gray-900">Delete Investment</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to delete this investment? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(null)}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteInvestment(showDeleteModal)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="mx-auto w-full max-w-[1200px] px-5 py-6 lg:px-8">
        {/* Page Header - Removed breadcrumb and back button */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Investment Management</h1>
            <p className="text-sm text-slate-500">Manage and track your investment portfolio</p>
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
              onClick={goToAddInvestment}
              className="flex h-10 items-center gap-2 rounded-md bg-orange-500 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
            >
              <Plus className="h-4 w-4" />
              Add Investment
            </button>
          </div>
        </div>

        {/* KPI CARDS */}
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={<CircleDollarSign className="h-4 w-4 text-orange-600" />}
            iconClass="bg-orange-50"
            title="Total Portfolio Value"
            value="$125.8M"
            badge="↗ 8.5%"
            progress={76}
          />
          <StatCard
            icon={<BarChart3 className="h-4 w-4 text-indigo-500" />}
            iconClass="bg-indigo-50"
            title="Average ROI"
            value="12.4%"
            badge="↑ 1.2%"
            footer="vs. 11.2% last quarter"
            footerClass="text-slate-600"
          />
          <StatCard
            icon={<DollarSign className="h-4 w-4 text-slate-600" />}
            iconClass="bg-slate-100"
            title="Monthly Growth"
            value="$2.1M"
            badge="Stable"
            footer="Consistent with forecast"
            footerClass="text-slate-600"
          />
          <div className="rounded-lg border border-slate-100 border-l-2 border-l-orange-500 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-red-50">
                <ShieldAlert className="h-4 w-4 text-red-300" />
              </div>
              <span className="rounded-full bg-orange-50 px-2 py-1 text-[9px] font-semibold text-orange-600">
                Moderate
              </span>
            </div>
            <p className="mt-3 text-[9px] font-medium uppercase tracking-wide text-slate-500">
              Portfolio Risk Level
            </p>
            <p className="mt-1 text-xl font-semibold text-slate-900">Tier 3</p>
            <div className="mt-4 flex gap-1">
              <div className="h-1 flex-1 rounded-full bg-emerald-500" />
              <div className="h-1 flex-1 rounded-full bg-yellow-400" />
              <div className="h-1 flex-1 rounded-full bg-orange-400" />
              <div className="h-1 flex-1 rounded-full bg-slate-200" />
            </div>
          </div>
        </section>

        {/* PERFORMANCE + TIMELINE */}
        <section className="mt-5 grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
          {/* Portfolio Performance */}
          <div className="rounded-lg border border-slate-100 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-800">Portfolio Performance</h2>
                <p className="mt-0.5 text-[9px] text-orange-600">Trailing 12-month value appreciation</p>
              </div>
              <button
                onClick={() => showToastMessage('info', 'Time range selector opened!')}
                className="flex h-7 items-center gap-2 rounded-md bg-slate-100 px-3 text-[8px] font-medium text-slate-600 hover:bg-slate-200 transition"
              >
                Last 12 Months
                <ChevronDown className="h-3 w-3" />
              </button>
            </div>

            {/* Chart */}
            <div className="mt-6">
              <div className="flex h-[220px] items-end gap-1 border-b border-slate-100 px-1">
                {chartValues.map((value, index) => (
                  <div key={index} className="flex h-full flex-1 items-end">
                    <div
                      className="w-full rounded-t-sm bg-orange-500"
                      style={{ height: `${value}%` }}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-3 grid grid-cols-6 text-[8px] font-semibold uppercase text-slate-500">
                <span>Jan</span>
                <span className="text-center">Mar</span>
                <span className="text-center">May</span>
                <span className="text-center">Jul</span>
                <span className="text-center">Sep</span>
                <span className="text-right">Dec</span>
              </div>
            </div>
          </div>

          {/* Investment Timeline */}
          <div className="rounded-lg border border-slate-100 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-bold text-slate-800">Investment Timeline</h2>
            <div className="relative mt-6">
              <div className="absolute left-[11px] top-3 bottom-3 w-px bg-slate-200" />
              <div className="space-y-7">
                <TimelineItem
                  icon="◆"
                  title="Capital Exit: SkyView Real Estate"
                  subtitle="Dec 14, 2023 • +24% ROI realized"
                  iconClass="bg-orange-500 text-white"
                />
                <TimelineItem
                  icon="▣"
                  title="New Equity Stake: FinCore Tech"
                  subtitle="Nov 28, 2023 • $12.5M Initial Injection"
                  iconClass="bg-slate-500 text-white"
                />
                <TimelineItem
                  icon="✓"
                  title="Audit Compliance Cleared"
                  subtitle="Oct 12, 2023 • Q3 Review Completed"
                  iconClass="bg-slate-600 text-white"
                />
                <TimelineItem
                  icon="▧"
                  title="Upcoming: Capital Call - GreenHedge"
                  subtitle="Expected Jan 05, 2024"
                  iconClass="bg-slate-100 text-orange-500"
                />
              </div>
            </div>
          </div>
        </section>

        {/* INVESTMENT PORTFOLIO */}
        <section className="mt-5 overflow-hidden rounded-lg border border-slate-100 bg-white shadow-sm">
          {/* Portfolio header */}
          <div className="flex flex-col gap-3 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-sm font-bold text-slate-800">Investment Portfolio</h2>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => handleAssetClassFilter("All Asset Classes")}
                className="flex h-8 items-center gap-2 rounded-md border border-orange-200 bg-white px-3 text-[9px] font-medium text-slate-600 transition hover:bg-orange-50"
              >
                <ChevronDown className="h-3 w-3" />
                {selectedAssetClass}
              </button>
              <button
                onClick={() => handleStatusFilter("All Status")}
                className="flex h-8 items-center gap-2 rounded-md border border-orange-200 bg-white px-3 text-[9px] font-medium text-slate-600 transition hover:bg-orange-50"
              >
                <ChevronDown className="h-3 w-3" />
                {selectedStatus}
              </button>
              <button
                onClick={() => showToastMessage('info', 'Date range picker opened!')}
                className="flex h-8 items-center gap-2 rounded-md border border-orange-200 bg-white px-3 text-[9px] font-medium text-slate-600 transition hover:bg-orange-50"
              >
                <CalendarDays className="h-3 w-3" />
                Oct 2023 - Dec 2023
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] border-collapse">
              <thead>
                <tr className="border-y border-orange-200 bg-slate-50">
                  <th className="px-5 py-4 text-left text-[9px] font-bold text-slate-700">Investment Name</th>
                  <th className="px-4 py-4 text-left text-[9px] font-bold text-slate-700">Asset Class</th>
                  <th className="px-4 py-4 text-left text-[9px] font-bold text-slate-700">Amount Invested</th>
                  <th className="px-4 py-4 text-left text-[9px] font-bold text-slate-700">Current Value</th>
                  <th className="px-4 py-4 text-left text-[9px] font-bold text-slate-700">ROI %</th>
                  <th className="px-4 py-4 text-left text-[9px] font-bold text-slate-700">Risk</th>
                  <th className="px-4 py-4 text-left text-[9px] font-bold text-slate-700">Status</th>
                  <th className="px-4 py-4 text-center text-[9px] font-bold text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {investments.map((investment) => (
                  <tr key={investment.id} className="border-b border-orange-100 last:border-b-0 hover:bg-slate-50">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md ${investment.iconClass}`}>
                          {investment.icon}
                        </div>
                        <span className="text-[10px] font-medium text-slate-800">{investment.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-[10px] text-slate-700">{investment.assetClass}</td>
                    <td className="px-4 py-4 text-[10px] text-slate-700">{investment.amountInvested}</td>
                    <td className="px-4 py-4 text-[10px] font-semibold text-slate-800">{investment.currentValue}</td>
                    <td className="px-4 py-4 text-[10px] font-semibold text-emerald-600">{investment.roi}</td>
                    <td className="px-4 py-4"><RiskBadge risk={investment.risk} /></td>
                    <td className="px-4 py-4"><StatusBadge status={investment.status} /></td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-4">
                        <button
                          onClick={() => handleViewInvestment(investment.id)}
                          title="View investment"
                          className="text-slate-500 transition hover:text-slate-800"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleEditInvestment(investment.id)}
                          title="Edit investment"
                          className="text-slate-500 transition hover:text-blue-600"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => setShowDeleteModal(investment.id)}
                          title="Delete investment"
                          className="text-red-500 transition hover:text-red-700"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table footer */}
          <div className="flex flex-col gap-3 border-t border-orange-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[9px] text-slate-500">
              Showing <span className="font-semibold">4</span> of <span className="font-semibold">24</span> investments
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`flex h-8 w-8 items-center justify-center rounded-md border border-orange-200 text-slate-500 transition ${
                  currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-50'
                }`}
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              {[1, 2, 3, 4, 5, 6].map((page) => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`flex h-8 w-8 items-center justify-center rounded-md text-[9px] transition ${
                    currentPage === page
                      ? 'bg-orange-500 text-white font-semibold'
                      : 'text-slate-600 hover:bg-orange-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`flex h-8 w-8 items-center justify-center rounded-md border border-orange-200 text-slate-500 transition ${
                  currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-50'
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
  footer,
  footerClass = "text-emerald-600",
  progress,
}: {
  icon: React.ReactNode;
  iconClass: string;
  title: string;
  value: string;
  badge: string;
  footer?: string;
  footerClass?: string;
  progress?: number;
}) {
  return (
    <div className="rounded-lg border border-slate-100 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div className={`flex h-8 w-8 items-center justify-center rounded-md ${iconClass}`}>{icon}</div>
        <span className="rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-semibold text-emerald-600">{badge}</span>
      </div>
      <p className="mt-3 text-[9px] font-medium uppercase tracking-wide text-slate-500">{title}</p>
      <p className="mt-1 text-xl font-semibold tracking-tight text-slate-800">{value}</p>
      {progress !== undefined ? (
        <div className="mt-4 h-1 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-orange-500" style={{ width: `${progress}%` }} />
        </div>
      ) : (
        <p className={`mt-2 text-[8px] font-medium ${footerClass}`}>{footer}</p>
      )}
    </div>
  );
}

function TimelineItem({
  icon,
  title,
  subtitle,
  iconClass,
}: {
  icon: string;
  title: string;
  subtitle: string;
  iconClass: string;
}) {
  return (
    <div className="relative flex gap-4">
      <div className={`relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[9px] font-bold ${iconClass}`}>
        {icon}
      </div>
      <div className="pt-0.5">
        <p className="text-[9px] font-semibold text-slate-700">{title}</p>
        <p className="mt-0.5 text-[8px] text-slate-500">{subtitle}</p>
      </div>
    </div>
  );
}