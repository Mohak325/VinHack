"use client";
import Link from "next/link";

export default function Welcome() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-100">
      <img src="/hack-logo.png" alt="Hackathon Logo" className="w-40 h-40 mb-6" />
      <h1 className="text-3xl font-bold mb-4">Welcome to Hackathon Onboarding</h1>
      <p className="text-lg mb-8">Choose your category to continue</p>
      <div className="flex gap-6">
        <Link href="/vit-form">
          <button className="flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            VIT Students
          </button>
        </Link>
        <Link href="/external-form">
          <button className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 4v16m8-8H4" />
            </svg>
            External Participants
          </button>
        </Link>
      </div>
    </div>
  );
}
