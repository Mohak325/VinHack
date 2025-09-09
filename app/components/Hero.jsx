"use client";

import React, { useState, useEffect } from "react";
import HeroContent from "./HeroContent";
import CircularMenu from "./CircularMenu";
import Notch from "./Notch";

const Hero = ({ isVisible }) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [soundOn, setSoundOn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Effect to handle mouse movement anywhere on the screen
  useEffect(() => {
    const handleMouseMove = (e) => setCoords({ x: e.clientX, y: e.clientY });
    if (isVisible) {
      window.addEventListener("mousemove", handleMouseMove);
    }
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isVisible]);

  const tokenizeCoords = (x, y) => {
    const formatNum = (num) => num.toString().padStart(4, "0").split("");
    return ["X.", ...formatNum(x), "//", "Y.", ...formatNum(y)];
  };

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

        {/* Notches are now siblings to the inner content area, fixing their positioning */}
        <Notch
          position="top"
          soundOn={soundOn}
          onToggleSound={() => setSoundOn((s) => !s)}
        />
        <Notch position="left" tokens={tokenizeCoords(coords.x, coords.y)} />
        <Notch
          position="right"
          onToggleMenu={() => setIsMenuOpen(!isMenuOpen)}
        />
        <Notch position="bottom" />

        {/* Inner content container with matching cutout shape */}
        <div
          className="relative w-full h-full bg-[#D5D1BE]"
          style={{
            clipPath:
              "polygon(0% 30px, 30px 0%, calc(100% - 30px) 0%, 100% 30px, 100% calc(100% - 30px), calc(100% - 30px) 100%, 30px 100%, 0% calc(100% - 30px))",
          }}
        >
          <HeroContent isVisible={isVisible} />
        </div>
      </div>

      {/* Circular Menu is a sibling to the main layout, as it's a fixed-position overlay */}
      <CircularMenu
        isOpen={isMenuOpen}
        items={menuItems}
        onClose={() => setIsMenuOpen(false)}
      />
    </div>
  );
};

export default Hero;
