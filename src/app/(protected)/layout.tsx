import React from "react";
import { SessionNavBar } from "~/components/ui/sidebar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getOne } from "~/server/queries/user";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default async function ProtectedLayout({
  children,
}: ProtectedLayoutProps) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await getOne(userId);

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="flex h-screen bg-slate-50/50 dark:bg-black">
      <SessionNavBar fullName={user.name} primaryEmailAddress={user.email} />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
