
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Check,
  Code2,
  Eye,
  EyeOff,
  GitBranch,
  LockKeyhole,
  Mail,
  UserRound,
  Sparkles,
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

    if (name.trim().length < 2) {
      setError("Name must be at least 2 characters.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/auth/register", {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
      });

      if (response.data?.success !== true) {
        setError(response.data?.message || "Registration failed.");
        return;
      }

      setSuccess("Account created! Redirecting to your dashboard...");

      router.replace("/dashboard/student");
    } catch (err: unknown) {
      if (typeof err === "object" && err !== null && "response" in err) {
        const apiError = (
          err as {
            response?: {
              data?: {
                message?: string;
              };
            };
          }
        ).response;

        setError(
          apiError?.data?.message || "Registration failed. Please try again.",
        );
      } else {
        setError("Unable to connect to the server. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4 py-10 text-slate-800 transition-colors duration-300 dark:bg-[#171329] dark:text-white sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute -left-32 top-10 -z-10 h-80 w-80 rounded-full bg-violet-200/50 blur-[100px] dark:bg-violet-500/10" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 -z-10 h-96 w-96 rounded-full bg-purple-200/40 blur-[110px] dark:bg-purple-500/10" />

      <div className="grid w-full max-w-6xl overflow-hidden rounded-[2rem] border border-violet-100 bg-white shadow-2xl shadow-violet-100/60 dark:border-white/10 dark:bg-[#201A35] dark:shadow-purple-950/20 md:grid-cols-2">
        <section className="relative hidden min-h-[680px] flex-col justify-between overflow-hidden bg-gradient-to-br from-violet-700 via-violet-600 to-purple-800 p-10 text-white md:flex lg:p-12">
          <div className="pointer-events-none absolute -right-20 -top-16 h-72 w-72 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -right-5 top-10 h-48 w-48 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-purple-400/20 blur-3xl" />

          <Link href="/" className="relative z-10 flex w-fit items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 shadow-lg ring-1 ring-white/20">
              <GitBranch size={25} />
            </span>
            <span>
              <span className="block text-xl font-extrabold tracking-tight">
                ReviewFlow
              </span>
              <span className="mt-1 block text-[10px] font-semibold tracking-[0.18em] text-violet-100/70">
                BUILD · SUBMIT · IMPROVE
              </span>
            </span>
          </Link>

          <div className="relative z-10 my-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-violet-50">
              <Sparkles size={15} />
              Start your developer journey
            </div>

            <h1 className="mt-7 max-w-md text-4xl font-bold leading-[1.15] tracking-tight lg:text-5xl">
              Build better projects.
              <span className="block text-violet-200">
                Grow with every review.
              </span>
            </h1>

            <p className="mt-6 max-w-md text-sm leading-7 text-violet-100/85">
              Create your account, submit your work, receive meaningful
              feedback, and keep improving your skills.
            </p>

            <div className="mt-9 space-y-5">
              {[
                "Organize all your project submissions",
                "Receive constructive feedback",
                "Track your learning progress",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10">
                    <Check size={17} className="text-violet-200" />
                  </span>
                  <p className="text-sm font-medium text-violet-50">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="relative z-10 border-t border-white/15 pt-5 text-xs text-violet-100/70">
            Your next improvement starts here.
          </p>
        </section>

        <section className="flex min-w-0 flex-col justify-center px-6 py-9 sm:px-10 sm:py-12 lg:px-14 xl:px-16">
          <Link href="/" className="mb-8 flex w-fit items-center gap-3 md:hidden">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-400 via-violet-500 to-purple-600 text-white shadow-lg dark:text-[#171329]">
              <Code2 size={23} />
            </span>
            <span className="text-lg font-extrabold tracking-tight">
              Review<span className="text-violet-600 dark:text-violet-300">Flow</span>
            </span>
          </Link>

          <div className="mb-7">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-100 bg-violet-50 text-violet-600 dark:border-white/10 dark:bg-white/5 dark:text-violet-300">
              <UserRound size={22} />
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-300">
              Create your account
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Join ReviewFlow
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-violet-100/60">
              Set up your account and start improving your projects.
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-semibold">
                Full name
              </label>
              <div className="flex items-center gap-3 rounded-2xl border border-violet-100 bg-slate-50 px-4 transition focus-within:border-violet-400 focus-within:ring-4 focus-within:ring-violet-500/10 dark:border-white/10 dark:bg-white/[0.04]">
                <UserRound size={19} className="shrink-0 text-violet-400" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  minLength={2}
                  maxLength={100}
                  required
                  className="w-full bg-transparent py-3.5 text-sm outline-none placeholder:text-slate-400 dark:placeholder:text-violet-100/30"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold">
                Email address
              </label>
              <div className="flex items-center gap-3 rounded-2xl border border-violet-100 bg-slate-50 px-4 transition focus-within:border-violet-400 focus-within:ring-4 focus-within:ring-violet-500/10 dark:border-white/10 dark:bg-white/[0.04]">
                <Mail size={19} className="shrink-0 text-violet-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-transparent py-3.5 text-sm outline-none placeholder:text-slate-400 dark:placeholder:text-violet-100/30"
                />
                {email.includes("@") && (
                  <Check size={17} className="shrink-0 text-emerald-500" />
                )}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-semibold">
                Password
              </label>
              <div className="flex items-center gap-3 rounded-2xl border border-violet-100 bg-slate-50 px-4 transition focus-within:border-violet-400 focus-within:ring-4 focus-within:ring-violet-500/10 dark:border-white/10 dark:bg-white/[0.04]">
                <LockKeyhole size={19} className="shrink-0 text-violet-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={8}
                  required
                  className="w-full bg-transparent py-3.5 text-sm outline-none placeholder:text-slate-400 dark:placeholder:text-violet-100/30"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="rounded-lg p-1 text-slate-400 hover:text-violet-600 dark:hover:text-violet-300"
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="mb-2 block text-sm font-semibold">
                Confirm password
              </label>
              <div className="flex items-center gap-3 rounded-2xl border border-violet-100 bg-slate-50 px-4 transition focus-within:border-violet-400 focus-within:ring-4 focus-within:ring-violet-500/10 dark:border-white/10 dark:bg-white/[0.04]">
                <LockKeyhole size={19} className="shrink-0 text-violet-400" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full bg-transparent py-3.5 text-sm outline-none placeholder:text-slate-400 dark:placeholder:text-violet-100/30"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  className="rounded-lg p-1 text-slate-400 hover:text-violet-600 dark:hover:text-violet-300"
                >
                  {showConfirmPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-400/20 dark:bg-red-400/10 dark:text-red-300"
              >
                {error}
              </p>
            )}

            {success && (
              <p
                role="status"
                className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300"
              >
                {success}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-violet-600 px-5 py-4 text-sm font-semibold text-white shadow-lg shadow-violet-200/70 transition duration-200 hover:-translate-y-0.5 hover:bg-violet-700 hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-violet-500/30 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 dark:bg-violet-300 dark:text-[#171329] dark:shadow-purple-950/30 dark:hover:bg-violet-200"
            >
              {loading ? "Creating account..." : "Create my account"}
              {!loading && (
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              )}
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-slate-500 dark:text-violet-100/60">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-bold text-violet-600 transition hover:text-violet-800 hover:underline dark:text-violet-300"
            >
              Sign in
            </Link>
          </p>

          <div className="mt-7 flex items-start gap-3 rounded-2xl border border-violet-100 bg-violet-50/80 p-4 dark:border-white/10 dark:bg-white/[0.04]">
            <Sparkles size={17} className="mt-0.5 shrink-0 text-violet-500 dark:text-violet-300" />
            <p className="text-xs leading-5 text-slate-500 dark:text-violet-100/60">
              Create your account and take the next step in your developer journey.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
