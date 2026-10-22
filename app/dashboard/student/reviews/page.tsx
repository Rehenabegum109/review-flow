"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { Review } from "@/app/src/components/dashboard/student/review-types";
import ReviewsHeader from "@/app/src/components/dashboard/student/reviews-header";
import ReviewList from "@/app/src/components/dashboard/student/review-list";


export default function StudentReviewsPage() {
  const router = useRouter();

  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const authResponse = await api.get("/auth/me");
      const user = authResponse.data?.data?.user;

      if (!user) {
        router.replace("/login");
        return;
      }

      if (user.role !== "STUDENT") {
        router.replace("/dashboard");
        return;
      }

      const response = await api.get("/reviews/my");
      const data = response.data?.data;

      setReviews(Array.isArray(data) ? data : []);
    } catch (err: unknown) {
      const status = (
        err as { response?: { status?: number } }
      ).response?.status;

      if (status === 401) {
        router.replace("/login");
        return;
      }

      setError("Unable to load reviews. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    void fetchReviews();
  }, [fetchReviews]);

  return (
    <div className="space-y-6">
      <ReviewsHeader />

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Project Feedback
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Review your feedback and see where you can improve.
          </p>
        </div>

        <ReviewList
          reviews={reviews}
          loading={loading}
          error={error}
          onRetry={() => void fetchReviews()}
        />
      </section>
    </div>
  );
}