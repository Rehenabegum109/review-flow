
import { Toaster } from "sonner";
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./src/components/shared/theme-provider";
import MainLayout from "./src/components/shared/main-layout";

export const metadata: Metadata = {
  title: "ReviewFlow",
  description:
    "Submit projects, receive meaningful reviews, and improve your skills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col bg-slate-50 text-slate-900 dark:bg-[#171329] dark:text-white">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MainLayout>{children}</MainLayout>
          <Toaster position="top-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
