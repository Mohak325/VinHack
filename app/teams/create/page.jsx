"use client";
import { useRouter } from "next/navigation";

export default function CreateTeamPage() {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push("/onboarding"); // redirect after creation
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create a Team</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input className="border p-2 rounded" type="text" placeholder="Team Name" required />
        <button type="submit" className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Create Team
        </button>
      </form>
    </div>
  );
}
