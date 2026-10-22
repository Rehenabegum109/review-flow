

import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  MessageSquareText,
  UserRound,
  XCircle,
} from "lucide-react";
import {
  formatReviewDate,
  reviewStatusStyles,
  type Review,
  type ReviewStatus,
} from "./review-types";


type ReviewListProps = {
  reviews: Review[];
  loading: boolean;
  onViewDetails: (review: Review) => void;
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

export default function ReviewList({
  reviews,
  loading,
  onViewDetails,
}: ReviewListProps) {
  if (loading) {
    return (
      <section
        aria-label="Loading reviews"
        className="grid grid-cols-1 gap-4 xl:grid-cols-2"
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.04]"
          >
            <div className="h-5 w-28 rounded-full bg-slate-200 dark:bg-white/10" />
            <div className="mt-4 h-6 w-3/4 rounded-lg bg-slate-200 dark:bg-white/10" />
            <div className="mt-3 h-4 w-1/2 rounded bg-slate-200 dark:bg-white/10" />
            <div className="mt-5 h-20 rounded-xl bg-slate-100 dark:bg-white/5" />
          </div>
        ))}
      </section>
    );
  }

  if (reviews.length === 0) {
    return (
      <section className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-14 text-center dark:border-white/15 dark:bg-white/[0.03]">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300">
          <MessageSquareText size={25} />
        </div>

        <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-white">
          No reviews found
        </h3>

        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">
          There are no reviews to display for the current search or status
          filter.
        </p>
      </section>
    );
  }

  return (
    <section
      aria-label="Reviews list"
      className="grid min-w-0 grid-cols-1 gap-4 xl:grid-cols-2"
    >
      {reviews.map((review) => {
        const status = getReviewStatus(review.status);
        const StatusIcon = statusIcons[status];

        return (
          <article
            key={review.id}
            className="group flex min-w-0 flex-col rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-md dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-violet-500/30 sm:p-6"
          >
            {/* Card heading */}
            <div className="flex items-start justify-between gap-3">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${reviewStatusStyles[status]}`}
              >
                <StatusIcon size={14} />
                {status}
              </span>

              <div className="flex shrink-0 items-center gap-1.5 text-xs text-slate-400">
                <CalendarDays size={14} />
                {formatReviewDate(review.updatedAt ?? review.createdAt)}
              </div>
            </div>

            {/* Project information */}
            <div className="mt-5 min-w-0">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-sm">
                  <FileText size={20} />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="break-words text-lg font-bold text-slate-900 dark:text-white">
                    {review.submission?.title ?? "Untitled project"}
                  </h3>

                  <p className="mt-1 break-all text-xs text-slate-400">
                    Submission ID: {review.submission?.id ?? "Unavailable"}
                  </p>
                </div>
              </div>
            </div>

            {/* Student information */}
            <div className="mt-5 rounded-xl border border-slate-100 bg-slate-50/80 p-4 dark:border-white/5 dark:bg-white/[0.03]">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-violet-600 shadow-sm dark:bg-white/10 dark:text-violet-300">
                  <UserRound size={17} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="break-words text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {review.submission?.student?.name ?? "Unknown student"}
                  </p>

                  <p className="mt-1 break-all text-xs leading-5 text-slate-500 dark:text-slate-400">
                    {review.submission?.student?.email ?? "Email unavailable"}
                  </p>
                </div>
              </div>
            </div>

            {/* Feedback */}
            <div className="mt-5 flex-1">
              <div className="mb-2 flex items-center gap-2">
                <MessageSquareText
                  size={15}
                  className="text-violet-500"
                />

                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Mentor feedback
                </p>
              </div>

              <p className="whitespace-pre-wrap break-words text-sm leading-6 text-slate-600 dark:text-slate-300">
                {review.feedback || "No feedback provided."}
              </p>
            </div>

            {/* Card footer */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 dark:border-white/10">
              <p className="text-xs text-slate-400">
                Submitted {formatReviewDate(review.submission?.createdAt)}
              </p>

              <button
                type="button"
                onClick={() => onViewDetails(review)}
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-violet-200 px-4 py-2 text-sm font-semibold text-violet-700 transition hover:bg-violet-50 dark:border-violet-400/20 dark:text-violet-300 dark:hover:bg-violet-500/10"
              >
                <FileText size={15} />
                View details
              </button>
            </div>
          </article>
        );
      })}
    </section>
  );
}
