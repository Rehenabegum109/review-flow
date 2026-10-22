
import Link from "next/link";
import {
  ArrowRight,
  Mail,
  MessageCircle,
  Send,
  Code2,
} from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white px-4 py-16 transition-colors duration-300 dark:bg-slate-950 sm:px-6 sm:py-20">
      <section className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-700 dark:border-violet-500/30 dark:bg-violet-500/10 dark:text-violet-300">
            <MessageCircle size={16} />
            CONTACT REVIEWFLOW
          </span>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Let&apos;s Start a{" "}
            <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
              Conversation
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
            Have a question, an idea, or feedback about ReviewFlow?
            We would love to hear from you.
          </p>
        </div>

        {/* Contact content */}
        <div className="mt-14 grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left panel */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-violet-700 to-indigo-800 p-8 text-white shadow-xl shadow-violet-500/10 sm:p-10">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-fuchsia-400/20 blur-2xl" />

            <div className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
                <Code2 size={28} />
              </div>

              <h2 className="mt-7 text-2xl font-bold sm:text-3xl">
                We&apos;re here to help.
              </h2>

              <p className="mt-4 max-w-md leading-7 text-violet-100">
                ReviewFlow is built to help students improve through
                project reviews and collaboration. Your questions and
                suggestions help us make the platform better.
              </p>

              <div className="mt-10 space-y-5">
                <div className="flex items-start gap-4 rounded-2xl border border-white/15 bg-white/10 p-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15">
                    <Mail size={21} />
                  </span>

                  <div>
                    <h3 className="font-semibold">Email Support</h3>
                    <p className="mt-1 text-sm leading-6 text-violet-100">
                      Contact us by email for questions and feedback.
                    </p>
                    <p className="mt-2 text-sm text-white/80">
                      Add your support email here.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-2xl border border-white/15 bg-white/10 p-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15">
                    <MessageCircle size={21} />
                  </span>

                  <div>
                    <h3 className="font-semibold">Feedback & Suggestions</h3>
                    <p className="mt-1 text-sm leading-6 text-violet-100">
                      Share your ideas to help improve the student
                      learning experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right panel */}
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-10">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Get in touch
            </h2>

            <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
              Ready to explore ReviewFlow? Visit your dashboard or
              create an account to get started.
            </p>

            <div className="mt-8 space-y-4">
              <Link
                href="/register"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-3.5 font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:-translate-y-0.5 hover:shadow-violet-500/30"
              >
                Get Started
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/login"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3.5 font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Sign In
              </Link>
            </div>

            <div className="my-8 border-t border-slate-200 dark:border-slate-800" />

            <div className="rounded-2xl bg-violet-50 p-5 dark:bg-violet-500/10">
              <div className="flex items-start gap-3">
                <Send
                  size={20}
                  className="mt-0.5 shrink-0 text-violet-600 dark:text-violet-400"
                />

                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    Help us grow
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    Every suggestion matters. Your feedback can help
                    make project reviews more useful for everyone.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
