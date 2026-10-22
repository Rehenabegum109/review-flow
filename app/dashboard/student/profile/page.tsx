
"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  UserRound,
  Mail,
  ShieldCheck,
  CalendarDays,
  ArrowLeft,
  LoaderCircle,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

import api from "@/lib/axios";

type StudentProfile = {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
  createdAt?: string;
};

type ProfileResponse = {
  data?: {
    user?: StudentProfile;
  };
  user?: StudentProfile;
};

function getStudentProfile(
  response: ProfileResponse,
): StudentProfile | null {
  const user = response.data?.user ?? response.user ?? null;

  if (!user || typeof user !== "object") {
    return null;
  }

  return user;
}

export default function StudentProfilePage() {
  const router = useRouter();

  const [student, setStudent] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await api.get<ProfileResponse>("/auth/me");
      const user = getStudentProfile(response.data);

      if (!user) {
        router.replace("/login");
        return;
      }

      if (user.role?.toUpperCase() !== "STUDENT") {
        router.replace("/dashboard");
        return;
      }

      setStudent(user);
    } catch (err: unknown) {
      const status =
        typeof err === "object" && err !== null && "response" in err
          ? (
              err as {
                response?: { status?: number };
              }
            ).response?.status
          : undefined;

      if (status === 401) {
        router.replace("/login");
      } else {
        setError("Unable to load your profile. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    let cancelled = false;

    async function loadProfile() {
      try {
        const response = await api.get<ProfileResponse>("/auth/me");

        if (cancelled) return;

        const user = getStudentProfile(response.data);

        if (!user) {
          router.replace("/login");
          return;
        }

        if (user.role?.toUpperCase() !== "STUDENT") {
          router.replace("/dashboard");
          return;
        }

        setStudent(user);
        setError("");
      } catch (err: unknown) {
        if (cancelled) return;

        const status =
          typeof err === "object" && err !== null && "response" in err
            ? (
                err as {
                  response?: { status?: number };
                }
              ).response?.status
            : undefined;

        if (status === 401) {
          router.replace("/login");
        } else {
          setError("Unable to load your profile. Please try again.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadProfile();

    return () => {
      cancelled = true;
    };
  }, [router]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-[#171329]">
        <div className="flex flex-col items-center gap-3 text-violet-600 dark:text-violet-300">
          <LoaderCircle size={36} className="animate-spin" />
          <p className="text-sm font-medium">
            Loading student profile...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 transition-colors dark:bg-[#171329] dark:text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <Link
          href="/dashboard/student"
          className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-violet-100 hover:text-violet-700 dark:text-slate-300 dark:hover:bg-white/10"
        >
          <ArrowLeft size={17} />
          Back to Dashboard
        </Link>

        <section className="overflow-hidden rounded-3xl border border-violet-100 bg-white shadow-sm dark:border-white/10 dark:bg-[#201A35]">
          <div className="bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 px-6 py-8 text-white sm:px-9 sm:py-10">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl border border-white/30 bg-white/15 shadow-inner">
                <UserRound size={40} />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-semibold tracking-wider text-violet-100">
                  STUDENT ACCOUNT
                </p>

                <h1 className="mt-2 break-words text-3xl font-bold sm:text-4xl">
                  {student?.name || "Student"}
                </h1>

                <p className="mt-2 break-words text-sm text-violet-100 sm:text-base">
                  {student?.email || "Your account information"}
                </p>
              </div>

              <div className="sm:ml-auto">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-2 text-sm font-medium">
                  <ShieldCheck size={16} />
                  Student
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-9">
            {error ? (
              <div
                role="alert"
                className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-rose-700 dark:border-rose-400/20 dark:bg-rose-500/10 dark:text-rose-300"
              >
                <div className="flex items-start gap-3">
                  <AlertCircle size={20} className="mt-0.5 shrink-0" />
                  <p className="text-sm">{error}</p>
                </div>

                <button
                  type="button"
                  onClick={() => void fetchProfile()}
                  disabled={loading}
                  className="mt-4 inline-flex items-center gap-2 rounded-xl border border-rose-200 px-4 py-2 text-sm font-medium transition hover:bg-rose-100 disabled:opacity-50 dark:border-rose-400/20 dark:hover:bg-rose-500/10"
                >
                  <RefreshCw
                    size={16}
                    className={loading ? "animate-spin" : ""}
                  />
                  Try Again
                </button>
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h2 className="text-xl font-bold">
                      Profile Information
                    </h2>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      Your registered student account details.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => void fetchProfile()}
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-violet-200 px-4 py-2 text-sm font-medium text-violet-700 transition hover:bg-violet-50 disabled:opacity-50 dark:border-violet-400/20 dark:text-violet-300 dark:hover:bg-violet-400/10 sm:self-auto"
                  >
                    <RefreshCw
                      size={15}
                      className={loading ? "animate-spin" : ""}
                    />
                    Refresh
                  </button>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <ProfileCard
                    icon={<UserRound size={20} />}
                    label="Full Name"
                    value={student?.name || "Not provided"}
                  />

                  <ProfileCard
                    icon={<Mail size={20} />}
                    label="Email Address"
                    value={student?.email || "Not provided"}
                  />

                  <ProfileCard
                    icon={<ShieldCheck size={20} />}
                    label="Account Role"
                    value={student?.role || "STUDENT"}
                  />

                  <ProfileCard
                    icon={<CalendarDays size={20} />}
                    label="Member Since"
                    value={
                      student?.createdAt &&
                      !Number.isNaN(Date.parse(student.createdAt))
                        ? new Date(student.createdAt).toLocaleDateString(
                            "en-GB",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            },
                          )
                        : "Not available"
                    }
                  />
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

function ProfileCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-colors dark:border-white/10 dark:bg-white/[0.03]">
      <div className="flex items-center gap-3">
        <div className="shrink-0 rounded-xl bg-violet-100 p-3 text-violet-700 dark:bg-violet-300/10 dark:text-violet-300">
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {label}
          </p>
          <p className="mt-1 break-words font-semibold">{value}</p>
        </div>
      </div>
    </div>
  );
}
