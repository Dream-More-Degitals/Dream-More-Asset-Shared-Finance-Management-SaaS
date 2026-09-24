// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { ArrowLeft, Loader2 } from "lucide-react";
// import { getProcurementRequest } from "@/services/procurementApi";

// type ProcurementRequest = {
//   id: string;
//   title: string;
//   category: string;
//   department: string;
//   requestedBy: string;
//   amount: number;
//   priority: string;
//   status: string;
//   vendor?: string;
//   deliveryDate?: string;
//   description?: string;
//   justification?: string;
// };

// export default function EditProcurementPage() {
//   const params = useParams();
//   const router = useRouter();

//   const id = params.id as string;

//   const [request, setRequest] = useState<ProcurementRequest | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadRequest = async () => {
//       try {
//         const data = await getProcurementRequest(id);
//         setRequest(data);
//       } catch (error) {
//         console.error("Failed to load procurement request:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadRequest();
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-[#f7f9fb]">
//         <div className="flex items-center gap-2 text-slate-500">
//           <Loader2 className="h-5 w-5 animate-spin" />
//           Loading request...
//         </div>
//       </div>
//     );
//   }

//   if (!request) {
//     return (
//       <div className="min-h-screen bg-[#f7f9fb] p-6">
//         <button
//           onClick={() => router.back()}
//           className="flex items-center gap-2 text-sm text-slate-600 hover:text-orange-500"
//         >
//           <ArrowLeft className="h-4 w-4" />
//           Back
//         </button>

//         <p className="mt-6 text-red-600">
//           Procurement request not found.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#f7f9fb] p-6">
//       <button
//         onClick={() => router.back()}
//         className="mb-6 flex items-center gap-2 text-sm text-slate-600 hover:text-orange-500"
//       >
//         <ArrowLeft className="h-4 w-4" />
//         Back to Procurement
//       </button>

//       <div className="mx-auto max-w-3xl rounded-lg border border-orange-200 bg-white p-6 shadow-sm">
//         <h1 className="text-2xl font-bold text-slate-800">
//           Edit Procurement Request
//         </h1>

//         <p className="mt-2 text-sm text-slate-500">
//           Request ID: {request.id}
//         </p>

//         <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
//           <div>
//             <label className="text-sm font-medium text-slate-600">
//               Title
//             </label>

//             <input
//               type="text"
//               defaultValue={request.title}
//               className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-orange-500"
//             />
//           </div>

//           <div>
//             <label className="text-sm font-medium text-slate-600">
//               Category
//             </label>

//             <input
//               type="text"
//               defaultValue={request.category}
//               className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-orange-500"
//             />
//           </div>

//           <div>
//             <label className="text-sm font-medium text-slate-600">
//               Department
//             </label>

//             <input
//               type="text"
//               defaultValue={request.department}
//               className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-orange-500"
//             />
//           </div>

//           <div>
//             <label className="text-sm font-medium text-slate-600">
//               Requested By
//             </label>

//             <input
//               type="text"
//               defaultValue={request.requestedBy}
//               className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-orange-500"
//             />
//           </div>

//           <div>
//             <label className="text-sm font-medium text-slate-600">
//               Amount
//             </label>

//             <input
//               type="number"
//               defaultValue={request.amount}
//               className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-orange-500"
//             />
//           </div>

//           <div>
//             <label className="text-sm font-medium text-slate-600">
//               Priority
//             </label>

//             <input
//               type="text"
//               defaultValue={request.priority}
//               className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-orange-500"
//             />
//           </div>
//         </div>

//         <div className="mt-6 flex gap-3">
//           <button
//             type="button"
//             onClick={() => router.back()}
//             className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
//           >
//             Cancel
//           </button>

//           <button
//             type="button"
//             className="rounded-md bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
//           >
//             Save Changes
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";

import {
  getProcurementRequest,
  updateProcurementRequest,
} from "@/services/procurementApi";

type ProcurementRequest = {
  id: string;
  title: string;
  category: string;
  department: string;
  requestedBy: string;
  amount: number;
  priority: string;
  status: string;
  vendor?: string;
  deliveryDate?: string;
  description?: string;
  justification?: string;
};

export default function EditProcurementPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [request, setRequest] =
    useState<ProcurementRequest | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ==========================================
  // FORM STATE
  // ==========================================

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [department, setDepartment] = useState("");
  const [requestedBy, setRequestedBy] = useState("");
  const [amount, setAmount] = useState("");
  const [priority, setPriority] = useState("");

  // ==========================================
  // LOAD PROCUREMENT REQUEST
  // ==========================================

  useEffect(() => {
    const loadRequest = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getProcurementRequest(id);

        setRequest(data);

        // Fill form fields
        setTitle(data.title || "");
        setCategory(data.category || "");
        setDepartment(data.department || "");
        setRequestedBy(data.requestedBy || "");
        setAmount(String(data.amount ?? ""));
        setPriority(data.priority || "");
      } catch (error) {
        console.error(
          "Failed to load procurement request:",
          error
        );

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load procurement request"
        );
      } finally {
        setLoading(false);
      }
    };

    loadRequest();
  }, [id]);

  // ==========================================
  // SAVE CHANGES
  // ==========================================

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);

      // Basic validation
      if (!title.trim()) {
        setError("Title is required.");
        return;
      }

      if (!category.trim()) {
        setError("Category is required.");
        return;
      }

      if (!department.trim()) {
        setError("Department is required.");
        return;
      }

      if (!requestedBy.trim()) {
        setError("Requested By is required.");
        return;
      }

      if (!amount || Number(amount) < 0) {
        setError("Please enter a valid amount.");
        return;
      }

      if (!priority.trim()) {
        setError("Priority is required.");
        return;
      }

      const updatedRequest =
        await updateProcurementRequest(id, {
          title: title.trim(),
          category: category.trim(),
          department: department.trim(),
          requestedBy: requestedBy.trim(),
          amount: Number(amount),
          priority: priority.trim().toUpperCase(),
        });

      // Update local request
      setRequest(updatedRequest);

      // Return to procurement details page
      router.push(`/procurement/${id}`);
    } catch (error) {
      console.error("Update procurement request error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to update procurement request"
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f9fb]">
        <div className="flex items-center gap-2 text-slate-500">
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading request...
        </div>
      </div>
    );
  }

  // ==========================================
  // REQUEST NOT FOUND
  // ==========================================

  if (!request) {
    return (
      <div className="min-h-screen bg-[#f7f9fb] p-6">

        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-slate-600 transition hover:text-orange-500"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Procurement
        </button>

        <div className="mx-auto mt-6 max-w-3xl rounded-lg border border-red-200 bg-red-50 p-6">
          <p className="text-sm text-red-600">
            {error || "Procurement request not found."}
          </p>
        </div>

      </div>
    );
  }

  // ==========================================
  // MAIN PAGE
  // ==========================================

  return (
    <div className="min-h-screen bg-[#f7f9fb] p-6">

      {/* BACK BUTTON */}

      <button
        onClick={() => router.back()}
        className="mb-6 flex items-center gap-2 text-sm text-slate-600 transition hover:text-orange-500"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Procurement
      </button>

      {/* MAIN CARD */}

      <div className="mx-auto max-w-3xl rounded-lg border border-orange-200 bg-white p-6 shadow-sm">

        {/* HEADER */}

        <div className="mb-6">

          <h1 className="text-2xl font-bold text-slate-800">
            Edit Procurement Request
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Request ID:{" "}
            <span className="font-medium text-orange-600">
              {request.id}
            </span>
          </p>

        </div>

        {/* ERROR */}

        {error && (
          <div className="mb-5 rounded-md border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-sm text-red-600">
              {error}
            </p>
          </div>
        )}

        {/* FORM */}

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

          {/* TITLE */}

          <div>
            <label className="text-sm font-medium text-slate-600">
              Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            />
          </div>

          {/* CATEGORY */}

          <div>
            <label className="text-sm font-medium text-slate-600">
              Category
            </label>

            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            />
          </div>

          {/* DEPARTMENT */}

          <div>
            <label className="text-sm font-medium text-slate-600">
              Department
            </label>

            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            />
          </div>

          {/* REQUESTED BY */}

          <div>
            <label className="text-sm font-medium text-slate-600">
              Requested By
            </label>

            <input
              type="text"
              value={requestedBy}
              onChange={(e) => setRequestedBy(e.target.value)}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            />
          </div>

          {/* AMOUNT */}

          <div>
            <label className="text-sm font-medium text-slate-600">
              Amount
            </label>

            <input
              type="number"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            />
          </div>

          {/* PRIORITY */}

          <div>
            <label className="text-sm font-medium text-slate-600">
              Priority
            </label>

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </div>

        </div>

        {/* BUTTONS */}

        <div className="mt-7 flex gap-3">

          {/* CANCEL */}

          <button
            type="button"
            onClick={() => router.back()}
            disabled={saving}
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          {/* SAVE */}

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 rounded-md bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving && (
              <Loader2 className="h-4 w-4 animate-spin" />
            )}

            {saving ? "Saving..." : "Save Changes"}
          </button>

        </div>

      </div>
    </div>
  );
}