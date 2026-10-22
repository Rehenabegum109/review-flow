
"use client";

import {
  CalendarDays,
  ExternalLink,
  FileText,
  Mail,
  MessageSquareText,
  UserRound,
  X,
} from "lucide-react";

import type { Submission } from "./submission-types";
import { statusStyles } from "./submission-types";

type SubmissionDetailsModalProps = {
  submission: Submission | null;
  onClose: () => void;
};

export default function SubmissionDetailsModal({
  submission,
  onClose,
}: SubmissionDetailsModalProps) {
  if (!submission) return null;

  const reviewStatus = submission.review?.status?.toUpperCase();
  const displayedStatus =
    reviewStatus === "APPROVED" ||
    reviewStatus === "REJECTED" ||
    reviewStatus === "PENDING"
      ? reviewStatus
      : submission.status;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="submission-modal-title"
        className="my-auto max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-[#211b38]"
      >
        <div className="relative bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 px-5 py-7 text-white sm:px-7">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close submission details"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-white/10 hover:bg-white/20"
          >
            <X size={18} />
          </button>

          <div className="flex items-center gap-2 text-sm text-violet-100">
            <FileText size={17} />
            Submission Details
          </div>

          <h2
            id="submission-modal-title"
            className="mt-3 break-words pr-8 text-2xl font-bold sm:text-3xl"
          >
            {submission.title}
          </h2>

          <p className="mt-2 text-sm text-violet-100">
            Submission #{submission.id}
          </p>
        </div>

        <div className="space-y-6 p-5 sm:p-7">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Status
            </p>
            <span
              className={`inline-flex rounded-full px-3 py-1.5 text-sm font-semibold ring-1 ring-inset ${statusStyles[displayedStatus as keyof typeof statusStyles] ?? statusStyles.PENDING}`}
            >
              {displayedStatus.charAt(0) +
                displayedStatus.slice(1).toLowerCase()}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/[0.03]">
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <UserRound size={16} />
                Student
              </div>
              <p className="mt-3 break-words font-semibold">
                {submission.student.name}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/[0.03]">
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <Mail size={16} />
                Email
              </div>
              <p className="mt-3 break-all text-sm font-semibold">
                {submission.student.email}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/[0.03]">
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <CalendarDays size={16} />
                Submitted
              </div>
              <p className="mt-3 text-sm font-semibold">
                {new Date(submission.createdAt).toLocaleDateString(
                  "en-GB",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  },
                )}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/[0.03]">
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <MessageSquareText size={16} />
                Review
              </div>
              <p className="mt-3 text-sm font-semibold">
                {submission.review ? "Review available" : "Not reviewed yet"}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold">Project description</h3>
            <p className="mt-2 whitespace-pre-wrap break-words rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-600 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-300">
              {submission.description}
            </p>
          </div>

          {submission.review?.feedback && (
            <div>
              <h3 className="text-sm font-bold">Review feedback</h3>
              <p className="mt-2 whitespace-pre-wrap break-words rounded-2xl border border-violet-200 bg-violet-50 p-4 text-sm leading-7 text-violet-900 dark:border-violet-400/20 dark:bg-violet-500/10 dark:text-violet-200">
                {submission.review.feedback}
              </p>
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            <a
              href={submission.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold hover:border-violet-300 hover:text-violet-700 dark:border-white/10 dark:hover:text-violet-300"
            >
              GitHub Repository <ExternalLink size={15} />
            </a>

            {submission.liveUrl && (
              <a
                href={submission.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold hover:border-violet-300 hover:text-violet-700 dark:border-white/10 dark:hover:text-violet-300"
              >
                Live Project <ExternalLink size={15} />
              </a>
            )}
          </div>

          <div className="flex justify-end border-t border-slate-100 pt-5 dark:border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="min-h-11 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700 focus:outline-none focus:ring-4 focus:ring-violet-500/20"
            >
              Close Details
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
