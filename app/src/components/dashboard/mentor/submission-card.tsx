
import Link from "next/link";
import {
  FolderKanban,
  CalendarDays,
  MessageSquareText,
  ArrowUpRight,
  ExternalLink,
} from "lucide-react";

export type Submission = {
  id: string;
  title: string;
  description?: string | null;
  status: string;
  createdAt?: string;
  student?: {
    name?: string;
    email?: string;
  };
  projectUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
};

type SubmissionCardProps = {
  submission: Submission;
};

export default function SubmissionCard({
  submission,
}: SubmissionCardProps) {
  const status =
    ["reviewed", "completed", "approved"].includes(
      submission.status.toLowerCase(),
    )
      ? "Completed"
      : ["in_review", "in-review", "under_review"].includes(
            submission.status.toLowerCase(),
          )
        ? "In Review"
        : "Pending";

  const statusStyle =
    status === "Completed"
      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
      : status === "In Review"
        ? "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300"
        : "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300";

  const projectUrl =
    submission.githubUrl ??
    submission.liveUrl ??
    submission.projectUrl;

  return (
    <article className="flex min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-violet-300 hover:shadow-lg dark:border-white/10 dark:bg-[#201A35] sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <div className="rounded-xl bg-violet-100 p-3 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
            <FolderKanban size={22} />
          </div>

          <div className="min-w-0">
            <h3 className="break-words font-semibold text-slate-900 dark:text-white">
              {submission.title}
            </h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              By {submission.student?.name ?? "Student"}
            </p>
          </div>
        </div>

        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${statusStyle}`}
        >
          {status}
        </span>
      </div>

      <p className="mt-4 line-clamp-3 min-h-12 text-sm leading-6 text-slate-500 dark:text-slate-400">
        {submission.description || "No project description provided."}
      </p>

      <div className="mt-4 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <CalendarDays size={15} />
        {submission.createdAt
          ? new Date(submission.createdAt).toLocaleDateString()
          : "Date unavailable"}
      </div>

      <div className="mt-6 flex flex-wrap gap-3 border-t border-slate-100 pt-4 dark:border-white/10">
        <Link
          href={`/dashboard/mentor/reviews?submissionId=${encodeURIComponent(submission.id)}`}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700"
        >
          <MessageSquareText size={16} />
          Review Project
          <ArrowUpRight size={16} />
        </Link>

        {projectUrl && (
          <a
            href={projectUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold hover:bg-slate-50 dark:border-white/10 dark:hover:bg-white/5"
          >
            <ExternalLink size={16} />
            Open
          </a>
        )}
      </div>
    </article>
  );
}
