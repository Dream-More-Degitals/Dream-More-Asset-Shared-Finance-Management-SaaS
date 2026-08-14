"use client";

import {
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  CircleDollarSign,
  Download,
  Eye,
  MoreVertical,
  Package,
  Plus,
  Sparkles,
  X,
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

type RequestStatus = "Pending" | "Approved" | "Ordered" | "Rejected";

type ProcurementRequest = {
  id: string;
  item: string;
  details: string;
  supplier: string;
  requestor: string;
  amount: string;
  status: RequestStatus;
};

const requests: ProcurementRequest[] = [
  {
    id: "#PR-8821",
    item: "MacBook Pro M3 Max",
    details: "IT Assets • Qty: 5",
    supplier: "Global Tech Inc.",
    requestor: "Sarah Jenkins",
    amount: "$16,245.00",
    status: "Pending",
  },
  {
    id: "#PR-8819",
    item: "Office Furniture Set",
    details: "Facilities • Floor 4",
    supplier: "Modern Spaces Ltd.",
    requestor: "David Chen",
    amount: "$4,820.00",
    status: "Approved",
  },
  {
    id: "#PR-8815",
    item: "Cloud Server Hosting",
    details: "Infrastructure • Annual",
    supplier: "AWS Enterprise",
    requestor: "Robert Pike",
    amount: "$124,000.00",
    status: "Ordered",
  },
  {
    id: "#PR-8810",
    item: "Executive Travel Expense",
    details: "Travel • Reimbursement",
    supplier: "Airlines Global",
    requestor: "Jessica Wu",
    amount: "$2,450.00",
    status: "Rejected",
  },
];

const statusStyles: Record<RequestStatus, string> = {
  Pending: "bg-orange-50 text-orange-600",
  Approved: "bg-emerald-50 text-emerald-600",
  Ordered: "bg-blue-50 text-blue-600",
  Rejected: "bg-red-50 text-red-600",
};

function StatCard({
  icon,
  iconClass,
  title,
  value,
  badge,
  footer,
  footerClass = "text-emerald-600",
}: {
  icon: React.ReactNode;
  iconClass: string;
  title: string;
  value: string;
  badge?: string;
  footer: string;
  footerClass?: string;
}) {
  return (
    <div className="rounded-lg border border-orange-200 bg-white p-3 shadow-sm">
      <div className="flex items-start justify-between">
        <div
          className={`flex h-7 w-7 items-center justify-center rounded-md ${iconClass}`}
        >
          {icon}
        </div>

        {badge && (
          <span className="rounded-full bg-orange-50 px-2 py-0.5 text-[8px] font-semibold uppercase text-orange-600">
            {badge}
          </span>
        )}
      </div>

      <p className="mt-3 text-[9px] font-medium text-slate-500">
        {title}
      </p>

      <p className="mt-0.5 text-2xl font-semibold tracking-tight text-slate-700">
        {value}
      </p>

      <p className={`mt-1 text-[8px] font-medium ${footerClass}`}>
        {footer}
      </p>
    </div>
  );
}

function StatusBadge({ status }: { status: RequestStatus }) {
  return (
    <span
      className={`inline-flex rounded-full px-2 py-0.5 text-[8px] font-bold uppercase ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}

function ActionButtons({ status }: { status: RequestStatus }) {
  if (status === "Pending") {
    return (
      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          title="Approve request"
          className="cursor-pointer text-emerald-600 transition hover:text-emerald-800"
        >
          <Check className="h-3.5 w-3.5" />
        </button>

        <button
          type="button"
          title="Reject request"
          className="cursor-pointer text-red-500 transition hover:text-red-700"
        >
          <X className="h-3.5 w-3.5" />
        </button>

        <button
          type="button"
          title="View request"
          className="cursor-pointer text-slate-500 transition hover:text-slate-800"
        >
          <Eye className="h-3.5 w-3.5" />
        </button>
      </div>
    );
  }

  if (status === "Approved") {
    return (
      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          title="View request"
          className="cursor-pointer text-slate-500 transition hover:text-slate-800"
        >
          <Eye className="h-3.5 w-3.5" />
        </button>

        <button
          type="button"
          title="More actions"
          className="cursor-pointer text-slate-500 transition hover:text-slate-800"
        >
          <MoreVertical className="h-3.5 w-3.5" />
        </button>
      </div>
    );
  }

  if (status === "Ordered") {
    return (
      <div className="flex items-center justify-center">
        <button
          type="button"
          title="View request"
          className="cursor-pointer text-slate-500 transition hover:text-slate-800"
        >
          <Eye className="h-3.5 w-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <button
        type="button"
        title="View rejection details"
        className="cursor-pointer text-slate-500 transition hover:text-slate-800"
      >
        <CircleAlert className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

function FilterButton({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={`flex h-8 cursor-pointer items-center rounded-md border border-orange-200 bg-white px-3 text-[9px] font-medium text-slate-600 transition hover:bg-orange-50 ${className}`}
    >
      {children}
    </button>
  );
}

export default function ProcurementPage() {
  return (
     <DashboardLayout  sidebarVariant="procurement"
  searchPlaceholder="Search requests, suppliers, or items..."
  userName="Alex Thompson"
  userRole="SENIOR ADMIN"
  showSettings={true}>
    <div className="min-h-screen bg-[#f7f9fb] text-slate-800">
      {/* Temporary page shell.
          This will later be replaced with the team's shared DashboardLayout. */}

      <main className="mx-auto w-full max-w-[1200px] px-5 py-5 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-1 flex items-center gap-2 text-[9px] text-slate-400">
          <span>Organization</span>
          <ChevronRight className="h-3 w-3" />
          <span className="font-semibold text-slate-700">
            Procurement
          </span>
        </div>

        {/* Page heading */}
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <button
              type="button"
              className="mb-2 flex h-7 cursor-pointer items-center gap-1 rounded-md border border-orange-200 bg-white px-3 text-[9px] font-medium text-slate-600 shadow-sm transition hover:bg-orange-50"
            >
              <ChevronLeft className="h-3 w-3" />
              Back
            </button>

            <h1 className="text-xl font-bold tracking-tight text-slate-800">
              Procurement Management
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="flex h-8 cursor-pointer items-center gap-2 rounded-md border border-orange-300 bg-white px-3 text-[9px] font-medium text-slate-600 transition hover:bg-orange-50"
            >
              <Download className="h-3 w-3" />
              Export
            </button>

            <button
              type="button"
              className="flex h-8 cursor-pointer items-center gap-2 rounded-md bg-orange-500 px-4 text-[9px] font-semibold text-white shadow-sm transition hover:bg-orange-600"
            >
              <Plus className="h-3.5 w-3.5" />
              Create Purchase Request
            </button>
          </div>
        </div>

        {/* Statistics */}
        <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={<Package className="h-3.5 w-3.5 text-orange-600" />}
            iconClass="bg-orange-50"
            title="Pending Requests"
            value="24"
            badge="Needs Action"
            footer="↓ 12% from last week"
            footerClass="text-red-500"
          />

          <StatCard
            icon={<Check className="h-3.5 w-3.5 text-emerald-600" />}
            iconClass="bg-emerald-50"
            title="Approved Requests"
            value="142"
            footer="↗ 8% this month"
          />

          <StatCard
            icon={<X className="h-3.5 w-3.5 text-red-500" />}
            iconClass="bg-red-50"
            title="Rejected Requests"
            value="12"
            footer="— Steady trend"
            footerClass="text-slate-400"
          />

          <StatCard
            icon={
              <CircleDollarSign className="h-3.5 w-3.5 text-orange-600" />
            }
            iconClass="bg-orange-50"
            title="Total Procurement Value"
            value="$842.5K"
            footer="↑ $45K vs. Prev. Month"
          />
        </section>

        {/* Main content */}
        <section className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_185px]">
          {/* Requests */}
          <div className="min-w-0">
            <div className="mb-3 flex flex-col gap-2 rounded-lg border border-orange-200 bg-white p-2.5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                <FilterButton>Status: All</FilterButton>

                <FilterButton>Department: Finance</FilterButton>

                <button
                  type="button"
                  className="flex h-8 cursor-pointer items-center gap-2 rounded-md border border-orange-200 bg-white px-3 text-[9px] font-medium text-slate-600 transition hover:bg-orange-50"
                >
                  <CalendarDays className="h-3 w-3" />
                  Date Range
                </button>
              </div>

              <p className="text-[9px] text-slate-500">
                Showing <span className="font-semibold">1-10</span> of{" "}
                <span className="font-semibold">156</span> requests
              </p>
            </div>

            <div className="overflow-hidden rounded-lg border border-orange-200 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] border-collapse">
                  <thead>
                    <tr className="border-b border-orange-200 bg-slate-50">
                      <th className="px-3 py-3 text-left text-[8px] font-bold uppercase tracking-wide text-slate-600">
                        Request ID
                      </th>

                      <th className="px-3 py-3 text-left text-[8px] font-bold uppercase tracking-wide text-slate-600">
                        Item Name
                      </th>

                      <th className="px-3 py-3 text-left text-[8px] font-bold uppercase tracking-wide text-slate-600">
                        Supplier
                      </th>

                      <th className="px-3 py-3 text-left text-[8px] font-bold uppercase tracking-wide text-slate-600">
                        Requestor
                      </th>

                      <th className="px-3 py-3 text-right text-[8px] font-bold uppercase tracking-wide text-slate-600">
                        Total
                        <br />
                        Amount
                      </th>

                      <th className="px-3 py-3 text-left text-[8px] font-bold uppercase tracking-wide text-slate-600">
                        Status
                      </th>

                      <th className="px-3 py-3 text-center text-[8px] font-bold uppercase tracking-wide text-slate-600">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {requests.map((request) => (
                      <tr
                        key={request.id}
                        className="border-b border-orange-100 last:border-b-0 hover:bg-slate-50"
                      >
                        <td className="px-3 py-3 align-middle">
                          <span className="text-[9px] font-bold text-orange-600">
                            {request.id}
                          </span>
                        </td>

                        <td className="px-3 py-3">
                          <div>
                            <p className="text-[9px] font-semibold text-slate-700">
                              {request.item}
                            </p>
                            <p className="mt-0.5 text-[7px] text-slate-400">
                              {request.details}
                            </p>
                          </div>
                        </td>

                        <td className="px-3 py-3 text-[9px] text-slate-600">
                          {request.supplier}
                        </td>

                        <td className="px-3 py-3 text-[9px] text-slate-600">
                          {request.requestor}
                        </td>

                        <td className="px-3 py-3 text-right text-[9px] font-semibold text-slate-700">
                          {request.amount}
                        </td>

                        <td className="px-3 py-3">
                          <StatusBadge status={request.status} />
                        </td>

                        <td className="px-3 py-3">
                          <ActionButtons status={request.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex flex-col gap-2 border-t border-orange-100 px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[8px] text-slate-500">
                  Showing 4 of 156 results
                </p>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    className="flex h-6 cursor-pointer items-center justify-center rounded border border-slate-200 px-2 text-[8px] text-slate-400"
                  >
                    Previous
                  </button>

                  <button
                    type="button"
                    className="flex h-6 w-6 cursor-pointer items-center justify-center rounded bg-orange-600 text-[8px] font-semibold text-white"
                  >
                    1
                  </button>

                  <button
                    type="button"
                    className="flex h-6 w-6 cursor-pointer items-center justify-center rounded border border-slate-200 text-[8px] text-slate-600 hover:bg-slate-50"
                  >
                    2
                  </button>

                  <button
                    type="button"
                    className="flex h-6 w-6 cursor-pointer items-center justify-center rounded border border-slate-200 text-[8px] text-slate-600 hover:bg-slate-50"
                  >
                    3
                  </button>

                  <button
                    type="button"
                    className="flex h-6 cursor-pointer items-center justify-center rounded border border-slate-200 px-2 text-[8px] text-slate-600 hover:bg-slate-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right column */}
          <aside className="space-y-3">
            {/* Recent Suppliers */}
            <div className="rounded-lg border border-orange-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-orange-100 px-3 py-2.5">
                <h2 className="text-[9px] font-bold text-slate-700">
                  Recent Suppliers
                </h2>

                <button
                  type="button"
                  className="cursor-pointer text-[8px] font-semibold text-orange-600 hover:text-orange-700"
                >
                  View All
                </button>
              </div>

              <div className="space-y-2.5 p-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded bg-indigo-100 text-[8px] font-bold text-indigo-600">
                    G
                  </div>

                  <div>
                    <p className="text-[8px] font-semibold text-slate-700">
                      Global Tech Inc.
                    </p>
                    <p className="text-[7px] text-slate-400">
                      Preferred Partner
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded bg-slate-200 text-[8px] font-bold text-slate-600">
                    M
                  </div>

                  <div>
                    <p className="text-[8px] font-semibold text-slate-700">
                      Modern Spaces Ltd.
                    </p>
                    <p className="text-[7px] text-slate-400">
                      14 Active Orders
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded bg-orange-100 text-[8px] font-bold text-orange-600">
                    A
                  </div>

                  <div>
                    <p className="text-[8px] font-semibold text-slate-700">
                      AWS Enterprise
                    </p>
                    <p className="text-[7px] text-slate-400">
                      Digital Services
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Critical Inventory */}
            <div className="rounded-lg border border-orange-200 bg-white shadow-sm">
              <div className="border-b border-orange-100 px-3 py-2.5">
                <h2 className="text-[9px] font-bold text-slate-700">
                  Critical Inventory
                </h2>
              </div>

              <div className="space-y-3 p-3">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-medium text-slate-700">
                      Dell Latitude 5420
                    </span>
                    <span className="text-[7px] font-bold text-red-500">
                      Low Stock: 4
                    </span>
                  </div>

                  <div className="mt-1 h-1 rounded-full bg-slate-100">
                    <div className="h-full w-[18%] rounded-full bg-red-500" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-medium text-slate-700">
                      Standard Peripherals
                    </span>
                    <span className="text-[7px] font-bold text-orange-500">
                      Stock: 24
                    </span>
                  </div>

                  <div className="mt-1 h-1 rounded-full bg-slate-100">
                    <div className="h-full w-[48%] rounded-full bg-orange-400" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-medium text-slate-700">
                      Herman Miller Aeron
                    </span>
                    <span className="text-[7px] font-bold text-emerald-500">
                      Stock: 82
                    </span>
                  </div>

                  <div className="mt-1 h-1 rounded-full bg-slate-100">
                    <div className="h-full w-[82%] rounded-full bg-emerald-400" />
                  </div>
                </div>

                <button
                  type="button"
                  className="flex w-full cursor-pointer items-center justify-center gap-1 rounded border border-dashed border-orange-200 py-1.5 text-[7px] font-semibold text-slate-500 transition hover:bg-orange-50"
                >
                  <Plus className="h-2.5 w-2.5" />
                  Add Tracking Item
                </button>
              </div>
            </div>

            {/* AI Procurement Optimizer */}
            <div className="rounded-lg border border-indigo-100 bg-indigo-50/50 p-3">
              <div className="flex items-center gap-1.5">
                <Sparkles className="h-3 w-3 text-indigo-600" />

                <h2 className="text-[9px] font-bold text-indigo-700">
                  AI Procurement Optimizer
                </h2>
              </div>

              <p className="mt-2 text-[7px] leading-relaxed text-indigo-600">
                Consolidate 3 upcoming laptop requests from IT and Finance to
                unlock a 12% bulk discount with Global Tech Inc.
              </p>

              <button
                type="button"
                className="mt-2 w-full cursor-pointer rounded border border-indigo-200 bg-white py-1.5 text-[7px] font-semibold text-indigo-600 transition hover:bg-indigo-50"
              >
                Review Suggestion
              </button>
            </div>
          </aside>
        </section>

      </main>
    </div>
    </DashboardLayout>
  );
}