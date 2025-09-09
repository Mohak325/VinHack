"use client";

import React, { useState, useEffect, useRef } from "react";

const CircularMenu = ({ isOpen, items, onClose }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [scrollAngle, setScrollAngle] = useState(0);
  const scrollInterval = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setIsMenuVisible(true);
    } else {
      // Fade out first, then unmount from the DOM
      const timer = setTimeout(() => setIsMenuVisible(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleHoverScroll = (direction) => {
    if (scrollInterval.current) clearInterval(scrollInterval.current);
    scrollInterval.current = setInterval(() => {
      setScrollAngle((prevAngle) => prevAngle + direction * 1.5);
    }, 16); // Scroll smoothly
  };

  const handleHoverScrollStop = () => {
    if (scrollInterval.current) clearInterval(scrollInterval.current);
  };

  if (!isMenuVisible) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-500 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Fading Background */}
      <div
        className="absolute inset-0 bg-gradient-to-l from-black/80 to-transparent"
        onClick={onClose}
      />

      {/* Menu Container */}
      <div
        className="absolute top-0 right-0 h-full w-96 flex items-center justify-center"
        onMouseOut={handleHoverScrollStop}
      >
        {/* Scroll zones */}
        <div
          className="absolute h-1/2 top-0 w-full"
          onMouseOver={() => handleHoverScroll(-1)}
        />
        <div
          className="absolute h-1/2 bottom-0 w-full"
          onMouseOver={() => handleHoverScroll(1)}
        />

        <div className="relative w-full h-full">
          {items.map((item, index) => {
            const arcDegrees = 180;
            const itemAngle =
              (index / (items.length - 1)) * arcDegrees - arcDegrees / 2;
            const currentAngle = itemAngle - scrollAngle;
            const angleInRad = (currentAngle * Math.PI) / 180;

            const radiusX = 80;
            const radiusY = 200;
            const xOffset = Math.cos(angleInRad) * radiusX;
            const yOffset = Math.sin(angleInRad) * radiusY;

            const isVisibleOnArc = Math.cos(angleInRad) > -0.5;
            const scaleFactor = (Math.cos(angleInRad) + 1) / 2;
            const scale = 0.7 + scaleFactor * 0.3;
            const opacity = isVisibleOnArc ? scaleFactor : 0;

            return (
              <a
                key={item.name}
                href={item.href}
                onClick={onClose}
                className="absolute top-1/2 right-40 text-white text-center text-3xl tracking-wider origin-center"
                style={{
                  transform: `translate(${xOffset}px, ${yOffset}px) scale(${scale})`,
                  opacity: opacity,
                  transition: "transform 0.2s, opacity 0.2s",
                  pointerEvents: opacity > 0.5 ? "auto" : "none",
                }}
              >
                {item.name}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CircularMenu;
