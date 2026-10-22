
"use client";

import { Filter, Search, X } from "lucide-react";

type ReviewFiltersProps = {
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
  total: number;
  filteredTotal: number;
};

export default function ReviewFilters({
  search,
  onSearchChange,
  statusFilter,
  onStatusChange,
  total,
  filteredTotal,
}: ReviewFiltersProps) {
  const hasFilters = search.trim().length > 0 || statusFilter !== "ALL";

  function clearFilters() {
    onSearchChange("");
    onStatusChange("ALL");
  }

  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/[0.04] sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300">
              <Filter size={18} />
            </div>

            <h2 className="font-semibold text-slate-900 dark:text-white">
              Review Directory
            </h2>
          </div>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Find reviews by project, student, email, or feedback.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row lg:max-w-2xl">
          <div className="relative min-w-0 flex-1">
            <Search
              size={18}
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
            />

            <input
              type="search"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search reviews..."
              aria-label="Search reviews"
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pr-10 pl-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
            />

            {search && (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                aria-label="Clear search"
                className="absolute top-1/2 right-3 -translate-y-1/2 rounded-md p-1 text-slate-400 transition hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-white/10 dark:hover:text-white"
              >
                <X size={15} />
              </button>
            )}
          </div>

          <select
            value={statusFilter}
            onChange={(event) => onStatusChange(event.target.value)}
            aria-label="Filter reviews by status"
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-500/10 dark:border-white/10 dark:bg-[#171323] dark:text-white sm:w-44"
          >
            <option value="ALL">All statuses</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
            <option value="PENDING">Pending</option>
          </select>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 dark:border-white/10">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Showing{" "}
          <span className="font-semibold text-slate-700 dark:text-slate-200">
            {filteredTotal}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-slate-700 dark:text-slate-200">
            {total}
          </span>{" "}
          reviews
        </p>

        <button
          type="button"
          onClick={clearFilters}
          disabled={!hasFilters}
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-violet-600 transition hover:bg-violet-50 disabled:cursor-not-allowed disabled:opacity-40 dark:text-violet-300 dark:hover:bg-violet-500/10"
        >
          <X size={14} />
          Clear filters
        </button>
      </div>
    </section>
  );
}
