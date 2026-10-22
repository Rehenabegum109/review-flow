
export type Submission = {
  id: string;
  title: string;
  description: string;
  githubUrl: string;
  liveUrl?: string | null;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type SubmissionFormData = {
  title: string;
  description: string;
  githubUrl: string;
  liveUrl: string;
};

export const initialSubmissionForm: SubmissionFormData = {
  title: "",
  description: "",
  githubUrl: "",
  liveUrl: "",
};
