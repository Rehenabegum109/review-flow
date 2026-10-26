export type Review = {
  id: string;
  status: "APPROVED" | "REJECTED" | "PENDING";
  feedback: string;
  createdAt?: string;
  updatedAt?: string;
  submission?: {
    id: string;
    title: string;
    status: string;
    createdAt: string;
  };
};