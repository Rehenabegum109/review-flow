
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FolderKanban,
  MessageSquareText,
  Clock3,
  ArrowUpRight,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import api from "@/lib/axios";

type DashboardStats = {
  pendingReviews: number;
  completedReviews: number;
  availableProjects: number;
};

const initialStats: DashboardStats = {
  pendingReviews: 0,
  completedReviews: 0,
  availableProjects: 0,
};

const quickLinks = [
  {
    title: "Projects to Review",
    description:
      "Explore student submissions waiting for feedback.",
    href: "/dashboard/mentor/submissions",
    icon: FolderKanban,
  },
  {
    title: "My Reviews",
    description:
      "View your review history and feedback.",
    href: "/dashboard/mentor/reviews",
    icon: MessageSquareText,
  },
];

export default function MentorDashboardPage() {
  const router = useRouter();

  const [stats, setStats] =
    useState<DashboardStats>(initialStats);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      // Check authentication and user role.
      const authResponse = await api.get("/auth/me");
      const user = authResponse.data?.data?.user;

      if (!user) {
        router.replace("/login");
        return;
      }

      if (user.role !== "MENTOR") {
        router.replace("/dashboard");
        return;
      }

      // Fetch real statistics from the backend.
      const response = await api.get("/reviews/mentor/stats");
      const data = response.data?.data;

      if (
        typeof data?.pendingReviews !== "number" ||
        typeof data?.completedReviews !== "number" ||
        typeof data?.availableProjects !== "number"
      ) {
        throw new Error("INVALID_DASHBOARD_STATS");
      }

      setStats({
        pendingReviews: data.pendingReviews,
        completedReviews: data.completedReviews,
        availableProjects: data.availableProjects,
      });
    } catch (err: unknown) {
      const status = (
        err as { response?: { status?: number } }
      ).response?.status;

      if (status === 401) {
        router.replace("/login");
        return;
      }

      if (status === 403) {
        router.replace("/dashboard");
        return;
      }

      console.error("Mentor dashboard error:", err);

      setError(
        "Unable to load dashboard data. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    void fetchDashboardData();
  }, [fetchDashboardData]);

  const statCards = [
    {
      title: "Pending Reviews",
      value: stats.pendingReviews,
      description: "Projects waiting for review",
      icon: Clock3,
    },
    {
      title: "Completed Reviews",
      value: stats.completedReviews,
      description: "Reviews you have completed",
      icon: MessageSquareText,
    },
    {
      title: "Available Projects",
      value: stats.availableProjects,
      description: "Projects ready to review",
      icon: FolderKanban,
    },
  ];

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
              Review student projects, share meaningful feedback,
              and help learners grow their skills.
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

          {/* Error message */}
          {error && (
            <div
              role="alert"
              className="mb-4 flex flex-col gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950/30 sm:flex-row sm:items-center sm:justify-between"
            >
              <p className="text-sm text-red-600 dark:text-red-400">
                {error}
              </p>

              <button
                type="button"
                onClick={() => void fetchDashboardData()}
                disabled={loading}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <RefreshCw
                  size={16}
                  className={loading ? "animate-spin" : ""}
                />
                Try again
              </button>
            </div>
          )}

          {/* Statistics cards */}
          <div className="grid min-w-0 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {statCards.map((stat) => {
              const Icon = stat.icon;

              return (
                <article
                  key={stat.title}
                  className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md dark:border-white/10 dark:bg-[#201A35]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {stat.title}
                      </p>

                      <p
                        aria-live="polite"
                        className="mt-3 text-3xl font-bold tabular-nums"
                      >
                        {loading ? (
                          <span className="inline-block h-9 w-12 animate-pulse rounded-lg bg-slate-200 dark:bg-white/10" />
                        ) : error ? (
                          "—"
                        ) : (
                          stat.value
                        )}
                      </p>
                    </div>

                    <div className="shrink-0 rounded-xl bg-violet-100 p-3 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
                      <Icon size={22} />
                    </div>
                  </div>

                  <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
                    {stat.description}
                  </p>
                </article>
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
                    <h3 className="font-semibold">
                      {item.title}
                    </h3>

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
