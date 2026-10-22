
"use client";

import {
  CalendarDays,
  ChevronRight,
  ExternalLink,
  FolderKanban,
  UserRound,
} from "lucide-react";

import type { Submission } from "./submission-types";
import { statusStyles } from "./submission-types";

type SubmissionListProps = {
  submissions: Submission[];
  onViewDetails: (submission: Submission) => void;
  onClearFilters?: () => void;
};

export default function SubmissionList({
  submissions,
  onViewDetails,
  onClearFilters,
}: SubmissionListProps) {
  if (submissions.length === 0) {
    return (
      <section className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-14 text-center dark:border-white/15 dark:bg-[#211b38]">
        <FolderKanban
          size={30}
          className="mx-auto text-violet-500"
        />
        <h3 className="mt-4 text-lg font-bold">No submissions found</h3>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          There are no submissions matching your search or selected status.
        </p>

        {onClearFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="mt-5 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-700"
          >
            Clear filters
          </button>
        )}
      </section>
    );
  }

  return (
    <section
      aria-label="Project submissions"
      className="grid min-w-0 grid-cols-1 gap-4 xl:grid-cols-2"
    >
      {submissions.map((submission) => (
        <article
          key={submission.id}
          className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-violet-200 hover:shadow-lg hover:shadow-violet-500/5 dark:border-white/10 dark:bg-[#211b38] dark:hover:border-violet-400/30 sm:p-6"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
                <FolderKanban size={21} />
              </div>
              <div className="min-w-0">
                <h3 className="break-words font-bold text-slate-900 dark:text-white">
                  {submission.title}
                </h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Submission #{submission.id}
                </p>
              </div>
            </div>

            <span
              className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${statusStyles[submission.status]}`}
            >
              {submission.status.charAt(0) +
                submission.status.slice(1).toLowerCase()}
            </span>
          </div>

          <p className="mt-4 line-clamp-3 break-words text-sm leading-6 text-slate-600 dark:text-slate-300">
            {submission.description}
          </p>

          <div className="mt-5 space-y-3 border-t border-slate-100 pt-4 dark:border-white/10">
            <div className="flex min-w-0 items-start gap-2.5">
              <UserRound size={16} className="mt-0.5 shrink-0 text-slate-400" />
              <div className="min-w-0">
                <p className="break-words text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {submission.student.name}
                </p>
                <p className="break-all text-xs text-slate-500 dark:text-slate-400">
                  {submission.student.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-sm text-slate-500 dark:text-slate-400">
              <CalendarDays size={16} className="shrink-0" />
              <span>
                {new Date(submission.createdAt).toLocaleDateString(
                  "en-GB",
                  {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  },
                )}
              </span>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={submission.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-violet-300 hover:text-violet-700 dark:border-white/10 dark:text-slate-200 dark:hover:text-violet-300"
            >
              GitHub <ExternalLink size={13} />
            </a>

            {submission.liveUrl && (
              <a
                href={submission.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-violet-300 hover:text-violet-700 dark:border-white/10 dark:text-slate-200 dark:hover:text-violet-300"
              >
                Live Demo <ExternalLink size={13} />
              </a>
            )}
          </div>

          <button
            type="button"
            onClick={() => onViewDetails(submission)}
            className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-violet-50 px-4 py-2.5 text-sm font-semibold text-violet-700 transition hover:bg-violet-600 hover:text-white focus:outline-none focus:ring-4 focus:ring-violet-500/20 dark:bg-violet-500/10 dark:text-violet-300 dark:hover:bg-violet-600 dark:hover:text-white"
          >
            View Details
            <ChevronRight size={17} />
          </button>
        </article>
      ))}
    </section>
  );
}
