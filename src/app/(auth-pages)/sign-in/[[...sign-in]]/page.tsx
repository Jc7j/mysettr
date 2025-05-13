"use client";

import { SignIn } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { FlickeringGrid } from "~/components/marketing/flickering-grid";
import { ROUTES } from "~/lib/utils";

export default function SignInPage() {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect_url") ?? "/";

  return (
    <div className="flex min-h-screen flex-col bg-white md:flex-row">
      <div className="order-1 flex w-full flex-col items-center justify-center bg-slate-50 p-4 sm:p-8 md:order-none md:w-1/2">
        <SignIn
          appearance={{
            elements: {
              rootBox: "mx-auto w-full max-w-md",
              card: "bg-white shadow-xl rounded-lg p-6 sm:p-8 w-full",
              headerTitle: "text-left text-gray-900",
              headerSubtitle: "text-left text-gray-600",
              socialButtonsBlockButton:
                "border-gray-300 hover:bg-gray-100 transition-colors text-gray-700",
              socialButtonsBlockButtonText: "text-gray-600",
              dividerLine: "bg-gray-300",
              dividerText: "text-gray-500",
              formFieldLabel: "text-gray-700",
              formFieldInput:
                "bg-white border-gray-300 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 placeholder-gray-400",
              formButtonPrimary:
                "bg-blue-600 hover:bg-blue-700 transition-colors text-white",
              footerActionLink:
                "text-blue-600 hover:text-blue-700 transition-colors",
              footerActionText: "text-gray-600",
              identityPreviewText: "text-gray-700",
              identityPreviewEditButton: "text-blue-600 hover:text-blue-700",
              formFieldError: "text-red-600",
              formFieldSuccessText: "text-green-600",
              alert: "bg-red-100 text-red-700 border-red-300",
            },
            layout: {
              socialButtonsPlacement: "top",
              showOptionalFields: false,
            },
          }}
          signUpUrl={`${ROUTES.AUTH.SIGNUP}?redirect_url=${encodeURIComponent(redirectUrl)}`}
        />
      </div>

      <div className="relative order-2 h-64 w-full md:order-none md:h-screen md:w-1/2">
        <FlickeringGrid
          className="absolute inset-0"
          color="rgba(180, 180, 200, 0.7)"
          flickerChance={0.07}
          maxOpacity={0.2}
          squareSize={3}
          gridGap={5}
        />
      </div>
    </div>
  );
}
