"use client";

export default function ExternalFormPage() {
  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">External Participant Registration</h2>
      <form className="flex flex-col gap-4">
        <input className="border p-2 rounded" type="text" placeholder="Name" required />
        <input className="border p-2 rounded" type="text" placeholder="College Name" required />
        <input className="border p-2 rounded" type="number" placeholder="Year" required />
        <input className="border p-2 rounded" type="tel" placeholder="Phone Number" required />

        <button type="submit" className="bg-green-500 text-white py-2 rounded hover:bg-green-600">
          Submit
        </button>
      </form>
    </div>
  );
}
