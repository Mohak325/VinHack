"use client";

import React from "react";
import { motion } from "framer-motion";
import GlowButton from "../GlowButton.jsx";
import { orbitron, nostromoMedium } from "../../fonts";

const HeroContent = ({ ruigslayClassName, handVariants, leftHandVariants }) => {
  return (
    <div className="relative w-full h-full flex flex-col justify-center items-center">
      {/* Sponsor presents text */}
      <div
        className={`flex items-center justify-center gap-x-[clamp(0.5rem,1.5vw,0.75rem)] text-[clamp(0.875rem,2.5vw,1.25rem)] mb-4 ${orbitron.className} text-black`}
      >
        <img
          src="/assets/hero/sponsor.png"
          alt="Sponsor"
          className="h-[clamp(0.75rem,2.5vw,1.25rem)]"
        />
        <span>presents</span>
      </div>

      <h1
        className={`text-[clamp(3.5rem,10vw,10rem)] leading-none relative z-20 mx-auto text-black ${ruigslayClassName}`}
      >
        VinHack
      </h1>

      {/* Register Button */}
      <a
        href="https://gravitas.vit.ac.in/events/5fceeb67-a8ca-4ab9-9419-eb3f9b9d6b69"
        target="_blank"
        rel="noopener noreferrer"
        className=" inline-block pt-3 z-20 group"
      >
        <GlowButton className={` ${nostromoMedium.className}`}>
          <span className="text-[clamp(1rem,2.5vw,1.125rem)] leading-none">
            REGISTER NOW
          </span>
        </GlowButton>
      </a>

      {/* Illustrations */}
      <motion.div
        className="absolute -top-12 -right-8 w-96 h-96 md:w-128 md:h-128 z-40 pointer-events-none"
        variants={handVariants}
      >
        <img
          src="/assets/hero/top_right_hand.svg"
          alt="Illustration of a hand reaching down"
          className="w-full h-full"
        />
      </motion.div>

      <motion.div
        className="absolute -bottom-12 -left-8 w-96 h-96 md:w-128 md:h-128 z-40 pointer-events-none overflow-clip"
        variants={leftHandVariants}
      >
        <img
          src="/assets/hero/bottom_left_hand.svg"
          alt="Illustration of a hand reaching up"
          className="w-full h-full"
        />
      </motion.div>
    </div>
  );
};

export default HeroContent;
