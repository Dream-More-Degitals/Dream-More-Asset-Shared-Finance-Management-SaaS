// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { ArrowLeft } from "lucide-react";
// import { getProcurementRequest } from "@/services/procurementApi";

// export default function ProcurementDetailsPage() {
//   const params = useParams();
//   const router = useRouter();

//   const id = params.id as string;
// const [request, setRequest] = useState<any>(null);
// const [isLoading, setIsLoading] = useState(true);
// const [error, setError] = useState<string | null>(null);
// useEffect(() => {
//   const loadRequest = async () => {
//     try {
//       setIsLoading(true);
//       setError(null);

//       const data = await getProcurementRequest(id);

//       setRequest(data);
//     } catch (error) {
//       console.error("Failed to load procurement request:", error);

//       setError(
//         error instanceof Error
//           ? error.message
//           : "Failed to load procurement request"
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   loadRequest();
// }, [id]);

//   return (
//     <div className="min-h-screen bg-[#f7f9fb] p-6">
//       <button
//         onClick={() => router.back()}
//         className="mb-6 flex items-center gap-2 text-sm text-slate-600 hover:text-orange-500"
//       >
//         <ArrowLeft className="h-4 w-4" />
//         Back to Procurement
//       </button>

//       <div className="rounded-lg border border-orange-200 bg-white p-6 shadow-sm">
//         <h1 className="text-2xl font-bold text-slate-800">
//           Procurement Request Details
//         </h1>

//         <p className="mt-4 text-sm text-slate-500">
//           Request ID
//         </p>

//         <p className="mt-1 font-semibold text-orange-600">
//           {id}
//         </p>
//       </div>
//     </div>
//   );
// }



// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { ArrowLeft } from "lucide-react";
// import { getProcurementRequest } from "@/services/procurementApi";

// export default function ProcurementDetailsPage() {
//   const params = useParams();
//   const router = useRouter();

//   const id = params.id as string;

//   const [request, setRequest] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const loadRequest = async () => {
//       try {
//         setIsLoading(true);
//         setError(null);

//         const data = await getProcurementRequest(id);

//         setRequest(data);
//       } catch (error) {
//         console.error("Failed to load procurement request:", error);

//         setError(
//           error instanceof Error
//             ? error.message
//             : "Failed to load procurement request"
//         );
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     loadRequest();
//   }, [id]);

//   return (
//     <div className="min-h-screen bg-[#f7f9fb] p-6">
//       <button
//         onClick={() => router.back()}
//         className="mb-6 flex items-center gap-2 text-sm text-slate-600 hover:text-orange-500"
//       >
//         <ArrowLeft className="h-4 w-4" />
//         Back to Procurement
//       </button>

//       <div className="rounded-lg border border-orange-200 bg-white p-6 shadow-sm">
//         <h1 className="text-2xl font-bold text-slate-800">
//           Procurement Request Details
//         </h1>

//         {isLoading && (
//           <p className="mt-6 text-sm text-slate-500">
//             Loading procurement request...
//           </p>
//         )}

//         {error && (
//           <p className="mt-6 text-sm text-red-600">
//             {error}
//           </p>
//         )}

//         {!isLoading && !error && request && (
//           <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">

//             <div>
//               <p className="text-sm text-slate-500">Request ID</p>
//               <p className="mt-1 font-semibold text-orange-600">
//                 {request.id}
//               </p>
//             </div>

//             <div>
//               <p className="text-sm text-slate-500">Title</p>
//               <p className="mt-1 font-semibold text-slate-800">
//                 {request.title}
//               </p>
//             </div>

//             <div>
//               <p className="text-sm text-slate-500">Category</p>
//               <p className="mt-1 font-semibold text-slate-800">
//                 {request.category}
//               </p>
//             </div>

//             <div>
//               <p className="text-sm text-slate-500">Department</p>
//               <p className="mt-1 font-semibold text-slate-800">
//                 {request.department}
//               </p>
//             </div>

//             <div>
//               <p className="text-sm text-slate-500">Requested By</p>
//               <p className="mt-1 font-semibold text-slate-800">
//                 {request.requestedBy}
//               </p>
//             </div>

//             <div>
//               <p className="text-sm text-slate-500">Amount</p>
//               <p className="mt-1 font-semibold text-slate-800">
//                 ${Number(request.amount).toLocaleString("en-US", {
//                   minimumFractionDigits: 2,
//                   maximumFractionDigits: 2,
//                 })}
//               </p>
//             </div>

//             <div>
//               <p className="text-sm text-slate-500">Priority</p>
//               <p className="mt-1 font-semibold text-slate-800">
//                 {request.priority}
//               </p>
//             </div>

//             <div>
//               <p className="text-sm text-slate-500">Status</p>
//               <p className="mt-1 font-semibold text-slate-800">
//                 {request.status}
//               </p>
//             </div>

//             <div>
//               <p className="text-sm text-slate-500">Vendor</p>
//               <p className="mt-1 font-semibold text-slate-800">
//                 {request.vendor || "Not provided"}
//               </p>
//             </div>

//             <div>
//               <p className="text-sm text-slate-500">Delivery Date</p>
//               <p className="mt-1 font-semibold text-slate-800">
//                 {request.deliveryDate
//                   ? new Date(request.deliveryDate).toLocaleDateString()
//                   : "Not provided"}
//               </p>
//             </div>

//             <div className="md:col-span-2">
//               <p className="text-sm text-slate-500">Description</p>
//               <p className="mt-1 text-slate-800">
//                 {request.description || "No description provided"}
//               </p>
//             </div>

//             <div className="md:col-span-2">
//               <p className="text-sm text-slate-500">Justification</p>
//               <p className="mt-1 text-slate-800">
//                 {request.justification || "No justification provided"}
//               </p>
//             </div>

//           </div>
//         )}
//       </div>
//     </div>
//   );
// }







// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import {
//   ArrowLeft,
//   Check,
//   CheckCircle,
//   FileText,
//   Loader2,
// } from "lucide-react";

// import {
//   getProcurementRequest,
//   submitProcurementRequest,
//   approveProcurementRequest,
//   completeProcurementRequest,
// } from "@/services/procurementApi";

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

// export default function ProcurementDetailsPage() {
//   const params = useParams();
//   const router = useRouter();

//   const id = params.id as string;

//   const [request, setRequest] = useState<ProcurementRequest | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [actionLoading, setActionLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // ==========================================
//   // LOAD PROCUREMENT REQUEST
//   // ==========================================

//   const loadRequest = async () => {
//     try {
//       setIsLoading(true);
//       setError(null);

//       const data = await getProcurementRequest(id);

//       setRequest(data);
//     } catch (error) {
//       console.error("Failed to load procurement request:", error);

//       setError(
//         error instanceof Error
//           ? error.message
//           : "Failed to load procurement request"
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadRequest();
//   }, [id]);

//   // ==========================================
//   // SUBMIT REQUEST
//   // DRAFT -> PENDING
//   // ==========================================

//   const handleSubmit = async () => {
//     try {
//       setActionLoading(true);
//       setError(null);

//       const updatedRequest = await submitProcurementRequest(id);

//       setRequest(updatedRequest);
//     } catch (error) {
//       console.error("Submit error:", error);

//       setError(
//         error instanceof Error
//           ? error.message
//           : "Failed to submit procurement request"
//       );
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // ==========================================
//   // APPROVE REQUEST
//   // PENDING -> APPROVED
//   // ==========================================

//   const handleApprove = async () => {
//     try {
//       setActionLoading(true);
//       setError(null);

//       const updatedRequest = await approveProcurementRequest(id);

//       setRequest(updatedRequest);
//     } catch (error) {
//       console.error("Approve error:", error);

//       setError(
//         error instanceof Error
//           ? error.message
//           : "Failed to approve procurement request"
//       );
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // ==========================================
//   // COMPLETE REQUEST
//   // APPROVED -> COMPLETED
//   // ==========================================

//   const handleComplete = async () => {
//     try {
//       setActionLoading(true);
//       setError(null);

//       const updatedRequest = await completeProcurementRequest(id);

//       setRequest(updatedRequest);
//     } catch (error) {
//       console.error("Complete error:", error);

//       setError(
//         error instanceof Error
//           ? error.message
//           : "Failed to complete procurement request"
//       );
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // ==========================================
//   // LOADING
//   // ==========================================

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-[#f7f9fb] p-6">
//         <button
//           onClick={() => router.back()}
//           className="mb-6 flex items-center gap-2 text-sm text-slate-600 hover:text-orange-500"
//         >
//           <ArrowLeft className="h-4 w-4" />
//           Back to Procurement
//         </button>

//         <div className="rounded-lg border border-orange-200 bg-white p-6 shadow-sm">
//           <div className="flex items-center justify-center py-10">
//             <Loader2 className="h-6 w-6 animate-spin text-orange-500" />

//             <span className="ml-2 text-sm text-slate-500">
//               Loading procurement request...
//             </span>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // ==========================================
//   // ERROR / REQUEST NOT FOUND
//   // ==========================================

//   if (error && !request) {
//     return (
//       <div className="min-h-screen bg-[#f7f9fb] p-6">
//         <button
//           onClick={() => router.back()}
//           className="mb-6 flex items-center gap-2 text-sm text-slate-600 hover:text-orange-500"
//         >
//           <ArrowLeft className="h-4 w-4" />
//           Back to Procurement
//         </button>

//         <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-sm text-red-700">
//           {error}
//         </div>
//       </div>
//     );
//   }

//   if (!request) {
//     return null;
//   }

//   // ==========================================
//   // MAIN PAGE
//   // ==========================================

//   return (
//     <div className="min-h-screen bg-[#f7f9fb] p-6">

//       {/* BACK BUTTON */}

//       <button
//         onClick={() => router.back()}
//         className="mb-6 flex items-center gap-2 text-sm text-slate-600 hover:text-orange-500"
//       >
//         <ArrowLeft className="h-4 w-4" />
//         Back to Procurement
//       </button>

//       {/* MAIN CARD */}

//       <div className="rounded-lg border border-orange-200 bg-white p-6 shadow-sm">

//         {/* HEADER */}

//         <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

//           <div>
//             <h1 className="text-2xl font-bold text-slate-800">
//               Procurement Request Details
//             </h1>

//             <p className="mt-4 text-sm text-slate-500">
//               Request ID
//             </p>

//             <p className="mt-1 font-semibold text-orange-600">
//               {request.id}
//             </p>
//           </div>

//           {/* CURRENT STATUS */}

//           <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
//             {request.status}
//           </div>
//         </div>

//         {/* ERROR MESSAGE AFTER ACTION */}

//         {error && (
//           <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
//             {error}
//           </div>
//         )}

//         {/* DETAILS */}

//         <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

//           {/* REQUEST ID */}

//           <div>
//             <p className="text-sm text-slate-500">
//               Request ID
//             </p>

//             <p className="mt-1 font-semibold text-orange-600">
//               {request.id}
//             </p>
//           </div>

//           {/* TITLE */}

//           <div>
//             <p className="text-sm text-slate-500">
//               Title
//             </p>

//             <p className="mt-1 font-semibold text-slate-800">
//               {request.title}
//             </p>
//           </div>

//           {/* CATEGORY */}

//           <div>
//             <p className="text-sm text-slate-500">
//               Category
//             </p>

//             <p className="mt-1 font-semibold text-slate-800">
//               {request.category}
//             </p>
//           </div>

//           {/* DEPARTMENT */}

//           <div>
//             <p className="text-sm text-slate-500">
//               Department
//             </p>

//             <p className="mt-1 font-semibold text-slate-800">
//               {request.department}
//             </p>
//           </div>

//           {/* REQUESTED BY */}

//           <div>
//             <p className="text-sm text-slate-500">
//               Requested By
//             </p>

//             <p className="mt-1 font-semibold text-slate-800">
//               {request.requestedBy}
//             </p>
//           </div>

//           {/* AMOUNT */}

//           <div>
//             <p className="text-sm text-slate-500">
//               Amount
//             </p>

//             <p className="mt-1 font-semibold text-slate-800">
//               $
//               {Number(request.amount).toLocaleString("en-US", {
//                 minimumFractionDigits: 2,
//                 maximumFractionDigits: 2,
//               })}
//             </p>
//           </div>

//           {/* PRIORITY */}

//           <div>
//             <p className="text-sm text-slate-500">
//               Priority
//             </p>

//             <p className="mt-1 font-semibold text-slate-800">
//               {request.priority}
//             </p>
//           </div>

//           {/* STATUS */}

//           <div>
//             <p className="text-sm text-slate-500">
//               Status
//             </p>

//             <p className="mt-1 font-semibold text-slate-800">
//               {request.status}
//             </p>
//           </div>

//           {/* VENDOR */}

//           <div>
//             <p className="text-sm text-slate-500">
//               Vendor
//             </p>

//             <p className="mt-1 font-semibold text-slate-800">
//               {request.vendor || "Not provided"}
//             </p>
//           </div>

//           {/* DELIVERY DATE */}

//           <div>
//             <p className="text-sm text-slate-500">
//               Delivery Date
//             </p>

//             <p className="mt-1 font-semibold text-slate-800">
//               {request.deliveryDate
//                 ? new Date(request.deliveryDate).toLocaleDateString()
//                 : "Not provided"}
//             </p>
//           </div>

//           {/* DESCRIPTION */}

//           <div className="md:col-span-2">
//             <p className="text-sm text-slate-500">
//               Description
//             </p>

//             <p className="mt-1 text-slate-800">
//               {request.description || "No description provided"}
//             </p>
//           </div>

//           {/* JUSTIFICATION */}

//           <div className="md:col-span-2">
//             <p className="text-sm text-slate-500">
//               Justification
//             </p>

//             <p className="mt-1 text-slate-800">
//               {request.justification || "No justification provided"}
//             </p>
//           </div>

//         </div>

//         {/* ==========================================
//             WORKFLOW ACTIONS
//         ========================================== */}

//         <div className="mt-8 border-t border-orange-100 pt-6">

//           <h2 className="mb-4 text-lg font-semibold text-slate-800">
//             Request Workflow
//           </h2>

//           <p className="mb-4 text-sm text-slate-500">
//             Current status:{" "}
//             <span className="font-semibold text-slate-700">
//               {request.status}
//             </span>
//           </p>

//           <div className="flex flex-wrap gap-3">

//             {/* ==========================================
//                 DRAFT -> PENDING
//             ========================================== */}

//             {request.status === "DRAFT" && (
//               <button
//                 type="button"
//                 onClick={handleSubmit}
//                 disabled={actionLoading}
//                 className="flex items-center gap-2 rounded-md bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
//               >
//                 {actionLoading ? (
//                   <Loader2 className="h-4 w-4 animate-spin" />
//                 ) : (
//                   <FileText className="h-4 w-4" />
//                 )}

//                 Submit Request
//               </button>
//             )}

//             {/* ==========================================
//                 PENDING -> APPROVED
//             ========================================== */}

//             {request.status === "PENDING" && (
//               <button
//                 type="button"
//                 onClick={handleApprove}
//                 disabled={actionLoading}
//                 className="flex items-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
//               >
//                 {actionLoading ? (
//                   <Loader2 className="h-4 w-4 animate-spin" />
//                 ) : (
//                   <CheckCircle className="h-4 w-4" />
//                 )}

//                 Approve Request
//               </button>
//             )}

//             {/* ==========================================
//                 APPROVED -> COMPLETED
//             ========================================== */}

//             {request.status === "APPROVED" && (
//               <button
//                 type="button"
//                 onClick={handleComplete}
//                 disabled={actionLoading}
//                 className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
//               >
//                 {actionLoading ? (
//                   <Loader2 className="h-4 w-4 animate-spin" />
//                 ) : (
//                   <Check className="h-4 w-4" />
//                 )}

//                 Complete Request
//               </button>
//             )}

//             {/* ==========================================
//                 COMPLETED
//             ========================================== */}

//             {request.status === "COMPLETED" && (
//               <div className="flex items-center gap-2 rounded-md bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
//                 <CheckCircle className="h-4 w-4" />

//                 Request Completed
//               </div>
//             )}

//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Check,
  CheckCircle,
  FileText,
  Loader2,
} from "lucide-react";

import {
  getProcurementRequest,
  submitProcurementRequest,
  approveProcurementRequest,
  completeProcurementRequest,
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

export default function ProcurementDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [request, setRequest] = useState<ProcurementRequest | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ==========================================
  // LOAD PROCUREMENT REQUEST
  // ==========================================

  const loadRequest = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await getProcurementRequest(id);

      setRequest(data);
    } catch (error) {
      console.error("Failed to load procurement request:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to load procurement request"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRequest();
  }, [id]);

  // ==========================================
  // SUBMIT REQUEST
  // DRAFT -> PENDING
  // ==========================================

  const handleSubmit = async () => {
    try {
      setActionLoading(true);
      setError(null);

      const updatedRequest = await submitProcurementRequest(id);

      setRequest(updatedRequest);
    } catch (error) {
      console.error("Submit error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to submit procurement request"
      );
    } finally {
      setActionLoading(false);
    }
  };

  // ==========================================
  // APPROVE REQUEST
  // PENDING -> APPROVED
  // ==========================================

  const handleApprove = async () => {
    try {
      setActionLoading(true);
      setError(null);

      const updatedRequest = await approveProcurementRequest(id);

      setRequest(updatedRequest);
    } catch (error) {
      console.error("Approve error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to approve procurement request"
      );
    } finally {
      setActionLoading(false);
    }
  };

  // ==========================================
  // COMPLETE REQUEST
  // APPROVED -> COMPLETED
  // ==========================================

  const handleComplete = async () => {
    try {
      setActionLoading(true);
      setError(null);

      const updatedRequest = await completeProcurementRequest(id);

      setRequest(updatedRequest);
    } catch (error) {
      console.error("Complete error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to complete procurement request"
      );
    } finally {
      setActionLoading(false);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f7f9fb] p-6">
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-sm text-slate-600 transition hover:text-orange-500"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Procurement
        </button>

        <div className="rounded-lg border border-orange-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-center py-10">
            <Loader2 className="h-6 w-6 animate-spin text-orange-500" />

            <span className="ml-2 text-sm text-slate-500">
              Loading procurement request...
            </span>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // ERROR / REQUEST NOT FOUND
  // ==========================================

  if (error && !request) {
    return (
      <div className="min-h-screen bg-[#f7f9fb] p-6">
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-sm text-slate-600 transition hover:text-orange-500"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Procurement
        </button>

        <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-sm text-red-700">
          {error}
        </div>
      </div>
    );
  }

  if (!request) {
    return null;
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

      <div className="rounded-lg border border-orange-200 bg-white p-6 shadow-sm">

        {/* ==========================================
            HEADER
        ========================================== */}

        <div className="mb-8 flex flex-col gap-4 border-b border-orange-100 pb-6 md:flex-row md:items-center md:justify-between">

          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Procurement Request Details
            </h1>

            <div className="mt-3">
              <p className="text-sm text-slate-500">
                Request ID
              </p>

              <p className="mt-1 font-semibold text-orange-600">
                {request.id}
              </p>
            </div>
          </div>

          {/* CURRENT STATUS */}

          <div className="self-start rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 md:self-center">
            {request.status}
          </div>
        </div>

        {/* ==========================================
            ERROR MESSAGE AFTER ACTION
        ========================================== */}

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* ==========================================
            REQUEST DETAILS
        ========================================== */}

        <div className="grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2">

          {/* TITLE */}

          <Detail
            label="Title"
            value={request.title}
          />

          {/* CATEGORY */}

          <Detail
            label="Category"
            value={request.category}
          />

          {/* DEPARTMENT */}

          <Detail
            label="Department"
            value={request.department}
          />

          {/* REQUESTED BY */}

          <Detail
            label="Requested By"
            value={request.requestedBy}
          />

          {/* AMOUNT */}

          <Detail
            label="Amount"
            value={`$${Number(request.amount).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`}
          />

          {/* PRIORITY */}

          <Detail
            label="Priority"
            value={request.priority}
          />

          {/* VENDOR */}

          <Detail
            label="Vendor"
            value={request.vendor || "Not provided"}
          />

          {/* DELIVERY DATE */}

          <Detail
            label="Delivery Date"
            value={
              request.deliveryDate
                ? new Date(request.deliveryDate).toLocaleDateString()
                : "Not provided"
            }
          />

          {/* DESCRIPTION */}

          <div className="md:col-span-2">
            <p className="text-sm font-medium text-slate-500">
              Description
            </p>

            <p className="mt-1 text-sm leading-6 text-slate-800">
              {request.description || "No description provided"}
            </p>
          </div>

          {/* JUSTIFICATION */}

          <div className="md:col-span-2">
            <p className="text-sm font-medium text-slate-500">
              Justification
            </p>

            <p className="mt-1 text-sm leading-6 text-slate-800">
              {request.justification || "No justification provided"}
            </p>
          </div>

        </div>

        {/* ==========================================
            WORKFLOW ACTIONS
        ========================================== */}

        <div className="mt-8 border-t border-orange-100 pt-6">

          <h2 className="mb-4 text-lg font-semibold text-slate-800">
            Request Workflow
          </h2>

          <div className="flex flex-wrap gap-3">

            {/* ==========================================
                DRAFT -> PENDING
            ========================================== */}

            {request.status === "DRAFT" && (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={actionLoading}
                className="flex items-center gap-2 rounded-md bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {actionLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <FileText className="h-4 w-4" />
                )}

                Submit Request
              </button>
            )}

            {/* ==========================================
                PENDING -> APPROVED
            ========================================== */}

            {request.status === "PENDING" && (
              <button
                type="button"
                onClick={handleApprove}
                disabled={actionLoading}
                className="flex items-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {actionLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <CheckCircle className="h-4 w-4" />
                )}

                Approve Request
              </button>
            )}

            {/* ==========================================
                APPROVED -> COMPLETED
            ========================================== */}

            {request.status === "APPROVED" && (
              <button
                type="button"
                onClick={handleComplete}
                disabled={actionLoading}
                className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {actionLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Check className="h-4 w-4" />
                )}

                Complete Request
              </button>
            )}

            {/* ==========================================
                COMPLETED
            ========================================== */}

            {request.status === "COMPLETED" && (
              <div className="flex items-center gap-2 rounded-md bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                <CheckCircle className="h-4 w-4" />

                Request Completed
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}

// ==========================================
// DETAIL COMPONENT
// ==========================================

function Detail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-sm font-medium text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-slate-800">
        {value}
      </p>
    </div>
  );
}