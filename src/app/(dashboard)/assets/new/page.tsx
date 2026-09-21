"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Building2,
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
  MapPin,
  Hash,
  Briefcase,
  Shield,
  Clock,
  CreditCard,
  Info,
} from "lucide-react";

type AssetCategory =
  | "IT Equipment"
  | "Fleet Vehicles"
  | "Real Estate"
  | "Machinery"
  | "Office Furniture"
  | "Software"
  | "Other";

type AssetDepartment =
  | "Engineering"
  | "Logistics"
  | "Operations"
  | "Production"
  | "R&D"
  | "Finance"
  | "HR"
  | "IT"
  | "Marketing";

type AssetStatus = "Active" | "Maintenance" | "Retired";

export default function AddAssetPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState<{ type: 'success' | 'error' | 'info', message: string } | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "IT Equipment" as AssetCategory,
    department: "Engineering" as AssetDepartment,
    purchaseDate: "",
    value: "",
    status: "Active" as AssetStatus,
    description: "",
    serialNumber: "",
    location: "",
    manufacturer: "",
    model: "",
    warrantyExpiry: "",
    assignedTo: "",
  });

  // Show toast notification
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
    
    // Validate required fields
    if (!formData.name || !formData.purchaseDate || !formData.value) {
      showToastMessage('error', 'Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      showToastMessage('success', 'Asset added successfully!');
      // Redirect back to assets page after success
      setTimeout(() => router.push('/assets'), 1500);
    }, 1500);
  };

  const handleCancel = () => {
    router.push('/assets');
  };

  const categories: AssetCategory[] = [
    "IT Equipment",
    "Fleet Vehicles",
    "Real Estate",
    "Machinery",
    "Office Furniture",
    "Software",
    "Other",
  ];

  const departments: AssetDepartment[] = [
    "Engineering",
    "Logistics",
    "Operations",
    "Production",
    "R&D",
    "Finance",
    "HR",
    "IT",
    "Marketing",
  ];

  const statuses: AssetStatus[] = ["Active", "Maintenance", "Retired"];

  // Get status color
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Active': return 'border-emerald-200 bg-emerald-50 text-emerald-700';
      case 'Maintenance': return 'border-orange-200 bg-orange-50 text-orange-700';
      case 'Retired': return 'border-slate-200 bg-slate-50 text-slate-600';
      default: return 'border-gray-200 bg-gray-50 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
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
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Add New Asset</h1>
              <p className="text-sm text-slate-500">Register a new asset in the system</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${getStatusColor(formData.status)}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
              {formData.status}
            </span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="p-2 rounded-lg bg-orange-50">
                <FileText className="h-4 w-4 text-orange-500" />
              </div>
              <h2 className="text-sm font-semibold text-slate-700">Basic Information</h2>
              <span className="ml-auto text-xs text-slate-400">All fields marked * are required</span>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Asset Name */}
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Asset Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter asset name (e.g., MacBook Pro M2)"
                    className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-2.5 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20 bg-slate-50/50 transition"
                    required
                  />
                </div>
              </div>

              {/* Category */}
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

              {/* Department */}
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

              {/* Status */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Status <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full appearance-none rounded-xl border border-gray-200 pl-10 pr-10 py-2.5 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20 bg-slate-50/50 transition"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Purchase Date */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Purchase Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="date"
                    name="purchaseDate"
                    value={formData.purchaseDate}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-2.5 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20 bg-slate-50/50 transition"
                    required
                  />
                </div>
              </div>

              {/* Value */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Value ($) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="number"
                    name="value"
                    value={formData.value}
                    onChange={handleChange}
                    placeholder="0.00"
                    className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-2.5 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20 bg-slate-50/50 transition"
                    required
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="p-2 rounded-lg bg-blue-50">
                <Info className="h-4 w-4 text-blue-500" />
              </div>
              <h2 className="text-sm font-semibold text-slate-700">Additional Details</h2>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Serial Number */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Serial Number
                </label>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    name="serialNumber"
                    value={formData.serialNumber}
                    onChange={handleChange}
                    placeholder="Enter serial number"
                    className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-2.5 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20 bg-slate-50/50 transition"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g., HQ Building, Floor 2"
                    className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-2.5 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20 bg-slate-50/50 transition"
                  />
                </div>
              </div>

              {/* Manufacturer */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Manufacturer
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    name="manufacturer"
                    value={formData.manufacturer}
                    onChange={handleChange}
                    placeholder="Enter manufacturer name"
                    className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-2.5 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20 bg-slate-50/50 transition"
                  />
                </div>
              </div>

              {/* Model */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Model
                </label>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    placeholder="Enter model number"
                    className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-2.5 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20 bg-slate-50/50 transition"
                  />
                </div>
              </div>

              {/* Warranty Expiry */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Warranty Expiry
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="date"
                    name="warrantyExpiry"
                    value={formData.warrantyExpiry}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-2.5 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20 bg-slate-50/50 transition"
                  />
                </div>
              </div>

              {/* Assigned To */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Assigned To
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    name="assignedTo"
                    value={formData.assignedTo}
                    onChange={handleChange}
                    placeholder="Enter employee name"
                    className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-2.5 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20 bg-slate-50/50 transition"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Enter asset description (optional)"
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
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Add Asset
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}