"use client";

import { useState } from "react";
import { FaCrown, FaTimes } from "react-icons/fa";

export default function OnboardingPage() {
  const [teamName] = useState("Team Alpha");
  const [members, setMembers] = useState([
    { name: "John Doe", isLead: true },
    { name: "Alice" },
    { name: "Bob" },
    { name: "Charlie" },
  ]);

  const removeMember = (name) => {
    setMembers(members.filter((m) => m.name !== name));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Team Header */}
      <h1 className="text-4xl font-bold text-center mb-8">{teamName}</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Section - Team Info */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Team Members</h2>
          <div className="flex flex-col gap-3">
            {members.map((member, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  {member.isLead && (
                    <FaCrown className="text-yellow-500" title="Team Lead" />
                  )}
                  <p className="font-medium">{member.name}</p>
                </div>
                {!member.isLead && (
                  <button
                    onClick={() => removeMember(member.name)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTimes />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Exit Team
          </button>
        </div>

        {/* Right Section - Hackathon Flow */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Hackathon Flow</h2>
          <div className="flex flex-col items-start gap-4">
            {["Review 1", "Review 2", "Review 3", "Final Presentation"].map(
              (step, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500"></div>
                  <p className="font-medium">{step}</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Project Info Form */}
      <div className="mt-10 bg-white p-6 rounded-lg shadow max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Project Information</h2>
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Track Chosen"
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Project Title"
            className="border p-2 rounded"
          />
          <textarea
            placeholder="Description"
            className="border p-2 rounded h-24"
          />
          <input
            type="url"
            placeholder="GitHub Link"
            className="border p-2 rounded"
          />
          <input
            type="url"
            placeholder="Figma Link"
            className="border p-2 rounded"
          />
          <input
            type="url"
            placeholder="PPT Link"
            className="border p-2 rounded"
          />
          <input
            type="url"
            placeholder="Other Links (Canva, Deployed Site, etc.)"
            className="border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Save Project Info
          </button>
        </form>
      </div>
    </div>
  );
}
