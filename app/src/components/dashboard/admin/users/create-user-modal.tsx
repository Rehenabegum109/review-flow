
"use client";

import { useEffect, useState } from "react";
import { Eye, EyeOff, LoaderCircle, ShieldCheck, X } from "lucide-react";
import type {
  CreateUserPayload,
  UserRole,
} from "./user-types";

type CreateUserModalProps = {
  open: boolean;
  loading: boolean;
  error: string | null;
  onClose: () => void;
  onSubmit: (payload: CreateUserPayload) => Promise<void>;
};

const initialForm = {
  name: "",
  email: "",
  password: "",
  role: "STUDENT" as UserRole,
};

export default function CreateUserModal({
  open,
  loading,
  error,
  onClose,
  onSubmit,
}: CreateUserModalProps) {
  const [form, setForm] = useState(initialForm);
  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    if (open) {
      setForm(initialForm);
      setShowPassword(false);
      setValidationError("");
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !loading) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, loading, onClose]);

  if (!open) return null;

  const inputClass =
    "mt-2 min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10 dark:border-white/10 dark:bg-[#171321] dark:text-white dark:placeholder:text-slate-500";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidationError("");

    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();

    if (!name || !email || !form.password) {
      setValidationError("Please complete all fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setValidationError("Please enter a valid email address.");
      return;
    }

    if (form.password.length < 8) {
      setValidationError("Password must contain at least 8 characters.");
      return;
    }

    try {
      await onSubmit({
        name,
        email,
        password: form.password,
        role: form.role,
      });
    } catch {
      // The parent component handles and displays API errors.
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-950/55 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !loading) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-user-title"
        className="max-h-[92dvh] w-full max-w-lg overflow-y-auto rounded-t-3xl border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-[#110e1b] sm:rounded-3xl"
      >
        <div className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-violet-600 to-indigo-700 px-5 py-6 text-white sm:px-7">
          <div className="absolute -right-8 -top-10 h-36 w-36 rounded-full bg-white/10 blur-2xl" />

          <div className="relative flex items-start justify-between gap-4">
            <div>
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-white/15">
                <ShieldCheck size={22} />
              </div>

              <h2
                id="create-user-title"
                className="text-xl font-bold sm:text-2xl"
              >
                Create New User
              </h2>

              <p className="mt-1.5 text-sm leading-5 text-violet-100">
                Add a member to your ReviewFlow workspace.
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              aria-label="Close create user form"
              className="rounded-xl p-2 text-white/80 transition hover:bg-white/15 hover:text-white disabled:opacity-50"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-5 sm:p-7">
          <div>
            <label
              htmlFor="new-user-name"
              className="text-sm font-semibold text-slate-700 dark:text-slate-200"
            >
              Full name
            </label>

            <input
              id="new-user-name"
              name="name"
              autoComplete="name"
              required
              maxLength={100}
              value={form.name}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  name: event.target.value,
                }))
              }
              placeholder="Enter full name"
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="new-user-email"
              className="text-sm font-semibold text-slate-700 dark:text-slate-200"
            >
              Email address
            </label>

            <input
              id="new-user-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={form.email}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  email: event.target.value,
                }))
              }
              placeholder="name@example.com"
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="new-user-password"
              className="text-sm font-semibold text-slate-700 dark:text-slate-200"
            >
              Temporary password
            </label>

            <div className="relative">
              <input
                id="new-user-password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                minLength={8}
                value={form.password}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    password: event.target.value,
                  }))
                }
                placeholder="At least 8 characters"
                className={`${inputClass} pr-12`}
              />

              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-[calc(50%+4px)] -translate-y-1/2 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-violet-600 dark:hover:bg-white/10 dark:hover:text-violet-300"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              Use a strong password and share it securely with the new member.
            </p>
          </div>

          <div>
            <label
              htmlFor="new-user-role"
              className="text-sm font-semibold text-slate-700 dark:text-slate-200"
            >
              Account role
            </label>

            <select
              id="new-user-role"
              name="role"
              value={form.role}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  role: event.target.value as UserRole,
                }))
              }
              className={inputClass}
            >
              <option value="STUDENT">Student</option>
              <option value="MENTOR">Mentor</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          {(validationError || error) && (
            <p
              role="alert"
              className="rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-3 text-sm text-rose-700 dark:border-rose-400/20 dark:bg-rose-500/10 dark:text-rose-300"
            >
              {validationError || error}
            </p>
          )}

          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 dark:border-white/10 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="min-h-11 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/[0.05]"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:from-violet-700 hover:to-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading && <LoaderCircle size={17} className="animate-spin" />}
              {loading ? "Creating user..." : "Create User"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
