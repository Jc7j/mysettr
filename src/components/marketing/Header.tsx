import React from "react";
import Link from "next/link";
import { Button } from "~/components/ui/button"; // Assumes shadcn install path

const Header = () => {
  return (
    <header className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container mx-auto flex h-14 max-w-screen-2xl items-center">
        {/* Logo */}
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold sm:inline-block">MySettr</span>
        </Link>

        {/* Navigation Links */}
        <nav className="flex flex-1 items-center space-x-6 text-sm font-medium">
          <Link
            href="/use-cases" // Placeholder link
            className="hover:text-foreground/80 text-foreground/60 transition-colors"
          >
            Use Cases
          </Link>
          <Link
            href="/features" // Placeholder link
            className="hover:text-foreground/80 text-foreground/60 transition-colors"
          >
            Features
          </Link>
          <Link
            href="/pricing" // Placeholder link
            className="hover:text-foreground/80 text-foreground/60 transition-colors"
          >
            Pricing
          </Link>
        </nav>

        {/* Action Button */}
        <div className="flex items-center justify-end space-x-4">
          <Button>Open Dashboard</Button>
          {/* TODO: Add mobile menu button here */}
        </div>
      </div>
    </header>
  );
};

export default Header;
