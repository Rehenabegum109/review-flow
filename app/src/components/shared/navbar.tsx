
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  ArrowRight,
  Code2,
  Info,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  Moon,
  Sun,
  UserRound,
  X,
} from "lucide-react";
import api from "@/lib/axios";

type UserProfile = {
  id: string;
  name: string;
  email: string;
  role: "STUDENT" | "MENTOR" | "ADMIN";
};

const navLinks = [
  { label: "Home", href: "/", icon: Code2 },
  { label: "About", href: "/about", icon: Info },
  { label: "Contact", href: "/contact", icon: Mail },
];

function getDashboardHref(role: UserProfile["role"]) {
  switch (role) {
    case "ADMIN":
      return "/dashboard/admin";
    case "MENTOR":
      return "/dashboard/mentor";
    case "STUDENT":
    default:
      return "/dashboard/student";
  }
}

export default function Navbar() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let active = true;

    api
      .get("/auth/me")
      .then((response) => {
        if (!active) return;

        const currentUser =
          response.data?.data?.user ??
          response.data?.data ??
          response.data?.user ??
          null;

        if (
          currentUser &&
          ["STUDENT", "MENTOR", "ADMIN"].includes(currentUser.role)
        ) {
          setUser(currentUser as UserProfile);
        } else {
          setUser(null);
        }
      })
      .catch((error) => {
        if (active) setUser(null);

        if (error.response?.status !== 401) {
          console.error("Failed to load current user:", error);
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [pathname]);

  const dashboardHref = user
    ? getDashboardHref(user.role)
    : "/dashboard/student";

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await api.post("/auth/logout");
      setUser(null);
      setMenuOpen(false);
      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoggingOut(false);
    }
  };

  const closeMenu = () => setMenuOpen(false);

  const themeButton = (
    <button
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-rose-200 text-slate-700 transition hover:bg-rose-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
    >
      {mounted && theme === "dark" ? (
        <Sun size={19} />
      ) : (
        <Moon size={19} />
      )}
    </button>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-rose-100 bg-white/90 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link
          href="/"
          onClick={closeMenu}
          className="flex shrink-0 items-center gap-2.5"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-red-600 text-white shadow-md shadow-rose-500/20">
            <Code2 size={22} />
          </span>

          <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Review<span className="text-rose-600">Flow</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map(({ label, href, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-rose-50 hover:text-rose-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-rose-400"
            >
              <Icon size={16} />
              {label}
            </Link>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 md:flex">
          {themeButton}

          {loading ? (
            <div className="h-10 w-28 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800" />
          ) : user ? (
            <>
              <Link
                href={dashboardHref}
                className="flex items-center gap-2 rounded-xl border border-rose-200 px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-rose-50 hover:text-rose-600 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <LayoutDashboard size={17} />
                Dashboard
              </Link>

              <div className="flex max-w-48 items-center gap-2 rounded-xl bg-rose-50 px-3 py-2 dark:bg-slate-800">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-rose-600 text-white">
                  <UserRound size={18} />
                </span>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-800 dark:text-white">
                    {user.name}
                  </p>
                  <p className="text-xs text-rose-600 dark:text-rose-400">
                    {user.role}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-50 dark:text-slate-300 dark:hover:bg-red-950/40"
              >
                <LogOut size={17} />
                {loggingOut ? "Logging out..." : "Logout"}
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 hover:text-rose-600 dark:text-slate-200"
              >
                Log in
              </Link>

              <Link
                href="/register"
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 to-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-rose-500/20 transition hover:-translate-y-0.5"
              >
                Get Started <ArrowRight size={16} />
              </Link>
            </>
          )}
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          {themeButton}

          <button
            type="button"
            onClick={() => setMenuOpen((previous) => !previous)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-rose-200 text-slate-700 dark:border-slate-700 dark:text-slate-200"
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-rose-100 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {navLinks.map(({ label, href, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                onClick={closeMenu}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-rose-50 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <Icon size={18} />
                {label}
              </Link>
            ))}

            <div className="my-2 border-t border-slate-100 dark:border-slate-800" />

            {loading ? (
              <p className="px-4 py-3 text-sm text-slate-500">
                Checking login...
              </p>
            ) : user ? (
              <>
                <div className="rounded-xl bg-rose-50 p-4 dark:bg-slate-800">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-600 text-white">
                      <UserRound size={20} />
                    </span>

                    <div className="min-w-0">
                      <p className="truncate font-semibold text-slate-900 dark:text-white">
                        {user.name}
                      </p>
                      <p className="truncate text-sm text-slate-500 dark:text-slate-400">
                        {user.email}
                      </p>
                      <p className="mt-1 text-xs font-medium text-rose-600 dark:text-rose-400">
                        {user.role}
                      </p>
                    </div>
                  </div>
                </div>

                <Link
                  href={dashboardHref}
                  onClick={closeMenu}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-slate-700 hover:bg-rose-50 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  <LayoutDashboard size={18} />
                  Dashboard
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-left font-medium text-red-600 hover:bg-red-50 disabled:opacity-50 dark:hover:bg-red-950/40"
                >
                  <LogOut size={18} />
                  {loggingOut ? "Logging out..." : "Logout"}
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="rounded-xl px-4 py-3 font-semibold text-slate-700 hover:bg-rose-50 dark:text-slate-200"
                >
                  Log in
                </Link>

                <Link
                  href="/register"
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 to-red-600 px-4 py-3 font-semibold text-white"
                >
                  Get Started <ArrowRight size={16} />
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
