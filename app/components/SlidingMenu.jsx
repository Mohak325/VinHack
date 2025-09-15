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
      <div className="relative w-full h-full grid grid-cols-3 grid-rows-3">
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
        <div className="col-start-2 row-start-2 flex flex-col items-center justify-center space-y-4 h-full">
          {menuOptions.map((option, index) => (
            <a
              key={index}
              href={option.href}
              className="text-[#F5B37F] hover:text-white transition-colors flex items-center"
              style={{ fontSize: "clamp(1.25rem, 5vw, 2rem)" }}
              onClick={handleClose}
              onMouseEnter={() => handleMouseEnter(index)}
            >
              <span
                className={`${nostromoLight.className}`}
                style={{ fontSize: "clamp(0.875rem, 3vw, 1.375rem)" }}
              >
                {" "}
                {String(index + 1).padStart(2, "0")}.
              </span>
              {animatingIndex === index ? (
                <DecryptingText
                  targetText={option.name}
                  start={true}
                  isComplete={false}
                  className={`${nostromoMedium.className} mx-4`}
                />
              ) : (
                <span className={`${nostromoMedium.className} mx-4`}>
                  {option.name}
                </span>
              )}
              <span
                className={`${nostromoLight.className}`}
                style={{ fontSize: "clamp(0.875rem, 3vw, 1.375rem)" }}
              >
                {" "}
                .{String(index + 1).padStart(2, "0")}
              </span>
            </a>
          ))}
        </div>
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
      </div>
    </div>
  );
};

export default SlidingMenu;
