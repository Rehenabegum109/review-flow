// "use client";

// import {
//   MessageSquare,
//   RefreshCw,
//   Star,
// } from "lucide-react";
// import type { Review } from "./review-types";

// type Props = {
//   reviews: Review[];
//   loading: boolean;
//   error: string;
//   onRetry: () => void;
// };

// export default function ReviewList({
//   reviews,
//   loading,
//   error,
//   onRetry,
// }: Props) {
//   if (loading) {
//     return (
//       <div className="grid gap-4 sm:grid-cols-2">
//         {[1, 2, 3, 4].map((item) => (
//           <div
//             key={item}
//             className="h-44 animate-pulse rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-gray-900"
//           />
//         ))}
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-900 dark:bg-red-950/30">
//         <p className="text-sm text-red-600 dark:text-red-400">
//           {error}
//         </p>

//         <button
//           onClick={onRetry}
//           className="mt-4 inline-flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
//         >
//           <RefreshCw size={16} />
//           Try again
//         </button>
//       </div>
//     );
//   }

//   if (reviews.length === 0) {
//     return (
//       <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center dark:border-gray-700 dark:bg-gray-900">
//         <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-600 dark:bg-violet-950 dark:text-violet-300">
//           <MessageSquare size={26} />
//         </div>

//         <h2 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
//           No reviews yet
//         </h2>

//         <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
//           Your project reviews will appear here when available.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="grid gap-4 sm:grid-cols-2">
//       {reviews.map((review) => {
//      const title = review.submission?.title ?? "Project Review";

// const status = (review.status ?? "PENDING").replaceAll("_", " ");

// const feedback = review.feedback ?? "No feedback has been added yet.";

//         return (
//           <article
//             key={review.id}
//             className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
//           >
//             <div className="flex items-start justify-between gap-3">
//               <h2 className="font-semibold text-gray-900 dark:text-white">
//                 {title}
//               </h2>

//               <span className="shrink-0 rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-700 dark:bg-violet-950 dark:text-violet-300">
//                 {status}
//               </span>
//             </div>

//             {typeof score === "number" && (
//               <div className="mt-4 flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400">
//                 <Star size={17} className="fill-current" />
//                 <span className="font-semibold">{score}</span>
//                 <span className="text-gray-500 dark:text-gray-400">
//                   Score / Rating
//                 </span>
//               </div>
//             )}

//             <div className="mt-4 rounded-xl bg-gray-50 p-4 dark:bg-gray-800/70">
//               <p className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200">
//                 <MessageSquare size={16} />
//                 Mentor Feedback
//               </p>

//               <p className="text-sm leading-6 text-gray-600 dark:text-gray-400">
//                 {feedback || "No feedback has been added yet."}
//               </p>
//             </div>

//             {review.createdAt && (
//               <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
//                 {new Date(review.createdAt).toLocaleDateString()}
//               </p>
//             )}
//           </article>
//         );
//       })}
//     </div>
//   );
// }

"use client";

import { MessageSquare, RefreshCw } from "lucide-react";
import type { Review } from "./review-types";

type Props = {
  reviews: Review[];
  loading: boolean;
  error: string;
  onRetry: () => void;
};

export default function ReviewList({
  reviews,
  loading,
  error,
  onRetry,
}: Props) {
  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-44 animate-pulse rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-gray-900"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-900 dark:bg-red-950/30">
        <p className="text-sm text-red-600 dark:text-red-400">
          {error}
        </p>

        <button
          onClick={onRetry}
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
        >
          <RefreshCw size={16} />
          Try again
        </button>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center dark:border-gray-700 dark:bg-gray-900">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-600 dark:bg-violet-950 dark:text-violet-300">
          <MessageSquare size={26} />
        </div>

        <h2 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
          No reviews yet
        </h2>

        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Your project reviews will appear here when available.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {reviews.map((review) => {
        const title =
          review.submission?.title ?? "Project Review";

        const status = (
          review.status ?? "PENDING"
        ).replaceAll("_", " ");

        const feedback =
          review.feedback ?? "No feedback has been added yet.";

        return (
          <article
            key={review.id}
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="flex items-start justify-between gap-3">
              <h2 className="font-semibold text-gray-900 dark:text-white">
                {title}
              </h2>

              <span className="shrink-0 rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-700 dark:bg-violet-950 dark:text-violet-300">
                {status}
              </span>
            </div>

            <div className="mt-4 rounded-xl bg-gray-50 p-4 dark:bg-gray-800/70">
              <p className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                <MessageSquare size={16} />
                Mentor Feedback
              </p>

              <p className="text-sm leading-6 text-gray-600 dark:text-gray-400">
                {feedback}
              </p>
            </div>

            {review.createdAt && (
              <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            )}
          </article>
        );
      })}
    </div>
  );
}