
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

import api from "@/lib/axios";
import { Review, ReviewApiResponse, ReviewStatsData } from "@/app/src/components/dashboard/admin/review/review-types";
import ReviewHeader from "@/app/src/components/dashboard/admin/review/review-header";
import ReviewStats from "@/app/src/components/dashboard/admin/review/review-stats";
import ReviewFilters from "@/app/src/components/dashboard/admin/review/review-filters";
import ReviewList from "@/app/src/components/dashboard/admin/review/review-list";
import ReviewDetailsModal from "@/app/src/components/dashboard/admin/review/review-details-modal";


export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await api.get<ReviewApiResponse>("/reviews/all");

      if (!response.data.success || !Array.isArray(response.data.data)) {
        throw new Error("The server returned an invalid reviews response.");
      }

      setReviews(response.data.data);
    } catch (err: unknown) {
      console.error("Failed to fetch admin reviews:", err);

      setError(
        "Could not load reviews. Please check your connection and try again.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchReviews();
  }, [fetchReviews]);

  const stats = useMemo<ReviewStatsData>(() => {
    return reviews.reduce(
      (result, review) => {
        result.total += 1;

        if (review.status === "APPROVED") {
          result.approved += 1;
        } else if (review.status === "REJECTED") {
          result.rejected += 1;
        } else {
          result.pending += 1;
        }

        return result;
      },
      {
        total: 0,
        approved: 0,
        rejected: 0,
        pending: 0,
      },
    );
  }, [reviews]);

  const filteredReviews = useMemo(() => {
    const query = search.trim().toLowerCase();

    return reviews.filter((review) => {
      const matchesStatus =
        statusFilter === "ALL" || review.status === statusFilter;

      const matchesSearch =
        !query ||
        [
          review.submission?.title,
          review.submission?.student?.name,
          review.submission?.student?.email,
          review.feedback,
          review.id,
        ].some((value) => value?.toLowerCase().includes(query));

      return matchesStatus && matchesSearch;
    });
  }, [reviews, search, statusFilter]);

  return (
    <main className="min-h-screen min-w-0 bg-slate-50/80 px-4 py-6 dark:bg-[#100d18] sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-7">
        <ReviewHeader onRefresh={fetchReviews} loading={loading} />

        {error && (
          <section
            role="alert"
            className="flex flex-col gap-4 rounded-2xl border border-rose-200 bg-rose-50 p-4 dark:border-rose-400/20 dark:bg-rose-500/10 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-start gap-3">
              <AlertCircle
                size={20}
                className="mt-0.5 shrink-0 text-rose-600 dark:text-rose-300"
              />
              <div>
                <p className="font-semibold text-rose-800 dark:text-rose-200">
                  Unable to load reviews
                </p>
                <p className="mt-1 text-sm text-rose-700 dark:text-rose-300">
                  {error}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={fetchReviews}
              disabled={loading}
              className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-xl border border-rose-200 bg-white px-4 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-100 disabled:opacity-60 dark:border-rose-400/20 dark:bg-white/5 dark:text-rose-200 dark:hover:bg-rose-500/10"
            >
              <RefreshCw size={15} />
              Retry
            </button>
          </section>
        )}

        <ReviewStats stats={stats} loading={loading} />

        <ReviewFilters
          search={search}
          onSearchChange={setSearch}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          total={reviews.length}
          filteredTotal={filteredReviews.length}
        />

        {error && reviews.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-400">
            Review data is unavailable until the API request succeeds.
          </div>
        ) : (
          <ReviewList
            reviews={filteredReviews}
            loading={loading}
            onViewDetails={setSelectedReview}
          />
        )}
      </div>

      <ReviewDetailsModal
        review={selectedReview}
        onClose={() => setSelectedReview(null)}
      />
    </main>
  );
}
