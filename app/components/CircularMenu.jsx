"use client";

import React, { useState, useEffect, useRef } from "react";
import { FiX } from "react-icons/fi";

// Custom hook to get window size
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    handleResize(); // Call handler right away so state gets updated with initial window size

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

// This component is controlled by the `isOpen` and `onClose` props from its parent.
const CircularMenu = ({ isOpen, items, onClose, fontClassName }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const { width } = useWindowSize();

  // Determine radius and container width based on screen size
  const radius = width < 768 ? 180 : 250;
  const menuContainerWidth = width < 768 ? "100%" : "24rem"; // 24rem is w-96

  // Using useRef for animation values prevents re-renders on every frame.
  const scrollAngle = useRef(0);
  const scrollVelocity = useRef(0); // For inertia
  const animationFrameRef = useRef(null);
  const menuItemsRef = useRef([]);
  // This ref holds the physics state (position, velocity, opacity) for each item.
  const menuItemsState = useRef([]);
  // This ref tracks the previous state of `isOpen` to detect when it changes.
  const prevIsOpen = useRef(isOpen);

  // Effect to handle visibility and initialize animation state
  useEffect(() => {
    if (isOpen) {
      // Show component immediately to start the entry animation
      setIsMenuVisible(true);
      // Only initialize the positions when transitioning from closed to open
      if (!prevIsOpen.current) {
        const displayItems = [...items, ...items];
        scrollAngle.current = 0;
        scrollVelocity.current = 0;
        // Set initial state to be off-screen for the entry animation
        menuItemsState.current = displayItems.map(() => ({
          x: -150,
          y: 0,
          vx: 0,
          vy: 0,
          opacity: 0,
          vOpacity: 0,
        }));
      }
    } else {
      // When closing, let the animation loop handle the visuals.
      // After the CSS transition, visually unmount the component.
      const timer = setTimeout(() => {
        setIsMenuVisible(false);
      }, 500); // This duration should match the CSS transition
      return () => clearTimeout(timer);
    }
    // Update the ref to track the state for the next render
    prevIsOpen.current = isOpen;
  }, [isOpen, items]);

  // The core animation loop.
  useEffect(() => {
    // Stop the loop if the component isn't visible
    if (!isMenuVisible) return;

    const animate = () => {
      // Apply inertia only when the menu is fully open and has velocity
      if (isOpen && Math.abs(scrollVelocity.current) > 0.01) {
        scrollAngle.current += scrollVelocity.current;
        scrollVelocity.current *= 0.95; // Apply friction
      } else {
        scrollVelocity.current = 0;
      }

      const displayItems = [...items, ...items];

      displayItems.forEach((_, index) => {
        const el = menuItemsRef.current[index];
        const state = menuItemsState.current[index];

        if (el && state) {
          let targetX, targetY, targetOpacity;

          // Determine target based on whether the menu is open or closing
          if (isOpen) {
            // --- OPEN STATE: Items are on the circular path ---
            const angleStep = 30;
            const currentAngle = index * angleStep - scrollAngle.current;
            const angleInRad = (currentAngle * Math.PI) / 180;

            targetX = -Math.cos(angleInRad) * radius;
            targetY = Math.sin(angleInRad) * radius;
            const visibilityFactor = (Math.cos(angleInRad) + 1) / 2;
            targetOpacity = Math.max(0, visibilityFactor - 0.2) * 1.2;
          } else {
            // --- EXIT STATE: All items move off-screen ---
            targetX = -150;
            targetY = 0;
            targetOpacity = 0;
          }

          // Apply spring physics to smoothly move to the target position and opacity
          const spring = 0.04;
          const friction = 0.85;

          state.vx = state.vx * friction + (targetX - state.x) * spring;
          state.vy = state.vy * friction + (targetY - state.y) * spring;
          state.vOpacity =
            state.vOpacity * friction +
            (targetOpacity - state.opacity) * spring;

          state.x += state.vx;
          state.y += state.vy;
          state.opacity += state.vOpacity;

          const isSmallScreen = width < 768;

          let transformStyle = `translate(${state.x}px, ${state.y}px)`;
          if (isSmallScreen) {
            transformStyle += " rotate(-30deg) translate(2px, 2px)";
          }

          el.style.transform = transformStyle;
          el.style.opacity = state.opacity;
          el.style.pointerEvents = state.opacity > 0.5 ? "auto" : "none";
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isMenuVisible, isOpen, items, radius]); // Add radius to dependency array

  const handleWheelScroll = (e) => {
    // Allow scrolling only when the menu is fully open
    if (!isOpen) return;
    scrollVelocity.current += e.deltaY * 0.04;
  };

  const handleItemClick = (e, href) => {
    e.preventDefault();
    onClose(); // Trigger the exit animation
    // Navigate after the animation has had time to start
    setTimeout(() => {
      window.location.href = href;
    }, 500);
  };

  // Render nothing if the component is not supposed to be in the DOM
  if (!isMenuVisible && !isOpen) {
    return null;
  }

  const displayItems = [...items, ...items];

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-500 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Fading Background */}
      <div
        className="absolute inset-0 bg-gradient-to-l from-black/90 to-transparent"
        onClick={onClose}
      />

      {/* Menu Container */}
      <div
        className="absolute top-0 right-0 h-full flex items-center justify-center"
        style={{ width: menuContainerWidth }}
        onWheel={handleWheelScroll}
      >
        <div className="relative w-full h-full">
          {displayItems.map((item, index) => (
            <a
              ref={(el) => (menuItemsRef.current[index] = el)}
              key={`${item.name}-${index}`}
              href={item.href}
              onClick={(e) => handleItemClick(e, item.href)}
              className={`absolute top-1/2 right-4 sm:right-10 text-white text-center text-2xl md:text-3xl tracking-wider origin-center ${fontClassName}`}
              style={{ opacity: 0, willChange: "transform, opacity" }}
            >
              {item.name}
            </a>
          ))}
        </div>
        <button
          onClick={onClose}
          aria-label="Close menu"
          className={`absolute top-1/2 right-12 sm:right-16 -translate-y-1/2 text-white transition-opacity duration-300 hover:opacity-70 ${
            isOpen ? "opacity-100 delay-300" : "opacity-0"
          }`}
        >
          <FiX size={40} />
        </button>
      </div>
    </div>
  );
};

export default CircularMenu;
