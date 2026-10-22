
import {
  FolderKanban,
  Clock3,
  CheckCircle2,
} from "lucide-react";

type SubmissionsStatsProps = {
  total: number;
  pending: number;
  completed: number;
};

const statsConfig = [
  {
    key: "total",
    label: "Total Submissions",
    icon: FolderKanban,
    color: "violet",
  },
  {
    key: "pending",
    label: "Pending Reviews",
    icon: Clock3,
    color: "amber",
  },
  {
    key: "completed",
    label: "Completed Reviews",
    icon: CheckCircle2,
    color: "emerald",
  },
] as const;

export default function SubmissionsStats({
  total,
  pending,
  completed,
}: SubmissionsStatsProps) {
  const values = { total, pending, completed };

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {statsConfig.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.key}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-white/10 dark:bg-[#201A35]"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {stat.label}
                </p>

                <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
                  {values[stat.key]}
                </p>
              </div>

              <div
                className={`rounded-xl p-3 ${
                  stat.color === "violet"
                    ? "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300"
                    : stat.color === "amber"
                      ? "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300"
                      : "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
                }`}
              >
                <Icon size={22} />
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
