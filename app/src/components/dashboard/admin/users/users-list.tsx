
"use client";

import {
  CalendarDays,
  Mail,
  Users,
  UserRound,
} from "lucide-react";
import {
  formatUserDate,
  userRoleStyles,
  type UserRecord,
} from "./user-types";

type UsersListProps = {
  users: UserRecord[];
  loading: boolean;
  error: string | null;
};

export default function UsersList({
  users,
  loading,
  error,
}: UsersListProps) {
  if (loading) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.04]">
        <div className="mb-5 h-5 w-36 animate-pulse rounded bg-slate-200 dark:bg-white/10" />

        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-[76px] animate-pulse rounded-xl bg-slate-100 dark:bg-white/[0.05]"
            />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        role="alert"
        className="rounded-2xl border border-rose-200 bg-rose-50 p-6 dark:border-rose-400/20 dark:bg-rose-500/[0.07]"
      >
        <h2 className="font-semibold text-rose-700 dark:text-rose-300">
          Could not load users
        </h2>
        <p className="mt-2 break-words text-sm text-rose-600 dark:text-rose-300/80">
          {error}
        </p>
      </section>
    );
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
      <div className="flex flex-col gap-2 border-b border-slate-100 px-5 py-4 dark:border-white/[0.08] sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <h2 className="font-semibold text-slate-900 dark:text-white">
            All Users
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Registered members and their account information.
          </p>
        </div>

        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700 dark:bg-violet-500/10 dark:text-violet-300">
          <Users size={14} />
          {users.length} {users.length === 1 ? "user" : "users"}
        </span>
      </div>

      {users.length === 0 ? (
        <div className="flex flex-col items-center px-5 py-14 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300">
            <UserRound size={25} />
          </div>

          <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">
            No users found
          </h3>

          <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">
            No users match your current search or role filter.
          </p>
        </div>
      ) : (
        <>
          {/* Mobile layout */}
          <div className="divide-y divide-slate-100 dark:divide-white/[0.08] md:hidden">
            {users.map((user) => (
              <article key={user.id} className="space-y-3 p-4">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-sm font-bold text-white">
                    {user.name?.trim().charAt(0).toUpperCase() || "U"}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-slate-900 dark:text-white">
                      {user.name}
                    </p>
                    <p className="mt-1 flex min-w-0 items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                      <Mail size={13} className="shrink-0" />
                      <span className="truncate">{user.email}</span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${userRoleStyles[user.role]}`}
                  >
                    {user.role}
                  </span>

                  <span className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                    <CalendarDays size={14} />
                    {formatUserDate(user.createdAt)}
                  </span>
                </div>
              </article>
            ))}
          </div>

          {/* Desktop and tablet layout */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[650px] text-left">
              <thead>
                <tr className="bg-slate-50/80 dark:bg-white/[0.025]">
                  <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    User
                  </th>
                  <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Role
                  </th>
                  <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Joined
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 dark:divide-white/[0.08]">
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="transition hover:bg-violet-50/50 dark:hover:bg-violet-500/[0.04]"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-sm font-bold text-white">
                          {user.name?.trim().charAt(0).toUpperCase() || "U"}
                        </div>

                        <div className="min-w-0">
                          <p className="max-w-[220px] truncate text-sm font-semibold text-slate-900 dark:text-white">
                            {user.name}
                          </p>
                          <p className="mt-1 max-w-[260px] truncate text-sm text-slate-500 dark:text-slate-400">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${userRoleStyles[user.role]}`}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                        <CalendarDays size={15} />
                        {formatUserDate(user.createdAt)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
}
