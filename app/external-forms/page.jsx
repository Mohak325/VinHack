"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { orbitron } from "../fonts";

export default function ExternalFormPage() {
  const [formData, setFormData] = useState({
    name: "",
    collegeName: "",
    year: "",
    phone: "",
    branch: "",
    city: "",
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    router.push("/teams");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const formVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="w-full min-h-screen relative" style={{ backgroundColor: "#000000" }}>
      {/* Background grid */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #1a1a1a 1px, transparent 1px),
            linear-gradient(to bottom, #1a1a1a 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      <div className="absolute inset-0 grid grid-cols-5 gap-8 p-8 opacity-50">
        {/* Generate 30 plus symbols (5x6 grid) */}
        {Array.from({ length: 30 }, (_, index) => (
          <div key={index} className="flex items-center justify-center">
            <div
              className="text-md font-light select-none"
              style={{ color: "#ea8244" }}
            >
              +
            </div>
          </div>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-lg"
        >
          {/* Back Button */}
          <motion.button
            variants={itemVariants}
            onClick={() => router.back()}
            className="mb-6 flex items-center text-orange-400 hover:text-orange-300 transition-colors font-mono group"
            whileHover={{ x: -5 }}
            transition={{ duration: 0.2 }}
          >
            <svg
              className="w-5 h-5 mr-2 group-hover:animate-pulse"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Categories
          </motion.button>

          {/* Form */}
          <motion.div
            variants={formVariants}
            className="relative bg-black/80 backdrop-blur-sm border border-orange-500/30 shadow-2xl rounded-2xl p-8 hover:shadow-orange-500/20 transition-all duration-300"
          >
            <motion.h2
              variants={itemVariants}
              className={`text-3xl font-bold mb-8 text-orange-500 text-center ${orbitron.className}`}
            >
              External Participant Registration
            </motion.h2>

            <motion.form
              className="flex flex-col gap-6"
              onSubmit={handleSubmit}
              variants={containerVariants}
            >
              {/* Full Name */}
              <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Full Name"
                  required
                  className="w-full bg-black/40 border border-orange-500/40 p-4 rounded-xl text-orange-100 placeholder-orange-300/60 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 font-mono"
                />
              </motion.div>

              {/* College Name */}
              <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
                <input
                  name="collegeName"
                  value={formData.collegeName}
                  onChange={handleChange}
                  type="text"
                  placeholder="College Name"
                  required
                  className="w-full bg-black/40 border border-orange-500/40 p-4 rounded-xl text-orange-100 placeholder-orange-300/60 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 font-mono"
                />
              </motion.div>

              {/* Branch */}
              <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
                <input
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  type="text"
                  placeholder="Branch/Department"
                  required
                  className="w-full bg-black/40 border border-orange-500/40 p-4 rounded-xl text-orange-100 placeholder-orange-300/60 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 font-mono"
                />
              </motion.div>

              {/* Year */}
              <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
                <input
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  type="number"
                  placeholder="Year of Study"
                  min={1}
                  max={6}
                  required
                  className="w-full bg-black/40 border border-orange-500/40 p-4 rounded-xl text-orange-100 placeholder-orange-300/60 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 font-mono"
                />
              </motion.div>

              {/* City */}
              <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
                <input
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  type="text"
                  placeholder="City"
                  required
                  className="w-full bg-black/40 border border-orange-500/40 p-4 rounded-xl text-orange-100 placeholder-orange-300/60 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 font-mono"
                />
              </motion.div>

              {/* Phone */}
              <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  type="tel"
                  placeholder="Phone Number"
                  required
                  className="w-full bg-black/40 border border-orange-500/40 p-4 rounded-xl text-orange-100 placeholder-orange-300/60 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 font-mono"
                />
              </motion.div>

              {/* Submit */}
              <motion.button
                variants={itemVariants}
                type="submit"
                className="group relative bg-orange-500 text-black font-bold py-4 px-8 rounded-xl hover:bg-orange-400 transition-all duration-300 font-mono text-lg shadow-lg hover:shadow-orange-500/25 mt-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 rounded-xl bg-orange-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"></div>
                <div className="relative z-10 flex items-center justify-center">
                  <span className="mr-2">Submit Registration</span>
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </motion.button>
            </motion.form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}