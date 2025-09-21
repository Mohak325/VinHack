"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import GlowButton from "../GlowButton.jsx";
import { orbitron, nostromoMedium } from "../../fonts";

const HeroContent = ({ ruigslayClassName, handVariants, leftHandVariants }) => {
  return (
    <div className="relative w-full h-full flex flex-col justify-center items-center">
      {/* Sponsor presents text */}
      <div
        className={`flex items-center justify-center 
              gap-x-[clamp(0.6rem,1.8vw,0.9rem)] 
              text-[clamp(1.05rem,3vw,1.5rem)] 
              mb-4 ${orbitron.className} text-black`}
      >
        <Image
          src="/assets/hero/sponsor.png"
          alt="Sponsor"
          width={0}
          height={0}
          sizes="100vw"
          className="w-[clamp(150px,22vw,235px)] h-auto"
          style={{ height: "auto" }}
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
        href="/login"
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
        className="absolute -top-12 -right-8 w-80 h-80 md:w-120 md:h-120 z-40 pointer-events-none"
        variants={handVariants}
      >
        <Image
          src="/assets/hero/top_right_hand.svg"
          alt="Illustration of a hand reaching down"
          width={720}
          height={360}
          className="w-full h-full"
        />
      </motion.div>

      <motion.div
        className="absolute -bottom-12 -left-15 w-80 h-80 md:w-120 md:h-120 z-40 pointer-events-none overflow-clip"
        variants={leftHandVariants}
      >
        <Image
          src="/assets/hero/bottom_left_hand.svg"
          alt="Illustration of a hand reaching up"
          width={720}
          height={360}
          className="w-full h-full"
        />
      </motion.div>
    </div>
  );
};

export default HeroContent;
