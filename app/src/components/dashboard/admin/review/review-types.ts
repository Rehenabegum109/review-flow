
export type ReviewStatus = "APPROVED" | "REJECTED" | "PENDING";

export type ReviewStudent = {
  id: string;
  name: string;
  email: string;
};

export type ReviewSubmission = {
  id: string;
  title: string;
  status: string;
  createdAt: string;
  student: ReviewStudent;
};

export type Review = {
  id: string;
  feedback: string;
  status: ReviewStatus;
  createdAt?: string;
  updatedAt?: string;
  submission: ReviewSubmission;
};

export type ReviewStatsData = {
  total: number;
  approved: number;
  rejected: number;
  pending: number;
};

export type ReviewApiResponse = {
  success: boolean;
  data: Review[];
  message?: string;
};

export const reviewStatusStyles: Record<ReviewStatus, string> = {
  APPROVED:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",

  REJECTED:
    "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",

  PENDING:
    "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
};

export function formatReviewDate(value?: string): string {
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
