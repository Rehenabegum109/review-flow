"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FolderKanban, Plus, RefreshCw } from "lucide-react";
import api from "@/lib/axios";
import { Submission } from "@/app/src/components/dashboard/student/submission-types";
import SubmissionList from "@/app/src/components/dashboard/student/submission-list";


export default function MyProjectsPage() {
  const router = useRouter();

  const [projects, setProjects] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const authResponse = await api.get("/auth/me");
      const user = authResponse.data?.data?.user;

      if (!user) {
        router.replace("/login");
        return;
      }

      if (user.role !== "STUDENT") {
        router.replace("/dashboard");
        return;
      }

      const response = await api.get("/submissions/my");
      const data = response.data?.data;

      setProjects(Array.isArray(data) ? data : []);
    } catch {
      setError("Could not load your projects. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    void fetchProjects();
  }, [fetchProjects]);

  return (
    <main className="space-y-6 p-4 sm:p-6 lg:p-8">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-violet-600 dark:text-violet-400">
            <FolderKanban size={20} />
            <span className="text-sm font-medium">Student Workspace</span>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
            My Projects
          </h1>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Manage your submitted projects and track their status.
          </p>
        </div>

        <Link
          href="/dashboard/student/submission"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
        >
          <Plus size={18} />
          Submit Project
        </Link>
      </header>

      <section className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900 sm:p-6">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <h2 className="font-semibold text-gray-900 dark:text-white">
              Your Submissions
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {projects.length} project(s) submitted
            </p>
          </div>

          <button
            type="button"
            onClick={() => void fetchProjects()}
            disabled={loading}
            aria-label="Refresh projects"
            className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            <RefreshCw
              size={18}
              className={loading ? "animate-spin" : ""}
            />
          </button>
        </div>

        {error ? (
          <div className="py-8 text-center">
            <p className="text-sm text-red-500">{error}</p>
            <button
              type="button"
              onClick={() => void fetchProjects()}
              className="mt-3 text-sm font-medium text-violet-600 hover:underline dark:text-violet-400"
            >
              Try again
            </button>
          </div>
        ) : loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-24 animate-pulse rounded-xl bg-gray-100 dark:bg-gray-800"
              />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 px-5 py-12 text-center dark:border-gray-700">
            <FolderKanban className="mx-auto text-violet-500" size={34} />
            <h3 className="mt-3 font-semibold text-gray-900 dark:text-white">
              No projects yet
            </h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Submit your first project to get started.
            </p>
            <Link
              href="/dashboard/student/submission"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
            >
              <Plus size={16} />
              Submit Project
            </Link>
          </div>
        ) : (
          <SubmissionList submissions={projects} />
        )}
      </section>
    </main>
  );
}