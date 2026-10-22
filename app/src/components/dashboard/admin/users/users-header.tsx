
"use client";

import { Plus, RefreshCw, ShieldCheck, Users } from "lucide-react";

type UsersHeaderProps = {
  onCreateUser: () => void;
  onRefresh: () => void;
  loading: boolean;
};

export default function UsersHeader({
  onCreateUser,
  onRefresh,
  loading,
}: UsersHeaderProps) {
  return (
    <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
      <div className="min-w-0">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700 dark:border-violet-400/20 dark:bg-violet-500/10 dark:text-violet-300">
            <ShieldCheck size={14} />
            Admin Panel
          </span>

          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
            <Users size={14} />
            User Management
          </span>
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          Manage Users
        </h1>

        <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400 sm:text-base">
          View and manage ReviewFlow members, their roles, and account details.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onRefresh}
          disabled={loading}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200 dark:hover:border-violet-400/30 dark:hover:bg-violet-500/10 dark:hover:text-violet-300"
        >
          <RefreshCw
            size={16}
            className={loading ? "animate-spin" : ""}
          />
          Refresh
        </button>

        <button
          type="button"
          onClick={onCreateUser}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-violet-500/20 transition hover:from-violet-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 dark:focus:ring-offset-[#100d18]"
        >
          <Plus size={17} />
          Create User
        </button>
      </div>
    </section>
  );
}
