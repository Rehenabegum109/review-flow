
import {
  FolderKanban,
  Clock3,
  CheckCircle2,
  XCircle,
  ArrowUpRight,
} from "lucide-react";

type SubmissionStatsProps = {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
};

const statStyles = {
  violet: {
    icon: "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300",
    accent: "bg-violet-500",
  },
  amber: {
    icon: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
    accent: "bg-amber-500",
  },
  emerald: {
    icon: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
    accent: "bg-emerald-500",
  },
  rose: {
    icon: "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
    accent: "bg-rose-500",
  },
};

export default function SubmissionStats({
  total,
  pending,
  approved,
  rejected,
}: SubmissionStatsProps) {
  const stats = [
    {
      label: "Total Submissions",
      value: total,
      note: "All project submissions",
      icon: FolderKanban,
      style: statStyles.violet,
    },
    {
      label: "Pending",
      value: pending,
      note: "Awaiting review",
      icon: Clock3,
      style: statStyles.amber,
    },
    {
      label: "Approved",
      value: approved,
      note: "Successfully approved",
      icon: CheckCircle2,
      style: statStyles.emerald,
    },
    {
      label: "Rejected",
      value: rejected,
      note: "Needs improvement",
      icon: XCircle,
      style: statStyles.rose,
    },
  ];

  return (
    <section
      aria-label="Submission statistics"
      className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <article
            key={stat.label}
            className="group relative min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-500/5 dark:border-white/10 dark:bg-[#211b38] dark:hover:border-violet-400/30"
          >
            <div
              className={`absolute inset-x-0 top-0 h-1 ${stat.style.accent} opacity-80`}
            />

            <div className="flex items-start justify-between gap-3">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.style.icon}`}
              >
                <Icon size={22} strokeWidth={1.8} />
              </div>

              <ArrowUpRight
                size={18}
                className="text-slate-300 transition group-hover:text-violet-500 dark:text-slate-500 dark:group-hover:text-violet-300"
              />
            </div>

            <p className="mt-5 break-words text-sm font-medium text-slate-500 dark:text-slate-400">
              {stat.label}
            </p>

            <p className="mt-1 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {stat.value}
            </p>

            <p className="mt-2 text-xs leading-5 text-slate-400 dark:text-slate-500">
              {stat.note}
            </p>
          </article>
        );
      })}
    </section>
  );
}
