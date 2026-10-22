
"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, RefreshCw } from "lucide-react";

import api from "@/lib/axios";
import { Submission } from "@/app/src/components/dashboard/student/submission-types";
import SubmissionForm from "@/app/src/components/dashboard/student/submission-form";

export default function StudentSubmissionPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAuth = useCallback(async () => {
    setError("");
    setLoading(true);

    try {
      const response = await api.get("/auth/me");
      const user = response.data?.data?.user;

      if (!user) {
        router.replace("/login");
        return;
      }

      if (user.role !== "STUDENT") {
        router.replace("/dashboard");
      }
    } catch {
      router.replace("/login");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    void fetchAuth();
  }, [fetchAuth]);

  const handleSubmissionCreated = (_submission: Submission) => {
    // Submission is saved by the form through the backend API.
    // The My Projects list is displayed on its own page.
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 transition-colors dark:bg-[#171329] dark:text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <header className="rounded-3xl border border-violet-100 bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 p-6 text-white shadow-lg shadow-violet-500/10 sm:p-8">
          <p className="text-sm font-medium text-violet-100">
            STUDENT WORKSPACE
          </p>

          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
            Submit Your Project
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-violet-100 sm:text-base">
            Share your project with the ReviewFlow community and get
            meaningful feedback to improve your skills.
          </p>
        </header>

        {error && (
          <div
            role="alert"
            className="flex flex-col gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700 dark:border-rose-400/20 dark:bg-rose-500/10 dark:text-rose-300 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-start gap-2">
              <AlertCircle size={18} className="mt-0.5 shrink-0" />
              <p>{error}</p>
            </div>

            <button
              type="button"
              onClick={() => void fetchAuth()}
              disabled={loading}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-rose-200 px-3 py-2 font-medium transition hover:bg-rose-100 disabled:opacity-50 dark:border-rose-400/20 dark:hover:bg-rose-500/10"
            >
              <RefreshCw
                size={15}
                className={loading ? "animate-spin" : ""}
              />
              Retry
            </button>
          </div>
        )}

        <section id="submit-project">
          <SubmissionForm
            onSubmissionCreated={handleSubmissionCreated}
          />
        </section>
      </div>
    </main>
  );
}
