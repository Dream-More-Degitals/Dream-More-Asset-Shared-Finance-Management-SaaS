"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Check,
  ChevronDown,
  DollarSign,
  FileText,
  Package,
  Save,
  Tag,
  User,
  X,
  AlertCircle,
  Building2,
  Clock,
  ShoppingCart,
  Truck,
  MapPin,
  Hash,
  Briefcase,
} from "lucide-react";

type RequestCategory =
  | "IT Equipment"
  | "Furniture"
  | "Software"
  | "Equipment"
  | "Marketing"
  | "Office Supplies"
  | "Services"
  | "Other";

type RequestDepartment =
  | "Engineering"
  | "Operations"
  | "IT"
  | "Production"
  | "Marketing"
  | "Finance"
  | "HR"
  | "Sales";

type RequestPriority = "Low" | "Medium" | "High";

export default function CreateProcurementPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState<{ type: 'success' | 'error' | 'info', message: string } | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "IT Equipment" as RequestCategory,
    department: "Engineering" as RequestDepartment,
    priority: "Medium" as RequestPriority,
    amount: "",
    description: "",
    vendor: "",
    deliveryDate: "",
    justification: "",
    requestedBy: "",
  });

  const showToastMessage = (type: 'success' | 'error' | 'info', message: string) => {
    setShowToast({ type, message });
    setTimeout(() => setShowToast(null), 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.amount || !formData.vendor) {
      showToastMessage('error', 'Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      showToastMessage('success', 'Purchase request created successfully!');
      setTimeout(() => router.push('/procurement'), 1500);
    }, 1500);
  };

  const handleCancel = () => {
    router.push('/procurement');
  };

  const categories: RequestCategory[] = [
    "IT Equipment",
    "Furniture",
    "Software",
    "Equipment",
    "Marketing",
    "Office Supplies",
    "Services",
    "Other",
  ];

  const departments: RequestDepartment[] = [
    "Engineering",
    "Operations",
    "IT",
    "Production",
    "Marketing",
    "Finance",
    "HR",
    "Sales",
  ];

  const priorities: RequestPriority[] = ["Low", "Medium", "High"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
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

      <div className="mx-auto w-full max-w-4xl px-4 py-8 lg:px-6">
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={handleCancel}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-slate-600 shadow-sm transition hover:bg-gray-50 hover:shadow"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Create Purchase Request</h1>
              <p className="text-sm text-slate-500">Submit a new procurement request for approval</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-yellow-200 bg-yellow-50 px-3 py-1 text-xs font-medium text-yellow-700">
              <Clock className="w-3 h-3" />
              Draft
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="p-2 rounded-lg bg-orange-50">
                <ShoppingCart className="h-4 w-4 text-orange-500" />
              </div>
              <h2 className="text-sm font-semibold text-slate-700">Request Details</h2>
              <span className="ml-auto text-xs text-slate-400">All fields marked * are required</span>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Request Title <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter request title (e.g., Office Laptops - 15 units)"
                    className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-2.5 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20 bg-slate-50/50 transition"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Category <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Package className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full appearance-none rounded-xl border border-gray-200 pl-10 pr-10 py-2.5 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20 bg-slate-50/50 transition"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Department <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full appearance-none rounded-xl border border-gray-200 pl-10 pr-10 py-2.5 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20 bg-slate-50/50 transition"
                  >
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Priority <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full appearance-none rounded-xl border border-gray-200 pl-10 pr-10 py-2.5 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20 bg-slate-50/50 transition"
                  >
                    {priorities.map((priority) => (
                      <option key={priority} value={priority}>{priority}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Estimated Amount ($) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="0.00"
                    className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-2.5 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20 bg-slate-50/50 transition"
                    required
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Vendor <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Truck className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    name="vendor"
                    value={formData.vendor}
                    onChange={handleChange}
                    placeholder="Enter vendor name"
                    className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-2.5 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20 bg-slate-50/50 transition"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="p-2 rounded-lg bg-blue-50">
                <FileText className="h-4 w-4 text-blue-500" />
              </div>
              <h2 className="text-sm font-semibold text-slate-700">Additional Information</h2>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Requested By <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    name="requestedBy"
                    value={formData.requestedBy}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-2.5 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20 bg-slate-50/50 transition"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Expected Delivery Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="date"
                    name="deliveryDate"
                    value={formData.deliveryDate}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-2.5 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20 bg-slate-50/50 transition"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Description / Specifications
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Provide detailed description of the request..."
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20 bg-slate-50/50 transition resize-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Business Justification
                </label>
                <textarea
                  name="justification"
                  value={formData.justification}
                  onChange={handleChange}
                  rows={2}
                  placeholder="Explain why this request is needed..."
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20 bg-slate-50/50 transition resize-none"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-end pt-2">
            <button
              type="button"
              onClick={handleCancel}
              className="flex h-11 items-center justify-center rounded-xl border border-gray-200 bg-white px-8 text-sm font-medium text-slate-600 transition hover:bg-gray-50 hover:shadow-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-8 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition hover:shadow-orange-500/40 hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Submit Request
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}