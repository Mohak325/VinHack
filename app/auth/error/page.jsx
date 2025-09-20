"use client";

import { Suspense } from "react";

import AuthErrorContent from "./AuthErrorContent";
import { orbitron } from "@/app/fonts";

export default function AuthErrorPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <p className={`${orbitron.className} text-orange-500 text-2xl`}>
            loading ...
          </p>
        </div>
      }
    >
      <AuthErrorContent />
    </Suspense>
  );
}
