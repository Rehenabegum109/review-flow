
"use client";

import { Search, SlidersHorizontal } from "lucide-react";

type SubmissionsFiltersProps = {
  search: string;
  onSearchChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
};

export default function SubmissionsFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
}: SubmissionsFiltersProps) {
  return (
    <section className="flex flex-col gap-3 sm:flex-row">
      <div className="relative flex-1">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search project or student..."
          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10 dark:border-white/10 dark:bg-[#201A35] dark:text-white"
        />
      </div>

      <div className="relative sm:w-52">
        <SlidersHorizontal
          size={16}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <select
          value={status}
          onChange={(event) => onStatusChange(event.target.value)}
          className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-violet-400 dark:border-white/10 dark:bg-[#201A35] dark:text-white"
        >
          <option value="All">All statuses</option>
          <option value="Pending">Pending</option>
          <option value="In Review">In Review</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
    </section>
  );
}
