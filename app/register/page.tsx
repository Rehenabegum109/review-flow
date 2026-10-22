"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Eye,
  EyeOff,
  GitBranch,
  LockKeyhole,
  Mail,
  Sparkles,
  UserRound,
} from "lucide-react";
import api from "@/lib/axios";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/register", {
        name: name.trim(),
        email: email.trim(),
        password,
      });

      setSuccess("Account created successfully! Redirecting to login...");

      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (err: unknown) {
      const message =
        typeof err === "object" &&
        err !== null &&
        "response" in err &&
        typeof err.response === "object" &&
        err.response !== null &&
        "data" in err.response &&
        typeof err.response.data === "object" &&
        err.response.data !== null &&
        "message" in err.response.data &&
        typeof err.response.data.message === "string"
          ? err.response.data.message
          : "Registration failed. Please check your server connection.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-slate-500 dark:focus:border-violet-400";

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-50 px-4 py-10 text-slate-900 transition-colors dark:bg-[#171329] dark:text-white sm:px-6 lg:py-14">
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-violet-300/30 blur-3xl dark:bg-violet-600/15" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-fuchsia-200/40 blur-3xl dark:bg-fuchsia-600/10" />

      <div className="relative mx-auto grid w-full max-w-6xl overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-2xl shadow-violet-950/5 dark:border-white/10 dark:bg-[#201A35] dark:shadow-black/20 lg:grid-cols-2">
        <section className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-violet-700 via-violet-800 to-indigo-950 p-10 text-white lg:flex xl:p-14">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-white/10" />
          <div className="absolute -right-8 -top-8 h-48 w-48 rounded-full border border-white/10" />
          <div className="absolute -bottom-28 -left-20 h-80 w-80 rounded-full bg-fuchsia-400/15 blur-2xl" />

          <Link href="/" className="relative flex w-fit items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
              <GitBranch size={23} />
            </div>
            <span className="text-2xl font-bold tracking-tight">
              Review<span className="text-violet-300">Flow</span>
            </span>
          </Link>

          <div className="relative my-14">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-violet-100">
              <Sparkles size={16} />
              Learn. Share. Improve.
            </div>

            <h1 className="max-w-md text-4xl font-bold leading-tight xl:text-5xl">
              Great projects grow through great feedback.
            </h1>

            <p className="mt-6 max-w-md text-base leading-7 text-violet-100/80">
              Join a community where students share projects, learn from
              mentors, and turn feedback into progress.
            </p>

            <div className="mt-9 space-y-4">
              {[
                "Share your projects with confidence",
                "Get meaningful feedback",
                "Build skills through collaboration",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
                    <CheckCircle2 size={15} />
                  </span>
                  <span className="text-sm text-violet-50">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="relative text-sm text-violet-200/70">
            Your next improvement starts with one review.
          </p>
        </section>

        <section className="px-5 py-8 sm:px-10 sm:py-12 xl:px-14">
          <Link href="/" className="mb-8 flex w-fit items-center gap-2 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-white dark:bg-violet-300 dark:text-[#171329]">
              <Code2 size={21} />
            </div>
            <span className="text-xl font-bold">
              Review<span className="text-violet-600 dark:text-violet-300">Flow</span>
            </span>
          </Link>

          <div className="mx-auto max-w-md">
            <div className="mb-8">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700 dark:bg-violet-400/10 dark:text-violet-300">
                <Sparkles size={14} />
                Create your account
              </div>

              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Join ReviewFlow
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Create your account and start sharing your work.
              </p>
            </div>

            {error && (
              <div
                role="alert"
                className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-400/20 dark:bg-red-400/10 dark:text-red-300"
              >
                {error}
              </div>
            )}

            {success && (
              <div
                role="status"
                className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300"
              >
                {success}
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-5">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-semibold">
                  Full name
                </label>
                <div className="relative">
                  <UserRound className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClass}
                    required
                    maxLength={100}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-semibold">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-semibold">
                  Password
                </label>
                <div className="relative">
                  <LockKeyhole className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="At least 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={inputClass}
                    minLength={8}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-violet-600 dark:hover:text-violet-300"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="mb-2 block text-sm font-semibold">
                  Confirm password
                </label>
                <div className="relative">
                  <LockKeyhole className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Enter your password again"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={inputClass}
                    minLength={8}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-violet-600 dark:hover:text-violet-300"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-violet-300 dark:text-[#171329] dark:hover:bg-violet-200"
              >
                {loading ? "Creating account..." : "Create account"}
                {!loading && (
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                )}
              </button>
            </form>

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
              <span className="text-xs text-slate-400">ALREADY A MEMBER?</span>
              <div className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
            </div>

            <p className="text-center text-sm text-slate-600 dark:text-slate-400">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-violet-700 transition hover:text-violet-900 dark:text-violet-300 dark:hover:text-violet-200"
              >
                Sign in
              </Link>
            </p>

            <p className="mt-8 text-center text-xs leading-5 text-slate-400">
              By creating an account, you agree to use ReviewFlow responsibly.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
