
import { FolderGit2, Sparkles } from "lucide-react";

type SubmissionHeaderProps = {
  totalSubmissions: number;
  completedSubmissions: number;
};

export default function SubmissionHeader({
  totalSubmissions,
  completedSubmissions,
}: SubmissionHeaderProps) {
  return (
    <div className="space-y-6">
      <header>
        <div className="flex items-center gap-2 text-sm font-medium text-violet-600 dark:text-violet-300">
          <FolderGit2 size={18} />
          Student Workspace
        </div>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Project Submissions
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base">
          Share your work, submit your projects, and track your learning
          progress in one place.
        </p>
      </header>

      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-700 via-purple-600 to-fuchsia-600 p-6 text-white shadow-xl shadow-violet-900/10 sm:p-9">
        <div className="pointer-events-none absolute -right-12 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />

        <div className="pointer-events-none absolute -bottom-20 right-1/3 h-48 w-48 rounded-full bg-fuchsia-300/20 blur-3xl" />

        <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium">
              <Sparkles size={14} />
              Your work, your progress
            </span>

            <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
              Turn your projects into progress.
            </h2>

            <p className="mt-3 text-sm leading-6 text-violet-100 sm:text-base">
              Submit your GitHub repository and live demo so your work is ready
              for review.
            </p>
          </div>

          <div className="flex h-20 w-20 shrink-0 items-center justify-center self-start rounded-2xl border border-white/20 bg-white/10 sm:self-center">
            <FolderGit2 size={38} strokeWidth={1.5} />
          </div>
        </div>

        <div className="relative mt-7 grid grid-cols-2 gap-3 sm:max-w-md">
          <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
            <p className="text-sm text-violet-100">Total submissions</p>
            <p className="mt-1 text-3xl font-bold">{totalSubmissions}</p>
          </div>

          <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
            <p className="text-sm text-violet-100">Completed reviews</p>
            <p className="mt-1 text-3xl font-bold">
              {completedSubmissions}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
