"use client";
import React from "react";
import { t012,nostromoMedium } from "../fonts";
import { motion } from "framer-motion";

const Rules = () => {
  const rules = [
    "Teams must have 2–4 participants (no solo participation, no multiple teams).",
    "Hackathon runs for 36 hours continuously.",
    "All work must be done during the event; only open-source tools/libraries allowed; any AI tools can be used.",
    "Any tech stack may be used; projects must align with at least one track.",
    "Internet access is permitted. Submissions must include: working prototype/demo, pitch deck or documentation, and GitHub repo with source code.",
    "Late submissions will not be accepted.",
    "Judging based on novelty, feasibility & impact, tech implementation, design & UX, open-source usage, and pitching.",
    "Judges’ decisions are final.",
    "Respect all participants and organizers; misconduct leads to disqualification.",
    "Teams must remain onsite throughout the hackathon.",
  ];

  return (
    <section id="rules">
      {/* Added pb-16 for extra padding at the bottom */}
      <div className="w-full max-w-6xl mx-auto p-6 sm:p-8 md:p-12 pb-12">
        {/* RULES in Type12 */}
        <motion.h1
          className={`${t012.className} text-center text-4xl sm:text-5xl md:text-7xl tracking-widest font-bold mt-12`}
          style={{ color: "#000" }}
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }} 
        >
          RULES
        </motion.h1>

        <ul className={`${nostromoMedium.className} text-black list-none p-0 m-0 flex flex-col gap-4 md:gap-6 mt-20 pb-10 mb-24`}>
          {rules.map((rule, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: false, amount: 0.2 }} // 👈 replay on revisit/scroll
              className="text-base sm:text-lg md:text-xl"
            >
              • {rule}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Rules;
