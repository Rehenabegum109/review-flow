import {
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  FileUp,
  MessageSquareText,
  RefreshCw,
  Sparkles,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Submit your project",
    description:
      "Share your project details, repository link, and live demo so your work is ready for review.",
    icon: FileUp,
    label: "STUDENT",
  },
  {
    number: "02",
    title: "Get meaningful feedback",
    description:
      "A mentor reviews your submission, evaluates the work, and shares actionable suggestions.",
    icon: MessageSquareText,
    label: "MENTOR",
  },
  {
    number: "03",
    title: "Improve and repeat",
    description:
      "Use the feedback to refine your project, strengthen your skills, and prepare for the next challenge.",
    icon: RefreshCw,
    label: "GROWTH",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-slate-50 px-4 py-20 text-slate-900 transition-colors duration-300 dark:bg-[#151127] dark:text-white sm:px-6 sm:py-24 lg:px-8 lg:py-28"
    >
      <div className="pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full bg-fuchsia-500/10 blur-[110px]" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-violet-500/10 blur-[110px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-100 px-3 py-2 text-xs font-semibold tracking-wide text-violet-700 dark:border-violet-300/20 dark:bg-violet-300/[0.07] dark:text-violet-200 sm:text-sm">
            <Sparkles size={15} />
            SIMPLE BY DESIGN
          </div>

          <h2 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            From your first commit
            <span className="mt-2 block bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent dark:from-violet-300 dark:to-fuchsia-300">
              to your next breakthrough.
            </span>
          </h2>

          <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base sm:leading-8">
            A straightforward process that turns your submitted work
            into a meaningful learning experience.
          </p>
        </div>

        {/* Steps */}
        <div className="relative mt-14 grid gap-5 md:grid-cols-3 md:gap-6 lg:mt-20">
          {/* Connecting line on desktop */}
          <div className="pointer-events-none absolute left-[18%] right-[18%] top-10 hidden border-t border-dashed border-violet-300/50 dark:border-violet-300/25 md:block" />

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <article
                key={step.number}
                className="group relative rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-violet-300 hover:shadow-xl hover:shadow-violet-500/5 dark:border-white/[0.09] dark:bg-[#100D1F]/70 dark:hover:border-violet-300/25 sm:p-7 lg:p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold tracking-[0.2em] text-violet-600 dark:text-violet-300">
                    STEP {step.number}
                  </span>

                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-bold tracking-wider text-slate-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-400">
                    {step.label}
                  </span>
                </div>

                <div className="relative z-10 mt-7 flex h-20 w-20 items-center justify-center rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-100 to-fuchsia-50 text-violet-600 shadow-lg shadow-violet-500/5 transition duration-300 group-hover:scale-105 group-hover:border-violet-300 dark:border-violet-300/20 dark:from-violet-300/15 dark:to-fuchsia-300/[0.04] dark:text-violet-300 dark:shadow-violet-950/10 dark:group-hover:border-violet-300/40">
                  <Icon size={31} strokeWidth={1.7} />
                  <span className="absolute -bottom-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full border-4 border-slate-50 bg-violet-300 text-xs font-extrabold text-[#171329] dark:border-[#100D1F]">
                    {index + 1}
                  </span>
                </div>

                <h3 className="mt-8 text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                  {step.description}
                </p>

                <div className="mt-6 flex items-center gap-2 border-t border-slate-200 pt-5 text-sm font-medium text-violet-600 dark:border-white/[0.08] dark:text-violet-300">
                  {index === 0 && "Share your work"}
                  {index === 1 && "Learn from feedback"}
                  {index === 2 && "Keep getting better"}

                  <ArrowRight
                    size={15}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </div>

                {/* Mobile/tablet flow indicator */}
                {index < steps.length - 1 && (
                  <div className="mt-5 flex justify-center md:hidden">
                    <ArrowDown
                      size={20}
                      className="text-violet-500/60 dark:text-violet-300/50"
                    />
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {/* Bottom workflow strip */}
        <div className="mt-8 flex flex-col items-start gap-4 rounded-2xl border border-violet-200 bg-gradient-to-r from-violet-100/80 to-fuchsia-50/80 p-5 dark:border-violet-300/15 dark:from-violet-300/[0.08] dark:to-fuchsia-300/[0.04] sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-300/15 dark:text-violet-300">
              <CheckCircle2 size={21} />
            </div>

            <div>
              <p className="font-bold text-slate-900 dark:text-white">
                Every review is a chance to grow.
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                Progress starts with sharing your work and being open to feedback.
              </p>
            </div>
          </div>

          <span className="shrink-0 rounded-lg border border-violet-200 bg-white/70 px-3 py-2 text-xs font-semibold text-violet-700 dark:border-white/10 dark:bg-black/10 dark:text-violet-200">
            Submit → Review → Improve
          </span>
        </div>
      </div>
    </section>
  );
}
