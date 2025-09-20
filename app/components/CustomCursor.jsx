"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveHandler = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const hoverHandler = (e) => {
      const target = e.target;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.getAttribute("role") === "button"
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveHandler);
    window.addEventListener("mouseover", hoverHandler);

    return () => {
      window.removeEventListener("mousemove", moveHandler);
      window.removeEventListener("mouseover", hoverHandler);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
      animate={{
        x: position.x - (isHovering ? 18 : 12),
        y: position.y - (isHovering ? 18 : 12),
        width: isHovering ? 40 : 24,
        height: isHovering ? 40 : 24,
        backgroundColor: isHovering ? "transparent" : "#f97316", // orange-500
        border: isHovering ? "2px solid black" : "none",
      }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    />
  );
}
