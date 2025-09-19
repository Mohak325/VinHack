"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { orbitron, poppins, t012 } from "../fonts";

// ... (animation variants remain the same)

export default function FaqSection() {
  // ... (return statement remains the same)
}

function FaqItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <motion.div
      className="border border-gray-700 rounded-lg overflow-hidden"
      variants={faqItemVariants}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.button
        onClick={toggleOpen}
        data-sound-click
        className={`w-full text-left ${
          poppins.className
        } cursor-pointer px-3 py-2 text-base font-medium faq-no-arrow focus:outline-none transition-colors duration-300 ${
          isOpen ? "bg-[#D5D1BE] text-black" : "bg-[#2B1E1E] text-white"
        }`}
        style={{ listStyle: "none" }}
        aria-expanded={isOpen}
        whileHover={{ backgroundColor: isOpen ? "#C8C4B1" : "#3A2A2A" }}
      >
        {question}
      </motion.button>
      <motion.div
        ref={contentRef}
        className={`overflow-hidden ${
          isOpen ? "bg-[#332015] text-white" : "bg-[#f5f5f5] text-black"
        }`}
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
      >
        <motion.div
          className={`px-4 py-3 ${poppins.className} text-sm`}
          initial={{ y: -10 }}
          animate={{ y: isOpen ? 0 : -10 }}
          transition={{ duration: 0.2, delay: isOpen ? 0.1 : 0 }}
        >
          {answer}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
