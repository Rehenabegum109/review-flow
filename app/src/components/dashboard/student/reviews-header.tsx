import { MessageSquareText, Sparkles } from "lucide-react";

export default function ReviewsHeader() {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 p-6 text-white shadow-lg sm:p-8">
      <div className="absolute -right-8 -top-10 h-36 w-36 rounded-full bg-white/10 blur-2xl" />

      <div className="relative">
        <div className="mb-3 flex items-center gap-2 text-sm text-violet-100">
          <Sparkles size={17} />
          Your Learning Journey
        </div>

        <h1 className="text-2xl font-bold sm:text-3xl">
          My Reviews
        </h1>

        <p className="mt-2 max-w-xl text-sm leading-6 text-violet-100 sm:text-base">
          Track your project feedback, review status, and progress.
        </p>

        <div className="mt-5 flex items-center gap-2 text-sm font-medium">
          <MessageSquareText size={18} />
          Learn, improve, and build better projects.
        </div>
      </div>
    </section>
  );
}