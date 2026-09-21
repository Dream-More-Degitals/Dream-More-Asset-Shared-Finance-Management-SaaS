"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Check,
  ChevronDown,
  Clock,
  FileText,
  Save,
  Users,
  X,
  AlertCircle,
  Building2,
  Mail,
  MapPin,
  Briefcase,
  Tag,
} from "lucide-react";

type MeetingType = "Board" | "Committee" | "Audit" | "Shareholder" | "Executive";
type MeetingStatus = "Scheduled" | "Ongoing" | "Completed" | "Cancelled";

export default function CreateMeetingPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState<{ type: 'success' | 'error' | 'info', message: string } | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    type: "Board" as MeetingType,
    date: "",
    time: "",
    duration: "1",
    location: "",
    attendees: "",
    department: "",
    agenda: "",
    notes: "",
    status: "Scheduled" as MeetingStatus,
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
    
    if (!formData.title || !formData.date || !formData.time) {
      showToastMessage('error', 'Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      showToastMessage('success', 'Meeting created successfully!');
      setTimeout(() => router.push('/governance'), 1500);
    }, 1500);
  };

  const handleCancel = () => {
    router.push('/governance');
  };

  const meetingTypes: MeetingType[] = ["Board", "Committee", "Audit", "Shareholder", "Executive"];
  const statuses: MeetingStatus[] = ["Scheduled", "Ongoing", "Completed", "Cancelled"];
  const departments = ["Executive", "Audit", "Finance", "Legal", "Compliance", "Operations"];

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
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Create New Meeting</h1>
              <p className="text-sm text-slate-500">Schedule a governance or board meeting</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
              <Calendar className="w-3 h-3" />
              New Meeting
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Meeting Details */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="p-2 rounded-lg bg-orange-50">
                <Calendar className="h-4 w-4 text-orange-500" />
              </div>
              <h2 className="text-sm font-semibold text-slate-700">Meeting Details</h2>
              <span className="ml-auto text-xs text-slate-400">All fields marked * are required</span>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Meeting Title <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter meeting title"
                    className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-2.5 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20 bg-slate-50/50 transition"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Meeting Type <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full appearance-none rounded-xl border border-gray-200 pl-10 pr-10 py-2.5 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20 bg-slate-50/50 transition"
                  >
                    {meetingTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Status
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
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

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-2.5 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20 bg-slate-50/50 transition"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Time <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-2.5 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20 bg-slate-50/50 transition"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Duration (hours)
                </label>
                <select
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20 bg-slate-50/50 transition"
                >
                  {[1, 2, 3, 4, 5].map((h) => (
                    <option key={h} value={h}>{h} hour{h > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Department
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full appearance-none rounded-xl border border-gray-200 pl-10 pr-10 py-2.5 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20 bg-slate-50/50 transition"
                  >
                    <option value="">Select department</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>

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
                    placeholder="Meeting location"
                    className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-2.5 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20 bg-slate-50/50 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Attendees
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    name="attendees"
                    value={formData.attendees}
                    onChange={handleChange}
                    placeholder="Enter attendee emails"
                    className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-2.5 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20 bg-slate-50/50 transition"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Agenda & Notes */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="p-2 rounded-lg bg-blue-50">
                <FileText className="h-4 w-4 text-blue-500" />
              </div>
              <h2 className="text-sm font-semibold text-slate-700">Agenda & Notes</h2>
            </div>

            <div className="grid grid-cols-1 gap-5">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Agenda
                </label>
                <textarea
                  name="agenda"
                  value={formData.agenda}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Enter meeting agenda items..."
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20 bg-slate-50/50 transition resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Notes / Comments
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={2}
                  placeholder="Additional notes or comments..."
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
                  Creating...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Create Meeting
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}