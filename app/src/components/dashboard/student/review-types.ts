export type Review = {
  id: string;
  status?: string;
  score?: number | null;
  rating?: number | null;
  feedback?: string | null;
  comment?: string | null;
  createdAt?: string;
  project?: {
    title?: string;
  };
  submission?: {
    title?: string;
  };
};