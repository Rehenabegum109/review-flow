
"use client";

import Link from "next/link";
import {
  FolderKanban,
  MessageSquareText,
  Clock3,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

const stats = [
  {
    title: "Pending Reviews",
    value: "—",
    description: "Projects waiting for review",
    icon: Clock3,
  },
  {
    title: "Completed Reviews",
    value: "—",
    description: "Reviews you have completed",
    icon: MessageSquareText,
  },
  {
    title: "Available Projects",
    value: "—",
    description: "Projects ready to review",
    icon: FolderKanban,
  },
];

const quickLinks = [
  {
    title: "Projects to Review",
    description: "Explore student submissions waiting for feedback.",
    href: "/dashboard/mentor/submissions",
    icon: FolderKanban,
  },
  {
    title: "My Reviews",
    description: "View your review history and feedback.",
    href: "/dashboard/mentor/reviews",
    icon: MessageSquareText,
  },
];

export default function MentorDashboardPage() {
  return (
    <main className="min-h-screen min-w-0 w-full bg-slate-50 p-4 text-slate-900 transition-colors duration-300 dark:bg-[#171329] dark:text-white sm:p-6 lg:p-8">
      <div className="mx-auto w-full max-w-7xl space-y-8">
        {/* Welcome banner */}
        <section className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 p-6 text-white shadow-xl shadow-violet-500/10 sm:p-8 lg:p-10">
          <div className="relative z-10 max-w-2xl">
            <div className="mb-4 flex items-center gap-2 text-sm font-medium text-violet-100">
              <Sparkles size={17} />
              Mentor Workspace
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Welcome to your dashboard!
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-violet-100 sm:text-base">
              Review student projects, share meaningful feedback, and help
              learners grow their skills.
            </p>

            <Link
              href="/dashboard/mentor/submissions"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-violet-700 transition hover:bg-violet-50"
            >
              Explore Projects
              <ArrowUpRight size={17} />
            </Link>
          </div>

          <div className="pointer-events-none absolute -right-12 -top-16 -z-0 h-64 w-64 rounded-full border-[35px] border-white/10" />
          <div className="pointer-events-none absolute -bottom-24 right-24 -z-0 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
        </section>

        {/* Overview */}
        <section>
          <div className="mb-4">
            <h2 className="text-xl font-bold">Overview</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Your review activity at a glance
            </p>
          </div>

          <div className="grid min-w-0 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.title}
                  className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-white/10 dark:bg-[#201A35]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {stat.title}
                      </p>
                      <p className="mt-3 text-3xl font-bold">{stat.value}</p>
                    </div>

                    <div className="shrink-0 rounded-xl bg-violet-100 p-3 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
                      <Icon size={22} />
                    </div>
                  </div>

                  <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
                    {stat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Quick actions */}
        <section>
          <h2 className="text-xl font-bold">Quick Actions</h2>
          <p className="mb-4 mt-1 text-sm text-slate-500 dark:text-slate-400">
            Continue working with student submissions
          </p>

          <div className="grid min-w-0 gap-4 md:grid-cols-2">
            {quickLinks.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group flex min-w-0 items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-violet-300 hover:shadow-lg dark:border-white/10 dark:bg-[#201A35] dark:hover:border-violet-400/50 sm:p-6"
                >
                  <div className="shrink-0 rounded-xl bg-violet-100 p-3 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
                    <Icon size={23} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                      {item.description}
                    </p>
                  </div>

                  <ArrowUpRight
                    size={18}
                    className="shrink-0 text-slate-400 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-violet-500"
                  />
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
