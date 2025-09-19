"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { t012, nostromoLight, nostromoMedium } from "../../fonts";
import Sponsor from "./Sponsor";
import { tracksData } from "./data";

const TracksDesktop = () => {
  return (
    <div>
      <div className="pt-16 sm:pt-20 text-center">
        <h2
          className={`text-5xl sm:text-6xl lg:text-8xl font-black tracking-widest text-black ${t012.className}`}
        >
          TRACKS
        </h2>
      </div>

      <Sponsor />

      <div className="w-full py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12">
          {tracksData.map((track, index) => {
            const isCardEven = index % 2 === 0;
            
            return (
              <div
                key={track.id}
                className={`flex items-center gap-8 lg:gap-16 mb-16 lg:mb-24 ${
                  isCardEven ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                {/* Image Circle */}
                <div className="flex-shrink-0">
                  <div
                    className="w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full border-4 border-black"
                    style={{
                      backgroundImage: `url(${track.imageUrl})`,
                      backgroundSize: "contain",
                      backgroundPosition: "center",
                      backgroundColor: "rgb(218,184,157)",
                      backgroundRepeat: "no-repeat",
                    }}
                  />
                </div>

                {/* Content */}
                <div className={`flex-1 ${isCardEven ? 'text-left' : 'text-right'}`}>
                  <p
                    className={`font-bold text-black text-4xl lg:text-6xl xl:text-7xl ${nostromoMedium.className}`}
                  >
                    {track.id}
                  </p>
                  
                  <p
                    className={`text-black/70 mt-2 text-base lg:text-xl xl:text-2xl ${nostromoMedium.className}`}
                  >
                    {track.title}
                  </p>
                  
                  <p
                    className={`leading-relaxed text-black/60 mt-4 text-sm lg:text-base xl:text-lg ${nostromoLight.className}`}
                  >
                    {track.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TracksDesktop;