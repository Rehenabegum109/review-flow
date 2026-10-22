
"use client";

import {
  ArrowRight,
  BookOpenCheck,
  Code2,
  HeartHandshake,
  Lightbulb,
  MessageSquareText,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

const highlights = [
  {
    icon: Code2,
    title: "Build Real Projects",
    description:
      "Turn your ideas into real projects and showcase what you have learned.",
  },
  {
    icon: MessageSquareText,
    title: "Get Meaningful Feedback",
    description:
      "Learn from constructive reviews that help you improve your code quality.",
  },
  {
    icon: HeartHandshake,
    title: "Learn Together",
    description:
      "Connect students and mentors through collaboration and shared knowledge.",
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative isolate overflow-hidden bg-white py-20 transition-colors duration-300 dark:bg-slate-950 sm:py-24 lg:py-28"
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-20 -z-10 h-72 w-72 rounded-full bg-violet-400/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-10 -z-10 h-80 w-80 rounded-full bg-fuchsia-400/15 blur-3xl"
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Section heading */}
        <div className="mx-auto mb-14 max-w-3xl text-center sm:mb-16">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-700 dark:border-violet-400/20 dark:bg-violet-400/10 dark:text-violet-300">
            <Sparkles className="h-4 w-4" />
            About ReviewFlow
          </div>

          <h2
            id="about-heading"
            className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl"
          >
            Better Projects.
            <span className="block bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-500 bg-clip-text text-transparent">
              Better Feedback.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-400 sm:text-lg sm:leading-8">
            ReviewFlow helps students submit projects, receive meaningful
            feedback, and grow their development skills with guidance from
            mentors.
          </p>
        </div>

        {/* Main content */}
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left content */}
          <div>
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white shadow-lg shadow-violet-500/25">
              <Target className="h-6 w-6" />
            </div>

            <h3 className="text-2xl font-bold leading-snug text-slate-900 dark:text-white sm:text-3xl">
              A better way to learn, build, and improve.
            </h3>

            <p className="mt-5 leading-7 text-slate-600 dark:text-slate-400">
              Learning to code is more than writing code. It is about solving
              problems, learning from mistakes, and continuously improving.
              ReviewFlow provides a structured space where students can share
              their work and receive feedback to help them move forward.
            </p>

            <div className="mt-8 space-y-5">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-400/10 dark:text-violet-300">
                  <BookOpenCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">
                    Our Mission
                  </h4>
                  <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                    Make project-based learning more useful through thoughtful
                    feedback and continuous improvement.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-400/10 dark:text-fuchsia-300">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">
                    For Students and Mentors
                  </h4>
                  <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                    Give students a place to grow and mentors a way to share
                    their knowledge.
                  </p>
                </div>
              </div>
            </div>

            <a
              href="/register"
              className="mt-9 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
            >
              Start Your Journey
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* Right feature cards */}
          <div className="relative">
            <div className="absolute -inset-3 -z-10 rounded-[2rem] bg-gradient-to-br from-violet-500/15 via-purple-500/10 to-fuchsia-500/15 blur-xl" />

            <div className="space-y-4">
              {highlights.map((item, index) => {
                const Icon = item.icon;

                return (
                  <article
                    key={item.title}
                    className="group rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:shadow-xl hover:shadow-violet-500/10 dark:border-slate-800 dark:bg-slate-900/90 dark:hover:border-violet-400/40 sm:p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white shadow-md shadow-violet-500/20 transition-transform duration-300 group-hover:scale-105">
                        <Icon className="h-5 w-5" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="mb-1 flex items-center gap-2">
                          <span className="text-xs font-bold text-violet-600 dark:text-violet-400">
                            0{index + 1}
                          </span>
                          <h4 className="font-semibold text-slate-900 dark:text-white">
                            {item.title}
                          </h4>
                        </div>

                        <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
                          {item.description}
                        </p>
                      </div>

                      <Lightbulb className="mt-1 h-4 w-4 shrink-0 text-violet-400 opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
