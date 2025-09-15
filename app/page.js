"use client";

import { useState, useRef, useEffect } from "react";
import { useScroll } from "framer-motion";

import LoadingScreen from "./components/Loading";
import Hero from "./components/Hero";
import FaqSection from "./components/FAQ";
import Footer from "./components/Footer";
import Tracks from "./components/Track";
import { ruigslay, nostromoLight, nostromoMedium } from "./fonts";
import AboutVinnovateit from "./components/about/AboutVinnovateit";
import AboutVinnhack from "./components/about/AboutVinhack";
import Timeline from "./components/TImeline";

export default function Home() {
  const [loadingFinished, setLoadingFinished] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      // Flip happens when scrolled past 50%
      setIsFlipping(latest > 0.5);
    });
  }, [scrollYProgress]);

  const assetPaths = [
    "/assets/bottom_left_hand.svg",
    "/assets/top_right_hand.svg",
  ];

  return (
    <div>
      {/* Loading screen */}
      <LoadingScreen
        onCompletion={() => setLoadingFinished(true)}
        assetPaths={assetPaths}
      />

      {/* Hero section */}
      <Hero
        isVisible={loadingFinished}
        ruigslayClassName={ruigslay.className}
        nostromoLightClassName={nostromoLight.className}
        nostromoMediumClassName={nostromoMedium.className}
      />

      <div className="w-full h-screen" />

      {/* Scroll container for flipping effect */}
      <div ref={containerRef}>
        <AboutVinnhack isFlipping={isFlipping} />
        <AboutVinnovateit isFlipping={isFlipping} />
      </div>

      {/* Remaining sections */}
      <Tracks />
      <Timeline />
      <FaqSection />
      <Footer />
    </div>
  );
}
