"use client";

import React, { useEffect, useRef, useState } from "react";
import { useBorder } from "./Border";
import DecryptingText from "./DecryptingText";

import { orbitron, nostromoMedium, nostromoLight, gulimche } from "../fonts";

const SlidingMenu = () => {
  const { isMenuOpen, setIsMenuOpen } = useBorder();
  const menuRef = useRef(null);
  const [animatingIndex, setAnimatingIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setAnimatingIndex(index);
    setTimeout(() => {
      setAnimatingIndex(null);
    }, 300);
  };

  const handleClose = () => {
    setIsMenuOpen(false);
  };

  // Effect to handle body scroll lock when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const menuOptions = [
    { name: "Home", href: "#hero" },
    { name: "About VinHack", href: "#about-vinhack" },
    { name: "About VinnovateIT", href: "#about-vinnovateit" },
    { name: "Tracks", href: "#tracks" },
    { name: "FAQ", href: "#faq" },
    { name: "Code Of Conduct", href: "#coc" },
    { name: "Rules", href: "#rules" },
    { name: "Register", href: "#register" },
  ];

  return (
    <div
      ref={menuRef}
      className={`fixed inset-0 z-50 transform transition-transform duration-500 ease-in-out ${
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      } bg-black/80 backdrop-blur-md`}
    >
      <div className="relative w-full h-full grid grid-cols-1 md:grid-cols-3 grid-rows-3 p-4 md:p-0">
        {/* Mobile Layout Header */}
        <div className="col-span-1 row-start-1 px-4 py-4 flex md:hidden justify-between items-start">
          <div className="text-left">
            <p className={`${gulimche.className} text-[#EA8244] text-xs`}>
              project: New Era of VinnovateIT
            </p>
          </div>
          <button
            onClick={handleClose}
            className={`${nostromoLight.className} text-[#F5B37F] text-sm hover:text-white`}
          >
            CLOSE
          </button>
        </div>

        {/* Desktop Top Right Project Info */}
        <div className="col-start-3 row-start-1 px-10 py-8 hidden md:flex justify-end items-start">
          <div className="text-right">
            <p className={`${gulimche.className} text-[#EA8244] text-sm`}>
              project:
            </p>
            <p className={`${gulimche.className} text-[#EA8244] text-sm`}>
              New Era of VinnovateIT
            </p>
          </div>
        </div>

        {/* Menu Items - Center on mobile, specific position on desktop */}
        <div className="col-span-1 md:col-start-2 row-start-2 flex flex-col items-center justify-center space-y-3 md:space-y-4 h-full px-4">
          {menuOptions.map((option, index) => (
            <a
              key={index}
              href={option.href}
              className="text-[#F5B37F] hover:text-white transition-colors flex items-center w-full justify-center md:justify-start"
              style={{ fontSize: "clamp(1rem, 4vw, 2rem)" }}
              onClick={handleClose}
              onMouseEnter={() => handleMouseEnter(index)}
            >
              <span
                className={`${nostromoLight.className} text-xs md:text-sm lg:text-lg`}
              >
                {String(index + 1).padStart(2, "0")}.
              </span>
              {animatingIndex === index ? (
                <DecryptingText
                  targetText={option.name}
                  start={true}
                  isComplete={false}
                  className={`${nostromoMedium.className} mx-2 md:mx-4`}
                />
              ) : (
                <span
                  className={`${nostromoMedium.className} mx-2 md:mx-4 text-center md:text-left`}
                >
                  {option.name}
                </span>
              )}
              <span
                className={`${nostromoLight.className} text-xs md:text-sm lg:text-lg`}
              >
                .{String(index + 1).padStart(2, "0")}
              </span>
            </a>
          ))}
        </div>

        {/* Desktop Bottom Left Legal Info */}
        <div className="col-start-1 row-start-3 px-10 py-8 hidden md:flex justify-start items-end">
          <div>
            <p className={`${gulimche.className} text-[#EA8244] text-sm`}>
              LEGAL:
            </p>
            <p className={`${gulimche.className} text-[#EA8244] text-sm`}>
              ©2014-2025
            </p>
          </div>
        </div>

        {/* Mobile Footer */}
        <div className="col-span-1 row-start-3 px-4 py-4 flex md:hidden justify-center items-end">
          <div className="text-center">
            <p className={`${gulimche.className} text-[#EA8244] text-xs`}>
              LEGAL: ©2014-2025
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlidingMenu;
