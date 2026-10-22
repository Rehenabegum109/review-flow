
import { FileText, ShieldCheck, Sparkles } from "lucide-react";

export default function SubmissionBanner() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 p-6 text-white shadow-xl shadow-violet-500/10 sm:p-8">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -right-12 -top-16 h-52 w-52 rounded-full bg-white/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-fuchsia-300/20 blur-3xl" />

      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold">
            <ShieldCheck size={14} />
            Submission Management
          </span>

          <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
            Every project deserves a great review.
          </h2>

          <p className="mt-3 text-sm leading-6 text-violet-100 sm:text-base">
            Keep student work organized and make it easier to track which
            projects are awaiting attention.
          </p>

          <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-violet-100">
            <Sparkles size={16} />
            Supporting better project reviews
          </div>
        </div>

        <div className="flex h-20 w-20 shrink-0 items-center justify-center self-start rounded-3xl border border-white/20 bg-white/10 sm:h-24 sm:w-24">
          <FileText size={42} strokeWidth={1.5} />
        </div>
      </div>
    </section>
  );
}
