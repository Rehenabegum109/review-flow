
export type SubmissionStatus = "PENDING" | "APPROVED" | "REJECTED";

export type Submission = {
  id: string;
  title: string;
  description: string;
  githubUrl: string;
  liveUrl: string | null;
  studentId: string;
  createdAt: string;
  status: SubmissionStatus;
  student: {
    id: string;
    name: string;
    email: string;
  };
  review: {
    feedback: string;
    status: string;
    mentorId: string | null;
    createdAt: string;
  } | null;
};

export const statusStyles: Record<SubmissionStatus, string> = {
  PENDING:
    "bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-400/10 dark:text-amber-300 dark:ring-amber-400/20",
  APPROVED:
    "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-400/10 dark:text-emerald-300 dark:ring-emerald-400/20",
  REJECTED:
    "bg-rose-50 text-rose-700 ring-rose-200 dark:bg-rose-400/10 dark:text-rose-300 dark:ring-rose-400/20",
};
