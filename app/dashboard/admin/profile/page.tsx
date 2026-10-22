
"use client";

import { useCallback, useEffect, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Mail,
  RefreshCw,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import api from "@/lib/axios";

type AdminProfile = {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt?: string;
};

type ProfileApiResponse = {
  success?: boolean;
  data?: AdminProfile | { user?: AdminProfile };
  user?: AdminProfile;
  message?: string;
};

type ApiError = {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
};

function formatDate(value?: string) {
  if (!value) return "Not available";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Not available";
  }

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function getErrorMessage(err: unknown) {
  const apiError = err as ApiError;

  return (
    apiError.response?.data?.message ||
    apiError.message ||
    "Unable to load your profile. Please try again."
  );
}

function getAdminProfile(
  result: ProfileApiResponse,
): AdminProfile | null {
  const nestedData = result.data;

  let user: AdminProfile | undefined;

  if (result.user) {
    user = result.user;
  } else if (nestedData && "user" in nestedData) {
    user = nestedData.user;
  } else {
    user = nestedData as AdminProfile | undefined;
  }

  if (!user?.id || !user.email) {
    return null;
  }

  return user;
}

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await api.get<ProfileApiResponse>("/auth/me");
      const user = getAdminProfile(response.data);

      if (!user) {
        throw new Error("Could not read your profile information.");
      }

      setProfile(user);
    } catch (err: unknown) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadProfile = async () => {
      try {
        const response = await api.get<ProfileApiResponse>("/auth/me");

        if (cancelled) return;

        const user = getAdminProfile(response.data);

        if (!user) {
          throw new Error("Could not read your profile information.");
        }

        setProfile(user);
      } catch (err: unknown) {
        if (cancelled) return;
        setError(getErrorMessage(err));
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadProfile();

    return () => {
      cancelled = true;
    };
  }, []);

  const initial = profile?.name?.trim().charAt(0).toUpperCase() || "A";

  return (
    <main className="mx-auto min-w-0 max-w-6xl space-y-6 pb-10">
      <header>
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700 dark:border-violet-400/20 dark:bg-violet-500/10 dark:text-violet-300">
          <ShieldCheck size={14} />
          Administrator Account
        </div>

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              Admin Profile
            </h1>
            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400 sm:text-base">
              View your account information and administrator details.
            </p>
          </div>

          <button
            type="button"
            onClick={() => void fetchProfile()}
            disabled={loading}
            className="inline-flex min-h-10 items-center justify-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-violet-300 hover:bg-violet-50 disabled:opacity-50 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200 dark:hover:bg-violet-500/10 sm:self-auto"
          >
            <RefreshCw
              size={16}
              className={loading ? "animate-spin" : ""}
            />
            Refresh
          </button>
        </div>
      </header>

      {loading && (
        <div className="space-y-5" aria-label="Loading profile">
          <div className="h-52 animate-pulse rounded-3xl bg-slate-200 dark:bg-white/[0.06]" />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="h-28 animate-pulse rounded-2xl bg-slate-200 dark:bg-white/[0.06]" />
            <div className="h-28 animate-pulse rounded-2xl bg-slate-200 dark:bg-white/[0.06]" />
          </div>
        </div>
      )}

      {!loading && error && (
        <section
          role="alert"
          className="rounded-2xl border border-rose-200 bg-rose-50 p-6 dark:border-rose-400/20 dark:bg-rose-500/[0.08]"
        >
          <h2 className="font-semibold text-rose-700 dark:text-rose-300">
            Profile could not be loaded
          </h2>

          <p className="mt-2 break-words text-sm text-rose-600 dark:text-rose-300/80">
            {error}
          </p>

          <p className="mt-2 text-xs text-rose-600/80 dark:text-rose-300/70">
            Check that you are logged in and that the /auth/me endpoint
            returns the current user.
          </p>

          <button
            type="button"
            onClick={() => void fetchProfile()}
            className="mt-4 rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700"
          >
            Try again
          </button>
        </section>
      )}

      {!loading && !error && profile && (
        <>
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-violet-600 to-indigo-700 p-6 text-white shadow-xl shadow-violet-500/10 sm:p-9">
            <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/[0.09] blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 left-1/3 h-48 w-48 rounded-full bg-indigo-300/20 blur-3xl" />

            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl border border-white/25 bg-white/15 text-4xl font-bold shadow-inner backdrop-blur-sm">
                {initial}
              </div>

              <div className="min-w-0 flex-1">
                <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                  <CheckCircle2 size={14} />
                  Account loaded
                </div>

                <h2 className="break-words text-2xl font-bold sm:text-3xl">
                  {profile.name || "Administrator"}
                </h2>

                <p className="mt-2 flex min-w-0 items-center gap-2 break-all text-sm text-violet-100">
                  <Mail size={16} className="shrink-0" />
                  {profile.email}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-xs font-semibold">
                    <ShieldCheck size={14} />
                    {profile.role}
                  </span>

                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium">
                    <UserRound size={14} />
                    ReviewFlow Member
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="mb-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Account Information
              </h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Your current account details from ReviewFlow.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <article className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:border-violet-200 dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-violet-400/30 sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
                    <UserRound size={21} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Full Name
                    </p>
                    <p className="mt-1 break-words font-semibold text-slate-900 dark:text-white">
                      {profile.name || "Not available"}
                    </p>
                  </div>
                </div>
              </article>

              <article className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:border-violet-200 dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-violet-400/30 sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300">
                    <Mail size={21} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Email Address
                    </p>
                    <p className="mt-1 break-all font-semibold text-slate-900 dark:text-white">
                      {profile.email}
                    </p>
                  </div>
                </div>
              </article>

              <article className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:border-violet-200 dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-violet-400/30 sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300">
                    <ShieldCheck size={21} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Account Role
                    </p>
                    <p className="mt-1 font-semibold text-slate-900 dark:text-white">
                      {profile.role}
                    </p>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      Assigned by ReviewFlow access permissions
                    </p>
                  </div>
                </div>
              </article>

              <article className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:border-violet-200 dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-violet-400/30 sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300">
                    <CalendarDays size={21} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Member Since
                    </p>
                    <p className="mt-1 font-semibold text-slate-900 dark:text-white">
                      {formatDate(profile.createdAt)}
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </section>

          <section className="rounded-2xl border border-violet-200/80 bg-gradient-to-r from-violet-50 to-indigo-50 p-5 dark:border-violet-400/15 dark:from-violet-500/[0.08] dark:to-indigo-500/[0.05] sm:p-6">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-violet-700 shadow-sm dark:bg-white/10 dark:text-violet-300">
                <Clock3 size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  Account Overview
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  Your profile information is retrieved from your authenticated
                  ReviewFlow account. To change account details, use an
                  authorized profile-management feature when it is available.
                </p>
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  );
}
