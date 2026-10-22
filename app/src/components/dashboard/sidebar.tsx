
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  MessageSquareText,
  Users,
  ShieldCheck,
  Menu,
  X,
  UserRound,
  LogOut,
  LoaderCircle,
} from "lucide-react";

import api from "@/lib/axios";

type UserRole = "STUDENT" | "MENTOR" | "ADMIN";

type SidebarProps = {
  role?: UserRole;
};

const menuByRole = {
  STUDENT: [
    { label: "Dashboard", href: "/dashboard/student", icon: LayoutDashboard },
    { label: "Submit Project", href: "/dashboard/student/submission", icon: FolderKanban },
    { label: "My Projects", href: "/dashboard/student/projects", icon: FolderKanban },
    { label: "My Reviews", href: "/dashboard/student/reviews", icon: MessageSquareText },
    {
  label: "Profile",
  href: "/dashboard/student/profile",
  icon: UserRound,
},
  ],
  MENTOR: [
    { label: "Dashboard", href: "/dashboard/mentor", icon: LayoutDashboard },
    { label: "Projects to Review", href: "/dashboard/mentor/submissions", icon: FolderKanban },
    { label: "My Reviews", href: "/dashboard/mentor/reviews", icon: MessageSquareText },
    {
  label: "Profile",
  href: "/dashboard/mentor/profile",
  icon: UserRound,
},
  ],
  ADMIN: [
    { label: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
    { label: "Submissions", href: "/dashboard/admin/submissions", icon: FolderKanban },
    { label: "Reviews", href: "/dashboard/admin/reviews", icon: MessageSquareText },
    { label: "Users", href: "/dashboard/admin/users", icon: Users },
    {
  label: "Profile",
  href: "/dashboard/admin/profile",
  icon: UserRound,
},
  ],
};

export default function DashboardSidebar({
  role = "STUDENT",
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");

  const menuItems = menuByRole[role];

  const handleLogout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);
    setLogoutError("");

    try {
      // Ensure this endpoint matches your backend logout route.
      await api.post("/auth/logout");

      router.replace("/login");
      router.refresh();
    } catch {
      setLogoutError(
        "Logout failed. Please check your connection and try again.",
      );
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label={mobileOpen ? "Close sidebar" : "Open sidebar"}
        aria-expanded={mobileOpen}
        className="fixed left-4 top-20 z-40 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-violet-50 dark:border-white/10 dark:bg-[#201A35] dark:text-white dark:hover:bg-white/10 lg:hidden"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {mobileOpen && (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-x-0 bottom-0 top-16 z-40 bg-slate-950/40 backdrop-blur-[2px] lg:hidden"
        />
      )}

      <aside
        className={`fixed bottom-0 left-0 top-16 z-40 flex w-[260px] flex-col border-r border-slate-200 bg-white transition-transform duration-300 dark:border-white/10 dark:bg-[#201A35] ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="border-b border-slate-200/80 px-5 py-5 dark:border-white/10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
            Workspace
          </p>
          <h2 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
            Dashboard Menu
          </h2>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-5">
          <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400 dark:text-slate-500">
            Main Menu
          </p>

          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" &&
                pathname.startsWith(`${item.href}/`));

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-violet-600 text-white shadow-md shadow-violet-600/20 dark:bg-violet-300 dark:text-[#171329]"
                    : "text-slate-600 hover:bg-violet-50 hover:text-violet-700 dark:text-slate-300 dark:hover:bg-white/[0.06] dark:hover:text-violet-200"
                }`}
              >
                <Icon size={19} className="shrink-0" />
                <span className="flex-1">{item.label}</span>
                {isActive && (
                  <span className="h-1.5 w-1.5 rounded-full bg-white dark:bg-[#171329]" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-slate-200/80 p-3 dark:border-white/10">
          <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400 dark:text-slate-500">
            Account
          </p>

          <button
            type="button"
            onClick={() => void handleLogout()}
            disabled={loggingOut}
            className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-rose-600 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60 dark:text-rose-300 dark:hover:bg-rose-500/10"
          >
            {loggingOut ? (
              <LoaderCircle size={19} className="animate-spin" />
            ) : (
              <LogOut size={19} />
            )}
            <span>{loggingOut ? "Logging out..." : "Logout"}</span>
          </button>

          {logoutError && (
            <p role="alert" className="px-3 pt-2 text-xs text-rose-600 dark:text-rose-300">
              {logoutError}
            </p>
          )}

          <div className="mt-4 rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50 to-white p-4 dark:border-violet-300/10 dark:from-violet-300/[0.09] dark:to-white/[0.02]">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-300/15 dark:text-violet-200">
              <ShieldCheck size={19} />
            </div>

            <h3 className="mt-3 text-sm font-bold text-slate-800 dark:text-white">
              Keep improving
            </h3>
            <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
              Share your work, learn from feedback, and grow your skills.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
