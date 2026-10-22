

import {
  CheckCircle2,
  Clock3,
  MessageSquareText,
  XCircle,
} from "lucide-react";
import { ReviewStatsData } from "./review-types";


type ReviewStatsProps = {
  stats: ReviewStatsData;
  loading: boolean;
};

const statConfig = [
  {
    key: "total",
    label: "Total Reviews",
    icon: MessageSquareText,
    gradient: "from-violet-500 to-purple-600",
    iconBackground:
      "bg-violet-50 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300",
  },
  {
    key: "approved",
    label: "Approved",
    icon: CheckCircle2,
    gradient: "from-emerald-500 to-teal-500",
    iconBackground:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300",
  },
  {
    key: "rejected",
    label: "Rejected",
    icon: XCircle,
    gradient: "from-rose-500 to-pink-500",
    iconBackground:
      "bg-rose-50 text-rose-600 dark:bg-rose-500/15 dark:text-rose-300",
  },
  {
    key: "pending",
    label: "Pending",
    icon: Clock3,
    gradient: "from-amber-500 to-orange-500",
    iconBackground:
      "bg-amber-50 text-amber-600 dark:bg-amber-500/15 dark:text-amber-300",
  },
] as const;

export default function ReviewStats({
  stats,
  loading,
}: ReviewStatsProps) {
  return (
    <section
      aria-label="Review statistics"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      {statConfig.map((item) => {
        const Icon = item.icon;
        const value = stats[item.key];

        return (
          <article
            key={item.key}
            className="group relative min-w-0 overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white/[0.04] sm:p-6"
          >
            <div
              className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${item.gradient}`}
            />

            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {item.label}
                </p>

                <p
                  aria-live="polite"
                  className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl"
                >
                  {loading ? (
                    <span
                      aria-label="Loading"
                      className="inline-block h-9 w-12 animate-pulse rounded-lg bg-slate-200 dark:bg-white/10"
                    />
                  ) : (
                    value.toLocaleString()
                  )}
                </p>
              </div>

              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105 ${item.iconBackground}`}
              >
                <Icon size={22} strokeWidth={1.8} />
              </div>
            </div>

            <div className="mt-5 flex items-center gap-2">
              <span
                className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${item.gradient}`}
              />

              <p className="text-xs text-slate-500 dark:text-slate-400">
                {loading ? "Loading data..." : "Live review data"}
              </p>
            </div>
          </article>
        );
      })}
    </section>
  );
}
