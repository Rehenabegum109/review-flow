
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  GraduationCap,
  ClipboardCheck,
  FolderKanban,
  ShieldCheck,
  ArrowUpRight,
  LoaderCircle,
  RefreshCw,
  LayoutDashboard,
  UserRound,
  AlertCircle,
} from "lucide-react";
import api from "@/lib/axios";

type AdminUser = {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
};

const adminLinks = [
  {
    title: "User Management",
    description: "View and manage student and mentor accounts.",
    href: "/dashboard/admin/users",
    icon: Users,
    color: "from-violet-500 to-purple-600",
  },
  {
    title: "Project Submissions",
    description: "Review submitted projects and their progress.",
    href: "/dashboard/admin/submissions",
    icon: FolderKanban,
    color: "from-blue-500 to-indigo-600",
  },
  {
    title: "Mentors",
    description: "Explore mentor accounts and their information.",
    href: "/dashboard/admin/mentors",
    icon: GraduationCap,
    color: "from-fuchsia-500 to-pink-600",
  },
  {
    title: "Review Activity",
    description: "Track project review activity.",
    href: "/dashboard/admin/reviews",
    icon: ClipboardCheck,
    color: "from-emerald-500 to-teal-600",
  },
];

export default function AdminDashboardPage() {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAdmin = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/auth/me");

      const user =
        response.data?.data?.user ??
        response.data?.data ??
        response.data?.user;

      if (!user || typeof user !== "object") {
        throw new Error("Admin profile information was not found.");
      }

      setAdmin(user as AdminUser);
    } catch (err: unknown) {
      let message = "Could not load your admin profile.";

      if (err instanceof Error && err.message) {
        message = err.message;
      }

      if (
        typeof err === "object" &&
        err !== null &&
        "response" in err
      ) {
        const response = (
          err as {
            response?: {
              data?: { message?: string };
            };
          }
        ).response;

        message = response?.data?.message || message;
      }

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchAdmin();
  }, []);

  const displayName = admin?.name || "Admin";
  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return (
    <main className="min-h-screen min-w-0 bg-slate-50 px-4 py-6 text-slate-900 transition-colors duration-300 dark:bg-[#171329] dark:text-white sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto w-full max-w-7xl space-y-7">
        {/* Header */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-violet-600 dark:text-violet-400">
              <LayoutDashboard size={17} />
              Admin Workspace
            </div>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Admin Dashboard
            </h1>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 sm:text-base">
              Manage your platform and monitor project review activity.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start rounded-2xl border border-slate-200 bg-white px-4 py-3 dark:border-white/10 dark:bg-[#211b38] sm:self-auto">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 font-bold text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
              {loading ? (
                <LoaderCircle className="animate-spin" size={20} />
              ) : (
                initials || <UserRound size={20} />
              )}
            </div>

            <div className="min-w-0">
              <p className="max-w-44 truncate text-sm font-bold">
                {loading ? "Loading profile..." : displayName}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Administrator
              </p>
            </div>
          </div>
        </header>

        {/* Welcome banner */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 p-6 text-white shadow-xl shadow-violet-500/10 sm:p-9">
          <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-fuchsia-300/20 blur-3xl" />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold">
                <ShieldCheck size={15} />
                Admin Control Center
              </div>

              <h2 className="text-2xl font-bold sm:text-3xl">
                Welcome back, {loading ? "Admin" : displayName}!
              </h2>

              <p className="mt-3 text-sm leading-6 text-violet-100 sm:text-base">
                Keep ReviewFlow organized, help mentors and students stay
                connected, and monitor project reviews from one place.
              </p>
            </div>

            <div className="flex h-24 w-24 shrink-0 items-center justify-center self-start rounded-3xl border border-white/20 bg-white/10 sm:h-28 sm:w-28">
              <ShieldCheck size={52} strokeWidth={1.4} />
            </div>
          </div>
        </section>

        {/* Profile error */}
        {error && (
          <section
            role="alert"
            className="flex flex-col gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 dark:border-rose-400/20 dark:bg-rose-500/10 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 shrink-0 text-rose-600 dark:text-rose-300" size={20} />
              <div>
                <p className="font-semibold text-rose-700 dark:text-rose-200">
                  Profile could not be loaded
                </p>
                <p className="mt-1 text-sm text-rose-600 dark:text-rose-300">
                  {error}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => void fetchAdmin()}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-rose-700"
            >
              <RefreshCw size={16} />
              Retry
            </button>
          </section>
        )}

        {/* Statistics placeholder: no fake numbers */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              title: "Total Students",
              description: "Student accounts across the platform",
              icon: GraduationCap,
              color: "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300",
            },
            {
              title: "Total Mentors",
              description: "Mentor accounts across the platform",
              icon: Users,
              color: "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300",
            },
            {
              title: "Project Submissions",
              description: "Projects submitted by students",
              icon: FolderKanban,
              color: "bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-500/15 dark:text-fuchsia-300",
            },
            {
              title: "Pending Reviews",
              description: "Submissions awaiting review",
              icon: ClipboardCheck,
              color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-[#211b38]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${item.color}`}>
                    <Icon size={22} />
                  </div>

                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500 dark:bg-white/5 dark:text-slate-400">
                    API needed
                  </span>
                </div>

                <h3 className="mt-5 text-base font-semibold">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-5 text-slate-500 dark:text-slate-400">
                  {item.description}
                </p>

                <p className="mt-4 border-t border-slate-100 pt-3 text-xs text-slate-400 dark:border-white/10 dark:text-slate-500">
                  Connect backend to display real count
                </p>
              </article>
            );
          })}
        </section>

        {/* Admin navigation */}
        <section>
          <div className="mb-5">
            <h2 className="text-xl font-bold">Management Center</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Choose a section to manage ReviewFlow.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {adminLinks.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group flex min-w-0 gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-violet-300 hover:shadow-lg hover:shadow-violet-500/5 dark:border-white/10 dark:bg-[#211b38] dark:hover:border-violet-400/40 sm:p-6"
                >
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} text-white shadow-lg`}>
                    <Icon size={23} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-bold">{item.title}</h3>
                      <ArrowUpRight
                        size={18}
                        className="shrink-0 text-slate-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-violet-600 dark:group-hover:text-violet-400"
                      />
                    </div>

                    <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                      {item.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Account information */}
        {!loading && admin && (
          <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-[#211b38] sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
                <UserRound size={20} />
              </div>
              <div>
                <h2 className="font-bold">Account Information</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Information returned by your authenticated API.
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Name
                </p>
                <p className="mt-1 break-words text-sm font-semibold">
                  {admin.name || "Not provided"}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Email
                </p>
                <p className="mt-1 break-all text-sm font-semibold">
                  {admin.email || "Not provided"}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Role
                </p>
                <p className="mt-1 text-sm font-semibold">
                  {admin.role || "ADMIN"}
                </p>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
