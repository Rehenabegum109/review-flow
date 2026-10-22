
export type UserRole = "STUDENT" | "MENTOR" | "ADMIN";

export type UserRecord = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt?: string;
  updatedAt?: string;
};

export type UsersApiResponse = {
  success: boolean;
  data: UserRecord[];
  message?: string;
};

export type CreateUserPayload = {
  name: string;
  email: string;
  password: string;
  role: UserRole;
};

export type CreateUserApiResponse = {
  success: boolean;
  data?: UserRecord;
  message?: string;
};

export type UserStatsData = {
  total: number;
  students: number;
  mentors: number;
  admins: number;
};

export const userRoleStyles: Record<UserRole, string> = {
  STUDENT:
    "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300",
  MENTOR:
    "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300",
  ADMIN:
    "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
};

export function formatUserDate(value?: string): string {
  if (!value) return "Date unavailable";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Date unavailable";
  }

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
