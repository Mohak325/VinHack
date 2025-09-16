"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { orbitron } from "../fonts";

export default function VITFormPage() {
  const [isHostel, setIsHostel] = useState(false);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push("/teams");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const formVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <div
      className="w-full min-h-screen relative"
      style={{ backgroundColor: "#000000" }}
    >
      {/* Grid lines background */}
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

      {/* Content overlay */}
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Categories
          </motion.button>

          {/* Form Container */}
          <motion.div
            variants={formVariants}
            className="relative bg-black/80 backdrop-blur-sm border border-orange-500/30 shadow-2xl rounded-2xl p-8 hover:shadow-orange-500/20 transition-all duration-300"
          >
            {/* Background glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-orange-500/5 opacity-50"></div>

            {/* Title */}
            <motion.h2
              variants={itemVariants}
              className={`text-3xl font-bold mb-8 text-orange-500 text-center ${orbitron.className}`}
            >
              VIT Student Registration
            </motion.h2>

            <motion.form
              className="flex flex-col gap-6"
              onSubmit={handleSubmit}
              variants={containerVariants}
            >
              {/* Full Name */}
              <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
                <input
                  className="w-full bg-black/40 border border-orange-500/40 p-4 rounded-xl text-orange-100 placeholder-orange-300/60 
                  focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 font-mono"
                  type="text"
                  placeholder="Full Name"
                  required
                />
              </motion.div>

              {/* Reg No */}
              <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
                <input
                  className="w-full bg-black/40 border border-orange-500/40 p-4 rounded-xl text-orange-100 placeholder-orange-300/60 
                  focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 font-mono"
                  type="text"
                  placeholder="Registration Number"
                  required
                />
              </motion.div>

              {/* Year */}
              <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
                <input
                  className="w-full bg-black/40 border border-orange-500/40 p-4 rounded-xl text-orange-100 placeholder-orange-300/60 
                  focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 font-mono"
                  type="number"
                  placeholder="Year (1-6)"
                  min={1}
                  max={6}
                  required
                />
              </motion.div>

              {/* Phone */}
              <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
                <input
                  className="w-full bg-black/40 border border-orange-500/40 p-4 rounded-xl text-orange-100 placeholder-orange-300/60 
                  focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 font-mono"
                  type="tel"
                  placeholder="Phone Number"
                  required
                />
              </motion.div>

              {/* Accommodation */}
              <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
                <select
                  className="w-full bg-black/40 border border-orange-500/40 p-4 rounded-xl text-orange-100 
                  focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 font-mono"
                  onChange={(e) => setIsHostel(e.target.value === "hostel")}
                >
                  <option value="" className="bg-black text-orange-300">
                    Select Accommodation
                  </option>
                  <option value="dayscholar" className="bg-black text-orange-300">
                    Day Scholar
                  </option>
                  <option value="hostel" className="bg-black text-orange-300">
                    Hostel
                  </option>
                </select>
              </motion.div>

              {/* Hostel-specific fields */}
              <motion.div
                initial={false}
                animate={{
                  height: isHostel ? "auto" : 0,
                  opacity: isHostel ? 1 : 0,
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="flex flex-col gap-6">
                  <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                  >
                    <select
                      className="w-full bg-black/40 border border-orange-500/40 p-4 rounded-xl text-orange-100 
                      focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 font-mono"
                    >
                      <option value="" className="bg-black text-orange-300">
                        LH/MH
                      </option>
                      <option value="lh" className="bg-black text-orange-300">
                        LH (Ladies Hostel)
                      </option>
                      <option value="mh" className="bg-black text-orange-300">
                        MH (Mens Hostel)
                      </option>
                    </select>
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                  >
                    <input
                      className="w-full bg-black/40 border border-orange-500/40 p-4 rounded-xl text-orange-100 placeholder-orange-300/60 
                      focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 font-mono"
                      type="text"
                      placeholder="Block Number"
                    />
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                  >
                    <input
                      className="w-full bg-black/40 border border-orange-500/40 p-4 rounded-xl text-orange-100 placeholder-orange-300/60 
                      focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 font-mono"
                      type="text"
                      placeholder="Room Number"
                    />
                  </motion.div>
                </div>
              </motion.div>

              {/* Submit */}
              <motion.button
                variants={itemVariants}
                type="submit"
                className="group relative bg-orange-500 text-black font-bold py-4 px-8 rounded-xl hover:bg-orange-400 transition-all duration-300 font-mono text-lg shadow-lg hover:shadow-orange-500/25 mt-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Background glow */}
                <div className="absolute inset-0 rounded-xl bg-orange-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"></div>

                {/* Button content */}
                <div className="relative z-10 flex items-center justify-center">
                  <span className="mr-2">Submit Registration</span>
                  <motion.svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </motion.svg>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-2 right-2 text-black/20 text-sm">+</div>
                <div className="absolute bottom-2 left-2 text-black/20 text-sm">+</div>
              </motion.button>
            </motion.form>
          </motion.div>

          {/* Footer decorative element */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-8 text-orange-300/60 text-sm font-mono"
          >
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Ready to hack? Complete your registration above.
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
