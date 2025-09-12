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
      className={`font-light absolute inset-0 bg-[#D5D1BE] text-black ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Black Border Notch */}
      <Notch type="border" className="z-10" />

      {/* Other Notches */}
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
  );
};

export default Hero;