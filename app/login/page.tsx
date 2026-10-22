
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  Eye,
  EyeOff,
  GitBranch,
  LockKeyhole,
  Mail,
  MessageSquareText,
  Sparkles,
  Workflow,
} from "lucide-react";
import api from "@/lib/axios";

type UserRole = "STUDENT" | "MENTOR" | "ADMIN";

type LoginResponse = {
  user?: { role?: UserRole };
  data?: {
    user?: { role?: UserRole };
    role?: UserRole;
  };
  role?: UserRole;
};

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post<LoginResponse>("/auth/login", {
        email,
        password,
      });

      const data = response.data;
      const user = data.user ?? data.data?.user ?? data.data;
      const role = user?.role ?? data.role;

      if (role === "MENTOR") {
        router.replace("/dashboard/mentor");
      } else if (role === "ADMIN") {
        router.replace("/dashboard/admin");
      } else if (role === "STUDENT") {
        router.replace("/dashboard/student");
      } else {
        console.error("Login response:", data);
        setError(
          "Login successful, but the user role was not found. Please check the login API response.",
        );
      }
    } catch (err: unknown) {
      if (typeof err === "object" && err !== null && "response" in err) {
        const errorResponse = (
          err as { response?: { data?: { message?: string } } }
        ).response;

        setError(
          errorResponse?.data?.message || "Login failed. Please try again.",
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
        <section className="relative hidden min-h-[650px] flex-col justify-between overflow-hidden bg-gradient-to-br from-violet-700 via-violet-600 to-purple-800 p-10 text-white md:flex lg:p-12">
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
              Your developer journey, organized
            </div>

            <h1 className="mt-7 max-w-md text-4xl font-bold leading-[1.15] tracking-tight lg:text-5xl">
              Turn your hard work into{" "}
              <span className="text-violet-200">real progress.</span>
            </h1>

            <p className="mt-6 max-w-md text-sm leading-7 text-violet-100/85">
              Submit your projects, exchange thoughtful feedback, and build
              better solutions with every review.
            </p>

            <div className="mt-9 space-y-4">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                  <Workflow size={18} />
                </span>
                <div>
                  <p className="text-sm font-semibold">Organized submissions</p>
                  <p className="mt-0.5 text-xs text-violet-100/65">
                    Manage your work in one place
                  </p>
                </div>
                <Check size={17} className="ml-auto text-violet-200" />
              </div>

              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                  <MessageSquareText size={18} />
                </span>
                <div>
                  <p className="text-sm font-semibold">Meaningful feedback</p>
                  <p className="mt-0.5 text-xs text-violet-100/65">
                    Learn from constructive reviews
                  </p>
                </div>
                <Check size={17} className="ml-auto text-violet-200" />
              </div>

              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                  <Code2 size={18} />
                </span>
                <div>
                  <p className="text-sm font-semibold">Continuous improvement</p>
                  <p className="mt-0.5 text-xs text-violet-100/65">
                    Make every iteration count
                  </p>
                </div>
                <Check size={17} className="ml-auto text-violet-200" />
              </div>
            </div>
          </div>

          <p className="relative z-10 border-t border-white/15 pt-5 text-xs text-violet-100/70">
            A better workflow for people who keep building.
          </p>
        </section>

        <section className="flex min-w-0 flex-col justify-center px-6 py-9 sm:px-10 sm:py-12 lg:px-14 xl:px-16">
          <Link href="/" className="mb-9 flex w-fit items-center gap-3 md:hidden">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-400 via-violet-500 to-purple-600 text-white shadow-lg shadow-violet-300/30 dark:from-violet-300 dark:via-violet-400 dark:to-purple-500 dark:text-[#171329]">
              <Code2 size={23} />
            </span>
            <span>
              <span className="block text-lg font-extrabold tracking-tight">
                Review<span className="text-violet-600 dark:text-violet-300">Flow</span>
              </span>
              <span className="block text-[10px] font-semibold tracking-[0.15em] text-violet-500 dark:text-violet-200/60">
                BUILD · SUBMIT · IMPROVE
              </span>
            </span>
          </Link>

          <div className="mb-8">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-100 bg-violet-50 text-violet-600 dark:border-white/10 dark:bg-white/5 dark:text-violet-300">
              <LockKeyhole size={22} />
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-300">
              Welcome back
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Sign in to your account
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-violet-100/60">
              Continue your journey and keep your projects moving forward.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold">
                Email address
              </label>
              <div className="flex items-center gap-3 rounded-2xl border border-violet-100 bg-slate-50 px-4 transition focus-within:border-violet-400 focus-within:ring-4 focus-within:ring-violet-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:focus-within:border-violet-300">
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
                  className="w-full bg-transparent py-4 text-sm outline-none placeholder:text-slate-400 dark:placeholder:text-violet-100/30"
                />
                {email.includes("@") && (
                  <Check size={17} className="shrink-0 text-emerald-500" />
                )}
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <label htmlFor="password" className="text-sm font-semibold">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-semibold text-violet-600 transition hover:text-violet-800 hover:underline dark:text-violet-300 dark:hover:text-violet-200"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-violet-100 bg-slate-50 px-4 transition focus-within:border-violet-400 focus-within:ring-4 focus-within:ring-violet-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:focus-within:border-violet-300">
                <LockKeyhole size={19} className="shrink-0 text-violet-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-transparent py-4 text-sm outline-none placeholder:text-slate-400 dark:placeholder:text-violet-100/30"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="rounded-lg p-1 text-slate-400 transition hover:text-violet-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:hover:text-violet-300"
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
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

            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-violet-600 px-5 py-4 text-sm font-semibold text-white shadow-lg shadow-violet-200/70 transition duration-200 hover:-translate-y-0.5 hover:bg-violet-700 hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-violet-500/30 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 dark:bg-violet-300 dark:text-[#171329] dark:shadow-purple-950/30 dark:hover:bg-violet-200"
            >
              {loading ? "Signing in..." : "Sign in to ReviewFlow"}
              {!loading && (
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              )}
            </button>
          </form>

          <div className="my-7 flex items-center gap-3">
            <div className="h-px flex-1 bg-violet-100 dark:bg-white/10" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400 dark:text-violet-100/40">
              Your journey continues
            </span>
            <div className="h-px flex-1 bg-violet-100 dark:bg-white/10" />
          </div>

          <p className="text-center text-sm text-slate-500 dark:text-violet-100/60">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-bold text-violet-600 transition hover:text-violet-800 hover:underline dark:text-violet-300 dark:hover:text-violet-200"
            >
              Create account <ArrowUpRight className="inline" size={14} />
            </Link>
          </p>

          <div className="mt-8 flex items-start gap-3 rounded-2xl border border-violet-100 bg-violet-50/80 p-4 dark:border-white/10 dark:bg-white/[0.04]">
            <Sparkles size={17} className="mt-0.5 shrink-0 text-violet-500 dark:text-violet-300" />
            <p className="text-xs leading-5 text-slate-500 dark:text-violet-100/60">
              Every project is a chance to improve. Sign in and keep building
              something great.
            </p>
          </div>

          <p className="mt-6 text-center text-[11px] text-slate-400 dark:text-violet-100/35">
            © 2026 ReviewFlow · Build with purpose.
          </p>
        </section>
      </div>
    </main>
  );
}
