"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  FileText,
  MessageSquareText,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import api from "@/lib/axios";

type UserProfile = {
  id: string;
  name: string;
  email: string;
  role: "STUDENT" | "MENTOR" | "ADMIN";
};

type DashboardItem = {
  id: string;
  title?: string;
  name?: string;
  status?: string;
  createdAt?: string;
};

type ApiState<T> = {
  data: T[];
  loading: boolean;
  error: boolean;
};

function getItems(payload: unknown): DashboardItem[] {
  if (!payload || typeof payload !== "object") return [];

  const response = payload as {
    data?: unknown;
    projects?: unknown;
    reviews?: unknown;
  };

  const data = response.data;

  if (Array.isArray(data)) return data as DashboardItem[];
  if (data && typeof data === "object") {
    const nested = data as {
      projects?: unknown;
      reviews?: unknown;
      items?: unknown;
      results?: unknown;
    };

    if (Array.isArray(nested.projects))
      return nested.projects as DashboardItem[];
    if (Array.isArray(nested.reviews))
      return nested.reviews as DashboardItem[];
    if (Array.isArray(nested.items))
      return nested.items as DashboardItem[];
    if (Array.isArray(nested.results))
      return nested.results as DashboardItem[];
  }

  if (Array.isArray(response.projects))
    return response.projects as DashboardItem[];
  if (Array.isArray(response.reviews))
    return response.reviews as DashboardItem[];

  return [];
}

function formatStatus(status?: string) {
  if (!status) return "Submitted";
  return status
    .toLowerCase()
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default function StudentDashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState<UserProfile | null>(null);
  const [userLoading, setUserLoading] = useState(true);
  const [profileError, setProfileError] = useState(false);

  const [projects, setProjects] = useState<ApiState<DashboardItem>>({
    data: [],
    loading: true,
    error: false,
  });

  const [reviews, setReviews] = useState<ApiState<DashboardItem>>({
    data: [],
    loading: true,
    error: false,
  });

  useEffect(() => {
    let active = true;

    async function loadDashboard() {
      try {
        const response = await api.get("/auth/me");
        const currentUser = response.data?.data?.user ?? null;

        if (!active) return;

        if (!currentUser) {
          router.replace("/login");
          return;
        }

        if (currentUser.role !== "STUDENT") {
          router.replace("/dashboard");
          return;
        }

        setUser(currentUser);
      } catch (error: unknown) {
        const err = error as {
          response?: { status?: number };
        };

        if (!active) return;

        if (err.response?.status === 401) {
          router.replace("/login");
          return;
        }

        setProfileError(true);
      } finally {
        if (active) setUserLoading(false);
      }

      // Replace these paths with the exact existing backend routes.
      const requests = [
        {
          url: "/projects/my-projects",
          setState: setProjects,
        },
        {
          url: "/reviews/my-reviews",
          setState: setReviews,
        },
      ];

      await Promise.all(
        requests.map(async ({ url, setState }) => {
          try {
            const response = await api.get(url);
            if (active) {
              setState({
                data: getItems(response.data),
                loading: false,
                error: false,
              });
            }
          } catch {
            if (active) {
              setState({
                data: [],
                loading: false,
                error: true,
              });
            }
          }
        }),
      );
    }

    loadDashboard();

    return () => {
      active = false;
    };
  }, [router]);

  if (userLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-slate-50 dark:bg-[#171329]">
        <RefreshCw className="animate-spin text-violet-600" size={28} />
        <span className="ml-3 text-sm text-slate-600 dark:text-slate-300">
          Loading your dashboard...
        </span>
      </div>
    );
  }

  if (profileError || !user) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="text-slate-700 dark:text-slate-200">
          Unable to load your account information.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="rounded-xl bg-violet-600 px-5 py-2.5 text-white hover:bg-violet-700"
        >
          Try again
        </button>
      </div>
    );
  }

  const firstName = user.name?.trim().split(/\s+/)[0] || "Student";

  const stats = [
    {
      label: "My Projects",
      value: projects.loading
        ? "—"
        : projects.error
          ? "—"
          : projects.data.length,
      icon: FileText,
      color:
        "bg-blue-50 text-blue-600 dark:bg-blue-400/10 dark:text-blue-300",
      href: "/dashboard/student/submission",
    },
    {
      label: "My Reviews",
      value: reviews.loading
        ? "—"
        : reviews.error
          ? "—"
          : reviews.data.length,
      icon: MessageSquareText,
      color:
        "bg-violet-50 text-violet-600 dark:bg-violet-400/10 dark:text-violet-300",
      href: "/dashboard/student/reviews",
    },
    {
      label: "Pending Projects",
      value: projects.loading || projects.error
        ? "—"
        : projects.data.filter((project) =>
            ["PENDING", "SUBMITTED", "IN_REVIEW"].includes(
              project.status?.toUpperCase() ?? "",
            ),
          ).length,
      icon: Clock3,
      color:
        "bg-amber-50 text-amber-600 dark:bg-amber-400/10 dark:text-amber-300",
      href: "/dashboard/student/submission",
    },
    {
      label: "Completed Projects",
      value: projects.loading || projects.error
        ? "—"
        : projects.data.filter((project) =>
            ["COMPLETED", "APPROVED", "REVIEWED"].includes(
              project.status?.toUpperCase() ?? "",
            ),
          ).length,
      icon: CheckCircle2,
      color:
        "bg-emerald-50 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-300",
      href: "/dashboard/student/submission",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-900 transition-colors dark:bg-[#171329] dark:text-white sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto w-full max-w-7xl space-y-8">
        {/* Page heading */}
        <header>
          <p className="mb-2 text-sm font-medium text-violet-600 dark:text-violet-300">
            Student Workspace
          </p>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Dashboard Overview
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Track your projects, explore feedback, and keep learning.
          </p>
        </header>

        {/* Welcome banner */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-700 via-violet-600 to-indigo-600 p-6 text-white shadow-xl shadow-violet-900/10 sm:p-9">
          <div className="pointer-events-none absolute -right-12 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-20 right-1/3 h-48 w-48 rounded-full bg-fuchsia-400/20 blur-3xl" />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium">
                <Sparkles size={14} />
                Your learning journey starts here
              </div>

              <h2 className="text-2xl font-bold sm:text-3xl">
                Welcome back, {firstName}!
              </h2>

              <p className="mt-3 max-w-lg text-sm leading-6 text-violet-100 sm:text-base">
                Keep building, keep learning, and turn feedback into progress.
                Your projects and reviews are all in one place.
              </p>

              <Link
                href="/dashboard/student/submission"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-violet-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-violet-50"
              >
                View my projects
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="hidden h-28 w-28 shrink-0 items-center justify-center rounded-3xl border border-white/20 bg-white/10 sm:flex">
              <BookOpen size={52} strokeWidth={1.5} />
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section>
          <div className="mb-4">
            <h2 className="text-lg font-bold">Your Overview</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              A quick look at your current activity.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <Link
                  key={stat.label}
                  href={stat.href}
                  className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-900/5 dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-violet-400/30"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        {stat.label}
                      </p>
                      <p className="mt-3 text-3xl font-bold tracking-tight">
                        {stat.value}
                      </p>
                    </div>

                    <div className={`rounded-xl p-3 ${stat.color}`}>
                      <Icon size={22} />
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-1 text-xs font-medium text-violet-600 dark:text-violet-300">
                    View details
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Recent projects */}
        <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.04] sm:p-6">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold">Recent Projects</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Your latest project submissions.
              </p>
            </div>
            <Link
              href="/dashboard/student/submission"
              className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-violet-600 hover:text-violet-700 dark:text-violet-300"
            >
              View all <ArrowRight size={15} />
            </Link>
          </div>

          {projects.loading ? (
            <p className="py-8 text-center text-sm text-slate-500">
              Loading projects...
            </p>
          ) : projects.error ? (
            <p className="rounded-xl bg-amber-50 p-4 text-sm text-amber-800 dark:bg-amber-400/10 dark:text-amber-200">
              Projects could not be loaded. Check your projects API route.
            </p>
          ) : projects.data.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 px-4 py-10 text-center dark:border-white/15">
              <FileText className="mx-auto mb-3 text-slate-400" size={28} />
              <p className="font-medium">No projects yet</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Your submitted projects will appear here.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-white/10">
              {projects.data.slice(0, 4).map((project) => (
                <div
                  key={project.id}
                  className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-violet-50 p-3 text-violet-600 dark:bg-violet-400/10 dark:text-violet-300">
                      <FileText size={20} />
                    </div>
                    <div>
                      <p className="font-semibold">
                        {project.title || project.name || "Untitled project"}
                      </p>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        {project.createdAt
                          ? new Date(project.createdAt).toLocaleDateString()
                          : "Submission"}
                      </p>
                    </div>
                  </div>
                  <span className="w-fit rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700 dark:bg-violet-400/10 dark:text-violet-200">
                    {formatStatus(project.status)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Recent reviews */}
        <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.04] sm:p-6">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold">Recent Reviews</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Feedback and review activity.
              </p>
            </div>
            <Link
              href="/dashboard/student/reviews"
              className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-violet-600 hover:text-violet-700 dark:text-violet-300"
            >
              View all <ArrowRight size={15} />
            </Link>
          </div>

          {reviews.loading ? (
            <p className="py-8 text-center text-sm text-slate-500">
              Loading reviews...
            </p>
          ) : reviews.error ? (
            <p className="rounded-xl bg-amber-50 p-4 text-sm text-amber-800 dark:bg-amber-400/10 dark:text-amber-200">
              Reviews could not be loaded. Check your reviews API route.
            </p>
          ) : reviews.data.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 px-4 py-10 text-center dark:border-white/15">
              <MessageSquareText
                className="mx-auto mb-3 text-slate-400"
                size={28}
              />
              <p className="font-medium">No reviews yet</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Reviews and feedback will appear here when available.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-white/10">
              {reviews.data.slice(0, 4).map((review) => (
                <div
                  key={review.id}
                  className="flex items-center gap-3 py-4"
                >
                  <div className="rounded-xl bg-blue-50 p-3 text-blue-600 dark:bg-blue-400/10 dark:text-blue-300">
                    <MessageSquareText size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">
                      {review.title || review.name || "Project review"}
                    </p>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      {review.createdAt
                        ? new Date(review.createdAt).toLocaleDateString()
                        : "Review feedback"}
                    </p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-white/10 dark:text-slate-300">
                    {formatStatus(review.status)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Account information */}
        <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.04] sm:p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-300">
              <CheckCircle2 size={21} />
            </div>
            <div>
              <h2 className="font-bold">Account Information</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Your authenticated profile.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-4 dark:bg-white/[0.04]">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Full name
              </p>
              <p className="mt-1 font-semibold">{user.name}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4 dark:bg-white/[0.04]">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Email address
              </p>
              <p className="mt-1 break-all font-semibold">{user.email}</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}