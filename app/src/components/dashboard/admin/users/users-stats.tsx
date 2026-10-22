
"use client";

import {
  GraduationCap,
  ShieldCheck,
  Users,
  UserRoundCheck,
} from "lucide-react";
import type { UserStatsData } from "./user-types";

type UsersStatsProps = {
  stats: UserStatsData;
  loading?: boolean;
};

const statItems = [
  {
    key: "total",
    label: "Total Users",
    icon: Users,
    iconStyle:
      "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300",
  },
  {
    key: "students",
    label: "Students",
    icon: GraduationCap,
    iconStyle:
      "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300",
  },
  {
    key: "mentors",
    label: "Mentors",
    icon: UserRoundCheck,
    iconStyle:
      "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300",
  },
  {
    key: "admins",
    label: "Admins",
    icon: ShieldCheck,
    iconStyle:
      "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
  },
] as const;

export default function UsersStats({
  stats,
  loading = false,
}: UsersStatsProps) {
  return (
    <section
      aria-label="User statistics"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      {statItems.map((item) => {
        const Icon = item.icon;
        const value = stats[item.key];

        return (
          <article
            key={item.key}
            className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-md dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-violet-400/30 sm:p-6"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {item.label}
                </p>

                <div
                  className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white"
                  aria-live="polite"
                >
                  {loading ? (
                    <span className="inline-block h-9 w-16 animate-pulse rounded-lg bg-slate-200 dark:bg-white/10" />
                  ) : (
                    value.toLocaleString()
                  )}
                </div>
              </div>

              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${item.iconStyle}`}
              >
                <Icon size={22} />
              </div>
            </div>

            <p className="mt-4 text-xs text-slate-400 dark:text-slate-500">
              Current registered {item.key === "total" ? "members" : item.label.toLowerCase()}
            </p>
          </article>
        );
      })}
    </section>
  );
}
