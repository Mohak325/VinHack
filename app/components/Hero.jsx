"use client";

import React, { useState, useEffect } from "react";
import HeroContent from "./HeroContent";

const Hero = ({
  ruigslayClassName,
  nostromoLightClassName,
  orbitronClassName,
  nostromoMediumClassName,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger the animation shortly after the component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100); // A brief delay ensures the transition is visible
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full h-screen mx-auto flex items-center justify-center">
      {/* HeroContent will contain all the visual elements */}
      <HeroContent
        isVisible={isVisible}
        ruigslayClassName={ruigslayClassName}
        nostromoLightClassName={nostromoLightClassName}
        orbitronClassName={orbitronClassName}
        nostromoMediumClassName={nostromoMediumClassName}
      />
    </section>
  );
};

export default Hero;
