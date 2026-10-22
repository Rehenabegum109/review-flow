
"use client";

import {
  FolderGit2,
  ExternalLink,
  Clock3,
  Plus,
  Code2,
} from "lucide-react";
import type { Submission } from "./submission-types";

type SubmissionListProps = {
  submissions: Submission[];
  loading: boolean;
  onSubmitClick?: () => void;
};

function getStatusStyle(status?: string) {
  const normalized = status?.toUpperCase();

  if (["APPROVED", "COMPLETED", "REVIEWED"].includes(normalized || "")) {
    return "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300";
  }

  if (["REJECTED", "NEEDS_CHANGES"].includes(normalized || "")) {
    return "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300";
  }

  return "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300";
}

export default function SubmissionList({
  submissions,
  loading,
  onSubmitClick,
}: SubmissionListProps) {
  return (
    <section className="space-y-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            My submissions
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            All the projects you have submitted.
          </p>
        </div>

        <span className="w-fit rounded-full bg-violet-100 px-3 py-1.5 text-sm font-semibold text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
          {submissions.length} project{submissions.length === 1 ? "" : "s"}
        </span>
      </div>

      {loading ? (
        <div className="flex min-h-48 items-center justify-center rounded-3xl border border-slate-200 bg-white dark:border-white/10 dark:bg-[#211b38]">
          <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-violet-600 border-t-transparent" />
            Loading your submissions...
          </div>
        </div>
      ) : submissions.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-violet-300 bg-white px-5 py-12 text-center dark:border-violet-400/30 dark:bg-[#211b38]">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300">
            <FolderGit2 size={30} />
          </div>

          <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">
            No submissions yet
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
            Your projects will appear here after you submit them. Start by
            submitting your first project.
          </p>

          {onSubmitClick && (
            <button
              type="button"
              onClick={onSubmitClick}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700"
            >
              <Plus size={17} />
              Submit your first project
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {submissions.map((submission) => (
            <article
              key={submission.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-[#211b38]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
                    <FolderGit2 size={21} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="break-words font-bold text-slate-900 dark:text-white">
                      {submission.title}
                    </h3>

                    <p className="mt-1 text-xs text-slate-400">
                      {submission.createdAt
                        ? new Date(submission.createdAt).toLocaleDateString(
                            undefined,
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            },
                          )
                        : "Submission date unavailable"}
                    </p>
                  </div>
                </div>

                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusStyle(submission.status)}`}
                >
                  {submission.status
                    ? submission.status.replaceAll("_", " ")
                    : "Submitted"}
                </span>
              </div>

              <p className="mt-4 line-clamp-3 whitespace-pre-line text-sm leading-6 text-slate-600 dark:text-slate-300">
                {submission.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-3 border-t border-slate-100 pt-4 dark:border-white/10">
                {submission.githubUrl && (
                  <a
                    href={submission.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-violet-100 hover:text-violet-700 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-violet-500/15 dark:hover:text-violet-300"
                  >
                    <Code2 size={16} />
                    Repository
                    <ExternalLink size={13} />
                  </a>
                )}

                {submission.liveUrl && (
                  <a
                    href={submission.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-violet-50 px-3 py-2 text-sm font-medium text-violet-700 transition hover:bg-violet-100 dark:bg-violet-500/10 dark:text-violet-300 dark:hover:bg-violet-500/20"
                  >
                    <ExternalLink size={16} />
                    Live demo
                  </a>
                )}
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                <Clock3 size={14} />
                Project submission
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
