"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function VITFormPage() {
  const [isHostel, setIsHostel] = useState(false);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    router.push("/teams"); // redirect
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">VIT Student Registration</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input className="border p-2 rounded" type="text" placeholder="Name" required />
        <input className="border p-2 rounded" type="text" placeholder="Registration Number" required />
        <input className="border p-2 rounded" type="number" placeholder="Year (1-6)" min={1} max={6} required />
        <input className="border p-2 rounded" type="tel" placeholder="Phone Number" required />

        <select
          className="border p-2 rounded"
          onChange={(e) => setIsHostel(e.target.value === "hostel")}
        >
          <option value="">Select Accommodation</option>
          <option value="dayscholar">Day Scholar</option>
          <option value="hostel">Hostel</option>
        </select>

        {isHostel && (
          <>
            <select className="border p-2 rounded">
              <option value="">LH/MH</option>
              <option value="lh">LH</option>
              <option value="mh">MH</option>
            </select>
            <input className="border p-2 rounded" type="text" placeholder="Block Number" />
            <input className="border p-2 rounded" type="text" placeholder="Room Number" />
          </>
        )}

        <button type="submit" className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Submit
        </button>
      </form>
    </div>
  );
}
