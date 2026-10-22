
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import api from "@/lib/axios";
import { RefreshCw } from "lucide-react";
import SubmissionCard, { Submission } from "@/app/src/components/dashboard/mentor/submission-card";
import SubmissionsHeader from "@/app/src/components/dashboard/mentor/submissions-header";
import SubmissionsStats from "@/app/src/components/dashboard/mentor/submissions-stats";
import SubmissionsFilters from "@/app/src/components/dashboard/mentor/submissions-filters";



export default function MentorSubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSubmissions = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      // Confirm this endpoint against your backend routes.
    const response = await api.get("/reviews/pending");
      const payload = response.data;

      const items = Array.isArray(payload)
        ? payload
        : Array.isArray(payload?.data)
          ? payload.data
          : payload?.data?.submissions ??
            payload?.data?.projects ??
            payload?.submissions ??
            payload?.projects ??
            [];

      setSubmissions(items);
    } catch (err) {
      console.error(err);
      setError("Could not load submissions. Check your backend API route.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchSubmissions();
  }, [fetchSubmissions]);

  const filtered = useMemo(() => {
    return submissions.filter((item) => {
      const query = `${item.title} ${item.student?.name ?? ""}`.toLowerCase();
      const normalizedStatus = item.status.toLowerCase();

      const itemStatus = ["reviewed", "completed", "approved"].includes(
        normalizedStatus,
      )
        ? "Completed"
        : ["in_review", "in-review", "under_review"].includes(normalizedStatus)
          ? "In Review"
          : "Pending";

      return (
        query.includes(search.toLowerCase()) &&
        (status === "All" || status === itemStatus)
      );
    });
  }, [submissions, search, status]);

  const pending = submissions.filter(
    (item) =>
      !["reviewed", "completed", "approved", "in_review", "in-review", "under_review"].includes(
        item.status.toLowerCase(),
      ),
  ).length;

  const completed = submissions.length - pending -
    submissions.filter((item) =>
      ["in_review", "in-review", "under_review"].includes(item.status.toLowerCase()),
    ).length;

  return (
    <main className="min-h-screen min-w-0 space-y-8 bg-slate-50 p-4 text-slate-900 dark:bg-[#171329] dark:text-white sm:p-6 lg:p-8">
      <SubmissionsHeader total={submissions.length} pending={pending} />

      <SubmissionsStats
        total={submissions.length}
        pending={pending}
        completed={completed}
      />

      <SubmissionsFilters
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
      />

      {loading ? (
        <div className="flex items-center justify-center gap-3 py-16 text-slate-500">
          <RefreshCw className="animate-spin" size={20} />
          Loading submissions...
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700 dark:border-red-400/20 dark:bg-red-500/10 dark:text-red-300">
          <p>{error}</p>
          <button
            onClick={() => void fetchSubmissions()}
            className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-white"
          >
            Try again
          </button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center dark:border-white/15">
          <h2 className="font-semibold">No submissions found</h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Student submissions will appear here when available.
          </p>
        </div>
      ) : (
        <section className="grid gap-4 md:grid-cols-2">
          {filtered.map((submission) => (
            <SubmissionCard
              key={submission.id}
              submission={submission}
            />
          ))}
        </section>
      )}
    </main>
  );
}
