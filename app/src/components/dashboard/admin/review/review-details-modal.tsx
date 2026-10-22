
"use client";


import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  Mail,
  MessageSquareText,
  UserRound,
  X,
  XCircle,
} from "lucide-react";
import {
  formatReviewDate,
  reviewStatusStyles,
  type Review,
  type ReviewStatus,
} from "./review-types";




type ReviewDetailsModalProps = {
  review: Review | null;
  onClose: () => void;
};

function getReviewStatus(status: string): ReviewStatus {
  if (status === "APPROVED" || status === "REJECTED") {
    return status;
  }

  return "PENDING";
}

const statusIcons = {
  APPROVED: CheckCircle2,
  REJECTED: XCircle,
  PENDING: Clock3,
};

export default function ReviewDetailsModal({
  review,
  onClose,
}: ReviewDetailsModalProps) {
  if (!review) return null;

  const status = getReviewStatus(review.status);
  const StatusIcon = statusIcons[status];

  const details = [
    {
      label: "Review ID",
      value: review.id,
    },
    {
      label: "Submission ID",
      value: review.submission?.id,
    },
    {
      label: "Submission Status",
      value: review.submission?.status,
    },
  ];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-950/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="review-details-title"
        className="max-h-[92dvh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-[#151120] sm:rounded-3xl"
      >
        {/* Header */}
        <div className="relative overflow-hidden border-b border-slate-100 px-5 py-6 dark:border-white/10 sm:px-7">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500" />

          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-start gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-lg shadow-violet-500/20">
                <MessageSquareText size={22} />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-600 dark:text-violet-300">
                  Review management
                </p>

                <h2
                  id="review-details-title"
                  className="mt-1 break-words text-xl font-bold text-slate-900 dark:text-white sm:text-2xl"
                >
                  Review Details
                </h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Full information for this project review
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close review details"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
            >
              <X size={19} />
            </button>
          </div>
        </div>

        <div className="space-y-6 p-5 sm:p-7">
          {/* Review status */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-violet-100 bg-gradient-to-r from-violet-50 to-indigo-50 p-4 dark:border-violet-400/15 dark:from-violet-500/10 dark:to-indigo-500/10">
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Current review status
              </p>

              <span
                className={`mt-2 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${reviewStatusStyles[status]}`}
              >
                <StatusIcon size={15} />
                {status}
              </span>
            </div>

            <div className="text-right">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Last updated
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-200">
                {formatReviewDate(review.updatedAt ?? review.createdAt)}
              </p>
            </div>
          </div>

          {/* Project details */}
          <section>
            <div className="mb-3 flex items-center gap-2">
              <FileText size={18} className="text-violet-500" />
              <h3 className="font-semibold text-slate-900 dark:text-white">
                Project information
              </h3>
            </div>

            <div className="rounded-2xl border border-slate-200 p-4 dark:border-white/10 sm:p-5">
              <p className="break-words text-lg font-bold text-slate-900 dark:text-white">
                {review.submission?.title ?? "Untitled project"}
              </p>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {details.map((item) => (
                  <div
                    key={item.label}
                    className="min-w-0 rounded-xl bg-slate-50 p-3 dark:bg-white/[0.04]"
                  >
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {item.label}
                    </p>
                    <p className="mt-1 break-all text-sm font-medium text-slate-800 dark:text-slate-200">
                      {item.value || "Unavailable"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Student details */}
          <section>
            <div className="mb-3 flex items-center gap-2">
              <UserRound size={18} className="text-violet-500" />
              <h3 className="font-semibold text-slate-900 dark:text-white">
                Student information
              </h3>
            </div>

            <div className="flex min-w-0 items-start gap-4 rounded-2xl border border-slate-200 p-4 dark:border-white/10 sm:p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
                <UserRound size={22} />
              </div>

              <div className="min-w-0 flex-1 space-y-3">
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Full name
                  </p>
                  <p className="mt-1 break-words font-semibold text-slate-900 dark:text-white">
                    {review.submission?.student?.name ?? "Unknown student"}
                  </p>
                </div>

                <div>
                  <p className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <Mail size={14} />
                    Email address
                  </p>
                  <p className="mt-1 break-all text-sm text-slate-700 dark:text-slate-300">
                    {review.submission?.student?.email ?? "Email unavailable"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Student ID
                  </p>
                  <p className="mt-1 break-all text-sm text-slate-700 dark:text-slate-300">
                    {review.submission?.student?.id ?? "Unavailable"}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Feedback */}
          <section>
            <div className="mb-3 flex items-center gap-2">
              <MessageSquareText size={18} className="text-violet-500" />
              <h3 className="font-semibold text-slate-900 dark:text-white">
                Mentor feedback
              </h3>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 dark:border-white/10 dark:bg-white/[0.03] sm:p-5">
              <p className="whitespace-pre-wrap break-words text-sm leading-7 text-slate-700 dark:text-slate-300">
                {review.feedback || "No feedback was provided for this review."}
              </p>
            </div>
          </section>

          {/* Timeline */}
          <section>
            <div className="mb-3 flex items-center gap-2">
              <CalendarDays size={18} className="text-violet-500" />
              <h3 className="font-semibold text-slate-900 dark:text-white">
                Review timeline
              </h3>
            </div>

            <div className="space-y-3 rounded-2xl border border-slate-200 p-4 dark:border-white/10 sm:p-5">
              <div className="flex items-start justify-between gap-4">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Project submitted
                </p>
                <p className="text-right text-sm font-medium text-slate-800 dark:text-slate-200">
                  {formatReviewDate(review.submission?.createdAt)}
                </p>
              </div>

              <div className="h-px bg-slate-100 dark:bg-white/10" />

              <div className="flex items-start justify-between gap-4">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Review last updated
                </p>
                <p className="text-right text-sm font-medium text-slate-800 dark:text-slate-200">
                  {formatReviewDate(review.updatedAt ?? review.createdAt)}
                </p>
              </div>
            </div>
          </section>

          {/* Footer */}
          <div className="flex justify-end border-t border-slate-100 pt-5 dark:border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-violet-500/20 transition hover:from-violet-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 dark:focus:ring-offset-[#151120]"
            >
              Close details
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
