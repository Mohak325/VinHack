"use client";
import { useRouter } from "next/navigation";

export default function JoinTeamPage() {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push("/onboarding"); // redirect after joining
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Join a Team</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input className="border p-2 rounded" type="text" placeholder="Enter Team Code" required />
        <button type="submit" className="bg-green-500 text-white py-2 rounded hover:bg-green-600">
          Join Team
        </button>
      </form>
    </div>
  );
}
