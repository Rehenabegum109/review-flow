
"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";
import type { UserRole } from "./user-types";

type UsersFiltersProps = {
  search: string;
  onSearchChange: (value: string) => void;
  role: UserRole | "ALL";
  onRoleChange: (value: UserRole | "ALL") => void;
  onClear: () => void;
};

export default function UsersFilters({
  search,
  onSearchChange,
  role,
  onRoleChange,
  onClear,
}: UsersFiltersProps) {
  const hasFilters = search.trim().length > 0 || role !== "ALL";

  const inputClass =
    "min-h-11 w-full rounded-xl border border-slate-200 bg-white text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10 dark:border-white/10 dark:bg-[#171321] dark:text-slate-100 dark:placeholder:text-slate-500";

  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/[0.04] sm:p-5">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
          <SlidersHorizontal size={17} />
        </div>

        <div>
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
            Find users
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Search by name or email and filter by role.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_220px_auto]">
        <div className="relative">
          <Search
            size={18}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search name or email..."
            aria-label="Search users by name or email"
            className={`${inputClass} pl-10 pr-4`}
          />
        </div>

        <select
          value={role}
          onChange={(event) =>
            onRoleChange(event.target.value as UserRole | "ALL")
          }
          aria-label="Filter users by role"
          className={`${inputClass} px-3.5`}
        >
          <option value="ALL">All roles</option>
          <option value="STUDENT">Student</option>
          <option value="MENTOR">Mentor</option>
          <option value="ADMIN">Admin</option>
        </select>

        <button
          type="button"
          onClick={onClear}
          disabled={!hasFilters}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-600 transition hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:text-slate-300 dark:hover:border-violet-400/30 dark:hover:bg-violet-500/10 dark:hover:text-violet-300"
        >
          <X size={16} />
          Clear
        </button>
      </div>
    </section>
  );
}
