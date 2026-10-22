
import { FolderKanban } from "lucide-react";

type SubmissionsHeaderProps = {
  total: number;
  pending: number;
};

export default function SubmissionsHeader({
  total,
  pending,
}: SubmissionsHeaderProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 p-6 text-white shadow-lg sm:p-8">
      <div className="relative z-10">
        <div className="mb-3 flex items-center gap-2 text-sm text-violet-100">
          <FolderKanban size={18} />
          Mentor Workspace
        </div>

        <h1 className="text-3xl font-bold sm:text-4xl">
          Projects to Review
        </h1>

        <p className="mt-3 max-w-xl text-sm leading-6 text-violet-100 sm:text-base">
          Review student projects and provide meaningful feedback
          to help them improve.
        </p>

        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <span className="rounded-xl border border-white/20 bg-white/10 px-4 py-2">
            {total} total submissions
          </span>

          <span className="rounded-xl border border-white/20 bg-white/10 px-4 py-2">
            {pending} pending
          </span>
        </div>
      </div>

      <div className="pointer-events-none absolute -right-12 -top-16 h-56 w-56 rounded-full border-[32px] border-white/10" />
    </section>
  );
}
