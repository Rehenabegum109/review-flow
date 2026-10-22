
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  FileCode2,
  MessageSquareText,
  Sparkles,
  Terminal,
} from "lucide-react";

const technologies = ["React", "TypeScript", "Node.js"];

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-white text-slate-900 transition-colors duration-300 dark:bg-[#100D1F] dark:text-white"
    >
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-violet-500/10 blur-[120px] dark:bg-violet-600/15 sm:h-[600px] sm:w-[600px]" />

        <div className="absolute -right-32 top-1/3 h-72 w-72 rounded-full bg-fuchsia-400/10 blur-[100px] dark:bg-fuchsia-500/10" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(109,40,217,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(109,40,217,0.045)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)]" />
      </div>

      <div className="mx-auto grid min-h-[calc(100vh-76px)] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:px-8 lg:py-24">
        {/* Left content */}
        <div className="relative z-10 mx-auto w-full max-w-2xl lg:mx-0">
          <div className="mb-7 inline-flex max-w-full items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-2 text-xs font-medium text-violet-700 dark:border-violet-300/20 dark:bg-violet-300/[0.08] dark:text-violet-200 sm:px-4 sm:text-sm">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-500 opacity-60 dark:bg-violet-300" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-600 dark:bg-violet-300" />
            </span>
            A smarter way to review projects
            <ArrowUpRight size={14} />
          </div>

          <h1 className="max-w-2xl text-[2.65rem] font-black leading-[1.08] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
            Every Project
            <br />
            Has Room to
            <span className="mt-1 block bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 bg-clip-text pb-2 text-transparent dark:from-violet-300 dark:via-fuchsia-300 dark:to-pink-300">
              Get Better.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base sm:leading-8 lg:text-lg">
            Submit your work. Get meaningful feedback. Improve with
            every review. A focused workspace that connects project
            submissions with structured reviews and measurable progress.
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row">
            <Link
              href="/register"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-violet-300/30 transition duration-200 hover:-translate-y-0.5 hover:bg-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:bg-violet-300 dark:text-[#171329] dark:shadow-violet-950/20 dark:hover:bg-violet-200 dark:focus-visible:ring-violet-300 dark:focus-visible:ring-offset-[#100D1F] sm:px-6"
            >
              Submit Your First Project
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="#how-it-works"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-violet-300 hover:bg-violet-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:border-white/15 dark:bg-white/[0.03] dark:text-white dark:hover:border-violet-300/40 dark:hover:bg-white/[0.07] dark:focus-visible:ring-violet-300 sm:px-6"
            >
              Explore the workflow
              <ArrowDown size={16} className="text-violet-600 dark:text-violet-300" />
            </Link>
          </div>

          {/* Value points */}
          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 border-t border-slate-200 pt-6 text-xs text-slate-600 dark:border-white/10 dark:text-slate-300 sm:text-sm">
            <span className="flex items-center gap-2">
              <Check size={15} className="text-violet-600 dark:text-violet-300" />
              Structured feedback
            </span>
            <span className="flex items-center gap-2">
              <Check size={15} className="text-violet-600 dark:text-violet-300" />
              Clear review workflow
            </span>
            <span className="flex items-center gap-2">
              <Check size={15} className="text-violet-600 dark:text-violet-300" />
              Progress-focused learning
            </span>
          </div>
        </div>

        {/* Right: Product preview */}
        <div className="relative mx-auto w-full max-w-xl lg:ml-auto">
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-violet-500/15 via-transparent to-fuchsia-500/10 blur-2xl sm:-inset-8" />

          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white/95 shadow-2xl shadow-violet-200/40 dark:border-white/10 dark:bg-[#171329]/95 dark:shadow-black/30 sm:rounded-3xl">
            {/* Window header */}
            <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-4 dark:border-white/10 sm:px-6">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-300/15 dark:text-violet-300">
                  <Code2 size={19} />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold">ReviewFlow</p>
                  <p className="text-xs text-slate-500 dark:text-slate-500">
                    Project workspace
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-amber-300/40 bg-amber-50 px-2.5 py-1.5 text-[10px] font-semibold text-amber-700 dark:border-amber-300/20 dark:bg-amber-300/10 dark:text-amber-200 sm:text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                In review
              </div>
            </div>

            {/* Project card */}
            <div className="space-y-4 p-4 sm:space-y-5 sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-violet-600 dark:text-violet-300">
                    Recent submission
                  </p>
                  <h2 className="mt-2 text-lg font-bold sm:text-xl">
                    Developer Portfolio
                  </h2>
                  <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400 sm:text-sm">
                    Personal project · Web development
                  </p>
                </div>

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-violet-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-violet-300 sm:h-12 sm:w-12">
                  <FileCode2 size={23} />
                </div>
              </div>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-2">
                {technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-[11px] font-medium text-slate-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300 sm:text-xs"
                  >
                    {technology}
                  </span>
                ))}
              </div>

              {/* Review progress */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-[#100D1F]/80 sm:p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold">
                    Review progress
                  </span>
                  <span className="text-xs text-violet-600 dark:text-violet-300">
                    Awaiting feedback
                  </span>
                </div>

                <div className="mt-4 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">
                      <Check size={16} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">Project submitted</p>
                      <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-500">
                        Submission received
                      </p>
                    </div>
                    <span className="text-xs text-emerald-700 dark:text-emerald-300">Done</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-violet-200 bg-violet-100 text-violet-700 dark:border-violet-300/30 dark:bg-violet-300/10 dark:text-violet-300">
                      <MessageSquareText size={16} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">Mentor review</p>
                      <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-500">
                        Feedback is the next step
                      </p>
                    </div>
                    <span className="text-xs text-amber-700 dark:text-amber-200">Pending</span>
                  </div>
                </div>
              </div>

              {/* Bottom insight */}
              <div className="flex items-start gap-3 rounded-xl border border-violet-200 bg-gradient-to-r from-violet-50 to-fuchsia-50 p-3.5 dark:border-violet-300/15 dark:from-violet-300/[0.09] dark:to-fuchsia-300/[0.04] sm:p-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-violet-700 dark:bg-violet-300/15 dark:text-violet-300">
                  <Sparkles size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold">
                    Feedback drives progress
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400 sm:text-sm">
                    Turn constructive reviews into your next improvement.
                  </p>
                </div>
              </div>
            </div>

            {/* Window footer */}
            <div className="flex items-center gap-2 border-t border-slate-200 px-4 py-3 text-[10px] text-slate-500 dark:border-white/10 dark:text-slate-500 sm:px-6 sm:text-xs">
              <Terminal size={14} />
              <span>Submit</span>
              <ArrowRight size={12} />
              <span>Review</span>
              <ArrowRight size={12} />
              <span>Improve</span>
              <span className="ml-auto text-violet-600/80 dark:text-violet-300/70">ReviewFlow</span>
            </div>
          </div>

          <p className="mt-4 text-center text-xs text-slate-500">
            One workspace. A better feedback loop.
          </p>
        </div>
      </div>
    </section>
  );
}
