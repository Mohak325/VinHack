"use client";

import React, { useState } from "react";
import Notch from "./Notch";
import HeroContent from "./HeroContent";
import CircularMenu from "./CircularMenu";
import FaqSection from "./FAQ";


const Hero = ({
  isVisible,
  ruigslayClassName,
  nostromoLightClassName,
  nostromoMediumClassName,
}) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [soundOn, setSoundOn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: "ABOUT", href: "#about" },
    { name: "SCHEDULE", href: "#schedule" },
    { name: "PRIZES", href: "#prizes" },
    { name: "SPONSORS", href: "#sponsors" },
    { name: "FAQ", href: "#faq" },
    { name: "CONTACT", href: "#contact" },
  ];

  return (
    <div
      onMouseMove={(e) => setCoords({ x: e.clientX, y: e.clientY })}
      className={`font-light fixed inset-0 bg-[#D5D1BE] text-black ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Main Layout with Padding for Borders */}
      <div className="relative w-full h-full p-4">
        {/* Black border with cutout corners */}
        <div
          className="absolute inset-0 bg-black"
          style={{
            clipPath:
              "polygon(0% 30px, 30px 0%, calc(100% - 30px) 0%, 100% 30px, 100% calc(100% - 30px), calc(100% - 30px) 100%, 30px 100%, 0% calc(100% - 30px))",
          }}
        ></div>

        {/* Corner Fills to cover the space left by clip-path */}
        <div className="absolute top-0 left-0 w-[30px] h-[30px] bg-black"></div>
        <div className="absolute top-0 right-0 w-[30px] h-[30px] bg-black"></div>
        <div className="absolute bottom-0 left-0 w-[30px] h-[30px] bg-black"></div>
        <div className="absolute bottom-0 right-0 w-[30px] h-[30px] bg-black"></div>
        <div
          className="relative w-full h-full bg-[#D5D1BE]"
          style={{
            clipPath:
              "polygon(0% 30px, 30px 0%, calc(100% - 30px) 0%, 100% 30px, 100% calc(100% - 30px), calc(100% - 30px) 100%, 30px 100%, 0% calc(100% - 30px))",
          }}
        ></div>

        {/* Notches */}
        <Notch
          type="sound"
          soundOn={soundOn}
          onToggle={() => setSoundOn((s) => !s)}
          fontClassName={nostromoLightClassName}
        />
        <Notch
          type="menu"
          onToggle={() => setIsMenuOpen(!isMenuOpen)}
          fontClassName={nostromoLightClassName}
        />
        <Notch
          type="coords"
          coords={coords}
          fontClassName={nostromoLightClassName}
        />
        <Notch type="discover" fontClassName={nostromoLightClassName} />

        {/* Main Content */}
        <HeroContent
          isVisible={isVisible}
          ruigslayClassName={ruigslayClassName}
          nostromoLightClassName={nostromoLightClassName}
        />

        {/* Circular Menu */}
        <CircularMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          items={menuItems}
          fontClassName={nostromoMediumClassName}
        />
      </div>
    </div>
  );
};

export default Hero;
