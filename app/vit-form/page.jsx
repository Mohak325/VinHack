"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { orbitron } from "../fonts";

export default function VITFormPage() {
  const { data: session, status } = useSession();
  const [isHostel, setIsHostel] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    regNo: "",
    year: "",
    phone: "",
    accommodation: "",
    hostelType: "",
    block: "",
    room: "",
  });

  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    // Pre-fill name from session
    if (session.user?.name) {
      setFormData(prev => ({ ...prev, name: session.user.name }));
    }
  }, [session, status]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "accommodation") {
      setIsHostel(value === "hostel");
      // Clear hostel-specific fields if switching to day scholar
      if (value !== "hostel") {
        setFormData(prev => ({
          ...prev,
          hostelType: "",
          block: "",
          room: ""
        }));
      }
    }

    // Clear error when user starts typing
    if (error) setError("");
    if (success) setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      // First, create the VIT student record
      const response = await fetch('/api/vit-students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userEmail: session.user.email
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Registration failed');
      }

      // Update user registration status
      await fetch('/api/user/status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isRegistered: true }),
      });

      setSuccess("Registration successful! Redirecting to teams...");
      
      // Wait 2 seconds before redirecting to show success message
      setTimeout(() => {
        router.push("/teams");
      }, 2000);

    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
            onClick={() => router.push("/")}
            className="mb-6 flex items-center text-orange-400 hover:text-orange-300 transition-colors font-mono group"
            whileHover={{ x: -5 }}
            transition={{ duration: 0.2 }}
            disabled={isSubmitting}
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
              VIT Student Registration
            </motion.h2>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 font-mono text-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Success Message */}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded-xl text-green-400 font-mono text-sm"
              >
                {success}
              </motion.div>
            )}

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
                  disabled={isSubmitting}
                  className="w-full bg-black/40 border border-orange-500/40 p-4 rounded-xl text-orange-100 placeholder-orange-300/60 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 font-mono disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </motion.div>

              {/* Registration Number */}
              <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
                <input
                  name="regNo"
                  value={formData.regNo}
                  onChange={handleChange}
                  type="text"
                  placeholder="Registration Number"
                  required
                  disabled={isSubmitting}
                  className="w-full bg-black/40 border border-orange-500/40 p-4 rounded-xl text-orange-100 placeholder-orange-300/60 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 font-mono disabled:opacity-50 disabled:cursor-not-allowed"
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
                  disabled={isSubmitting}
                  className="w-full bg-black/40 border border-orange-500/40 p-4 rounded-xl text-orange-100 placeholder-orange-300/60 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 font-mono disabled:opacity-50 disabled:cursor-not-allowed"
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
                  disabled={isSubmitting}
                  className="w-full bg-black/40 border border-orange-500/40 p-4 rounded-xl text-orange-100 placeholder-orange-300/60 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 font-mono disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </motion.div>

              {/* Accommodation */}
              <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
                <select
                  name="accommodation"
                  value={formData.accommodation}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full bg-black/40 border border-orange-500/40 p-4 rounded-xl text-orange-100 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 font-mono disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">Select Accommodation</option>
                  <option value="dayscholar">Day Scholar</option>
                  <option value="hostel">Hostel</option>
                </select>
              </motion.div>

              {/* Hostel-specific fields */}
              <motion.div
                initial={false}
                animate={{ height: isHostel ? "auto" : 0, opacity: isHostel ? 1 : 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="flex flex-col gap-6">
                  <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
                    <select
                      name="hostelType"
                      value={formData.hostelType}
                      onChange={handleChange}
                      required={isHostel}
                      disabled={isSubmitting}
                      className="w-full bg-black/40 border border-orange-500/40 p-4 rounded-xl text-orange-100 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 font-mono disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="">LH/MH</option>
                      <option value="lh">LH (Ladies Hostel)</option>
                      <option value="mh">MH (Mens Hostel)</option>
                    </select>
                  </motion.div>

                  <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
                    <input
                      name="block"
                      value={formData.block}
                      onChange={handleChange}
                      type="text"
                      placeholder="Block Number"
                      disabled={isSubmitting}
                      className="w-full bg-black/40 border border-orange-500/40 p-4 rounded-xl text-orange-100 placeholder-orange-300/60 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 font-mono disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
                    <input
                      name="room"
                      value={formData.room}
                      onChange={handleChange}
                      type="text"
                      placeholder="Room Number"
                      disabled={isSubmitting}
                      className="w-full bg-black/40 border border-orange-500/40 p-4 rounded-xl text-orange-100 placeholder-orange-300/60 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 font-mono disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </motion.div>
                </div>
              </motion.div>

              {/* Submit */}
              <motion.button
                variants={itemVariants}
                type="submit"
                disabled={isSubmitting}
                className="group relative bg-orange-500 text-black font-bold py-4 px-8 rounded-xl hover:bg-orange-400 transition-all duration-300 font-mono text-lg shadow-lg hover:shadow-orange-500/25 mt-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-orange-500"
                whileHover={isSubmitting ? {} : { scale: 1.05 }}
                whileTap={isSubmitting ? {} : { scale: 0.95 }}
              >
                <div className="absolute inset-0 rounded-xl bg-orange-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"></div>
                <div className="relative z-10 flex items-center justify-center">
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <span>Submit Registration</span>
                  )}
                </div>
              </motion.button>
            </motion.form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}