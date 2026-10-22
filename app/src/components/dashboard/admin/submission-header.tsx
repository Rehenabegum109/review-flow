
import Link from "next/link";
import { ArrowLeft, FolderKanban } from "lucide-react";

export default function SubmissionHeader() {
  return (
    <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
      <div>
        <Link
          href="/dashboard/admin"
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-violet-600 dark:text-slate-400 dark:hover:text-violet-300"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>

        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-violet-600 dark:text-violet-400">
          <FolderKanban size={17} />
          Admin Workspace
        </div>

        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Project Submissions
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400 sm:text-base">
          Explore student projects, monitor submission status, and keep track
          of review progress.
        </p>
      </div>
    </header>
  );
}
