
"use client";

import { usePathname } from "next/navigation";
import DashboardSidebar from "../src/components/dashboard/sidebar";
import Navbar from "../src/components/shared/navbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const role = pathname.startsWith("/dashboard/mentor")
    ? "MENTOR"
    : pathname.startsWith("/dashboard/admin")
      ? "ADMIN"
      : "STUDENT";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#171329]">
      <Navbar />

      <div className="relative flex min-w-0">
        <DashboardSidebar role={role} />

        <main className="min-h-[calc(100vh-4rem)] min-w-0 w-full flex-1 lg:ml-[260px]">
          {children}
        </main>
      </div>
    </div>
  );
}
