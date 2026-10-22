
import {
  FileUp,
  MessageSquareText,
  ShieldCheck,
  ChartNoAxesCombined,
  Users,
  GitPullRequest,
  ArrowUpRight,
} from "lucide-react";

const features = [
  {
    number: "01",
    title: "Project Submissions",
    description:
      "Submit project details and links through a clear, organized workflow.",
    icon: FileUp,
    accent: "from-violet-400/20 to-violet-600/5",
    iconColor: "text-violet-600 dark:text-violet-300",
  },
  {
    number: "02",
    title: "Structured Reviews",
    description:
      "Give and receive focused feedback to identify strengths and areas to improve.",
    icon: MessageSquareText,
    accent: "from-fuchsia-400/20 to-fuchsia-600/5",
    iconColor: "text-fuchsia-600 dark:text-fuchsia-300",
  },
  {
    number: "03",
    title: "Role-Based Access",
    description:
      "Keep student, mentor, and admin experiences organized with appropriate access.",
    icon: ShieldCheck,
    accent: "from-sky-400/20 to-sky-600/5",
    iconColor: "text-sky-600 dark:text-sky-300",
  },
  {
    number: "04",
    title: "Progress Tracking",
    description:
      "Follow submission and review status so the next step stays clear.",
    icon: ChartNoAxesCombined,
    accent: "from-emerald-400/20 to-emerald-600/5",
    iconColor: "text-emerald-600 dark:text-emerald-300",
  },
  {
    number: "05",
    title: "Mentor Collaboration",
    description:
      "Help mentors find pending work and provide actionable feedback efficiently.",
    icon: Users,
    accent: "from-amber-400/20 to-amber-600/5",
    iconColor: "text-amber-600 dark:text-amber-300",
  },
  {
    number: "06",
    title: "Organized Workflow",
    description:
      "Bring submission, review, and improvement into one focused workspace.",
    icon: GitPullRequest,
    accent: "from-pink-400/20 to-pink-600/5",
    iconColor: "text-pink-600 dark:text-pink-300",
  },
];

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="relative overflow-hidden bg-slate-50 px-4 py-20 text-slate-900 transition-colors duration-300 dark:bg-[#100D1F] dark:text-white sm:px-6 sm:py-24 lg:px-8 lg:py-28"
    >
      <div className="pointer-events-none absolute -left-40 top-1/3 h-80 w-80 rounded-full bg-violet-500/10 blur-[100px] dark:bg-violet-600/10" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-100/70 px-3 py-2 text-xs font-semibold text-violet-700 dark:border-violet-300/20 dark:bg-violet-300/[0.07] dark:text-violet-200 sm:text-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-600 dark:bg-violet-300" />
            BUILT FOR BETTER FEEDBACK
          </div>

          <h2 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Everything you need to{" "}
            <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent dark:from-violet-300 dark:to-fuchsia-300">
              move forward.
            </span>
          </h2>

          <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base sm:leading-8">
            A streamlined project review experience designed to make
            submissions easier, feedback clearer, and collaboration more effective.
          </p>
        </div>

        {/* Feature cards */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-16 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.number}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-violet-300 hover:bg-violet-50/50 hover:shadow-xl hover:shadow-violet-100/50 dark:border-white/[0.09] dark:bg-white/[0.025] dark:hover:border-violet-300/25 dark:hover:bg-white/[0.045] dark:hover:shadow-none sm:p-6 lg:p-7"
              >
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${feature.accent} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                />

                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-gradient-to-br ${feature.accent} ${feature.iconColor} dark:border-white/10`}
                    >
                      <Icon size={23} strokeWidth={1.8} />
                    </div>

                    <span className="text-sm font-semibold tracking-widest text-slate-300 dark:text-white/20">
                      {feature.number}
                    </span>
                  </div>

                  <h3 className="mt-7 text-lg font-bold tracking-tight sm:text-xl">
                    {feature.title}
                  </h3>

                  <p className="mt-3 min-h-[4.5rem] text-sm leading-7 text-slate-600 dark:text-slate-400">
                    {feature.description}
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-violet-700 dark:text-violet-300">
                    Core capability
                    <ArrowUpRight
                      size={15}
                      className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom note */}
        <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-violet-100/30 dark:border-white/[0.08] dark:bg-white/[0.025] dark:shadow-none sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <p className="font-semibold">From submission to improvement</p>
            <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
              Keep every step of the review process in one place.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm font-medium text-violet-700 dark:text-violet-300">
            <span className="h-2 w-2 rounded-full bg-violet-600 dark:bg-violet-300" />
            One connected workflow
          </div>
        </div>
      </div>
    </section>
  );
}
