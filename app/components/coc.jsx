"use client";
import React from "react";
import { t012,nostromoMedium } from "../fonts";
import { motion } from "framer-motion";

const Coc = () => {
  const rules = [
    "VinnovateIT believes strongly in inclusivity. Everyone, who wants to join the event, is welcome. And we assure you that, all the submissions will be evaluated irrespective of any bias with respect to whatsoever. We will always work to maintain a welcoming and safe environment for everyone.",
    "If you witness an incident which you feel goes against this policy, and violates the rights of any individual including you, feel free to reach out to anyone on the organizing team. You can identify our team members, with the ID card they are wearing which has “Core” or “Board” title.",
    "We ensure, all such reports will be anonymous, and strict actions will be taken against such incidents.",
    "If you're joining us via online mode, feel free to reach out to any of organizing team members via personal chat on Discord, the organizers have a role of “VinnovateIT”.",
    "TL;DR: Be respectful towards everyone, be it participants, organizers, or anyone related to the event. Incase of any incidents with conduct not being abided, feel free to reach out to anyone on organizing team.",
  ];

  return (
    <div id="coc" className="w-full max-w-6xl mx-auto p-6 sm:p-8 md:p-12 pb-16">
      {/* CODE OF CONDUCT in Type12 */}
      <motion.h1
      initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }} 
        className={`${t012.className} text-center text-5xl sm:text-5xl md:text-7xl tracking-widest font-bold mt-16`}
        style={{
          color: "#000",
          lineHeight: 1.25,
          letterSpacing: "0.08em",
          wordSpacing: "0.5em",
        }}
      >
        GUIDELINES
      </motion.h1>

      {/* Rules list */}
      <ul className={`${nostromoMedium.className} text-black list-none p-0 m-0 flex flex-col gap-4 md:gap-6 mt-20 pb-10 mb-24`}>
        {rules.map((rule, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: false, amount: 0.2 }}
            className="text-base sm:text-lg md:text-xl"
          >
            • {rule}
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default Coc;
