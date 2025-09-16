"use client";
import Link from "next/link";

export default function TeamPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 p-6">
      <h2 className="text-3xl font-bold mb-6">Team Setup</h2>
      <div className="flex gap-6">
        {/* Create Team */}
        <Link href="/teams/create">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 cursor-pointer hover:shadow-xl">
            <h3 className="text-xl font-semibold mb-3">Create Team</h3>
            <p className="text-gray-600">Start a new team and invite your friends.</p>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full">
              Go to Create Team
            </button>
          </div>
        </Link>

        {/* Join Team */}
        <Link href="/teams/join">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 cursor-pointer hover:shadow-xl">
            <h3 className="text-xl font-semibold mb-3">Join Team</h3>
            <p className="text-gray-600">Already have a code? Join your team here.</p>
            <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full">
              Go to Join Team
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
}
