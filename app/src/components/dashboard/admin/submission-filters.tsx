
"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";

type SubmissionFiltersProps = {
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
  total: number;
  filteredTotal: number;
};

export default function SubmissionFilters({
  search,
  onSearchChange,
  statusFilter,
  onStatusChange,
  total,
  filteredTotal,
}: SubmissionFiltersProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-[#211b38] sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            All Submissions
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Search and filter student project submissions.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row lg:max-w-2xl">
          {/* Search */}
          <div className="relative min-w-0 flex-1">
            <Search
              size={18}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="search"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search project, student, category..."
              aria-label="Search submissions"
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10 dark:border-white/10 dark:bg-[#171329] dark:text-white dark:focus:border-violet-400"
            />

            {search && (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-white/10 dark:hover:text-white"
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* Status filter */}
          <div className="relative min-w-0 sm:w-48 sm:shrink-0">
            <SlidersHorizontal
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <select
              value={statusFilter}
              onChange={(event) => onStatusChange(event.target.value)}
              aria-label="Filter submissions by status"
              className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm text-slate-900 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10 dark:border-white/10 dark:bg-[#171329] dark:text-white dark:focus:border-violet-400"
            >
              <option value="All">All statuses</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-4 dark:border-white/10">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Showing{" "}
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            {filteredTotal}
          </span>{" "}
          of {total} submissions
        </p>

        {(search || statusFilter !== "All") && (
          <button
            type="button"
            onClick={() => {
              onSearchChange("");
              onStatusChange("All");
            }}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-600 transition hover:text-violet-700 dark:text-violet-300 dark:hover:text-violet-200"
          >
            <X size={14} />
            Clear filters
          </button>
        )}
      </div>
    </section>
  );
}
