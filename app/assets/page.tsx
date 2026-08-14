"use client";

import {
  ArrowLeft,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  FileDown,
  Filter,
  Package,
  Pencil,
  Plus,
  Trash2,
  Upload,
  Wrench,
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
type AssetStatus = "Active" | "Maintenance" | "Retired";

type Asset = {
  id: string;
  name: string;
  category: string;
  department: string;
  purchaseDate: string;
  value: string;
  status: AssetStatus;
  icon: React.ReactNode;
};

const assets: Asset[] = [
  {
    id: "ASSET-2023-001",
    name: 'MacBook Pro M2 - 16"',
    category: "IT Equipment",
    department: "Engineering",
    purchaseDate: "Oct 12, 2023",
    value: "$2,499.00",
    status: "Active",
    icon: <Package className="h-4 w-4" />,
  },
  {
    id: "ASSET-2023-045",
    name: "Tesla Semi Truck #12",
    category: "Fleet Vehicles",
    department: "Logistics",
    purchaseDate: "Jun 05, 2023",
    value: "$180,000.00",
    status: "Maintenance",
    icon: <Wrench className="h-4 w-4" />,
  },
  {
    id: "ASSET-2022-892",
    name: "EM-HQ Office Complex",
    category: "Real Estate",
    department: "Operations",
    purchaseDate: "Jan 15, 2022",
    value: "$12.4M",
    status: "Active",
    icon: <Package className="h-4 w-4" />,
  },
  {
    id: "ASSET-2023-112",
    name: "Industrial Lathe G-400",
    category: "Machinery",
    department: "Production",
    purchaseDate: "Nov 20, 2023",
    value: "$45,000.00",
    status: "Active",
    icon: <Wrench className="h-4 w-4" />,
  },
  {
    id: "ASSET-2021-009",
    name: "NVIDIA DGX Station",
    category: "IT Equipment",
    department: "R&D",
    purchaseDate: "Feb 28, 2021",
    value: "$29,500.00",
    status: "Retired",
    icon: <Package className="h-4 w-4" />,
  },
];

const statusStyles: Record<AssetStatus, string> = {
  Active: "bg-emerald-50 text-emerald-700 border border-emerald-100",
  Maintenance: "bg-orange-50 text-orange-700 border border-orange-100",
  Retired: "bg-slate-100 text-slate-600 border border-slate-200",
};

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
  progress: string;
}) {
  return (
    <div className="rounded-lg border border-orange-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-start justify-between">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-md ${iconClass}`}
        >
          {icon}
        </div>

        <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-medium text-emerald-600">
          {badge}
        </span>
      </div>

      <p className="text-xs font-medium text-slate-500">{title}</p>

      <p className="mt-1 text-2xl font-semibold tracking-tight text-slate-800">
        {value}
      </p>

      <div className="mt-3 h-1 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-slate-700"
          style={{ width: progress }}
        />
      </div>
    </div>
  );
}

function FilterButton({
  children,
  icon,
  className = "",
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={`flex h-9 items-center gap-2 rounded-md border border-orange-200 bg-white px-3 text-xs font-medium text-slate-600 transition hover:bg-orange-50 ${className}`}
    >
      {icon}
      <span>{children}</span>
      <ChevronDown className="ml-auto h-3.5 w-3.5 text-slate-400" />
    </button>
  );
}

function StatusBadge({ status }: { status: AssetStatus }) {
  return (
    <span
      className={`inline-flex rounded-full px-2 py-1 text-[10px] font-semibold ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}

export default function AssetsPage() {
  return (
     <DashboardLayout   sidebarVariant="asset"
  searchPlaceholder="Search assets, IDs, or categories..."
  userName="Alex Thompson"
  userRole="SENIOR ADMIN"
  showSettings={false}>
    <div className="min-h-screen bg-[#f7f9fb] text-slate-800">
      <main className="mx-auto w-full max-w-[1200px] px-5 py-6 lg:px-8">
        {/* Back button */}
        <button
          type="button"
          className="mb-4 inline-flex h-9 items-center gap-2 rounded-md border border-orange-200 bg-white px-3 text-xs font-medium text-slate-600 shadow-sm transition hover:bg-orange-50"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Dashboard
        </button>

        {/* Breadcrumb */}
        <div className="mb-5 flex items-center gap-2 text-[10px] text-slate-400">
          <span>Organization</span>
          <span>›</span>
          <span>Global Operations</span>
          <span>›</span>
          <span className="font-semibold text-slate-700">Assets</span>
        </div>

        {/* Overview cards */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={<Package className="h-4 w-4 text-blue-600" />}
            iconClass="bg-blue-50"
            title="Total Assets"
            value="1,248"
            badge="+2.4%"
            progress="100%"
          />

          <StatCard
            icon={
              <span className="text-sm font-bold text-emerald-600">✓</span>
            }
            iconClass="bg-emerald-50"
            title="Active Assets"
            value="1,102"
            badge="In Use"
            progress="88%"
          />

          <StatCard
            icon={<Wrench className="h-4 w-4 text-orange-600" />}
            iconClass="bg-orange-50"
            title="Under Maintenance"
            value="45"
            badge="Pending"
            progress="8%"
          />

          <StatCard
            icon={<span className="text-sm font-bold text-blue-600">$</span>}
            iconClass="bg-blue-50"
            title="Total Asset Value"
            value="$482.4M"
            badge="Appreciating"
            progress="94%"
          />
        </section>

        {/* Filters and actions */}
        <section className="mt-4 rounded-lg border border-orange-200 bg-white p-3 shadow-sm">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <FilterButton
                icon={<Filter className="h-3.5 w-3.5 text-slate-400" />}
              >
                All Categories
              </FilterButton>

              <FilterButton>Status: All</FilterButton>

              <button
                type="button"
                className="flex h-9 items-center gap-2 rounded-md border border-orange-200 bg-white px-3 text-xs font-medium text-slate-600 transition hover:bg-orange-50"
              >
                <CalendarDays className="h-3.5 w-3.5 text-slate-400" />
                Date Range
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                className="flex h-9 items-center gap-2 rounded-md border border-orange-200 bg-white px-3 text-xs font-medium text-slate-600 transition hover:bg-orange-50"
              >
                <Upload className="h-3.5 w-3.5" />
                Import
              </button>

              <button
                type="button"
                className="flex h-9 items-center gap-2 rounded-md border border-orange-200 bg-white px-3 text-xs font-medium text-slate-600 transition hover:bg-orange-50"
              >
                <Download className="h-3.5 w-3.5" />
                Export
              </button>

              <button
                type="button"
                className="flex h-9 items-center gap-2 rounded-md bg-orange-500 px-4 text-xs font-semibold text-white shadow-sm transition hover:bg-orange-600"
              >
                <Plus className="h-4 w-4" />
                Add Asset
              </button>
            </div>
          </div>
        </section>

        {/* Asset table */}
        <section className="mt-4 overflow-hidden rounded-lg border border-orange-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px] border-collapse">
              <thead>
                <tr className="border-b border-orange-200 bg-slate-50">
                  <th className="px-3 py-4 text-left text-[10px] font-bold uppercase tracking-wide text-slate-600">
                    Asset ID
                  </th>
                  <th className="px-3 py-4 text-left text-[10px] font-bold uppercase tracking-wide text-slate-600">
                    Asset Name
                  </th>
                  <th className="px-3 py-4 text-left text-[10px] font-bold uppercase tracking-wide text-slate-600">
                    Category
                  </th>
                  <th className="px-3 py-4 text-left text-[10px] font-bold uppercase tracking-wide text-slate-600">
                    Department
                  </th>
                  <th className="px-3 py-4 text-left text-[10px] font-bold uppercase tracking-wide text-slate-600">
                    Purchase
                    <br />
                    Date
                  </th>
                  <th className="px-3 py-4 text-left text-[10px] font-bold uppercase tracking-wide text-slate-600">
                    Current
                    <br />
                    Value
                  </th>
                  <th className="px-3 py-4 text-left text-[10px] font-bold uppercase tracking-wide text-slate-600">
                    Status
                  </th>
                  <th className="px-3 py-4 text-center text-[10px] font-bold uppercase tracking-wide text-slate-600">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {assets.map((asset) => (
                  <tr
                    key={asset.id}
                    className="border-b border-orange-100 last:border-b-0 hover:bg-slate-50"
                  >
                    <td className="px-3 py-4 align-middle">
                      <span className="text-[11px] font-semibold text-orange-700">
                        {asset.id}
                      </span>
                    </td>

                    <td className="px-3 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-slate-100 text-slate-500">
                          {asset.icon}
                        </div>

                        <span className="max-w-[150px] text-xs font-medium text-slate-700">
                          {asset.name}
                        </span>
                      </div>
                    </td>

                    <td className="px-3 py-4 text-xs text-slate-600">
                      {asset.category}
                    </td>

                    <td className="px-3 py-4 text-xs text-slate-600">
                      {asset.department}
                    </td>

                    <td className="px-3 py-4 whitespace-nowrap text-xs text-slate-600">
                      {asset.purchaseDate}
                    </td>

                    <td className="px-3 py-4 whitespace-nowrap text-xs font-semibold text-slate-700">
                      {asset.value}
                    </td>

                    <td className="px-3 py-4">
                      <StatusBadge status={asset.status} />
                    </td>

                    <td className="px-3 py-4">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          type="button"
                          title="View details"
                          className="text-slate-500 transition hover:text-slate-800"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </button>

                        <button
                          type="button"
                          title="Edit asset"
                          className="text-slate-500 transition hover:text-blue-600"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>

                        <button
                          type="button"
                          title="Delete asset"
                          className="text-slate-500 transition hover:text-red-600"
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

          {/* Table footer / pagination */}
          <div className="flex flex-col gap-3 border-t border-orange-100 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[10px] text-slate-500">
              Showing <span className="font-semibold">1-10</span> of{" "}
              <span className="font-semibold">1,248</span> assets
            </p>

            <div className="flex items-center gap-1">
              <button
                type="button"
                title="Previous page"
                className="flex h-7 w-7 items-center justify-center rounded text-slate-400 hover:bg-slate-100"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>

              <button
                type="button"
                className="flex h-7 w-7 items-center justify-center rounded bg-orange-500 text-[10px] font-semibold text-white"
              >
                1
              </button>

              <button
                type="button"
                className="flex h-7 w-7 items-center justify-center rounded text-[10px] text-slate-600 hover:bg-slate-100"
              >
                2
              </button>

              <button
                type="button"
                className="flex h-7 w-7 items-center justify-center rounded text-[10px] text-slate-600 hover:bg-slate-100"
              >
                3
              </button>

              <span className="px-1 text-[10px] text-slate-400">...</span>

              <button
                type="button"
                className="flex h-7 w-7 items-center justify-center rounded text-[10px] text-slate-600 hover:bg-slate-100"
              >
                125
              </button>

              <button
                type="button"
                title="Next page"
                className="flex h-7 w-7 items-center justify-center rounded text-slate-400 hover:bg-slate-100"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
    </DashboardLayout>
  );
}