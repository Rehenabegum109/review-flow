import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Code2,
  Sparkles,
} from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-20 text-slate-900 transition-colors duration-300 dark:bg-[#100D1F] dark:text-white sm:px-6 sm:py-24 lg:px-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-[120px] dark:bg-violet-600/15" />
      </div>

      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-violet-200 bg-gradient-to-br from-violet-50 via-white to-fuchsia-50 p-6 shadow-2xl shadow-violet-500/5 dark:border-violet-300/20 dark:from-[#21183D] dark:via-[#19132E] dark:to-[#151127] dark:shadow-purple-950/20 sm:p-10 lg:p-14">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border border-violet-300/20 dark:border-violet-300/10 sm:h-80 sm:w-80" />
        <div className="pointer-events-none absolute -right-8 -top-8 h-48 w-48 rounded-full border border-violet-300/20 dark:border-violet-300/10 sm:h-60 sm:w-60" />

        <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-100 px-3 py-2 text-xs font-semibold text-violet-700 dark:border-violet-300/20 dark:bg-violet-300/10 dark:text-violet-200 sm:text-sm">
              <Sparkles size={15} />
              YOUR NEXT STEP STARTS HERE
            </div>

            <h2 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Your next project
              <span className="block bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent dark:from-violet-300 dark:to-fuchsia-300">
                deserves a better review.
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base sm:leading-8">
              Share what you build, learn from constructive feedback,
              and take your development skills one step further with ReviewFlow.
            </p>

            <div className="mt-7 flex flex-col gap-3 min-[420px]:flex-row">
              <Link
                href="/register"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-violet-700 dark:bg-violet-300 dark:text-[#171329] dark:hover:bg-violet-200 sm:px-6"
              >
                Create Your Account
                <ArrowRight size={17} />
              </Link>

              <Link
                href="/login"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 transition hover:bg-violet-50 dark:border-white/15 dark:text-white dark:hover:bg-white/10 sm:px-6"
              >
                Already a member?
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>

          <div className="relative w-full rounded-2xl border border-violet-200 bg-white/80 p-5 dark:border-white/10 dark:bg-[#100D1F]/60 sm:p-6 lg:w-72">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-300/15 dark:text-violet-300">
              <Code2 size={25} />
            </div>

            <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">
              Build with purpose.
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
              Make each submission an opportunity to learn something new.
            </p>

            <div className="mt-5 space-y-3 border-t border-slate-200 pt-5 dark:border-white/10">
              {[
                "Submit your work",
                "Receive feedback",
                "Improve your skills",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2.5 text-sm text-slate-700 dark:text-slate-300"
                >
                  <CheckCircle2
                    size={16}
                    className="shrink-0 text-violet-600 dark:text-violet-300"
                  />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
