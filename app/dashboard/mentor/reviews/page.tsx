
"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  MessageSquareText,
  CheckCircle2,
  XCircle,
  LoaderCircle,
  FileText,
} from "lucide-react";
import api from "@/lib/axios";
import { toast } from "sonner";

export default function MentorReviewPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-600 dark:bg-[#171329] dark:text-white">
          <div className="flex items-center gap-3">
            <LoaderCircle className="animate-spin" size={22} />
            Loading review page...
          </div>
        </main>
      }
    >
      <MentorReviewContent />
    </Suspense>
  );
}

function MentorReviewContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const submissionId = searchParams.get("submissionId");

  const [feedback, setFeedback] = useState("");
  const [status, setStatus] = useState<"APPROVED" | "REJECTED">(
    "APPROVED",
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!submissionId) {
      toast.error("Submission ID is missing.");
      return;
    }

    if (!feedback.trim()) {
      toast.error("Please write your feedback.");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await api.patch(
        `/reviews/${encodeURIComponent(submissionId)}`,
        {
          feedback: feedback.trim(),
          status,
        },
      );

      if (response.data?.success) {
        toast.success(
          response.data.message || "Review submitted successfully!",
        );

        router.push("/dashboard/mentor/submissions");
        router.refresh();
      } else {
        toast.error(
          response.data?.message || "Could not submit review.",
        );
      }
    } catch (error: unknown) {
      let message = "Could not submit review. Please try again.";

      if (
        typeof error === "object" &&
        error !== null &&
        "response" in error
      ) {
        const response = (
          error as {
            response?: {
              data?: { message?: string };
            };
          }
        ).response;

        message = response?.data?.message || message;
      }

      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen min-w-0 bg-slate-50 px-4 py-6 text-slate-900 transition-colors duration-300 dark:bg-[#171329] dark:text-white sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto w-full max-w-4xl space-y-6">
        {/* Back navigation */}
        <Link
          href="/dashboard/mentor/submissions"
          className="inline-flex items-center gap-2 rounded-xl text-sm font-semibold text-slate-600 transition hover:text-violet-600 dark:text-slate-300 dark:hover:text-violet-400"
        >
          <ArrowLeft size={18} />
          Back to Submissions
        </Link>

        {/* Page heading */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 p-6 text-white shadow-xl shadow-violet-500/10 sm:p-8">
          <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-16 left-1/3 h-40 w-40 rounded-full bg-fuchsia-300/20 blur-3xl" />

          <div className="relative flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/15">
              <MessageSquareText size={24} />
            </div>

            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-violet-100">
                Mentor Workspace
              </p>

              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Review Student Project
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-violet-100 sm:text-base">
                Share meaningful feedback and help students improve
                their projects and development skills.
              </p>
            </div>
          </div>
        </section>

        {/* Review form */}
        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#211b38] sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
              <FileText size={21} />
            </div>

            <div>
              <h2 className="text-lg font-bold sm:text-xl">
                Review Details
              </h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Complete the form below to submit your review.
              </p>
            </div>
          </div>

          {!submissionId && (
            <div
              role="alert"
              className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-200"
            >
              Submission ID is missing. Please open this page from a
              student submission card.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Submission ID */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
                Submission ID
              </label>

              <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-white/10 dark:bg-white/5">
                <p className="break-all font-mono text-sm text-slate-600 dark:text-slate-300">
                  {submissionId || "No submission selected"}
                </p>
              </div>
            </div>

            {/* Feedback */}
            <div className="space-y-2">
              <label
                htmlFor="feedback"
                className="block text-sm font-semibold text-slate-700 dark:text-slate-200"
              >
                Mentor Feedback
                <span className="ml-1 text-rose-500">*</span>
              </label>

              <textarea
                id="feedback"
                name="feedback"
                rows={7}
                value={feedback}
                onChange={(event) => setFeedback(event.target.value)}
                placeholder="Write constructive feedback about the student's project, code quality, improvements, and next steps..."
                required
                minLength={1}
                disabled={isSubmitting}
                className="w-full resize-y rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm leading-7 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-[#19152b] dark:text-white dark:placeholder:text-slate-500"
              />

              <div className="flex items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
                <span>Be specific, helpful, and constructive.</span>
                <span>{feedback.length} characters</span>
              </div>
            </div>

            {/* Review status */}
            <fieldset disabled={isSubmitting} className="space-y-3">
              <legend className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
                Review Decision
              </legend>

              <div className="grid gap-4 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setStatus("APPROVED")}
                  aria-pressed={status === "APPROVED"}
                  className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition ${
                    status === "APPROVED"
                      ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500/10 dark:bg-emerald-500/10"
                      : "border-slate-200 bg-white hover:border-emerald-300 dark:border-white/10 dark:bg-white/[0.02]"
                  }`}
                >
                  <CheckCircle2
                    size={23}
                    className="mt-0.5 shrink-0 text-emerald-500"
                  />

                  <span>
                    <span className="block text-sm font-bold text-slate-800 dark:text-white">
                      Approve Project
                    </span>
                    <span className="mt-1 block text-xs leading-5 text-slate-500 dark:text-slate-400">
                      The submission meets the requirements.
                    </span>
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setStatus("REJECTED")}
                  aria-pressed={status === "REJECTED"}
                  className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition ${
                    status === "REJECTED"
                      ? "border-rose-500 bg-rose-50 ring-2 ring-rose-500/10 dark:bg-rose-500/10"
                      : "border-slate-200 bg-white hover:border-rose-300 dark:border-white/10 dark:bg-white/[0.02]"
                  }`}
                >
                  <XCircle
                    size={23}
                    className="mt-0.5 shrink-0 text-rose-500"
                  />

                  <span>
                    <span className="block text-sm font-bold text-slate-800 dark:text-white">
                      Request Changes
                    </span>
                    <span className="mt-1 block text-xs leading-5 text-slate-500 dark:text-slate-400">
                      The student needs to improve the submission.
                    </span>
                  </span>
                </button>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                Selected decision:{" "}
                <span className="font-bold text-violet-600 dark:text-violet-400">
                  {status}
                </span>
              </p>
            </fieldset>

            {/* Actions */}
            <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 dark:border-white/10 sm:flex-row sm:justify-end">
              <Link
                href="/dashboard/mentor/submissions"
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={
                  !submissionId || !feedback.trim() || isSubmitting
                }
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-violet-500/20 transition hover:from-violet-700 hover:to-indigo-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
              >
                {isSubmitting ? (
                  <>
                    <LoaderCircle size={17} className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <MessageSquareText size={17} />
                    Submit Review
                  </>
                )}
              </button>
            </div>
          </form>
        </section>

        <p className="text-center text-xs leading-5 text-slate-500 dark:text-slate-400">
          Your review will be saved when the backend confirms the
          submission was successful.
        </p>
      </div>
    </main>
  );
}
