import React from "react";
import { SessionNavBar } from "~/components/ui/sidebar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return (
    <div className="flex h-screen bg-slate-50/50 dark:bg-black">
      <SessionNavBar />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
