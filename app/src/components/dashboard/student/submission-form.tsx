
"use client";
import { toast } from "sonner";
import { useState, type FormEvent } from "react";
import {
  ExternalLink,
  Send,
  Loader2,
  AlertCircle,
  CheckCircle2,
  FileText,
  Code2,
} from "lucide-react";
import api from "@/lib/axios";
import {
  initialSubmissionForm,
  type SubmissionFormData,
  type Submission,
} from "./submission-types";

type SubmissionFormProps = {
  onSubmissionCreated: (submission: Submission) => void;
};

export default function SubmissionForm({
  onSubmissionCreated,
}: SubmissionFormProps) {
  const [form, setForm] =
    useState<SubmissionFormData>(initialSubmissionForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const updateField = (
    field: keyof SubmissionFormData,
    value: string,
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
    setError("");
    setSuccess("");
  };

  const validateForm = () => {
    const title = form.title.trim();
    const description = form.description.trim();
    const githubUrl = form.githubUrl.trim();
    const liveUrl = form.liveUrl.trim();

    if (!title || !description || !githubUrl) {
      return "Please fill in all required fields.";
    }

    const githubPattern =
      /^https:\/\/github\.com\/[^/\s]+\/[^/\s]+\/?$/i;

    if (!githubPattern.test(githubUrl)) {
      return "Enter a valid GitHub repository URL, e.g. https://github.com/username/repository.";
    }

    if (liveUrl) {
      try {
        const parsedUrl = new URL(liveUrl);

        if (!["http:", "https:"].includes(parsedUrl.protocol)) {
          return "The live demo URL must begin with http:// or https://.";
        }
      } catch {
        return "Please enter a valid live demo URL.";
      }
    }

    return "";
  };

 const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  setError("");
  setSuccess("");

  const validationError = validateForm();

  if (validationError) {
    setError(validationError);
    return;
  }

  setSubmitting(true);

  try {
    const response = await api.post("/submissions", {
      title: form.title.trim(),
      description: form.description.trim(),
      githubUrl: form.githubUrl.trim(),
      liveUrl: form.liveUrl.trim() || undefined,
    });

    const createdSubmission = response.data?.data;

    if (!createdSubmission) {
      throw new Error("The server did not return the created submission.");
    }

    onSubmissionCreated(createdSubmission);
    setForm(initialSubmissionForm);
    setSuccess("");

    toast.success("Project submitted successfully!", {
      description: "Your project has been submitted for review.",
    });
  } catch (err: unknown) {
    if (
      typeof err === "object" &&
      err !== null &&
      "response" in err
    ) {
      const response = (
        err as {
          response?: {
            data?: { message?: string };
            status?: number;
          };
        }
      ).response;

      setError(
        response?.data?.message ||
          (response?.status === 401
            ? "Your session has expired. Please log in again."
            : "Could not submit your project. Please try again."),
      );
    } else {
      setError(
        err instanceof Error
          ? err.message
          : "Could not submit your project. Please try again.",
      );
    }
  } finally {
    setSubmitting(false);
  }
};

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 dark:border-white/10 dark:bg-[#171329] dark:text-white dark:placeholder:text-slate-500";

  return (
    <section
      id="submit-project"
      className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#211b38] sm:p-8"
    >
      <div className="mb-7 flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
          <FileText size={22} />
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Submit a new project
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Share your project details and repository links.
          </p>
        </div>
      </div>

      {error && (
        <div
          role="alert"
          className="mb-5 flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700 dark:border-rose-400/20 dark:bg-rose-500/10 dark:text-rose-300"
        >
          <AlertCircle size={18} className="mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div
          role="status"
          className="mb-5 flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-500/10 dark:text-emerald-300"
        >
          <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="submission-title"
            className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
          >
            Project title <span className="text-rose-500">*</span>
          </label>

          <input
            id="submission-title"
            name="title"
            required
            maxLength={150}
            value={form.title}
            onChange={(event) => updateField("title", event.target.value)}
            placeholder="e.g. Personal Portfolio Website"
            className={inputClass}
          />
        </div>

        <div>
          <label
            htmlFor="submission-description"
            className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
          >
            Project description <span className="text-rose-500">*</span>
          </label>

          <textarea
            id="submission-description"
            name="description"
            required
            rows={5}
            maxLength={5000}
            value={form.description}
            onChange={(event) =>
              updateField("description", event.target.value)
            }
            placeholder="Describe your project, features, technologies, and what you learned..."
            className={`${inputClass} resize-y`}
          />

          <p className="mt-1 text-right text-xs text-slate-400">
            {form.description.length}/5000
          </p>
        </div>

        <div>
          <label
            htmlFor="submission-github"
            className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200"
          >
           <Code2 size={17} />
            GitHub repository URL <span className="text-rose-500">*</span>
          </label>

          <input
            id="submission-github"
            name="githubUrl"
            type="url"
            required
            value={form.githubUrl}
            onChange={(event) => updateField("githubUrl", event.target.value)}
            placeholder="https://github.com/username/repository"
            className={inputClass}
          />
        </div>

        <div>
          <label
            htmlFor="submission-live"
            className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200"
          >
            <ExternalLink size={17} />
            Live demo URL
            <span className="font-normal text-slate-400">(optional)</span>
          </label>

          <input
            id="submission-live"
            name="liveUrl"
            type="url"
            value={form.liveUrl}
            onChange={(event) => updateField("liveUrl", event.target.value)}
            placeholder="https://your-project.vercel.app"
            className={inputClass}
          />
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">
            Double-check your repository URL before submitting.
          </p>

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition hover:from-violet-700 hover:to-fuchsia-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Send size={17} />
            )}

            {submitting ? "Submitting..." : "Submit project"}
          </button>
        </div>
      </form>
    </section>
  );
}
