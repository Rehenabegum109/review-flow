
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  UserRound,
  Mail,
  ShieldCheck,
  GraduationCap,
  LoaderCircle,
  RefreshCw,
  MessageSquareText,
} from "lucide-react";
import api from "@/lib/axios";
import { toast } from "sonner";

type MentorProfileData = {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
};

export default function MentorProfilePage() {
  const [profile, setProfile] = useState<MentorProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/auth/me");

      const user = response.data?.data?.user ?? response.data?.data ?? response.data?.user;

      if (!user || typeof user !== "object") {
        throw new Error("Could not load your profile information.");
      }

      setProfile(user);
    } catch (err: unknown) {
      const message =
        typeof err === "object" &&
        err !== null &&
        "response" in err
          ? (
              err as {
                response?: { data?: { message?: string } };
              }
            ).response?.data?.message
          : undefined;

      setError(message || "Unable to load your profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchProfile();
  }, []);

  const displayName = profile?.name || "Mentor";
  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return (
    <main className="min-h-screen min-w-0 bg-slate-50 px-4 py-6 text-slate-900 transition-colors duration-300 dark:bg-[#171329] dark:text-white sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <Link
          href="/dashboard/mentor"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-violet-600 dark:text-slate-300 dark:hover:text-violet-400"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 p-6 text-white shadow-xl shadow-violet-500/10 sm:p-9">
          <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-16 left-1/3 h-40 w-40 rounded-full bg-fuchsia-300/20 blur-3xl" />

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl border border-white/20 bg-white/15 text-2xl font-bold shadow-inner">
              {initials || <UserRound size={34} />}
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-100">
                Mentor Account
              </p>
              <h1 className="mt-2 break-words text-2xl font-bold sm:text-3xl">
                {loading ? "Loading profile..." : displayName}
              </h1>
              <p className="mt-2 text-sm text-violet-100">
                Manage your account information and mentoring workspace.
              </p>
            </div>

            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold">
              <ShieldCheck size={17} />
              Mentor
            </div>
          </div>
        </section>

        {loading ? (
          <div className="flex min-h-52 items-center justify-center gap-3 rounded-3xl border border-slate-200 bg-white dark:border-white/10 dark:bg-[#211b38]">
            <LoaderCircle className="animate-spin text-violet-600" size={24} />
            <span className="text-sm text-slate-500 dark:text-slate-300">
              Loading your profile...
            </span>
          </div>
        ) : error ? (
          <section className="rounded-3xl border border-rose-200 bg-white p-6 text-center dark:border-rose-400/20 dark:bg-[#211b38]">
            <p className="text-sm text-rose-600 dark:text-rose-300">
              {error}
            </p>
            <button
              type="button"
              onClick={() => void fetchProfile()}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700"
            >
              <RefreshCw size={16} />
              Try Again
            </button>
          </section>
        ) : (
          <>
            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#211b38] sm:p-7">
              <div className="mb-6">
                <h2 className="text-lg font-bold sm:text-xl">
                  Personal Information
                </h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Your information from your ReviewFlow account.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 p-4 dark:border-white/10">
                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <UserRound size={17} />
                    Full Name
                  </div>
                  <p className="mt-3 break-words font-semibold">
                    {profile?.name || "Not provided"}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 p-4 dark:border-white/10">
                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <Mail size={17} />
                    Email Address
                  </div>
                  <p className="mt-3 break-all font-semibold">
                    {profile?.email || "Not provided"}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 p-4 dark:border-white/10">
                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <ShieldCheck size={17} />
                    Account Role
                  </div>
                  <p className="mt-3 font-semibold">
                    {profile?.role || "MENTOR"}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 p-4 dark:border-white/10">
                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <GraduationCap size={17} />
                    Workspace
                  </div>
                  <p className="mt-3 font-semibold">ReviewFlow Mentor</p>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-violet-200 bg-violet-50 p-5 dark:border-violet-400/20 dark:bg-violet-500/10 sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300">
                  <MessageSquareText size={23} />
                </div>

                <div className="flex-1">
                  <h2 className="font-bold">Ready to review projects?</h2>
                  <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    Open pending submissions and provide useful feedback
                    to help students improve.
                  </p>
                </div>

                <Link
                  href="/dashboard/mentor/submissions"
                  className="inline-flex shrink-0 items-center justify-center rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-700"
                >
                  View Submissions
                </Link>
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
