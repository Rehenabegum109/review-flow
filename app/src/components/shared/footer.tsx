
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Code2, ArrowUpRight, Heart } from "lucide-react";

const footerLinks = [
  { label: "Home", href: "/#home" },
  { label: "Features", href: "/#features" },
  { label: "How It Works", href: "/#how-it-works" },
];

export default function Footer() {
  const [currentYear, setCurrentYear] = useState("2026");

  useEffect(() => {
    setCurrentYear(String(new Date().getFullYear()));
  }, []);

  return (
    <footer className="relative mt-auto overflow-hidden border-t border-slate-200/80 bg-gradient-to-b from-white to-slate-50 px-4 pb-6 pt-12 text-slate-900 transition-colors duration-300 dark:border-white/[0.08] dark:from-[#171329] dark:to-[#0B0915] dark:text-white sm:px-6 sm:pt-14 lg:px-8">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-40 w-72 -translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr] lg:gap-16">
          {/* Brand */}
          <div>
            <Link
              href="/#home"
              className="group inline-flex items-center gap-3"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-600 text-white shadow-lg shadow-violet-600/20 transition duration-300 group-hover:-translate-y-0.5 group-hover:shadow-violet-600/30 dark:bg-violet-300 dark:text-[#171329]">
                <Code2 size={23} />
              </span>

              <span className="text-xl font-extrabold tracking-tight">
                Review
                <span className="text-violet-600 dark:text-violet-300">
                  Flow
                </span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-600 dark:text-slate-400">
              A focused workspace for project submissions, meaningful
              reviews, and continuous improvement.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-violet-200/70 bg-violet-50/80 px-3 py-1.5 text-xs font-medium text-violet-700 dark:border-violet-300/15 dark:bg-violet-300/[0.07] dark:text-violet-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Learn. Share. Improve.
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-bold tracking-wide">Explore</h3>

            <ul className="mt-5 space-y-3.5">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-slate-600 transition-colors duration-200 hover:text-violet-600 dark:text-slate-400 dark:hover:text-violet-300"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight
                      size={13}
                      className="opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-sm font-bold tracking-wide">Get started</h3>

            <p className="mt-4 max-w-xs text-sm leading-6 text-slate-600 dark:text-slate-400">
              Ready to share your work and grow through feedback?
            </p>

            <div className="mt-5 flex flex-col items-start gap-3.5">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-violet-600/15 transition duration-200 hover:-translate-y-0.5 hover:bg-violet-700 dark:bg-violet-300 dark:text-[#171329] dark:hover:bg-violet-200"
              >
                Create an account
                <ArrowUpRight size={15} />
              </Link>

              <Link
                href="/login"
                className="text-sm font-medium text-slate-600 transition-colors hover:text-violet-600 dark:text-slate-400 dark:hover:text-violet-300"
              >
                Already have an account? Log in
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col gap-3 border-t border-slate-200/80 pt-5 text-xs text-slate-500 dark:border-white/[0.08] dark:text-slate-400 sm:mt-12 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-center sm:text-left">
            © {currentYear} ReviewFlow. All rights reserved.
          </p>

          <p className="flex items-center justify-center gap-1.5">
            Built for better learning
            <Heart
              size={13}
              className="fill-violet-500 text-violet-500 dark:fill-violet-300 dark:text-violet-300"
            />
          </p>
        </div>
      </div>
    </footer>
  );
}
