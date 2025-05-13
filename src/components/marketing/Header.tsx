"use client";

import React from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { Button } from "~/components/ui";
import { ROUTES } from "~/lib/utils";

const Header = () => {
  const { user, isLoaded } = useUser();

  const dashboardHref = isLoaded && user ? "/dashboard" : ROUTES.AUTH.SIGNIN;

  return (
    <header className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container mx-auto flex h-14 max-w-screen-2xl items-center">
        <Link href={ROUTES.HOME} className="mr-6 flex items-center space-x-2">
          <span className="font-bold sm:inline-block">MySettr</span>
        </Link>

        <nav className="flex flex-1 items-center space-x-6 text-sm font-medium">
          <Link
            href="/use-cases"
            className="hover:text-foreground/80 text-foreground/60 transition-colors"
          >
            Use Cases
          </Link>
          <Link
            href="/features"
            className="hover:text-foreground/80 text-foreground/60 transition-colors"
          >
            Features
          </Link>
          <Link
            href="/pricing"
            className="hover:text-foreground/80 text-foreground/60 transition-colors"
          >
            Pricing
          </Link>
        </nav>

        <div className="flex items-center justify-end space-x-4">
          <Button asChild disabled={!isLoaded}>
            <Link href={dashboardHref}>
              {isLoaded ? "Open Dashboard" : "Loading..."}
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
