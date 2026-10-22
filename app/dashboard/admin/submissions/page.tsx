
"use client";

import { useEffect, useMemo, useState } from "react";
import { AlertCircle, LoaderCircle, RefreshCw } from "lucide-react";

import api from "@/lib/axios";
import { Submission } from "@/app/src/components/dashboard/admin/submission-types";
import SubmissionHeader from "@/app/src/components/dashboard/admin/submission-header";
import SubmissionBanner from "@/app/src/components/dashboard/admin/submission-banner";
import SubmissionStats from "@/app/src/components/dashboard/admin/submission-stats";
import SubmissionFilters from "@/app/src/components/dashboard/admin/submission-filters";
import SubmissionList from "@/app/src/components/dashboard/admin/submission-list";
import SubmissionDetailsModal from "@/app/src/components/dashboard/admin/submission-details-modal";


type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

type DashboardStats = {
  totalUsers: number;
  totalSubmissions: number;
  pendingSubmissions: number;
  approvedSubmissions: number;
  rejectedSubmissions: number;
};

const emptyStats: DashboardStats = {
  totalUsers: 0,
  totalSubmissions: 0,
  pendingSubmissions: 0,
  approvedSubmissions: 0,
  rejectedSubmissions: 0,
};

export default function AdminSubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [stats, setStats] = useState<DashboardStats>(emptyStats);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedSubmission, setSelectedSubmission] =
    useState<Submission | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchSubmissions() {
    setLoading(true);
    setError("");

    try {
      const [submissionsResponse, statsResponse] = await Promise.all([
        api.get<ApiResponse<Submission[]>>("/admin/submissions"),
        api.get<ApiResponse<DashboardStats>>("/admin/stats"),
      ]);

      if (!submissionsResponse.data.success || !statsResponse.data.success) {
        throw new Error("The server could not load submission data.");
      }

      setSubmissions(submissionsResponse.data.data);
      setStats(statsResponse.data.data);
    } catch (err) {
      console.error("Failed to load admin submissions:", err);

      setError(
        "Could not load submissions. Please check your connection and admin access, then try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void fetchSubmissions();
  }, []);

  const filteredSubmissions = useMemo(() => {
    const query = search.trim().toLowerCase();

    return submissions.filter((submission) => {
      const matchesSearch = [
        submission.title,
        submission.description,
        submission.student?.name ?? "",
        submission.student?.email ?? "",
        submission.githubUrl,
      ].some((value) => value.toLowerCase().includes(query));

      const matchesStatus =
        statusFilter === "All" ||
        submission.status === statusFilter.toUpperCase();

      return matchesSearch && matchesStatus;
    });
  }, [submissions, search, statusFilter]);

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All");
  };

  return (
    <div className="w-full min-w-0 space-y-7 py-4 text-slate-900 dark:text-white sm:py-6">
      <SubmissionHeader />

      <SubmissionBanner />

      <SubmissionStats
        total={stats.totalSubmissions}
        pending={stats.pendingSubmissions}
        approved={stats.approvedSubmissions}
        rejected={stats.rejectedSubmissions}
      />

      <SubmissionFilters
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        total={submissions.length}
        filteredTotal={filteredSubmissions.length}
      />

      {loading ? (
        <div
          className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white text-center dark:border-white/10 dark:bg-[#211b38]"
          role="status"
        >
          <LoaderCircle className="h-9 w-9 animate-spin text-violet-600" />
          <p className="mt-4 font-semibold">Loading submissions...</p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Fetching the latest data from the server.
          </p>
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 dark:border-rose-400/20 dark:bg-rose-500/10">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 shrink-0 text-rose-600 dark:text-rose-300" />
            <div>
              <h2 className="font-bold text-rose-800 dark:text-rose-200">
                Unable to load submissions
              </h2>
              <p className="mt-2 text-sm leading-6 text-rose-700 dark:text-rose-200/80">
                {error}
              </p>
              <button
                type="button"
                onClick={() => void fetchSubmissions()}
                className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700"
              >
                <RefreshCw size={15} />
                Try again
              </button>
            </div>
          </div>
        </div>
      ) : (
        <SubmissionList
          submissions={filteredSubmissions}
          onViewDetails={setSelectedSubmission}
          onClearFilters={clearFilters}
        />
      )}

      <SubmissionDetailsModal
        submission={selectedSubmission}
        onClose={() => setSelectedSubmission(null)}
      />
    </div>
  );
}
